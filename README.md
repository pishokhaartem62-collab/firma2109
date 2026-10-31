# AP Technologies – Webseite

Statische Landingpage (HTML, CSS, JavaScript) mit interaktivem Angebotsrechner-Demo für 5 Branchen. Kein Build-Schritt, keine Abhängigkeiten, keine Cookies, kein Tracking.

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite |
| `impressum.html` | Impressum (Vorlage) |
| `datenschutz.html` | Datenschutzerklärung (Vorlage) |
| `404.html` | Fehlerseite |
| `style.css` | Design |
| `app.js` | Angebotsrechner – Branchen & Preise oben im Abschnitt `EINSTELLUNGEN` |
| `vercel.json` | Vercel-Konfiguration (saubere URLs, Sicherheits-Header) |

---

## Инструкция (RU)

### 1. Заполнить данные
Замени все заглушки в `[квадратных скобках]` во всех `.html` файлах: имя, телефон, адрес.
В `index.html` замени `tel:+49000000000` на свой номер.
Поиск по всем файлам в VS Code: `Ctrl+Shift+F` → `[`.

### 2. Загрузить на GitHub

**Вариант А – через браузер (без программ):**
1. github.com → **New repository** → имя, например `website` → **Create repository**.
2. Ссылка **uploading an existing file** → перетащи все файлы из этой папки (включая `vercel.json`) → **Commit changes**.

**Вариант Б – через терминал** (в папке уже есть git с первым коммитом):
```bash
git remote add origin https://github.com/DEIN-NAME/website.git
git branch -M main
git push -u origin main
```

### 3. Опубликовать через Vercel
1. vercel.com → **Sign up with GitHub**.
2. **Add New… → Project** → выбери репозиторий → **Import**.
3. Framework Preset: **Other**. Build Command и Output Directory оставь пустыми.
4. **Deploy** → через ~20 секунд сайт доступен по адресу `name.vercel.app`.

Каждый новый коммит в `main` автоматически обновляет сайт.

### 4. Свой домен
Vercel → проект → **Settings → Domains** → добавь `deinname.de` и пропиши DNS-записи, которые покажет Vercel, у регистратора домена. HTTPS включится автоматически.

### Важно
Impressum и Datenschutz — шаблоны. Впиши реальные данные и проверь тексты (например, генератором e-recht24.de). Раздел о хостинге Vercel в Datenschutz уже заполнен. Проверь, актуальны ли данные на vercel.com/legal.
