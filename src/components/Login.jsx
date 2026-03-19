import React, { useState } from 'react';
// 1. ADD THIS IMPORT
import { useNavigate } from 'react-router-dom';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const Login = () => {
  // 2. INITIALIZE NAVIGATE
  const navigate = useNavigate();

  // --- CONFIGURATION ---
  const poolData = {
    UserPoolId: "ap-south-1_3dmdxoHmC", 
    ClientId: "6dg6tg65ps5h7athtieq2vfh8e"
  };

  // --- STATE ---
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const userPool = new CognitoUserPool(poolData);

    const authenticationDetails = new AuthenticationDetails({
      Username: formData.email,
      Password: formData.password,
    });

    const userData = {
      Username: formData.email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log('✅ Access Token:', result.getAccessToken().getJwtToken());
        
        // Save token
        localStorage.setItem("accessToken", result.getAccessToken().getJwtToken());
        
        alert("Login Successful!");
        setLoading(false);

        // 3. NAVIGATE TO DASHBOARD
        navigate("/dashboard");
      },

      onFailure: (err) => {
        console.error(err);
        setError(err.message || "Login failed");
        setLoading(false);
      },

      newPasswordRequired: (userAttributes, requiredAttributes) => {
        console.log("New password required");
        // Handle password reset if needed
        setLoading(false);
      }
    });
  };

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  // --- STYLES (Same as before) ---
  const styles = {
    body: {
      margin: 0,
      fontFamily: '"Segoe UI", Tahoma, sans-serif',
      background: 'linear-gradient(135deg, #e8edff, #ffffff)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#1e293b',
    },
    wrapper: {
      display: 'flex',
      width: '900px',
      maxWidth: '95%',
      background: 'white',
      borderRadius: '22px',
      overflow: 'hidden',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)',
    },
    left: {
      flex: 1,
      background: 'linear-gradient(160deg, #1e3a8a, #2563eb)',
      color: 'white',
      padding: '60px 45px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    leftH1: {
      fontSize: '34px',
      marginBottom: '18px',
      margin: 0,
    },
    leftP: {
      fontSize: '15px',
      lineHeight: 1.7,
      margin: 0,
    },
    leftUl: {
      marginTop: '25px',
      paddingLeft: '20px',
    },
    leftLi: {
      marginBottom: '10px',
      fontSize: '14px',
    },
    right: {
      flex: 1,
      padding: '55px 45px',
    },
    rightH2: {
      fontSize: '28px',
      color: '#1e3a8a',
      margin: '0 0 5px 0',
    },
    rightSpan: {
      fontSize: '14px',
      color: '#64748b',
    },
    form: {
      marginTop: '35px',
    },
    formGroup: {
      marginBottom: '22px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      marginBottom: '6px',
      fontWeight: 600,
      color: '#334155',
    },
    input: {
      width: '100%',
      height: '46px',
      padding: '0 44px 0 14px',
      borderRadius: '10px',
      border: '1.8px solid #c7d2fe',
      fontSize: '14px',
      fontFamily: 'inherit',
      boxSizing: 'border-box',
      outline: 'none',
      transition: 'border-color 0.2s',
    },
    passwordWrapper: {
      position: 'relative',
    },
    eyeIcon: {
      position: 'absolute',
      right: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '20px',
      height: '20px',
      cursor: 'pointer',
      stroke: '#64748b',
      fill: 'none',
      strokeWidth: 2,
    },
    button: {
      width: '100%',
      padding: '14px',
      borderRadius: '12px',
      border: 'none',
      background: 'linear-gradient(135deg, #2563eb, #1e40af)',
      color: 'white',
      fontSize: '15px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'transform 0.2s',
      marginTop: '10px',
    },
    error: {
      marginTop: '15px',
      color: '#ef4444',
      fontSize: '14px',
      textAlign: 'center',
      minHeight: '20px',
    }
  };

  return (
    <div style={styles.body}>
      <style>{`
        .input-focus:focus {
          border-color: #2563eb !important;
        }
        .btn-hover:hover {
          transform: scale(1.02);
        }
        .eye-slash {
          display: block;
        }
        .eye-visible .eye-slash {
          display: none;
        }
        
        @media (max-width: 768px) {
          .wrapper-responsive { flex-direction: column; }
          .left-responsive { padding: 40px 30px; }
          .right-responsive { padding: 40px 30px; }
        }
      `}</style>

      <div className="wrapper wrapper-responsive" style={styles.wrapper}>
        
        {/* LEFT PANEL */}
        <div className="login-left left-responsive" style={styles.left}>
          <h1 style={styles.leftH1}>Classroom System</h1>
          <p style={styles.leftP}>Manage classroom schedules efficiently with real-time visibility.</p>
          <ul style={styles.leftUl}>
            <li style={styles.leftLi}>✔ Live classroom status</li>
            <li style={styles.leftLi}>✔ Accurate usage history</li>
            <li style={styles.leftLi}>✔ Admin & Lecturer access</li>
          </ul>
        </div>

        {/* RIGHT PANEL */}
        <div className="login-right right-responsive" style={styles.right}>
          <h2 style={styles.rightH2}>Login</h2>
          <span style={styles.rightSpan}>Access your dashboard</span>

          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                style={styles.input}
                className="input-focus"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordWrapper}>
                <input
                  style={styles.input}
                  className="input-focus"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <svg 
                  className={`eye-icon ${showPassword ? 'eye-visible' : ''}`} 
                  style={styles.eyeIcon} 
                  onClick={togglePassword} 
                  viewBox="0 0 24 24"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/>
                  <circle cx="12" cy="12" r="3"/>
                  <line className="eye-slash" x1="3" y1="21" x2="21" y2="3"/>
                </svg>
              </div>
            </div>

            <button type="submit" className="btn-hover" style={styles.button} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {error && <div style={styles.error}>{error}</div>}
        </div>

      </div>
    </div>
  );
};

export default Login;