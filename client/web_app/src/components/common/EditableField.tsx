import React, { useState } from 'react';
import LoadingSpinner, { LoadingSpinnerInline } from './Loading.tsx';

type EditableFieldProps<T> = {
  label?: string;
  value: T;
  type?: 'text' | 'number' | 'time' | 'checkbox' | 'select';
  options?: T[]; // Required for select
  renderValue: (value: T) => React.ReactNode;
  saveAsync: (newValue: T) => Promise<void>;
};

export function EditableField<T>({
                                   label,
                                   value,
                                   type = 'text',
                                   options,
                                   renderValue,
                                   saveAsync,
                                 }: EditableFieldProps<T>) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState<T>(value);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveAsync(currentValue);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let val: any = e.target.value;

    if (type === 'number') {
      val = val === '' ? '' : Number(val);
    } else if (type === 'checkbox') {
      val = (e.target as HTMLInputElement).checked;
    }

    setCurrentValue(val as T);
  };

  const renderInput = () => {
    if (type === 'checkbox') {
      return (
        <input
          type="checkbox"
          className="form-check-input"
          checked={Boolean(currentValue)}
          onChange={handleChange}
          disabled={isSaving}
        />
      );
    }

    if (type === 'select') {
      if (!options) {
        console.error('EditableField: options must be provided when type is "select"');
        return null;
      }

      return (
        <select
          className="form-select"
          value={String(currentValue)}
          onChange={handleChange}
          disabled={isSaving}
        >
          {options.map((opt, idx) => (
            <option key={idx} value={String(opt)}>
              {String(opt)}
            </option>
          ))}
        </select>
      );
    }

    // Default: text, number, time
    return (
      <input
        className="form-control"
        type={type}
        value={currentValue === null || currentValue === undefined ? '' : String(currentValue)}
        onChange={handleChange}
        disabled={isSaving}
      />
    );
  };

  return (
    <div className="">
      {label && <label className="form-label">{label}</label>}
      <div className="d-flex align-items-center gap-2">
        {isEditing ? (
          <>
            {renderInput()}
            <button className="btn btn-success" onClick={handleSave} disabled={isSaving}>
              {isSaving ? <LoadingSpinnerInline /> : 'Sačuvaj'}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setCurrentValue(value);
                setIsEditing(false);
              }}
              disabled={isSaving}
            >
              Otkaži
            </button>
          </>
        ) : (
          <>
            <span>{renderValue(value)}</span>
            <button className="btn btn-outline-primary" onClick={() => setIsEditing(true)}>
              Izmeni
            </button>
          </>
        )}
      </div>
    </div>
  );
}
