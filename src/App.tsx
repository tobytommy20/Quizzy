import { useState } from "react";
import StartScreen from "./StartScreen";
import QuizScreen from "./QuizScreen";


export type Question = {
  question: string;
  correctAnswer: string;
  answers: string[];
};

function decodeHtml(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}


function App() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [checked,setChecked]= useState(false)

  async function fetchQuestions() {
    setLoading(true);

    const response = await fetch(
      "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
    );
    const data = await response.json();

    if (data.response_code !== 0) {
      setLoading(false);
      return;
    }

    const formattedQuestions = data.results.map((item: any) => {
      const answers = [
        ...item.incorrect_answers,
        item.correct_answer,
      ].map(decodeHtml)
      .sort(() => Math.random() - 0.5);

      return {
        question:decodeHtml(item.question),
        correctAnswer: decodeHtml(item.correct_answer),
        answers,
      };
    });

    setQuestions(formattedQuestions);
    setSelectedAnswers({});
    setChecked(false);
    setLoading(false);
  }

   function handleSelect(questionIndex: number, answer: string) {
    if (checked) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  }

function handlePlayAgain() {
    setChecked(false);
    setSelectedAnswers({});
    fetchQuestions();
    setStarted(false);

  }
  

return (
  <div className="app-wrapper">
    <div className="blob yellow" />
    <div className="blob blue" />

    {!started && (
      <StartScreen
        onStart={() => {
          setStarted(true);
          fetchQuestions();
        }}
      />
    )}

    {started && loading && <p>Loading...</p>}

    {started && !loading && (
      <QuizScreen
        questions={questions}
        selectedAnswers={selectedAnswers}
        checked={checked}
        onSelect={handleSelect}
        onCheck={() => setChecked(true)}
        onPlayAgain={handlePlayAgain}
      />
    )}
  </div>
);
}

export default App;