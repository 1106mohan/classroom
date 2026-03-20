import React, { useState, useEffect } from 'react';

const Timetable = () => {
  // --- STATE ---
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newEntry, setNewEntry] = useState({
    day: '',
    time: '',
    course: '',
    class_name: '',
    room: ''
  });

  // API URL
  const API_URL = "https://lh4rwbkmp2.execute-api.ap-south-1.amazonaws.com/timetable";

  // --- FETCH DATA ON LOAD ---
  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      // Handle Proxy Integration response
      const items = data.body ? JSON.parse(data.body) : data;
      setTimetable(Array.isArray(items) ? items : []);
    } catch (err) {
      console.error("Error fetching timetable:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS ---

  // 1. Handle Add New Entry
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    
    if (!newEntry.day || !newEntry.time || !newEntry.course || !newEntry.class_name || !newEntry.room) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry)
      });
      
      if (res.ok) {
        alert("Entry added successfully!");
        setNewEntry({ day: '', time: '', course: '', class_name: '', room: '' });
        fetchTimetable();
      } else {
        alert("Failed to add entry");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding entry");
    }
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({ ...prev, [name]: value }));
  };

  // 2. Handle Input Change (Local State)
  const handleRowInputChange = (id, field, value) => {
    setTimetable(timetable.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  // 3. Handle Save (Update API)
  const handleRowSave = async (e, id) => {
    e.preventDefault();
    const rowToUpdate = timetable.find(r => r.id === id);
    
    if (!rowToUpdate) return;

    try {
      const res = await fetch(API_URL, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rowToUpdate)
      });

      if (res.ok) {
        alert('Row updated successfully!');
        fetchTimetable(); // Refresh to ensure sync
      } else {
        alert('Failed to update row');
      }
    } catch (err) {
      console.error(err);
      alert("Error updating row");
    }
  };

  // 4. Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this entry?")) {
      try {
        const res = await fetch(`${API_URL}?id=${id}`, {
          method: 'DELETE'
        });

        if (res.ok) {
          fetchTimetable();
        } else {
          alert("Failed to delete");
        }
      } catch (err) {
        console.error(err);
        alert("Error deleting entry");
      }
    }
  };

  // --- STYLES (Same as before) ---
  const styles = {
    body: {
      fontFamily: 'Arial, sans-serif',
      background: '#f4f6fb',
      padding: '10px 30px',
    },
    headerBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    backBtn: {
      background: '#22c55e',
      color: 'white',
      padding: '10px 18px',
      textDecoration: 'none',
      borderRadius: '6px',
      display: 'inline-block',
      fontWeight: 600,
      cursor: 'pointer',
    },
    h2: {
      margin: 0,
      color: '#1f3c88',
    },
    timetableContainer: {
      background: 'transparent',
    },
    addForm: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      background: 'white',
      padding: '15px',
      borderRadius: '6px',
      marginBottom: '25px',
      flexWrap: 'wrap',
    },
    select: {
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    input: {
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    btnAdd: {
      padding: '9px 20px',
      background: '#1f3c88',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      background: 'white',
    },
    th: {
      padding: '12px',
      border: '1px solid #ddd',
      textAlign: 'center',
      background: '#1f3c88',
      color: 'white',
      fontWeight: 'bold',
    },
    td: {
      padding: '8px',
      border: '1px solid #ddd',
      textAlign: 'center',
    },
    tableInput: {
      width: '95%',
      padding: '6px',
      border: '1px solid #e2e8f0',
      borderRadius: '4px',
      textAlign: 'center',
    },
    saveBtn: {
      background: 'green',
      color: 'white',
      border: 'none',
      padding: '6px 10px',
      borderRadius: '4px',
      cursor: 'pointer',
      marginRight: '5px',
    },
    removeBtn: {
      background: 'red',
      color: 'white',
      border: 'none',
      padding: '6px 10px',
      borderRadius: '4px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.body}>
      <style>{`
        .back-btn:hover { background: #16a34a; }
        .btn-add:hover { background: #152c5c; }
        .table-input:focus { border-color: #1f3c88; outline: none; }
      `}</style>

      <div className="header-bar" style={styles.headerBar}>
        <a href="/dashboard" className="back-btn" style={styles.backBtn}>← Back</a>
        <h2 style={styles.h2}>Manage Timetable</h2>
      </div>

      <div className="timetable-container" style={styles.timetableContainer}>
        
        {/* ADD FORM */}
        <form className="add-form" style={styles.addForm} onSubmit={handleAddSubmit}>
          <select 
            name="day" 
            value={newEntry.day} 
            onChange={handleNewInputChange} 
            style={styles.select}
            required
          >
            <option value="">Day</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
          </select>

          <input 
            type="text" 
            name="time" 
            placeholder="08:00 - 09:00" 
            value={newEntry.time}
            onChange={handleNewInputChange}
            style={{...styles.input, width: '140px'}} 
            required 
          />
          
          <input 
            type="text" 
            name="course" 
            placeholder="Course Name" 
            value={newEntry.course}
            onChange={handleNewInputChange}
            style={{...styles.input, width: '150px'}} 
            required 
          />
          
          <input 
            type="text" 
            name="class_name" 
            placeholder="Class Name" 
            value={newEntry.class_name}
            onChange={handleNewInputChange}
            style={{...styles.input, width: '120px'}} 
            required 
          />
          
          <input 
            type="text" 
            name="room" 
            placeholder="Room No" 
            value={newEntry.room}
            onChange={handleNewInputChange}
            style={{...styles.input, width: '80px'}} 
            required 
          />

          <button type="submit" className="btn-add" style={styles.btnAdd}>Add</button>
        </form>

        {/* TIMETABLE TABLE */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Day</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Course Name</th>
              <th style={styles.th}>Class Name</th>
              <th style={styles.th}>Room Number</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
               <tr><td colSpan="6">Loading...</td></tr>
            ) : timetable.length > 0 ? (
              timetable.map((row) => (
                <tr key={row.id}>
  <td style={styles.td}>
    <input 
      value={row.day}
      onChange={(e) => handleRowInputChange(row.id, 'day', e.target.value)}
      style={styles.tableInput}
    />
  </td>

  <td style={styles.td}>
    <input 
      value={row.time}
      onChange={(e) => handleRowInputChange(row.id, 'time', e.target.value)}
      style={styles.tableInput}
    />
  </td>

  <td style={styles.td}>
    <input 
      value={row.course}
      onChange={(e) => handleRowInputChange(row.id, 'course', e.target.value)}
      style={styles.tableInput}
    />
  </td>

  <td style={styles.td}>
    <input 
      value={row.class_name}
      onChange={(e) => handleRowInputChange(row.id, 'class_name', e.target.value)}
      style={styles.tableInput}
    />
  </td>

  <td style={styles.td}>
    <input 
      value={row.room}
      onChange={(e) => handleRowInputChange(row.id, 'room', e.target.value)}
      style={styles.tableInput}
    />
  </td>

  <td style={styles.td}>
    <button 
      onClick={(e) => handleRowSave(e, row.id)}
      style={styles.saveBtn}
    >
      Save
    </button>

    <button 
      onClick={() => handleDelete(row.id)}
      style={styles.removeBtn}
    >
      Remove
    </button>
  </td>
</tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{padding: '20px', color: '#888'}}>No timetable entries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;