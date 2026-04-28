# Top Maasai Mining Co.

Marketing website for Top Maasai Mining Co., built with Next.js 14, React 18, TypeScript, and Tailwind CSS. The site presents the company brand, service offering, ethical mining standards, and contact information.

## Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- ESLint

## Routes

- `/` home page
- `/about` company story and positioning
- `/services` service catalog
- `/ethical-mining` sourcing and labor standards
- `/contact` contact details and inquiry form

## Project Structure

```text
app/                 App Router pages, layout, and global styles
components/          Shared UI and homepage sections
lib/                 Site content and shared style helpers
public/images/       Brand and marketing image assets
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Notes

- Branding assets live in `public/images/`, including `top-maasai-logo.png`.
- Generated build output from Next.js is ignored through `.gitignore`.
