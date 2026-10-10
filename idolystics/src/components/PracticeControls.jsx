function PracticeControls({ isPracticing, onStart, onFinish }) {
  return (
    <section className="practice-controls">
      <h2>Ready to Dance?</h2>

      {!isPracticing ? (
        <button onClick={onStart}>
          Start Practice
        </button>
      ) : (
        <button onClick={onFinish}>
          Finish Practice
        </button>
      )}
    </section>
  )
}

export default PracticeControls
