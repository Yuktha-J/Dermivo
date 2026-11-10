import { useState } from "react";
import UploadPage from "./pages/UploadPage";
import "./App.css";

function App() {
  // Controls which page is displayed
  const [showUpload, setShowUpload] = useState(false);

  // Display the upload page when a button is clicked
  if (showUpload) {
    return (
      <UploadPage
        onBack={() => setShowUpload(false)}
      />
    );
  }

  return (
    <div className="website">

      {/* Navigation Bar */}
      <nav className="navbar">
        <a href="#" className="logo">
          <span className="logo-icon">D</span>
          <span>dermivo</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>

        <button
          className="nav-button"
          onClick={() => setShowUpload(true)}
        >
          Get started <span>→</span>
        </button>
      </nav>

      {/* Hero Section */}
      <main>
        <section className="hero" id="home">

          <div className="hero-content">

            <div className="eyebrow">
              <span className="status-dot"></span>
              AI-POWERED SKIN SCREENING
            </div>

            <h1>
              A closer look at
              <br />
              your skin's <span>health.</span>
            </h1>

            <p className="hero-description">
              Making skin health awareness more accessible through
              artificial intelligence. Upload a skin image and explore
              an AI-assisted screening experience.
            </p>

            <div className="hero-actions">

              <button
                className="primary-button"
                onClick={() => setShowUpload(true)}
              >
                Start screening <span>→</span>
              </button>

              <a
                href="#how-it-works"
                className="secondary-button"
              >
                Discover how it works
              </a>

            </div>

            <div className="hero-note">
              <span>✓</span>
              Research-based screening support, not a medical diagnosis.
            </div>

          </div>

          {/* Hero Visual */}
          <div className="hero-visual">

            <div className="visual-circle circle-one"></div>
            <div className="visual-circle circle-two"></div>

            <div className="analysis-card">

              <div className="card-top">
                <span className="card-label">
                  SKIN HEALTH ANALYSIS
                </span>

                <span className="card-indicator">
                  ● DEMO
                </span>
              </div>

              <div className="skin-illustration">
                <div className="skin-surface">
                  <div className="lesion"></div>
                  <div className="scan-ring"></div>
                  <div className="scan-line"></div>
                </div>
              </div>

              <div className="visual-caption">

                <div>
                  <span className="caption-title">
                    Image analysis
                  </span>

                  <span className="caption-subtitle">
                    AI-assisted screening concept
                  </span>
                </div>

                <span className="scan-icon">✳</span>

              </div>

            </div>

            <div className="floating-tag tag-top">
              <span>✦</span> Intelligent screening
            </div>

            <div className="floating-tag tag-bottom">
              <span>◎</span> Explainable AI
            </div>

          </div>

        </section>

        {/* Information Strip */}
        <section className="info-strip">

          <div>
            <span className="info-number">01</span>
            <span>Image-based analysis</span>
          </div>

          <div>
            <span className="info-number">02</span>
            <span>Multimodal assessment</span>
          </div>

          <div>
            <span className="info-number">03</span>
            <span>Explainable insights</span>
          </div>

        </section>

        {/* How It Works */}
        <section className="how-section" id="how-it-works">

          <div className="section-heading">

            <span className="section-label">
              SIMPLE. INFORMATIVE. ACCESSIBLE.
            </span>

            <h2>How Dermivo works</h2>

            <p>
              A guided screening workflow designed to help users
              understand their skin health.
            </p>

          </div>

          <div className="steps-grid">

            <div className="step-card">

              <span className="step-number">01</span>
              <div className="step-icon">↑</div>

              <h3>Upload an image</h3>

              <p>
                Provide a clear photograph of the skin lesion for
                image-based analysis.
              </p>

            </div>

            <div className="step-card">

              <span className="step-number">02</span>
              <div className="step-icon">＋</div>

              <h3>Add information</h3>

              <p>
                Answer optional questions about symptoms and
                changes over time.
              </p>

            </div>

            <div className="step-card">

              <span className="step-number">03</span>
              <div className="step-icon">✳</div>

              <h3>Explore insights</h3>

              <p>
                View AI-assisted screening information and
                visual explanations.
              </p>

            </div>

          </div>

        </section>

        {/* Features */}
        <section className="features-section" id="features">

          <div className="section-heading">

            <span className="section-label">
              BUILT WITH PURPOSE
            </span>

            <h2>More than image analysis</h2>

            <p>
              Exploring multiple dimensions of skin lesion screening
              through artificial intelligence.
            </p>

          </div>

          <div className="features-grid">

            <div className="feature-card">

              <span className="feature-icon">◉</span>

              <h3>Multimodal approach</h3>

              <p>
                Combines skin images with optional clinical
                information for research-based analysis.
              </p>

            </div>

            <div className="feature-card">

              <span className="feature-icon">✳</span>

              <h3>Explainable AI</h3>

              <p>
                Visual explanations help illustrate which image
                regions influenced the model.
              </p>

            </div>

            <div className="feature-card">

              <span className="feature-icon">◇</span>

              <h3>Uncertainty awareness</h3>

              <p>
                Designed to handle uncertain predictions and
                images that do not meet quality requirements.
              </p>

            </div>

          </div>

        </section>

        {/* Call To Action */}
        <section className="cta-section" id="screening">

          <span className="section-label">
            YOUR SKIN HEALTH MATTERS
          </span>

          <h2>Start with awareness.</h2>

          <p>
            Explore our AI-assisted skin screening prototype.
            This research project is not a substitute for
            professional medical evaluation.
          </p>

          <button
            className="primary-button"
            onClick={() => setShowUpload(true)}
          >
            Start screening →
          </button>

        </section>

      </main>

      {/* Footer */}
      <footer className="footer" id="about">

        <a href="#" className="logo">
          <span className="logo-icon">D</span>
          <span>dermivo</span>
        </a>

        <p>
          AI-powered skin screening research prototype.
        </p>

        <span className="footer-copy">
          © 2026 Dermivo. All rights reserved.
        </span>

      </footer>

    </div>
  );
}

export default App;