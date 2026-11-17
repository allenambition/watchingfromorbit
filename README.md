# watchingfromorbit

A personal site built as one room. Visitors switch on the light, then click objects in the room to open what's inside: the globe holds travel, the turntable holds records, the shelves hold what I'm reading and watching, the wardrobe holds clothes.

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

```json
{
  "name": "Mexico City",
  "country": "Mexico",
  "when": "January 2026",
  "lat": 19.4326,
  "lon": -99.1332,
  "note": "One or two sentences about the trip.",
  "photos": [
    { "src": "img/cdmx-1.jpg", "caption": "Optional caption" },
    "img/cdmx-2.jpg"
  ]
}
```

The pin appears on the globe automatically. Get `lat` and `lon` by right-clicking the place in Google Maps; the first line is the coordinates. Longitude is negative in the Americas.

Longer writing tied to a place goes in `essays` or `reflections`, with `place` set to the destination's `name`:

```json
{ "title": "", "subtitle": "", "date": "", "place": "Mexico City", "body": "Paragraphs separated by a blank line." }
```

### A record (`records`)

```json
{
  "title": "Brown Liquor & Me",
  "by": "Playlist",
  "note": "Why it's in the collection.",
  "apple": "https://music.apple.com/us/playlist/...",
  "cover": "img/brown-liquor.jpg"
}
```

`apple` is the Share → Copy Link from Apple Music; the page turns it into a player. Other people's music is only ever embedded, never uploaded. `cover` is optional; with a cover, the record also stands on the room's shelves.

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
- `ambient`: room tone, off until a visitor turns it on. `"synth"` generates it in the browser; a path like `"audio/room.mp3"` plays a file; `null` removes the button.

## How it behaves

- The room fills the window at 16:9 and is cropped to fit. On phones it is wider than the screen; visitors swipe sideways. A swipe never opens an object, even if it starts on one; a tap does.
- First visit on a phone: after the light comes on, the view drifts to the globe, across to the wardrobe and back, with labels showing. It runs once. Tapping empty parts of the room shows the labels again. On desktop, labels fade in once and then appear on hover.
- The globe opens full-screen after the camera zooms into it. Drag to spin it, scroll or pinch to zoom, tap a pin for that place.
- Apple Music and YouTube players work on the live site. They're blocked inside Claude's artifact preview, where a link shows instead.

## Deploying

The site is hosted on GitHub Pages from this repository: Settings → Pages → Deploy from a branch → `main`, folder `/ (root)`. Every commit to `main` updates the live site within a minute or two. To use your own domain later, add it under Settings → Pages → Custom domain and follow the DNS steps shown there.

## Notes for whoever works on this next

- Text on the site follows a plain-writing guide: specific, no hype words, no "not just X but Y", no cheerleading, no fragments for effect.
- Decisions already made: no glowing or pulsing hints on objects; the room is the page, with no conventional menu or scrolling site underneath; other people's music is embedded, never hosted.
- Next planned work: one complete travel destination with real photos and writing, used as the design reference for the other collections. Then a real lights-off image and a dusk scene.
- Ideas parked for later: wardrobe doors that open, flipping through record sleeves, a cat that wanders through the room.
