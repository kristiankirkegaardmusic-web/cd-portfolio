# CD Portfolio - Interactive Three.js Experience

En interaktiv webapplikation der viser dine musikprojekter som 3D CD'er med minimalistisk design inspireret af skandinavisk arkitektur.

## Features

✨ **Interactive 3D CD Display**
- 3D CD'er med realistisk metallisk finish
- Glas-lignende covers
- Dynamisk belysning og skygger

🎯 **Interaktivitet**
- Hover over CD'erne for at trække dem ud
- Klik for at åbne detaljeret modal
- Smooth animations og transitions

📱 **Responsive Design**
- Virker på alle enheder (desktop, tablet, mobil)
- Optimeret for alle skærmstørrelser

🎨 **Minimalistisk Design**
- Clean, moderne æstetik
- Teal accent farver (#00a890)
- Sort og hvid farveskema

## File Structure

```
cd-portfolio/
├── index.html              # HTML struktur
├── css/
│   ├── style.css          # Generelle styles
│   └── modal.css          # Modal styles
├── js/
│   ├── data.js            # Projekt data
│   ├── cd.js              # CD klasse
│   ├── scene.js           # Three.js scene opsætning
│   ├── modal.js           # Modal funktionalitet
│   └── main.js            # Hovedscript og interaktivitet
└── README.md              # Denne fil
```

## Installation

1. **Clone repositoryet**
```bash
git clone https://github.com/kristiankirkegaardmusic-web/cd-portfolio.git
cd cd-portfolio
```

2. **Åbn filen i browser**
   - Dobbeltklik på `index.html` eller
   - Brug en lokal server (anbefalet)

3. **Brug lokal server (Python)**
```bash
python -m http.server 8000
```
Åbn derefter `http://localhost:8000` i din browser

## Brug

### Tilføj dine egne projekter

Redigér `js/data.js` og tilføj dine projekter:

```javascript
{
    id: 4,
    artist: "Dit navn",
    title: "Dit projekt",
    description: "Beskrivelse af dit projekt...",
    image: "URL til billede",
    video: "YouTube embed URL",
    gallery: [
        "URL til billede 1",
        "URL til billede 2",
        "URL til billede 3",
        "URL til billede 4"
    ],
    color: 0x1a1a1a,  // Hexadecimal farve
    position: { x: -3.5, y: 0.5, z: 0 }
}
```

### Tilpas farver

I `data.js`, ændr `color` egenskaben med din ønskede farve:
- Sort: `0x000000`
- Grå: `0x666666`
- Teal: `0x00a890`
- Brugerdefineret: Konverter RGB til hexadecimal

### YouTube Video Embeds

For at få YouTube embed URL:
1. Gå til YouTube video
2. Klik "Del" → "Integrer"
3. Kopier URL fra `src` attributten
4. Format: `https://www.youtube.com/embed/VIDEO_ID`

## Teknologi Stack

- **Three.js** - 3D grafik bibliotek
- **HTML5/CSS3** - Markup & styling
- **Vanilla JavaScript** - Interaktivitet
- **WebGL** - 3D rendering

## Browser Support

- Chrome (anbefalet)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance Tips

- Optimér billeder (komprimér før upload)
- Brug CDN links for eksterne ressourcer
- Test på lav-end devices
- Monitor GPU usage

## Anpassning

### Ændr baggrund farve
I `css/style.css`, find `.container` og ændr `background` farve:
```css
.container {
    background: #fafafa; /* Ændr denne farve */
}
```

### Ændr CD størrelse
I `js/cd.js`, find `createCDGeometry()` og ændr tal i `CylinderGeometry(1.2, 1.2, 0.08, 64)`:
- Første tal: radius (størrelse)
- Tredje tal: tykkelse
- Fjerde tal: segments (glathed)

### Ændr animationshastighed
I `js/cd.js`, find `update()` metoden og ændr tal:
```javascript
this.currentPullDistance += (this.targetPullDistance - this.currentPullDistance) * 0.08; // Ændr 0.08
this.rotationVelocity = Math.min(this.rotationVelocity + 0.04, 0.15); // Ændr 0.04 og 0.15
```

## Troubleshooting

**Problemet:** CD'erne vises ikke
- Løsning: Tjek browserens konsol (F12) for fejl
- Sikr at Three.js CDN URL er tilgængelig

**Problemet:** Modal åbnes ikke
- Løsning: Tjek at `modal.js` er korrekt indlæst
- Kontroller at CD data er korrekt formateret

**Problemet:** Videoer spiller ikke
- Løsning: Tjek YouTube embed URL format
- Sikr at video ikke er privat/blokeret

## License

MIT License - Frit til brug og ændring

## Kontakt

Kristian Kirkegaard Music
- GitHub: [@kristiankirkegaardmusic-web](https://github.com/kristiankirkegaardmusic-web)
- Email: kristiankirkegaardmusic@gmail.com

---

**Vigtig bemærkning:** Tjek altid browserens developer tools (F12) for performance og debugging.
