import React, { useState } from 'react';
import Student from './Student';

function StudentList({ students, selectedStudentId, onSelectStudent, classAverage }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card student-list-card">
      <div className="card-header">
        <h3>📋 Student Roster</h3>
        <span className="badge-class-avg">Class Avg: {classAverage}%</span>
      </div>

      <div className="search-box">
        <input 
          type="text"
          placeholder="🔍 Search student by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="students-list-container">
        {filteredStudents.length === 0 ? (
          <p className="no-students">No students found matching "{searchTerm}"</p>
        ) : (
          filteredStudents.map(student => (
            <Student
              key={student.id}
              id={student.id}
              name={student.name}
              department={student.department}
              isSelected={student.id === selectedStudentId}
              onSelect={onSelectStudent}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default StudentList;
