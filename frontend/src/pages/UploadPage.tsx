import { useRef, useState } from "react";
import "./UploadPage.css";

interface UploadPageProps {
  onBack: () => void;
}

function UploadPage({ onBack }: UploadPageProps) {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File) => {
    if (!file) return;

    setError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10 MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setImage((previousImage) => {
      if (previousImage) URL.revokeObjectURL(previousImage);
      return imageUrl;
    });

    setFileName(file.name);
  };

  const removeImage = () => {
    if (image) URL.revokeObjectURL(image);

    setImage(null);
    setFileName("");
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="upload-page">

      <nav className="upload-navbar">
        <a href="#" className="logo" onClick={(e) => {
          e.preventDefault();
          onBack();
        }}>
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
          className={`upload-box ${image ? "has-image" : ""}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files[0]);
          }}
        >

          {image ? (
            <div className="preview-container">
              <img
                src={image}
                alt="Selected skin image preview"
                className="image-preview"
              />

              <div className="file-details">
                <span>✓ Image selected</span>
                <p>{fileName}</p>
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
            onChange={(e) => handleFile(e.target.files?.[0])}
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