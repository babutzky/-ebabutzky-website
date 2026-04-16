# Go-Live Checkliste

Punkte, die **außerhalb des Codes** vor dem Livegang erledigt werden müssen.

## Pflicht

- [ ] **RESEND_API_KEY** als Umgebungsvariable auf dem Server setzen  
      Datei: `.env` (lokal) bzw. Hosting-Konfiguration (Produktion)

- [ ] **Domain `ebabutzky.com` in Resend verifizieren**  
      Resend Dashboard → Domains → ebabutzky.com hinzufügen und DNS-Einträge setzen  
      Ohne Verifizierung schlägt das Kontaktformular fehl.

- [ ] **SSL-Zertifikat auf dem Hosting aktiv**  
      HTTPS muss erzwungen sein – og:image absolute URLs setzen `https://` voraus.

## Optional

- [ ] **`public/apple-touch-icon.png` ergänzen** (180×180 px)  
      Für iOS/iPadOS Home Screen. Link ist bereits in BaseLayout.astro eingebunden.

## Bereits erledigt (Code)

- og:image und twitter:image als absolute URLs (`new URL(..., Astro.url).href`)
- Favicon-Setup: SVG, ICO, apple-touch-icon referenziert
- Kontaktformular: sendet via Resend an `anfrage@ebabutzky.com`
- Impressum, Datenschutz, AGB: vollständig
- Selbst-gehostete Schriften (kein Google Fonts)
