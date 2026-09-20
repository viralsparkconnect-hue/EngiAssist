# EngiAssist — Engineering Student Project Portal

A React (Vite) website that helps engineering students get project guidance across six branches:
Computer Science, IT / AI & ML, Mechanical, Civil, Electronics and Chemical.

## What is in the site

- Landing page with branches, services, process, project ideas, FAQ and a request form
- SEO pages per branch (`/cse-project-help` …), per service (`/project-debugging` …) and `/final-year-project-help`
- About, Privacy Policy, Terms of Service and Refund Policy pages
- Request form: saves the lead to Supabase and opens WhatsApp with the details pre-filled
- Admin dashboard at `/dashboard` (login with your Supabase user) to see and manage leads
- `public/founding-batch.html`: standalone launch-offer page (edit the `CONFIG` block at the top of its script)

## Design system

Refined dark: deep ink-blue background, warm white text, **one** amber accent.

| Role | Font | Notes |
| --- | --- | --- |
| Headings | Bricolage Grotesque | self-hosted via `@fontsource-variable` |
| Text | Geist | self-hosted via `@fontsource-variable` |

All colours, spacing and radii are tokens at the top of `app/src/index.css` (`:root`).
Change `--amb` there to re-colour the whole site. `public/founding-batch.html` repeats the same tokens
in its own `<style>` (it is a separate static page), so update both if you change the palette.

## Local development

```bash
cd app
cp .env.example .env      # then fill in your Supabase URL + anon key
npm install
npm run dev
```

## Supabase setup

1. Supabase Dashboard → SQL Editor → run `supabase/schema.sql`
2. Authentication → Users → add yourself (email + password): this is your `/dashboard` login
3. Authentication → Sign In / Providers → **turn off "Allow new users to sign up"**
   (the schema lets any signed-in user read leads, so nobody else should be able to create an account)
4. Optional: run `supabase/optional_hardening.sql` (read the comments in it first)

## Deploy to Vercel

1. Push this repo to GitHub
2. Vercel → New Project → import the repo (settings come from `vercel.json`)
3. Project → Settings → Environment Variables → add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. Deploy

## Project structure

```
├── app/
│   ├── public/            # static files: logo, favicons, fonts, sitemap, founding-batch.html
│   ├── src/
│   │   ├── App.jsx        # pages, sections, form, router, SEO content
│   │   ├── index.css      # design tokens + all site styles
│   │   ├── Dashboard.jsx  # admin leads dashboard
│   │   ├── dashboard.css
│   │   └── lib/supabaseClient.js
│   └── index.html         # meta tags, structured data, analytics
├── supabase/
│   ├── schema.sql
│   └── optional_hardening.sql
└── vercel.json
```

## Publishing your changes

```bash
git add .
git commit -m "Redesign: refined dark design system"
git push
```
