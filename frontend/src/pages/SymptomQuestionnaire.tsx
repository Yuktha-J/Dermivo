import "./SymptomQuestionnaire.css";

export interface SymptomData {
  age: string;
  location: string;
  duration: string;
  sizeChange: string;
  shapeChange: string;
  colourChange: string;
  itching: string;
  pain: string;
  bleeding: string;
  additionalInfo: string;
}

interface SymptomQuestionnaireProps {
  imageName: string;
  data: SymptomData;
  onChange: (data: SymptomData) => void;
  onBack: () => void;
  onSubmit: () => void;
}

function SymptomQuestionnaire({
  imageName,
  data,
  onChange,
  onBack,
  onSubmit,
}: SymptomQuestionnaireProps) {
  const updateField = (field: keyof SymptomData, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="symptom-page">
      <nav className="symptom-navbar">
        <a href="#" className="logo" onClick={(event) => event.preventDefault()}>
          <span className="logo-icon">D</span>
          <span>dermivo</span>
        </a>

        <button className="symptom-back-button" onClick={onBack}>
          ← Back to image
        </button>
      </nav>

      <main className="symptom-main">
        <div className="symptom-heading">
          <span className="section-label">YOUR SKIN HEALTH JOURNEY</span>
          <h1>Tell us a little more.</h1>
          <p>
            A few questions about the skin area can provide additional
            context for our research screening process.
          </p>
        </div>

        <div className="progress-section">
          <div className="progress-labels">
            <span>Step 2 of 3</span>
            <span>Symptom information</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill"></div>
          </div>
        </div>

        <div className="selected-image-note">
          <span className="selected-image-icon">✓</span>
          <div>
            <strong>Image attached</strong>
            <p>{imageName}</p>
          </div>
        </div>

        <form className="symptom-form" onSubmit={handleSubmit}>
          <section className="question-section">
            <div className="question-section-heading">
              <span>01</span>
              <div>
                <h2>Basic information</h2>
                <p>Some general details about the person.</p>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                min="1"
                max="120"
                placeholder="Enter age in years"
                value={data.age}
                onChange={(event) => updateField("age", event.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="location">Where is the skin area located?</label>
              <select
                id="location"
                value={data.location}
                onChange={(event) => updateField("location", event.target.value)}
              >
                <option value="">Select body location</option>
                <option value="Face">Face</option>
                <option value="Scalp">Scalp</option>
                <option value="Neck">Neck</option>
                <option value="Chest">Chest</option>
                <option value="Back">Back</option>
                <option value="Arms">Arms</option>
                <option value="Hands">Hands</option>
                <option value="Legs">Legs</option>
                <option value="Feet">Feet</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="duration">How long have you noticed it?</label>
              <select
                id="duration"
                value={data.duration}
                onChange={(event) => updateField("duration", event.target.value)}
              >
                <option value="">Select duration</option>
                <option value="Less than a month">Less than a month</option>
                <option value="1–6 months">1–6 months</option>
                <option value="6–12 months">6–12 months</option>
                <option value="1–5 years">1–5 years</option>
                <option value="More than 5 years">More than 5 years</option>
                <option value="Not sure">Not sure</option>
              </select>
            </div>
          </section>

          <section className="question-section">
            <div className="question-section-heading">
              <span>02</span>
              <div>
                <h2>Changes in appearance</h2>
                <p>Have you noticed any changes over time?</p>
              </div>
            </div>

            <div className="form-field">
              <label>Has it changed in size?</label>
              <div className="choice-group">
                {["Yes", "No", "Not sure"].map((option) => (
                  <label className="choice-option" key={option}>
                    <input
                      type="radio"
                      name="sizeChange"
                      value={option}
                      checked={data.sizeChange === option}
                      onChange={(event) =>
                        updateField("sizeChange", event.target.value)
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label>Has it changed in shape?</label>
              <div className="choice-group">
                {["Yes", "No", "Not sure"].map((option) => (
                  <label className="choice-option" key={option}>
                    <input
                      type="radio"
                      name="shapeChange"
                      value={option}
                      checked={data.shapeChange === option}
                      onChange={(event) =>
                        updateField("shapeChange", event.target.value)
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label>Has it changed in colour?</label>
              <div className="choice-group">
                {["Yes", "No", "Not sure"].map((option) => (
                  <label className="choice-option" key={option}>
                    <input
                      type="radio"
                      name="colourChange"
                      value={option}
                      checked={data.colourChange === option}
                      onChange={(event) =>
                        updateField("colourChange", event.target.value)
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <section className="question-section">
            <div className="question-section-heading">
              <span>03</span>
              <div>
                <h2>Associated symptoms</h2>
                <p>Tell us if you have experienced any of these.</p>
              </div>
            </div>

            <div className="form-field">
              <label>Is the area itchy?</label>
              <div className="choice-group">
                {["Yes", "No", "Sometimes"].map((option) => (
                  <label className="choice-option" key={option}>
                    <input
                      type="radio"
                      name="itching"
                      value={option}
                      checked={data.itching === option}
                      onChange={(event) =>
                        updateField("itching", event.target.value)
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label>Is there any pain or tenderness?</label>
              <div className="choice-group">
                {["Yes", "No", "Sometimes"].map((option) => (
                  <label className="choice-option" key={option}>
                    <input
                      type="radio"
                      name="pain"
                      value={option}
                      checked={data.pain === option}
                      onChange={(event) =>
                        updateField("pain", event.target.value)
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label>Has the area bled?</label>
              <div className="choice-group">
                {["Yes", "No", "Not sure"].map((option) => (
                  <label className="choice-option" key={option}>
                    <input
                      type="radio"
                      name="bleeding"
                      value={option}
                      checked={data.bleeding === option}
                      onChange={(event) =>
                        updateField("bleeding", event.target.value)
                      }
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <section className="question-section">
            <div className="question-section-heading">
              <span>04</span>
              <div>
                <h2>Anything else?</h2>
                <p>Share any additional information you think is relevant.</p>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="additionalInfo">Additional information</label>
              <textarea
                id="additionalInfo"
                rows={4}
                placeholder="Enter any other observations (optional)"
                value={data.additionalInfo}
                onChange={(event) =>
                  updateField("additionalInfo", event.target.value)
                }
              />
            </div>
          </section>

          <div className="questionnaire-note">
            <strong>Important information</strong>
            <p>
              These questions are collected for research screening context.
              They cannot confirm or rule out skin cancer. If you notice a
              changing, bleeding, painful or concerning skin area, seek
              assessment from a qualified healthcare professional.
            </p>
            <p>All questions are optional. You can continue without answering them.</p>
          </div>

          <div className="questionnaire-actions">
            <button
              type="button"
              className="questionnaire-secondary-button"
              onClick={onBack}
            >
              ← Back to image
            </button>

            <button type="submit" className="questionnaire-submit-button">
              Continue to review →
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default SymptomQuestionnaire;