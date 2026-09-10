import React from 'react';

function Student({ id, name, department, isSelected, onSelect }) {
  return (
    <div 
      className={`student-item ${isSelected ? 'selected-student' : ''}`}
      onClick={() => onSelect(id)}
    >
      <div className="student-avatar">
        {name ? name.charAt(0) : 'S'}
      </div>
      <div className="student-info">
        <h4 className="student-name">{name}</h4>
        <p className="student-meta">
          <span className="meta-id">ID: {id}</span> | <span className="meta-dept">{department}</span>
        </p>
      </div>
      {isSelected && <span className="active-indicator">Active</span>}
    </div>
  );
}

export default Student;
