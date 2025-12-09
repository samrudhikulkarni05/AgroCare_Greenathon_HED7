# 🌿 AgroCare: Kisan Plant Doctor  
### Zero-Barrier AI for Sustainable Farming

[![Tech Stack](https://img.shields.io/badge/stack-React%20%7C%20TypeScript%20%7C%20Vite-blue)](https://vitejs.dev/)
[![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)](https://ai.google.dev/)
[![Made for Farmers](https://img.shields.io/badge/focus-Farmer--First-success)](https://github.com/topics/agriculture)
[![Hackathon](https://img.shields.io/badge/HED%207.0-Greenathon-brightgreen)](https://github.com/topics/hackathon)  

AgroCare is a multimodal, farmer-first AI assistant that helps prevent crop loss and chemical overuse by giving instant, safe, and localized plant health advice in regional languages — with no login, no app install, and support for low-end devices.

<p align="center">
  <img width="1354" height="550" alt="Screenshot 2025-12-08 125421" src="https://github.com/user-attachments/assets/3a98939f-2263-4eb1-84d3-3bc30e9ad8da" />
</p>

---

### AgroCare – Kisan Plant Doctor

Smart, Eco-Friendly Crop Health Assistant for Farmers

AgroCare is a simple, fast, and multilingual AI Plant Doctor that helps farmers instantly diagnose plant diseases and get safe, eco-friendly treatment steps. Built using React, TypeScript, Vite, and Google Gemini, it works on any device without login, accounts, or complexity.

AgroCare focuses on sustainable farming, preventing chemical overuse, reducing crop loss, and giving farmers clear guidance in easy language. The interface is lightweight, mobile-friendly, and designed for low-bandwidth rural usage.

The system aligns with the HED 7.0 – Greenathon (Hack. Build. Sustain.) theme by solving a real agricultural problem through accessible AI, promoting environmental care, and offering a scalable tool that can be embedded in community platforms, KVKs, NGOs, and rural apps.

---

### Detailed Report
https://github.com/samrudhikulkarni05/AgroCare_Greenathon_HED7/blob/main/AgroCare.pdf

### Key Features

Instant Disease Detection — Upload a photo or type symptoms and get quick diagnosis.

Multimodal Support — Works with text, voice, image, and video inputs.

Regional Language Support — Get advice in Hindi, Marathi, Gujarati, Telugu, Tamil, and more.

Farm-Safe Treatment Suggestions — Clear, safe, and step-by-step solutions.

No Login Required — Open and use instantly.

Farmer-Centric UI — Clean, simple, and distraction-free.

---

## 🛠 Tech Stack

| Layer     | Technology                           | Why it was chosen |
|----------|---------------------------------------|-------------------|
| Frontend | React + TypeScript + Vite            | Fast HMR, type safety, and small bundles for slow rural networks.|
| AI Engine| Google Gemini API (@google/genai)  | Multimodal (image, audio, video, text) and multilingual capabilities for real farm contexts.|
| Styling  | HTML, CSS, lightweight JS            | Smooth performance on shared, low-RAM, or older devices. |
| Config   | .env                               | Keeps API keys outside the codebase and simplifies environment-specific setups. |

---

## Project Structure 
``` bash 
AgroCare_Greenathon_HED7/
│── components/                 # Reusable UI components
│   ├── ChatInput.tsx           # User message input
│   ├── ChatMessage.tsx         # Display chat bubbles
│   ├── DiagnosisResult.tsx     # Plant disease output
│   ├── ExpertFinder.tsx        # Nearby expert locator
│   ├── Header.tsx              # App top header
│   ├── InputSection.tsx        # Image + text input
│   ├── LandingPage.tsx         # Clean entry screen
│   ├── LanguageSelector.tsx    # Language dropdown
│   ├── ReportCard.tsx          # Summary report card
│   ├── Sidebar.tsx             # Navigation sidebar
│
│── service/
│   └── geminiService.ts        # Gemini API handler
│
│── .gitignore                  # Git ignored files
│── App.tsx                     # Main app layout
│── README.md                   # Project documentation
│── constants.ts                # Static constants
│── embed.js                    # Agent embed script
│── index.html                  # App HTML template
│── index.tsx                   # React entry point
│── metadata.json               # Agent/app metadata
│── package-lock.json           # Dependency lockfile
│── package.json                # Project dependencies
│── tsconfig.json               # TypeScript settings
│── types.ts                    # Shared TypeScript types
│── vite.config.ts              # Vite app config


```

Follow these steps to run AgroCare locally.
## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd kisan-plant-doctor
```

### 2. Install dependencies
```bash
npm install
```
### 3. Configure environment variables
```bash
# .env
API_KEY=YOUR_GEMINI_API_KEY_HERE
```
### 4. Start the local dev server
```bash
npm run dev
```
### 5. Build for production
```bash
npm run build
npm run preview
```
## Hackathon and HED 7.0 impact

AgroCare is submitted under *Greenathon (HED 7.0 – Happy Eco Diwali 2K25)* as a tech‑driven, sustainability‑oriented solution for farmers.
It demonstrates how AI, when designed to be inclusive and privacy‑aware, can help build a more eco‑friendly agriculture ecosystem and can be extended with features like image‑based disease detection, offline modes, and localized guides in future editions.


## 🌾 Using AgroCare

- Upload or capture a photo/video of the affected plant.  
- Add an optional text or audio description in your preferred language.  
- The AI provides a diagnosis plus simple, farmer-friendly steps.  
- You can follow the guidance directly, share it, or seek expert help based on the recommendations.

---

## 🌱 Future Scope
- *Offline capabilities*: Implement Progressive Web App (PWA) features for offline access and caching.
- *Image-based disease detection*: Integrate machine learning models for automatic disease detection from images.
- *Localized cropping guides*: Add region-specific crop information and advisory.
- *Expert connection*: Integrate with expert networks for personalized guidance.
- *Multilingual support expansion*: Add more Indian languages and dialects.
- *Integration with government schemes*: Link with government initiatives and subsidies.
- *Community features*: Add forums or Q&A sections for farmer interactions.

---
## 👥 Team AgroCare

| Member | Role |
| ------ | ----- |
| 🟧 **[Samruddhi Kulkarni](https://github.com/samrudhikulkarni05)** <br> `Overall Project Lead` | ![Lead](https://img.shields.io/badge/Lead-Project%20Lead-orange) ![Backend](https://img.shields.io/badge/Backend-blue) ![AI](https://img.shields.io/badge/AI%20Integration-green) |
| 🟦 **[Pramila Chandanshive](https://github.com/PramilaChandanshive)** <br> `Design Lead` | ![Design](https://img.shields.io/badge/Design-Lead-pink) ![Frontend](https://img.shields.io/badge/Frontend-blue) |
| 🟪 **[Rutuja Raut](https://github.com/rutujaraut730)** <br> `Frontend Developer` | ![Frontend](https://img.shields.io/badge/Frontend-Developer-purple) ![Research](https://img.shields.io/badge/Research-grey) |
| 🟩 **[Sakshi Tamshetti](https://github.com/SakshiTamshetti)** <br> `Chatbot Developer` | ![Chatbot](https://img.shields.io/badge/Chatbot-Developer-green) ![AI](https://img.shields.io/badge/AI%20Integration-darkgreen) ![Docs](https://img.shields.io/badge/Documentation-yellow) |

---
## 🔧 Hosted AgroCare in Google AI Studio

Follow these quick steps to open and run the app smoothly:

### 1️⃣ Open the App Link  
Click the link below in **Google Chrome**:  
https://aistudio.google.com/app/apps/drive/1BV03G7_e7-tnd-1wlRxgk5qvmR3-9TrE

### 2️⃣ Allow Google Drive Access  
If you see **“No access to Drive”**:  
- Click **Allow Drive access**  
- Select the **same Google account** where the app is saved  
- Confirm the permission

### 3️⃣ Sign In (If Required)  
If you're asked to sign in:  
- Log in with the correct Google account  
- On **“This app is for developers”**, click **Continue**

### 4️⃣ Enable Camera & Microphone  
When Chrome asks:  
**“Allow aistudio.google.com to use your camera/microphone?”**  
➡️ Click **Allow**

If you accidentally blocked it:  
- Click the **lock icon** beside the URL  
- Go to **Site settings**  
- Set **Camera** → Allow  
- Set **Microphone** → Allow  
- Reload the page

### 5️⃣ Use Full Screen  
After the app loads:  
- Press on mobile, tap the browser’s **Full Screen** icon
---

Enjoy the full-screen interactive experience! 🌿✨

*Built for HED 7.0 – Greenathon: Hack. Build. Sustain.* 🌱
