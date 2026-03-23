import React from 'react';

// 🔥 FIX: Import images from the root 'images' folder
// We use '../' to go up from 'src/components' to the root, then into 'images'
import bgImage from '../images/project.jpeg';
import scheduleImage from '../images/Classroom Schedule.png'; 

const Home = () => {
  const styles = {
    root: {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
      background: 'radial-gradient(circle at top, #e0e7ff, #ffffff 60%)',
      color: '#1e293b',
      overflowX: 'hidden',
      width: '100%',
      minHeight: '100vh',
    },

    /* NAVBAR */
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '18px 60px',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    logo: {
      margin: 0,
      color: '#1e3a8a',
    },
    navLinks: {
      display: 'flex',
      gap: '30px',
      alignItems: 'center',
    },
    navLink: {
      textDecoration: 'none',
      fontWeight: 600,
      color: '#334155',
    },
    loginBtn: {
      padding: '10px 20px',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, #2563eb, #1e3a8a)',
      color: 'white',
      textDecoration: 'none',
    },
    registerBtn: {
      padding: '10px 20px',
      borderRadius: '10px',
      border: '2px solid #2563eb',
      color: '#2563eb',
      textDecoration: 'none',
      background: 'transparent',
    },

    /* HERO WITH BACKGROUND IMAGE */
    hero: {
      position: 'relative',
      padding: '100px 80px',
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: '60px',
      borderRadius: '20px',
      margin: '20px',
      overflow: 'hidden',

      /* 🔥 UPDATED: Use the imported variable for the background */
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },

    /* OVERLAY */
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(3px)',
      zIndex: 1,
    },

    heroContent: {
      position: 'relative',
      zIndex: 2,
    },

    heroH1: {
      fontSize: '52px',
      color: '#1e3a8a',
      marginBottom: '20px',
      lineHeight: 1.2,
    },
    heroP: {
      fontSize: '16px',
      lineHeight: 1.8,
      color: '#475569',
      marginBottom: '32px',
      maxWidth: '500px',
    },
    heroBtn: {
      padding: '12px 28px',
      background: '#2563eb',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '10px',
      fontWeight: 600,
    },

    heroImage: {
      width: '100%',
      borderRadius: '20px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
      position: 'relative',
      zIndex: 2,
    },

    /* STRIP */
    strip: {
      margin: '80px auto',
      maxWidth: '1100px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '26px',
      padding: '0 30px',
    },
    stripBox: {
      background: '#fff',
      padding: '30px',
      borderRadius: '20px',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
    stripH2: {
      color: '#2563eb',
    },
  };

  return (
    <div style={styles.root}>

      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>Smart Classroom</h2>
        <div style={styles.navLinks}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/features" style={styles.navLink}>Features</a>
          <a href="/about" style={styles.navLink}>About</a>
          <a href="/register" style={styles.registerBtn}>Register</a>
          <a href="/login" style={styles.loginBtn}>Login</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.overlay}></div>

        <div style={styles.heroContent}>
          <h1 style={styles.heroH1}>
            Class Room Scheduling<br />
            And Availability System
          </h1>

          <p style={styles.heroP}>
            A modern, real-time classroom scheduling platform that prevents conflicts,
            tracks usage intelligently, and gives administrators full control.
          </p>

          <a href="/login" style={styles.heroBtn}>Get Started</a>
        </div>

        <div style={styles.heroContent}>
          {/* 🔥 UPDATED: Use the imported variable for the image tag */}
          <img 
            src={scheduleImage}
            alt="System"
            style={styles.heroImage}
          />
        </div>
      </section>

      {/* STRIP */}
      <section style={styles.strip}>
        <div style={styles.stripBox}>
          <h2 style={styles.stripH2}>0%</h2>
          <p>Scheduling Conflicts</p>
        </div>

        <div style={styles.stripBox}>
          <h2 style={styles.stripH2}>100%</h2>
          <p>Utilization Tracking</p>
        </div>

        <div style={styles.stripBox}>
          <h2 style={styles.stripH2}>BCA & MCA</h2>
          <p>Department Focused</p>
        </div>
      </section>

    </div>
  );
};

export default Home;
