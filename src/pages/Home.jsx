import React from 'react';

const Home = () => {
  // --- CSS STYLES (Embedded directly in the component) ---
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
      transition: 'color 0.2s ease',
    },
    loginBtn: {
      padding: '10px 20px',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, #2563eb, #1e3a8a)',
      color: 'white !important',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      textDecoration: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    registerBtn: {
      padding: '10px 20px',
      borderRadius: '10px',
      border: '2px solid #2563eb',
      color: '#2563eb !important',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      background: 'transparent',
      cursor: 'pointer',
    },
    heroBg: {
      position: 'absolute',
      width: '600px',
      height: '600px',
      background: 'linear-gradient(135deg, #2563eb, #60a5fa)',
      borderRadius: '50%',
      filter: 'blur(120px)',
      top: '-200px',
      right: '-200px',
      zIndex: -1,
      pointerEvents: 'none',
    },
    hero: {
      padding: '90px 80px 40px',
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: '60px',
      borderRadius: '20px',
      position: 'relative',
      overflow: 'hidden',
    },
    heroLeft: {
      position: 'relative',
      zIndex: 1,
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
      display: 'inline-block',
      padding: '12px 28px',
      background: '#2563eb',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '10px',
      fontWeight: 600,
      transition: 'transform 0.2s',
    },
    heroRight: {
      position: 'relative',
      zIndex: 1,
    },
    heroImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '22px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
    },
    strip: {
      margin: '80px auto',
      maxWidth: '1100px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '26px',
      padding: '0 30px',
    },
    stripBox: {
      background: 'linear-gradient(180deg, #ffffff, #f8faff)',
      padding: '30px',
      borderRadius: '24px',
      textAlign: 'center',
      boxShadow: '0 18px 40px rgba(0,0,0,0.08)',
    },
    stripH2: {
      fontSize: '36px',
      color: '#2563eb',
      margin: '0 0 10px 0',
    },
    stripSpan: {
      color: '#64748b',
      fontWeight: 500,
    },
    // Responsive Styles (Applied via media queries in a style tag below for simplicity in "all-in-one" approach)
  };

  return (
    <div style={styles.root}>
      <style>{`
        /* Global Reset */
        * { box-sizing: border-box; }
        
        /* Hover Effects (defined in CSS string for cleaner hover pseudo-classes) */
        .nav-link:hover { color: #2563eb; }
        
        .btn-hover:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25); 
        }

        .register-btn:hover {
          background: #2563eb;
          color: white !important;
        }

        .hero-btn:hover {
          transform: translateY(-2px);
          background: #1e3a8a;
        }

        @media (max-width: 900px) {
          .navbar { flex-direction: column; gap: 12px; }
          .hero { grid-template-columns: 1fr; padding: 60px 30px; text-align: center; }
          .hero-p { margin: 0 auto 32px auto; }
          .strip { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar" style={styles.navbar}>
        <h2 className="logo" style={styles.logo}>Smart Classroom</h2>
        <div className="nav-links" style={styles.navLinks}>
          <a href="/" className="nav-link" style={styles.navLink}>Home</a>
          <a href="/features" className="nav-link" style={styles.navLink}>Features</a>
          <a href="/about" className="nav-link" style={styles.navLink}>About</a>
          
          <a href="/register" className="register-btn btn-hover" style={styles.registerBtn}>Register</a>
          <a href="/login" className="login-btn btn-hover" style={styles.loginBtn}>Login</a>
        </div>
      </nav>

      {/* Background Blob */}
      <div className="hero-bg" style={styles.heroBg}></div>

      {/* HERO SECTION */}
      <section className="hero" style={styles.hero}>
        <div className="hero-left" style={styles.heroLeft}>
          <h1 className="hero-h1" style={styles.heroH1}>
            Class Room Scheduling<br />
            And Availability System
          </h1>
          <p className="hero-p" style={styles.heroP}>
            A modern, real-time classroom scheduling platform that prevents conflicts,
            tracks usage intelligently, and gives administrators full control.
          </p>
          <a href="/login" className="hero-btn" style={styles.heroBtn}>Get Started</a>
        </div>

        <div className="hero-right" style={styles.heroRight}>
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="System Features" 
            style={styles.heroImage}
          />
        </div>
      </section>

      {/* STRIP SECTION */}
      <section className="strip" style={styles.strip}>
        <div className="strip-box" style={styles.stripBox}>
          <h2 className="strip-h2" style={styles.stripH2}>0%</h2>
          <span className="strip-span" style={styles.stripSpan}>Scheduling Conflicts</span>
        </div>
        <div className="strip-box" style={styles.stripBox}>
          <h2 className="strip-h2" style={styles.stripH2}>100%</h2>
          <span className="strip-span" style={styles.stripSpan}>Utilization Tracking</span>
        </div>
        <div className="strip-box" style={styles.stripBox}>
          <h2 className="strip-h2" style={styles.stripH2}>BCA & MCA</h2>
          <span className="strip-span" style={styles.stripSpan}>Department Focused</span>
        </div>
      </section>
    </div>
  );
};

export default Home;