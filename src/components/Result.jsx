import React from 'react';
import Grade from './Grade';

function Result({ student, subjects }) {
  if (!student || !student.marks) {
    return <div className="card">No results available.</div>;
  }

  const subjectList = subjects || [];
  const marksObj = student.marks || {};

  // Calculate Total Marks
  const markValues = subjectList.map(sub => Number(marksObj[sub.code]) || 0);
  const totalMarks = markValues.reduce((sum, val) => sum + val, 0);
  const maxPossibleMarks = subjectList.length * 100;
  
  // Calculate Average Marks
  const averageMarks = subjectList.length > 0 
    ? (totalMarks / subjectList.length).toFixed(2) 
    : 0;

  // Determine Pass/Fail Status (Pass if all subjects >= 40)
  const failedSubjects = subjectList.filter(sub => (Number(marksObj[sub.code]) || 0) < 40);
  const isPassed = failedSubjects.length === 0 && averageMarks >= 40;

  return (
    <div className="card result-card">
      <div className="card-header">
        <h3>📊 Academic Performance & Result Summary</h3>
        <span className={`status-pill ${isPassed ? 'status-pass' : 'status-fail'}`}>
          {isPassed ? '✅ PASSED' : '❌ FAILED'}
        </span>
      </div>

      <div className="result-summary-grid">
        <div className="metric-box">
          <span className="metric-label">Total Marks</span>
          <span className="metric-value">{totalMarks} / {maxPossibleMarks}</span>
        </div>

        <div className="metric-box">
          <span className="metric-label">Average Score</span>
          <span className="metric-value">{averageMarks}%</span>
        </div>

        <div className="metric-box grade-box">
          <Grade averageMarks={Number(averageMarks)} isPassed={isPassed} />
        </div>
      </div>

      <div className="subject-breakdown">
        <h4>Subject Wise Breakdown</h4>
        <table className="breakdown-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Subject</th>
              <th>Marks (Out of 100)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {subjectList.map(sub => {
              const mark = Number(marksObj[sub.code]) || 0;
              const subPassed = mark >= 40;
              return (
                <tr key={sub.code}>
                  <td className="code-cell">{sub.code}</td>
                  <td>{sub.name}</td>
                  <td className="mark-cell"><strong>{mark}</strong></td>
                  <td>
                    <span className={`mini-status ${subPassed ? 'text-pass' : 'text-fail'}`}>
                      {subPassed ? 'Pass' : 'Fail (< 40)'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Result;
