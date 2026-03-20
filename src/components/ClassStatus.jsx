import React, { useState, useEffect, useCallback } from 'react';

const ClassStatus = () => {
  // --- STATE ---
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [newRoom, setNewRoom] = useState({ room: '', year: '', section: '' });

  // API URLs
  const STATUS_API = "https://lh4rwbkmp2.execute-api.ap-south-1.amazonaws.com/class-status";
  const ACTIVE_CLASSES_API = "https://lh4rwbkmp2.execute-api.ap-south-1.amazonaws.com/classes";

  // --- FETCH DATA FUNCTION ---
   // --- FETCH DATA FUNCTION ---
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // URL for fetching today's history (Assuming you have this endpoint)
      const HISTORY_API = "https://lh4rwbkmp2.execute-api.ap-south-1.amazonaws.com/history";

      // 1. Fetch Static Room List
      const statusRes = await fetch(STATUS_API);
      const statusData = await statusRes.json();
      
      let savedRooms = [];
      if (statusData.body) {
        try { savedRooms = JSON.parse(statusData.body); } catch (e) { savedRooms = statusData; }
      } else {
        savedRooms = statusData;
      }

      if (!Array.isArray(savedRooms)) savedRooms = [];
      
      // 2. Fetch Active Classes (Current & Upcoming)
      const activeRes = await fetch(ACTIVE_CLASSES_API);
      const activeData = await activeRes.json();
      let activeClasses = [];
      if (activeData.body) {
        try { activeClasses = JSON.parse(activeData.body); } catch (e) { activeClasses = activeData; }
      } else { activeClasses = activeData; }
      if (!Array.isArray(activeClasses)) activeClasses = [];

      // 3. Fetch History (Classes that just finished today)
      const histRes = await fetch(HISTORY_API);
      const histData = await histRes.json();
      let historyClasses = [];
      if (histData.body) {
        try { historyClasses = JSON.parse(histData.body); } catch (e) { historyClasses = histData; }
      } else { historyClasses = histData; }
      if (!Array.isArray(historyClasses)) historyClasses = [];

      // Get Today's Date String to compare
      const todayStr = new Date().toISOString().split("T")[0];
      
      // Create Maps
      const activeMap = {};
      activeClasses.forEach(cls => {
        const key = String(cls.room).trim();
        activeMap[key] = cls;
      });

      const historyMap = {};
      historyClasses.forEach(cls => {
        // Only care about history if it's today
        if (cls.class_date === todayStr) {
          const key = String(cls.room_number).trim();
          // If multiple classes today, pick the most recent (or just store all)
          // For simplicity, we just store the last one found for that room today
          historyMap[key] = cls; 
        }
      });

      // 4. Merge Data
      const mergedRooms = savedRooms.map(room => {
        const roomKey = String(room.room).trim();
        const activeInfo = activeMap[roomKey];
        const histInfo = historyMap[roomKey];

        if (activeInfo) {
          // CASE 1: Room is Active (Occupied or Upcoming)
          return {
            ...room,
            status: activeInfo.status, 
            subject: activeInfo.subject,
            lecturer: activeInfo.lecturer,
            time: `${activeInfo.start_time} - ${activeInfo.end_time}`
          };
        } else if (histInfo) {
  return {
    ...room,
    status: 'Available',   // 👈 treat as available
    subject: '-',          // 👈 clear data
    lecturer: '-',
    time: '-'
  };
} else {
          // CASE 3: No Active, No History Today
          return {
            ...room,
            status: 'Available',
            subject: '-',
            lecturer: '-',
            time: '-'
          };
        }
      });

      setRooms(mergedRooms);

    } catch (err) {
      console.error("Error in fetchData:", err);
      alert(`Failed to load class status: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [STATUS_API, ACTIVE_CLASSES_API, "https://lh4rwbkmp2.execute-api.ap-south-1.amazonaws.com/history"]);

  // --- USE EFFECT ---
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // --- STATS ---
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => r.status === 'Available').length;
  const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
  const upcomingRooms = rooms.filter(r => r.status === 'Upcoming').length;

  // --- HANDLERS ---

  const handleRoomChange = (id, field, value) => {
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.id === id ? { ...room, [field]: value } : room
      )
    );
  };

  // CHANGED: Removed 'e' (event) since we are not using a form anymore
  const handleSaveRow = async (id) => {
    const roomToUpdate = rooms.find(r => r.id === id);
    
    if (!roomToUpdate) return;

    try {
      const res = await fetch(STATUS_API, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomToUpdate)
      });

      if (res.ok) {
        alert('Room details updated!');
        fetchData(); 
      } else {
        alert('Failed to update');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (id) => {
    if (window.confirm("Are you sure you want to remove this room from the list?")) {
      try {
        const res = await fetch(`${STATUS_API}?id=${id}`, { method: 'DELETE' });
        if (res.ok) fetchData(); 
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleNewRoomChange = (e) => {
    const { name, value } = e.target;
    setNewRoom(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!newRoom.room) {
      alert("Room Number is required");
      return;
    }

    try {
      const res = await fetch(STATUS_API, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom)
      });

      if (res.ok) {
        setNewRoom({ room: '', year: '', section: '' });
        fetchData(); 
      } else {
        alert("Failed to add room");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredRooms = rooms.filter(room => 
    room.room && room.room.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- STYLES ---
  const styles = {
    body: {
      margin: 0,
      fontFamily: '"Segoe UI", Tahoma, sans-serif',
      background: 'linear-gradient(135deg, #eef2ff, #f8fbff)',
      minHeight: '100vh',
    },
    topbar: {
      background: '#1e3a8a',
      padding: '16px 30px',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    topbarH3: { margin: 0, fontSize: '20px' },
    btn: {
      padding: '7px 14px',
      borderRadius: '6px',
      textDecoration: 'none',
      fontWeight: 'bold',
      cursor: 'pointer',
      border: 'none',
      fontSize: '14px',
      transition: 'opacity 0.2s',
    },
    save: { background: '#22c55e', color: 'white' },
    remove: { background: '#ef4444', color: 'white', marginLeft: '5px' },
    layout: { display: 'flex' },
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
    },
    sidebarLinkActive: { background: '#2563eb' },
    content: { flex: 1, padding: '30px' },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '20px',
      marginBottom: '25px',
    },
    statCard: {
      background: 'white',
      padding: '20px',
      borderRadius: '14px',
      textAlign: 'center',
      boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
      transition: '0.3s',
    },
    statCardH2: { margin: 0, color: '#2563eb', fontSize: '28px' },
    statCardP: { margin: '5px 0 0', color: '#64748b', fontSize: '14px' },
    card: {
      background: 'white',
      padding: '20px',
      borderRadius: '14px',
      marginBottom: '25px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
    },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { 
      padding: '12px', 
      textAlign: 'center', 
      borderBottom: '1px solid #e5e7eb',
      background: '#eef2ff',
      color: '#334155'
    },
    td: { padding: '8px', textAlign: 'center', borderBottom: '1px solid #e5e7eb' },
    input: {
      padding: '7px',
      borderRadius: '6px',
      border: '1px solid #cbd5e1',
      width: '90%',
      boxSizing: 'border-box',
    },
    status: {
      padding: '5px 12px',
      borderRadius: '20px',
      fontWeight: 'bold',
      display: 'inline-block',
      fontSize: '12px',
    },
    statusAvailable: { background: '#dcfce7', color: '#166534' },
    statusOngoing: { background: '#fee2e2', color: '#991b1b', animation: 'pulse 1.5s infinite' },
    statusUpcoming: { background: '#fef9c3', color: '#854d0e' }, 
    searchInput: {
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      marginBottom: '15px',
      boxSizing: 'border-box',
    },
    addFormH3: { marginTop: 0, color: '#1e3a8a' },
    infoText: { fontSize: '11px', color: '#64748b', marginTop: '4px' }
  };

  return (
    <div style={styles.body}>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .stat-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        tbody tr { transition: 0.25s; cursor: default; }
        tbody tr:hover { background: '#f1f5ff; transform: scale(1.01); }
        .btn:hover { opacity: 0.9; }
      `}</style>

      <div style={styles.topbar}>
        <h3 style={styles.topbarH3}>🏫 Class Status</h3>
        <a href="/dashboard" style={{...styles.btn, ...styles.save, textDecoration: 'none'}}>← Back</a>
      </div>

      <div style={styles.layout}>
        <div style={styles.sidebar}>
          <div style={styles.sidebarLink}>Dashboard</div>
          <div style={styles.sidebarLink}>Start / End Class</div>
          <div style={styles.sidebarLink}>Timetable</div>
          <div style={styles.sidebarLink}>Class History</div>
          <div style={{...styles.sidebarLink, ...styles.sidebarLinkActive}}>Class Status</div>
        </div>

        <div style={styles.content}>
          <div style={styles.stats}>
            <div className="stat-card" style={styles.statCard}>
              <h2 style={styles.statCardH2}>{totalRooms}</h2>
              <p style={styles.statCardP}>Total Rooms</p>
            </div>
            <div className="stat-card" style={styles.statCard}>
              <h2 style={styles.statCardH2}>{availableRooms}</h2>
              <p style={styles.statCardP}>Available Rooms</p>
            </div>
            <div className="stat-card" style={styles.statCard}>
              <h2 style={styles.statCardH2}>{occupiedRooms + upcomingRooms}</h2>
              <p style={styles.statCardP}>Busy / Upcoming</p>
            </div>
          </div>

          <div style={styles.card}>
            <input 
              type="text" 
              placeholder="🔎 Search by Room Number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput} 
            />

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Room</th>
                  <th style={styles.th}>Year</th>
                  <th style={styles.th}>Section</th>
                  <th style={styles.th}>Current Class Info</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                   <tr><td colSpan="6" style={styles.td}>Loading...</td></tr>
                ) : filteredRooms.length > 0 ? (
                  filteredRooms.map((room) => (
                    // REMOVED <form> tag here
                    <tr key={room.id}>
                      <td style={styles.td}>
                        <input 
                          type="text" 
                          value={room.room} 
                          onChange={(e) => handleRoomChange(room.id, 'room', e.target.value)}
                          style={styles.input} 
                        />
                      </td>

                      <td style={styles.td}>
                        <input 
                          type="text" 
                          value={room.year} 
                          onChange={(e) => handleRoomChange(room.id, 'year', e.target.value)}
                          style={styles.input} 
                        />
                      </td>

                      <td style={styles.td}>
                        <input 
                          type="text" 
                          value={room.section} 
                          onChange={(e) => handleRoomChange(room.id, 'section', e.target.value)}
                          style={styles.input} 
                        />
                      </td>
                      
                      <td style={styles.td}>
                        {room.status === 'Available' ? (
                          <span style={{color: '#94a3b8'}}>-</span>
                        ) : (
                          <div>
                            <div style={{fontWeight: 'bold'}}>{room.subject}</div>
                            <div style={styles.infoText}>{room.lecturer}</div>
                            <div style={styles.infoText}>{room.time}</div>
                          </div>
                        )}
                      </td>

                      <td style={styles.td}>
  {room.status === "Occupied" ? (
    <span style={{...styles.status, ...styles.statusOngoing}}>Occupied</span>
  ) : room.status === "Upcoming" ? (
    <span style={{...styles.status, ...styles.statusUpcoming}}>Upcoming</span>
  ) : room.status === "Just Finished" ? (
    <span style={{...styles.status, background: '#e0f2fe', color: '#075985'}}>Available</span>
  ) : (
    <span style={{...styles.status, ...styles.statusAvailable}}>Available</span>
  )}
</td>

                      <td style={styles.td}>
                        {/* CHANGED: Moved onSubmit to onClick */}
                        <button 
                          type="button" 
                          onClick={() => handleSaveRow(room.id)} 
                          className="btn save" 
                          style={styles.save}
                        >
                          Save
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleRemove(room.id)} 
                          className="btn remove" 
                          style={styles.remove}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={styles.td}>No rooms found. Add a new room below.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ADD CLASS FORM */}
          <div style={{...styles.card, maxWidth: '400px'}}>
            <h3 style={styles.addFormH3}>Add New Room</h3>
            <form onSubmit={handleAddSubmit}>
              <input 
                type="text" 
                name="room" 
                placeholder="Room Number" 
                value={newRoom.room}
                onChange={handleNewRoomChange}
                style={{...styles.input, width: '100%', marginBottom: '10px'}} 
                required
              />
              
              <input 
                type="text" 
                name="year" 
                placeholder="Year" 
                value={newRoom.year}
                onChange={handleNewRoomChange}
                style={{...styles.input, width: '100%', marginBottom: '10px'}} 
                required
              />
              
              <input 
                type="text" 
                name="section" 
                placeholder="Section" 
                value={newRoom.section}
                onChange={handleNewRoomChange}
                style={{...styles.input, width: '100%', marginBottom: '15px'}} 
                required
              />
              
              <button type="submit" className="btn save" style={{...styles.save, width: '100%'}}>Add Class</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClassStatus;