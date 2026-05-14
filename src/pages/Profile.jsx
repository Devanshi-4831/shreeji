import { useState, useRef } from 'react';
import {
  Save, Building2, Phone, Mail, MapPin, Hash,
  Camera, CheckCircle2, RefreshCcw, Lock, Eye, EyeOff, ShieldCheck, KeyRound
} from 'lucide-react';

/* ─────────────────── helpers ─────────────────── */
const inputStyle = {
  width: '100%',
  padding: '0.65rem 1rem 0.65rem 2.75rem',
  border: '1px solid var(--border-color)',
  borderRadius: 'var(--radius-md)',
  background: 'var(--bg-color)',
  color: 'var(--text-main)',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color .2s',
};

const iconStyle = {
  position: 'absolute', left: '1rem', top: '50%',
  transform: 'translateY(-50%)', color: 'var(--text-muted)',
};

const labelStyle = {
  display: 'block', marginBottom: '0.4rem',
  fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.8rem',
};

/* ─────────────────── component ─────────────────── */
const Profile = () => {
  const [activeTab, setActiveTab] = useState('company'); // 'company' | 'password'

  /* ── Company Details state ── */
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [profileData, setProfileData] = useState({
    name: 'Shreeji Print Pack',
    email: 'info70@unrietrading.com',
    phone: '6754345678',
    gst: '24ABCDE1234F1Z5',
    address: '21, Silver Plaza, Station Road, Bhavnagar – 364001, Gujarat, India.',
  });

  const saveProfile = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const resetProfile = () =>
    setProfileData({ name: 'Shreeji Print Pack', email: 'info70@unrietrading.com', phone: '6754345678', gst: '24ABCDE1234F1Z5', address: '21, Silver Plaza, Station Road, Bhavnagar – 364001, Gujarat, India.' });

  /* ── Reset Password state ── */
  const [pwData, setPwData] = useState({ current: '', newPw: '', confirm: '' });
  const [show, setShow] = useState({ current: false, newPw: false, confirm: false });
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState('');

  const strength = (pw) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = ['', '#EF4444', '#F59E0B', '#3B82F6', '#10B981'];
  const pw_strength = strength(pwData.newPw);

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setPwError('');
    if (!pwData.current) return setPwError('Current password is required.');
    if (pwData.newPw.length < 8) return setPwError('New password must be at least 8 characters.');
    if (pwData.newPw !== pwData.confirm) return setPwError('Passwords do not match.');
    setPwSaved(true);
    setPwData({ current: '', newPw: '', confirm: '' });
    setTimeout(() => setPwSaved(false), 3500);
  };

  const toggle = (field) => setShow(s => ({ ...s, [field]: !s[field] }));

  const tabBtn = (id, label, Icon) => {
    const active = activeTab === id;
    return (
      <button
        key={id}
        onClick={() => setActiveTab(id)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.65rem 1.4rem',
          borderRadius: 'var(--radius-md)',
          border: active ? '1.5px solid var(--primary)' : '1.5px solid transparent',
          background: active ? 'rgba(var(--primary-rgb,99,102,241),.08)' : 'transparent',
          color: active ? 'var(--primary)' : 'var(--text-muted)',
          fontWeight: active ? 700 : 500,
          fontSize: '0.9rem',
          cursor: 'pointer',
          transition: 'all .2s',
        }}
      >
        <Icon size={16} />
        {label}
      </button>
    );
  };

  return (
    <div style={{ animation: 'fadeIn .4s ease' }}>
      {/* ── Page header ── */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          <span>Settings</span><span>/</span>
          <span style={{ color: 'var(--text-main)' }}>Company Profile</span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Company Profile</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.2rem', fontSize: '0.9rem' }}>
          Manage your business identity and account security.
        </p>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
        {tabBtn('company', 'Company Details', Building2)}
        {tabBtn('password', 'Reset Password', KeyRound)}
      </div>

      {/* ═══════════════════ COMPANY DETAILS TAB ═══════════════════ */}
      {activeTab === 'company' && (
        <form onSubmit={saveProfile} style={{
          background: 'var(--surface)', border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>

            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { label: 'Company Name *', key: 'name', Icon: Building2, type: 'text' },
                { label: 'Email *', key: 'email', Icon: Mail, type: 'email' },
                { label: 'Mobile No. *', key: 'phone', Icon: Phone, type: 'text' },
                { label: 'GST No. *', key: 'gst', Icon: Hash, type: 'text' },
              ].map(({ label, key, Icon, type }) => (
                <div key={key}>
                  <label style={labelStyle}>{label}</label>
                  <div style={{ position: 'relative' }}>
                    <Icon size={16} style={iconStyle} />
                    <input
                      type={type}
                      value={profileData[key]}
                      onChange={e => setProfileData({ ...profileData, [key]: e.target.value })}
                      required
                      style={inputStyle}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Address *</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} style={{ ...iconStyle, top: '1.1rem', transform: 'none' }} />
                  <textarea
                    value={profileData.address}
                    onChange={e => setProfileData({ ...profileData, address: e.target.value })}
                    required rows={3}
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                </div>
              </div>

              {/* Logo upload */}
              <div>
                <label style={labelStyle}>Upload Logo <span style={{ color: '#EF4444' }}>*</span></label>
                <div
                  onClick={() => fileInputRef.current.click()}
                  style={{
                    border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)',
                    padding: logoPreview ? '0.5rem' : '1.5rem', textAlign: 'center', cursor: 'pointer',
                    background: 'var(--bg-color)', transition: 'all .2s',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    minHeight: '120px',
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                >
                  {logoPreview
                    ? <img src={logoPreview} alt="Logo Preview" style={{ maxWidth: '100%', maxHeight: '100px', borderRadius: 'var(--radius-sm)' }} />
                    : <>
                        <Camera size={24} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Click to choose logo</div>
                      </>
                  }
                  <input
                    type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setLogoPreview(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: logoPreview ? '#10B981' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={14} /> {logoPreview ? 'Logo selected' : 'No logo uploaded'}
                </div>
              </div>
            </div>
          </div>

          {/* Action bar */}
          <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem' }}>
            {saved && <div style={{ color: '#10B981', fontWeight: 600, fontSize: '0.85rem' }}>Profile updated successfully!</div>}
            <button type="button" onClick={resetProfile} style={{ padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <RefreshCcw size={16} /> Reset
            </button>
            <button type="submit" style={{ padding: '0.6rem 2rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
              <Save size={15} style={{ display: 'inline', marginRight: '0.4rem', verticalAlign: 'middle' }} />
              Save Details
            </button>
          </div>
        </form>
      )}

      {/* ═══════════════════ RESET PASSWORD TAB ═══════════════════ */}
      {activeTab === 'password' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>

          {/* Form card */}
          <form onSubmit={handlePasswordReset} style={{
            background: 'var(--surface)', border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(var(--primary-rgb,99,102,241),.12)', borderRadius: '50%', padding: '0.5rem', display: 'flex' }}>
                <Lock size={18} style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>Change Password</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Keep your account secure</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* Current password */}
              <PasswordField
                label="Current Password"
                id="current"
                value={pwData.current}
                visible={show.current}
                onChange={v => setPwData(p => ({ ...p, current: v }))}
                onToggle={() => toggle('current')}
              />

              {/* New password */}
              <PasswordField
                label="New Password"
                id="newPw"
                value={pwData.newPw}
                visible={show.newPw}
                onChange={v => setPwData(p => ({ ...p, newPw: v }))}
                onToggle={() => toggle('newPw')}
              />

              {/* Strength bar */}
              {pwData.newPw && (
                <div style={{ marginTop: '-0.5rem' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '0.3rem' }}>
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} style={{
                        flex: 1, height: '4px', borderRadius: '2px',
                        background: i <= pw_strength ? strengthColor[pw_strength] : 'var(--border-color)',
                        transition: 'background .3s',
                      }} />
                    ))}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: strengthColor[pw_strength], fontWeight: 600 }}>
                    {strengthLabel[pw_strength]}
                  </div>
                </div>
              )}

              {/* Confirm password */}
              <PasswordField
                label="Confirm New Password"
                id="confirm"
                value={pwData.confirm}
                visible={show.confirm}
                onChange={v => setPwData(p => ({ ...p, confirm: v }))}
                onToggle={() => toggle('confirm')}
                mismatch={pwData.confirm && pwData.newPw !== pwData.confirm}
              />
            </div>

            {/* Error */}
            {pwError && (
              <div style={{ marginTop: '1rem', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.25)', color: '#EF4444', fontSize: '0.85rem', fontWeight: 500 }}>
                {pwError}
              </div>
            )}

            {/* Success */}
            {pwSaved && (
              <div style={{ marginTop: '1rem', padding: '0.65rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(16,185,129,.08)', border: '1px solid rgba(16,185,129,.25)', color: '#10B981', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={16} /> Password updated successfully!
              </div>
            )}

            {/* Buttons */}
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => { setPwData({ current: '', newPw: '', confirm: '' }); setPwError(''); }} style={{ padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
                Clear
              </button>
              <button type="submit" style={{ padding: '0.6rem 1.75rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <ShieldCheck size={16} /> Update Password
              </button>
            </div>
          </form>

          {/* Tips card */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <KeyRound size={16} style={{ color: 'var(--primary)' }} /> Password Requirements
            </div>
            {[
              { text: 'At least 8 characters long', met: pwData.newPw.length >= 8 },
              { text: 'At least one uppercase letter', met: /[A-Z]/.test(pwData.newPw) },
              { text: 'At least one number', met: /[0-9]/.test(pwData.newPw) },
              { text: 'At least one special character (!@#$…)', met: /[^A-Za-z0-9]/.test(pwData.newPw) },
              { text: 'Passwords match', met: pwData.confirm && pwData.newPw === pwData.confirm },
            ].map(({ text, met }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.65rem', fontSize: '0.85rem', color: met ? '#10B981' : 'var(--text-muted)', transition: 'color .3s' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: met ? 'rgba(16,185,129,.15)' : 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background .3s' }}>
                  {met
                    ? <CheckCircle2 size={12} style={{ color: '#10B981' }} />
                    : <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)', display: 'block' }} />
                  }
                </div>
                {text}
              </div>
            ))}

            <div style={{ marginTop: '1.5rem', padding: '0.85rem', borderRadius: 'var(--radius-md)', background: 'rgba(var(--primary-rgb,99,102,241),.06)', border: '1px solid rgba(var(--primary-rgb,99,102,241),.12)', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              💡 <strong style={{ color: 'var(--text-main)' }}>Tip:</strong> Use a mix of letters, numbers, and symbols to create a strong password. Avoid using personal information.
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
        input:focus, textarea:focus { border-color: var(--primary) !important; box-shadow: 0 0 0 3px rgba(var(--primary-rgb,99,102,241),.12); }
      `}</style>
    </div>
  );
};

/* ─────────────────── PasswordField sub-component ─────────────────── */
const PasswordField = ({ label, id, value, visible, onChange, onToggle, mismatch }) => (
  <div>
    <label htmlFor={id} style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete="new-password"
        style={{
          width: '100%',
          padding: '0.65rem 2.75rem 0.65rem 2.75rem',
          border: `1px solid ${mismatch ? '#EF4444' : 'var(--border-color)'}`,
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-color)',
          color: 'var(--text-main)',
          fontSize: '0.9rem',
          outline: 'none',
          transition: 'border-color .2s',
        }}
      />
      <button
        type="button"
        onClick={onToggle}
        style={{ position: 'absolute', right: '0.9rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
        tabIndex={-1}
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
    {mismatch && <div style={{ marginTop: '0.3rem', fontSize: '0.78rem', color: '#EF4444' }}>Passwords do not match</div>}
  </div>
);

export default Profile;
