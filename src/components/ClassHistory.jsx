import React, { useState, useEffect, useMemo, useCallback } from 'react';

const ClassHistory = () => {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const useCountUp = (value) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const duration = 800;
      const increment = value / (duration / 20);

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 20);

      return () => clearInterval(timer);
    }, [value]);

    return count;
  };

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("https://lh4rwbkmp2.execute-api.ap-south-1.amazonaws.com/history");
      const result = await res.json();

      let data = result.body ? JSON.parse(result.body) : result;
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const filteredHistory = useMemo(() => {
    return history.filter(row => {
      const textMatch =
        (row.course_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (row.class_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (row.room_number || "").toLowerCase().includes(searchQuery.toLowerCase());

      const dateMatch = dateFilter ? row.class_date === dateFilter : true;

      return textMatch && dateMatch;
    });
  }, [history, searchQuery, dateFilter]);

  const stats = useMemo(() => {
    const total = filteredHistory.length;
    const todayStr = new Date().toISOString().split("T")[0];
    const todayCount = filteredHistory.filter(row => row.class_date === todayStr).length;
    const uniqueRooms = new Set(filteredHistory.map(row => row.room_number)).size;

    return { total, todayCount, uniqueRooms };
  }, [filteredHistory]);

  const totalCount = useCountUp(stats.total);
  const todayCount = useCountUp(stats.todayCount);
  const roomCount = useCountUp(stats.uniqueRooms);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this record?")) {
      await fetch(`https://lh4rwbkmp2.execute-api.ap-south-1.amazonaws.com/history-item?id=${id}`, {
        method: 'DELETE'
      });
      fetchHistory();
    }
  };

  return (
    <div className="container">

      <style>{`

        .container {
          animation: fadeInPage 0.8s ease;
        }

        @keyframes fadeInPage {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          align-items: center;
        }

        .back-btn {
          background: #22c55e;
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 14px;
          text-decoration: none;
          transition: 0.3s;
        }

        .back-btn:hover {
          transform: scale(1.05);
          background: #16a34a;
        }

        .stats {
          display: flex;
          gap: 15px; /* slightly reduced gap */
          margin-bottom: 15px;
        }

        /* ✅ REDUCED SIZE */
        .stat-box {
          flex: 1;
          background: white;
          padding: 12px; /* smaller padding */
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 8px 18px rgba(0,0,0,0.08);
          transition: 0.4s;
          animation: popUp 0.6s ease;
        }

        .stat-box:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 12px 20px rgba(37,99,235,0.25);
        }

        @keyframes popUp {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .stat-number {
          font-size: 24px; /* reduced number size */
          color: #2563eb;
          font-weight: bold;
        }

        .stat-box p {
          font-size: 13px; /* smaller label */
          margin-top: 4px;
        }

        input {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          margin-right: 10px;
          transition: 0.3s;
        }

        input:focus {
          border-color: #2563eb;
          transform: scale(1.05);
          box-shadow: 0 0 10px rgba(37,99,235,0.3);
          outline: none;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 12px;
          overflow: hidden;
        }

        th {
          background: #1e3a8a;
          color: white;
          padding: 12px;
        }

        td {
          padding: 12px;
          text-align: center;
        }

        tbody tr {
          animation: slideUp 0.5s ease;
          transition: 0.3s;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        tbody tr:hover {
          background: #eff6ff;
          transform: scale(1.02);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .remove-btn {
          background: red;
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: 0.3s;
        }

        .remove-btn:hover {
          transform: scale(1.2);
          background: #dc2626;
        }

      `}</style>

      <div className="header">
        <a href="/dashboard" className="back-btn">← Back</a>
        <h2>📚 Class History</h2>
      </div>

      <div className="stats">
        <div className="stat-box">
          <div className="stat-number">{totalCount}</div>
          <p>Total Classes</p>
        </div>
        <div className="stat-box">
          <div className="stat-number">{todayCount}</div>
          <p>Today's Classes</p>
        </div>
        <div className="stat-box">
          <div className="stat-number">{roomCount}</div>
          <p>Rooms Used</p>
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Course</th>
            <th>Class</th>
            <th>Room</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr><td colSpan="6">Loading...</td></tr>
          ) : filteredHistory.map(row => (
            <tr key={row.id}>
              <td>{row.class_date}</td>
              <td>{row.start_time} - {row.end_time}</td>
              <td>{row.course_name}</td>
              <td>{row.class_name}</td>
              <td>{row.room_number}</td>
              <td>
                <button
                  className="remove-btn"
                  onClick={() => handleDelete(row.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default ClassHistory;
