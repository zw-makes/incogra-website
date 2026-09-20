export const GALLERY = [
  { id: 'orbit', src: '/gallery/orbit.jpg', title: 'Orbital study', folder: 'designs', prompt: 'A glowing orbital ring on black stone', source: 'the web' },
  { id: 'coat', src: '/gallery/coat.jpg', title: 'Cream coat', folder: 'snaps', prompt: 'Figure in a cream coat, courtyard light', source: 'the web' },
  { id: 'architecture', src: '/gallery/architecture.jpg', title: 'Circular void', folder: 'snaps', prompt: 'Brutalist wall with a circular opening at dusk', source: 'the web' },
  { id: 'frost', src: '/gallery/frost.jpg', title: 'Frosted glass', folder: 'designs', prompt: 'Macro of frosted glass and amber light', source: 'the web' },
  { id: 'camera', src: '/gallery/camera.jpg', title: 'Still camera', folder: 'designs', prompt: 'Matte black camera on cream linen', source: 'the web' },
  { id: 'studio', src: '/gallery/studio.jpg', title: 'Studio shelf', folder: 'designs', prompt: 'Artist studio shelf, afternoon light', source: 'the web' },
  { id: 'desk', src: '/gallery/desk.jpg', title: 'Desk light', folder: 'snaps', prompt: 'Hands over a laptop of blurred thumbnails', source: 'the web' }
]

export const FOLDERS = [
  { id: 'all', name: 'All', color: '#f472b6', icon: null, locked: false },
  { id: 'snaps', name: 'Web Snaps', color: '#3b82f6', icon: 'camera', locked: false },
  { id: 'designs', name: 'Designs', color: '#f5c518', icon: 'aperture', star: true, locked: false }
]

export const TOOLS = [
  { id: 'select', name: 'Select', desc: 'Draw a box. Everything inside goes soft.' },
  { id: 'draw', name: 'Draw', desc: 'Freehand a blur stroke over whatever you need gone.' },
  { id: 'pencil', name: 'Pencil', desc: 'Fine, pressure-like marks for names, handles, plates.' },
  { id: 'auto', name: 'Auto', desc: 'Smart redaction for faces and obvious identifiers.' },
  { id: 'censor', name: 'Censor', desc: 'Solid bars. Classic. Unmistakable. Final.' },
  { id: 'shapes', name: 'Shapes', desc: 'Circles and rounded masks that sit naturally on a photo.' }
]

export const FEATURES = [
  {
    kicker: 'From any page',
    title: 'Hover. Collect. Done.',
    italic: 'Collect.',
    body: 'A still, a clip, a sentence you highlighted — or the entire page, captured in one click. It files into your Incogra folder, not into a nameless pile on the desktop.',
    points: ['Images, video, and text from any site', 'Full-page webshot in a single click', 'Saved to a folder that is yours']
  },
  {
    kicker: 'Redact before it leaves',
    title: 'Blur what should never travel.',
    italic: 'never',
    body: 'Six tools live in the tab: select, draw, pencil, auto, censor, shapes. Soften a face, bar a name, mask a plate — then save the version that is safe to send.',
    points: ['On the page, before the file exists anywhere else', 'Intensity you can feel, not guess', 'The original stays with you']
  },
  {
    kicker: 'The studio',
    title: 'A gallery that behaves like a studio.',
    italic: 'studio.',
    body: 'Share a collection in one click. Or turn on private mode and let a passcode stand in the doorway. Dark, fast, and built for people who keep more than Downloads can hold.',
    points: ['One-click sharing, no extra account required', 'Private mode behind a passcode', 'Cloud when you want it, local when you don’t']
  },
  {
    kicker: 'Full-page webshot',
    title: 'The whole page. One click.',
    italic: 'One click.',
    body: 'Need the article, the layout, the long scroll as it lived? Capture the entire website in a single click. No stitching. No missing the footer. It files beside everything else you saved.',
    points: ['The full scroll, in one shot', 'Lands in your folder, already named', 'Redact it, share it, or lock it']
  }
]

export const STEPS = [
  { n: '01', title: 'Install the extension', body: 'Add Incogra to Chrome. It sits quietly until a page is worth keeping.' },
  { n: '02', title: 'Save, capture, or redact', body: 'Hover to collect. Take the whole page. Open the six tools when something in the frame shouldn’t travel.' },
  { n: '03', title: 'Open the studio', body: 'Everything lands in your folders — ready to share in a click, or locked behind private mode.' }
]

export const FAQS = [
  {
    q: 'What is Incogra?',
    a: 'A Chrome extension and a web app. The extension saves images, video, and text from any site, captures a full page in one click, and redacts on the tab. The app is your studio — folders, one-click sharing, and private mode.'
  },
  {
    q: 'Does it work on any website?',
    a: 'Yes. Hover to save from the page you are on. Capture the whole scroll if you need the layout as it lived. It all files into the same library.'
  },
  {
    q: 'Is the blur destructive?',
    a: 'Redactions you apply on the page are burned into the saved version. The copy that leaves the tab is already safe.'
  },
  {
    q: 'How much does it cost?',
    a: 'Free forever for up to 49 clips. Curator is $4.99 a month for unlimited saves and private folders. Studio is $149.99 once, lifetime.'
  },
  {
    q: 'Can I share what I saved?',
    a: 'Yes — one click. A share link can be time-boxed so a collection does not live on the internet forever. Recipients do not need your login.'
  }
]
