interface ScreeningResultProps {
  imageName: string;
  onBack: () => void;
  onStartAgain: () => void;
}

function ScreeningResult({
  imageName,
  onBack,
  onStartAgain,
}: ScreeningResultProps) {
  return (
    <div className="demo-page">
      <nav className="demo-navbar">
        <div className="logo">
          <span className="logo-icon">D</span>
          <span>dermivo</span>
        </div>

        <span className="demo-label">DEMO MODE</span>
      </nav>

      <main className="demo-main">
        <div className="demo-icon">✦</div>

        <span className="section-label">
          DEMONSTRATION SCREEN
        </span>

        <h1>Your screening interface is ready.</h1>

        <p className="demo-description">
          This is a preview of how Dermivo will display
          screening information after the AI backend
          has been integrated.
        </p>

        <section className="demo-result-card">
          <div className="demo-status">
            <span className="demo-status-dot"></span>
            AI MODEL NOT CONNECTED
          </div>

          <h2>Analysis unavailable</h2>

          <p>
            No skin cancer risk assessment has been
            performed. Your image has not been analysed
            by a trained AI model.
          </p>

          <div className="demo-detail">
            <span>Uploaded image</span>
            <strong>{imageName}</strong>
          </div>

          <div className="demo-detail">
            <span>Image quality assessment</span>
            <strong>Not performed</strong>
          </div>

          <div className="demo-detail">
            <span>AI screening result</span>
            <strong>Not available</strong>
          </div>

          <div className="demo-detail">
            <span>Explainable AI / Grad-CAM</span>
            <strong>Coming with model integration</strong>
          </div>
        </section>

        <div className="demo-notice">
          <strong>Important health information</strong>

          <p>
            Dermivo is a research screening prototype,
            not a medical diagnostic tool. This demo
            cannot confirm or rule out skin cancer.
            Consult a qualified healthcare professional
            about any concerning skin changes.
          </p>
        </div>

        <div className="demo-actions">
          <button
            className="questionnaire-secondary-button"
            onClick={onBack}
          >
            ← Back to review
          </button>

          <button
            className="questionnaire-submit-button"
            onClick={onStartAgain}
          >
            Start again
          </button>
        </div>
      </main>
    </div>
  );
}

export default ScreeningResult;