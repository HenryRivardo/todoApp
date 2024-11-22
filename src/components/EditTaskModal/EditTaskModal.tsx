// src/components/EditTaskModal.tsx
import React, { useState, useEffect } from 'react';
import styles from './EditTaskModal.module.scss';

interface EditTaskModalProps {
  isOpen: boolean;
  taskTitle: string;
  onClose: () => void;
  onSave: (updatedTitle: string) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  taskTitle,
  onClose,
  onSave,
}) => {
  const [updatedTitle, setUpdatedTitle] = useState(taskTitle);

  useEffect(() => {
    if (isOpen) {
      setUpdatedTitle(taskTitle); // Set ulang title saat modal dibuka
    }
  }, [isOpen, taskTitle]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (updatedTitle.trim()) {
      onSave(updatedTitle); // Kirim data baru ke fungsi `onSave`
      onClose();
    }
  };

  return (
    <div className={styles['modal-backdrop']} onClick={onClose}>
      <div
        className={styles['modal']}
        onClick={(e) => e.stopPropagation()} // Mencegah penutupan modal saat modal diklik
      >
        <div className={styles['modal__header']}>
          <h2>Edit Task</h2>
          <button onClick={onClose} className={styles['modal__close-button']}>
            ✖
          </button>
        </div>
        <input
          type='text'
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          className={styles['modal__input']}
        />
        <button onClick={handleSave} className={styles['modal__save-button']}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTaskModal;
