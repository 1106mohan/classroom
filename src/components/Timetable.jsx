import React, { useState, useEffect } from 'react';

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newEntry, setNewEntry] = useState({
    day: '',
    time: '',
    course: '',
    class_name: '',
    room: ''
  });

  const API_URL = "https://lh4rwbkmp2.execute-api.ap-south-1.amazonaws.com/timetable";

  const sortByDayOrder = (data) => {
    const dayOrder = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 7
    };

    return data.sort((a, b) => {
      return (dayOrder[a.day] || 99) - (dayOrder[b.day] || 99);
    });
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const items = data.body ? JSON.parse(data.body) : data;
      setTimetable(Array.isArray(items) ? sortByDayOrder(items) : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleRowInputChange = (id, field, value) => {
    setTimetable(timetable.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleRowSave = async (e, id) => {
    e.preventDefault();
    const rowToUpdate = timetable.find(r => r.id === id);

    try {
      await fetch(API_URL, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rowToUpdate)
      });

      fetchTimetable();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this entry?")) {
      try {
        await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' });
        fetchTimetable();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const styles = {
    body: {
      fontFamily: 'Arial',
      background: '#f4f6fb',
      padding: '20px',
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
      borderRadius: '6px',
      textDecoration: 'none',
      fontWeight: 600,
      transition: '0.2s'
    },
    h2: {
      color: '#1f3c88',
    },
    addForm: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      background: 'white',
      padding: '15px',
      borderRadius: '10px',
      marginBottom: '20px',
    },
    input: {
      padding: '8px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      transition: '0.2s'
    },
    btnAdd: {
      background: '#1f3c88',
      color: 'white',
      border: 'none',
      padding: '10px 18px',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: '0.2s'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      background: 'white',
    },
    th: {
      background: '#1f3c88',
      color: 'white',
      padding: '12px',
    },
    td: {
      padding: '10px',
      textAlign: 'center',
      borderBottom: '1px solid #eee',
    },
    tableInput: {
      width: '95%',
      padding: '6px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      textAlign: 'center',
      transition: '0.2s'
    },
    saveBtn: {
      background: 'green',
      color: 'white',
      padding: '6px 10px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    removeBtn: {
      background: 'red',
      color: 'white',
      padding: '6px 10px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.body}>
      <style>{`
        .back-btn:hover { transform: scale(1.05); }

        .btn-add:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 10px rgba(0,0,0,0.2);
        }

        input:focus, select:focus {
          outline: none;
          transform: scale(1.03);
          box-shadow: 0 0 8px rgba(31,60,136,0.4);
        }

        tbody tr:hover {
          background: #eef2ff;
          transform: scale(1.01);
        }

        button:active {
          transform: scale(0.95);
        }

        .save-btn:hover { background: darkgreen; }
        .remove-btn:hover { background: darkred; }

        .add-form {
          animation: slideDown 0.5s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        table {
          animation: fadeIn 0.6s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div style={styles.headerBar}>
        <a href="/dashboard" className="back-btn" style={styles.backBtn}>← Back</a>
        <h2 style={styles.h2}>Manage Timetable</h2>
      </div>

      <form className="add-form" style={styles.addForm} onSubmit={handleAddSubmit}>
        <select name="day" value={newEntry.day} onChange={handleNewInputChange} style={styles.input} required>
          <option value="">Day</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
        </select>

        <input className="form-input" name="time" placeholder="Time" value={newEntry.time} onChange={handleNewInputChange} style={styles.input}/>
        <input className="form-input" name="course" placeholder="Course" value={newEntry.course} onChange={handleNewInputChange} style={styles.input}/>
        <input className="form-input" name="class_name" placeholder="Class" value={newEntry.class_name} onChange={handleNewInputChange} style={styles.input}/>
        <input className="form-input" name="room" placeholder="Room" value={newEntry.room} onChange={handleNewInputChange} style={styles.input}/>

        <button className="btn-add" style={styles.btnAdd}>Add</button>
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Day</th>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Course</th>
            <th style={styles.th}>Class</th>
            <th style={styles.th}>Room</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr><td colSpan="6">Loading...</td></tr>
          ) : timetable.map(row => (
            <tr key={row.id}>
              <td style={styles.td}><input value={row.day} onChange={(e)=>handleRowInputChange(row.id,'day',e.target.value)} style={styles.tableInput}/></td>
              <td style={styles.td}><input value={row.time} onChange={(e)=>handleRowInputChange(row.id,'time',e.target.value)} style={styles.tableInput}/></td>
              <td style={styles.td}><input value={row.course} onChange={(e)=>handleRowInputChange(row.id,'course',e.target.value)} style={styles.tableInput}/></td>
              <td style={styles.td}><input value={row.class_name} onChange={(e)=>handleRowInputChange(row.id,'class_name',e.target.value)} style={styles.tableInput}/></td>
              <td style={styles.td}><input value={row.room} onChange={(e)=>handleRowInputChange(row.id,'room',e.target.value)} style={styles.tableInput}/></td>
              <td style={styles.td}>
                <button className="save-btn" style={styles.saveBtn} onClick={(e)=>handleRowSave(e,row.id)}>Save</button>
                <button className="remove-btn" style={styles.removeBtn} onClick={()=>handleDelete(row.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
