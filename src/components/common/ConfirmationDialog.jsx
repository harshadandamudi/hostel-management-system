import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './ConfirmationDialog.css';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-dialog-overlay">
      <div className="confirmation-dialog">
        <button className="confirmation-dialog-close" onClick={onClose}>
          <FaTimes />
        </button>
        <h3 className="confirmation-dialog-title">{title}</h3>
        <p className="confirmation-dialog-message">{message}</p>
        <div className="confirmation-dialog-actions">
          <button className="confirmation-dialog-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="confirmation-dialog-confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog; 