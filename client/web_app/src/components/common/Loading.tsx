import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "20px" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

const LoadingSpinnerInline: React.FC = () => {
  return (
    <div style={{ display: "inline-block", marginLeft: "8px" }}>
      <div className="spinner-border spinner-border-sm text-primary" role="status" />
    </div>
  );
};

export { LoadingSpinnerInline };
export default LoadingSpinner;
