import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("Home");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [savedContact, setSavedContact] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
const [chatMessages, setChatMessages] = useState([
  {
    role: "assistant",
    text: "Hi 💗 Welcome to MindBridge. This is a safe place to pause, share what's on your mind, and explore supportive next steps. How are you feeling today?",
  },
]);
const [breathingActive, setBreathingActive] = useState(false);
const [breathingPhase, setBreathingPhase] = useState("Ready?");
const [breathingSeconds, setBreathingSeconds] = useState(60);
const [breathingRemaining, setBreathingRemaining] = useState(60);
useEffect(() => {
  if (!breathingActive) return;

  const startTime = Date.now();
  let phaseTimer;

  function updateBreathing() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const remaining = Math.max(0, breathingSeconds - elapsed);

    setBreathingRemaining(remaining);

    if (remaining === 0) {
      setBreathingActive(false);
      setBreathingPhase("Well done! 💗");
      return;
    }

    const phaseTime = elapsed % 8;

    if (phaseTime < 4) {
      setBreathingPhase("Breathe in gently");
    } else {
      setBreathingPhase("Breathe out slowly");
    }
  }

  updateBreathing();
  phaseTimer = setInterval(updateBreathing, 250);

  return () => clearInterval(phaseTimer);
}, [breathingActive, breathingSeconds]);
  const pages = [
  "Home",
  "AI Support",
  "Calm Corner",
  "Emergency Help",
  "My Emergency Contact",
  "Find a Professional",
];
  function saveContact(event) {
    event.preventDefault();

    if (!contactName.trim() || !contactPhone.trim()) {
      alert("Please enter the contact's name and phone number.");
      return;
    }

    setSavedContact({
      name: contactName.trim(),
      phone: contactPhone.trim(),
    });

    alert("Contact saved for this session.");
  }
    function sendChatMessage(event) {
    event.preventDefault();

    const message = chatMessage.trim();
    if (!message) return;

    const userMessage = {
      role: "user",
      text: message,
    };

    let reply =
      "Thank you for sharing that with me. 💗 Would you like to tell me a little more about what you're experiencing?";

    const lowerMessage = message.toLowerCase();

    if (
      /\b(suicide|kill myself|end my life|hurt myself|self harm)\b/.test(
        lowerMessage
      )
    ) {
      reply =
        "I'm really sorry you're experiencing this. Your safety matters. If you may hurt yourself soon, please contact emergency services or go to the nearest hospital now. If possible, reach out to someone you trust and ask them to stay with you. You deserve support from a real person.";
    } else if (
      /\b(stress|stressed|overwhelmed|pressure|anxious|anxiety|worried)\b/.test(
        lowerMessage
      )
    ) {
      reply =
        "That sounds like a lot to carry. 💗 Try taking a slow, gentle breath and focusing on one small thing you can manage right now. You don't have to solve everything at once. What's been putting the most pressure on you?";
    } else if (
      /\b(sad|lonely|alone|crying|unhappy|depressed)\b/.test(lowerMessage)
    ) {
      reply =
        "I'm sorry things feel heavy right now. You deserve kindness, and you don't have to pretend to be okay. Would it help to talk about what has been making you feel this way?";
    } else if (
      /\b(happy|good|great|excited|better|proud)\b/.test(lowerMessage)
    ) {
      reply =
        "I'm glad to hear that! 🌷 It's worth taking a moment to appreciate the good things, even the little ones. What has been going well for you?";
    } else if (
      /\b(school|study|exam|work|assignment|university)\b/.test(lowerMessage)
    ) {
      reply =
        "Balancing responsibilities can be challenging. 💗 Try choosing one manageable task to focus on first, then take a short break. What's the biggest challenge you're facing right now?";
    }

    setChatMessages((previous) => [
      ...previous,
      userMessage,
      { role: "assistant", text: reply },
    ]);

    setChatMessage("");
  }

  return (
    <div className="app-shell">
      <header className="navbar">
        <button
          className="brand"
          onClick={() => setActivePage("Home")}
        >
          <span className="brand-icon">♡</span>
          MindBridge
          <span className="brand-ai">AI</span>
        </button>

        <nav className="nav-links" aria-label="Main navigation">
          {pages.map((page) => (
            <button
              key={page}
              className={activePage === page ? "nav-link active" : "nav-link"}
              onClick={() => setActivePage(page)}
            >
              {page === "My Emergency Contact"
                ? "Emergency Contact"
                : page}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {activePage === "Home" && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <span className="eyebrow">
                  A SAFE SPACE TO BEGIN
                </span>

                <h1>
                  You don't have to
                  <span> face it alone.</span>
                </h1>

                <p>
                  Your feelings matter. Explore supportive resources,
                  take a moment for yourself, or find professional
                  mental health support when you're ready.
                </p>

                <div className="hero-actions">
                  <button
                    className="primary-button"
                    onClick={() => setActivePage("AI Support")}
                  >
                    Start a conversation →
                  </button>

                  <button
                    className="secondary-button"
                    onClick={() => setActivePage("Find a Professional")}
                  >
                    Find professional support
                  </button>
                </div>

                <div className="trust-note">
                  ♡ &nbsp; Support without judgement.
                </div>
              </div>

              <div className="hero-art">
                <div className="sun-shape"></div>
                <div className="floating-heart">♡</div>

                <div className="wellness-card">
                  <span className="plant-icon">✿</span>
                  <p>A gentle reminder</p>
                  <h2>You deserve care, patience and kindness.</h2>
                  <span className="card-caption">
                    One step at a time.
                  </span>
                </div>

                <div className="leaf leaf-one">❋</div>
                <div className="leaf leaf-two">✿</div>
              </div>
            </section>

            <section className="section-heading">
              <span className="eyebrow">HERE FOR YOU</span>
              <h2>How can we support you today?</h2>
              <p>
                Choose what feels right for you. There's no pressure
                to do everything at once.
              </p>
            </section>

            <section className="feature-grid">
              <FeatureCard
                icon="♡"
                title="AI Support"
                description="Explore your feelings and discover gentle coping resources."
                action="Start talking"
                onClick={() => setActivePage("AI Support")}
              />

              <FeatureCard
                icon="✚"
                title="Emergency Help"
                description="Find urgent assistance if you or someone else is in danger."
                action="View help options"
                onClick={() => setActivePage("Emergency Help")}
                urgent
              />

              <FeatureCard
                icon="♧"
                title="Trusted Contact"
                description="Choose someone you trust to contact when you need support."
                action="Add a contact"
                onClick={() => setActivePage("My Emergency Contact")}
              />

              <FeatureCard
                icon="☼"
                title="Professional Care"
                description="Explore the next step toward support from a qualified professional."
                action="Explore care"
                onClick={() => setActivePage("Find a Professional")}
              />
            </section>

            <section className="gentle-banner">
              <span>✿</span>
              <div>
                <h3>There's no perfect way to ask for help.</h3>
                <p>
                  Starting small is still starting. Take things at
                  your own pace.
                </p>
              </div>
            </section>
          </>
        )}

       ```
    {activePage === "AI Support" && (
      <section className="content-panel chat-panel">
        <span className="eyebrow">YOUR SUPPORT SPACE</span>
        <h1>Let's talk it out. 💗</h1>
        <p>
          Share what's on your mind. You deserve to be heard,
          without judgement.
        </p>

        <div className="notice-box">
          <strong>A gentle reminder</strong>
          <p>
            MindBridge offers general supportive responses.
            It is not a substitute for professional care.
            If you are in immediate danger, seek urgent human help.
          </p>
        </div>

        <div
          className="chat-messages"
          aria-live="polite"
          aria-label="Conversation"
        >
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`chat-bubble ${
                message.role === "user"
                  ? "user-bubble"
                  : "assistant-bubble"
              }`}
            >
              <span className="chat-role">
                {message.role === "user" ? "You" : "MindBridge"}
              </span>
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        <form className="chat-form" onSubmit={sendChatMessage}>
          <label htmlFor="chat-message">
            What's on your mind?
          </label>

          <textarea
            id="chat-message"
            value={chatMessage}
            onChange={(event) => setChatMessage(event.target.value)}
            placeholder="You can start with whatever feels comfortable..."
            rows={3}
            maxLength={2000}
            required
          />

          <button className="primary-button" type="submit">
            Send message →
          </button>
        </form>

        <button
          className="secondary-button"
          onClick={() => setActivePage("Find a Professional")}
        >
          Explore professional support
        </button>
      </section>
    )}
    ```jsx
```jsx
{activePage === "Calm Corner" && (
  <section className="content-panel calm-corner">
    <span className="eyebrow">YOUR MOMENT OF PEACE 🌷</span>

    <h1>Welcome to your Calm Corner</h1>

    <p>
      Feeling overwhelmed? Take a little break. You don't have
      to figure everything out right now. 💗
    </p>

    <div className="calm-grid">
      <article className="calm-card">
        <h2>🌬️ Take a Breath</h2>

        <p>
          Relax your shoulders and follow the circle at your own pace.
        </p>

        <div className="breathing-animation">
          <div
            className={`breathing-circle ${
              breathingActive ? "breathing-active" : ""
            }`}
          >
            <div className="breathing-circle-inner">
              <span className="breathing-icon">🌸</span>

              <strong>{breathingPhase}</strong>

              <span>
                {breathingActive
                  ? `${breathingRemaining} seconds remaining`
                  : "Take a gentle moment"}
              </span>
            </div>
          </div>
        </div>

        <div className="breathing-controls">
          {!breathingActive ? (
            <button
              className="primary-button"
              onClick={() => {
                setBreathingRemaining(breathingSeconds);
                setBreathingPhase("Get comfortable");
                setBreathingActive(true);
              }}
            >
              Start breathing 🌷
            </button>
          ) : (
            <button
              className="secondary-button"
              onClick={() => {
                setBreathingActive(false);
                setBreathingPhase("Ready?");
                setBreathingRemaining(breathingSeconds);
              }}
            >
              End session
            </button>
          )}

          <p>
            60-second gentle breathing exercise.
            Breathe comfortably.
          </p>
        </div>

        <p className="calm-tip">
          Breathe in as the circle grows and out as it shrinks.
          Do not force your breathing or hold your breath.
        </p>
      </article>

      <article className="calm-card">
        <h2>🌿 Ground Yourself</h2>

        <p>Try the 5-4-3-2-1 grounding exercise.</p>

        <ol>
          <li>Name 5 things you can see.</li>
          <li>Notice 4 things you can feel.</li>
          <li>Listen for 3 things you can hear.</li>
          <li>Notice 2 things you can smell.</li>
          <li>Identify 1 thing you can taste.</li>
        </ol>
      </article>

      <article className="calm-card">
        <h2>📚 Take a Study Break</h2>

        <p>Give your mind a short rest.</p>

        <ul>
          <li>Stand up and stretch gently.</li>
          <li>Drink some water.</li>
          <li>Look away from your screen.</li>
          <li>Choose one small task for later.</li>
        </ul>
      </article>

      <article className="calm-card">
        <h2>🧘 Release Tension</h2>

        <p>Try a gentle reset.</p>

        <ol>
          <li>Relax your jaw.</li>
          <li>Lower your shoulders.</li>
          <li>Unclench your hands.</li>
          <li>Stretch gently if comfortable.</li>
        </ol>
      </article>
    </div>

    <div className="notice-box">
      Take these activities at your own pace. Stop any exercise
      if you feel dizzy, uncomfortable, or unwell.
    </div>

    <button
      className="primary-button"
      onClick={() => setActivePage("AI Support")}
    >
      Talk to MindBridge 💗
    </button>
  </section>
)}
```



        {activePage === "Emergency Help" && (
          <section className="content-panel emergency-panel">
            <span className="eyebrow">URGENT SUPPORT</span>
            <h1>Help is important. Your safety comes first.</h1>

            <p>
              If you or someone else is in immediate danger, seek
              urgent human assistance now. Do not wait for a reply
              from this website.
            </p>

            <div className="notice-box urgent-notice">
              <strong>Need emergency assistance?</strong>
              <p>
                In Kenya, 999 and 112 are commonly listed emergency
                numbers. If possible, verify the appropriate local
                service and ask someone nearby to help.
              </p>
              <p>
                This prototype has not yet connected to emergency
                services.
              </p>
            </div>

            <div className="hero-actions">
              <a className="primary-button" href="tel:112">
                Call 112
              </a>
              <a className="secondary-button" href="tel:999">
                Call 999
              </a>
            </div>

            <p className="small-note">
              On a supported phone, a call button may open the dialler.
              On a computer, calling may not be available. The buttons
              do not confirm that a call has connected.
            </p>

            <button
              className="secondary-button"
              onClick={() => setActivePage("My Emergency Contact")}
            >
              View trusted contact options
            </button>
          </section>
        )}

        {activePage === "My Emergency Contact" && (
          <section className="content-panel">
            <span className="eyebrow">YOUR TRUSTED SUPPORT</span>
            <h1>Someone you trust.</h1>

            <p>
              Add a trusted person's details so you can find them
              easily when you need support.
            </p>

            <div className="notice-box">
              <strong>Privacy matters</strong>
              <p>
                This first demo saves the contact only in the current
                page session. It does not send a message or notify
                your contact automatically.
              </p>
            </div>

            <form className="contact-form" onSubmit={saveContact}>
              <label htmlFor="contact-name">Contact's full name</label>
              <input
                id="contact-name"
                value={contactName}
                onChange={(event) => setContactName(event.target.value)}
                placeholder="Enter their name"
                autoComplete="name"
                required
              />

              <label htmlFor="contact-phone">Phone number</label>
              <input
                id="contact-phone"
                type="tel"
                value={contactPhone}
                onChange={(event) => setContactPhone(event.target.value)}
                placeholder="Enter their phone number"
                autoComplete="tel"
                required
              />

              <button className="primary-button" type="submit">
                Save contact
              </button>
            </form>

            {savedContact && (
              <div className="saved-contact">
                <h3>Saved for this session</h3>
                <p><strong>Name:</strong> {savedContact.name}</p>
                <p><strong>Phone:</strong> {savedContact.phone}</p>

                <a
                  className="secondary-button"
                  href={`tel:${savedContact.phone.replace(/[^\d+]/g, "")}`}
                >
                  Call contact
                </a>

                <button
                  className="text-button"
                  onClick={() => {
                    setSavedContact(null);
                    setContactName("");
                    setContactPhone("");
                  }}
                >
                  Remove contact
                </button>
              </div>
            )}
          </section>
        )}

        {activePage === "Find a Professional" && (
          <section className="content-panel">
            <span className="eyebrow">PROFESSIONAL SUPPORT</span>
            <h1>You don't have to navigate this alone.</h1>

            <p>
              Explore the possibility of talking to a qualified
              mental health professional.
            </p>

            <div className="notice-box">
              <strong>Professional directory coming next</strong>
              <p>
                We'll build a directory with practitioner qualifications,
                specialties, consultation options and appointment requests.
                No practitioner has been verified through this demo yet.
              </p>
            </div>

            <button
              className="secondary-button"
              onClick={() => setActivePage("Home")}
            >
              Back to home
            </button>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="footer-brand">♡ MindBridge AI</div>
        <p>
          A supportive starting point, not a replacement for
          professional care or emergency services.
        </p>
        <span>MindBridge AI · Prototype</span>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  action,
  onClick,
  urgent = false,
}) {
  return (
    <article className={urgent ? "feature-card urgent-card" : "feature-card"}>
      <span className="feature-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="card-action" onClick={onClick}>
        {action} →
      </button>
    </article>
  );
}