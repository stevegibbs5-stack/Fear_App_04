document.addEventListener("DOMContentLoaded", () => {

  const avatar = document.getElementById("avatar");
  const startScreen = document.getElementById("startScreen");
  const startBtn = document.getElementById("startBtn");

  const mainButtons = document.getElementById("mainButtons");
  const tierButtons = document.getElementById("tierButtons");
  const hearAnotherBtn = document.getElementById("hearAnotherBtn");
  const doneBtn = document.getElementById("doneBtn");

  let currentMain = "";
  let currentTier = 1;

  // ----- Random phrases with durations (ms) -----
  const phrases = {
    outside: {
      1: [
        { text: "It’s perfectly okay to stay inside for now. You’re being thoughtful and careful, and that’s a good start.", duration: 4800 },
        { text: "Just noticing your thoughts and feelings is already a brave step — no need to rush.", duration: 4200 },
        { text: "Take your time. Being aware of your comfort zone is progress in itself.", duration: 4000 },
        { text: "You’re safe where you are, and that’s enough for today. I’m right here with you.", duration: 4500 },
        { text: "Even staying in and taking a few deep breaths counts as moving forward — you’re doing well.", duration: 5000 }
      ],
      2: [
        { text: "Maybe open the door just a little and notice the fresh air. No pressure to move further — every small action counts.", duration: 4800 },
        { text: "Putting on your shoes or standing by the doorway is already a meaningful step forward.", duration: 4500 },
        { text: "You might try stepping outside for just a few moments. Remember, you are in control of the pace.", duration: 4700 },
        { text: "Even preparing to go out — like checking your coat or bag — is progress. Celebrate it quietly.", duration: 4400 },
        { text: "Notice the light, the air, or the sounds around you — even small observations are victories.", duration: 4600 }
      ],
      3: [
        { text: "Taking even ten seconds outside is a win. You’re showing courage, and that matters.", duration: 4300 },
        { text: "Feel your feet on the ground and notice the world around you. You’re doing wonderfully.", duration: 4700 },
        { text: "Remember, it’s okay to turn back at any moment. The effort itself is what counts.", duration: 4200 },
        { text: "The sensation of stepping outside will come and go, but your bravery remains steady.", duration: 4500 },
        { text: "Every small step forward is a success — take it slowly and know that I’m proud of you.", duration: 4800 }
      ]
    },
    clinic: {
      1: [
        { text: "It’s okay to wait and plan first. Taking time is a brave choice.", duration: 4200 },
        { text: "Just thinking about going already shows courage. You don’t need to do more right now.", duration: 4300 },
        { text: "You’re safe at home, and that’s enough for today. I’m here with you.", duration: 4400 },
        { text: "No pressure to go today — acknowledging your feelings counts as progress.", duration: 4500 },
        { text: "Even preparing mentally by imagining the visit is a step forward.", duration: 4600 }
      ],
      2: [
        { text: "Maybe write down the questions or notes for your visit — preparation is progress.", duration: 4800 },
        { text: "Checking the schedule or planning your route is already a meaningful step.", duration: 4600 },
        { text: "You might call the clinic just to clarify, no need to go yet.", duration: 4400 },
        { text: "Packing your bag or organizing what you need counts as moving forward.", duration: 4700 },
        { text: "Even visualizing yourself arriving safely is a small victory.", duration: 4500 }
      ],
      3: [
        { text: "Even a short visit is an achievement — celebrate each moment outside your comfort zone.", duration: 5000 },
        { text: "Take one step at a time — walking in, checking in, breathing — you are capable.", duration: 4800 },
        { text: "Remember, it’s okay to pause or step back if things feel overwhelming.", duration: 4500 },
        { text: "Each moment you face this fear builds strength — you are doing wonderfully.", duration: 4700 },
        { text: "Focus on one small action at a time, and notice the courage in every step you take.", duration: 4900 }
      ]
    },
    social: {
      1: [
        { text: "It’s perfectly fine to stay home today. Your feelings are important, and you’re being thoughtful.", duration: 4300 },
        { text: "Even noticing your anxiety is a brave first step — no need to force yourself.", duration: 4200 },
        { text: "You can take time to observe from a distance; just being aware counts as progress.", duration: 4400 },
        { text: "You’re safe where you are, and that’s enough for today. I’m here with you.", duration: 4500 },
        { text: "Even taking a few deep breaths and checking in with yourself is a small success.", duration: 4600 }
      ],
      2: [
        { text: "Maybe start by sending a message or RSVP first — small actions count.", duration: 4500 },
        { text: "Arriving a few minutes late can ease you in gently.", duration: 4200 },
        { text: "Choosing a quiet corner or familiar spot helps you feel more comfortable.", duration: 4400 },
        { text: "Bringing a trusted friend for support is a meaningful step forward.", duration: 4600 },
        { text: "Noticing the environment and how it feels around you is already progress.", duration: 4500 }
      ],
      3: [
        { text: "Even spending five minutes is a success — every moment counts.", duration: 4300 },
        { text: "Focus on your breath and surroundings — you’re handling this wonderfully.", duration: 4400 },
        { text: "It’s okay to leave or take a break if it becomes overwhelming — effort matters, not perfection.", duration: 4700 },
        { text: "Every interaction, no matter how small, is a step forward. You’re doing great.", duration: 4500 },
        { text: "Notice your courage in each step — even trying is an achievement in itself.", duration: 4600 }
      ]
    }
  };

  // ----- Greeting -----
  const welcomePhrase = { text: "Hey, it’s really good to have you here. No pressure at all — just breathe, and know that I’m here to support you every step of the way.", duration: 4000 };

  // ----- CHEAT FIX: speak with timer -----
  function speakTimedPhrase(phrase) {
    avatar.src = "talking.gif";
    hearAnotherBtn.style.display = "none";
    doneBtn.style.display = "none";

    if (window.AppInventor) window.AppInventor.setWebViewString(phrase.text);
    else if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(phrase.text);
      window.speechSynthesis.speak(utter);
    } else console.log("TTS:", phrase.text);

    setTimeout(() => {
      avatar.src = "idle.gif";
      hearAnotherBtn.style.display = "inline-block";
      doneBtn.style.display = "inline-block";
    }, phrase.duration);
  }

  // ----- START BUTTON -----
  startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    avatar.src = "waving.gif";
    avatar.style.display = "inline-block";

    if (window.AppInventor) window.AppInventor.setWebViewString(welcomePhrase.text);
    else if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(welcomePhrase.text);
      window.speechSynthesis.speak(utter);
    } else console.log("TTS:", welcomePhrase.text);

    setTimeout(() => {
      avatar.src = "idle.gif";
      mainButtons.style.display = "block";
      hearAnotherBtn.style.display = "none";
      doneBtn.style.display = "none";
    }, welcomePhrase.duration);
  });

  // ----- MAIN BUTTONS -----
  mainButtons.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      currentMain = btn.dataset.type;
      tierButtons.style.display = "block";
      mainButtons.querySelectorAll("button").forEach(b => { if (b !== btn) b.style.display = "none"; });
      hearAnotherBtn.style.display = "none";
      doneBtn.style.display = "none";
    });
  });

  // ----- TIER BUTTONS -----
  tierButtons.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      currentTier = btn.dataset.tier;
      const list = phrases[currentMain][currentTier];
      const phrase = list[Math.floor(Math.random() * list.length)];
      speakTimedPhrase(phrase);
    });
  });

  // ----- HEAR ANOTHER -----
  hearAnotherBtn.addEventListener("click", () => {
    const list = phrases[currentMain][currentTier];
    const phrase = list[Math.floor(Math.random() * list.length)];
    speakTimedPhrase(phrase);
  });

  // ----- DONE -----
  doneBtn.addEventListener("click", () => {
    tierButtons.style.display = "none";
    hearAnotherBtn.style.display = "none";
    doneBtn.style.display = "none";
    mainButtons.querySelectorAll("button").forEach(b => b.style.display = "inline-block");
  });

});
