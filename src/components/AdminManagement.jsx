import React from 'react';

const AdminManagement = () => {
  // --- STYLES (Embedded) ---
  const styles = {
    body: {
      margin: 0,
      fontFamily: '"Segoe UI", Tahoma, sans-serif',
      background: '#eef2ff', // Consistent with other pages
      color: '#1e293b',
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
    backLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
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
    headerSection: {
      marginBottom: '30px',
    },
    h2: {
      margin: 0,
      color: '#1e3a8a',
      fontSize: '28px',
    },
    p: {
      margin: '5px 0 0',
      color: '#64748b',
    },
    // Grid Layout for Cards
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '25px',
    },
    card: {
      background: 'white',
      borderRadius: '14px',
      padding: '30px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'block',
      border: '1px solid transparent',
    },
    iconBox: {
      width: '60px',
      height: '60px',
      borderRadius: '12px',
      background: '#eff6ff',
      color: '#2563eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '28px',
      marginBottom: '20px',
    },
    cardTitle: {
      margin: 0,
      color: '#1e293b',
      fontSize: '20px',
    },
    cardDesc: {
      margin: '8px 0 0',
      fontSize: '14px',
      color: '#64748b',
      lineHeight: 1.5,
    }
  };

  const options = [
    {
      title: "Add Lecturers",
      desc: "Register new faculty members, assign IDs, and manage their profile details.",
      icon: "👨‍🏫"
    },
    {
      title: "Add Classrooms",
      desc: "Create new room entries, set capacity, and configure hardware availability.",
      icon: "🏫"
    },
    {
      title: "Update Timetable",
      desc: "Upload or modify the master schedule for all departments and semesters.",
      icon: "📅"
    }
  ];

  return (
    <div style={styles.body}>
      {/* Hover effects */}
      <style>{`
        .card-link:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          border-color: #bfdbfe;
        }
        .card-link:hover .icon-box {
          background: #2563eb;
          color: white;
        }
      `}</style>

      {/* TOP BAR */}
      <div style={styles.topbar}>
        <h3 style={styles.topbarH3}>Admin Management</h3>
        <a href="/dashboard" style={styles.backLink}>← Back to Dashboard</a>
      </div>

      <div style={styles.layout}>
        
        {/* SIDEBAR */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarLink}>Dashboard</div>
          <div style={{...styles.sidebarLink, ...styles.sidebarLinkActive}}>Admin Management</div>
          <div style={styles.sidebarLink}>Reports</div>
          <div style={styles.sidebarLink}>Settings</div>
        </div>

        {/* MAIN CONTENT */}
        <div style={styles.content}>
          
          <div style={styles.headerSection}>
            <h2 style={styles.h2}>Management Portal</h2>
            <p style={styles.p}>Select an action below to manage system resources.</p>
          </div>

          <div style={styles.gridContainer}>
            {options.map((opt, index) => (
              <a href="#" key={index} className="card-link" style={styles.card}>
                <div className="icon-box" style={styles.iconBox}>
                  {opt.icon}
                </div>
                <h3 style={styles.cardTitle}>{opt.title}</h3>
                <p style={styles.cardDesc}>{opt.desc}</p>
              </a>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminManagement;