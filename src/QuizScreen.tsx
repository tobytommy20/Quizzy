type Question = {
  question: string;
  correctAnswer: string;
  answers: string[];
};

type QuizScreenProps = {
  questions: Question[];
  selectedAnswers: Record<number, string>;
  checked: boolean;
  onSelect: (questionIndex: number, answer: string) => void;
  onCheck: () => void;
  onPlayAgain: () => void;
};

function QuizScreen({
  questions,
  selectedAnswers,
  checked,
  onSelect,
  onCheck,
  onPlayAgain,
}: QuizScreenProps) {
  const score = questions.reduce((total, q, index) => {
    if (selectedAnswers[index] === q.correctAnswer) {
      return total + 1;
    }
    return total;
  }, 0);

  return (
    <div className="quiz-screen">
      {questions.map((q, index) => (
        <div key={index} className="question-block">
          <h3>{q.question}</h3>

          <div className="answers">
            {q.answers.map((answer) => {
             const isSelected = selectedAnswers[index] === answer;

             const classes = [
               "answer-btn",
               isSelected && !checked && "selected",
               checked &&
                 (answer === q.correctAnswer
                   ? "correct"
                   : isSelected
                   ? "wrong"
                   : "dimmed"),
             ]
               .filter(Boolean)
               .join(" ");


              return (
                <button
                key={answer}
                  className={classes}
                  onClick={() => onSelect(index, answer)}
                  disabled={checked}
                >
                  {answer}
                </button>
              );
            })}
          </div>
        </div>
      ))}


      <div className="quiz-footer">
      {!checked ? (
        <button onClick={onCheck}>Check Answers</button>
      ) : (
        <div>
          <p>
            You scored {score}/{questions.length} correct answers
          </p>
          <button 
          className="quiz-footer"
          onClick={onPlayAgain}>Play Again</button>
        </div>
      )}
    </div>
    </div>
  );
}

export default QuizScreen;
