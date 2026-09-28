# Continuum account setup

## Repository configuration

The repository now contains the configured project URL and public anon key in `public/supabase-config.js`. For a fork, replace these with your own public project configuration.

## Current connection status

The login interface and email/password flows are implemented. The latest read-only request to `/auth/v1/settings` returned **HTTP 200**, with email authentication enabled and sign-ups allowed. An earlier check returned 401; the current key is now accepted. No real test accounts were created and no confirmation/reset emails were sent during development.

Project: `https://ayuqtqjzbkjzvfgabwlq.supabase.co`

1. In this project's Supabase dashboard, open **Settings → API Keys**.
2. Copy the **publishable key** (`sb_publishable_…`) or a valid legacy **anon** key into `public/supabase-config.js`.
3. Never use an `sb_secret_…` or `service_role` key in that file, HTML, browser code, a frontend environment variable, or a client-side bundle. No privileged key is required for Supabase Auth.
4. Rotate/revoke the privileged credential that was shared in the conversation using the project's supported key-management controls. For legacy credentials, review the impact of rotation on other applications first. The application did not save or use that credential.

## Supabase Auth settings

- Enable the Email provider and allow signups under Authentication settings.
- Keep email confirmation enabled for a public deployment.
- Under **Authentication → URL Configuration**, set Site URL to your deployed HTTPS app origin.
- Allow the exact deployed callback URLs for `/login.html` and `/login.html?mode=reset`. The app uses its current origin, including the Arena preview origin during development. If you use a Supabase redirect pattern to allow query strings, keep it constrained to your app's callback path and domain.
- Preview origins can change. Add the active preview callback only for testing; remove stale ones. Do not allow arbitrary production redirect origins.
- If using the default hosted email sender, observe its recipient restrictions and rate limits. Configure production SMTP and review email templates/delivery before launch.
- PKCE confirmation/recovery links should be opened in the browser that initiated the request. The verifier lives in that browser. An expired or cross-browser reset can be requested again.

## What is and is not included

Included: sign in, account creation, confirmation messaging, password reset request, PKCE callback exchange, new-password form, account view verified through `getUser`, local-device sign-out, session refresh/persistence via the official SDK, guest access, and header links from the journey and atlas.

Not included: cloud progress synchronization, database profiles, social sign-in, email changes, or server-side access restrictions on the public atlas/chat endpoint. Authentication alone must not be treated as database authorization. If cloud progress is added, use user-owned records and tested Row Level Security policies based on `auth.uid()`; do not bypass RLS with a service key.

Existing progress and reflections remain per-browser localStorage. Signing out does not erase them, and another person using the same browser can access them. This is disclosed in the account UI. Passwords are sent only to the configured Supabase Auth endpoint and are not saved by application code.

## Files and validation

- `public/login.html`, `auth.css`, `auth-page.js`: accessible responsive account screens.
- `public/auth-client.js`, `supabase-config.js`: shared SDK client and public configuration.
- `public/auth-header.js`: Sign in / My account links.
- `src/supabase-browser.js` and `public/vendor/supabase.js`: official SDK bundled locally (no runtime CDN).
- Rebuild vendor module: `npx esbuild src/supabase-browser.js --bundle --format=esm --platform=browser --target=es2020 --minify --outfile=public/vendor/supabase.js`.
- `node tests/auth.mjs` exercises all flows with mocked Auth responses, including PKCE recovery, sign-out isolation, callback errors, mobile geometry, and public-key role checks. These tests are not evidence of a successful live account connection.
