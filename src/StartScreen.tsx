type StartScreenProps = {
    onStart: () => void;
}

function StartScreen({ onStart }: StartScreenProps){
    return(
        <div className="start-screen">
            <h1>Quizzical</h1>
            <p> TEST YOUR KNOWLEDGE</p>
            <button onClick={onStart}>Start Quiz</button>
        </div>
    );
}


export default StartScreen