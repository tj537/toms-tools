# 🧰 Toms Tools

**24 kleine Werkzeuge in einer einzigen HTML-Datei – offline, ohne Installation, ohne Cloud.**

Doppelklick, und es läuft. Bilder bearbeiten, PDFs zusammenfügen, Fotos sortieren, Farbpaletten bauen, Shader-Kunst rendern, Rechnungen schreiben – alles im Browser, alles auf deinem Rechner.

![Version](https://img.shields.io/badge/version-1.2.1-7c6cff)
![Lizenz: MIT](https://img.shields.io/badge/lizenz-MIT-22c55e)
![Eine Datei](https://img.shields.io/badge/eine%20Datei-HTML-f97316)
![Offline](https://img.shields.io/badge/100%25-offline-0ea5e9)

![Startseite von Toms Tools](docs/home.png)

> 🇬🇧 **English:** A collection of 24 offline tools (image editing, PDF merging, photo sorting, color palettes, shader art, invoices …) packed into one single HTML file. No install, no account, no network access – everything runs locally in your browser. The interface is German; an English mode for the home page is built in (Settings → Start → Language), more is coming.

---

## ✨ Warum?

- **Eine Datei.** Keine Installation, kein Konto, kein Build-Schritt. Die Datei kann auf einem USB-Stick liegen oder im OneDrive.
- **Wirklich lokal.** Eine Content-Security-Policy sperrt die Seite komplett vom Netz aus: Sie *kann* gar nichts hochladen oder nachladen. Kein Tracking, keine Werbung, keine Server.
- **Schnell.** Alles läuft direkt im Browser, Grafik-Lastiges auf der Grafikkarte (WebGL2).
- **Deine Daten gehören dir.** Gespeichert wird im Browser – mit Backup-Export und automatischer Sicherung in einen Ordner deiner Wahl.

## 🧩 Die Apps

### 🖼️ Bilder & Dateien
| App | Was sie macht |
|---|---|
| **Bildwerk** | Bilder zuschneiden, freistellen, mit Ebenen, Text und Effekten bearbeiten |
| **LUT-Werk** | Farb-Looks als 3D-LUT erstellen, `.cube` importieren und auf viele Bilder anwenden |
| **Metawerk** | EXIF-Metadaten von Bildern ansehen, bearbeiten oder entfernen |
| **WebP Converter** | Bilder stapelweise ins platzsparende WebP-Format umwandeln |
| **PDF-Werk** | PDFs zusammenführen, teilen, Seiten drehen und sortieren |
| **Bildbenamung** | Bildnamen aus Bausteinen zusammenklicken und direkt umbenennen |
| **Bulk Rename** | Viele Dateien auf einmal umbenennen – mit Regeln und Vorschau |
| **Sortierwerk** | Fotoordner nach Aufnahmedatum, Kamera, Ausrichtung oder Dateityp in Unterordner sortieren |

### 🎨 Design & Grafik
| App | Was sie macht |
|---|---|
| **Farbwerk** | Farbpaletten zusammenstellen, Farbwähler, Farbcodes per Klick kopieren |
| **QR-Werk** | QR-Codes für Links, WLAN und Kontakte erstellen und gestalten |
| **Shaderwerk** | Fraktale und generative Kunst in Echtzeit – über 30 Vorlagen, eigener Code, Musik-Modus, Video-Export |

### ✍️ Text, Präsentation & Sprache
| App | Was sie macht |
|---|---|
| **Textwerk** | Textstatistik & Lesbarkeit, Teleprompter, Blindtext, sichere Passwörter |
| **Codewerk** | JSON, Regex, Base64, URL, Hashes, UUIDs, Zeitstempel, Zahlensysteme, JWT |
| **Spickzettel** | Sonderzeichen, Snippets und Vorlagen – ein Klick kopiert |
| **Pitcher** | Markdown schreiben und als Präsentation im Vollbild zeigen |
| **Laberwerk** | Texte mit den Stimmen deines Systems vorlesen lassen |

### 🗂️ Organisation & Planung
| App | Was sie macht |
|---|---|
| **Notizen** | Bunte Notizkarten mit Checklisten und ein Notizblock mit Tabs |
| **Todo** | Aufgaben mit Projekten, Prioritäten, Fristen – als Liste oder Kanban-Board |
| **Gedankenwerk** | Mindmaps bauen, gestalten und als Bild oder Text exportieren |
| **Timer** | Großer Countdown im Vollbild mit Warnfarben und Signalton |
| **Rechnungswerk** | Saubere Rechnungen mit Logo, MwSt. und GiroCode – als PDF |

### 🎲 Spaß & Musik
| App | Was sie macht |
|---|---|
| **Entscheidungshilfe** | Glücksrad, Münze oder Orakel – lass den Zufall entscheiden |
| **Spielwiese** | Kleine Spiele: Twin-Stick-Shooter, Tipptrainer, Reaktionstest und mehr |
| **Beatwerk** | Drums, Bass und Melodie – Beats und Loops im Browser bauen |

Dazu immer griffbereit in der oberen Leiste: **Pomodoro-Timer** und **Taschenrechner**.

![Shaderwerk](docs/shaderwerk.png)

## 🚀 Loslegen

1. **`toms-tools.html` herunterladen** – unter [Releases](../../releases) oder oben über *Code → Download ZIP*.
2. **Doppelklick** auf die Datei – sie öffnet sich im Browser.
3. Fertig. Tipp: Als Lesezeichen speichern oder an die Taskleiste anheften.

**Browser:** Am besten **Chrome, Edge, Brave oder Opera**. Firefox und Safari gehen für die meisten Apps auch – nur die Funktionen mit direktem Ordnerzugriff (Bulk Rename, Sortierwerk, Ordner-Sicherung) und die Pipette brauchen einen Chromium-Browser.

## 💾 Deine Daten

- Alles wird im **Browser-Speicher** abgelegt (pro Browser und Rechner).
- Unter **Einstellungen → Speicher & Sicherung** kannst du ein **Backup exportieren/importieren** oder die **Ordner-Sicherung** einschalten: Toms Tools schreibt dann automatisch eine Sicherung in einen Ordner deiner Wahl (z. B. OneDrive) – samt täglicher Kopien. So kommst du auch auf einem zweiten PC an deine Daten.
- ⚠️ Wer die Browserdaten löscht, löscht auch die Toms-Tools-Daten. Also: Sicherung einschalten.

## 🔒 Datenschutz & Sicherheit

- Die Seite bringt eine strenge **Content-Security-Policy** mit (`default-src 'none'`, Verbindungen nur zu `data:`/`blob:`). Der Browser verhindert damit jede Verbindung ins Internet – auch versehentliche.
- Es gibt **keine Analyse, keine Cookies von Dritten, keine externen Schriften oder Skripte**.
- Passwörter, Hashes und JWTs aus Textwerk/Codewerk werden **nie gespeichert**.
- Einziger Link nach draußen: der freiwillige Kaffee-Knopf in den Einstellungen – er öffnet PayPal in einem neuen Tab.

## ⌨️ Tastenkürzel

| Kürzel | Aktion |
|---|---|
| `Alt` + `0` | Startseite |
| `Alt` + `1` … `9` | Zum offenen Tab 1 … 9 |
| `Alt` + `W` | Tab schließen |
| `Strg` + `,` | Einstellungen |

## 🛠️ Unter der Haube

- Reines **HTML, CSS und JavaScript** – kein Framework, keine Abhängigkeiten, kein Build.
- Etwa 3 MB groß, davon rund 2 MB für die eingebetteten PDF-Bibliotheken (werden erst beim Öffnen von PDF-Werk geladen).
- **WebGL2** für Shaderwerk und LUT-Werk, **File System Access API** für die Ordner-Funktionen.
- Versionen nach [SemVer](https://semver.org/lang/de/), jede Version hat einen Git-Tag.

## 💬 Feedback

Fehler gefunden oder eine Idee für ein neues Werkzeug? Einfach ein [Issue](../../issues) aufmachen.

## ☕ Unterstützen

Wenn dir Toms Tools Zeit spart: [Spendier mir einen Kaffee](https://paypal.me/tf443). Danke!

## 📄 Lizenz

Toms Tools steht unter der **[MIT-Lizenz](LICENSE)** – du darfst es frei nutzen, verändern und weitergeben, solange der Lizenzhinweis erhalten bleibt.

Eingebettete Fremdbibliotheken behalten ihre eigenen Lizenzen:

- [pdf-lib](https://pdf-lib.js.org) 1.17.1 – MIT (enthält tslib, © Microsoft, Apache 2.0)
- [pdf.js](https://mozilla.github.io/pdf.js/) 3.11.174 – Apache 2.0, © Mozilla Foundation
- Der QR-Kodierer folgt dem [QR Code generator](https://www.nayuki.io/page/qr-code-generator-library) von Project Nayuki – MIT

---

<p align="center">made with ♥ by Tom &amp; Claude</p>
