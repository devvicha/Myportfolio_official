# Vichaksha Viduranga — portfolio

A React portfolio for AI engineering, selected projects, research, and speaking. Built with Vite, Framer Motion, and Lucide icons. The interface includes a responsive project carousel, a keyboard-accessible photo viewer, an AI work assistant, and an EmailJS contact form.

## Local development

Use Node.js 22.12+ and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open the URL printed by Vite, including `/Myportfolio_official/`. This base path matches the existing GitHub Pages repository. Vite reads environment variables when it starts; restart the dev server after changing them.

```sh
npm run lint
npm run build
npm run preview
```

`build` writes the production site to `dist/`. `preview` serves that build locally; it does not start or deploy the AI backend.

## AI assistant

Set `VITE_ASK_API_URL` to the base URL of the portfolio agent service or its complete `/api/ask` endpoint. Trailing slashes are normalized. The frontend sends a JSON request to `/api/ask`:

```json
{ "question": "What has Vichaksha built?" }
```

The service response must include a nonempty `answer` string. Optional `sources` and `tools` arrays contain strings to display with the answer; invalid entries are ignored:

```json
{
  "answer": "An answer grounded in the portfolio corpus.",
  "sources": ["project-reference.md"],
  "tools": ["search_work"]
}
```

Use an HTTPS service URL for the published site and allow its frontend origin (`https://devvicha.github.io`) in the backend CORS configuration. A localhost API URL works only on the machine running that backend. The repository contains the frontend; the agent service must run separately. Leave the URL blank to use the clearly labelled saved answers. Requests time out after 25 seconds; unavailable services and invalid responses also fall back to saved answers. Questions are limited to 1,000 characters.

## Contact form

The contact form uses EmailJS. Its template variables are `your_name`, `your_email`, and `message`; keep these aligned with the configured template. Use the optional `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` variables in `.env.example` to configure the service, template, and browser public key. Blank values retain the existing portfolio’s public EmailJS settings. A successful form submission sends a real email; use read-only checks until a real message is intended.

Values beginning with `VITE_` are included in the browser bundle. They must never contain private provider credentials, model API keys, or backend secrets. Limit allowed origins and configure abuse controls in EmailJS and the agent service.

## Content and design

- `src/assets/projects.js` contains the project content and outbound links.
- `src/Pages/` contains the portfolio sections.
- `src/Components/AskMyWork.jsx` contains the assistant interface and saved answers.
- `src/index.css` defines the shared design system; section-specific styles live in `src/styles/`.
- `src/assets/CV.pdf` is the downloadable CV.

Manrope and IBM Plex Mono load from Google Fonts, with local fallback fonts. Motion follows the visitor’s reduced-motion preference. Keep image descriptions, keyboard controls, visible focus styles, and honest integration states intact when editing the site.

## GitHub Pages

The current production base is `/Myportfolio_official/` in `vite.config.js`, and the metadata points to `https://devvicha.github.io/Myportfolio_official/`. Update both if the hosting location changes.

The existing `npm run deploy` command builds the site, creates a `404.html` fallback, and publishes `dist/` through `gh-pages`. Configure and verify the production environment before running it: Vite embeds configuration at build time. Deployment is a separate action; a successful local build does not publish the site.
