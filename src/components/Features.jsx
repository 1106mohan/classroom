import React from 'react';

const Features = () => {
  // --- STYLES (Embedded) ---
  const styles = {
    body: {
      margin: 0,
      fontFamily: '"Segoe UI", Tahoma, sans-serif',
      backgroundColor: '#eef2ff',
      color: '#1e293b',
    },
    header: {
      backgroundColor: '#1e3a8a',
      color: 'white',
      padding: '40px 20px',
      textAlign: 'center',
    },
    headerH1: {
      margin: 0,
      fontSize: '36px',
    },
    headerP: {
      marginTop: '10px',
      fontSize: '16px',
      opacity: 0.9,
    },
    featuresContainer: {
      maxWidth: '1100px',
      margin: '50px auto',
      padding: '0 20px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '25px',
    },
    featureCard: {
      background: 'white',
      borderRadius: '14px',
      padding: '25px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    featureIcon: {
      fontSize: '36px',
      marginBottom: '15px',
      color: '#2563eb',
    },
    featureH3: {
      margin: '0 0 10px',
      fontSize: '20px',
      color: '#1e3a8a',
    },
    featureP: {
      fontSize: '14.5px',
      lineHeight: 1.6,
      color: '#475569',
      margin: 0,
    },
    spacer: {
      height: '40px',
    }
  };

  // --- DATA ---
  const featuresList = [
    {
      icon: "🔐",
      title: "Secure Login",
      description: "Role-based authentication for Admin and Lecturers ensures secure access to classroom operations."
    },
    {
      icon: "📊",
      title: "Real-Time Dashboard",
      description: "Instantly view which classrooms are occupied, free, or running overtime — all in one place."
    },
    {
      icon: "⏱️",
      title: "Start & Stop Class Tracking",
      description: "Accurately log class start and end times to avoid conflicts and ensure room availability."
    },
    {
      icon: "🗓️",
      title: "Timetable View",
      description: "Maintain a clear and organized timetable for courses, rooms, and class schedules."
    },
    {
      icon: "📜",
      title: "Class History Logs",
      description: "View detailed class history by date, time, course, room, and lecturer — stored for long-term reference."
    },
    {
      icon: "🛠️",
      title: "Admin Control Panel",
      description: "Admins can manage users, monitor activity, and maintain full control over the system."
    }
  ];

  return (
    <div style={styles.body}>
      {/* Hover effect injected via style tag for cleaner JSX */}
      <style>{`
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      {/* Page Header */}
      <div className="header" style={styles.header}>
        <h1 style={styles.headerH1}>Powerful Features</h1>
        <p style={styles.headerP}>Everything you need to manage classrooms efficiently</p>
      </div>

      {/* Features Grid */}
      <div className="features-container" style={styles.featuresContainer}>
        {featuresList.map((feature, index) => (
          <div key={index} className="feature-card" style={styles.featureCard}>
            <div className="feature-icon" style={styles.featureIcon}>
              {feature.icon}
            </div>
            <h3 className="feature-title" style={styles.featureH3}>
              {feature.title}
            </h3>
            <p className="feature-desc" style={styles.featureP}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="spacer" style={styles.spacer}></div>
    </div>
  );
};

export default Features;
