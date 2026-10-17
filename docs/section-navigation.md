# Abschnittslinks und Browser-Zurück

Stand: 17. Oktober 2026.

## Beobachtung vor der Korrektur

Auf `/case-studies` und `/loesungen/webdesign` liess sich folgender Fehler nachstellen: Nach einem nativen Abschnittssprung, dem Wechsel in den Marketing-Setup-Check und Browser-Zurück zeigte die Adresse wieder auf die Ausgangsseite mit Fragment, während deren Inhalt noch den Check zeigte. Ohne vorherigen Abschnittssprung stellte Chrome die Ausgangsseite wieder her. Die Fallseite wurde zuvor auch im Codex In-App Browser mit derselben Abweichung beobachtet.

Die betroffenen Abschnittslinks verwenden jetzt `next/link`. Das folgt der Dokumentation der installierten Next-Version für die Navigation zu einer `id`. Es wurde kein eigener History-Handler hinzugefügt.

## Regressionsprüfung im echten Browser

Vor jedem Durchlauf die Ausgangsseite frisch öffnen. Keine Kontakt- oder Bewerbungsformulare ausfüllen oder abschicken.

| Ausgangsseite | Abschnittssprung | Danach öffnen | Erwartung nach Browser-Zurück |
| --- | --- | --- | --- |
| `/case-studies` | Checks selbst ausprobieren | Marketing-Setup-Check | `/case-studies#results` und H1 «Von der Frage zum nächsten Schritt.» |
| `/loesungen/webdesign` | Beispiele ansehen | Ihren Auftritt einordnen | `/loesungen/webdesign#beispiele` und Webdesign-H1 |
| `/branchen/beratung` | Möglichkeiten ansehen | Ihr Marketing-Setup prüfen | `/branchen/beratung#bereiche` und Beratungs-H1 |
| `/` | Video ansehen | Check starten im Hauptmenü | `/#firmenvideo` und Startseiten-H1 |
| `/branchen` | Passende Beispiele ansehen | Ihren Einstieg finden | `/branchen#branchen` und Branchenübersicht-H1 |
| Jobdetailseite | Für diese Stelle bewerben | Zusammenarbeit im Hauptmenü | Jobadresse mit `#bewerbung` und der ursprüngliche Jobtitel |

Jeweils sowohl die tatsächliche Adresse als auch die sichtbare H1 prüfen. Eine geänderte Adresse allein beweist die Wiederherstellung nicht. Bei einem verzögerten Zustand dieselbe Navigation beobachten; nicht aufgrund eines einzelnen Messzeitpunkts eine neue Ursache erfinden.

Diese Prüfung ist eine Browserprüfung. Die vorhandenen HTTP-/Unit-Tests prüfen weiterhin erreichbare Zielseiten, Inhalte, Metadaten und Formulare; sie belegen den clientseitigen Rücksprung nicht. Vorher-/Nachher-Protokolle liegen in der zugeordneten OneDrive-Nachweisablage. Der Testbereich `/beste-variante` samt Telefonie bleibt ausserhalb dieser Korrektur.

Lokaler Produktionsbuild: alle sechs Wege mit tatsächlicher Zieladresse, Zielüberschrift und wiederhergestellter Ausgangsüberschrift bestanden. Der erste Sammellauf wartete bei zwei Wegen auf einen nicht zuverlässig passenden Überschriften-Selektor. Die gezielte Wiederholung wartete auf die tatsächliche Zieladresse und verglich danach den normalisierten sichtbaren H1-Text. Dieses korrigierte Prüfprotokoll heisst `section-navigation-lokal-verifiziert.json`; der erste Lauf bleibt erhalten.
