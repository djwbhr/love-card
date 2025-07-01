import './App.css'
import loveImg from './assets/love.jpg'
import { useState } from 'react'

const HEARTS = ['❤️', '💖', '💕', '💘', '💝', '💗', '💓', '💞', '💟']

function App() {
  const [fallingHearts, setFallingHearts] = useState([])

  const handleLoveClick = () => {
    // Добавляем 5 сердечек за клик
    const newHearts = Array.from({ length: 5 }).map(() => ({
      id: Math.random().toString(36).slice(2) + Date.now(),
      left: Math.random() * 90 + 5, // процент от ширины
      size: Math.random() * 24 + 24, // px
      emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
      duration: Math.random() * 1 + 2.5 // 2.5-3.5 сек
    }))
    setFallingHearts((prev) => [...prev, ...newHearts])
    // Удаляем сердечки после анимации
    setTimeout(() => {
      setFallingHearts((prev) => prev.slice(newHearts.length))
    }, 4000)
  }

  return (
    <div className="love-card-bg">
      <div className="love-card-container">
        <img src={loveImg} alt="love" className="love-img" />
        <h1 className="love-title">С 3-летием наших отношений!</h1>
        <p className="love-message">
          Любимая, вот уже три года мы вместе, и каждый день с тобой — это счастье.<br/>
          Спасибо за твою любовь, заботу и улыбку. Я тебя очень люблю<br/>
          Пусть впереди нас ждёт ещё много прекрасных моментов и счастливых лет вместе.
        </p>
        <div className="hearts">
          <span>❤️</span>
          <span>💖</span>
          <span>💕</span>
          <span>💘</span>
        </div>
        <button className="love-btn" onClick={handleLoveClick}>Я тебя люблю</button>
        {/* Падающие сердечки */}
        <div className="falling-hearts">
          {fallingHearts.map((h) => (
            <span
              key={h.id}
              className="falling-heart"
              style={{
                left: h.left + '%',
                fontSize: h.size + 'px',
                animationDuration: h.duration + 's',
              }}
            >
              {h.emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
