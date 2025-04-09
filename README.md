# 💬 AI Chat with Gemini Pro

A modern, web-based chat application powered by **Google's Gemini Pro** model and built using **Flask** and **LangChain**. This project demonstrates how to integrate large language models into a responsive web interface with persistent conversation memory.

---

## 🚀 Features

### ✨ AI-Powered Chat
- Powered by **Google's Gemini Pro** model for intelligent and contextual conversations.
- Supports **multi-turn dialogues** with persistent memory.
- Real-time **message streaming**.

### 🖥️ Modern Interface
- Clean and **responsive UI** (desktop & mobile-friendly).
- **Typing indicators**, **timestamps**, and smooth user experience.

### ⚙️ Technical Highlights
- **Session-based** conversation management.
- **Rate limiting**, **input validation**, and robust **error handling**.
- Graceful degradation on API failures.

---

## 🛠️ Tech Stack

### Backend
- Python 3.9+
- [Flask](https://flask.palletsprojects.com/) - Web framework
- [LangChain](https://www.langchain.com/) - LLM integration
- [Flask-Session](https://flask-session.readthedocs.io/) - Session management

### Frontend
- Vanilla JavaScript
- Responsive CSS
- Fetch API for backend communication

### AI
- [Google Generative AI](https://ai.google.dev/) (Gemini Pro)
- LangChain for conversation memory

---

## 📦 Getting Started

### ✅ Prerequisites
- Python 3.9 or higher
- Google API key with **Gemini access**
- Node.js (for optional frontend builds)

### 📥 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/ai-chat-gemini.git
cd ai-chat-gemini
```

Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Create a .env file:
```bash
cp .env.example .env
```

Then open .env and add your Google API key and other secrets:
```bash
GOOGLE_API_KEY=your_api_key_here
SECRET_KEY=your_flask_secret_key
```


## ▶️ Running the Application
Start the development server:
```bash
python app.py
```
