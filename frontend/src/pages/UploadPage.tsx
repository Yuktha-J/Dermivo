import { useEffect, useRef, useState } from "react";
import "./UploadPage.css";

import SymptomQuestionnaire, {
  type SymptomData,
} from "./SymptomQuestionnaire";

import ScreeningResult from "./ScreeningResult";

// Defines all five stages of the screening process.
type PageStage =
  | "upload"
  | "questionnaire"
  | "review"
  | "loading"
  | "results";

// Initial values for all questionnaire answers.
const initialSymptomData: SymptomData = {
  age: "",
  location: "",
  duration: "",
  sizeChange: "",
  shapeChange: "",
  colourChange: "",
  itching: "",
  pain: "",
  bleeding: "",
  additionalInfo: "",
};

interface UploadPageProps {
  onBack: () => void;
}

function UploadPage({ onBack }: UploadPageProps) {
  // Stores the actual image file.
  const [image, setImage] = useState<File | null>(null);

  // Stores the temporary image preview URL.
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Stores upload error messages.
  const [error, setError] = useState("");

  // Tracks the current screening stage.
  const [stage, setStage] = useState<PageStage>("upload");

  // Stores questionnaire answers.
  const [symptoms, setSymptoms] =
    useState<SymptomData>(initialSymptomData);

  // Reference to the hidden file input.
  const inputRef = useRef<HTMLInputElement>(null);

  // Simulates a short loading period for the frontend demo.
  useEffect(() => {
    if (stage !== "loading") {
      return;
    }

    const loadingTimer = window.setTimeout(() => {
      setStage("results");
    }, 2500);

    // Clears the timer if the component changes or unmounts.
    return () => window.clearTimeout(loadingTimer);
  }, [stage]);

  // FUNCTION 1: Handles image selection.
  const handleFile = (file?: File) => {
    if (!file) return;

    setError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    // Checks the image format.
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    // Checks the image size.
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10 MB.");
      return;
    }

    // Creates a temporary preview URL.
    const imageUrl = URL.createObjectURL(file);

    // Releases the previous preview URL.
    setImagePreview((previousPreview) => {
      if (previousPreview) {
        URL.revokeObjectURL(previousPreview);
      }

      return imageUrl;
    });

    // Stores the actual image file.
    setImage(file);
  };

  // FUNCTION 2: Removes the selected image.
  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImage(null);
    setImagePreview(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // FUNCTION 3: Starts a fresh screening session.
  const startAgain = () => {
    removeImage();
    setSymptoms(initialSymptomData);
    setStage("upload");
  };

  // STAGE 2: Display the questionnaire.
  if (stage === "questionnaire" && image) {
    return (
      <SymptomQuestionnaire
        imageName={image.name}
        data={symptoms}
        onChange={setSymptoms}
        onBack={() => setStage("upload")}
        onSubmit={() => setStage("review")}
      />
    );
  }

  // STAGE 3: Display the review page.
  if (stage === "review" && image && imagePreview) {
    const reviewItems: [string, string][] = [
      ["Age", symptoms.age ? `${symptoms.age} years` : ""],
      ["Body location", symptoms.location],
      ["Duration", symptoms.duration],
      ["Change in size", symptoms.sizeChange],
      ["Change in shape", symptoms.shapeChange],
      ["Change in colour", symptoms.colourChange],
      ["Itching", symptoms.itching],
      ["Pain or tenderness", symptoms.pain],
      ["Bleeding", symptoms.bleeding],
      ["Additional information", symptoms.additionalInfo],
    ].filter((item) => item[1]);

    return (
      <div className="symptom-page">
        <nav className="symptom-navbar">
          <a
            href="#"
            className="logo"
            onClick={(event) => event.preventDefault()}
          >
            <span className="logo-icon">D</span>
            <span>dermivo</span>
          </a>

          <button
            className="symptom-back-button"
            onClick={() => setStage("questionnaire")}
          >
            ← Edit answers
          </button>
        </nav>

        <main className="symptom-main">
          <div className="symptom-heading">
            <span className="section-label">FINAL STEP</span>

            <h1>Review your information.</h1>

            <p>
              Check the image and information you have provided.
              You can go back and make changes at any time.
            </p>
          </div>

          <div className="progress-section">
            <div className="progress-labels">
              <span>Step 3 of 3</span>
              <span>Review information</span>
            </div>

            <div className="progress-track">
              <div className="progress-fill review-progress-fill"></div>
            </div>
          </div>

          <section className="review-card">
            <h2>Uploaded image</h2>

            <img
              src={imagePreview}
              alt="Uploaded skin image"
              className="review-image"
            />

            <p className="review-file-name">{image.name}</p>
          </section>

          <section className="review-card">
            <h2>Symptom information</h2>

            {reviewItems.length > 0 ? (
              <div className="review-list">
                {reviewItems.map(([label, value]) => (
                  <div className="review-row" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <p className="review-empty">
                No optional symptom information was provided.
              </p>
            )}
          </section>

          <div className="questionnaire-note">
            <strong>Before you continue</strong>

            <p>
              This information is currently kept in this browser page.
              It has not been sent to an AI model or medical professional.
              The screening model and backend have not yet been connected.
            </p>
          </div>

          <div className="questionnaire-actions">
            <button
              className="questionnaire-secondary-button"
              onClick={() => setStage("questionnaire")}
            >
              ← Edit answers
            </button>

            <button
              className="questionnaire-submit-button"
              onClick={() => setStage("loading")}
            >
              Start demo screening →
            </button>
          </div>
        </main>
      </div>
    );
  }

  // STAGE 4: Display the simulated loading screen.
  if (stage === "loading" && image) {
    return (
      <div className="demo-page">
        <nav className="demo-navbar">
          <div className="logo">
            <span className="logo-icon">D</span>
            <span>dermivo</span>
          </div>
        </nav>

        <main className="demo-main">
          <div className="demo-icon loading-spinner">✦</div>

          <span className="section-label">
            DEMONSTRATION MODE
          </span>

          <h1>Preparing your screening preview...</h1>

          <p className="demo-description">
            Please wait while we prepare the demonstration screen.
            No AI image analysis is being performed.
          </p>

          <div className="demo-loading-track">
            <div className="demo-loading-fill"></div>
          </div>

          <p className="demo-loading-caption">
            Preparing demo results
          </p>
        </main>
      </div>
    );
  }

  // STAGE 5: Display the demonstration results page.
  if (stage === "results" && image) {
    return (
      <ScreeningResult
        imageName={image.name}
        onBack={() => setStage("review")}
        onStartAgain={startAgain}
      />
    );
  }

  // STAGE 1: Display the image upload page.
  return (
    <div className="upload-page">
      <nav className="upload-navbar">
        <a
          href="#"
          className="logo"
          onClick={(event) => {
            event.preventDefault();
            onBack();
          }}
        >
          <span className="logo-icon">D</span>
          <span>dermivo</span>
        </a>

        <button className="back-button" onClick={onBack}>
          ← Back to home
        </button>
      </nav>

      <main className="upload-main">
        <div className="upload-heading">
          <span className="section-label">
            YOUR SKIN HEALTH JOURNEY
          </span>

          <h1>Let's start with an image.</h1>

          <p>
            Upload a clear photograph of the skin area you
            would like to explore through our AI-assisted
            screening prototype.
          </p>
        </div>

        <div
          className={`upload-box ${imagePreview ? "has-image" : ""}`}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            handleFile(event.dataTransfer.files[0]);
          }}
        >
          {imagePreview ? (
            <div className="preview-container">
              <img
                src={imagePreview}
                alt="Selected skin image preview"
                className="image-preview"
              />

              <div className="file-details">
                <span>✓ Image selected</span>
                <p>{image.name}</p>
              </div>

              <button
                className="remove-button"
                onClick={removeImage}
              >
                Remove image
              </button>
            </div>
          ) : (
            <>
              <div className="upload-icon">↑</div>

              <h2>Drag and drop your image here</h2>

              <p>or choose an image from your device</p>

              <button
                className="browse-button"
                onClick={() => inputRef.current?.click()}
              >
                Browse files
              </button>

              <p className="file-requirements">
                Supported formats: JPG, PNG, WEBP
                <br />
                Maximum file size: 10 MB
              </p>
            </>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            hidden
            onChange={(event) =>
              handleFile(event.target.files?.[0])
            }
          />
        </div>

        {error && (
          <p className="upload-error">{error}</p>
        )}

        <div className="upload-guidelines">
          <h3>For a clearer image</h3>

          <ul>
            <li>Use good, natural lighting.</li>
            <li>Keep the camera focused on the skin area.</li>
            <li>Avoid blurry or heavily edited photographs.</li>
            <li>Include the entire area of interest.</li>
          </ul>
        </div>

        <button
          className="continue-button"
          disabled={!image}
          onClick={() => setStage("questionnaire")}
        >
          Continue to symptoms →
        </button>

        <p className="privacy-note">
          This is a research screening prototype, not a
          medical diagnosis. Please avoid uploading identifiable
          or sensitive personal images during development.
        </p>
      </main>
    </div>
  );
}

export default UploadPage;