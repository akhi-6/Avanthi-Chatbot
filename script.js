// START BUTTON
document.getElementById("startBtn").onclick = () => {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("chatApp").style.display = "block";
};

// KNOWLEDGE BASE
const knowledgeBase = {
  departments: {
    csmd: {
      hod: "MS. Sri Lakshmi madam (PhD) is the HOD of CSMD department.",
      faculty: [
        { name: "MS. Rama Devi Mam", subject: "ML" },
        { name: "Ms. Lavanya Mam", subject: "AI" },
        { name: "Ms. Sangeetha Mam", subject: "ATCD" },
        { name: "Ms. Deepthi Mam", subject: "IRS" },
        { name: "Ms. Sirisha Mam", subject: "DLCO" },
        { name: "Mr. Sudharshan Sir", subject: "JAVA" },
        { name: "Mr. Ravi Sir", subject: "Python" },
        { name: "Ms. Indra Mam", subject: "C&NS" },
        { name: "Ms. Ganesh Sir", subject: "SPM" },
        { name: "Mr. Paramesh Sir", subject: "CV" }
      ]
    },
    ece: {
      hod: "Dr. ABC is the HOD of ECE department."
    }
  },

  management: {
    principal: "Dr. Murali Krishna Sir is the Principal of AVEV.",
    director: "Dr. Chandra Shekar Sir is the Director of AVEV.",
    ao: "Administrative Officer details are available in office."
  },

  buildings: {
    "library": "The library is located inside the BSH Block.",
    "bsh block": "BSH block is beside the Open Gym.",
    "lab 1": "Lab 1 is in first floor Main block.",
    "lab 2": "Lab 2 is in the second floor Main block.",
    "lab 3": "Lab 3 is in the third floor Main block.",
    "ece seminar hall": "It is in the second floor left side Main block.",
    "mech seminar hall": "Beside Mech block 1st floor of canteen.",
    "mechanic block": "Before Mech canteen.",
    "auditorium": "Backside of the college near Degree Block."
  }
};



// 🔥 NORMALIZE (STRONG)
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}



// 🔥 ADVANCED MATCH
function fuzzyMatch(input, target) {
  input = normalize(input);
  target = normalize(target);

  if (input.includes(target)) return true;

  const inputWords = input.split(" ");
  const targetWords = target.split(" ");

  let matchCount = 0;

  for (let word of targetWords) {
    if (inputWords.some(i => i.startsWith(word))) {
      matchCount++;
    }
  }

  return matchCount >= Math.ceil(targetWords.length / 2);
}



// 🎯 MAIN RESPONSE ENGINE
function getLocalResponse(input) {
  input = normalize(input);

  // 👉 CSMD faculty list
  if (input.includes("csmd") && input.includes("faculty")) {
    return knowledgeBase.departments.csmd.faculty
      .map(f => `• ${f.name} (${f.subject})`)
      .join("<br>");
  }

  // 👉 HOD
  if (input.includes("csmd") && input.includes("hod")) {
    return knowledgeBase.departments.csmd.hod;
  }

  if (input.includes("ece") && input.includes("hod")) {
    return knowledgeBase.departments.ece.hod;
  }

  // 👉 Management
  if (input.includes("principal")) return knowledgeBase.management.principal;
  if (input.includes("director")) return knowledgeBase.management.director;
  if (input.includes("ao") || input.includes("administrative")) return knowledgeBase.management.ao;

  // 👉 Faculty detection
  for (let f of knowledgeBase.departments.csmd.faculty) {
    if (
      fuzzyMatch(input, f.name) ||
      input.includes(f.subject.toLowerCase())
    ) {
      return `${f.name} teaches ${f.subject}.`;
    }
  }

  // 👉 Buildings (VERY IMPORTANT FIX)
  for (let key in knowledgeBase.buildings) {
    if (
      fuzzyMatch(input, key) ||
      input.includes(key.split(" ")[0]) // partial match
    ) {
      return knowledgeBase.buildings[key];
    }
  }

  return null;
}



// 🤖 OPTIONAL AI FALLBACK (SAFE)
async function getAIResponse(text) {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a college assistant." },
          { role: "user", content: text }
        ]
      })
    });

    const data = await res.json();
    return data.choices[0].message.content;

  } catch {
    return "Sorry, I couldn't understand. Please try again.";
  }
}



// SEND MESSAGE
function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  botTyping(async () => {
    let reply = getLocalResponse(text);

    if (!reply) {
      reply = "Sorry, I don't have that information.";
    }

    addMessage(reply, "bot");
  });
}



// UI
function addMessage(text, sender) {
  const box = document.getElementById("chatBox");
  const msg = document.createElement("div");
  msg.className = "message " + sender;

  msg.innerHTML = text + 
    `<div class="timestamp">${new Date().toLocaleTimeString()}</div>`;

  box.appendChild(msg);
  box.scrollTop = box.scrollHeight;
}



function botTyping(cb) {
  const box = document.getElementById("chatBox");
  const t = document.createElement("div");
  t.className = "message bot";
  t.innerText = "Typing...";
  box.appendChild(t);

  setTimeout(() => {
    box.removeChild(t);
    cb();
  }, 600);
}



// 🎤 VOICE
function startVoice() {
  const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  rec.onresult = e => {
    document.getElementById("userInput").value = e.results[0][0].transcript;
    sendMessage();
  };
  rec.start();
}



// QUICK BUTTONS
function quickAsk(text) {
  document.getElementById("userInput").value = text;
  sendMessage();
}



// ENTER KEY
document.getElementById("userInput").addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});