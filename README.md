# Muhammad Fadhillah — English Portfolio

Personal portfolio of Muhammad Fadhillah, Informatics student at Universitas Ahmad Dahlan (UAD).
A static site (HTML, CSS and vanilla JavaScript) built for GitHub Pages, designed as a
psychedelic 1960s–70s concert poster: organic grainy artwork, Bagel Fat One lettering in
solid and outline, and an asymmetric layout.

## Structure

```text
index.html                  Home: hero, About Me, Contact
skills-projects.html        Skills and project showcase
assignments/
  index.html                Assignment overview
  assignment-1..3.html      One page per assignment (same template)
personal_image.jpeg         Original profile photo (kept as is)
assets/
  css/tokens.css            Colours, type, spacing (the six palette colours live here)
  css/base.css              Reset, type helpers, page artwork layers
  css/components.css        Navigation, hero, sections, showcase, assignments
  js/content.js             Project and assignment data, plus the code that renders it
  js/nav.js                 Assignments dropdown and mobile menu behaviour
  img/                      Background artwork, WebP copies of the photo, favicon
  img/screenshots/          Put project screenshots here
tools/
  build-textures.mjs        Renders the background artwork (Playwright + Sharp)
  optimize-photo.mjs        Makes the WebP copies of the profile photo
```

## Run locally

Any static file server works. With Python:

```bash
python3 -m http.server 8000     # Windows: python -m http.server 8000
```

Then open <http://localhost:8000>. Opening the HTML files directly also works, but a
server matches GitHub Pages more closely.

## Update the content

All projects and assignments are listed in `assets/js/content.js`. The project showcase,
the assignment overview, the assignment pages and the navigation dropdown are all built
from that one file, so names and links never drift apart.

- **Projects.** Edit an entry or add a new one. Each project has a `period`, a
  `category`, a `description` (one or more paragraphs) and `techGroups`, which list
  technologies by role. `highlights` and `workflow` are optional extras. Put screenshots
  in `assets/img/screenshots/` and set `image`, `imageAlt`, `imageWidth` and
  `imageHeight`; a screenshot keeps its proportions and is never shown larger than its
  pixels. Leave `repo` or `demo` empty to hide the link, and keep `placeholder: true`
  only while the details are missing. The field list is at the top of `content.js`, and
  new projects pick up the editorial layouts automatically.
- **Assignments.** Edit `title`, `summary`, `content` (paragraphs), `images` and `links`.
  Optional extras: `subtitle`, `info` (facts such as type or platform), `outline` (the
  parts of the assignment; an item can carry `meta` such as authors and publication,
  several paragraphs and its own `link`), `closing` (a note after the content), `video`
  and `document` (a PDF shown on the page with View and Download links). `links` appear
  as "Files & links" under the summary. Put files in `assignments/files/`.
  To add one, add an entry (for example `id: 'A4'`, `slug: 'assignment-4'`), copy
  `assignments/assignment-1.html` to `assignments/assignment-4.html`, change
  `data-assignment` on `<main>` to the new slug, and update `<title>` and the meta
  description in that file.
- **A4 CV.** The page shows `assets/documents/cv-muhammad-fadhillah.pdf`, a copy of
  `assignments/CV English Profesional 2300018235.pdf`. After updating the CV, copy the new
  PDF over that file (same name). Keep personal details you do not want public, such as a
  phone number, out of this PDF: everything in it is published.
- **A1 video.** In `content.js`, set `video.youtube` to the YouTube link (any form, such
  as `https://youtu.be/...`), or put the file in `assignments/files/` and set `video.src`
  to its path, for example `assignments/files/self-introduction.mp4`. The "Video coming
  soon" area is replaced by the player automatically.
- **Contact links.** Email, LinkedIn and GitHub (`https://github.com/fadhillah714`)
  appear in the Contact section of `index.html`, in the mobile menu and in the footer
  of every page. When one changes, search the HTML files for the old address.
- **Photo.** `personal_image.jpeg` is the untouched original. After replacing it, run
  `npm run photo` to regenerate `assets/img/profile-640.webp` and `profile-1080.webp`.

## Rebuild the background artwork

The artwork is committed as WebP files, so the site never runs this step. To regenerate
it you need Node.js 20 or newer.

```bash
npm install                       # Playwright and Sharp (development only)
npx playwright install chromium   # optional: otherwise an installed Chrome or Edge is used
npm run textures                  # writes assets/img/bg-*.webp
```

Options: `node tools/build-textures.mjs --only=hero` builds one variant, and
`--out=some/folder --png` writes elsewhere and also keeps lossless PNG copies.

The recipe is an SVG filter: two low-frequency noise fields, one displacing the other,
fine grain mixed in, then a colour map onto the palette. Each variant comes in
1920×1080 (desktop) and 828×1600 (mobile), at roughly 250 KB per file.

| Variant | Files | Seeds | Displacement |
|---|---|---|---|
| Hero | `bg-hero.webp`, `bg-hero-mobile.webp` | 3, 11 | 230 |
| Skills & Projects | `bg-skills.webp`, `bg-skills-mobile.webp` | 21, 8 | 200 |
| Assignments | `bg-assign.webp`, `bg-assign-mobile.webp` | 40, 2 | 200 |

## Publish on GitHub Pages

1. Push the project to a GitHub repository (`node_modules/` is ignored).
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**,
   folder **/ (root)**, and save.
4. The site appears at `https://<username>.github.io/<repository>/` after a minute or two.

All paths are relative, so the site works from a project sub-folder, and `.nojekyll`
makes GitHub serve the files as they are.

## Design notes

- **Palette** (only these six, plus transparency variants): sunset orange `#E8602C`,
  magenta `#C2336B`, purple `#5B2A8C`, midnight `#1B1A4B`, ink `#14101F`, cream `#FFF6EA`.
- **Type:** Bagel Fat One for display lettering, DM Sans 400/500 for everything you read.
- **Decoration:** six-point stars, wavy lines (active menu and links), organic curves,
  outline numerals and tick-marked rules.
- **Accessibility:** skip link, one `h1` per page, keyboard-operable dropdown and menu,
  visible focus, text contrast of at least 4.5:1 (3:1 for large display type), and
  reduced motion respected.
