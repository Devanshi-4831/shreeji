import { useState } from 'react';
import {
  Briefcase, Plus, Search, Filter, FileText,
  Calendar, CheckCircle2, Clock, AlertCircle,
  Edit, Trash2, ChevronLeft, ChevronRight, X,
  Save, RefreshCcw, LayoutList, BarChart3, Eye
} from 'lucide-react';

const JobData = () => {
  const [activeTab, setActiveTab] = useState('manage'); // 'add', 'manage', 'report'
  const [search, setSearch] = useState('');

  const mockJobs = [
    { id: 'JOB-482', party: 'Acme Corp', meal: 'A', gsm: 80, size: '60*90', req: 5000, used: 5000, remaining: 0, nxr: 'NXR-001', status: 'Completed', date: '2026-05-10' },
    { id: 'JOB-483', party: 'Global Tech', meal: 'B', gsm: 100, size: '70*100', req: 12000, used: 8000, remaining: 4000, nxr: 'No NXR', status: 'In Progress', date: '2026-05-15' },
  ];

  const renderAddJob = () => (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
        {[
          { label: 'Party Name *', placeholder: 'Select party', width: '300px', required: true },
          { label: 'Meal Name *', placeholder: 'Select meal', width: '250px', required: true },
          { label: 'Job Name *', placeholder: 'Enter job title', width: '350px', required: true },
          { label: 'GSM *', placeholder: '80', width: '120px', required: true },
          { label: 'Paper Size *', placeholder: 'e.g. 60*90', width: '180px', required: true },
          { label: 'Required Sheets *', placeholder: '0', width: '180px', required: true },
          { label: 'Available Stock', placeholder: 'Calculated...', width: '180px', disabled: true },
          { label: 'NXR No', placeholder: 'NXR-000', width: '180px' },
          { label: 'Delivery Date *', type: 'date', width: '180px', required: true },
          { label: 'Job Status *', type: 'select', options: ['Pending', 'In Progress', 'Completed'], width: '180px', required: true },
          { label: 'Notes', placeholder: 'Special instructions...', full: true, type: 'textarea' },
        ].map((f, i) => (
          <div key={i} style={{ width: f.full ? '100%' : f.width || 'auto' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>{f.label}</label>
            {f.type === 'select' ? (
              <select
                required={f.required}
                style={{
                  width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem'
                }}>
                {f.options.map(o => <option key={o}>{o}</option>)}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea rows={3} placeholder={f.placeholder} style={{
                width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', resize: 'none', fontSize: '0.9rem'
              }} />
            ) : (
              <input
                type={f.type || 'text'} placeholder={f.placeholder} disabled={f.disabled} required={f.required}
                style={{
                  width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)', background: f.disabled ? 'var(--border-color)' : 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem'
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button style={{
          padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
          background: 'var(--bg-color)', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem',
          display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
          <RefreshCcw size={18} /> Reset
        </button>
        <button style={{
          padding: '0.6rem 2rem', borderRadius: 'var(--radius-md)', border: 'none',
          background: 'var(--primary)', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem',
          display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
          <Save size={18} /> Save Job
        </button>
      </div>
    </div>
  );

  const renderManageJobs = () => (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden'
    }}>
      <div style={{ padding: '0.5rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(79, 70, 229, 0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <LayoutList size={20} style={{ color: 'var(--primary)' }} />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Job Records</h2>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text" placeholder="Search jobs by ID or party..."
              style={{
                width: '100%', padding: '0.55rem 1rem 0.55rem 2.5rem', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.85rem'
              }}
            />
          </div>
          <select style={{ padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#fff', fontSize: '0.85rem', color: 'var(--text-main)' }}>
            <option>All Parties</option>
          </select>
          <select style={{ padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#fff', fontSize: '0.85rem', color: 'var(--text-main)' }}>
            <option>All Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <button style={{ padding: '0.55rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#fff', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <Calendar size={14} /> Filter
          </button>
        </div>
      </div>
      <div className="stock-table-container" style={{ overflowX: 'auto' }}>
        <table className="stock-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
              {['Job ID', 'Party', 'Meal', 'GSM', 'Size', 'Required', 'Used', 'Remaining', 'Status', 'Delivery', 'Actions'].map(h => (
                <th key={h} style={{ padding: '0.6rem 0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', whiteSpace: 'nowrap', width: 'auto' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockJobs.map(j => (
              <tr key={j.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.6rem 0.75rem', fontWeight: 700, whiteSpace: 'nowrap' }}>{j.id}</td>
                <td style={{ padding: '0.6rem 0.75rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{j.party}</td>
                <td style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap' }}>{j.meal}</td>
                <td style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap' }}>{j.gsm}</td>
                <td style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap' }}>{j.size}</td>
                <td style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap' }}>{j.req.toLocaleString()}</td>
                <td style={{ padding: '0.6rem 0.75rem', color: '#10B981', fontWeight: 600, whiteSpace: 'nowrap' }}>{j.used.toLocaleString()}</td>
                <td style={{ padding: '0.6rem 0.75rem', color: j.remaining > 0 ? '#EF4444' : 'inherit', whiteSpace: 'nowrap' }}>{j.remaining.toLocaleString()}</td>
                <td style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap' }}>
                  <span style={{
                    padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600,
                    background: j.status === 'Completed' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                    color: j.status === 'Completed' ? '#10B981' : '#F59E0B',
                    display: 'flex', alignItems: 'center', gap: '0.3rem', width: 'fit-content'
                  }}>
                    {j.status === 'Completed' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    {j.status}
                  </span>
                </td>
                <td style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap' }}>{j.date}</td>
                <td style={{ padding: '0.6rem 0.75rem', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><Eye size={16} /></button>
                    <button className="btn-action-edit">
                      <Edit size={16} /> Edit
                    </button>
                    <button className="btn-action-delete">
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{ padding: '0.75rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(79, 70, 229, 0.02)' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Page 1 of 1</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Rows per page:
            <select style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: '#fff', fontSize: '0.8rem', outline: 'none', cursor: 'pointer' }}>
              <option>5</option>
              <option>10</option>
              <option>15</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: '#fff', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={16} /></button>
            <button style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: '#fff', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderJobReport = () => (
    <div style={{ animation: 'fadeIn .4s ease' }}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
          <input type="date" style={{ padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', flex: 1 }} />
          <input type="date" style={{ padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', flex: 1 }} />
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{ padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Export PDF</button>
          <button style={{ padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', background: '#10B981', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Export Excel</button>
        </div>
      </div>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)'
      }}>
        <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem' }}>Job Summary Report</h3>
        <div className="stock-table-container" style={{ overflowX: 'auto' }}>
          <table className="stock-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
                {['Job ID', 'Party', 'Job Name', 'Required', 'Delivered', 'Balance', 'Status'].map(h => (
                  <th key={h} style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 700 }}>JOB-482</td>
                <td style={{ padding: '1rem 1.5rem' }}>Acme Corp</td>
                <td style={{ padding: '1rem 1.5rem' }}>Annual Report Print</td>
                <td style={{ padding: '1rem 1.5rem' }}>5,000</td>
                <td style={{ padding: '1rem 1.5rem' }}>5,000</td>
                <td style={{ padding: '1rem 1.5rem' }}>0</td>
                <td style={{ padding: '1rem 1.5rem' }}>Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ animation: 'fadeIn .4s ease' }}>
      <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Job Data</span>
            <span>/</span>
            <span style={{ color: 'var(--text-main)' }}>
              {[{ id: 'add', label: 'Add Job' }, { id: 'manage', label: 'Manage Jobs' }, { id: 'report', label: 'Job Report' }].find(t => t.id === activeTab)?.label}
            </span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Job Data</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Track printing jobs, delivery dates and completion status.
          </p>
        </div>
        <div style={{
          background: 'var(--surface)', padding: '0.3rem', borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)', display: 'flex', gap: '0.25rem'
        }}>
          {[
            { id: 'add', label: 'Add Job', icon: Plus },
            { id: 'manage', label: 'Manage Jobs', icon: LayoutList },
            { id: 'report', label: 'Job Report', icon: BarChart3 },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', border: 'none',
                background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                color: activeTab === tab.id ? '#fff' : 'var(--text-muted)',
                fontWeight: 600, cursor: 'pointer', transition: 'all .2s',
                display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem'
              }}>
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'add' && renderAddJob()}
      {activeTab === 'manage' && renderManageJobs()}
      {activeTab === 'report' && renderJobReport()}

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
      `}</style>
    </div>
  );
};

export default JobData;
