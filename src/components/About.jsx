import React from 'react';

const About = () => {
  // --- STYLES (Embedded) ---
  const styles = {
    body: {
      margin: 0,
      fontFamily: '"Segoe UI", Tahoma, sans-serif',
      background: 'linear-gradient(180deg, #eef2ff, #ffffff)',
      color: '#1e293b',
    },
    header: {
      background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
      color: 'white',
      padding: '55px 20px',
      textAlign: 'center',
    },
    headerH1: {
      margin: 0,
      fontSize: '38px',
    },
    headerP: {
      marginTop: '12px',
      fontSize: '16px',
      opacity: 0.9,
    },
    container: {
      maxWidth: '1100px',
      margin: '60px auto',
      padding: '0 20px',
    },
    block: {
      display: 'flex',
      gap: '30px',
      alignItems: 'center',
      background: 'white',
      borderRadius: '18px',
      padding: '35px',
      marginBottom: '45px',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.08)',
      transition: 'transform 0.4s ease, box-shadow 0.4s ease',
    },
    iconBox: {
      minWidth: '90px',
      height: '90px',
      borderRadius: '50%',
      background: '#eef2ff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '36px',
      color: '#2563eb',
      transition: 'background 0.3s ease, transform 0.3s ease',
    },
    contentH2: {
      margin: '0 0 12px',
      color: '#1e3a8a',
      fontSize: '24px',
    },
    contentP: {
      margin: 0,
      fontSize: '15px',
      lineHeight: 1.7,
      color: '#475569',
    },
    objectivesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '25px',
      marginTop: '25px',
    },
    objectiveItem: {
      background: '#f8fafc',
      padding: '25px',
      borderRadius: '16px',
      textAlign: 'center',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.07)',
      transition: 'transform 0.3s ease, background 0.3s ease',
    },
    objectiveIcon: {
      display: 'block',
      fontSize: '30px',
      marginBottom: '12px',
      color: '#2563eb',
    },
    objectiveText: {
      margin: 0,
      fontSize: '14.5px',
      color: '#334155',
    },
    timeline: {
      marginTop: '30px',
    },
    timelineItem: {
      marginBottom: '18px',
    },
    timelineText: {
      margin: 0,
      fontSize: '15px',
      color: '#475569',
    },
  };

  return (
    <div style={styles.body}>
      {/* Hover effects injected via style tag for cleaner pseudo-class handling */}
      <style>{`
        .block-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 45px rgba(0, 0, 0, 0.15);
        }

        .icon-hover:hover {
          background: #2563eb !important;
          color: white !important;
          transform: rotate(6deg) scale(1.05) !important;
        }

        .objective-hover:hover {
          background: #eef2ff !important;
          transform: translateY(-6px);
        }
      `}</style>

      {/* Header */}
      <div className="header" style={styles.header}>
        <h1 style={styles.headerH1}>About the System</h1>
        <p style={styles.headerP}>A smarter way to manage classrooms in real time</p>
      </div>

      <div className="container" style={styles.container}>

        {/* Problem */}
        <div className="block block-hover" style={styles.block}>
          <div className="icon-box icon-hover" style={styles.iconBox}>⚠️</div>
          <div className="content">
            <h2 style={styles.contentH2}>Problem Statement</h2>
            <p style={styles.contentP}>
              In academic environments, classroom scheduling conflicts
              often arise due to classes exceeding their allotted time.
              Manual tracking fails to provide real-time visibility,
              causing delays and inefficient classroom usage.
            </p>
          </div>
        </div>

        {/* Objectives */}
        <div className="block block-hover" style={styles.block}>
          <div className="icon-box icon-hover" style={styles.iconBox}>🎯</div>
          <div className="content">
            <h2 style={styles.contentH2}>Objectives</h2>

            <div className="objectives" style={styles.objectivesGrid}>
              <div className="objective objective-hover" style={styles.objectiveItem}>
                <span className="objective-icon" style={styles.objectiveIcon}>📡</span>
                <p className="objective-text" style={styles.objectiveText}>Show real-time classroom availability</p>
              </div>

              <div className="objective objective-hover" style={styles.objectiveItem}>
                <span className="objective-icon" style={styles.objectiveIcon}>⏳</span>
                <p className="objective-text" style={styles.objectiveText}>Reduce waiting and scheduling conflicts</p>
              </div>

              <div className="objective objective-hover" style={styles.objectiveItem}>
                <span className="objective-icon" style={styles.objectiveIcon}>📊</span>
                <p className="objective-text" style={styles.objectiveText}>Track actual classroom usage accurately</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scope */}
        <div className="block block-hover" style={styles.block}>
          <div className="icon-box icon-hover" style={styles.iconBox}>🏫</div>
          <div className="content">
            <h2 style={styles.contentH2}>Scope of the System</h2>

            <div className="timeline" style={styles.timeline}>
              <div className="timeline-item" style={styles.timelineItem}>
                <p style={styles.timelineText}>Designed specifically for the MCA department</p>
              </div>

              <div className="timeline-item" style={styles.timelineItem}>
                <p style={styles.timelineText}>Supports lecturers and administrators</p>
              </div>

              <div className="timeline-item" style={styles.timelineItem}>
                <p style={styles.timelineText}>Maintains long-term class usage history</p>
              </div>

              <div className="timeline-item" style={styles.timelineItem}>
                <p style={styles.timelineText}>Improves transparency and planning efficiency</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;