import { useState, useRef } from 'react';
import {
  Save, Building2, Phone, Mail, MapPin, Hash,
  Globe, Camera, CheckCircle2, ShieldCheck, X, RefreshCcw
} from 'lucide-react';

const Profile = () => {
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [profileData, setProfileData] = useState({
    name: 'Shreeji Print Pack',
    email: 'info70@unrietrading.com',
    phone: '6754345678',
    gst: '24ABCDE1234F1Z5',
    address: '21, Silver Plaza, Station Road, Bhavnagar – 364001, Gujarat, India.'
  });

  const save = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const reset = () => {
    setProfileData({
      name: '', email: '', phone: '', gst: '', address: ''
    });
  };

  return (
    <div style={{ animation: 'fadeIn .4s ease' }}>
      <div style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Settings</span>
          <span>/</span>
          <span style={{ color: 'var(--text-main)' }}>Company Profile</span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Company Details</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.2rem', fontSize: '0.9rem' }}>
          Update your business identity and contact details.
        </p>
      </div>

      <form onSubmit={save} style={{
        background: 'var(--surface)', border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)',
        width: '100%'
      }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.8rem' }}>Company Name *</label>
              <div style={{ position: 'relative' }}>
                <Building2 size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="text" value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} required style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.8rem' }}>Email *</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="email" value={profileData.email} onChange={e => setProfileData({...profileData, email: e.target.value})} required style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.8rem' }}>Mobile No. *</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="text" value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} required style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.8rem' }}>GST No. *</label>
              <div style={{ position: 'relative' }}>
                <Hash size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input type="text" value={profileData.gst} onChange={e => setProfileData({...profileData, gst: e.target.value})} required style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
             <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.8rem' }}>Address *</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} style={{ position: 'absolute', left: '1rem', top: '1.1rem', color: 'var(--text-muted)' }} />
                <textarea value={profileData.address} onChange={e => setProfileData({...profileData, address: e.target.value})} required rows={3} style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem', resize: 'none' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                Upload Logo <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <div
                onClick={() => fileInputRef.current.click()}
                style={{
                  border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)',
                  padding: logoPreview ? '0.5rem' : '1.5rem', textAlign: 'center', cursor: 'pointer',
                  background: 'var(--bg-color)', transition: 'all .2s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  minHeight: '120px'
                }}
                onMouseOver={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" style={{ maxWidth: '100%', maxHeight: '100px', borderRadius: 'var(--radius-sm)' }} />
                ) : (
                  <>
                    <Camera size={24} style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }} />
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Click to choose logo</div>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setLogoPreview(reader.result);
                      };
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

        <div style={{
          marginTop: '2rem', paddingTop: '1.25rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem'
        }}>
          {saved && (
            <div style={{ color: '#10B981', fontWeight: 600, fontSize: '0.85rem' }}>
              Profile updated successfully!
            </div>
          )}
          <button type="button" onClick={() => setProfileData({name: 'Shreeji Print Pack', email: 'info70@unrietrading.com', phone: '6754345678', gst: '24ABCDE1234F1Z5', address: '21, Silver Plaza, Station Road, Bhavnagar – 364001, Gujarat, India.'})} style={{
            padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
            background: 'var(--bg-color)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer'
          }}>
            Cancel
          </button>
          <button type="button" onClick={reset} style={{
            padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
            background: 'var(--bg-color)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.4rem'
          }}>
            <RefreshCcw size={16} /> Reset
          </button>
          <button type="submit" style={{
            padding: '0.6rem 2rem', borderRadius: 'var(--radius-md)', border: 'none',
            background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)'
          }}>
            Save Details
          </button>
        </div>
      </form>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
      `}</style>
    </div>
  );
};

export default Profile;
