# Vercel deployment

Production frontend: **https://continuum-atlas-alpha.vercel.app**

The frontend and backend share one project and HTTPS origin:

- `/` — 3D transformation journey
- `/atlas.html` — complete atlas
- `/login.html` — account interface
- `/api/health` — API health and chat-configuration status
- `/api/chat` — server-side Gemini proxy
- The browser now posts directly to `/api/chat` on the same origin; local development also retains the older query-style route.

## Architecture

`vercel.json` serves `public/` and deploys `api/*.mjs` as Node.js 22 serverless functions. `lib/chat-handler.mjs` is shared with the local Node server. Vercel does not run a persistent `npm start` process for this deployment. The SDKs and illustration assets are vendored/static; no frontend build is required.

Requests validate method, JSON, body size, context and history. The API returns JSON errors rather than HTML. A best-effort per-instance throttle is not a substitute for deployment-wide WAF or distributed usage limits.

## Configuration still required

### Gemini

In Vercel project Settings → Environment Variables, set **GEMINI_API_KEY** for Production (and Preview only if desired). Redeploy afterward. No working key was available at initial deployment, so valid chat requests return a truthful 503 configuration message. Other content remains usable.

### Supabase

The project URL and public anon key are now configured. A fresh read-only Auth settings check returned HTTP 200, with email authentication enabled and sign-ups allowed. No privileged key was used. Real email confirmation and recovery delivery still require end-to-end verification.

In Supabase Authentication → URL Configuration, set the Site URL to the production origin and allow the callbacks:

- `https://continuum-atlas-alpha.vercel.app/login.html`
- `https://continuum-atlas-alpha.vercel.app/login.html?mode=reset`

Enable Email authentication and configure production email delivery. Follow `SUPABASE_SETUP.md`. Never put a service-role or secret key in frontend source or public build variables.

Account authentication does not add cloud-synchronized progress. Journey decisions and reflections remain browser-local. Data on the Arena preview origin does not automatically appear on this different Vercel origin.

## Redeploying

This initial deployment was uploaded through the Vercel deployment API. It does **not** imply GitHub auto-deploy integration is configured. To enable automatic deploys, connect the GitHub repository in Vercel's Git settings with the appropriate GitHub integration permissions.

Alternatively, use Vercel CLI from this repository:

```sh
npx vercel link
npx vercel --prod
```

Use your own authenticated session, not a token embedded in a script or Git URL. Revoke the deployment token shared in chat after the deployment is complete.
