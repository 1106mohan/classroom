import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StartClass = () => { // Removed lecturerName prop
  const navigate = useNavigate();

  // --- STATE ---
  const [formData, setFormData] = useState({
    lecturer: '', // Now empty, user must type it
    room: '',
    subject: '',
    start_time: '',
    end_time: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- VALIDATION LOGIC ---
  const validateTime = (time) => {
    // Accept: 1 AM, 2PM, 10:30 AM, 11:45PM
    const regex = /^(1[0-2]|[1-9])(:[0-5][0-9])?\s?(AM|PM)$/i;
    return regex.test(time.trim());
  };

  const validateForm = () => {
    const { start_time, end_time, room, subject, lecturer } = formData;

    // Updated validation to check lecturer field too
    if (!lecturer || !room || !subject) {
      setError("Please fill in all fields (Lecturer, Room, Subject).");
      return false;
    }

    if (!validateTime(start_time)) {
      setError("Enter Start Time like 1 AM or 10:30 PM");
      return false;
    }

    if (!validateTime(end_time)) {
      setError("Enter End Time like 2 PM or 11:45 AM");
      return false;
    }

    setError('');
    return true;
  };

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setError('');

      try {
        const res = await fetch("https://lh4rwbkmp2.execute-api.ap-south-1.amazonaws.com/start-class", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        const result = await res.json();

        if (res.ok) {
          alert("✅ Class Started Successfully!");
          // Reset form
          setFormData({ lecturer: '', room: '', subject: '', start_time: '', end_time: '' });
          // Optional: Navigate back to dashboard
          // navigate('/dashboard');
        } else {
          const errorMsg = result.body ? JSON.parse(result.body).error : result.error || result.message;
          setError(`❌ Failed to start: ${errorMsg}`);
        }

      } catch (err) {
        console.error("API Error:", err);
        setError("❌ Network error. Please check your connection.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // --- STYLES (Embedded) ---
  const styles = {
    body: {
      margin: 0,
      background: '#1e40af',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      position: 'relative',
    },
    backBtn: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      background: '#22c55e',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: 'bold',
      zIndex: 10,
      cursor: 'pointer',
    },
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      width: '420px',
      background: '#ffffff',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
    h2: {
      textAlign: 'center',
      color: '#1e3a8a',
      marginBottom: '25px',
      marginTop: 0,
    },
    label: {
      fontWeight: 600,
      marginBottom: '6px',
      display: 'block',
      color: '#334155',
      fontSize: '14px',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #c7d2fe',
      marginBottom: '18px',
      boxSizing: 'border-box',
      fontSize: '14px',
    },
    // We no longer need inputReadOnly style, but kept just in case
    inputReadOnly: {
      background: '#f1f5f9',
      cursor: 'not-allowed',
      color: '#64748b',
    },
    button: {
      width: '100%',
      padding: '12px',
      background: isSubmitting ? '#86efac' : '#22c55e',
      border: 'none',
      borderRadius: '10px',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: isSubmitting ? 'not-allowed' : 'pointer',
      transition: 'background 0.2s',
    },
    errorMsg: {
      background: '#fee2e2',
      color: '#b91c1c',
      padding: '10px',
      borderRadius: '8px',
      marginBottom: '15px',
      fontSize: '14px',
      textAlign: 'center',
    }
  };

  return (
    <div style={styles.body}>
      <style>{`
        .btn-hover:not(:disabled):hover { background: #16a34a; }
      `}</style>

      <a href="/dashboard" style={styles.backBtn}>← Back</a>

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.h2}>Start Class</h2>

          {error && <div style={styles.errorMsg}>{error}</div>}

          <form onSubmit={handleSubmit}>
            
            {/* Lecturer Name - Now Editable */}
            <label style={styles.label}>Lecturer Name</label>
            <input 
              style={styles.input} // Removed inputReadOnly style
              type="text"
              name="lecturer"
              value={formData.lecturer}
              onChange={handleChange}
              placeholder="Enter Lecturer Name"
              required 
            />

            <label style={styles.label}>Classroom Number</label>
            <input 
              style={styles.input}
              type="text" 
              name="room" 
              value={formData.room}
              onChange={handleChange}
              placeholder="e.g. 101"
              required 
            />

            <label style={styles.label}>Subject</label>
            <input 
              style={styles.input}
              type="text" 
              name="subject" 
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Mathematics"
              required 
            />

            <label style={styles.label}>Start Time</label>
            <input 
              style={styles.input}
              type="text"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              placeholder="e.g. 1 AM or 10:30 PM"
              required
            />

            <label style={styles.label}>End Time</label>
            <input 
              style={styles.input}
              type="text"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              placeholder="e.g. 2 PM or 11:45 AM"
              required
            />

            <button 
              type="submit" 
              className="btn-hover" 
              style={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Starting..." : "Start Class"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default StartClass;