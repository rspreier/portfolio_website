# Ryan Spreier Portfolio Website

Personal portfolio site built with Next.js (App Router), React, Tailwind CSS, DaisyUI, and Framer Motion.

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS + DaisyUI
- Framer Motion
- Nodemailer (contact form email delivery)
- Spline (interactive 3D home experience)

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open:

`http://localhost:3000`

## Environment Variables

Create a `.env.local` file in the project root with:

```env
EMAIL_HOST=
EMAIL_PORT=
EMAIL_SECURE=
EMAIL_USER=
EMAIL_PASSWORD=
EMAIL_FROM=
EMAIL_TO=
```

These are used by `src/app/api/route.js` for contact form email sending.

## Scripts

- `npm run dev` - Start local development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run lint checks

## Project Structure

- `src/app` - App Router pages and API routes
	- `page.jsx` - Home page
	- `about/page.jsx` - About page
	- `projects/page.jsx` - Projects page
	- `contact/page.jsx` - Contact page
	- `api/route.js` - Contact form backend endpoint
- `src/components` - Reusable UI components
- `src/styles/global.css` - Global styles
- `public/img` - Static image assets

## Notes

- Contact form submits to `/api` and sends email via configured SMTP credentials.
- The site uses animated interactions and transitions heavily, so performance-sensitive assets (especially GIFs) should be optimized when possible.
