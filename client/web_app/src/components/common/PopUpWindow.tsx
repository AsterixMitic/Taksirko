import React from 'react';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
};

const PopUpWindow = ({ onClose, children, title }: Props) => {
  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      role="dialog"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PopUpWindow;
