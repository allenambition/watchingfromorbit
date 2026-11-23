# Notes and plans

Working notes for watchingfromorbit: decisions already made, what's planned, and the prompts and steps worked out along the way. `README.md` explains how the site works and how to add things; this file is the why and the what-next. Update it when a decision changes.

Last updated: 2026-11-20.

## Where things stand

- Live at https://watchingfromorbit.com/ (GitHub Pages, branch `main`; the domain is registered at Cloudflare with auto-renew, DNS on Cloudflare set to DNS only). The old github.io address forwards there.
- One room: the observatory lounge (porthole with Chicago skyline, floor globe, bulb, two shelves, console with turntable, wardrobe).
- Working: light switch, globe with zoom-in (always takes the short way to a place), Italy destination page, records (playlists) and stations (uploaded tracks, shuffle and queue) with a player behind an icon in the corner that keeps playing across the site and in background tabs, the Index (search, everything as text, what's new), content warnings for graphic links, phone swiping, visitor counting.
- Message board and private question box: live since 2026-11-20. Worker `wfo-api` at `api.watchingfromorbit.com`, D1 database `wfo`, admin page at `api.watchingfromorbit.com/admin`. Entry is a line at the top of the Index until the deck's terminal exists.
- Real content so far: Italy (12 photos and caption), two Apple Music playlists. Shelf and wardrobe are empty. Chicago, Mexico City, New Orleans and Houston are pins with no content yet.

## Saved versions

- `observatory-v1` (branch, saved 2026-11-17): the live site before the 21:9 redesign. 16:9 observatory room with the Edison bulb, Italy page, player, custom domain. To see it: github.com/allenambition/watchingfromorbit/tree/observatory-v1. To go back to it, restore its `index.html`, `content.json` and `img/room-*` onto `main` (or ask Claude to). Don't merge or delete the branch; it's a snapshot, not work in progress.

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

### Generating the room wide from the start

Since the room is still being redesigned in ChatGPT, it can be generated wide (21:9) in one go, with the new objects in the prompt. Before accepting it, check the downloaded file's size (Finder, Get Info, Dimensions): at least about 2000×860, or it looks soft on a laptop because the room fills the window's height. Also check the camera stayed straight-on and level. If either fails, generate at 16:9 and widen in Photoshop instead.

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

Not an object, but liked (2026-11-22): **real Chicago weather in the lounge porthole.** Rain on the glass when it's raining in Chicago, snow when it's snowing, drawn over the picture from a free weather service (Open-Meteo, no key needed). Needs no new content to stay alive. Build after the room picture is final.

## Two rooms: what goes where

- **The lounge** (current room): a life of pleasure. Music, travel, food and drink, clothes, collections.
- **The observation deck** (second room, image in progress): the long view. History, power, war, tech, science, the future. First draft is a moon-base library looking back at Earth.
  - **Telescope:** Aaron's essays, including dark and taboo subjects. Graphic footage is linked behind a content warning, never hosted (GitHub's rules ban gratuitous violence; context and warnings are what keep writing about it allowed). Documenting Reality posts can't be shared past its paywall; link the original source where possible, or describe the footage in writing.
  - **Chessboard** (replacing the star chart): history and power struggles.
  - **Terminal:** the message board, private questions, search, the what's-new log, the text-only view. All built; they sit in the Index until the deck exists.
  - **The Earth in the window:** drawn live with the real day/night line for the moment someone visits; clicking it could show where visitors come from (GoatCounter).
  - Bookshelves are scenery; the real reading list stays on the lounge shelf.
  - Telescope moves here from the lounge plan. Next lounge panorama: no telescope, an unbranded game console, depth (a lounge chair in the foreground, staggered objects).
- The doorway between rooms should be a deliberate transition (an airlock or a stairwell up), since the deck is a different world.

### Observation deck: where the image stands (2026-11-20)

Current draft: moon-base cave room, wide window with Earth over the lunar surface; telescope left, terminal desk right, stone table centre, leather chair in the foreground.

Decided:
- **Earth in the window:** a full disc (not a half-lit phase), in clear black sky with nothing overlapping it, because the live day/night line is drawn on top. Next round: about twice as large (it's about 6% of the width now; on a phone that's a dot).
- **Telescope:** all essays on this page, including history and power. History doesn't get its own object.
- **Terminal:** stays; the screen should glow faintly green with some text (it's a monitor that's on, not a hint). Doubles as a light source in a lights-off version.
- **Doorway back to the lounge:** the round vault hatch on the right wall. Next round: clear of the hanging plant and a bit larger, so it's a usable tap target.
- **Remove the armillary sphere** (looks clickable, echoes the lounge globe). Keep both lamps; they're the room's light sources.
- **Widening to 21:9 in Photoshop**, not by regenerating. Prefer the armchair fully in frame first, or accept a half-invented chair.

Tried and dropped:
- Chessboard (chess as a power symbol is worn out; the board read as a prop and pulled the eye from the window).
- Star chart: looked right but felt dishonest for a room on the moon.

Open: what sits on the table. It only needs to fill the space quietly and isn't clickable. Leading idea: a survey map of the surrounding crater (same look as the star chart, but true to the place). Others: a tray of labelled rock samples; a typewriter with a page in it (risk: looks clickable); open books and papers. Also consider a smaller slab or the object off-centre so the window stays the focus.

### Messages: limits

- Five messages per visitor per hour, no gap between them; 300 a day across the site. Changed 2026-11-20 from one per 10 minutes.
- The form says "No links, please." before anyone writes.
- Replies or threads don't exist; letting people answer Aaron would need a reply feature first.

## Music: stations

- Records hold playlists (Apple Music now, Spotify later). Stations hold uploaded tracks, grouped by theme (first: blog era). A station shuffles; visitors can also play a track now, play it next, or add it to the queue.
- Files and covers live in R2: `audio/` and `covers/` (square, about 600×600). Covers are mostly mixtape art or era photos of the artists.
- Tracks checked so far are listed under Music below.

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

- `watchingfromorbit.com` registered through Cloudflare; Cloudflare R2 holds large files (audio, video) at `media.watchingfromorbit.com`.
- R2 free tier: 10 GB storage, 1M writes and 10M reads a month, no charge for downloads. Cloudflare asks for a card the first time (verification). The free `r2.dev` address is rate-limited and meant for testing; use the custom domain.
- GitHub Pages limits: 100 MB per file, 1 GB published site, soft 100 GB/month bandwidth. Fine for photos and a few short compressed clips; R2 for anything bigger.
- Status: set up 2026-11-17. Domain `watchingfromorbit.com` at Cloudflare (auto-renew on). DNS: four A records for `@` (185.199.108.153, .109, .110, .111) and a CNAME `www` to `allenambition.github.io`, all DNS only, which GitHub needs to issue the HTTPS certificate. R2 bucket `watchingfromorbit-media` at `media.watchingfromorbit.com`, minimum TLS 1.2.
- Adding a file: upload it in Cloudflare (R2, then the bucket, then Upload), keeping folders tidy (`audio/`, `video/`). Its address is `https://media.watchingfromorbit.com/<folder>/<file>`, which goes in `content.json`.

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
