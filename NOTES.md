# Notes and plans

Working notes for watchingfromorbit: decisions already made, what's planned, and the prompts and steps worked out along the way. `README.md` explains how the site works and how to add things; this file is the why and the what-next. Update it when a decision changes.

Last updated: 2026-11-17.

## Where things stand

- Live at https://allenambition.github.io/watchingfromorbit/ (GitHub Pages, branch `main`).
- One room: the observatory lounge (porthole with Chicago skyline, floor globe, bulb, two shelves, console with turntable, wardrobe).
- Working: light switch, globe with zoom-in, Italy destination page, records with a player that keeps playing across the site and in background tabs, phone swiping, visitor counting.
- Real content so far: Italy (12 photos and caption), two Apple Music playlists. Shelf and wardrobe are empty. Chicago, Mexico City, New Orleans and Houston are pins with no content yet.

## The room picture: order of work

Every change to the picture moves things, and every move means re-placing the clickable areas. So the picture is finished in this order, once:

1. **Final design on the 16:9 image, in ChatGPT.** Furniture, globe stand, details. Each ChatGPT edit can quietly redraw parts it was told to leave alone (the globe stand and the bulb both changed between edits before), so compare each result against the previous one.
2. **Widen in Photoshop**, not ChatGPT: Crop tool, Fill set to Generative Expand. Photoshop keeps the original pixels exactly; ChatGPT redraws them. Target about 2.4:1 (for a 1672×941 image, about 2260 wide, roughly 295 px added each side). First pass with no prompt, so walls, carpet and ceiling just continue.
3. **Add new objects in the widened space** with Photoshop Generative Fill, one object per selection, objects kept apart so each can be clicked on its own.
4. **Lights-off version** of the final wide image. Both the bulb and the ceiling ring light must be off. Prompt: "Same image, same camera, nothing moves. The bulb and the ceiling light are off. The room is dark, lit only by faint cool blue light from the skyline through the porthole."
5. **Dusk pair** (optional): "Same image, same camera, nothing moves. It's dusk: the sky through the porthole is deep orange fading to violet, city lights just coming on." Then a lights-off version of that. Register under `scenes` in `content.json` with hours.
6. **Hotspots placed once**, on the final picture. Send the full-resolution files (downloads, not screenshots).

Why widen at all: on a phone the room is cropped to a slice and swiped sideways; a wider picture gives more to look around, and room for new objects.

### Generative Fill prompts for new objects

- Left, near the porthole: "A 1970s brass refracting telescope on a wooden tripod, angled up toward the window, warm tungsten light."
- Right, past the wardrobe: "A small 1970s Italian space-age television with a rounded white plastic shell on a low walnut stand, a modern game console on the shelf below, screen softly glowing."
- Right, in front of the wall: "A slim brass and smoked-glass bar cart with a few bourbon bottles and two crystal tumblers."

### Fallback ChatGPT prompt for widening

> Extend this image into a wider panoramic frame, about 21:9, by adding space on the left and right. Do not change, move or redraw anything that is already in the image: the porthole, the floor globe and its stand, the shelves, the hanging bulb, the console and turntable, and the wardrobe must stay exactly as they are. Continue the curved burnt-orange and oxblood walls, walnut paneling, red shag carpet and ceiling naturally into the new space. In the new space on the left, add a 1970s brass refracting telescope on a wooden tripod, angled up toward the porthole. In the new space on the right, past the wardrobe, add a small 1970s Italian space-age television with a rounded white shell on a low walnut stand, with a game console on the shelf beneath it, and a slim brass and smoked-glass bar cart with a few bourbon bottles. Same straight-on, eye-level camera, same warm tungsten lighting, same photorealistic 35mm look. Keep every object distinct with space around it. No people, no text.

If the middle shifts at all, widen in Photoshop instead.

## Objects: ideas, not commitments

Rule: only add an object that will get something new at least monthly. An empty object is worse than a missing one.

| Object | Would hold | Status |
|---|---|---|
| Telescope by the porthole | Writing, big-picture ideas | Strongest candidate; matches the name |
| Small TV with console | Games, PS5 clips | Planned with the widening |
| Bar cart | Bourbon and spirits notes | Optional |
| Microphone or MPC | Aaron's own music, separate from Records | Idea |
| Easel with a canvas | Paintings | Idea |
| Camera on the console | Non-travel photos and film | Idea |
| Radio | Podcasts | Idea |
| Clock or desk calendar | A "now" page | Idea |

## More rooms ("a whole house")

Possible later: each room is its own picture pair, hotspots and objects, with a doorway hotspot leading between them. Worth building the day a second room exists, not before; this room should be full first. Most natural second room: a studio for Aaron's own music, with its own light and mood.

## Music

- Records play in the corner player, which survives every view and keeps going in background tabs. Sources: Apple Music, YouTube, SoundCloud, any embed code, or audio files.
- Apple Music plays full songs only for visitors signed in to Apple Music; everyone else hears 30-second previews. Most Instagram visitors won't be signed in. Mirroring playlists on YouTube gives everyone full songs.
- Other people's music is embedded from official uploads, never stored in this repository. A public repo lets anyone download the files, and repeated copyright takedowns can cost the GitHub account, which also holds ShiftSyncApp.
- Blog-era tracks checked so far:
  - Pac Div, "Take Me High" (title is "Me", not "My"), 2011, from the Mania! mixtape. Check their official SoundCloud (ITSTHEDIV) for an upload to embed.
  - Wale, "Strings": on the Scion A/V Remix Project release (2008). No official upload found yet.
  - Drake, "Going in for Life": Comeback Season (2007). Not officially on streaming; mostly fan uploads.
- If hosting files for tracks with no official home: use Cloudflare R2, not this repo. It keeps takedowns away from the GitHub account. It does not make hosting them legal.

## Files, storage and the domain

- Plan: buy `watchingfromorbit.com` through Cloudflare (about $10–12/year) and use Cloudflare R2 for large files (audio, video) at a subdomain like `media.watchingfromorbit.com`.
- R2 free tier: 10 GB storage, 1M writes and 10M reads a month, no charge for downloads. Cloudflare asks for a card the first time (verification). The free `r2.dev` address is rate-limited and meant for testing; use the custom domain.
- GitHub Pages limits: 100 MB per file, 1 GB published site, soft 100 GB/month bandwidth. Fine for photos and a few short compressed clips; R2 for anything bigger.
- Status: not set up yet. Steps: Cloudflare account, check and buy the domain, create R2 bucket `watchingfromorbit-media`, then connect the domain to the bucket and point GitHub Pages at the main domain.

## PS5 clips

- Getting them off the console: PS5 Settings > Captures > Auto-upload, then save from the PlayStation App to the phone. Uploads stay in the app for 14 days; clips up to 3 minutes; nothing above 1080p uploads (record at 1080p, or use a USB stick).
- Short clips: compressed (about 5–10 MB per 30 seconds) and stored on the site or R2. Longer ones: YouTube (unlisted is fine), embedded.
- Will live on the TV once the room is widened; on the shelf as video items until then.

## Visitor counting

- GoatCounter, account `watchingfromorbit` (dashboard: https://watchingfromorbit.goatcounter.com). Free, no cookie banner needed, counts visits, not people.
- Events counted besides page views: `lights-on`, `open/globe`, `open/records`, `open/shelf`, `open/closet`, `place/<id>`, `play/<record>`.
- Ad blockers hide some visits; numbers are a floor, not exact.

## Design decisions to keep

- The room is the page. No conventional menu or scrolling site underneath.
- No glowing or pulsing hints on objects; hover labels only, plus a one-time introduction.
- Content views are restrained: one large photo, title in Bodoni Moda, short text in Jost, photos in a plain grid. The Italy page is the reference.
- Text follows the plain-writing guide (no hype words, no "not just X but Y", no fragments for effect).
- Ambient room sound is off. A real recorded loop could come back later; the generated one didn't sound like the room.
- Nothing goes live that Aaron didn't write or supply; placeholders are not published.
