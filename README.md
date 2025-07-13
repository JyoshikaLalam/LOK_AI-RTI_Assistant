# 🇮🇳 LokAI – AI-Powered RTI Assistant

LokAI is an intelligent assistant that helps citizens of India learn, draft, and track Right to Information (RTI) applications using natural language — via **voice or text** — in **multiple Indian languages**. It is built with modern full-stack web technologies and integrates GPT-based AI for smart generation of RTI documents and guidance.

---

## 📂 Project Structure

```
src/
├── components/         → Reusable UI components
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── LanguageSwitcher.tsx
│   └── VoiceInput.tsx
│
├── context/            → React Context (global state)
│   └── RTIContext.tsx
│
├── i18n/
│   └── locales/        → Internationalization JSONs
│       ├── en.json
│       ├── hi.json
│       └── te.json
│
├── pages/              → Individual Page Views
│   ├── Chat.tsx
│   ├── Home.tsx
│   ├── InfoCenter.tsx
│   └── Tracker.tsx
│
├── services/           → Business logic / external API modules
│   ├── MisuseDetector.ts
│   ├── PDFGenerators.ts
│   ├── RTIGenerator.ts
│   └── Tracker.ts
│
├── App.tsx             → Root component
├── main.tsx            → App entry point
├── index.css           → Global styles
└── vite-env.d.ts       → TypeScript environment types
```

---

## 🛠️ Tech Stack

| Category              | Technology                              |
| --------------------- | --------------------------------------- |
| Frontend Framework    | React + TypeScript                      |
| UI Styling            | Tailwind CSS                            |
| Build Tool            | Vite                                    |
| State Management      | React Context API (`RTIContext`)        |
| i18n Support          | `react-i18next`, JSON translation files |
| AI Integration        | GPT (via RTIGenerator.ts), VoiceInput   |
| PDF Generation        | `pdf-lib` or custom generator logic     |

---

## 💡 Features

| Feature                    | Description                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------- |
| 🎙️ **Voice Input**        | Users can speak RTI requests via `VoiceInput.tsx` (uses browser APIs or backend STT).  |
| 🧠 **AI-Powered Drafting** | `RTIGenerator.ts` uses GPT to auto-fill questions, department info, and more.          |
| 🌐 **Multilingual UI**     | i18n setup supports English, Hindi, and Telugu (via JSON).                             |
| 📄 **PDF RTI Generator**   | Generates downloadable RTI forms using `PDFGenerators.ts`.                             |
| 📊 **RTI Tracker**         | `Tracker.tsx` tracks application status using user input acknowledgment ID.            |
| 📚 **Information Center**  | `InfoCenter.tsx` explains RTI laws, process, and FAQs.                                 |
| 🛡 **Misuse Detection**    | `MisuseDetector.ts` provides a first-line defense against invalid or abusive requests. |

---

## 🔧 Setup Instructions

1. **Clone the repo**

   ```bash
   git clone https://github.com/JyoshikaLalam/LOK_AI-RTI_Assistant.git
   cd LOK_AI-RTI_Assistant
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the dev server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Visit `http://localhost:5173` to see the running app.

---

## 🌍 Language Support

LokAI supports:

* 🇬🇧 English (`en.json`)
* 🇮🇳 Hindi (`hi.json`)
* 🇮🇳 Telugu (`te.json`)

Add your own language by creating a new file under `/src/i18n/locales/` and updating the `LanguageSwitcher.tsx`.

---

## 📁 Key Files Explained

### `RTIGenerator.ts`

* Calls GPT-based service to auto-generate RTI requests.
* Accepts subject, department, and context as inputs.
* Returns formatted RTI text used in form/PDF.

### `PDFGenerators.ts`

* Converts structured RTI content into a downloadable PDF.
* Used on final step after AI generation.

### `Tracker.ts`

* Provides tracking for existing RTI applications.
* Simulated tracking logic (can be expanded to include scraping/gov API calls).

### `MisuseDetector.ts`

* Flags unethical or invalid queries using simple keyword rules or future GPT checks.

---

## 📦 Build & Deploy

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

You can deploy the `dist/` folder using any static site hosting like:

* [Vercel](https://vercel.com)
* [Netlify](https://netlify.com)
* [GitHub Pages](https://pages.github.com)

---

## 🚀 Future Roadmap

* 🔒 Add user login & saved applications
* 📤 Integrate with Indian RTI online submission portal
* 🔔 SMS/email alerts when RTI status updates
* 🗣️ Add voice-based FAQ assistant
* 🤖 Local LLM integration for offline use

---
