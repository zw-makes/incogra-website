-- Incogra-only tables. Does not touch the existing `waitlist` table.

create table if not exists incogra_waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  role text,
  created_at timestamptz not null default now()
);

create table if not exists incogra_investors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  firm text,
  note text,
  created_at timestamptz not null default now()
);

alter table incogra_waitlist enable row level security;
alter table incogra_investors enable row level security;

do $$
declare r record;
begin
  for r in (
    select policyname, tablename
    from pg_policies
    where schemaname = 'public'
      and tablename in ('incogra_waitlist', 'incogra_investors')
  ) loop
    execute format('drop policy if exists %I on %I', r.policyname, r.tablename);
  end loop;
end $$;

create policy "public can insert incogra waitlist"
  on incogra_waitlist for insert
  to anon
  with check (true);

create policy "public can insert incogra investors"
  on incogra_investors for insert
  to anon
  with check (true);

create or replace function get_incogra_inbox(pass text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if pass is distinct from 'incogra-inbox' then
    raise exception 'Unauthorized';
  end if;

  return jsonb_build_object(
    'waitlist', coalesce((
      select jsonb_agg(to_jsonb(w) order by w.created_at desc)
      from incogra_waitlist w
    ), '[]'::jsonb),
    'investors', coalesce((
      select jsonb_agg(to_jsonb(i) order by i.created_at desc)
      from incogra_investors i
    ), '[]'::jsonb)
  );
end;
$$;

revoke all on function get_incogra_inbox(text) from public;
grant execute on function get_incogra_inbox(text) to anon;
