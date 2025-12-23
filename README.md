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
AgroCare-kisan-plant-doctor/
│
├── components/
│ ├── AdminUserList.tsx # Admin panel – user management
│ ├── AuthModal.tsx # Login / Signup modal
│ ├── ChatInput.tsx # Chat input for AI interaction
│ ├── ChatMessage.tsx # Chat message UI
│ ├── DiagnosisResult.tsx # Crop diagnosis result display
│ ├── DocsView.tsx # Documentation / help view
│ ├── ExpertFinder.tsx # Find nearby agriculture experts
│ ├── Header.tsx # Top navigation bar
│ ├── HistoryView.tsx # Previous crop check history
│ ├── InputSection.tsx # Image upload & input section
│ ├── LandingPage.tsx # Main landing page
│ ├── LanguageSelector.tsx # Language switching component
│ ├── ReportCard.tsx # Crop health report card
│ ├── Sidebar.tsx # Dashboard sidebar navigation
│ └── WeatherView.tsx # Weather information screen
│
├── services/
│ └── api services # API calls (AI, weather, auth)
│
├── dbServices/ # Database & storage services
│
├── App.tsx # Root application component
├── constants.ts # App-wide constants
├── index.html # Main HTML file
├── index.tsx # React entry point
├── kisan_plant_doctor.html # Static landing page (optional)
├── metadata.json # App metadata
├── package.json # Project dependencies
├── tsconfig.json # TypeScript configuration
├── types.ts # Global TypeScript types
├── vite.config.ts # Vite configuration
└── README.md # Project documentation

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

 ## ⚙️ How It Works

User Login
Farmers log in securely using a mobile number or email to access personalized features.

Upload Crop Image & Add Query
The farmer uploads a clear photo of the affected crop leaf and can add a short query or problem description (e.g., "yellow spots on leaves" or "plant not growing well") through the Check Crop option.

AI Analysis
The image is sent to the AI engine (Google Gemini), which analyzes visual patterns using computer vision and ML models.

Disease Detection
The system identifies the crop disease (or confirms healthy status) along with severity level.

Treatment Recommendation
Suitable cure, preventive steps, and farming tips are displayed in a simple, farmer-friendly format.

Weather & Local Support
Farmers can check today’s weather and access local agricultural help for better decision-making.

History Saved
All previous crop checks and reports are securely stored for future reference.

---

## Advantages


🌱 Early Disease Detection – Identifies crop diseases at an early stage, reducing yield loss.

🤖 AI-Powered Accuracy – Uses image analysis and user queries for more accurate diagnosis.

⏱️ Time-Saving – Farmers get instant results without waiting for experts.

💰 Cost-Effective – Reduces unnecessary spending on incorrect fertilizers and pesticides.

🌦️ Weather-Aware Decisions – Helps farmers plan activities using real-time weather data.

🧑‍🌾 Easy to Use – Simple, farmer-friendly interface requiring minimal technical knowledge.

🌐 Multi-Language Support – Accessible to farmers in their local language.

🔐 Secure & Personalized – Login-based system keeps farmer data safe and personalized.

📊 History Tracking – Previous crop reports can be reviewed anytime.

🌍 Scalable Solution – Can be expanded to more crops, regions, and features.

---

## 🌱 Future Scope

🎙️ Voice-Based Assistant – Farmers can speak queries instead of typing.

📱 Mobile App Version – Android/iOS app for wider farmer reach.

🌾 Crop Recommendation System – Suggest best crops based on soil & weather.

💊 Fertilizer & Pesticide Guidance – Smart recommendations with dosage control.

📈 Market Price Prediction – Predict crop prices to help farmers plan selling.

🛰️ Satellite & IoT Integration – Advanced monitoring of crop health and soil.

🌍 Offline Mode Support – Basic features available without internet.

🗣️ More Regional Languages – Support for additional Indian languages.

👨‍💼 Government & NGO Integration – Direct access to schemes and advisories.

---
## 👥 Team Members

| 👤 Name & Profiles | 🏷️ Role |
|-------------------|---------|
| **🌿 Samruddhi Kulkarni**  <br> 🔗 [LinkedIn](https://www.linkedin.com/in/samrudhi-kulkarni-b85991251) · 💻 [GitHub](https://github.com/samrudhikulkarni05) | ![AI & Backend](https://img.shields.io/badge/AI%20%26%20Backend-1E88E5?style=flat&logo=google&logoColor=white) |
| **🎨 Pramila Chandanshive**  <br> 🔗 [LinkedIn](https://www.linkedin.com/in/pramila-c-ab3103256) · 💻 [GitHub](https://github.com/PramilaChandanshive) | ![UI%2FUX%20%26%20Frontend](https://img.shields.io/badge/UI%2FUX%20%26%20Frontend-8E24AA?style=flat&logo=figma&logoColor=white) |
| **⚛️ Rutuja Raut**  <br> 🔗 [LinkedIn](https://www.linkedin.com/in/rutuja-raut-7926a7256/) · 💻 [GitHub](https://github.com/rutujaraut730) | ![Frontend%20%26%20Research](https://img.shields.io/badge/Frontend%20%26%20Research-F4511E?style=flat&logo=react&logoColor=white) |
| **🤖 Sakshi Tamshetti**  <br> 🔗 [LinkedIn](https://in.linkedin.com/in/sakshi-t-311123256) · 💻 [GitHub](https://github.com/SakshiTamshetti) | ![Chatbot%20%26%20Documentation](https://img.shields.io/badge/Chatbot%20%26%20Documentation-00897B?style=flat&logo=chatbot&logoColor=white) |


---
## Overall Conclusion

AgroCare – Kisan Plant Doctor shows how AI can help farmers by detecting crop diseases, answering queries, and providing weather and local support. It is designed for farmers with a simple interface, multiple languages, and secure personalized access. AgroCare can reduce crop losses and grow into a smart digital companion with voice support, mobile access, and market updates. 🌾📱

Enjoy the full-screen interactive experience! 🌿✨

### 🌾 Together, let's build Healthy Crops and Strong Farmers 🌱 
