# Websites
Official repository for Forefront AI website projects, including web development, design, AI integrations, and ongoing improvements.

## Projects

| Directory | Project | Stack |
| --- | --- | --- |
| `cairo/` | Cairo watch concept | HTML, CSS, JavaScript, Three.js via CDN |
| `spice/` | SPICE organic ginger ale concept | React, Vite, GSAP, Lenis |

## Run locally

Clone this repository and enter the project folder:

```sh
git clone https://github.com/ForefrontAI-Hub/Websites.git
cd Websites
```

### Cairo

Serve the static site with Python 3:

```sh
python3 -m http.server 8000 --directory cairo
```

Open http://localhost:8000. An internet connection is required for externally hosted libraries, fonts, and images.

### SPICE

Use Node.js 22.12 or newer:

```sh
cd spice
npm ci
npm run dev
```

Open the local URL printed by Vite.

Create and preview a production build:

```sh
npm run build
npm run preview
```

The production files are generated in `spice/dist/`.

## Repository conventions

- Keep each website in its own directory.
- Commit source files, project assets, and dependency lockfiles.
- Keep installed dependencies, build output, local environment files, and credentials out of Git.
- Deployment is configured separately for each site.
