import React, { useState } from 'react';
// 1. ADD THIS IMPORT
import { useNavigate } from 'react-router-dom'; 

const Dashboard = ({ name = "Lecturer" }) => {
  // 2. INITIALIZE NAVIGATE
  const navigate = useNavigate();

  // --- MOCK DATA ---
  const [classes, setClasses] = useState([
    { room: '101', lecturer: 'Dr. Smith', subject: 'Data Structures', status: 'Occupied', free_at: '10:00 AM' },
    { room: '102', lecturer: 'Prof. Johnson', subject: 'Algorithms', status: 'Occupied', free_at: '11:30 AM' },
    { room: '103', lecturer: 'Ms. Davis', subject: 'Web Dev', status: 'Occupied', free_at: '09:45 AM' },
    { room: '104', lecturer: 'Mr. Wilson', subject: 'Database', status: 'Free', free_at: 'Now' },
  ]);

  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [extendModal, setExtendModal] = useState({ open: false, room: null });
  const [extendInput, setExtendInput] = useState('');

  // --- HANDLERS ---
  
  // Handle Search Logic
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Modal Handlers
  const openExtendModal = (room) => {
    setExtendModal({ open: true, room });
    setExtendInput('');
  };

  const closeExtendModal = () => {
    setExtendModal({ open: false, room: null });
    setExtendInput('');
  };

  const handleStopClass = (room) => {
    const confirmStop = window.confirm(`Are you sure you want to stop the class in Room ${room}?`);
    if (confirmStop) {
      setClasses(prev => prev.map(c => 
        c.room === room ? { ...c, status: 'Free', free_at: 'Now', lecturer: '-', subject: '-' } : c
      ));
    }
  };

  const handleExtendSubmit = (e) => {
    e.preventDefault();
    const input = extendInput.toLowerCase().trim();
    
    if (!input) return;

    let minutes = 0;
    const numberMatch = input.match(/[\d.]+/);

    if (!numberMatch) {
      alert("Invalid time input");
      return;
    }

    const value = parseFloat(numberMatch[0]);

    if (input.includes("h")) {
      minutes = Math.round(value * 60);
    } else {
      minutes = Math.round(value);
    }

    if (isNaN(minutes) || minutes <= 0) {
      alert("Invalid time value");
      return;
    }

    console.log(`Extending room ${extendModal.room} by ${minutes} minutes.`);
    alert(`Room ${extendModal.room} extended by ${minutes} minutes.`);
    
    closeExtendModal();
  };

  // Filter classes based on search
  const filteredClasses = classes.filter(c => 
    c.room.toString().toLowerCase().includes(searchQuery)
  );

  // --- STYLES ---
  const styles = {
    body: {
      margin: 0,
      fontFamily: 'Arial, sans-serif',
      background: '#eef2ff',
    },
    topbar: {
      background: '#1e3a8a',
      padding: '16px 30px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logout: {
      background: '#22c55e',
      padding: '8px 16px',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    layout: {
      display: 'flex',
    },
    sidebar: {
      width: '220px',
      background: '#1e40af',
      minHeight: 'calc(100vh - 64px)',
      padding: '20px',
      color: 'white',
    },
    sidebarLink: {
      display: 'block',
      color: 'white',
      textDecoration: 'none',
      padding: '10px',
      marginBottom: '8px',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
    sidebarLinkActive: {
      background: '#2563eb',
    },
    content: {
      flex: 1,
      padding: '30px',
    },
    card: {
      background: 'white',
      padding: '20px',
      borderRadius: '12px',
    },
    h2: {
      marginTop: 0,
      color: '#1e3a8a',
    },
    searchInput: {
      padding: '8px',
      width: '250px',
      marginTop: '10px',
      borderRadius: '6px',
      border: '1px solid #cbd5e1',
      boxSizing: 'border-box',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '15px',
    },
    th: {
      padding: '12px',
      borderBottom: '1px solid #e5e7eb',
      textAlign: 'center',
      background: '#f1f5ff',
      color: '#334155',
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #e5e7eb',
      textAlign: 'center',
      color: '#475569',
    },
    status: {
      background: '#fee2e2',
      color: '#b91c1c',
      padding: '6px 14px',
      borderRadius: '20px',
      fontWeight: 'bold',
      fontSize: '12px',
    },
    statusFree: {
      background: '#dcfce7',
      color: '#15803d',
    },
    btn: {
      padding: '6px 14px',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '12px',
    },
    stop: {
      background: '#ef4444',
      color: 'white',
      textDecoration: 'none',
      display: 'inline-block',
    },
    extend: {
      background: '#2563eb',
      color: 'white',
    },
    modalOverlay: {
      display: extendModal.open ? 'flex' : 'none',
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContent: {
      background: 'white',
      padding: '20px',
      borderRadius: '12px',
      width: '420px',
      textAlign: 'center',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    },
    modalTitle: {
      color: '#2563eb',
      fontWeight: 600,
      fontSize: '16px',
      marginBottom: '12px',
      marginTop: 0,
    },
    modalInput: {
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #cbd5e1',
      marginBottom: '16px',
      fontSize: '14px',
      boxSizing: 'border-box',
    },
    modalActions: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
    },
    btnCancel: {
      background: '#ef4444',
      color: 'white',
    }
  };

  return (
    <div style={styles.body}>
      <style>{`
        .sidebar-link:hover { background: #3b82f6; }
      `}</style>

      <div style={styles.topbar}>
        <h3>Welcome, {name}</h3>
        {/* 3. UPDATE LOGOUT TO REDIRECT */}
        <div 
          onClick={() => {
            localStorage.removeItem('accessToken'); // Clear session
            navigate('/'); 
          }} 
          style={styles.logout}
        >
          Logout
        </div>
      </div>

      <div style={styles.layout}>
        
        {/* SIDEBAR WITH NAVIGATION */}
        <div style={styles.sidebar}>
          <div style={{...styles.sidebarLink, ...styles.sidebarLinkActive}}>Dashboard</div>
          
          {/* 4. ADD ONCLICK TO NAVIGATE */}
          <div style={styles.sidebarLink} onClick={() => navigate('/start_end_class')}>Start / End Class</div>
          <div style={styles.sidebarLink} onClick={() => navigate('/timetable')}>Timetable</div>
          <div style={styles.sidebarLink} onClick={() => navigate('/history')}>Class History</div>
          <div style={styles.sidebarLink} onClick={() => navigate('/class_status')}>Class Status</div>
        </div>

        {/* MAIN CONTENT */}
        <div style={styles.content}>
          <div style={styles.card}>
            <h2 style={styles.h2}>Classroom Status Overview</h2>

            <input 
              type="text" 
              placeholder="Search by Room Number..." 
              value={searchQuery}
              onChange={handleSearchChange}
              style={styles.searchInput} 
            />

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Room</th>
                  <th style={styles.th}>Lecturer</th>
                  <th style={styles.th}>Subject</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Free At</th>
                  <th style={styles.th}>Extend</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((c, index) => (
                    <tr key={index}>
                      <td style={styles.td}>{c.room}</td>
                      <td style={styles.td}>{c.lecturer}</td>
                      <td style={styles.td}>{c.subject}</td>
                      <td style={styles.td}>
                        <span style={{...styles.status, ...(c.status === 'Free' ? styles.statusFree : {})}}>
                          {c.status}
                        </span>
                      </td>
                      <td style={styles.td}>{c.free_at}</td>

                      <td style={styles.td}>
                        <button 
                          className="btn extend" 
                          style={styles.btn}
                          onClick={() => openExtendModal(c.room)}
                          disabled={c.status === 'Free'} 
                        >
                          Extend
                        </button>
                      </td>

                      <td style={styles.td}>
                        <span 
                          className="btn stop" 
                          style={{...styles.btn, ...styles.stop, opacity: c.status === 'Free' ? 0.5 : 1, cursor: c.status === 'Free' ? 'not-allowed' : 'pointer'}}
                          onClick={() => c.status !== 'Free' && handleStopClass(c.room)}
                        >
                          Stop
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={styles.td}>No rooms found.</td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
        </div>

      </div>

      {/* EXTEND MODAL */}
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <p style={styles.modalTitle}>
            Enter extension time (examples: 45m, 90m, 2h, 1.5h, 120)
          </p>
          <input 
            type="text" 
            value={extendInput}
            onChange={(e) => setExtendInput(e.target.value)}
            placeholder="e.g. 45m or 1.5h"
            style={styles.modalInput}
            autoFocus
          />
          <div style={styles.modalActions}>
            <button onClick={handleExtendSubmit} style={{...styles.btn, ...styles.extend}}>OK</button>
            <button onClick={closeExtendModal} style={{...styles.btn, ...styles.btnCancel}}>Cancel</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;