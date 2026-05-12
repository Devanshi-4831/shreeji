import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Package, Briefcase, Users, Coffee, LayoutDashboard } from 'lucide-react';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setSidebarOpen(o => !o);
  const close = () => setSidebarOpen(false);

  const handleLogout = () => {
    close();
    navigate('/login');
  };

  const navItems = [
    // { label: 'Dashboard',  to: '/dashboard', Icon: LayoutDashboard },


    { label: 'Party & Meal Data', to: '/party-meal', Icon: Users },
    { label: 'Stock Data', to: '/stock', Icon: Package },
    { label: 'Job Management', to: '/job', Icon: Briefcase },
  ];

  return (
    <>
      {/* ─── HEADER ─── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: 'var(--header-height)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.5rem',
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        {/* Logo */}
        <NavLink to="/" style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--primary)', textDecoration: 'none' }}>
          Shreeji ERP
        </NavLink>

        {/* Desktop nav — hidden below 768 px */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
          className="desktop-nav">
          {navItems.map(({ label, to }) => (
            <NavLink key={to} to={to}
              style={({ isActive }) => ({
                fontWeight: 500, fontSize: '0.95rem', padding: '0.4rem 0',
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                textDecoration: 'none', transition: 'color .2s, border-color .2s',
              })}>
              {label}
            </NavLink>
          ))}

          {/* profile / logout */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border-color)'
          }}>
            <NavLink to="/profile"
              style={({ isActive }) => ({ color: isActive ? 'var(--primary)' : 'var(--text-muted)', display: 'flex' })}
              title="Profile">
              <User size={20} />
            </NavLink>
            <button onClick={handleLogout} title="Logout"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
              <LogOut size={20} />
            </button>
          </div>
        </nav>

        {/* Hamburger — visible below 768 px */}
        <button onClick={toggle} className="hamburger-btn"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', display: 'none' }}>
          {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* ─── MOBILE SIDEBAR OVERLAY ─── */}
      {sidebarOpen && (
        <div onClick={close} style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)',
        }} />
      )}

      {/* ─── MOBILE SIDEBAR ─── */}
      <aside style={{
        position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 100,
        width: 280, background: 'var(--surface)',
        boxShadow: 'var(--shadow-lg)',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform .3s cubic-bezier(.4,0,.2,1)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          height: 'var(--header-height)', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 1.5rem',
          borderBottom: '1px solid var(--border-color)',
        }}>
          <span style={{ fontWeight: 700, color: 'var(--primary)' }}>Shreeji ERP</span>
          <button onClick={close}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <nav style={{ padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
          {navItems.map(({ label, to, Icon }) => (
            <NavLink key={to} to={to} onClick={close}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                fontWeight: 500, textDecoration: 'none',
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                background: isActive ? 'rgba(79,70,229,0.08)' : 'transparent',
                transition: 'all .2s',
              })}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}

          <div style={{ margin: '1rem 0', borderTop: '1px solid var(--border-color)' }} />

          <NavLink to="/profile" onClick={close}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
              fontWeight: 500, textDecoration: 'none',
              color: isActive ? 'var(--primary)' : 'var(--text-muted)',
              background: isActive ? 'rgba(79,70,229,0.08)' : 'transparent',
            })}>
            <User size={18} /> Company Profile
          </NavLink>

          <button onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
              fontWeight: 500, color: '#EF4444', background: 'none',
              border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', fontSize: '1rem',
            }}>
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* ─── PAGE CONTENT ─── */}
      <main style={{
        paddingTop: 'calc(var(--header-height) + 1.2rem)',
        paddingLeft: '1rem', paddingRight: '1rem', paddingBottom: '2rem',
        maxWidth: '100%', margin: '0',
      }}>
        <Outlet />
      </main>

      {/* Responsive CSS injected here */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          main { padding-left: 1rem !important; padding-right: 1rem !important; }
        }
      `}</style>
    </>
  );
};

export default AppLayout;
