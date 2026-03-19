import React, { useState, useEffect } from 'react';

const ClassStatus = () => {
  // --- MOCK DATA (Replace with API calls) ---
  // r.id, r.room, r.year, r.section, r.status
  const [rooms, setRooms] = useState([
    { id: 1, room: '101', year: '3rd Year', section: 'A', status: 'Available' },
    { id: 2, room: '102', year: '2nd Year', section: 'B', status: 'Ongoing' },
    { id: 3, room: '103', year: '1st Year', section: 'A', status: 'Available' },
    { id: 4, room: '104', year: '3rd Year', section: 'C', status: 'Ongoing' },
  ]);

  // --- FORM STATE (For Adding New Class) ---
  const [newRoom, setNewRoom] = useState({ room: '', year: '', section: '' });

  // --- SEARCH STATE ---
  const [searchQuery, setSearchQuery] = useState('');

  // --- STATS ---
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => r.status === 'Available').length;
  const ongoingRooms = rooms.filter(r => r.status === 'Ongoing').length;

  // --- HANDLERS ---

  // Handle Input Change for Existing Rows (Edit)
  const handleRoomChange = (id, field, value) => {
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.id === id ? { ...room, [field]: value } : room
      )
    );
  };

  // Handle "Save" for existing rows
  const handleSaveRow = (e, id) => {
    e.preventDefault();
    // In a real app, you would make an API call here.
    console.log(`Saved room with ID: ${id}`);
    alert('Room details updated successfully!');
  };

  // Handle "Remove"
  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this room?")) {
      setRooms(prevRooms => prevRooms.filter(room => room.id !== id));
    }
  };

  // Handle Add New Class Inputs
  const handleNewRoomChange = (e) => {
    const { name, value } = e.target;
    setNewRoom(prev => ({ ...prev, [name]: value }));
  };

  // Handle Submit Add New Class
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newRoom.room || !newRoom.year || !newRoom.section) {
      alert("Please fill in all fields");
      return;
    }

    const newEntry = {
      id: Date.now(), // Simple ID generation
      ...newRoom,
      status: 'Available' // Default status
    };

    setRooms(prev => [...prev, newEntry]);
    setNewRoom({ room: '', year: '', section: '' }); // Reset form
  };

  // Filter rooms based on search
  const filteredRooms = rooms.filter(room => 
    room.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- STYLES (Embedded) ---
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
    statusOngoing: { 
      background: '#fee2e2', 
      color: '#991b1b',
      animation: 'pulse 1.5s infinite' 
    },
    searchInput: {
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      marginBottom: '15px',
      boxSizing: 'border-box',
    },
    addFormH3: { marginTop: 0, color: '#1e3a8a' }
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
        tbody tr:hover { background: #f1f5ff; transform: scale(1.01); }
        .btn:hover { opacity: 0.9; }
      `}</style>

      {/* TOP BAR */}
      <div style={styles.topbar}>
        <h3 style={styles.topbarH3}>🏫 Class Status</h3>
        <a href="/dashboard" style={{...styles.btn, ...styles.save, textDecoration: 'none'}}>← Back</a>
      </div>

      <div style={styles.layout}>
        
        {/* SIDEBAR */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarLink}>Dashboard</div>
          <div style={styles.sidebarLink}>Start / End Class</div>
          <div style={styles.sidebarLink}>Timetable</div>
          <div style={styles.sidebarLink}>Class History</div>
          <div style={{...styles.sidebarLink, ...styles.sidebarLinkActive}}>Class Status</div>
        </div>

        {/* MAIN CONTENT */}
        <div style={styles.content}>

          {/* STATS */}
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
              <h2 style={styles.statCardH2}>{ongoingRooms}</h2>
              <p style={styles.statCardP}>Ongoing Classes</p>
            </div>
          </div>

          {/* ROOM TABLE */}
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
                  <th style={styles.th}>Room Number</th>
                  <th style={styles.th}>Year</th>
                  <th style={styles.th}>Section</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map((room) => (
                  <tr key={room.id}>
                    <form onSubmit={(e) => handleSaveRow(e, room.id)}>
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
                        {room.status === "Ongoing" ? (
                          <span style={{...styles.status, ...styles.statusOngoing}}>Ongoing</span>
                        ) : (
                          <span style={{...styles.status, ...styles.statusAvailable}}>Available</span>
                        )}
                      </td>

                      <td style={styles.td}>
                        <button type="submit" className="btn save" style={styles.save}>Save</button>
                        <button 
                          type="button" 
                          onClick={() => handleRemove(room.id)} 
                          className="btn remove" 
                          style={styles.remove}
                        >
                          Remove
                        </button>
                      </td>
                    </form>
                  </tr>
                ))}
                {filteredRooms.length === 0 && (
                  <tr>
                    <td colSpan="5" style={styles.td}>No rooms found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ADD CLASS FORM */}
          <div style={{...styles.card, maxWidth: '400px'}}>
            <h3 style={styles.addFormH3}>Add New Class</h3>
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