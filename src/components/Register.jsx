import React, { useState } from 'react';
// Import the Cognito SDK
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser
} from 'amazon-cognito-identity-js';

const Register = () => {
  // --- CONFIGURATION ---
  const poolData = {
    UserPoolId: "ap-south-1_3dmdxoHmC", 
    ClientId: "6dg6tg65ps5h7athtieq2vfh8e"
  };
  
  const userPool = new CognitoUserPool(poolData);

  // --- STATE ---
  // Step 1: Registration Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Step 2: Verification Data
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState(''); // Store email to verify
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 1. Handle Registration Request
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const attributeList = [];

    // Define attributes
    const emailAttribute = new CognitoUserAttribute({
      Name: 'email',
      Value: formData.email
    });

    const nameAttribute = new CognitoUserAttribute({
      Name: 'name',
      Value: formData.name
    });

    attributeList.push(emailAttribute);
    attributeList.push(nameAttribute);

    userPool.signUp(
      formData.email,
      formData.password,
      attributeList,
      null,
      (err, result) => {
        setLoading(false);
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }

        // SUCCESS: Switch to OTP step
        setRegisteredEmail(formData.email);
        setIsVerificationStep(true);
        alert("✅ Registration initiated! Please check your email for the OTP.");
        console.log('User registration result:', result.user);
      }
    );
  };

  // 2. Handle OTP Verification
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const userData = {
      Username: registeredEmail,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(otpCode, true, (err, result) => {
      setLoading(false);
      if (err) {
        alert("❌ Invalid OTP: " + (err.message || JSON.stringify(err)));
        return;
      }
      
      // FINAL SUCCESS
      alert("✅ Account verified successfully! You can now login.");
      console.log('Confirmation result:', result);
      
      // Optional: Reset form or redirect
      // window.location.href = '/login'; 
    });
  };

  // --- STYLES ---
  const styles = {
    root: {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      fontFamily: '"Segoe UI", system-ui, sans-serif',
      background: 'radial-gradient(circle at top, #e0e7ff, #ffffff 60%)',
      color: '#1e293b',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflowX: 'hidden',
    },
    bgBlob: {
      position: 'absolute',
      width: '500px',
      height: '500px',
      background: 'linear-gradient(135deg, #2563eb, #60a5fa)',
      borderRadius: '50%',
      filter: 'blur(100px)',
      top: '-100px',
      right: '-100px',
      zIndex: -1,
      opacity: 0.6,
      pointerEvents: 'none',
    },
    container: {
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '24px',
      padding: '50px 40px',
      width: '100%',
      maxWidth: '420px',
      boxShadow: '0 20px 50px rgba(30, 58, 138, 0.15)',
      textAlign: 'center',
    },
    h2: {
      color: '#1e3a8a',
      marginBottom: '10px',
      fontSize: '28px',
    },
    p: {
      color: '#64748b',
      marginBottom: '30px',
      fontSize: '14px',
    },
    otpMessage: {
      color: '#2563eb',
      marginBottom: '25px',
      fontSize: '14px',
      background: '#eff6ff',
      padding: '10px',
      borderRadius: '8px',
    },
    formGroup: {
      marginBottom: '20px',
      textAlign: 'left',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: 600,
      color: '#334155',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      fontSize: '15px',
      fontFamily: 'inherit',
      transition: 'all 0.3s ease',
      outline: 'none',
      background: 'rgba(255, 255, 255, 0.8)',
      boxSizing: 'border-box',
    },
    submitBtn: {
      width: '100%',
      padding: '14px',
      border: 'none',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #2563eb, #1e3a8a)',
      color: 'white',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      marginTop: '10px',
    },
    backLink: {
      display: 'inline-block',
      marginTop: '25px',
      textDecoration: 'none',
      color: '#64748b',
      fontSize: '14px',
      fontWeight: 500,
      transition: 'color 0.2s',
    }
  };

  return (
    <div style={styles.root}>
      <style>{`
        * { box-sizing: border-box; }
        .input-focus:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }
        .btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.3);
        }
        .link-hover:hover {
          color: #2563eb;
        }
        @media (max-width: 480px) {
          .container-responsive { padding: 40px 25px; }
        }
      `}</style>

      <div style={styles.bgBlob}></div>

      <div className="container container-responsive" style={styles.container}>
        
        {/* --- STEP 1: REGISTRATION FORM --- */}
        {!isVerificationStep ? (
          <>
            <h2 style={styles.h2}>Create Account</h2>
            <p style={styles.p}>Join Smart Classroom to schedule your rooms.</p>

            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="name">Full Name</label>
                <input
                  style={styles.input}
                  className="input-focus"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="email">Email Address</label>
                <input
                  style={styles.input}
                  className="input-focus"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="password">Password</label>
                <input
                  style={styles.input}
                  className="input-focus"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-hover" style={styles.submitBtn} disabled={loading}>
                {loading ? 'Registering...' : 'Register Now'}
              </button>
            </form>
          </>
        ) : (
          
          /* --- STEP 2: VERIFICATION FORM --- */
          <>
            <h2 style={styles.h2}>Verify Account</h2>
            
            <div style={styles.otpMessage}>
              We sent a code to <strong>{registeredEmail}</strong>.<br/>
              Please enter it below to activate your account.
            </div>

            <form onSubmit={handleVerifyOtp}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="otp">Verification Code (OTP)</label>
                <input
                  style={styles.input}
                  className="input-focus"
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder="123456"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  required
                  maxLength={6}
                />
              </div>

              <button type="submit" className="btn-hover" style={styles.submitBtn} disabled={loading}>
                {loading ? 'Verifying...' : 'Verify & Create Account'}
              </button>
            </form>

            <button 
              onClick={() => setIsVerificationStep(false)} 
              style={{background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', marginTop: '15px', textDecoration: 'underline'}}
            >
              ← Back to Register
            </button>
          </>
        )}

        <a href="/" className="back-link link-hover" style={styles.backLink}>
          ← Back to Home
        </a>
      </div>
    </div>
  );
};

export default Register;