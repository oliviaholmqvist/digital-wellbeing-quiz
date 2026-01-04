import { useState } from "react"
import "./App.css"

const questions = [
  {
    question: "How often do you take breaks from screens?",
    options: ["Rarely", "Sometimes", "Often"],
    scores: [0, 1, 2],
  },
  {
    question: "How do you usually feel after long screen time?",
    options: ["Tired", "Neutral", "Focused"],
    scores: [0, 1, 2],
  },
  {
    question: "Do you check your phone immediately after waking up?",
    options: ["Always", "Sometimes", "Rarely"],
    scores: [0, 1, 2],
  },
  {
    question: "How often do you multitask across multiple screens?",
    options: ["Often", "Sometimes", "Rarely"],
    scores: [0, 1, 2],
  },
  {
    question: "Do you set boundaries for notifications or screen time?",
    options: ["Never", "Sometimes", "Yes, regularly"],
    scores: [0, 1, 2],
  },
]


function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [totalScore, setTotalScore] = useState(0)

  function handleAnswer(optionIndex) {
    const scoreForAnswer =
      questions[currentQuestion].scores[optionIndex]

    setTotalScore((prev) => prev + scoreForAnswer)
    setCurrentQuestion((prev) => prev + 1)
  }

  function resetQuiz() {
    setCurrentQuestion(0)
    setTotalScore(0)
  }

  const isFinished = currentQuestion >= questions.length

  // ---- Result logic ----
  const maxScore = questions.length * 2
  const normalized = totalScore / maxScore

  let profileTitle = "Balanced"
  let profileText =
    "You seem to have a fairly balanced relationship with screen time."
  let tip =
    "Try short, regular breaks to maintain focus and reduce fatigue."

  if (normalized <= 0.34) {
    profileTitle = "Screen-heavy"
    profileText =
      "Your answers suggest long stretches of uninterrupted screen time."
    tip =
      "Start small: take a short break after each task, even 60 seconds helps."
  } else if (normalized >= 0.67) {
    profileTitle = "Well-paced"
    profileText =
      "You already show healthy habits around screen time and recovery."
    tip =
      "Keep it up—protect your focus with consistent breaks."
  }

  return (
    <div className="app">
      <header className="app__header">
        <p className="app__kicker">Digital Wellbeing</p>
        <h1 className="app__title">Quiz</h1>
      </header>

      {!isFinished ? (
        <main className="card">
          <p className="question">
            {questions[currentQuestion].question}
          </p>

          <div className="options">
            {questions[currentQuestion].options.map(
              (option, index) => (
                <button
                  key={index}
                  className="btn"
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </button>
              )
            )}
          </div>

          <p className="progress">
            {currentQuestion + 1} / {questions.length}
          </p>
        </main>
      ) : (
        <main className="card">
          <h2 className="resultTitle">{profileTitle}</h2>
          <p className="resultText">{profileText}</p>

          <div className="resultTip">
            <p className="resultTip__label">Suggestion</p>
            <p className="resultTip__text">{tip}</p>
          </div>

          <button
            className="btn btn--secondary"
            onClick={resetQuiz}
          >
            Restart quiz
          </button>
        </main>
      )}

      <footer className="footer">
        © 2026 Olivia Holmqvist
      </footer>
    </div>
  )
}

export default App
