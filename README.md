# AutomationField-Web

Promotional landing page for [AutomationField](.) — a self-hosted SCADA
dashboard for real-time PLC monitoring over OPC UA. Plain static HTML/CSS/JS,
no build step, no dependencies to install.

## Local preview

Any static file server works. For example:

```bash
python3 -m http.server 5500
# → http://localhost:5500
```

## Deploying (GitHub Pages)

One-time setup:

1. Push this repo to GitHub (already the `origin` remote).
2. In the repo on GitHub: **Settings → Pages → Build and deployment → Source:
   Deploy from a branch**, then branch **`main`**, folder **`/ (root)`**. Save.
3. GitHub publishes the site at `https://<username>.github.io/AutomationField-Web/`
   within a minute or two.

After that, deploying an update is just:

```bash
git add -A
git commit -m "Update site"
git push
```

No CI, no build artifacts — GitHub Pages serves `index.html` and `assets/`
directly.

## Structure

```
index.html            — the whole page (sections marked with comments)
assets/css/style.css   — theme tokens + custom components/animations
assets/js/main.js      — mobile nav, scroll reveal, telemetry ticker
assets/img/            — screenshots + favicon
```
