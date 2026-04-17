# CollegeMate-Chatbot

A simple and interactive **AI-powered chatbot web application** designed to help users get information about a college campus.

This chatbot answers queries related to:

* 📍 Building locations
* 👨‍🏫 Faculty details
* 📚 General college information

---

## 🚀 Features

* 💬 ChatGPT-style modern UI
* 🤖 Smart keyword & synonym-based responses
* ⏱️ Message timestamps
* ✨ Typing animation for bot
* 📜 Scrollable chat interface
* 📱 Mobile-friendly design
* ⚡ Works directly in browser (no setup needed)

---

## 🧠 How It Works

The chatbot uses a **custom JSON-based knowledge base** stored in `script.js`.

* User enters a query
* JavaScript processes the input
* Matches keywords & synonyms
* Returns the best possible response

If no match is found:

> "Sorry, I don't have information about that."

---

## 📁 Project Structure

```
college-chatbot/
│
├── index.html     # Main UI structure
├── style.css      # Styling and layout
├── script.js      # Chat logic + knowledge base
└── README.md      # Project documentation
```

---

## 🛠️ Setup Instructions

1. Download or clone the repository
2. Open the project folder
3. Double-click `index.html`

✅ That’s it! Your chatbot will run in the browser.

---

## 🌐 Deployment

You can host this project for free using:

* GitHub Pages
* Netlify
* Vercel

After deployment, you’ll get a public link to share with others.

---

## 🧾 Customizing Data

Edit the **knowledge base** inside `script.js`:

```javascript
const knowledgeBase = {
  buildings: {
    "library": "Near main block"
  },
  faculty: [
    { name: "Dr. Rao", department: "CSE", subject: "Mathematics" }
  ],
  general: {
    "college timing": "9 AM to 4 PM"
  }
};
```

You can:

* Add new buildings 🏢
* Add faculty 👨‍🏫
* Update general info 📚

---

## 🧩 Future Enhancements

* 🔗 Database integration (Firebase / MySQL)
* 🤖 Real AI integration (OpenAI / Gemini)
* 🎤 Voice input support
* 📱 Android app version
* 🧑‍💼 Admin dashboard


 ## Developed by: *Akhila Bodduri*

If you like this project:

* Give it a ⭐ on GitHub
* Share with your friends
