# Blog-Videos

34 Artikel erhalten ein eigenes Video. Die Zuordnung liegt in `content/blog-videos.json`.

## Darstellung

- Blog-Karte: passendes Vorschaubild, Play-Symbol und echte Laufzeit. Der Link führt zum Artikel mit Video.
- Artikel: Player unmittelbar nach der Einleitung. Native Bedienelemente, Vollbild und Inline-Wiedergabe auf Mobile. Direkter Sprung zum Lesetext.
- Startseite: sechs kuratierte Videos in einer horizontalen Reihe. Die nächste Karte bleibt angeschnitten sichtbar. Wischen, Trackpad und Pfeiltasten sind nutzbar; ein Klick öffnet ein zugängliches Dialogfenster. Escape schliesst es, der Fokus kehrt zur gewählten Karte zurück.
- Keine automatisch laufende Reihe und keine automatisch startenden Tonspuren. Videos laden mit `preload="none"`; in der Reihe werden zunächst nur kleine WebP-Bilder geladen.

## Medien und Veröffentlichung

Die vom Nutzer gelieferten Originale bleiben ausserhalb Git in der bestehenden OneDrive-Medienablage erhalten. Die Web-Versionen behalten den gelieferten Dateinamen. Sie liegen lokal in `public/blog-videos/`, sind wegen ihrer Grösse in Git ausgeschlossen und müssen ausdrücklich im Hostinger-Release enthalten sein. Die 34 kleinen Poster sind versioniert.

Eine reine Git-Auslieferung ohne die separate Medienübernahme liefert keine Videos. Vor Veröffentlichung müssen Dateigrösse und SHA-256 zur Zuordnung passen. Beim Verpacken keine Originale, `.env`, Schlüssel, `node_modules` oder `.next` hinzufügen.

Die Web-Dateien verwenden H.264/AAC und Fast Start. Die vollständige Dekodierung jeder Datei, die Laufzeit und der MP4-Atomaufbau werden im OneDrive-Prüfbericht dokumentiert. Es werden keine Sprechertexte, Szenen oder Aussagen verändert. Die Auslieferung muss HTTP-Range-Anfragen für Spulen und mobile Wiedergabe unterstützen.

## Prüfung

`lib/blog-videos.test.ts`: vollständige eindeutige Zuordnung, Posterbudget, Laufzeiten und Wiedergabekoordination.

`lib/blog-videos-page.test.ts`: alle 34 Artikelseiten, Video- und Posteradressen, HTTP 206/Range, frühe Player-Platzierung und schlanke Startseite. Ziel über `SITE_TEST_BASE_URL` setzen.

Zusätzlich Desktop und Mobile prüfen: angeschnittene Nachbarkarte, Vor/Zurück, Suchfilter im Blog, Öffnen/Abspielen/Schliessen, Fokus-Rückgabe, Escape, Fehlerhinweis, kein horizontaler Seitenüberlauf.

Untertitel wurden nicht mitgeliefert. Der verlinkte Artikel ist eine Lesefassung zum Thema, kein geprüftes wortgetreues Transkript. Video-Suchergebnisse werden durch das Einbetten nicht garantiert. Eine eigene primäre Video-Seite wäre ein separater redaktioneller Schritt.

## Recherche vom 19. Oktober 2026

- Stripe Sessions: thematisch kuratierte Video-Bibliothek, klare Video-Einstiege: https://stripe.com/sessions/2026
- Apple Events: prägnante Vorschaubilder und eindeutige Watch-Aktionen: https://www.apple.com/apple-events/
- Wistia empfiehlt responsive Inline-Einbettungen für sichtbare, zugängliche Videos im Artikel und Popover für kompakte Video-Einstiege: https://support.wistia.com/en/articles/8233354-embed-your-media
- web.dev zu Vorschaubild und verzögertem Laden: https://web.dev/articles/lazy-loading-video
- Google zu sichtbaren Videos, stabilen URLs, Vorschauen und Grenzen der Video-Indexierung: https://developers.google.com/search/docs/appearance/video

Die Auswahl und Gestaltung für AgenticIT ist eine eigene Umsetzung dieser Muster; keine Behauptung, dass alle genannten Anbieter denselben Slider verwenden.
