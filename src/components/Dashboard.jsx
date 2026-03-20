import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Dashboard = ({ name = "Lecturer" }) => {
  const navigate = useNavigate();

  // --- STATE ---
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state stores the ID of the class being extended
  const [extendModal, setExtendModal] = useState({ open: false, id: null });
  const [extendInput, setExtendInput] = useState('');

  // --- API FUNCTIONS ---
  const fetchClasses = async () => {
    try {
      const res = await fetch("https://lh4rwbkmp2.execute-api.ap-south-1.amazonaws.com/classes");
      const result = await res.json();

      let data;
      // Handle API Gateway Proxy response
      if (result.body) {
        data = JSON.parse(result.body);
      } else {
        data = result;
      }

      console.log("Fetched Classes:", data); // Debug log
      setClasses(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error("Error fetching classes:", err);
      setClasses([]);
    }
  };

  // STOP CLASS FUNCTION (Uses ID)
  const handleStopClass = async (id) => {
    console.log("Attempting to STOP class with ID:", id); // DEBUG: Check Console

    if (!id) {
        alert("Error: Class ID is missing. Cannot stop class.");
        return;
    }

    const confirmStop = window.confirm(`Are you sure you want to stop this class?`);
    if (!confirmStop) return;

    try {
      const res = await fetch("https://lh4rwbkmp2.execute-api.ap-south-1.amazonaws.com/stop-class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id }) // Sending ID
      });

      const result = await res.json();
      
      let data;
      if (result.body) {
        data = JSON.parse(result.body);
      } else {
        data = result;
      }

      if (res.ok) {
        alert("✅ Class stopped successfully");
        fetchClasses(); 
      } else {
        console.error("Stop Error Response:", data);
        alert(`❌ Error: ${data.error || data.message || 'Unknown error'}`);
      }

    } catch (err) {
      console.error("Network Error stopping class:", err);
      alert("❌ Network error stopping class");
    }
  };

  // EXTEND CLASS FUNCTION (Uses ID)
  const handleExtendSubmit = async (e) => {
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

    console.log(`Attempting to EXTEND ID: ${extendModal.id} by ${minutes} minutes`); // DEBUG

    try {
      const res = await fetch("https://lh4rwbkmp2.execute-api.ap-south-1.amazonaws.com/extend-class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: extendModal.id, // Sending ID
          minutes: minutes
        })
      });

      const result = await res.json();

      let data;
      if (result.body) {
        data = JSON.parse(result.body);
      } else {
        data = result;
      }

      if (res.ok) {
        alert(`✅ Extended! New End Time: ${data.new_end_time}`);
        fetchClasses();
        closeExtendModal();
      } else {
        console.error("Extend Error:", data);
        alert(`❌ Error extending: ${data.error || data.message}`);
      }

    } catch (err) {
      console.error("EXTEND ERROR:", err);
      alert("❌ Error extending class");
    }
  };

  // --- EFFECTS ---
  useEffect(() => {
    fetchClasses();
  }, []);

  // --- HANDLERS ---
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const openExtendModal = (id) => {
    console.log("Opening Extend Modal for ID:", id); // DEBUG
    setExtendModal({ open: true, id });
    setExtendInput('');
  };

  const closeExtendModal = () => {
    setExtendModal({ open: false, id: null });
    setExtendInput('');
  };

  const filteredClasses = classes.filter(c => 
    c.room && c.room.toString().toLowerCase().includes(searchQuery)
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
      padding: '6px 14px',
      borderRadius: '20px',
      fontWeight: 'bold',
      fontSize: '12px',
      display: 'inline-block',
      // Default color (Red)
      background: '#fee2e2', 
      color: '#b91c1c',
    },
    statusFree: {
      background: '#dcfce7', // Green
      color: '#15803d',
    },
    statusOccupied: {
      background: '#fee2e2', // Red
      color: '#b91c1c',
      animation: 'pulse 1.5s infinite' // Optional Pulse Animation
    },
    statusUpcoming: {
      background: '#fef9c3', // Yellow
      color: '#854d0e',
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
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .sidebar-link:hover { background: #3b82f6; }
      `}</style>

      <div style={styles.topbar}>
        <h3>Welcome, {name}</h3>
        <div 
          onClick={() => {
            localStorage.removeItem('accessToken'); 
            navigate('/'); 
          }} 
          style={styles.logout}
        >
          Logout
        </div>
      </div>

      <div style={styles.layout}>
        
        {/* SIDEBAR */}
        <div style={styles.sidebar}>
          <div style={{...styles.sidebarLink, ...styles.sidebarLinkActive}}>Dashboard</div>
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
                  <th style={styles.th}>Starts At</th>
                  <th style={styles.th}>Ends At</th>
                  <th style={styles.th}>Free At</th> 
                  <th style={styles.th}>Extend</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.length > 0 ? (
                  filteredClasses.map((c, index) => (
                    <tr key={c.id || index}> 
                      <td style={styles.td}>{c.room}</td>
                      <td style={styles.td}>{c.lecturer}</td>
                      <td style={styles.td}>{c.subject}</td>
                      <td style={styles.td}>
                        <span 
                          style={{
                            ...styles.status, 
                            ...(c.status === 'Free' && styles.statusFree),
                            ...(c.status === 'Occupied' && styles.statusOccupied),
                            ...(c.status === 'Upcoming' && styles.statusUpcoming)
                          }}
                        >
                          {c.status}
                        </span>
                      </td>
                      
                      <td style={styles.td}>{c.start_time}</td>
                      <td style={styles.td}>{c.end_time}</td>

                      <td style={styles.td}>
                        {c.status === "Upcoming" && "-"}
                        {c.status === "Occupied" && c.end_time}
                        {c.status === "Free" && "Now"}
                      </td>

                      <td style={styles.td}>
                        <button 
                          className="btn extend" 
                          style={styles.btn}
                          onClick={() => openExtendModal(c.id)}
                          disabled={c.status === 'Free'} 
                        >
                          Extend
                        </button>
                      </td>

                      <td style={styles.td}>
                        <span 
                          className="btn stop" 
                          style={{...styles.btn, ...styles.stop, opacity: c.status === 'Free' ? 0.5 : 1, cursor: c.status === 'Free' ? 'not-allowed' : 'pointer'}}
                          onClick={() => c.status !== 'Free' && handleStopClass(c.id)}
                        >
                          Stop
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={styles.td}>No rooms found.</td>
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