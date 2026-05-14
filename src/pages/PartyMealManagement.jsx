import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  Users, Coffee, Plus, Search, Filter,
  MapPin, Phone, User, Hash, Globe, Building2,
  Trash2, Edit, ChevronLeft, ChevronRight, X, Save,
  LayoutList, RefreshCcw, Camera, CheckCircle2, FileText
} from 'lucide-react';

const PartyMealManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'add-party');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const [search, setSearch] = useState('');
  const fileInputRef = useRef(null);

  // Parties pagination
  const [partyPage, setPartyPage] = useState(1);
  const [partyRowsPerPage, setPartyRowsPerPage] = useState(5);

  // Meals pagination
  const [mealPage, setMealPage] = useState(1);
  const [mealRowsPerPage, setMealRowsPerPage] = useState(5);

  const [parties, setParties] = useState([
    { id: 1, name: 'BoxPrintz Packaging Solutions', email: 'shubhamradadiya@gmail.com', phone: '9023260875' },
    { id: 2, name: 'Ashit Packaging', email: 'demo@gmail.com', phone: '1111111111' },
    { id: 3, name: 'Mukul Jamsans', email: 'demo2@gmail.com', phone: '1111111111' },
    { id: 4, name: 'VINOD MEDICAL SYSTEMS Pvt,Ltd', email: 'atalbihari@vinodmedical.com', phone: '9898547766' },
    { id: 5, name: 'Pareen Pac.', email: 'demo4@gmail.com', phone: '1111111111' },
  ]);

  const [meals, setMeals] = useState([
    { id: 1, name: 'Aaditya PapTech' },
    { id: 2, name: 'H C Shah & Sons' },
    { id: 3, name: 'Kherani Paper' },
  ]);


  const [partyForm, setPartyForm] = useState({ name: '', email: '', phone: '' });
  const [mealForm, setMealForm] = useState({ name: '' });

  const handleSaveCompany = (e) => {
    e.preventDefault();
    alert('Company details saved successfully!');
  };

  const handleAddParty = (e) => {
    e.preventDefault();
    if (!partyForm.name || !partyForm.email || !partyForm.phone) return;
    if (partyForm.id) {
      // Edit mode
      setParties(parties.map(p => p.id === partyForm.id ? { ...partyForm } : p));
    } else {
      // Add mode
      const newParty = {
        id: Date.now(),
        ...partyForm
      };
      setParties([newParty, ...parties]);
    }
    setPartyForm({ name: '', email: '', phone: '' });
    setActiveTab('manage-parties');
  };

  const handleDeleteParty = (id) => {
    if (window.confirm('Are you sure you want to delete this party?')) {
      setParties(parties.filter(p => p.id !== id));
    }
  };

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (!mealForm.name) return;
    if (mealForm.id) {
      // Edit mode
      setMeals(meals.map(m => m.id === mealForm.id ? { ...mealForm } : m));
    } else {
      // Add mode
      const newMeal = {
        id: Date.now(),
        ...mealForm
      };
      setMeals([newMeal, ...meals]);
    }
    setMealForm({ name: '' });
    setActiveTab('manage-meals');
  };

  const handleDeleteMeal = (id) => {
    if (window.confirm('Are you sure you want to delete this meal?')) {
      setMeals(meals.filter(m => m.id !== id));
    }
  };

  const exportPartiesToPDF = () => {
    const doc = new jsPDF();
    doc.text('Shreeji ERP - Parties List', 14, 15);
    const tableData = parties.map(p => [p.name, p.email, p.phone]);
    autoTable(doc, {
      head: [['Party Name', 'Email', 'Mobile']],
      body: tableData,
      startY: 20
    });
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const exportMealsToPDF = () => {
    const doc = new jsPDF();
    doc.text('Shreeji ERP - Meals List', 14, 15);
    const tableData = meals.map(m => [m.name]);
    autoTable(doc, {
      head: [['Meal Name']],
      body: tableData,
      startY: 20
    });
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const renderAddParty = () => (
    <form onSubmit={handleAddParty} style={{
      background: 'var(--surface)', border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)', width: '100%'
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
        <div style={{ width: '400px' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Party Name *</label>
          <input
            type="text"
            placeholder="Enter party name"
            required
            value={partyForm.name}
            onChange={(e) => setPartyForm({ ...partyForm, name: e.target.value })}
            style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }}
          />
        </div>
        <div style={{ width: '300px' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Email *</label>
          <input
            type="email"
            placeholder="Enter email address"
            required
            value={partyForm.email}
            onChange={(e) => setPartyForm({ ...partyForm, email: e.target.value })}
            style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }}
          />
        </div>
        <div style={{ width: '250px' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Mobile *</label>
          <input
            type="text"
            placeholder="Enter 10-digit mobile number"
            required
            maxLength={10}
            value={partyForm.phone}
            onChange={(e) => setPartyForm({ ...partyForm, phone: e.target.value })}
            style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }}
          />
        </div>
      </div>
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button type="button" onClick={() => setPartyForm({ name: '', email: '', phone: '' })} style={{ padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Cancel</button>
        <button type="button" onClick={() => setPartyForm({ name: '', email: '', phone: '' })} style={{ padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <RefreshCcw size={16} /> Reset
        </button>
        <button type="submit" style={{ padding: '0.6rem 2rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Save size={18} /> Add Party
        </button>
      </div>
    </form>
  );

  const renderManageParties = () => {
    const totalParties = parties.length;
    const partyTotalPages = Math.max(1, Math.ceil(totalParties / partyRowsPerPage));
    const pagedParties = parties.slice((partyPage - 1) * partyRowsPerPage, partyPage * partyRowsPerPage);
    return (
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden'
      }}>
        <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(79, 70, 229, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Users size={18} style={{ color: 'var(--primary)' }} />
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)', letterSpacing: '0.02em' }}>Parties</span>
          </div>

        </div>

        <div className="stock-table-container" style={{ overflowX: 'auto' }}>
          <table className="stock-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
                {['Party Name', 'Email', 'Mobile', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.4rem 0.75rem', fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagedParties.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)', background: '#fff' }}>
                  <td style={{ padding: '0.45rem 0.75rem', fontWeight: 600, whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{p.name}</td>
                  <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{p.email}</td>
                  <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{p.phone}</td>
                  <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      <button className="btn-action-edit" onClick={() => { setActiveTab('add-party'); setPartyForm(p); }}>
                        <Edit size={14} /> Edit
                      </button>
                      <button className="btn-action-delete" onClick={() => handleDeleteParty(p.id)}>
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '0.75rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(79, 70, 229, 0.02)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Showing {Math.min((partyPage - 1) * partyRowsPerPage + 1, totalParties)} to {Math.min(partyPage * partyRowsPerPage, totalParties)} of {totalParties} entries
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Rows per page:
              <select
                value={partyRowsPerPage}
                onChange={e => { setPartyRowsPerPage(Number(e.target.value)); setPartyPage(1); }}
                style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: '#fff', fontSize: '0.8rem', outline: 'none', cursor: 'pointer' }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button
                onClick={() => setPartyPage(p => Math.max(p - 1, 1))}
                disabled={partyPage === 1}
                style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: '#fff', color: partyPage === 1 ? '#ccc' : 'var(--text-muted)', cursor: partyPage === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              ><ChevronLeft size={16} /></button>

              {[...Array(partyTotalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPartyPage(i + 1)}
                  style={{
                    width: '32px', height: '32px', borderRadius: 'var(--radius-sm)',
                    border: partyPage === i + 1 ? 'none' : '1px solid var(--border-color)',
                    background: partyPage === i + 1 ? 'var(--primary)' : '#fff',
                    color: partyPage === i + 1 ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPartyPage(p => Math.min(p + 1, partyTotalPages))}
                disabled={partyPage === partyTotalPages}
                style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: '#fff', color: partyPage === partyTotalPages ? '#ccc' : 'var(--text-muted)', cursor: partyPage === partyTotalPages ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              ><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAddMeal = () => (
    <form onSubmit={handleAddMeal} style={{
      background: 'var(--surface)', border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)', width: '100%'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ width: '400px' }}>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>Meal Name *</label>
          <input
            type="text" placeholder="e.g. Standard Lunch" required
            value={mealForm.name}
            onChange={(e) => setMealForm({ name: e.target.value })}
            style={{
              width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem'
            }}
          />
        </div>
      </div>
      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button type="button" onClick={() => setActiveTab('manage-meals')} style={{ padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Cancel</button>
        <button type="button" onClick={() => setMealForm({ name: '' })} style={{ padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <RefreshCcw size={16} /> Reset
        </button>
        <button type="submit" style={{
          padding: '0.6rem 2rem', borderRadius: 'var(--radius-md)', border: 'none',
          background: 'var(--primary)', color: '#fff', fontWeight: 700, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem'
        }}>
          <Plus size={18} /> {mealForm.id ? 'Update Meal' : 'Add Meal'}
        </button>
      </div>
    </form>
  );

  const renderManageMeals = () => {
    const totalMeals = meals.length;
    const mealTotalPages = Math.max(1, Math.ceil(totalMeals / mealRowsPerPage));
    const pagedMeals = meals.slice((mealPage - 1) * mealRowsPerPage, mealPage * mealRowsPerPage);
    return (
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden'
      }}>
        <div style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(79, 70, 229, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Coffee size={18} style={{ color: 'var(--primary)' }} />
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary)', letterSpacing: '0.02em' }}>Meals</span>
          </div>
          <button onClick={exportMealsToPDF} style={{ padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-md)', background: 'var(--primary)', color: '#fff', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <FileText size={14} /> Export PDF
          </button>
        </div>

        <div className="stock-table-container" style={{ overflowX: 'auto' }}>
          <table className="stock-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.4rem 0.75rem', fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>Meal Name</th>
                <th style={{ padding: '0.4rem 0.75rem', fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagedMeals.map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid var(--border-color)', background: '#fff' }}>
                  <td style={{ padding: '0.45rem 0.75rem', fontWeight: 600, whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{m.name}</td>
                  <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                      <button className="btn-action-edit" onClick={() => { setActiveTab('add-meal'); setMealForm(m); }}>
                        <Edit size={14} /> Edit
                      </button>
                      <button className="btn-action-delete" onClick={() => handleDeleteMeal(m.id)}>
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '0.75rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(79, 70, 229, 0.02)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Showing {Math.min((mealPage - 1) * mealRowsPerPage + 1, totalMeals)} to {Math.min(mealPage * mealRowsPerPage, totalMeals)} of {totalMeals} entries
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Rows per page:
              <select
                value={mealRowsPerPage}
                onChange={e => { setMealRowsPerPage(Number(e.target.value)); setMealPage(1); }}
                style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: '#fff', fontSize: '0.8rem', outline: 'none', cursor: 'pointer' }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button
                onClick={() => setMealPage(p => Math.max(p - 1, 1))}
                disabled={mealPage === 1}
                style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: '#fff', color: mealPage === 1 ? '#ccc' : 'var(--text-muted)', cursor: mealPage === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              ><ChevronLeft size={16} /></button>

              {[...Array(mealTotalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMealPage(i + 1)}
                  style={{
                    width: '32px', height: '32px', borderRadius: 'var(--radius-sm)',
                    border: mealPage === i + 1 ? 'none' : '1px solid var(--border-color)',
                    background: mealPage === i + 1 ? 'var(--primary)' : '#fff',
                    color: mealPage === i + 1 ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setMealPage(p => Math.min(p + 1, mealTotalPages))}
                disabled={mealPage === mealTotalPages}
                style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: '#fff', color: mealPage === mealTotalPages ? '#ccc' : 'var(--text-muted)', cursor: mealPage === mealTotalPages ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              ><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>

      </div>
    );
  };

  const renderCompanyDetails = () => (
    <form onSubmit={handleSaveCompany} style={{
      background: 'var(--surface)', border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)', width: '100%'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Line 1: Company Name, Email, Mobile, GST */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.8rem' }}>Company Name *</label>
            <input
              type="text"
              value={companyInfo.name}
              onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
              required
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', fontSize: '0.9rem' }}
            />
          </div>
          <div style={{ flex: '1 1 250px', maxWidth: '350px' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.8rem' }}>Email *</label>
            <input
              type="email"
              value={companyInfo.email}
              onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
              required
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', fontSize: '0.9rem' }}
            />
          </div>
          <div style={{ width: '180px' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.8rem' }}>Mobile No. *</label>
            <input
              type="text"
              value={companyInfo.phone}
              onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
              required
              maxLength={10}
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', fontSize: '0.9rem' }}
            />
          </div>
          <div style={{ width: '220px' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.8rem' }}>GST No. *</label>
            <input
              type="text"
              value={companyInfo.gst}
              onChange={(e) => setCompanyInfo({ ...companyInfo, gst: e.target.value })}
              required
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', fontSize: '0.9rem' }}
            />
          </div>
        </div>

        {/* Line 2: Address, Upload Logo */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 500px' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.8rem' }}>Address *</label>
            <textarea
              value={companyInfo.address}
              onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
              required
              rows={3}
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', fontSize: '0.9rem', resize: 'none' }}
            />
          </div>
          <div style={{ width: '350px' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.8rem' }}>Upload Logo *</label>
            <div onClick={() => fileInputRef.current.click()} style={{ border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.75rem', textAlign: 'center', cursor: 'pointer', background: 'var(--bg-color)' }}>
              <Camera size={20} style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }} />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{companyInfo.logo ? companyInfo.logo.name : 'Click to choose logo'}</div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => setCompanyInfo({ ...companyInfo, logo: e.target.files[0] })}
                style={{ display: 'none' }}
              />
            </div>
            <div style={{ marginTop: '0.4rem', fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <CheckCircle2 size={12} /> {companyInfo.logo ? 'Logo chosen' : 'Existing logo uploaded'}
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button type="button" onClick={() => setActiveTab('manage-parties')} style={{ padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Cancel</button>
        <button type="button" onClick={() => setCompanyInfo({ name: '', email: '', phone: '', gst: '', address: '', logo: null })} style={{ padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <RefreshCcw size={16} /> Reset
        </button>
        <button type="submit" style={{ padding: '0.6rem 2rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Save size={18} /> Save Details
        </button>
      </div>
    </form>
  );

  const tabs = [
    { id: 'add-party', label: 'Add Party', icon: Plus },
    { id: 'manage-parties', label: 'Manage Parties', icon: Users },
    { id: 'add-meal', label: 'Add Meal', icon: Plus },
    { id: 'manage-meals', label: 'Manage Meals', icon: Coffee },
  ];

  return (
    <div style={{ animation: 'fadeIn .4s ease' }}>
      <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Party & Meal Data</span>
            <span>/</span>
            <span style={{ color: 'var(--text-main)' }}>{tabs.find(t => t.id === activeTab)?.label}</span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Party & Meal Data</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.2rem', fontSize: '0.9rem' }}>
            Centralized hub for managing business partners and meal logs.
          </p>
        </div>
        <div style={{
          background: 'var(--surface)', padding: '0.3rem', borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)', display: 'flex', gap: '0.25rem'
        }}>
          {tabs.map(tab => (
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

      {activeTab === 'add-party' && renderAddParty()}
      {activeTab === 'manage-parties' && renderManageParties()}
      {activeTab === 'add-meal' && renderAddMeal()}
      {activeTab === 'manage-meals' && renderManageMeals()}

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
      `}</style>
    </div>
  );
};

export default PartyMealManagement;
