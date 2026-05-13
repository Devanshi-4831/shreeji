import { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Package, Briefcase, Users, Coffee, LayoutDashboard, ChevronDown } from 'lucide-react';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggle = () => setSidebarOpen(o => !o);
  const close = () => setSidebarOpen(false);

  const handleLogout = () => {
    close();
    navigate('/login');
  };

  const navItems = [
    { 
      label: 'Party & Meal Data', 
      to: '/party-meal', 
      Icon: Users,
      subItems: [
        { label: 'Add Party', tab: 'add-party' },
        { label: 'Manage Parties', tab: 'manage-parties' },
        { label: 'Add Meal', tab: 'add-meal' },
        { label: 'Manage Meals', tab: 'manage-meals' },
        { label: 'Company Info', tab: 'company-details' },
      ]
    },
    { 
      label: 'Stock Data', 
      to: '/stock', 
      Icon: Package,
      subItems: [
        { label: 'Add Stock', tab: 'add' },
        { label: 'Manage Stock', tab: 'manage' },
        { label: 'Stock Report', tab: 'report' },
      ]
    },
    { 
      label: 'Job Management', 
      to: '/job', 
      Icon: Briefcase,
      subItems: [
        { label: 'Add Job', tab: 'add-job' },
        { label: 'Manage Jobs', tab: 'manage-jobs' },
      ]
    },
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
        <NavLink to="/party-meal" style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--primary)', textDecoration: 'none' }}>
          Shreeji ERP
        </NavLink>

        {/* Desktop nav — hidden below 768 px */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
          className="desktop-nav">
          {navItems.map((item) => (
            <div 
              key={item.to}
              onMouseEnter={() => setHoveredItem(item.to)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{ position: 'relative', height: 'var(--header-height)', display: 'flex', alignItems: 'center' }}
            >
              <NavLink to={item.to}
                style={({ isActive }) => ({
                  fontWeight: 500, fontSize: '0.95rem', padding: '0.4rem 0',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  borderBottom: (isActive || hoveredItem === item.to) ? '2px solid var(--primary)' : '2px solid transparent',
                  textDecoration: 'none', transition: 'color .2s, border-color .2s',
                  display: 'flex', alignItems: 'center', gap: '0.3rem'
                })}>
                {item.label}
                <ChevronDown size={14} style={{ opacity: 0.6, transform: hoveredItem === item.to ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </NavLink>

              {/* Dropdown */}
              {hoveredItem === item.to && (
                <div style={{
                  position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--surface)', border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)',
                  padding: '0.5rem', minWidth: '180px', zIndex: 60,
                  display: 'flex', flexDirection: 'column', gap: '2px',
                  animation: 'dropdownFade 0.2s ease-out'
                }}>
                  {item.subItems.map((sub) => (
                    <NavLink
                      key={sub.tab}
                      to={`${item.to}?tab=${sub.tab}`}
                      style={{
                        padding: '0.6rem 0.8rem', fontSize: '0.85rem', color: 'var(--text-muted)',
                        borderRadius: 'var(--radius-sm)', textDecoration: 'none', transition: 'all 0.2s',
                        background: location.search.includes(`tab=${sub.tab}`) && location.pathname === item.to ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                        fontWeight: location.search.includes(`tab=${sub.tab}`) && location.pathname === item.to ? 600 : 500
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(79, 70, 229, 0.05)';
                        e.target.style.color = 'var(--primary)';
                      }}
                      onMouseLeave={(e) => {
                        const isSelected = location.search.includes(`tab=${sub.tab}`) && location.pathname === item.to;
                        e.target.style.background = isSelected ? 'rgba(79, 70, 229, 0.08)' : 'transparent';
                        e.target.style.color = isSelected ? 'var(--primary)' : 'var(--text-muted)';
                      }}
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
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

        <nav style={{ padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1, overflowY: 'auto' }}>
          {navItems.map((item) => (
            <div key={item.to}>
              <NavLink to={item.to} onClick={close}
                style={({ isActive }) => ({
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                  fontWeight: 600, textDecoration: 'none',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  background: isActive ? 'rgba(79,70,229,0.08)' : 'transparent',
                  transition: 'all .2s',
                })}>
                <item.Icon size={18} /> {item.label}
              </NavLink>
              <div style={{ marginLeft: '2.5rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.1rem', borderLeft: '1px solid var(--border-color)' }}>
                {item.subItems.map(sub => (
                  <NavLink 
                    key={sub.tab} 
                    to={`${item.to}?tab=${sub.tab}`} 
                    onClick={close}
                    style={{
                      padding: '0.5rem 1rem', fontSize: '0.85rem', color: 'var(--text-muted)',
                      textDecoration: 'none', transition: 'all 0.2s',
                      fontWeight: location.search.includes(`tab=${sub.tab}`) && location.pathname === item.to ? 700 : 500,
                      color: location.search.includes(`tab=${sub.tab}`) && location.pathname === item.to ? 'var(--primary)' : 'var(--text-muted)',
                    }}
                  >
                    {sub.label}
                  </NavLink>
                ))}
              </div>
            </div>
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
        @keyframes dropdownFade {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  );
};

export default AppLayout;

