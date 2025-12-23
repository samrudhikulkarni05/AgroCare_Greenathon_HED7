# 🌿 AgroCare: Kisan Plant Doctor  

[![Tech Stack](https://img.shields.io/badge/stack-React%20%7C%20TypeScript%20%7C%20Vite-blue)](https://vitejs.dev/)
[![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)](https://ai.google.dev/)
[![Made for Farmers](https://img.shields.io/badge/focus-Farmer--First-success)](https://github.com/topics/agriculture)
[![Hackathon](https://img.shields.io/badge/HED%207.0-Greenathon-brightgreen)](https://github.com/topics/hackathon)


Healthy Crops. Strong Farmers.

Smart Crop Check · Helping Our Farmers

KisanDoctor is an AI-powered crop health diagnosis platform designed to support Indian farmers. By simply uploading a photo of a crop leaf, farmers can instantly detect diseases and receive the best treatment suggestions.

<p align="center">
  <img width="1904" height="773" alt="Screenshot 2025-12-23 200744" src="https://github.com/user-attachments/assets/f0eea8fd-4d68-428e-9c27-86c12e98915e" />

</p>

---

### AgroCare – Kisan Plant Doctor


AI-Powered Crop Health & Disease Detection System

AgroCare – Kisan Plant Doctor is a smart agriculture support platform designed to help farmers identify crop diseases early and take timely action. By using Artificial Intelligence, Computer Vision, and real-time data, AgroCare provides accurate crop health analysis, treatment suggestions, and farming assistance in a simple and farmer-friendly way.idth rural usage.


---

### Key Features


📸 Photo-based Crop Health Check

⚡ Instant Disease Detection

🌾 Best Cure & Treatment Suggestions

🇮🇳 Focused on Indian Crops & Farmers

🤖 AI-powered Image Analysis

📱 Farmer-friendly & Easy to Use Interface

---

### 🧭 Project Dashboard (Main Modules)

🏠 Dashboard (Main Page) – Central access to all services

🌱 Check Crop – Upload image & get health report

🌦️ Weather Today – Location-based weather forecast

🧑‍🌾 Local Help – Krushi Seva Kendras & expert guidance

🌐 Change Language – Easy language switching

📘 Project Brief – Project goals, working & impact

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

## 🌾 Using AgroCare

- Upload or capture a photo/video of the affected plant.  
- Add an optional text or audio description in your preferred language.  
- The AI provides a diagnosis plus simple, farmer-friendly steps.  
- You can follow the guidance directly, share it, or seek expert help based on the recommendations.

---

## Advantages

- Quick disease identification for immediate action.
- Direct access to agricultural experts.
- User-friendly, multilingual interface.
- Reduces crop loss and increases yield
- Hybrid AI + expert support for reliability.
- Saves time and cost by avoiding travel and wrong treatments.
- Keeps complete records of past queries and solutions.
- Encourages smart, sustainable farming practices.

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
## Overall Conclusion

- AgroCare – Kisan Plant Doctor is a simple and practical tool built to help farmers with crop problems.
- It gives quick answers using photos, voice, or chat so farmers get instant support in the field.
- No-login access, low-internet support, and multilingual UI make it easy to use in rural areas.
- It uses Google’s AI to provide fast and accurate solutions without needing heavy servers or large databases.
- The solution fits the hackathon theme by being useful, eco-friendly, and focused on real farming challenges.
- Overall, AgroCare is a smart, easy, and future-ready app that can genuinely improve farming and farmers’ lives.
---
Enjoy the full-screen interactive experience! 🌿✨

 
