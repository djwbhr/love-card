import "./App.css";
import loveImg from "./assets/love.jpg";
import { useState, useEffect, useCallback } from "react";

const HEARTS = ["❤️", "💖", "💕", "💘", "💝", "💗", "💓", "💞", "💟"];
const SPARKLES = ["✨", "🌟", "⭐", "💫", "🎆", "🎇", "💥"];

function createHeart() {
  return {
    id: Math.random().toString(36).slice(2) + Date.now(),
    left: Math.random() * 90 + 5,
    size: Math.random() * 20 + 20,
    emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
    duration: Math.random() * 1.5 + 2.5,
  };
}

function createSparkle() {
  return {
    id: Math.random().toString(36).slice(2) + Date.now(),
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 16 + 20,
    emoji: SPARKLES[Math.floor(Math.random() * SPARKLES.length)],
    duration: Math.random() * 0.5 + 0.8,
    dx: (Math.random() - 0.5) * 300,
    dy: (Math.random() - 0.5) * 300,
  };
}

function DaysCounter() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const start = new Date(2022, 6, 2);
    const today = new Date();
    const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    setDays(diff);
  }, []);

  return (
    <div className="days-counter">
      <span className="days-number">{days}</span>
      <span className="days-label">дней вместе ❤️</span>
    </div>
  );
}

function CatchGame({ onClose }) {
  const [hearts, setHearts] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  const addGameHeart = useCallback(() => {
    const h = createHeart();
    h.duration = Math.random() * 1.2 + 1.8;
    setHearts((prev) => [...prev, h]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((x) => x.id !== h.id));
    }, (h.duration + 0.3) * 1000);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(addGameHeart, 350);
    return () => clearInterval(interval);
  }, [gameOver, addGameHeart]);

  const catchHeart = (id) => {
    setHearts((prev) => prev.filter((h) => h.id !== id));
    setScore((s) => s + 1);
  };

  return (
    <div className="game-overlay">
      <div className="game-header">
        <span className="game-score">❤️ {score}</span>
        <span className="game-timer">{timeLeft}с</span>
        <button className="game-close-btn" onClick={onClose}>✕</button>
      </div>
      {!gameOver ? (
        <div className="game-area">
          {hearts.map((h) => (
            <span
              key={h.id}
              className="game-heart"
              style={{
                left: h.left + "%",
                fontSize: h.size + "px",
                animationDuration: h.duration + "s",
              }}
              onClick={() => catchHeart(h.id)}
            >
              {h.emoji}
            </span>
          ))}
        </div>
      ) : (
        <div className="game-result">
          <div className="game-result-score">{score}</div>
          <div className="game-result-label">сердечек поймано!</div>
          <button className="love-btn" onClick={onClose}>
            {score >= 20 ? "💖 Ты чемпионка!" : "❤️ Вернуться"}
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  const [fallingHearts, setFallingHearts] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [gameOpen, setGameOpen] = useState(false);

  const addHearts = useCallback((count = 2) => {
    const newHearts = Array.from({ length: count }).map(() => createHeart());
    setFallingHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setFallingHearts((prev) => prev.slice(newHearts.length));
    }, 4500);
  }, []);

  const burst = useCallback(() => {
    const newSparkles = Array.from({ length: 15 }).map(() => createSparkle());
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 1500);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => addHearts(2), 600);
    return () => clearInterval(interval);
  }, [addHearts]);

  const handleLoveClick = () => {
    addHearts(8);
    burst();
  };

  return (
    <div className="love-card-bg">
      <div className="love-card-container">
        <img src={loveImg} alt="love" className="love-img" />
        <h1 className="love-title">С 4-летием нас!</h1>
        <p className="love-message">
          Уже четыре года мы вместе!!! И каждый день наша любовь только растет.
          <br />
          Спасибо что ты у меня есть любимая, спасибо за заботу и радость что ты мне даришь. Спасибо что всегда рядом, что
          такая красивая и смешная, и что ты такая добрая и милая. <br />
          Я тебя очень люблю, хочу вместе улететь в Парадайз Фолс c:
          <br />
          Будь такой какая ты есть, ты самая лучшая, будь самой громкой, активной, оригинальной, будь собой, ты мне очень нравишься
        </p>
        <div className="hearts">
          <span>❤️</span>
          <span>💖</span>
          <span>💕</span>
          <span>💘</span>
        </div>
        <DaysCounter />
        <div className="buttons-stack">
          <button className="love-btn" onClick={handleLoveClick}>
            Я тебя люблю
          </button>
          <button className="love-btn game-btn" onClick={() => setGameOpen(true)}>
            🎮 Играть
          </button>
        </div>
        {/* Падающие сердечки */}
        <div className="falling-hearts">
          {fallingHearts.map((h) => (
            <span
              key={h.id}
              className="falling-heart"
              style={{
                left: h.left + "%",
                fontSize: h.size + "px",
                animationDuration: h.duration + "s",
              }}
            >
              {h.emoji}
            </span>
          ))}
        </div>
        {/* Вспышка на клик */}
        {sparkles.length > 0 && (
          <div className="sparkle-layer">
            {sparkles.map((s) => (
              <span
                key={s.id}
                className="sparkle"
                style={{
                  left: s.left + "%",
                  top: s.top + "%",
                  fontSize: s.size + "px",
                  animationDuration: s.duration + "s",
                  "--dx": s.dx + "px",
                  "--dy": s.dy + "px",
                }}
              >
                {s.emoji}
              </span>
            ))}
          </div>
        )}
      </div>
      {gameOpen && <CatchGame onClose={() => setGameOpen(false)} />}
    </div>
  );
}

export default App;
