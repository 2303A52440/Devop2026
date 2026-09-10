import React from 'react';

function Grade({ averageMarks, isPassed }) {
  // Conditional rendering for grade determination
  let gradeLetter = 'F';
  let gradeClass = 'grade-f';
  let remark = 'Fail';

  if (!isPassed) {
    gradeLetter = 'F';
    gradeClass = 'grade-f';
    remark = 'Failed (Subject backlog)';
  } else if (averageMarks >= 90) {
    gradeLetter = 'A+';
    gradeClass = 'grade-aplus';
    remark = 'Outstanding Performance';
  } else if (averageMarks >= 80) {
    gradeLetter = 'A';
    gradeClass = 'grade-a';
    remark = 'Excellent';
  } else if (averageMarks >= 70) {
    gradeLetter = 'B';
    gradeClass = 'grade-b';
    remark = 'Very Good';
  } else if (averageMarks >= 60) {
    gradeLetter = 'C';
    gradeClass = 'grade-c';
    remark = 'Good';
  } else if (averageMarks >= 40) {
    gradeLetter = 'D';
    gradeClass = 'grade-d';
    remark = 'Satisfactory Pass';
  }

  return (
    <div className={`grade-badge-container ${gradeClass}`}>
      <div className="grade-circle">{gradeLetter}</div>
      <div className="grade-details">
        <span className="grade-title">Overall Grade</span>
        <span className="grade-remark">{remark}</span>
      </div>
    </div>
  );
}

export default Grade;
