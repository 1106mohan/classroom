import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StartClass = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lecturer: '',
    room: '',
    subject: '',
    start_time: '',
    end_time: ''
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateTime = (time) => {
    const regex = /^(1[0-2]|[1-9])(:[0-5][0-9])?\s?(AM|PM)$/i;
    return regex.test(time.trim());
  };

  const validateForm = () => {
    const { lecturer, room, subject, start_time, end_time } = formData;

    if (!lecturer || !room || !subject) {
      setError("Fill all fields");
      return false;
    }

    if (!validateTime(start_time)) {
      setError("Invalid Start Time");
      return false;
    }

    if (!validateTime(end_time)) {
      setError("Invalid End Time");
      return false;
    }

    setError('');
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await fetch("https://lh4rwbkmp2.execute-api.ap-south-1.amazonaws.com/start-class", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      alert("✅ Class Started!");
      setFormData({ lecturer: '', room: '', subject: '', start_time: '', end_time: '' });

    } catch {
      setError("Network error");
    }

    setIsSubmitting(false);
  };

  const styles = {
    body: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg,#1e3a8a,#6366f1)',
      fontFamily: 'Segoe UI',
    },
    card: {
      width: '420px',
      background: 'white',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
      animation: 'fadeIn 0.6s ease'
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#1e3a8a'
    },
    field: {
      position: 'relative',
      marginBottom: '20px'
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '10px',
      border: '1px solid #cbd5e1',
      outline: 'none',
      transition: '0.3s'
    },
    button: {
      width: '100%',
      padding: '12px',
      background: '#22c55e',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: '0.3s'
    },
    error: {
      color: 'red',
      marginBottom: '10px',
      textAlign: 'center'
    },
    back: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      background: '#22c55e',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.body}>

      {/* 🔥 ANIMATIONS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 12px rgba(99,102,241,0.5);
          transform: scale(1.03);
        }

        input:focus + label,
        input:not(:placeholder-shown) + label {
          top: -8px;
          font-size: 12px;
          color: #6366f1;
        }

        label {
          position: absolute;
          left: 12px;
          top: 12px;
          background: white;
          padding: 0 5px;
          transition: 0.3s;
          color: #64748b;
        }

        button:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        button:active {
          transform: scale(0.95);
        }
      `}</style>

      <div style={styles.back} onClick={() => navigate('/dashboard')}>
        ← Back
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>Start Class</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>

          {["lecturer","room","subject","start_time","end_time"].map((field) => (
            <div style={styles.field} key={field}>
              <input
                style={styles.input}
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder=" "
              />
              <label>{field.replace("_"," ").toUpperCase()}</label>
            </div>
          ))}

          <button style={styles.button} disabled={isSubmitting}>
            {isSubmitting ? "Starting..." : "Start Class"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default StartClass;
