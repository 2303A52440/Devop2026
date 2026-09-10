import React, { useState, useEffect } from 'react';

function MarksForm({ student, subjects, onUpdateMarks }) {
  const [formMarks, setFormMarks] = useState({});
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  // Synchronize local form state with active student's marks
  useEffect(() => {
    if (student && student.marks) {
      setFormMarks({ ...student.marks });
    } else {
      setFormMarks({});
    }
    setErrors({});
    setSuccessMsg('');
  }, [student]);

  const handleInputChange = (subjectCode, value) => {
    const numericValue = value === '' ? '' : Number(value);
    
    // Clear error for this subject when user types
    setErrors(prev => ({ ...prev, [subjectCode]: null }));
    setSuccessMsg('');

    // Bonus validation: Marks must be between 0 and 100
    if (value !== '' && (isNaN(numericValue) || numericValue < 0 || numericValue > 100)) {
      setErrors(prev => ({ 
        ...prev, 
        [subjectCode]: 'Marks must be between 0 and 100!' 
      }));
    }

    setFormMarks(prev => ({
      ...prev,
      [subjectCode]: numericValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all inputs before submitting
    let hasError = false;
    const newErrors = {};

    subjects.forEach(subject => {
      const val = formMarks[subject.code];
      if (val === '' || val === undefined || isNaN(val)) {
        newErrors[subject.code] = 'Mark is required';
        hasError = true;
      } else if (val < 0 || val > 100) {
        newErrors[subject.code] = 'Marks must be 0-100';
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    onUpdateMarks(student.id, formMarks);
    setSuccessMsg('✅ Marks successfully updated!');
  };

  if (!student) {
    return <div className="card">Select a student from the roster to enter marks.</div>;
  }

  return (
    <div className="card marks-form-card">
      <div className="card-header">
        <h3>✏️ Faculty Marks Entry Portal</h3>
        <span className="editing-student-tag">{student.name} ({student.id})</span>
      </div>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <form onSubmit={handleSubmit} className="marks-form">
        <div className="subjects-inputs-grid">
          {subjects.map(subject => (
            <div className="input-group" key={subject.code}>
              <label htmlFor={subject.code} className="input-label">
                <span className="subject-code-tag">{subject.code}</span>
                <span className="subject-title">{subject.name}</span>
              </label>

              <input 
                id={subject.code}
                type="number"
                min="0"
                max="100"
                placeholder="0 - 100"
                value={formMarks[subject.code] ?? ''}
                onChange={(e) => handleInputChange(subject.code, e.target.value)}
                className={`marks-input ${errors[subject.code] ? 'input-error' : ''}`}
              />

              {errors[subject.code] && (
                <span className="error-text">⚠️ {errors[subject.code]}</span>
              )}
            </div>
          ))}
        </div>

        <button type="submit" className="save-marks-btn">
          💾 Update & Recalculate Marks
        </button>
      </form>
    </div>
  );
}

export default MarksForm;
