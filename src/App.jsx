import React, { useState } from 'react';
import StudentList from './components/StudentList';
import MarksForm from './components/MarksForm';
import Result from './components/Result';
import './App.css';

// Initial subjects list
const subjectsList = [
  { code: '23CS102PE405', name: 'DevOps & Fullstack' },
  { code: '23CS102PE401', name: 'Advanced Algorithms' },
  { code: '23CS102PE402', name: 'Cloud Computing' },
  { code: '23CS102PE403', name: 'AI & Neural Networks' }
];

// Initial students state data
const initialStudents = [
  {
    id: 'STU101',
    name: 'Sravan Kumar',
    department: 'Computer Science & AI',
    marks: {
      '23CS102PE405': 85,
      '23CS102PE401': 92,
      '23CS102PE402': 78,
      '23CS102PE403': 88
    }
  },
  {
    id: 'STU102',
    name: 'Priya Sharma',
    department: 'Artificial Intelligence',
    marks: {
      '23CS102PE405': 95,
      '23CS102PE401': 89,
      '23CS102PE402': 94,
      '23CS102PE403': 91
    }
  },
  {
    id: 'STU103',
    name: 'Vikram Reddy',
    department: 'Fullstack Engineering',
    marks: {
      '23CS102PE405': 38, // Backlog mark
      '23CS102PE401': 65,
      '23CS102PE402': 55,
      '23CS102PE403': 70
    }
  },
  {
    id: 'STU104',
    name: 'Divya Teja',
    department: 'Computer Science & Engineering',
    marks: {
      '23CS102PE405': 72,
      '23CS102PE401': 80,
      '23CS102PE402': 68,
      '23CS102PE403': 75
    }
  }
];

function App() {
  // State Management using useState()
  const [students, setStudents] = useState(initialStudents);
  const [selectedStudentId, setSelectedStudentId] = useState('STU101');

  // Find currently selected student
  const activeStudent = students.find(s => s.id === selectedStudentId) || students[0];

  // Faculty update marks handler using useState()
  const handleUpdateMarks = (studentId, updatedMarks) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? { ...student, marks: { ...updatedMarks } }
          : student
      )
    );
  };

  // Bonus Challenge: Calculate Overall Class Average Marks
  const computeClassAverage = () => {
    if (students.length === 0) return 0;
    
    let totalAllStudentsScore = 0;
    let totalSubjectCount = 0;

    students.forEach(student => {
      subjectsList.forEach(sub => {
        const mark = Number(student.marks?.[sub.code]) || 0;
        totalAllStudentsScore += mark;
        totalSubjectCount += 1;
      });
    });

    return totalSubjectCount > 0 
      ? (totalAllStudentsScore / (students.length * subjectsList.length)).toFixed(1)
      : 0;
  };

  return (
    <div className="app-root">
      {/* Application Header */}
      <header className="app-header">
        <div className="header-container">
          <div>
            <span className="college-title">School of Computer Science Engineering and Artificial Intelligence</span>
            <h1 className="app-title">🎓 Student Marks & Grade Management System</h1>
          </div>
          <div className="course-info">
            <span className="course-code">23CS102PE405</span>
            <span className="course-name">DEVOPS AND FULLSTACK</span>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="main-container">
        <div className="dashboard-layout">
          {/* Left Column: Student List Component */}
          <aside className="sidebar-section">
            <StudentList 
              students={students}
              selectedStudentId={selectedStudentId}
              onSelectStudent={(id) => setSelectedStudentId(id)}
              classAverage={computeClassAverage()}
            />
          </aside>

          {/* Right Column: Faculty Marks Entry & Results */}
          <section className="main-section">
            {/* Marks Form Component */}
            <MarksForm 
              student={activeStudent}
              subjects={subjectsList}
              onUpdateMarks={handleUpdateMarks}
            />

            {/* Result & Grade Component */}
            <Result 
              student={activeStudent}
              subjects={subjectsList}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 School of Computer Science Engineering and Artificial Intelligence | Lab Experiment Week-6.2</p>
      </footer>
    </div>
  );
}

export default App;
