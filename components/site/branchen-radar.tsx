"use client"

// Branchen-Radar (29.07.2026) — ersetzt Potenzialrechner + ROI-Rechner auf der
// Startseite. Zwei Klicks (Branche → Region), dann: wie viel wird gesucht,
// was ist die Nachfrage wert, und welche 10 Anbieter holen sie sich gerade.
//
// Datenbasis: Ubersuggest (locId 2756 Schweiz, de), Keyword-Mix mit ~50
// Endkunden-Keywords je Branche; regionale Top-10 aus SERP-Analysen der
// Kern-Keywords in den Städten der Region (Lücken via Google-Websuche
// ergänzt). Stand: Juli 2026. Regionale Volumen sind Schätzungen nach
// Bevölkerungsanteil der Deutschschweiz — so gekennzeichnet.

import { useState } from "react"

type RegionId = "mittelland" | "nordwestschweiz" | "zuerich" | "nordostschweiz" | "innerschweiz"

type Dom = { d: string; p?: boolean } // p = Portal/Verzeichnis

type Branche = {
  id: string
  label: string
  vol: number // Suchanfragen/Monat Deutschschweiz (Keyword-Mix)
  cpc: number // Ø CPC CHF der Top-Keywords
  kws: number // Anzahl Keywords im Mix
  top: { kw: string; vol: number }[]
  regions: Record<RegionId, Dom[]>
}

const REGIONS: { id: RegionId; label: string; share: number; cities: string }[] = [
  { id: "mittelland", label: "Mittelland", share: 0.23, cities: "Bern · Biel · Solothurn · Thun" },
  { id: "nordwestschweiz", label: "Nordwestschweiz", share: 0.2, cities: "Basel · Aarau · Baden" },
  { id: "zuerich", label: "Zürich-Region", share: 0.26, cities: "Zürich · Winterthur" },
  { id: "nordostschweiz", label: "Nordostschweiz", share: 0.17, cities: "St. Gallen · Chur · Frauenfeld" },
  { id: "innerschweiz", label: "Innerschweiz", share: 0.14, cities: "Luzern · Zug · Schwyz" },
]

const BRANCHEN: Branche[] = [
  {
    id: "versicherung",
    label: "Versicherungs-Makler",
    vol: 69010,
    cpc: 11.3,
    kws: 50,
    top: [
      { kw: "krankenkassenvergleich", vol: 14800 },
      { kw: "autoversicherung", vol: 5400 },
      { kw: "hausratversicherung", vol: 4400 },
      { kw: "autoversicherung vergleich schweiz", vol: 4400 },
      { kw: "krankenkasse wechseln", vol: 1900 },
      { kw: "krankenkassenvergleich schweiz", vol: 1900 },
    ],
    regions: {
      mittelland: [
        { d: "mobiliar.ch" }, { d: "glausen.ch" }, { d: "allianz.ch" }, { d: "zurich.ch" },
        { d: "generali.ch" }, { d: "huesler-beratungen.ch" }, { d: "helvetia.com" },
        { d: "search.ch", p: true }, { d: "solofinanz.ch" }, { d: "vaudoise.ch" },
      ],
      nordwestschweiz: [
        { d: "mobiliar.ch" }, { d: "nvc.ch" }, { d: "behmen.ch" }, { d: "allianz.ch" },
        { d: "jcib.ch" }, { d: "search.ch", p: true }, { d: "axa.ch" }, { d: "vaudoise.ch" },
        { d: "kovacs-experience.ch" }, { d: "helvetia.com" },
      ],
      zuerich: [
        { d: "ws-p.ch" }, { d: "search.ch", p: true }, { d: "simplecare.ch" }, { d: "valiosa.ch" },
        { d: "hip.swiss" }, { d: "allianz.ch" }, { d: "smzh.ch" }, { d: "axa.ch" },
        { d: "zurich.ch" }, { d: "generali.ch" },
      ],
      nordostschweiz: [
        { d: "allianz.ch" }, { d: "mobiliar.ch" }, { d: "swibro.ch" }, { d: "aplusr.ch" },
        { d: "assewa.ch" }, { d: "smartversichert.ch" }, { d: "search.ch", p: true },
        { d: "verso.ch" }, { d: "bpag.ch" }, { d: "convida.ch" },
      ],
      innerschweiz: [
        { d: "juric.ch" }, { d: "mobiliar.ch" }, { d: "allianz.ch" }, { d: "buetikofer.swiss" },
        { d: "helvetia.com" }, { d: "versicherigsheini.com" }, { d: "slv-gmbh.ch" },
        { d: "schumpf-partner.ch" }, { d: "search.ch", p: true }, { d: "local.ch", p: true },
      ],
    },
  },
  {
    id: "solar",
    label: "Solar / Photovoltaik",
    vol: 29320,
    cpc: 7.2,
    kws: 50,
    top: [
      { kw: "photovoltaik", vol: 4400 },
      { kw: "solarpanel", vol: 4400 },
      { kw: "solaranlage", vol: 2900 },
      { kw: "photovoltaik anlage", vol: 2400 },
      { kw: "pv anlage", vol: 1900 },
      { kw: "speicher für solaranlage", vol: 880 },
    ],
    regions: {
      mittelland: [
        { d: "solrex.ch" }, { d: "fankhauser-solar.ch" }, { d: "soluna-energy.ch" },
        { d: "primosolar.ch" }, { d: "bymsolar.ch" }, { d: "soleis.ch" }, { d: "helion.ch" },
        { d: "energie.so.ch", p: true }, { d: "guggisberg-bern.ch" }, { d: "kunz-solartech.ch" },
      ],
      nordwestschweiz: [
        { d: "sonnwende.ch" }, { d: "rei-solar.ch" }, { d: "ecosun-ag.ch" }, { d: "bs.ch", p: true },
        { d: "alpen-energie.ch" }, { d: "baselland.ch", p: true }, { d: "bkb.ch", p: true },
        { d: "iwb.ch" }, { d: "winasolar.com" }, { d: "umweltbasel.ch", p: true },
      ],
      zuerich: [
        { d: "solaralag.ch" }, { d: "senero.ch" }, { d: "engitec.ch" }, { d: "systema-solis.ch" },
        { d: "ewg-winterthur.ch" }, { d: "enido.ch" }, { d: "watt-peak.ch" },
        { d: "stadt.winterthur.ch", p: true }, { d: "wintisolar.ch" }, { d: "stadt-zuerich.ch", p: true },
      ],
      nordostschweiz: [
        { d: "solarmotion.ch" }, { d: "solartech-schweiz.ch" }, { d: "sg.ch", p: true },
        { d: "rg-energietechnik.ch" }, { d: "helion.ch" }, { d: "solar.tg" },
        { d: "solar-guide.ch", p: true }, { d: "frauenfeld.ch", p: true }, { d: "alsol.ch" },
        { d: "lerm-solar.ch" },
      ],
      innerschweiz: [
        { d: "solarsense.ch" }, { d: "benetz.ch" }, { d: "solar4all.ch" }, { d: "uwe.lu.ch", p: true },
        { d: "kunz-solartech.ch" }, { d: "stadtluzern.ch", p: true },
        { d: "umweltberatung-luzern.ch", p: true }, { d: "ewl-luzern.ch" },
        { d: "energie-zentralschweiz.ch", p: true }, { d: "solar-guide.ch", p: true },
      ],
    },
  },
  {
    id: "waermepumpe",
    label: "Wärmepumpe / Heizung",
    vol: 32330,
    cpc: 3.3,
    kws: 50,
    top: [
      { kw: "wärmepumpe", vol: 8100 },
      { kw: "luft wasser wärmepumpe", vol: 1900 },
      { kw: "wärmepumpe luft wasser", vol: 1600 },
      { kw: "erdsonden wärmepumpe", vol: 1000 },
      { kw: "wärmepumpe kosten", vol: 880 },
      { kw: "heizung wärmepumpe", vol: 720 },
    ],
    regions: {
      mittelland: [
        { d: "waermepumpe-be.ch" }, { d: "bymsolar.ch" }, { d: "hans-duerig.ch" },
        { d: "axora.ch" }, { d: "heizungsmacher.ch" }, { d: "haustech-wachter.ch" },
        { d: "krieg.swiss" }, { d: "glb.ch" }, { d: "ewb.ch" }, { d: "daibau.ch", p: true },
      ],
      nordwestschweiz: [
        { d: "bs.ch", p: true }, { d: "baselland.ch", p: true }, { d: "iwb.ch" },
        { d: "heizwert.ch" }, { d: "primeo-energie.ch" }, { d: "nefa-heizungen.ch" },
        { d: "qerotech.ch" }, { d: "fhnw.ch", p: true }, { d: "bkb.ch", p: true },
      ],
      zuerich: [
        { d: "htzh.ch" }, { d: "waermetec.ch" }, { d: "bosshardag.ch" },
        { d: "rutz-sanitaer-heizung.ch" }, { d: "zo-haustechnik.ch" }, { d: "haelg.ch" },
        { d: "hediger-gmbh.ch" }, { d: "heizungsmacher.ch" }, { d: "stadt-zuerich.ch", p: true },
        { d: "daibau.ch", p: true },
      ],
      nordostschweiz: [
        { d: "search.ch", p: true }, { d: "wps-waermepumpenservice.ch" }, { d: "bisseggerag.com" },
        { d: "spht.ch" }, { d: "heizungssanierung-mm.ch" }, { d: "mettauertal.ch", p: true },
        { d: "willi-gt.ch" }, { d: "sanitaervergleich.ch", p: true }, { d: "hugentoblerheizungen.ch" },
        { d: "local.ch", p: true },
      ],
      innerschweiz: [
        { d: "uwe.lu.ch", p: true }, { d: "stadtluzern.ch", p: true }, { d: "stiebel-eltron.ch" },
        { d: "burri-loetscher.ch" }, { d: "ckw.ch" }, { d: "tca.ch" }, { d: "ewl-luzern.ch" },
        { d: "klimafreundlichheizen.ch", p: true }, { d: "umweltberatung-luzern.ch", p: true },
      ],
    },
  },
  {
    id: "finanz",
    label: "Finanzberatung / Hypothek",
    vol: 68050,
    cpc: 2.7,
    kws: 50,
    top: [
      { kw: "hypothek", vol: 4400 },
      { kw: "hypothekenvergleich", vol: 3600 },
      { kw: "saron hypothek", vol: 2400 },
      { kw: "hypothekarzins vergleich", vol: 1900 },
      { kw: "hypothek berechnen", vol: 1600 },
      { kw: "haus finanzieren", vol: 1000 },
    ],
    regions: {
      mittelland: [
        { d: "tophypo.ch" }, { d: "regiobank.ch" }, { d: "resolve.ch" }, { d: "hypolino.ch" },
        { d: "fina.ch" }, { d: "pkso.ch" }, { d: "blvk.ch" }, { d: "bekb.ch" },
        { d: "raiffeisen.ch" }, { d: "moneypark.ch", p: true },
      ],
      nordwestschweiz: [
        { d: "immano.ch" }, { d: "ipoteka.ch" }, { d: "hypovision.ch" }, { d: "akb.ch" },
        { d: "swisschange.ch" }, { d: "raiffeisen.ch" }, { d: "pkbs.ch" }, { d: "apk.ch" },
        { d: "wir.ch" }, { d: "bkb.ch" },
      ],
      zuerich: [
        { d: "zurichinvest.ch" }, { d: "zurich.ch" }, { d: "hypotheke.ch", p: true },
        { d: "raiffeisen.ch" }, { d: "zkb.ch" }, { d: "vermoegenszentrum.ch" }, { d: "bvk.ch" },
        { d: "swisslife.ch" }, { d: "migrosbank.ch" },
      ],
      nordostschweiz: [
        { d: "moneypark.ch", p: true }, { d: "raiffeisen.ch" }, { d: "acrevis.ch" },
        { d: "hypotheke.ch", p: true }, { d: "post.ch" }, { d: "gkb.ch" }, { d: "migrosbank.ch" },
        { d: "vaudoise.ch" }, { d: "swisslife.ch" },
      ],
      innerschweiz: [
        { d: "lukb.ch" }, { d: "lupk.ch" }, { d: "pksl.ch" }, { d: "raiffeisen.ch" },
        { d: "generali.ch" }, { d: "hypotheke.ch", p: true }, { d: "migrosbank.ch" },
        { d: "vermoegens-partner.ch" },
      ],
    },
  },
  {
    id: "vorsorge",
    label: "Vorsorge / 3a / Pensionskasse",
    vol: 57640,
    cpc: 3.5,
    kws: 50,
    top: [
      { kw: "pensionskasse", vol: 9900 },
      { kw: "säule 3a maximalbetrag 2026", vol: 5400 },
      { kw: "säule 3a", vol: 4400 },
      { kw: "pensionskasse auszahlen", vol: 1600 },
      { kw: "säule 3a vergleichen", vol: 1300 },
      { kw: "frühpensionierung schweiz", vol: 1000 },
    ],
    regions: {
      mittelland: [
        { d: "aekbank.ch" }, { d: "fina.ch" }, { d: "rito.ch" }, { d: "mithras.swiss" },
        { d: "valency-finance.ch" }, { d: "swisslife.ch" }, { d: "local.ch", p: true },
        { d: "generali.ch" }, { d: "axa.ch" }, { d: "vermoegenszentrum.ch" },
      ],
      nordwestschweiz: [
        { d: "finberg.ch" }, { d: "axa.ch" }, { d: "avadis.ch" }, { d: "convit.ch" },
        { d: "awb.ch" }, { d: "bco.ch" }, { d: "nvc.ch" }, { d: "search.ch", p: true },
        { d: "carefinance.ch" }, { d: "vermoegenszentrum.ch" },
      ],
      zuerich: [
        { d: "frauenzentrale-zh.ch" }, { d: "dievorsorge.ch" }, { d: "smzh.ch" }, { d: "zurich.ch" },
        { d: "vita.ch" }, { d: "pszh.ch" }, { d: "walser.ch" }, { d: "convit.ch" },
        { d: "maerki-baumann.ch" },
      ],
      nordostschweiz: [
        { d: "swisslife-select.ch" }, { d: "sgkb.ch" }, { d: "pvvs.ch" }, { d: "raiffeisen.ch" },
        { d: "svasg.ch" }, { d: "swisslife.ch" }, { d: "hallo.sg.ch", p: true },
        { d: "helvetia.com" }, { d: "whp.ch" },
      ],
      innerschweiz: [
        { d: "convit.ch" }, { d: "vermoegenszentrum.ch" }, { d: "pvvs.ch" }, { d: "lukb.ch" },
        { d: "faehndrich-finanz.ch" }, { d: "suisse-finanz.ch" },
        { d: "pensionskassenvergleich.ch", p: true }, { d: "bvgauskuenfte.ch", p: true },
        { d: "prosenectute.ch", p: true },
      ],
    },
  },
  {
    id: "immobilien",
    label: "Immobilien / Makler",
    vol: 11470,
    cpc: 10.5,
    kws: 50,
    top: [
      { kw: "immobilienmakler", vol: 1900 },
      { kw: "haus verkaufen", vol: 880 },
      { kw: "immobilienbewertung", vol: 720 },
      { kw: "wohnung verkaufen", vol: 390 },
      { kw: "haus schätzen lassen", vol: 320 },
      { kw: "makler kosten", vol: 260 },
    ],
    regions: {
      mittelland: [
        { d: "schenk-immo.ch" }, { d: "kocherimmo.ch" }, { d: "schneller-immobilien.ch" },
        { d: "immoseeker.ch", p: true }, { d: "raiffeisen.ch" }, { d: "neho.ch" },
        { d: "riesenproperty.ch" }, { d: "afruehimmo.ch" }, { d: "immowyss.ch" },
        { d: "search.ch", p: true },
      ],
      nordwestschweiz: [
        { d: "immorossi.ch" }, { d: "provimmo.ch" }, { d: "engelvoelkers.com" },
        { d: "team-lindenberger.ch" }, { d: "liba-immobilien.ch" }, { d: "swisslife.ch" },
        { d: "neho.ch" }, { d: "beurretpartner.ch" }, { d: "immoseeker.ch", p: true },
        { d: "raiffeisen.ch" },
      ],
      zuerich: [
        { d: "engelvoelkers.com" }, { d: "stoehr-immobilien.ch" }, { d: "immoleague.ch" },
        { d: "rizzo-immobilien.ch" }, { d: "troendle-partner.ch" }, { d: "grafundpartner-immo.ch" },
        { d: "immoseeker.ch", p: true }, { d: "neho.ch" }, { d: "monkiewitsch.ch" },
        { d: "raiffeisen.ch" },
      ],
      nordostschweiz: [
        { d: "immoleague.ch" }, { d: "goldinger.ch" }, { d: "staub-treuhand.ch" },
        { d: "fleischmann.ch" }, { d: "neho.ch" }, { d: "hugosteiner.ch" },
        { d: "marthaler-immobilien.ch" }, { d: "raiffeisen.ch" }, { d: "engelvoelkers.com" },
        { d: "furter-immobilien.ch" },
      ],
      innerschweiz: [
        { d: "domba.ch" }, { d: "engelvoelkers.com" }, { d: "kriegerlinsi.ch" },
        { d: "maklersprechstunde.com" }, { d: "remax.ch" }, { d: "inter.immobilien" },
        { d: "walde.ch" }, { d: "dv-immo.ch" }, { d: "search.ch", p: true }, { d: "raiffeisen.ch" },
      ],
    },
  },
  {
    id: "treuhand",
    label: "Treuhand / Steuerberatung",
    vol: 29890,
    cpc: 9.66,
    kws: 50,
    top: [
      { kw: "treuhänder", vol: 5400 },
      { kw: "treuhand", vol: 5400 },
      { kw: "steuerberater", vol: 2400 },
      { kw: "steuererklärung ausfüllen lassen", vol: 1600 },
      { kw: "firmengründung schweiz", vol: 480 },
      { kw: "buchhaltung auslagern", vol: 260 },
    ],
    regions: {
      mittelland: [
        { d: "treuhandbern24.ch" }, { d: "grunder-treuhand.ch" }, { d: "treuhandbern.ch" },
        { d: "wistag.ch" }, { d: "eigertreuhand.ch" }, { d: "search.ch", p: true },
        { d: "unicothun.ch" }, { d: "core-partner.ch" }, { d: "ernst-treuhand.ch" },
        { d: "bommer-partner.ch" },
      ],
      nordwestschweiz: [
        { d: "dufour-treuhand.ch" }, { d: "aaretax.ch" }, { d: "vagatreuhand.ch" },
        { d: "welte-treuhand.ch" }, { d: "suter-treuhandag.ch" }, { d: "rdw-treuhand.ch" },
        { d: "hkvaarau.ch", p: true }, { d: "thv.ch" }, { d: "reist-partner.ch" },
        { d: "stg-basel.ch" },
      ],
      zuerich: [
        { d: "treuhand-zentrum-zuerich.ch" }, { d: "treuhandmitherz.ch" }, { d: "orsini-treuhand.ch" },
        { d: "zuerchertreuhand.ch" }, { d: "treuhandsiegrist.ch" }, { d: "eicher.ch" },
        { d: "budliger.ch" }, { d: "treuhandsuisse-zh.ch", p: true }, { d: "eisele-treuhand.ch" },
        { d: "caminada.ch" },
      ],
      nordostschweiz: [
        { d: "marthaler-treuhand.ch" }, { d: "wbt.ch" }, { d: "gmtc.ch" },
        { d: "hardegger-treuhand.ch" }, { d: "adverta-treuhand.ch" }, { d: "sgtag.ch" },
        { d: "egeli-treuhand.ch" }, { d: "obt.ch" }, { d: "bmuag.ch" }, { d: "search.ch", p: true },
      ],
      innerschweiz: [
        { d: "gewerbe-treuhand.ch" }, { d: "triana-treuhand.ch" }, { d: "caminada.com" },
        { d: "ab-treuhand.ch" }, { d: "treuhand-willimann.ch" }, { d: "abafin-treuhand.ch" },
        { d: "thingk.ch" }, { d: "treuhandvergleich.ch", p: true }, { d: "partnertreuhand.ch" },
        { d: "treuhand-suisse-ag.ch" },
      ],
    },
  },
  {
    id: "medizin",
    label: "Medizin / Ästhetik",
    vol: 25550,
    cpc: 6.34,
    kws: 50,
    top: [
      { kw: "botox", vol: 3600 },
      { kw: "haartransplantation", vol: 2900 },
      { kw: "lippen aufspritzen", vol: 1900 },
      { kw: "masseter botox", vol: 1900 },
      { kw: "haartransplantation schweiz", vol: 1600 },
      { kw: "faltenbehandlung", vol: 480 },
    ],
    regions: {
      mittelland: [
        { d: "beauty2go.ch" }, { d: "drtschager.ch" }, { d: "skinaesthetics.ch" },
        { d: "kiermeir-aesthetics.ch" }, { d: "solothurnerspitaeler.ch" }, { d: "vizaga.ch" },
        { d: "ingoldaesthetics.ch" }, { d: "aesthetics-pallas.ch" }, { d: "local.ch", p: true },
        { d: "metime-solothurn.ch" },
      ],
      nordwestschweiz: [
        { d: "aestheticcenterbasel.ch" }, { d: "skinmed.ch" }, { d: "beauty2go.ch" },
        { d: "drdunst.ch" }, { d: "beautylaserclinic.ch" }, { d: "ksa.ch" }, { d: "cspraxis.com" },
        { d: "zumgoldenenschnitt.ch" }, { d: "dermaarau.ch" }, { d: "dr-eckstein.ch" },
      ],
      zuerich: [
        { d: "beauty2go.ch" }, { d: "dermart.ch" }, { d: "pcc-win.ch" },
        { d: "dermatologie-klinik.ch" }, { d: "plastica.ch" }, { d: "pyramide.ch" },
        { d: "dermanence.ch" }, { d: "fineskin.ch" }, { d: "skinmed.ch" }, { d: "clinicutoquai.ch" },
      ],
      nordostschweiz: [
        { d: "stgag.ch" }, { d: "ice-aesthetic.com" }, { d: "hno-thurgau.ch" }, { d: "neya.ch" },
        { d: "mediteam.ch" }, { d: "physis.ch" }, { d: "comparis.ch", p: true },
        { d: "beautyclinic.ch" }, { d: "doktor.ch", p: true }, { d: "beautystgallen.ch" },
      ],
      innerschweiz: [
        { d: "zs-aesthetics.ch" }, { d: "ingoldaesthetics.ch" }, { d: "drkelly.ch" },
        { d: "dermapraxis-luzern.ch" }, { d: "plastische-chirurgie-zug.ch" },
        { d: "dermedesthetic.ch" }, { d: "dr-birgit-woerle.ch" }, { d: "derma-zug.ch" },
        { d: "beauty2go.ch" }, { d: "lucerneclinic.ch" },
      ],
    },
  },
  {
    id: "umzug",
    label: "Umzug / Premium-Service",
    vol: 19090,
    cpc: 17.67,
    kws: 50,
    top: [
      { kw: "umzugsfirma zürich", vol: 3600 },
      { kw: "umzugsfirma", vol: 2400 },
      { kw: "umzugsfirma bern", vol: 1000 },
      { kw: "umzugsreinigung", vol: 880 },
      { kw: "zügelfirma", vol: 590 },
      { kw: "umzugsofferte", vol: 390 },
    ],
    regions: {
      mittelland: [
        { d: "profiumzuege.ch" }, { d: "umzugsfuchs.ch" }, { d: "kehrlioeler.ch" },
        { d: "ps-umzug.ch" }, { d: "luescher-umzug.ch" }, { d: "boxumzug.ch" },
        { d: "ofri.ch", p: true }, { d: "gafnerthun.ch" }, { d: "slavi.ch" },
        { d: "umzugo-solothurn.ch" },
      ],
      nordwestschweiz: [
        { d: "umzugsfuchs.ch" }, { d: "umzugsfirmabasel.com" }, { d: "casahirsbrunner.ch" },
        { d: "offerten-portal.ch", p: true }, { d: "basilisk-umzuege.ch" }, { d: "ofri.ch", p: true },
        { d: "fleigumzuege.ch" }, { d: "best-umzug.ch" }, { d: "jost-transport.ch" },
        { d: "martinas.ch" },
      ],
      zuerich: [
        { d: "umzugsfirmawinterthur.com" }, { d: "umzugsservice-zh.ch" }, { d: "bischof-umzuege.ch" },
        { d: "helvetiatransporte.ch" }, { d: "umzug-zuerich.ch" }, { d: "zhumzug.ch" },
        { d: "winti-transport.ch" }, { d: "ofri.ch", p: true }, { d: "welti-furrer.ch" },
        { d: "schweizertransport.ch" },
      ],
      nordostschweiz: [
        { d: "frischknecht-umzuege.ch" }, { d: "gimmi.ch" }, { d: "itsallinone-umzuege.ch" },
        { d: "specker-transporte.ch" }, { d: "professionellereinigung.ch" }, { d: "supertrans.ch" },
        { d: "gerber-transport.ch" }, { d: "ruckstuhl-sg.ch" }, { d: "alushi.ch" },
        { d: "ofri.ch", p: true },
      ],
      innerschweiz: [
        { d: "ararat.ch" }, { d: "verta-transport.ch" }, { d: "helvetiatransporte.ch" },
        { d: "zuger-umzuege.ch" }, { d: "archenoah-umzug.ch" }, { d: "umzugsfuchs.ch" },
        { d: "weber-vonesch.ch" }, { d: "umzuege-habermacher.ch" }, { d: "kehrlioeler.ch" },
        { d: "quality-umzug.ch" },
      ],
    },
  },
]

const fmt = (n: number) => Math.round(n).toLocaleString("de-CH").replace(/,/g, "'")

function StepHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="text-center">
      <span className="text-[11.5px] font-extrabold uppercase tracking-[2.5px] text-[#0B6E96]">
        Schritt {n}
      </span>
      <h3 className="mt-2 text-[20px] font-extrabold tracking-[-0.2px] text-[#0A0C10]">{title}</h3>
    </div>
  )
}

export function BranchenRadar() {
  const [brancheId, setBrancheId] = useState<string | null>(null)
  const [regionId, setRegionId] = useState<RegionId | null>(null)

  const branche = BRANCHEN.find((b) => b.id === brancheId) ?? null
  const region = REGIONS.find((r) => r.id === regionId) ?? null
  const sonstige = brancheId === "sonstige"

  const regionVol = branche && region ? branche.vol * region.share : 0
  /** Mögliche Leads = 20 % der regionalen Suchanfragen. */
  const leads = regionVol * 0.2
  const top10 = branche && region ? branche.regions[region.id] : null

  return (
    <section id="rechner" className="scroll-mt-20 bg-[#FAFAF7] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-[1120px]">
        {/* Kopf */}
        <div className="mx-auto mb-10 max-w-[760px] text-center">
          <span className="inline-block rounded-full bg-[#0A0C10] px-[14px] py-[7px] text-[12px] font-extrabold uppercase tracking-[0.7px] text-white">
            Branchen-Radar
          </span>
          <h2 className="mt-5 text-[clamp(27px,3.8vw,38px)] font-extrabold leading-tight tracking-[-0.5px] text-[#0A0C10]">
            Ihre Kunden suchen bereits.
            <br />
            Die Frage ist: <span className="text-[#57C7FF]">Wen finden sie?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-[16.5px] font-medium leading-relaxed text-[#33404F]">
            Zwei Klicks, und Sie sehen es schwarz auf weiss: wie gross die Online-Nachfrage in Ihrer
            Branche ist — und welche 10 Anbieter sie sich in Ihrer Region gerade holen.
          </p>
        </div>

        <div className="rounded-[22px] border border-[#E1E4E8] bg-white p-5 shadow-[0_6px_20px_rgba(10,12,16,0.07)] sm:p-8">
          {/* Schritt 1 · Branche */}
          <StepHead n="1" title="Ihre Branche" />
          <div className="mx-auto mt-3 flex max-w-[820px] flex-wrap justify-center gap-2.5">
            {BRANCHEN.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBrancheId(b.id)}
                className={`rounded-full border px-5 py-2.5 text-[13.5px] font-bold tracking-[0.1px] transition ${
                  brancheId === b.id
                    ? "border-[#0A0C10] bg-[#0A0C10] text-white shadow-[0_6px_18px_rgba(10,12,16,0.22)]"
                    : "border-[#B9C0C8] bg-white text-[#1E2833] hover:-translate-y-[1px] hover:border-[#0A0C10] hover:text-[#0A0C10]"
                }`}
              >
                {b.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setBrancheId("sonstige")}
              className={`rounded-full border px-5 py-2.5 text-[13.5px] font-bold tracking-[0.1px] transition ${
                sonstige
                  ? "border-[#0A0C10] bg-[#0A0C10] text-white shadow-[0_6px_18px_rgba(10,12,16,0.22)]"
                  : "border-dashed border-[#9BA3AD] bg-white text-[#4A5665] hover:-translate-y-[1px] hover:border-[#0A0C10] hover:text-[#0A0C10]"
              }`}
            >
              Sonstige
            </button>
          </div>

          {/* Schritt 2 · Region — kompakte Pills, halbe Trennlinie, viel Luft */}
          {brancheId && !sonstige && (
            <div className="mt-[72px]">
              <div className="mx-auto mb-12 h-px w-1/2 max-w-[380px] bg-[#E9EBEE]" aria-hidden="true" />
              <StepHead n="2" title="Ihre Region" />
              <div className="mx-auto mt-6 flex max-w-[640px] flex-wrap justify-center gap-2.5">
                {REGIONS.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRegionId(r.id)}
                    title={r.cities}
                    className={`rounded-full border px-5 py-2.5 text-[13.5px] font-bold tracking-[0.1px] transition ${
                      regionId === r.id
                        ? "border-[#0A0C10] bg-[#0A0C10] text-white shadow-[0_6px_18px_rgba(10,12,16,0.22)]"
                        : "border-[#B9C0C8] bg-white text-[#1E2833] hover:-translate-y-[1px] hover:border-[#0A0C10] hover:text-[#0A0C10]"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              {region && (
                <p className="mt-4 text-center text-[12.5px] font-semibold text-[#4A5665]">{region.cities}</p>
              )}
            </div>
          )}

          {/* Sonstige */}
          {sonstige && (
            <div className="mx-auto mt-12 max-w-[640px] rounded-[16px] border border-dashed border-[#1F9A5E]/40 bg-[#FAFAF7] p-8 text-center">
              <p className="text-[16px] font-bold text-[#0A0C10]">
                Ihre Branche fehlt hier? Dann bauen wir Ihren Radar individuell.
              </p>
              <p className="mx-auto mt-2 max-w-[520px] text-[14.5px] font-medium text-[#33404F]">
                Wir messen die Online-Nachfrage und die Rangliste für genau Ihr Angebot und Ihre
                Region — als Erstes im kostenlosen Online-Meeting.
              </p>
              <a
                href="#kontakt"
                className="mt-5 inline-block rounded-[12px] bg-[#8FE05A] px-[26px] py-[14px] text-[15px] font-extrabold text-[#122400] shadow-[0_6px_18px_rgba(0,0,0,0.15)] transition hover:-translate-y-[1px] hover:bg-[#A2E874]"
              >
                Online-Meeting vereinbaren
              </a>
            </div>
          )}

          {/* Schritt 3 · Ergebnis */}
          {branche && region && top10 && (
            <div className="mt-12">
              <div className="mx-auto mb-12 h-px w-1/2 max-w-[380px] bg-[#E9EBEE]" aria-hidden="true" />
              <StepHead n="3" title={`Ihr Markt: ${branche.label} · ${region.label}`} />

              <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[5fr_6fr]">
                {/* Links: Das entgeht Ihnen */}
                <div className="rounded-[16px] bg-[#0A0C10] p-6 text-white">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.6px] text-[#8FE05A]">
                    Das wird bei Ihnen gesucht
                  </span>
                  <div className="mt-3 text-[clamp(38px,5vw,52px)] font-extrabold leading-none">
                    ≈ {fmt(regionVol)}
                  </div>
                  <p className="mt-2 text-[13.5px] text-white/70">
                    Suchanfragen pro Monat in der Region {region.label} — aus {fmt(branche.vol)}{" "}
                    monatlichen Suchen in der Deutschschweiz.
                  </p>
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.6px] text-[#57C7FF]">
                      Mögliche Leads dieser Nachfrage
                    </span>
                    <div className="mt-1 text-[26px] font-extrabold text-[#57C7FF]">
                      {fmt(leads)}/Monat
                    </div>
                    <p className="mt-1 text-[12.5px] text-white/60">
                      Basis: 20 % der Suchanfragen in Ihrer Region.
                    </p>
                  </div>
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.6px] text-white/50">
                      Womit gesucht wird (Auszug aus {branche.kws} Keywords)
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {branche.top.map((k) => (
                        <span
                          key={k.kw}
                          className="rounded-full bg-white/10 px-2.5 py-1 text-[11.5px] font-semibold text-white/80"
                        >
                          {k.kw} · {fmt(k.vol)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Rechts: Wer zuschlägt */}
                <div className="rounded-[16px] border border-[#E1E4E8] bg-white p-6">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.6px] text-[#C026D3]">
                    Diese 10 holen sich die Anfragen
                  </span>
                  <p className="mt-1 text-[13.5px] font-medium text-[#3C4855]">
                    Google-Rangliste für den Keyword-Mix in {region.label} ({region.cities}).
                  </p>
                  <ol className="mt-4 space-y-1.5">
                    {top10.map((t, i) => (
                      <li
                        key={t.d}
                        className="flex items-center gap-3 rounded-[10px] bg-[#FAFAF7] px-3 py-[7px]"
                      >
                        <span className="w-[22px] text-right text-[13px] font-extrabold text-[#5A6673]">
                          {i + 1}.
                        </span>
                        <span className="flex-1 truncate text-[13.5px] font-bold text-[#0A0C10]">
                          {t.d}
                        </span>
                        {t.p && (
                          <span className="rounded-full border border-[#E1E4E8] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.4px] text-[#8B94A1]">
                            Portal
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                  <p className="mt-3 text-[13px] font-semibold text-[#0A0C10]">
                    Ihr Name fehlt? Dann klicken Ihre Kunden gerade bei der Konkurrenz.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 flex flex-col items-center text-center">
                <p className="max-w-[560px] text-[15px] font-semibold leading-relaxed text-[#26313D]">
                  Wir bringen Sie in diese Rangliste — mit Website, Inhalten und KI-Agenten, die
                  Anfragen sofort beantworten.
                </p>
                <a
                  href="#kontakt"
                  className="mt-6 rounded-[12px] bg-[#8FE05A] px-[26px] py-[15px] text-[15px] font-extrabold text-[#122400] shadow-[0_6px_18px_rgba(0,0,0,0.15)] transition hover:-translate-y-[1px] hover:bg-[#A2E874]"
                >
                  Online-Meeting vereinbaren
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Quellen-/Methodik-Zeile — Abstand zur Karte oben (64 px) = Abstand
            zum Sektionsende unten (py-16 der Sektion). */}
        {/* Abstand liegt auf dem <div>, nicht auf dem <p>: globals.css setzt
            ungelayert `p { margin-block: 0 ... }` und würde ein `mt-` am Absatz
            überschreiben. */}
        <div className="mt-4">
          <p className="mx-auto max-w-[680px] text-center text-[12px] font-medium leading-relaxed text-[#55626F]">
            Datenbasis: Ubersuggest/Google, Schweiz, Juli 2026 · rund 50 Keywords je Branche ·
            regionale Volumen geschätzt · Momentaufnahme ohne Gewähr.
          </p>
        </div>
      </div>
    </section>
  )
}
