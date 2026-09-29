# 🧰 Toms Tools

**31 kleine Werkzeuge in einer einzigen HTML-Datei – offline, ohne Installation, ohne Cloud.**

<p align="center">
  <a href="https://github.com/tj537/toms-tools/releases/latest/download/toms-tools.html"><img src="https://img.shields.io/github/v/release/tj537/toms-tools?style=for-the-badge&label=%E2%AC%87%EF%B8%8F%20Download&labelColor=7c6cff&color=c26bff" alt="Toms Tools herunterladen" height="56"></a>
  <a href="https://tj537.github.io/toms-tools/"><img src="https://img.shields.io/badge/%E2%96%B6%EF%B8%8F%20Live-ausprobieren-1f2937?style=for-the-badge&labelColor=374151" alt="Toms Tools live im Browser ausprobieren" height="56"></a>
  <br>
  <sub>Download lädt immer die neueste Version · Live läuft direkt im Browser · <a href="https://github.com/tj537/toms-tools/releases">Alle Versionen & Änderungen</a></sub>
</p>

Doppelklick, und es läuft – alles im Browser, alles auf deinem Rechner. **[👉 Alle 31 Apps ansehen](#apps)**

![100 % offline](https://img.shields.io/badge/100%25-offline-0ea5e9)
![Eine Datei](https://img.shields.io/badge/eine%20Datei-HTML-f97316)
![Ohne Admin-Rechte](https://img.shields.io/badge/ohne-Admin--Rechte-22c55e)
![Für Desktop](https://img.shields.io/badge/f%C3%BCr-Desktop-0891b2)
![Kein Tracking](https://img.shields.io/badge/kein-Tracking-64748b)
![Deutsch · English kommt](https://img.shields.io/badge/Deutsch-English%20kommt-8b5cf6)
![Work in Progress](https://img.shields.io/badge/status-work%20in%20progress-eab308)
![Gebaut mit Claude Opus](https://img.shields.io/badge/gebaut%20mit-Claude%20Opus-d97757)

![Startseite von Toms Tools](docs/home.png)

> 🇬🇧 **English:** 31 offline tools in one single HTML file – image editing, watermarks & AI labels, PDFs, text comparison, invoices, business models, charts, calculators, a source manager, flashcards and more. No install, no admin rights, no account: everything runs locally in your browser. Made by a beginner in marketing and web development, together with Claude Opus. The interface is German for now – more English is coming step by step (the home page already has it: Settings → Start → Language). Feedback welcome!

**Inhalt:** [Hi!](#hi) · [Das Besondere](#besonders) · [Die Apps](#apps) · [So wie du's brauchst](#anpassen) · [Loslegen](#loslegen) · [Deine Daten](#daten) · [Datenschutz](#datenschutz) · [Tastenkürzel](#tasten) · [Feedback](#feedback) · [Lizenz](#lizenz)

---

<a id="hi"></a>
## 👋 Hi!

Ich bin Tom. Auf der Arbeit und im Studium brauche ich ständig kleine Werkzeuge – vor allem rund um Marketing, BWL und Bilder. Also habe ich sie mir selbst gebaut, zusammen mit [Claude Opus](https://claude.ai), und stelle sie hier öffentlich. Vielleicht helfen sie ja auch dir.

Toms Tools ist mein erstes größeres Projekt – Feedback ist jederzeit willkommen!

- 🚧 **Work in Progress.** Es kommt laufend Neues dazu – und nach und nach auch mehr auf Englisch.
- 💻 **Für den Desktop gemacht.** Toms Tools ist für Chrome, Edge & Co. am Computer gedacht. Auf Handy und Tablet ist die Darstellung nicht überall geprüft, und Funktionen wie Ordnerzugriff oder Drag & Drop brauchen einen Desktop-Browser.
- 🐛 **Bestimmt sind noch Fehler drin.** Bei Apps, die Dateien umbenennen oder verschieben (Bulk Rename, Sortierwerk), erst mit einer Kopie testen.
- 💬 **Sag mir, was du denkst.** Ob Bug, Idee oder „das geht besser so“: einfach ein [Issue](../../issues) aufmachen.

<a id="besonders"></a>
## ✨ Das Besondere

- **Eine Datei.** Keine Installation, keine Admin-Rechte, kein Konto. Die Datei kann auf einem USB-Stick liegen oder im OneDrive – perfekt für den Arbeits-PC.
- **Wirklich lokal.** Eine Content-Security-Policy sperrt die Seite komplett vom Netz aus: Sie *kann* gar nichts hochladen oder nachladen. Kein Tracking, keine Werbung, keine Server.
- **Schnell.** Alles läuft direkt im Browser, Grafik-Lastiges auf der Grafikkarte (WebGL2).
- **Deine Daten gehören dir.** Gespeichert wird im Browser – mit Backup-Export und automatischer Sicherung in einen Ordner deiner Wahl.

<a id="apps"></a>
## 🧩 Die Apps

Klick auf eine Gruppe, um ihre Apps mit Screenshot aufzuklappen.

Dazu immer griffbereit in der oberen Leiste: **Pomodoro-Timer**, **Taschenrechner** und **Formatierung entfernen** – Text z. B. aus Word kopieren, auf den Knopf klicken, Strg + V drücken: Schon liegt er als reiner Text in der Zwischenablage, ohne Schrift, Farben und Word-Ballast.

<details>
<summary><b>🖼️ Bilder & Dateien</b> · 9 Apps</summary>
<br>

**Bildwerk** – Bilder zuschneiden, freistellen, mit Ebenen, Text und Effekten bearbeiten.

<img src="docs/bildwerk.png" alt="Bildwerk" width="720">

**LUT-Werk** – Farb-Looks als 3D-LUT erstellen, `.cube` importieren und auf viele Bilder anwenden.

<img src="docs/lutwerk.png" alt="LUT-Werk" width="720">

**Metawerk** – EXIF-Metadaten von Bildern ansehen, bearbeiten oder entfernen.

<img src="docs/metawerk.png" alt="Metawerk" width="720">

**Wasserzeichenwerk** – Text, Logo oder **KI-Label** auf Bilder setzen – einzeln oder ganz viele auf einmal (ZIP oder Ordner). Das KI-Label kann zusätzlich maschinenlesbar in die Datei geschrieben werden (IPTC), wie es der EU AI Act seit August 2026 verlangt.

<img src="docs/wasserzeichenwerk.png" alt="Wasserzeichenwerk" width="720">

**WebP Converter** – Bilder stapelweise ins platzsparende WebP-Format umwandeln.

<img src="docs/webp.png" alt="WebP Converter" width="720">

**PDF-Werk** – PDFs zusammenführen, teilen, Seiten drehen und sortieren.

<img src="docs/pdfwerk.png" alt="PDF-Werk" width="720">

**Bildbenamung** – Bildnamen aus Bausteinen zusammenklicken und direkt umbenennen.

<img src="docs/bildbenamung.png" alt="Bildbenamung" width="720">

**Bulk Rename** – Viele Dateien auf einmal umbenennen – mit Regeln und Vorschau.

<img src="docs/bulk-rename.png" alt="Bulk Rename" width="720">

**Sortierwerk** – Fotoordner nach Aufnahmedatum, Kamera, Ausrichtung oder Dateityp in Unterordner sortieren.

<img src="docs/sortierwerk.png" alt="Sortierwerk" width="720">

</details>

<details>
<summary><b>🎨 Design & Grafik</b> · 3 Apps</summary>
<br>

**Farbwerk** – Farbpaletten zusammenstellen, Farbwähler, Farbcodes per Klick kopieren.

<img src="docs/farbwerk.png" alt="Farbwerk" width="720">

**QR-Werk** – QR-Codes für Links, WLAN und Kontakte erstellen und gestalten.

<img src="docs/qrwerk.png" alt="QR-Werk" width="720">

**Shaderwerk** – Fraktale und generative Kunst in Echtzeit – über 30 Vorlagen, eigener Code, Musik-Modus, Video-Export.

<img src="docs/shaderwerk.png" alt="Shaderwerk" width="720">

</details>

<details>
<summary><b>✍️ Text, Präsentation & Sprache</b> · 6 Apps</summary>
<br>

**Textwerk** – Textstatistik & Lesbarkeit, Suchen & Ersetzen, Teleprompter, Blindtext, sichere Passwörter.

<img src="docs/textwerk.png" alt="Textwerk" width="720">

**Vergleichswerk** – Zwei Textversionen vergleichen – Änderungen Wort für Wort (oder Zeichen / Zeile) farbig markiert, mit Statistik und Sprung von Änderung zu Änderung.

<img src="docs/vergleichswerk.png" alt="Vergleichswerk" width="720">

**Codewerk** – JSON, Regex, Base64, URL, Hashes, UUIDs, Zeitstempel, Zahlensysteme, JWT.

<img src="docs/codewerk.png" alt="Codewerk" width="720">

**Spickzettel** – Sonderzeichen, Snippets und Vorlagen – ein Klick kopiert.

<img src="docs/spickzettel.png" alt="Spickzettel" width="720">

**Pitcher** – Markdown schreiben und als Präsentation im Vollbild zeigen.

<img src="docs/pitcher.png" alt="Pitcher" width="720">

**Laberwerk** – Texte mit den Stimmen deines Systems vorlesen lassen.

<img src="docs/sprechwerk.png" alt="Laberwerk" width="720">

</details>

<details>
<summary><b>🗂️ Organisation & Planung</b> · 5 Apps</summary>
<br>

**Notizen** – Bunte Notizkarten mit Checklisten und ein Notizblock mit Tabs.

<img src="docs/notizen.png" alt="Notizen" width="720">

**Todo** – Aufgaben mit Projekten, Prioritäten, Fristen – als Liste oder Kanban-Board.

<img src="docs/todo.png" alt="Todo" width="720">

**Gedankenwerk** – Mindmaps bauen, gestalten und als Bild oder Text exportieren.

<img src="docs/gedankenwerk.png" alt="Gedankenwerk" width="720">

**Timer** – Großer Countdown im Vollbild mit Warnfarben und Signalton.

<img src="docs/zeitwerk.png" alt="Timer" width="720">

**Rechnungswerk** – Saubere Rechnungen mit Logo, MwSt. und GiroCode – als PDF. Dazu Geschäftsbriefe.

<img src="docs/rechnungswerk.png" alt="Rechnungswerk" width="720">

</details>

<details>
<summary><b>📊 Business & Lernen</b> · 5 Apps</summary>
<br>

**Modellwerk** – 15 Vorlagen mit Leitfragen – von SWOT, Business Model Canvas und Persona bis Pro & Contra, Eisenhower-Matrix und SMART-Ziel. Export als Text, PNG oder PDF.

<img src="docs/modellwerk.png" alt="Modellwerk" width="720">

**Kennzahlwerk** – 17 Rechner mit Formel und Rechenweg – Prozente, Netto/Brutto, Zinseszins, Notenschnitt, ROI, CLV, Break-even, Nutzwertanalyse und mehr.

<img src="docs/kennzahlwerk.png" alt="Kennzahlwerk" width="720">

**Diagrammwerk** – Säulen-, Balken-, Linien- und Kreisdiagramme und Zeitpläne (z. B. Mo–Di Recherche, Di–Do Konzept) – Daten aus Excel einfügen, als PNG oder SVG exportieren oder direkt in Word/PowerPoint kopieren.

<img src="docs/diagrammwerk.png" alt="Diagrammwerk" width="720">

**Quellenwerk** – Bücher, Artikel und Links mit Notizen und Zitaten sammeln – Beleg mit „vgl.“ und Literaturverzeichnis per Klick kopieren (deutsch oder APA 7).

<img src="docs/quellenwerk.png" alt="Quellenwerk" width="720">

**Karteiwerk** – Karteikarten für jedes Thema mit Karteikasten-Prinzip: Du übst vor allem, was noch nicht sitzt. Import und Export für Anki und Quizlet, Lernserie 🔥.

<img src="docs/karteiwerk.png" alt="Karteiwerk" width="720">

</details>

<details>
<summary><b>🎲 Spaß & Musik</b> · 3 Apps</summary>
<br>

**Entscheidungshilfe** – Glücksrad-Maschine, Münzwurf oder Orakel – lass den Zufall entscheiden.

<img src="docs/entscheidung.png" alt="Entscheidungshilfe" width="720">

**Spielwiese** – Kleine Spiele: Twin-Stick-Shooter, Tipptrainer, Reaktionstest und mehr.

<img src="docs/spielwiese.png" alt="Spielwiese" width="720">

**Beatwerk** – Drums, Bass und Melodie – Beats und Loops im Browser bauen.

<img src="docs/beatwerk.png" alt="Beatwerk" width="720">

</details>

<a id="anpassen"></a>
## 🎛️ So wie du's brauchst

Du brauchst nicht alle 31 Apps? Kein Problem:

- **Apps ausblenden:** Unter *Einstellungen → Apps* schaltest du jede App einzeln an oder aus. Ausgeblendete Apps verschwinden von der Startseite – übrig bleibt dein persönlicher Werkzeugkasten. Deine Daten bleiben dabei erhalten. Oben neben „Apps“ siehst du, wie viele gerade aktiv sind (z. B. „24 / 31“).
- **Gruppen einklappen:** Auf der Startseite lassen sich die Gruppen (z. B. „Bilder & Dateien“) mit einem Klick zu- und aufklappen.
- **Aussehen:** Farbthema, Akzentfarbe, eigenes Hintergrundbild, dein Name in der Begrüßung und ob beim Start die letzte Sitzung wieder aufgeht – alles unter *Einstellungen*.

<a id="loslegen"></a>
## 🚀 Loslegen

1. **[`toms-tools.html` herunterladen](https://github.com/tj537/toms-tools/releases/latest/download/toms-tools.html)** – oder über den Download-Knopf ganz oben.
2. **Doppelklick** auf die Datei – sie öffnet sich im Browser.
3. Fertig. Tipp: Als Lesezeichen speichern oder an die Taskleiste anheften.

**Live ausprobieren:** Ohne Download geht es auch direkt im Browser unter **[tj537.github.io/toms-tools](https://tj537.github.io/toms-tools/)**. Die Daten liegen dann im Browser für diese Webseite – getrennt von der heruntergeladenen Datei. Mit *Backup exportieren / importieren* kannst du sie hin- und herschieben.

**Browser:** Toms Tools ist für den **Desktop** gemacht – am besten **Chrome, Edge, Brave oder Opera**. Auf Handy und Tablet ist die Darstellung nicht überall geprüft. Firefox und Safari gehen für die meisten Apps auch – nur die Funktionen mit direktem Ordnerzugriff (Bulk Rename, Sortierwerk, Ordner-Sicherung) und die Pipette brauchen einen Chromium-Browser.

<a id="daten"></a>
## 💾 Deine Daten & Speichern

- **Alles speichert sich automatisch** – sobald du tippst, klickst oder eine Karteikarte beantwortest. Einen Speichern-Knopf gibt es nicht, und du brauchst ihn auch nicht.
- Die Daten liegen **nur in deinem Browser auf deinem Rechner** (pro Browser). Nichts wird an einen Server geschickt.
- **Ordner-Sicherung (empfohlen):** Unter *Einstellungen → Speicher & Sicherung* einen Ordner wählen, z. B. in OneDrive. Toms Tools schreibt dann bei jeder Änderung automatisch die Datei `toms-tools-daten.json` hinein – plus tägliche Kopien der letzten 14 Tage im Unterordner `sicherungen`. Geht in Chrome, Edge und Brave.
- **Zweiter PC:** Dort denselben Ordner wählen und *Aus Ordner laden* – schon sind Notizen, Karteikarten, Quellen & Co. auch da.
- **Backup exportieren / importieren:** Alles als eine Datei zum Mitnehmen – funktioniert in jedem Browser.
- **Speicherplatz:** Der Browser gibt Toms Tools rund 5 MB. Wie viel jede App davon belegt, siehst du ebenfalls unter *Speicher & Sicherung*.
- ⚠️ Wer die Browserdaten löscht, löscht auch die Toms-Tools-Daten. Also: Ordner-Sicherung einschalten.

<a id="datenschutz"></a>
## 🔒 Datenschutz & Sicherheit

- Die Seite bringt eine strenge **Content-Security-Policy** mit (`default-src 'none'`, Verbindungen nur zu `data:`/`blob:`). Der Browser verhindert damit jede Verbindung ins Internet – auch versehentliche.
- Es gibt **keine Analyse, keine Cookies von Dritten, keine externen Schriften oder Skripte**.
- Passwörter, Hashes und JWTs aus Textwerk/Codewerk werden **nie gespeichert**.
- Links nach draußen öffnen sich nur, wenn du sie anklickst – jeweils in einem neuen Tab: der freiwillige Kaffee-Knopf in den Einstellungen (PayPal) und die Links, die du selbst im Quellenwerk speicherst.

<a id="tasten"></a>
## ⌨️ Tastenkürzel

| Kürzel | Aktion |
|---|---|
| `Alt` + `0` | Startseite |
| `Alt` + `1` … `9` | Zum offenen Tab 1 … 9 |
| `Alt` + `W` | Tab schließen |
| `Strg` + `,` | Einstellungen |

## 🛠️ Unter der Haube

- Reines **HTML, CSS und JavaScript** – kein Framework, keine Abhängigkeiten, kein Build.
- Etwa 3,5 MB groß, davon rund 2 MB für die eingebetteten PDF-Bibliotheken (werden erst beim Öffnen von PDF-Werk geladen).
- **WebGL2** für Shaderwerk und LUT-Werk, **File System Access API** für die Ordner-Funktionen.
- Versionen nach [SemVer](https://semver.org/lang/de/), jede Version hat einen Git-Tag.

<a id="feedback"></a>
## 💬 Feedback

Fehler gefunden, eine Idee für ein neues Werkzeug oder Kritik am Code? Einfach ein [Issue](../../issues) aufmachen. Ich freue mich über jede Rückmeldung, auch über ehrliche.

<a id="lizenz"></a>
## 📄 Lizenz

Toms Tools steht unter der **[MIT-Lizenz](LICENSE)** – du darfst es frei nutzen, verändern und weitergeben, solange der Lizenzhinweis erhalten bleibt.

Eingebettete Fremdbibliotheken behalten ihre eigenen Lizenzen:

- [pdf-lib](https://pdf-lib.js.org) 1.17.1 – MIT (enthält tslib, © Microsoft, Apache 2.0)
- [pdf.js](https://mozilla.github.io/pdf.js/) 3.11.174 – Apache 2.0, © Mozilla Foundation
- Der QR-Kodierer folgt dem [QR Code generator](https://www.nayuki.io/page/qr-code-generator-library) von Project Nayuki – MIT

---

<p align="center">made with ♥ by Tom &amp; Claude · work in progress</p>
