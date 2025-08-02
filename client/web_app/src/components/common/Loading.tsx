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

export default LoadingSpinner;
