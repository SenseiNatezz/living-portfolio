# A little code. A little wonder.

A responsive illustrated portfolio built with React, Vite, TypeScript, Tailwind CSS 4, Framer Motion, and Lucide React. Original AI-generated artwork gives the hero its landscape; all text and controls are real HTML.

## Install and run

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. For a production build:

```sh
npm run build
npm run preview
```

## Customize

- `src/data.ts` contains the editable identity, contact URLs, biography, projects, skills, and experience. The existing roles and projects are illustrative sample content, not claims about the owner. Replace `hello@example.com` and the generic GitHub/LinkedIn destinations before publishing.
- `src/main.tsx` contains reusable reveal components, section markup, navigation, and native accessible project dialogs. The hero headline has intentional line breaks for composition.
- `src/styles.css` contains typography, colors, layouts, responsive rules, and gentle ambient animations. Tailwind utilities can also be used directly in components.
- Replace the profile placeholder inside the About section with your own image and descriptive alt text.
- Project preview artwork lives in `public/assets`. Source links currently download complete working HTML prototypes in `public/source`; replace them with your real repository URLs and remove the `download` attribute for remote repositories.
- Update title, description, Open Graph values, and favicon in `index.html` and `public/favicon.svg`. On deployment, use an absolute public URL for `og:image` and add your own canonical URL.
- Fonts use Google Fonts, with local system fallbacks if unavailable. Self-host them if external font requests are undesirable.

## Artwork

The built-in image-generation tool created `public/assets/valley.png`. Its optimized production version is `public/assets/valley.webp`, with a smaller About image at `public/assets/valley-detail.webp`. Rebuild optimized images and the original application preview SVGs with `node make-assets.mjs`.

Prompt: “Create an original premium hand-painted animation background illustration for a software engineer portfolio website, wide landscape 1536x1024. Bright blue sky with huge soft ivory clouds, distant blue mountains, rolling lush green hills, a small charming technologically advanced village nestled in valley, winding turquoise river and arched stone bridge. Layered ferns flowers and meadow vegetation foreground. Large leafy tree frames upper right with warm dappled sunlight, rustic wooden desk lower right with open laptop showing dark screen and tiny colored code marks, small friendly cream robotic arm next to laptop. Detailed painterly brush texture, cinematic atmospheric depth, welcoming peaceful luminous summer afternoon. Left 48 percent top through middle is calm pale blue sky and hazy distant hills for dark HTML headline overlay, all detailed desk/laptop tree focal subjects on rightmost 45 percent and bottom. No words typography logos UI borders or watermark. Entire image full bleed illustration, not a website mockup. Original artwork with no imitation of any specific artist studio franchise.”

The desktop canopy and clouds use softly clipped copies of the illustration, with foreground leaves, sunlight, and small screen details overlaid. Narrow layouts prioritize the scene composition and simplify ambient effects. Reduced-motion preferences disable ambient movement and smooth scrolling.

## Deploy

Run `npm run build` and deploy `dist/` to any static host, such as Netlify, Cloudflare Pages, or Vercel. Set the build command to `npm run build` and output directory to `dist`. No backend or secrets are required. For hosting beneath a subdirectory, set Vite's `base` and update root-relative asset/source links accordingly. Contact uses the visitor’s email application, rather than a form backend.

## Verification

`npm run build` performs strict TypeScript checking and generates a production bundle. `node verify.mjs` runs browser checks against a server at `http://localhost:5173`: desktop and mobile overflow, mobile navigation, dialog behavior, and prototype interactions. It saves screenshots into `test-results/`.

## GitHub Pages

Repository: https://github.com/SenseiNatezz/living-portfolio

Live site: https://senseinatezz.github.io/living-portfolio/

The GitHub Actions workflow builds and publishes each push to main. Pages is configured to use GitHub Actions. Vite uses a relative base so deployed images and project prototypes work under the repository path.

