# Continuum — The Human Possibility

An interactive exploration of longevity, personal identity, and possible human futures. The application combines a real-time 3D body-transformation journey with a connected knowledge atlas.

## Current experience

- **3D journey:** choose Science, Philosophy, or Future. Inspect topic-derived capabilities, preview a changed body, then integrate or decline each change. Acquired systems accumulate as a stylized child develops adult proportions.
- **14 selected transformation encounters:** five biological, six technological, three philosophical. A single pathway can reach its own adult outcome; other pathways are optional.
- **Body comparisons:** before/proposed and before/saved-result images are rendered from the same geometry as the live, orbitable figure.
- **Replay:** undo a completed pathway with confirmation, return to childhood, and choose another route without erasing independent pathway or atlas progress.
- **Knowledge atlas:** 141 concepts across Scientist, Philosopher, and Futurist, with topic-specific illustrations, connections, and locally saved reflections.
- **Levels of Immortality:** a standalone six-level conceptual framework (Levels 0–5), with evidence limits and links back to the atlas.
- **Accounts:** email/password sign-in, account creation, confirmation handling, PKCE recovery, and sign-out using Supabase. Guests can still explore.
- **Optional AI chat:** a server-side Gemini proxy; the browser never receives the Gemini API key.

This is a work in progress. The procedural character is stylized, not a finished realistic asset. Not all 141 atlas topics are transformation encounters. Simulated enhancements and conceptual outcomes are **not** clinical predictions, medical advice, quantified lifespan gains, or evidence of immortality.

## Production deployment

Frontend and serverless backend deployment instructions and configuration status are in [DEPLOYMENT.md](DEPLOYMENT.md).

## Run locally

Requires Node.js 22 and npm.

```sh
npm ci
npm start
```

Open **http://localhost:3000**. The server listens on `0.0.0.0:3000`.

| Page | URL |
| --- | --- |
| 3D journey | `/` |
| Full atlas | `/atlas.html` |
| Account interface | `/login.html` |
| Levels framework | `/atlas.html#levels` |

Three.js and the Supabase browser SDK are vendored locally; no runtime CDN is required. WebGL is required for the journey. If unavailable, the application offers the atlas as a fallback.

### Optional Gemini chat

Supply `GEMINI_API_KEY` through your server environment or secret manager:

```sh
GEMINI_API_KEY=your_key npm start
```

`.env.example` documents the variable; `server.mjs` does not load `.env` automatically. Without the key, educational content remains available and chat reports that the service is unconfigured.

### Supabase accounts

`public/supabase-config.js` contains the configured project URL and public **anon** key. These are browser-safe identifiers, not administrative credentials. For a fork, replace them with your own project URL and publishable/anon key.

Never place a secret or `service_role` key in browser code. Configure email authentication and allowed callback URLs as described in [SUPABASE_SETUP.md](SUPABASE_SETUP.md).

The public key now passes a live read-only Auth settings check (HTTP 200); email authentication and sign-ups are enabled. Authentication tests use mocked responses; successful email delivery and a full live account flow still require verification.

## Data and security boundaries

- Journey progress and reflections are **browser-local**, not cloud-synchronized or scoped to individual accounts.
- Signing out does not remove browser-saved progress or reflections. Avoid storing sensitive material on shared browsers.
- Authentication is implemented, but the atlas and AI proxy remain public. **Before deploying a public AI endpoint, add server-side authorization as appropriate, rate limits, spending limits, HTTPS, and abuse controls.** A client login button is not server-side authorization.
- Future cloud progress requires user-owned records and tested Row Level Security policies. Do not bypass RLS with an administrative client key.
- No GitHub token, Supabase privileged credential, or Gemini API key belongs in this repository.

## Project structure

```text
public/
  index.html                  3D journey entry point
  journey.js                  movement, progression, choices, persistence
  journey-data.js             initial route content
  acquisition-data.js         current capability encounters
  evolution-avatar.js         modular child-to-adult figure
  body-comparison.js          model-derived before/after images
  atlas.html                  complete atlas entry point
  app.v16.js                  active shared atlas controller
  *-data.js / *-ui.js          separable atlas content and views
  illustrations/              local SVG diagrams
  login.html / auth-*.js       account interface and shared auth client
  supabase-config.js          public configuration template
  vendor/                    Three.js and Supabase bundles + licenses
src/                         browser bundle entry source
tests/                       Playwright browser tests
server.mjs                   static hosting + optional AI proxy
create_*illustrations.py      reproducible SVG generators
prepare_pathway_avatars.py    transparent avatar asset preparation
docs/DEVELOPMENT_HISTORY.md   historical implementation notes
```

The historical notes describe multiple previous builds and should not override this README's current behavior or configuration instructions.

## Tests

```sh
npm ci
npx playwright install --with-deps chromium
# Run npm start in another terminal first.
node tests/pathway-undo.mjs
node tests/auth.mjs
node tests/immortality-levels.mjs
node tests/futurist.mjs
node tests/body-comparisons.mjs
node tests/journey.mjs
```

`tests/journey.mjs` runs the current technological and biological acquisition suites. 3D tests use Chromium software rendering and may take several minutes. `tests/auth.mjs` uses mocked Supabase transport and does not create real accounts or send email. Some historical tests are retained for earlier atlas revisions.

To rebuild the Supabase browser bundle:

```sh
npx esbuild src/supabase-browser.js --bundle --format=esm --platform=browser --target=es2020 --minify --outfile=public/vendor/supabase.js
```

SVG generators use Python 3. Avatar preparation additionally needs Pillow and NumPy. Required generated app assets are already included.

Third-party vendored code retains its licenses under `public/vendor/`. No project-wide open-source license has been assigned.
