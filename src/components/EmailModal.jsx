import React, { useState, useEffect } from 'react';
import {
  X, Mail, Settings, Clock, CheckCircle2,
  ExternalLink, ChevronDown, Calendar, AlertCircle,
  FileText, Send, Trash2, Check, Layout, Download
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const EmailModal = ({ isOpen, onClose, parties, stockItems, companyDetails }) => {
  const [activeTab, setActiveTab] = useState('send'); // 'send' | 'auto'
  const [selectedParties, setSelectedParties] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sentResult, setSentResult] = useState([]);

  // Auto Send State
  const [scheduleAll, setScheduleAll] = useState(false);
  const [scheduleConfig, setScheduleConfig] = useState({
    frequency: 'Weekly',
    day: 'Monday',
    time: '10:00'
  });
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setSelectedParties([]);
      setSendSuccess(false);
      setSentResult([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleParty = (party) => {
    setSelectedParties(prev =>
      prev.includes(party) ? prev.filter(p => p !== party) : [...prev, party]
    );
  };

  const selectAll = () => {
    if (selectedParties.length === parties.length) {
      setSelectedParties([]);
    } else {
      setSelectedParties([...parties]);
    }
  };

  const generatePartyPDF = (partyName) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const partyData = stockItems.filter(item => item.party === partyName && !item.isJob);

    // Header
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.setTextColor(26, 82, 118); // Blueish color from image
    doc.text(companyDetails.name || "Shreeji Print Pack", pageWidth / 2, 15, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(85, 85, 85);
    doc.setFont("times", "normal");
    doc.text(companyDetails.address || "21, Silver Plaza, Station Road, Bhavnagar - 364001, Gujarat, India.", pageWidth / 2, 21, { align: 'center' });
    doc.text(`Email: ${companyDetails.email} | GST: ${companyDetails.gst} | Mobile: ${companyDetails.phone}`, pageWidth / 2, 26, { align: 'center' });

    // Blue Horizontal Line
    doc.setDrawColor(26, 82, 118);
    doc.setLineWidth(0.5);
    doc.line(20, 30, pageWidth - 20, 30);

    // Title
    doc.setFontSize(14);
    doc.setFont("times", "bold");
    const prefix = "Stock Data for: ";
    const name = partyName.toUpperCase();
    const totalWidth = doc.getTextWidth(prefix + name);
    let startX = (pageWidth - totalWidth) / 2;
    
    doc.setTextColor(26, 82, 118); // Blue color for "Stock Data for: "
    doc.text(prefix, startX, 38);
    
    doc.setTextColor(0, 0, 0); // Black color for the party name
    doc.text(name, startX + doc.getTextWidth(prefix), 38);

    // Table
    const tableData = partyData.map(item => [
      item.sizeCm,
      item.sizeInch,
      item.totalSheet,
      `${item.weight || '0.00'} kg`
    ]);

    autoTable(doc, {
      head: [['PARTY PAPER SIZE(cm)', 'PARTY PAPER SIZE(inch)', 'Total Sheet', 'Weight']],
      body: tableData,
      startY: 44, // Tightened gap
      headStyles: { fillColor: [255, 255, 255], textColor: [26, 82, 118], fontStyle: 'bold', lineWidth: 0.1, lineColor: [200, 200, 200] },
      styles: { halign: 'center', fontSize: 9, font: 'times', lineWidth: 0.1, lineColor: [200, 200, 200] },
      alternateRowStyles: { fillColor: [255, 255, 255] },
      margin: { left: 20, right: 20 }
    });

    // Footer
    const finalY = doc.lastAutoTable.finalY || 150;
    doc.setFontSize(9);
    doc.setTextColor(85, 85, 85);
    doc.setFont("times", "normal");
    doc.text(`Generated on: ${new Date().toLocaleDateString()} | By ${companyDetails.name || "Shreeji Print Pack"}`, pageWidth / 2, finalY + 8, { align: 'center' });

    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handleSendNow = () => {
    if (selectedParties.length === 0) return;

    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      const results = selectedParties.map(p => ({
        party: p,
        email: p.toLowerCase().replace(/\s+/g, '') + '@gmail.com', // Mock email
        pdfUrl: '#'
      }));
      setSentResult(results);
      setIsSending(false);
      setSendSuccess(true);
    }, 2000);
  };

  const handleSetSchedule = () => {
    const newSchedules = selectedParties.map(p => ({
      id: Date.now() + Math.random(),
      party: p,
      ...scheduleConfig,
      nextRun: '5/18/2026, 10:00:00 AM' // Mock next run
    }));
    setSchedules([...schedules, ...newSchedules]);
    setSelectedParties([]);
    alert('Schedule set successfully!');
  };

  const clearAllSchedules = () => {
    if (window.confirm('Clear all scheduled emails?')) {
      setSchedules([]);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: 'var(--surface)', width: '90%', maxWidth: '500px',
        borderRadius: 'var(--radius-lg)', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
        overflow: 'hidden', animation: 'modalFadeIn .3s ease'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem', borderBottom: '1px solid var(--border-color)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Mail size={20} style={{ color: 'var(--primary)' }} />
            Export & Send Email
          </h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
            padding: '4px', borderRadius: '50%', display: 'flex', transition: 'background .2s'
          }} onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'} onMouseOut={e => e.currentTarget.style.background = 'none'}>
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        {!sendSuccess && (
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setActiveTab('send')}
              style={{
                flex: 1, padding: '1rem', border: 'none', background: 'none',
                fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
                color: activeTab === 'send' ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: activeTab === 'send' ? '2px solid var(--primary)' : '2px solid transparent',
                transition: 'all .2s'
              }}
            >
              Send Email
            </button>
            <button
              onClick={() => setActiveTab('auto')}
              style={{
                flex: 1, padding: '1rem', border: 'none', background: 'none',
                fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
                color: activeTab === 'auto' ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: activeTab === 'auto' ? '2px solid var(--primary)' : '2px solid transparent',
                transition: 'all .2s'
              }}
            >
              Set Auto Send Email
            </button>
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>
          {sendSuccess ? (
            <div style={{ textAlign: 'center', animation: 'fadeIn .5s ease' }}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '50%', background: '#DEF7EC',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'
              }}>
                <CheckCircle2 size={32} style={{ color: '#0E9F6E' }} />
              </div>
              <h3 style={{ color: '#0E9F6E', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
                Email Sent Successfully
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {sentResult.map((res, i) => (
                  <div key={i} style={{
                    padding: '1.25rem', background: 'var(--bg-color)', borderRadius: 'var(--radius-md)',
                    textAlign: 'center', border: '1px solid var(--border-color)',
                    marginBottom: i < sentResult.length - 1 ? '1rem' : 0
                  }}>
                    <div style={{ fontWeight: 700, marginBottom: '0.4rem', fontSize: '1rem' }}>Party: {res.party}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      The stock data PDF has been sent to: <strong style={{ color: 'var(--text-main)' }}>{res.email}</strong>
                    </div>
                    <button
                      onClick={() => generatePartyPDF(res.party)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem',
                        background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)',
                        fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', margin: '0 auto'
                      }}
                    >
                      <FileText size={16} /> View PDF
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSendSuccess(false)}
                style={{
                  marginTop: '1.5rem', padding: '0.75rem 2rem', background: 'none',
                  border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)',
                  fontWeight: 600, cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          ) : activeTab === 'send' ? (
            <div style={{ animation: 'fadeIn .3s ease' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, marginBottom: '1rem' }}>
                  <input
                    type="checkbox"
                    checked={selectedParties.length === parties.length && parties.length > 0}
                    onChange={selectAll}
                    style={{ width: '18px', height: '18px' }}
                  />
                  Select All Parties
                </label>

                <div style={{
                  display: 'flex', flexDirection: 'column', gap: '0.5rem',
                  maxHeight: '200px', overflowY: 'auto', padding: '0.5rem',
                  border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)'
                }}>
                  {parties.map(p => (
                    <label key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.4rem', borderRadius: '4px' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'} onMouseOut={e => e.currentTarget.style.background = 'none'}>
                      <input
                        type="checkbox"
                        checked={selectedParties.includes(p)}
                        onChange={() => toggleParty(p)}
                        style={{ width: '16px', height: '16px' }}
                      />
                      <span style={{ fontSize: '0.9rem' }}>{p}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button
                  onClick={handleSendNow}
                  disabled={selectedParties.length === 0 || isSending}
                  style={{
                    flex: 1, padding: '0.75rem', background: 'var(--primary)', color: '#fff',
                    border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700,
                    cursor: selectedParties.length === 0 ? 'not-allowed' : 'pointer',
                    opacity: selectedParties.length === 0 ? 0.6 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                  }}
                >
                  {isSending ? (
                    <>
                      <div style={{ width: '16px', height: '16px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send Now
                    </>
                  )}
                </button>
                <button
                  onClick={onClose}
                  style={{
                    flex: 1, padding: '0.75rem', background: 'none', border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div style={{ animation: 'fadeIn .3s ease' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Select parties and set their custom email schedules.
              </p>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, marginBottom: '1rem' }}>
                <input
                  type="checkbox"
                  checked={scheduleAll}
                  onChange={(e) => {
                    setScheduleAll(e.target.checked);
                    if (e.target.checked) setSelectedParties([...parties]);
                    else setSelectedParties([]);
                  }}
                  style={{ width: '18px', height: '18px' }}
                />
                Set Schedule for All Parties
              </label>

              <div style={{
                display: 'flex', flexDirection: 'column', gap: '0.5rem',
                maxHeight: '120px', overflowY: 'auto', padding: '0.5rem',
                border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)',
                marginBottom: '1.25rem'
              }}>
                {parties.map(p => {
                  const isScheduled = schedules.some(s => s.party === p);
                  return (
                    <label key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.4rem' }}>
                      <input
                        type="checkbox"
                        disabled={scheduleAll}
                        checked={scheduleAll || selectedParties.includes(p)}
                        onChange={() => toggleParty(p)}
                        style={{ width: '16px', height: '16px' }}
                      />
                      <span style={{ fontSize: '0.9rem', color: scheduleAll ? 'var(--text-muted)' : 'var(--text-main)' }}>{p}</span>
                      {isScheduled && (
                        <span style={{
                          fontSize: '0.7rem', background: '#DEF7EC', color: '#03543F',
                          padding: '2px 8px', borderRadius: '10px', fontWeight: 600
                        }}>Auto</span>
                      )}
                    </label>
                  );
                })}
              </div>

              <div style={{
                background: 'var(--bg-color)', padding: '1rem', borderRadius: 'var(--radius-md)',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'
              }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Schedule for:</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary)' }}>
                    {scheduleAll ? 'All Party' : selectedParties.length > 0 ? (selectedParties.length === 1 ? selectedParties[0] : `${selectedParties.length} Selected`) : 'None'}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Frequency</label>
                  <select
                    value={scheduleConfig.frequency}
                    onChange={e => setScheduleConfig({ ...scheduleConfig, frequency: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                  >
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                  </select>
                </div>

                {scheduleConfig.frequency === 'Weekly' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Day of Week</label>
                    <select
                      value={scheduleConfig.day}
                      onChange={e => setScheduleConfig({ ...scheduleConfig, day: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    >
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Saturday</option>
                      <option>Sunday</option>
                    </select>
                  </div>
                )}

                {scheduleConfig.frequency === 'Monthly' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Day of Month</label>
                    <select
                      value={scheduleConfig.date || '1'}
                      onChange={e => setScheduleConfig({ ...scheduleConfig, date: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    >
                      {[...Array(31)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                )}

                {scheduleConfig.frequency === 'Yearly' && (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Month</label>
                      <select
                        value={scheduleConfig.month || 'January'}
                        onChange={e => setScheduleConfig({ ...scheduleConfig, month: e.target.value })}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                      >
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                          <option key={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Day of Month</label>
                      <select
                        value={scheduleConfig.date || '1'}
                        onChange={e => setScheduleConfig({ ...scheduleConfig, date: e.target.value })}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                      >
                        {[...Array(31)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>Time</label>
                  <input
                    type="time"
                    value={scheduleConfig.time}
                    onChange={e => setScheduleConfig({ ...scheduleConfig, time: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                  />
                </div>
              </div>

              <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(99,102,241,0.05)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <Clock size={12} style={{ display: 'inline', marginRight: '0.4rem' }} />
                Will send {
                  scheduleConfig.frequency === 'Yearly'
                    ? `every year on ${scheduleConfig.month || 'January'} ${scheduleConfig.date || '1'}`
                    : scheduleConfig.frequency === 'Monthly'
                      ? `every month on day ${scheduleConfig.date || '1'}`
                      : scheduleConfig.frequency === 'Weekly'
                        ? `every ${scheduleConfig.day}`
                        : `every ${scheduleConfig.frequency.toLowerCase()}`
                } at {scheduleConfig.time}
                <div style={{ marginTop: '0.4rem' }}>
                  <strong style={{ color: 'var(--text-main)' }}>Upcoming scheduled emails:</strong><br />
                  {schedules.length > 0 ? (
                    schedules.map((s, i) => (
                      <div key={s.id} style={{ padding: '2px 0' }}>{i + 1}. {s.party}: {s.nextRun}</div>
                    ))
                  ) : (
                    <div style={{ color: '#EF4444', fontWeight: 600, marginTop: '2px' }}>No auto email scheduled</div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button
                  onClick={handleSetSchedule}
                  disabled={selectedParties.length === 0}
                  style={{
                    flex: 2, padding: '0.75rem', background: '#3B82F6', color: '#fff',
                    border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700,
                    cursor: selectedParties.length === 0 ? 'not-allowed' : 'pointer',
                    opacity: selectedParties.length === 0 ? 0.6 : 1
                  }}
                >
                  Set Schedule
                </button>
                <button
                  onClick={clearAllSchedules}
                  style={{
                    flex: 1, padding: '0.75rem', background: '#F97316', color: '#fff',
                    border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Clear All
                </button>
                <button
                  onClick={onClose}
                  style={{
                    flex: 1, padding: '0.75rem', background: '#EF4444', color: '#fff',
                    border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes modalFadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default EmailModal;
