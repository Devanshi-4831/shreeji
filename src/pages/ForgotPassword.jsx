import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ShieldCheck, Lock, ChevronLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(prev => prev + 1);
    }, 1000);
  };

  const containerStyle = {
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '1rem', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    fontFamily: 'var(--font-main)'
  };

  const cardStyle = {
    width: '100%', maxWidth: 440,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 'var(--radius-xl)',
    padding: '3rem 2.5rem',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
    animation: 'fadeIn .5s ease',
  };

  const inputStyle = {
    width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem',
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 'var(--radius-md)', color: '#fff', fontSize: '1rem',
    outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s'
  };

  const buttonStyle = {
    width: '100%', padding: '1rem',
    background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
    border: 'none', borderRadius: 'var(--radius-md)',
    color: '#fff', fontWeight: 800, fontSize: '1rem', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
    boxShadow: '0 8px 25px rgba(99,102,241,0.4)',
    transition: 'all 0.3s', marginTop: '1.5rem'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {step < 4 && (
          <Link to="/login" style={{ 
            display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.5)', 
            textDecoration: 'none', fontSize: '0.9rem', marginBottom: '2rem', transition: 'color .2s' 
          }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
            <ChevronLeft size={18} /> Back to Login
          </Link>
        )}

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: 60, height: 60, borderRadius: '15px',
            background: 'rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem', color: '#818CF8',
          }}>
            {step === 1 && <Mail size={30} />}
            {step === 2 && <ShieldCheck size={30} />}
            {step === 3 && <Lock size={30} />}
            {step === 4 && <CheckCircle2 size={30} color="#10B981" />}
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
            {step === 1 && 'Forgot Password'}
            {step === 2 && 'Email Verification'}
            {step === 3 && 'New Password'}
            {step === 4 && 'Password Reset!'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            {step === 1 && 'Enter your email to receive a reset code.'}
            {step === 2 && `We've sent a 6-digit code to your email.`}
            {step === 3 && 'Choose a strong password for your account.'}
            {step === 4 && 'Your password has been updated successfully.'}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handleNext}>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
              <input 
                type="email" required placeholder="admin@shreeji.com" value={email} onChange={e => setEmail(e.target.value)}
                style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              />
            </div>
            <button type="submit" disabled={loading} style={buttonStyle}>
              {loading ? 'Sending...' : <><ArrowRight size={20} /> Continue</>}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNext}>
            <div style={{ position: 'relative' }}>
              <ShieldCheck size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
              <input 
                type="text" required maxLength={6} placeholder="Enter 6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)}
                style={{ ...inputStyle, textAlign: 'center', letterSpacing: '0.5em', paddingLeft: '1rem' }}
              />
            </div>
            <button type="submit" disabled={loading} style={buttonStyle}>
              {loading ? 'Verifying...' : 'OTP Verification'}
            </button>
            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>
              Didn't receive code? <span style={{ color: '#818CF8', cursor: 'pointer', fontWeight: 600 }}>Resend OTP</span>
            </p>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleNext}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                <input 
                  type="password" required placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                <input 
                  type="password" required placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
            <button type="submit" disabled={loading} style={buttonStyle}>
              {loading ? 'Updating...' : 'Reset Password Button'}
            </button>
          </form>
        )}

        {step === 4 && (
          <button onClick={() => navigate('/login')} style={buttonStyle}>
            Back to Login
          </button>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
