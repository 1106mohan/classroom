import React, { useState, useEffect, useMemo } from 'react';

const ClassHistory = () => {
  // --- MOCK DATA (Replace with API data in production) ---
  const initialHistory = [
    { id: 1, class_date: '2023-10-25', start_time: '09:00', end_time: '10:00', course_name: 'Data Structures', class_name: 'MCA-3-A', room_number: '101' },
    { id: 2, class_date: '2023-10-25', start_time: '10:30', end_time: '11:30', course_name: 'Algorithms', class_name: 'MCA-3-B', room_number: '102' },
    { id: 3, class_date: '2023-10-24', start_time: '14:00', end_time: '15:00', course_name: 'Web Dev', class_name: 'MCA-2-A', room_number: '103' },
    { id: 4, class_date: new Date().toISOString().split("T")[0], start_time: '09:00', end_time: '10:00', course_name: 'Database', class_name: 'MCA-1-A', room_number: '104' }, // Example for "Today"
  ];

  // --- STATE ---
  const [history, setHistory] = useState(initialHistory);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // --- DERIVED STATE (FILTERING) ---
  const filteredHistory = useMemo(() => {
    return history.filter(row => {
      const textMatch = 
        row.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.class_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.room_number.toLowerCase().includes(searchQuery.toLowerCase());
      
      const dateMatch = dateFilter ? row.class_date === dateFilter : true;

      return textMatch && dateMatch;
    });
  }, [history, searchQuery, dateFilter]);

  // --- DERIVED STATE (STATISTICS) ---
  const stats = useMemo(() => {
    const total = filteredHistory.length;
    
    const todayStr = new Date().toISOString().split("T")[0];
    const todayCount = filteredHistory.filter(row => row.class_date === todayStr).length;
    
    const uniqueRooms = new Set(filteredHistory.map(row => row.room_number)).size;

    return { total, todayCount, uniqueRooms };
  }, [filteredHistory]);

  // --- HANDLERS ---
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setHistory(prev => prev.filter(row => row.id !== id));
    }
  };

  // --- STYLES (Embedded) ---
  const styles = {
    body: {
      margin: 0,
      fontFamily: '"Segoe UI", Tahoma, sans-serif',
      background: '#f8fafc',
      color: '#334155',
      padding: '20px',
    },
    headerBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px',
      paddingBottom: '15px',
      borderBottom: '2px solid #e2e8f0',
    },
    backBtn: {
      background: 'white',
      border: '1px solid #cbd5e1',
      padding: '8px 16px',
      borderRadius: '8px',
      textDecoration: 'none',
      color: '#334155',
      fontWeight: 600,
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    },
    h2: {
      margin: 0,
      color: '#1e3a8a',
      fontSize: '24px',
    },
    historyStats: {
      display: 'flex',
      gap: '20px',
      marginBottom: '25px',
    },
    statBox: {
      flex: 1,
      background: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      border: '1px solid #f1f5f9',
    },
    statH3: {
      margin: 0,
      color: '#2563eb',
      fontSize: '32px',
    },
    statP: {
      margin: '5px 0 0',
      color: '#64748b',
      fontSize: '14px',
      fontWeight: 500,
    },
    filterBar: {
      display: 'flex',
      gap: '15px',
      marginBottom: '20px',
      flexWrap: 'wrap',
    },
    input: {
      padding: '10px 15px',
      borderRadius: '8px',
      border: '1px solid #cbd5e1',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    th: {
      background: '#f1f5f9',
      color: '#475569',
      fontWeight: 600,
      padding: '15px',
      textAlign: 'left',
      borderBottom: '2px solid #e2e8f0',
    },
    td: {
      padding: '15px',
      borderBottom: '1px solid #f1f5f9',
      color: '#334155',
      fontSize: '14px',
    },
    removeBtn: {
      background: '#ef4444',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: '12px',
      fontWeight: 'bold',
      display: 'inline-block',
      transition: 'background 0.2s',
    },
    noData: {
      textAlign: 'center',
      padding: '20px',
      color: '#94a3b8',
      fontStyle: 'italic',
    }
  };

  return (
    <div style={styles.body}>
      {/* Hover effects */}
      <style>{`
        .back-btn:hover { background: #f1f5f9; }
        .remove-btn:hover { background: #dc2626; }
      `}</style>

      <div className="header-bar" style={styles.headerBar}>
        <a href="/dashboard" className="back-btn" style={styles.backBtn}>← Back</a>
        <h2 style={styles.h2}>📚 Class History</h2>
      </div>

      {/* STATS */}
      <div className="history-stats" style={styles.historyStats}>
        <div className="stat-box" style={styles.statBox}>
          <h3 id="totalClasses" style={styles.statH3}>{stats.total}</h3>
          <p style={styles.statP}>Total Classes</p>
        </div>
        <div className="stat-box" style={styles.statBox}>
          <h3 id="todayClasses" style={styles.statH3}>{stats.todayCount}</h3>
          <p style={styles.statP}>Today's Classes</p>
        </div>
        <div className="stat-box" style={styles.statBox}>
          <h3 id="totalRooms" style={styles.statH3}>{stats.uniqueRooms}</h3>
          <p style={styles.statP}>Rooms Used</p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="filter-bar" style={styles.filterBar}>
        <input 
          type="text" 
          placeholder="🔎 Search course / class / room"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{...styles.input, flex: 2}}
        />
        <input 
          type="date" 
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={{...styles.input, flex: 1}}
        />
      </div>

      {/* TABLE */}
      <table className="table" style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Course Name</th>
            <th style={styles.th}>Class Name</th>
            <th style={styles.th}>Room Number</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.length > 0 ? (
            filteredHistory.map((row) => (
              <tr key={row.id}>
                <td className="date" style={styles.td}>{row.class_date}</td>
                <td style={styles.td}>{row.start_time} – {row.end_time}</td>
                <td style={styles.td}>{row.course_name}</td>
                <td style={styles.td}>{row.class_name}</td>
                <td className="room" style={styles.td}>{row.room_number}</td>
                <td style={styles.td}>
                  <button 
                    onClick={() => handleDelete(row.id)} 
                    className="btn end remove-btn" 
                    style={styles.removeBtn}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={styles.noData}>No class history available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClassHistory;