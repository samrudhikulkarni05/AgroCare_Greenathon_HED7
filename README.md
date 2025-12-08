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

## 🌍 Why We Did Not Use a Database

AgroCare is intentionally built *without* a traditional database to keep things simple, safe, and reliable for farmers.

- *No accounts, no passwords, no complexity:* Farmers never have to sign up, remember credentials, or deal with “technical” issues like logins, OTPs, or failed sessions. The app is open and ready to use from the first click.  
- *Fewer things that can break:* By avoiding a database, there is no risk of “DB down”, corrupted tables, or migration errors. This stateless style makes the system easier to run and more resilient in real-world conditions.[web:34][web:40]  
- *Faster and lighter for rural infrastructure:* Without a database layer, the app needs fewer backend services, which helps keep hosting costs low and performance stable even on modest college/NGO infrastructure.[web:33]  
- *Privacy by design:* Farmer images, audio, and queries are processed in real time and are not permanently stored, which reduces the risk of data misuse and makes farmers more comfortable using the tool.[web:36]  

If required in future, a database can be plugged in for features like follow-up tracking or disease hotspot analytics, but the *current design is optimized to remove all technical friction for farmers* and make deployment as plug-and-play as possible for organizers.

---

## 🛠 Tech Stack

| Layer     | Technology                           | Why it was chosen |
|----------|---------------------------------------|-------------------|
| Frontend | React + TypeScript + Vite            | Fast HMR, type safety, and small bundles for slow rural networks.[web:41] |
| AI Engine| Google Gemini API (@google/genai)  | Multimodal (image, audio, video, text) and multilingual capabilities for real farm contexts.[web:4] |
| Styling  | HTML, CSS, lightweight JS            | Smooth performance on shared, low-RAM, or older devices. |
| Config   | .env                               | Keeps API keys outside the codebase and simplifies environment-specific setups.[web:41] |

---
Follow these steps to run AgroCare locally.
## ⚙️ Local Setup Instructions

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

## 👥 Team AgroCare

| Member              | GitHub Profile                                                |
|---------------------|---------------------------------------------------------------|
| *Rutuja Raut*     | https://github.com/rutujaraut730                              |
| *Samruddhi Kulkarni* | https://github.com/samrudhikulkarni05                     |
| *Pramila Chandanshive* | https://github.com/PramilaChandanshive                 |
| *Sakshi Tamshetti* | https://github.com/SakshiTamshetti                          |

*Built for HED 7.0 – Greenathon: Hack. Build. Sustain.* 🌱
