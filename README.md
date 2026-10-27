# Suhood — Official Landing Website

Premium static landing site for **Suhood — Your Personal Deen Companion**.

## Stack

- Static HTML / CSS / vanilla JS (no build step)
- Hosted on **Vercel** (Framework Preset: **Other**)

## Local preview

```bash
# any static server
npx serve .
# or
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Vercel setup

1. Import the GitHub repository `ar5813053-droid/Suhood-website` into Vercel.
2. **Framework Preset:** Other  
3. **Root Directory:** `.` (repository root)  
4. **Build Command:** leave empty  
5. **Output Directory:** `.`  
6. Deploy. Every push to `main` triggers a new deployment.

No environment variables are required.

## Download URL

All Download CTAs use:

`https://u.gy/Suhood-app`

Configured once in `js/main.js` as `APK_DOWNLOAD_URL`.

## Assets

| Path | Description |
|------|-------------|
| `assets/phones/*.png` | 8 transparent phone mockups (white background removed) |
| `assets/brand/logo.png` | App logo |
| `assets/brand/founder.png` | Founder portrait |
| `assets/brand/favicon-32.png` | Favicon |

## Before public launch

- [ ] Personalize founder biography in `index.html` (`#founder`)
- [ ] Legal review of `privacy.html`
- [ ] Set real canonical / Open Graph domain in `index.html`
- [ ] Confirm Instagram and support email links

## Contact

- Instagram: https://www.instagram.com/suhood.app?cplk=MTQzdzdwbWQ2bTRm  
- Support: support.suhood@gmail.com  
