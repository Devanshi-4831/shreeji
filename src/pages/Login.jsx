import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    // Dummy credentials — use admin@shreeji.com / admin123 or any non-empty values
    if (password.length < 4) { setError('Password must be at least 4 characters.'); return; }
    setError('');
    navigate('/party-meal');
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      fontFamily: 'var(--font-main)'
    }}>
      <div style={{
        width: '100%', maxWidth: 420,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        padding: '3rem 2.5rem',
        backdropFilter: 'blur(20px)',
        animation: 'fadeIn .5s ease',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: 70, height: 70, borderRadius: '20px',
            background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem', fontSize: '2rem', fontWeight: 900, color: '#fff',
            boxShadow: '0 10px 25px rgba(99,102,241,0.5)',
            transform: 'rotate(-5deg)'
          }}>S</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Shreeji ERP</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Welcome back! Please sign in.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              padding: '0.85rem 1rem', marginBottom: '1.5rem',
              background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 'var(--radius-md)', color: '#FCA5A5', fontSize: '0.85rem',
              textAlign: 'center'
            }}>{error}</div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="admin@shreeji.com"
                style={{
                  width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 'var(--radius-md)', color: '#fff', fontSize: '1rem',
                  outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s'
                }} 
                onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.6)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
              <input type={showPwd ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '0.85rem 3.5rem 0.85rem 2.75rem',
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 'var(--radius-md)', color: '#fff', fontSize: '1rem',
                  outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s'
                }} 
                onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.6)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
              />
              <button type="button" onClick={() => setShowPwd(v => !v)}
                style={{
                  position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)',
                  display: 'flex', alignItems: 'center'
                }}>
                {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} style={{ cursor: 'pointer' }} />
              Remember Me
            </label>
            <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: '#818CF8', fontWeight: 600, textDecoration: 'none' }}>
              Forgot password?
            </Link>
          </div>

          <button type="submit" style={{
            width: '100%', padding: '1rem',
            background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
            border: 'none', borderRadius: 'var(--radius-md)',
            color: '#fff', fontWeight: 800, fontSize: '1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
            boxShadow: '0 8px 25px rgba(99,102,241,0.4)',
            transition: 'all 0.3s',
          }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
             onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <LogIn size={20} /> Login Button
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
      `}</style>
    </div>
  );
};

export default Login;
