# Website-Anfrage ins AgenticIT-CRM

Stand: 18. Oktober 2026. D03 des Schlachtplans. Sabir hat «Felder und Prüfaufgabe freigeben» ausdrücklich bestätigt. Der erweiterte bestehende Zoho-Flow ist veröffentlicht und zeigt «Live». Die eindeutige Vercel-Bindung und der dazugehörige Produktions-Redeploy sind noch offen: Die Browser-Anmeldung verlangt einen Passkey-Schritt durch Sabir. Keine echte Anfrage wurde abgesendet.

## Freigegebene Einrichtung

- Bestehender Flow «KI-Analyse Leads → Zoho CRM», AgenticIT GmbH, sr@agenticit.ch; vorhandene Verbindung `zoho_crm` wiederverwendet. Aktiver CRM-Nutzer und tatsächliche Feldmetadaten wurden über genau diese Verbindung gelesen. Keine neue Berechtigung oder neue Verbindung angelegt.
- Reihenfolge: Webhook → `agenticit_website_intake` → Entscheidung «Altweg erkennen». Funktionsparameter `${webhookTrigger.payload}`, Ausgabe `websiteIntake`. Nur `websiteIntake.state equals legacy_passthrough` erreicht die unveränderte bisherige Aktion «Create or update lead»; der Standardzweig endet. Der ältere Analyse-Absender wird anhand fehlender `source`, `goal=agentische-analyse` und vorhandener `analysis` erkannt und führt in der neuen Funktion keine CRM-Aktion aus.
- Moderne Website-Anfragen erhalten vollständigen Plan/Nachricht, genaue Quelle, Seitenadresse, Eingangszeit, Kontaktwunsch und Prüfauftrag in der Beschreibung. `Firma_Gruppe=AgenticIT`, `Funnel_Landingpage` und `N_chste_Aktion` nutzen vorhandene Felder. Kein erfundener Lead-Source-Picklistwert. Vorhandene Beschreibung wird erhalten; reicht ihr Feld nicht, bleibt sie unverändert und der vollständige neue Kontext steht in der Aufgabe.
- Neue Leads erhalten den bestätigten Verantwortlichen Sabir; eindeutig zugehörige vorhandene Leads behalten ihren Besitzer. Nur exakte E-Mail-Treffer mit AgenticIT-Gruppe, eigener Landingpage, leerem Kundenbezug und vorhandenem Besitzer werden aktualisiert. Fremde/mehrdeutige Treffer oder überschrittene Feldlängen erzeugen ausschliesslich einen getrennten internen Prüfvorgang bei Sabir, ohne fremden Lead zu überschreiben oder Werte zu kürzen.
- Interne Aufgabe: tatsächlicher Lead-Verantwortlicher, `Status=Not Started`, `Priority=Normal`, Verknüpfung über `What_Id` und `$se_module=Leads`. Bei unklarem Kundenkontext keine Lead-Verknüpfung. Explizit keine Benachrichtigungs-E-Mail, Erinnerung, Telefonie, Buchung oder ausgehende Nachricht. Neue CRM-Schreibaufrufe setzen `trigger=[]` und überspringen Cadences. Die bestehende Altaktion bleibt unverändert.
- Identische Zustellung wird über einen Inhalts-/Zeitstempel-Hash und vorhandene Aufgaben erkannt. Dies ist eine Suchprüfung vor dem Anlegen, keine atomare Genau-einmal-Garantie bei gleichzeitigen Zustellungen oder verzögerter Suchindexierung. Eine erneute freiwillige Einsendung mit neuem Zeitstempel ist eine neue Anfrage.

## Prüfnachweise und verbleibende Abnahme

- Gespeicherten Funktionscode erneut geöffnet und gegen `integrations/zoho/website-intake.deluge` verglichen: bis auf abschliessenden Zeilenumbruch gleich. Parameter und Bedingung nach erneutem Öffnen bestätigt. Veröffentlichungsdialog bestätigt die tatsächlichen Verbindungen; anschliessend «Live» gelesen und Bildschirmnachweis gesichert.
- 13 moderne Fälle und der Altweg liefen im tatsächlichen Zoho-Funktionseditor schreibfrei mit `_preview=true` und synthetischen Fixtures. Geprüft: neuer/eigener/fremder/Kunden-Datensatz, Mehrdeutigkeit, Wiederholungen, Feldlängen, Einwilligung, Quellen und Seitenkontext. Keine produktive CRM-Anlage oder Aktualisierung durch diese Prüfungen. Die Website gibt `_preview` und `_fixtures` nicht weiter.
- Fünf lokale Quellcode-Leitplanken und zwölf isolierte Website-Endpunkttests bestanden. Alle externen Abrufe der Endpunkttests sind gemockt.
- Ein sehr grosser Prüffall mit 31'950 Zeichen bestehender Beschreibung scheiterte im Zoho-Testdialog an einer allgemeinen Plattformfehlermeldung. Ursache und obere Grenzfall-Abnahme offen; nicht als bestanden zählen.
- Der produktive API-Schreib-/Rücklesezweig ist ohne echten Datensatz nicht Ende zu Ende geprüft. Ein Webhook-HTTP-Erfolg beweist keinen CRM-Eingang. Funktionsantworten mit `ok=false` sind ausdrücklich als Fehlerzustand zurückgegeben; eine automatisch garantierte Wiederholung oder Alarmierung ist damit nicht belegt.
- Vercel: vorhandene Variable `LEADS_WEBHOOK_URL` ist vom Typ Sensitive und derzeit für Production/Preview vorhanden. Neuer Wert noch nicht gespeichert, kein neuer Produktions-Redeploy. Die aus dem richtigen Flow gelesene Adresse bleibt nur im Arbeitsspeicher, nie in Code, Nachweis oder synchronisierter Übergabe.
- Nachweise unter `Umsetzung-2026-10-18/Nachweise/crm-approved-*`. Kein Testlead, keine Kundenmitteilung, kein Anruf und kein Termin. Mia/TestLeads sowie andere Kundenwege wurden nicht geändert.

## Direkt geprüfter Ausgangspunkt vor der Freigabe

Zoho Flow: AgenticIT GmbH, Anmeldung sr@agenticit.ch, Organisation 20115207906. Bestehender aktiver Flow «KI-Analyse Leads → Zoho CRM». Zwei Schritte: Webhook und Create or update lead. Die Aktion beschreibt ein Aktualisieren bei gleicher E-Mail; das ist kein unabhängiger Nachweis eines dauerhaften Dublettenschutzes.

Die tatsächlich gerenderten Variablenpfade verwenden Kleinbuchstaben, beispielsweise webhookTrigger.payload.company. Gross dargestellte Chip-Namen wie «Company» sind Anzeigetexte und kein belegter Namenskonflikt.

| CRM-Feld           | Bestehender Bezug              | Befund                                                                                   |
| ------------------ | ------------------------------ | ---------------------------------------------------------------------------------------- |
| Firma              | webhookTrigger.payload.company | zugeordnet                                                                               |
| Nachname           | webhookTrigger.payload.name    | vollständiger Name bisher in diesem Feld; keine neue Namenstrennung vorschlagen          |
| E-Mail             | webhookTrigger.payload.email   | zugeordnet                                                                               |
| Tel.               | webhookTrigger.payload.phone   | zugeordnet                                                                               |
| Webseite           | webhookTrigger.payload.website | bestehende Zuordnung; kein aktuelles Pflichtfeld der Check-Formulare                     |
| Ort / PLZ          | Webhook-Chips City / Zip       | Bestandsfelder, keine zusätzliche Erhebung geplant                                       |
| Lead-Besitzer      | leer                           | keine ausdrückliche Zuweisung im Flow; kein Beweis eines fehlenden CRM-Standardbesitzers |
| Beschreibung       | leer                           | Check-Plan oder Nachricht nicht zugeordnet                                               |
| Lead-Quelle / Tag  | leer                           | Quelle nicht zugeordnet                                                                  |
| Funnel Landingpage | leer                           | Seitenkontext nicht zugeordnet                                                           |
| Nächste Aktion     | leer                           | übergebener Prüfauftrag nicht zugeordnet                                                 |

Kein eigener Aufgabenschritt vorhanden. «Trigger for» steht auf «All the above»; die Oberfläche bietet None, Workflows, Approvals, Blueprints und Orchestration. Welche bestehenden CRM-Regeln dadurch tatsächlich laufen, ist nicht geprüft. Keine pauschale Aussage, dass bereits Nachrichten oder Anrufe ausgelöst werden.

Die Website erstellt message, source, goal, contactMethod, followUpTask und submittedAt serverseitig. Die fünf Checks und die Anfragenplanung senden ihren abgeleiteten Plan in message; /kontakt setzt die persönliche Nachricht mit festem Seitenkontext. Für diese aktuellen Strecken wird marketingConsent=false gesetzt. Das bedeutet keine Newsletter- oder allgemeine Outreach-Einwilligung. Dateien und Quellcode sind geprüft, nicht der tatsächliche produktive CRM-Eingang.

## Ursprünglicher Änderungsvorschlag vor der Freigabe

1. Die geschützte Website-Verbindung eindeutig an diesen bestätigten AgenticIT-Flow binden. Bestehenden geheimen Webhook ausschliesslich direkt in der geschützten Hosting-Konfiguration verwenden, nie in Code, Übergabe oder Screenshots. Der bisher geschützte Produktionswert ist nicht lesbar; gleiche Bindung daher nicht behaupten.
2. Beschreibung aus Nachricht/Plan sowie Quelle, Anliegen, gewünschtem Kontaktweg und Eingangszeit befüllen. Vollständigen Plan erhalten, Feldlänge vor Speicherung prüfen. Keine ungeprüfte Kürzung oder nur den ersten Download-Abschnitt übernehmen.
3. Nächste Aktion mit followUpTask befüllen. Source als genaue Herkunft erhalten. Picklist-Werte oder Array-Tags erst nach Prüfung des vorhandenen Zielformats zuordnen; keine erfundenen Enum-Werte oder neue CRM-Felder anlegen.
4. Vor einem Update den Firmen-/Kundenkontext prüfen. Ein bestehender Datensatz mit derselben E-Mail aus einem anderen Kundenweg darf nicht blind überschrieben werden. Eine nicht eindeutig zuordenbare Anfrage braucht einen getrennten, persönlich zu prüfenden Vorgang. Keine garantierte Mandantentrennung aus der Flow-Beschriftung ableiten.
5. Nach erfolgreichem Upsert eine interne Prüfaufgabe an genau den zurückgegebenen Lead hängen und dem tatsächlichen Lead-Verantwortlichen zuordnen. Bestehenden Besitzer eines aktualisierten Leads nicht pauschal überschreiben. Die genaue Ausgabevariable und Aufgabenverknüpfung werden bei der freigegebenen Einrichtung geprüft. Keine offene Telefonie-, Mail- oder Kalenderaktion ergänzen.
6. CRM-Auslöser nicht erweitern. Bestehende Regeln vor einer eventuellen echten Zustellungsprüfung auf unerwartete Aussenwirkungen prüfen. Eine Aufgabe zur persönlichen Bearbeitung ist keine Freigabe zum automatischen Versand.

Dieser Vorschlag betrifft nur freiwillige Anfragen der AgenticIT-Firmenwebsite. TestLeads, Mia, Versicherungs-Landingpages, andere Firmen-/Kundenwege und deren Flows bleiben ausserhalb dieses Schritts. Keine neue Verbindung, kein neuer Schlüssel und kein direkter API-Ersatz auf Verdacht.

## Abnahme nach einer gesondert freigegebenen Einrichtung

- Zuordnungen nach erneutem Öffnen direkt lesen; richtigen Zielmandanten und Verbindung bestätigen.
- Ohne gespeicherten CRM-Eingang keinen fertigen Ende-zu-Ende-Prozess behaupten. Ein HTTP-Erfolg des Webhooks reicht nicht.
- Eine echte Zustellungsprüfung braucht einen separat autorisierten Datensatz; hier keinen Testlead anlegen oder absenden. Datensatz und zugehörige Prüfaufgabe jeweils genau einmal belegen, Plan/Quelle/Kontaktwunsch vergleichen.
- Wiederholte Anfragen dürfen weder vorhandene Zuständigkeiten verlieren noch ungeprüft doppelte Aufgaben erzeugen. Stabile Wiederholungskennung und Verhalten des bestehenden Upserts vor Aktivierung klären; kein garantierter sitzungsübergreifender Dublettenschutz aus Website-Tests ableiten.

## Ursprüngliche Freigabegrenze

Sabirs hinterlegte AGENTS.md-Auftragsgrenzen verlangen für eine neue Automation eine ausdrückliche Anweisung. Das automatische Anlegen einer CRM-Prüfaufgabe ist ein solcher neuer Schritt. Feldzuordnung, eindeutige geschützte Bindung und diese konkrete interne Aufgabe werden deshalb einmal gebündelt zur Freigabe vorgelegt. Keine zusätzliche Testanfrage, Nachricht, Buchung oder Telefonie ist darin enthalten.

Zwölf isolierte Prüfungen des vorhandenen Lead-Endpunkts bestanden. Alle externen Abrufe werden dabei durch einen lokalen Mock ersetzt; die fiktiven Beispieladressen verlassen den Prozess nicht. Die fünf Check-Pläne, Freigabe, Kontrollaufwand und ausdrückliche Fehlerfälle sind damit im Website-Code geprüft, kein produktiver CRM-Eingang oder neue Aufgabenerstellung.

Nachweise: crm-intake-field-review.json und crm-intake-offline-tests.txt in Umsetzung-2026-10-18/Nachweise. Nur Zuordnungsausdrücke und leere Konfigurationsfelder, keine Kundendaten oder geheimen Webhook-Adressen. Dialog mit Abbrechen verlassen, nichts gespeichert. Zwei bestehende Schritte und «Zuletzt gespeichert: Jun 25» unverändert; eigener Prüf-Tab danach geschlossen.
