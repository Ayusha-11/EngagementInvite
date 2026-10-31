# Amit & Ayusha — Engagement Invitation Website

A responsive, bilingual (English + Marathi) static website starter for a royal emerald-green and antique-gold Maharashtrian-inspired engagement invitation.

## Event details currently set
- Couple: Amit & Ayusha
- Date: Sunday, 15 November 2026
- Time: 11:00 AM
- Venue: Parvati Marriage Hall
- Address: Tisgaon Road, Kalyan East, Kalyan-421306
- City: Mumbai (venue address is in Kalyan East)

## Files
- `index.html` — page content and sections
- `style.css` — colours, layout, mobile styling, gallery and animations
- `config.js` — event details, names and map search; edit this first for future changes
- `script.js` — countdown, calendar download, directions and sharing
- `assets/` — favicon, decorative Ganesh motif and photo-gallery instructions

## Add couple photos
Place three photos in `assets/` named exactly:
- `couple-photo-1.jpg`
- `couple-photo-2.jpg`
- `couple-photo-3.jpg`

The page will show a styled placeholder until a matching photo file is added. Optimize photos to around 1200 px on the longest edge for faster loading.

## Customize
Edit `config.js`. Date format: `YYYY-MM-DD`; time format: 24-hour `HH:MM`.
- `eventDateISO`: `2026-11-15`
- `eventTime24`: `11:00`
- `eventTimeDisplay`: `11:00 AM`
- `dateDisplay`: `Sunday, 15 November 2026`
- `venueName`, `venueAddress`, `mapQuery`, and `familyMessage`
- `musicUrl`: optional direct audio file URL (only use audio you have permission to share)

## Preview locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. For a more reliable local preview, use VS Code's Live Server extension or another static file server.

## Publish free using GitHub Pages
1. Sign in to GitHub and create a new public repository, e.g. `amit-ayusha-engagement`.
2. Upload the contents of this folder (the files and `assets` folder, not just the ZIP).
3. Open **Settings → Pages** in the repository.
4. Under build/deployment, select **Deploy from a branch**, choose `main` and `/(root)`, then save.
5. Wait for GitHub Pages to publish and copy the URL it provides. The first publish may take a few minutes.
6. Open the published URL on a phone and test the date, map, calendar download and share button.

## Alternative hosting
You can use Netlify's manual deploy workflow by uploading the extracted site folder. Review current hosting account and deployment requirements before publishing.

## Before sharing
- Add the three gallery photos.
- Confirm the venue spelling/address and date/time.
- Test on a phone.
- Share the public website URL; a local `file://` URL will not work for guests.
- This package has not been deployed; it contains editable source files only.
