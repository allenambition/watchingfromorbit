# watchingfromorbit

A personal site built as one room. Visitors switch on the light, then click objects in the room to open what's inside: the globe holds travel, the turntable holds records, the shelves hold what I'm reading and watching, the wardrobe holds clothes.

Plans, decisions and image-editing steps are in `NOTES.md`.

It is plain HTML, CSS and JavaScript. There is no framework, no build step and no server code. Everything shown on the site comes from `content.json`.

## Files

| Path | What it is |
|---|---|
| `index.html` | The whole site: styles, markup and script in one file. |
| `content.json` | All content and settings. Edit this to add things. |
| `img/room-night-on.jpg`, `img/room-night-off.jpg` | The room with the light on and off. Same framing, 16:9. |
| `img/` | Also where your own photos go (travel, covers, clothes). |
| `land.json` | Coastlines for the interactive globe. Don't edit. |
| `d3.min.js` | Library that draws the globe (d3 v7). Don't edit. |

## Running it on your computer

Browsers won't load `content.json` from a file opened by double-click. In a terminal, inside this folder:

```
python3 -m http.server
```

Then open http://localhost:8000.

## Adding things

Open `content.json` in any text editor, copy an existing entry in the right list, and change it. Keep the commas between entries and the quotes around text. If the room comes up blank after an edit, a comma or quote is missing; paste the file into jsonlint.com to find the line. Put images in `img/` and refer to them as `"img/name.jpg"`. Keep photos under about 2000 px on the long side.

### A travel destination (`places`)

Each destination is one pin on the globe and one page. Italy is the finished example to copy.

```json
{
  "id": "italy",
  "name": "Italy",
  "subtitle": "Rome, Florence and Tuscany",
  "country": "Italy",
  "when": "Summer 2025",
  "lat": 42.9,
  "lon": 11.9,
  "note": "What you want to say about the trip. Blank lines start new paragraphs.",
  "cover": { "src": "img/travel/italy/leonardo.jpg", "caption": "Optional caption" },
  "photos": [
    { "src": "img/travel/italy/colosseum.jpg", "caption": "The Colosseum, Rome" },
    { "src": "img/travel/italy/steak.jpg" }
  ]
}
```

- `id` is used in links: `watchingfromorbit.com/#italy` opens straight to that page. Lowercase, no spaces.
- `cover` is the large lead photo. Leave it out and the first photo leads.
- Put each trip's photos in their own folder, `img/travel/<id>/`. For each photo, also save a smaller copy with `-sm` added to the name (`colosseum-sm.jpg`, about 900 px on the long side). The grid loads the small copy and the full one opens when tapped. If there's no small copy, the full one is used.
- Remove location data from photos before adding them (export from Photos with "Include location" off, or ask Claude to prepare them).
- One pin per trip, not per city, when the cities are close together. At globe size, Rome and Florence are the same spot.
- Pins with photos or writing are drawn solid; pins without anything yet are drawn as rings.
- Get `lat` and `lon` by right-clicking the place in Google Maps; the first line is the coordinates. Longitude is negative in the Americas.

Longer writing tied to a trip goes in `essays` or `reflections`, with `place` set to the destination's `id`. It appears below the photos:

```json
{ "title": "", "subtitle": "", "date": "", "place": "italy", "body": "Paragraphs separated by a blank line." }
```

### A record (`records`)

Choosing a record and pressing Play loads it into the player in the corner, which keeps going while visitors look around the room, open other things, or switch to other browser tabs. "Hide" tucks it away without stopping it.

```json
{
  "title": "Brown Liquor & Me",
  "by": "Playlist",
  "note": "Why it's in the collection.",
  "apple": "https://music.apple.com/us/playlist/...",
  "cover": "img/records/brown-liquor.jpg"
}
```

Use one source per record:

| Field | What to paste | Who hears full songs |
|---|---|---|
| `apple` | Apple Music share link | Visitors signed in to Apple Music; everyone else gets 30-second previews |
| `youtube` | YouTube video or playlist link | Everyone (some videos block playing outside YouTube) |
| `soundcloud` | SoundCloud track or playlist link | Everyone |
| `embed` | The `src` from another site's embed code (Audiomack, Bandcamp) | Everyone |
| `file` or `tracks` | Audio files in `audio/` | Everyone |

`file` is one track: `"file": "audio/my-song.mp3"`. `tracks` is several, played in order with a next button:

```json
"tracks": [
  { "title": "Song one", "file": "audio/tape/01.mp3", "by": "Aaron Allen" },
  { "title": "Song two", "file": "audio/tape/02.mp3" }
]
```

Only put audio files in this repository that you have the rights to (your own music). Anything in a public GitHub repository can be downloaded by anyone, and copyright takedowns against it count against the whole GitHub account. Other people's music goes in through `youtube`, `soundcloud` or `embed`, from uploads the artist or label made.

`cover` is optional; with a cover, the record also stands on the room's shelves.

### A station (`stations`)

Stations are your uploaded tracks, grouped by theme. They appear under Records. "Play station" shuffles the whole station; each track can also be played now, played next, or added to the queue. Whatever plays keeps going while visitors move around the site or switch tabs. The round player icon in the corner opens the player (now playing, previous/next, the queue).

```json
"stations": [
  {
    "name": "Blog era",
    "note": "Optional line about the station.",
    "cover": "https://media.watchingfromorbit.com/covers/blog-era.jpg",
    "tracks": [
      { "title": "Take Me High", "by": "Pac Div", "from": "Mania!", "year": 2011,
        "file": "https://media.watchingfromorbit.com/audio/take-me-high.mp3",
        "cover": "https://media.watchingfromorbit.com/covers/mania.jpg" }
    ]
  }
]
```

- Upload MP3s to the R2 bucket's `audio/` folder and covers to `covers/` (square JPGs, about 600×600). Paste each file's `https://media.watchingfromorbit.com/...` address.
- A track without its own `cover` uses the station's.
- `from` and `year` are optional; they show as "Pac Div · Mania! · 2011".
- A station with no tracks doesn't show at all.

### Something on the shelf (`shelf`)

```json
{
  "title": "Notes of a Native Son",
  "by": "James Baldwin",
  "status": "reading",
  "cover": "img/baldwin.jpg",
  "youtube": null,
  "url": null,
  "note": "What I think so far."
}
```

For a video, paste the YouTube link in `youtube` and leave `cover` empty; the thumbnail and player come from the link.

### A piece in the wardrobe (`closet`)

```json
{
  "name": "Wool overcoat",
  "maker": "Who made it",
  "note": "Why I keep it.",
  "photo": "img/overcoat.jpg"
}
```

Portrait photos work best.

## The room pictures and the clickable areas

The room is a photograph (generated image). The clickable areas are invisible boxes placed over it, set in `content.json → hotspots` as `[left, top, width, height]` in percent of the picture. Because they're percentages, they stay on their objects at any screen size.

- If the room picture changes, only these numbers change. Make every new version (lights off, dusk) as an edit of the same image so nothing moves.
- `globe_zoom_origin` is the point the camera zooms toward when the globe is clicked.
- `shelf_rows` are the top surfaces of the two shelves; covers with images stand on them.

`scenes` lets the room change with the time of day in Chicago. Each scene is a pair of pictures (`on`, `off`) and the hours it shows, e.g. `"dusk": { "on": "img/room-dusk-on.jpg", "off": "img/room-dusk-off.jpg", "hours": [16, 20] }`. A scene without `hours` is the default.

## Settings in content.json

- `title`, `tagline`, `links`: the line of text at the bottom of the room.
- `fonts`: `display` (titles, notes) and `text` (everything else). Any Google Fonts family name. Currently Bodoni Moda and Jost.
- `sound`: what the light makes when switched: `chain`, `switch` or `none`.
- `ambient`: room tone, off until a visitor turns it on. Currently `null` (no sound button). `"synth"` generates one in the browser; a path like `"audio/room.mp3"` plays a recorded loop, which will sound more like the room than the generated one.
- `analytics.goatcounter`: your GoatCounter code. When set, the site counts page views plus these events: `lights-on`, `open/globe`, `open/records`, `open/shelf`, `open/closet`, `place/<id>` (e.g. `place/italy`), `play/<record>`. They appear in the GoatCounter dashboard alongside page views. `null` turns counting off.

## How it behaves

- The room fills the window at 16:9 and is cropped to fit. On phones it is wider than the screen; visitors swipe sideways. A swipe never opens an object, even if it starts on one; a tap does.
- First visit on a phone: after the light comes on, the view drifts to the globe, across to the wardrobe and back, with labels showing. It runs once. Tapping empty parts of the room shows the labels again. On desktop, labels fade in once and then appear on hover.
- The globe opens full-screen after the camera zooms into it. Drag to spin it, scroll or pinch to zoom. Hovering a pin shows its name; clicking a pin or a place name turns the globe to it and opens that destination's page. Photos open full-screen; swipe or use the arrow keys between them. Esc steps back one layer at a time.
- Apple Music and YouTube players work on the live site. They're blocked inside Claude's artifact preview, where a link shows instead.

## Deploying

The site is hosted on GitHub Pages from this repository (Settings → Pages → Deploy from a branch → `main`, folder `/ (root)`) at the custom domain `watchingfromorbit.com`, which is set in the `CNAME` file. Don't delete that file. Every commit to `main` updates the live site within a minute or two. Large files (audio, video) live in Cloudflare R2 at `https://media.watchingfromorbit.com/`; see `NOTES.md`.

## Notes for whoever works on this next

- Text on the site follows a plain-writing guide: specific, no hype words, no "not just X but Y", no cheerleading, no fragments for effect.
- Decisions already made: no glowing or pulsing hints on objects; the room is the page, with no conventional menu or scrolling site underneath; other people's music is embedded, never hosted.
- The Italy page is the design reference for the other collections: one large lead photo, the title in Bodoni Moda, a short note, then the photos in a plain grid, with nothing decorative around them.
- Next planned work: a real lights-off image and a dusk scene; then records and the wardrobe in the same restrained style as the Italy page.
- Ideas parked for later: wardrobe doors that open, flipping through record sleeves, a cat that wanders through the room.
