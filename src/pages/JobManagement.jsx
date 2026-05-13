import React, { useState, useEffect, useMemo } from 'react';
import {
  Briefcase, Plus, Search, Filter, FileText,
  Calendar, CheckCircle2, Clock, AlertCircle,
  Edit, Trash2, ChevronLeft, ChevronRight, X,
  Save, RefreshCcw, LayoutList, BarChart3, Eye,
  Printer, Layers, Settings, User, Tag, Maximize,
  Coffee, CreditCard, Package, Hash, Palette, Star,
  ChevronDown
} from 'lucide-react';

const JobManagement = () => {
  const [activeTab, setActiveTab] = useState('add-job');
  const [search, setSearch] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [materialSpecs, setMaterialSpecs] = useState([{
    id: Date.now(),
    meal: '',
    gsm: '',
    sizeCm: '',
    sizeInch: '-',
    total: '',
    rate: '',
    nxr: '',
    date: new Date().toLocaleDateString('en-GB').split('/').join('-'),
    availableStock: '0'
  }]);

  const addSpecRow = () => {
    setMaterialSpecs([...materialSpecs, {
      id: Date.now(),
      meal: '',
      gsm: '',
      sizeCm: '',
      sizeInch: '-',
      total: '',
      rate: '',
      nxr: '',
      date: new Date().toLocaleDateString('en-GB').split('/').join('-'),
      availableStock: '0'
    }]);
  };

  const removeSpecRow = (id) => {
    if (materialSpecs.length > 1) {
      setMaterialSpecs(materialSpecs.filter(row => row.id !== id));
    }
  };

  const [jobs, setJobs] = useState([
    { id: 'SJP-001', name: 'test job1', party: 'test party', meal: 'Deon Taps', gsm: '90', sizeCm: '90 x 90', sizeInch: '35.43 x 35.43', total: '80', rate: '5', nxr: '2', date: '12/03/2026', status: 'Job in Schedule', availableStock: '100' },
    { id: 'SJP-002', name: 'test job 2', party: 'Ashit Packaging', meal: 'Deon Taps', gsm: '700', sizeCm: '70 x 70', sizeInch: '27.56 x 27.56', total: '100', rate: '4', nxr: '2020', date: '21/03/2026', status: 'Job in Running', availableStock: '20' },
    { id: 'SJP-003', name: 'test job 3', party: 'test party', meal: 'test meal', gsm: '90', sizeCm: '90 x 90', sizeInch: '35.43 x 35.43', total: '200', rate: '5, 10', nxr: '1, 3', date: '11/03/2026', status: 'Job in Hold', availableStock: '150' },
    { id: 'SJP-004', name: 'test job 4', party: 'AJRAMARJI PACKAGING', meal: 'Aaditya PapTech', gsm: '120', sizeCm: '152.40 x 170.18', sizeInch: '60.00 x 67.00', total: '22', rate: '8', nxr: '12', date: '11/05/2026', status: 'Job Cancel', availableStock: '170' },
    { id: 'SJP-005', name: 'job 6', party: 'BoxPrintz Packaging Solutions', meal: 'Custom Pack', gsm: '90', sizeCm: '90 x 90', sizeInch: '35.43 x 35.43', total: '100', rate: '12', nxr: 'X-10', date: '15/05/2026', status: 'Job Completed', availableStock: '500' },
  ]);

  // Simulated Stock Database for Prediction (In a real app, this comes from an API/Context)
  const simulatedStock = [
    { party: 'test party', meal: 'test meal', gsm: '90', sizeCm: '90 x 90 cm', sizeInch: '35.43 x 35.43', rate: '5', nxr: '1', date: '11/03/2026', stock: 100 },
    { party: 'test party', meal: 'Deon Taps', gsm: '90', sizeCm: '90 x 90 cm', sizeInch: '35.43 x 35.43', rate: '5', nxr: '2', date: '12/03/2026', stock: 100 },
    { party: 'test party', meal: 'test meal', gsm: '90', sizeCm: '90 x 90 cm', sizeInch: '35.43 x 35.43', rate: '10', nxr: '3', date: '11/03/2026', stock: 50 },
    { party: 'Ashit Packaging', meal: 'Deon Taps', gsm: '700', sizeCm: '70 x 70 cm', sizeInch: '27.56 x 27.56', rate: '4', nxr: '2020', date: '21/03/2026', stock: 20 },
    { party: 'Ashit Packaging', meal: 'Deon Taps', gsm: '700', sizeCm: '70 x 70 cm', sizeInch: '27.56 x 27.56', rate: '5', nxr: '2021', date: '22/03/2026', stock: 36 },
    { party: 'AJRAMARJI PACKAGING', meal: 'Aaditya PapTech', gsm: '120', sizeCm: '152.40 x 170.18 cm', sizeInch: '60.00 x 67.00', rate: '8', nxr: '12', date: '11/05/2026', stock: 170 },
    { party: 'BoxPrintz Packaging Solutions', meal: 'Custom Pack', gsm: '90', sizeCm: '90 x 90 cm', sizeInch: '35.43 x 35.43', rate: '12', nxr: 'X-10', date: '15/05/2026', stock: 500 },
  ];

  const initialJobForm = {
    name: '',
    party: '',
    jobType: '',
    impression: '',
    machine2: '',
    machine5: '',
    pkd: '',
    color: '',
    special: '',
    inkCode: '',
    partySample: '',
    ctpNo: '',
    cuttingSize: '',
    cuttingWastage: '',
    printingWastage: '',
    printingWastageQty: '',
    finalQty: '',
    noOfBundle: '',
    lamination: 'No',
    laminationSize: '',
    laminationQty: '',
    varnish: 'No',
    uv: 'No',
    uvSize: '',
    uvQty: '',
    punching: 'No',
    punchingSize: '',
    sidePasting: 'No',
    sidePastingSize: ''
  };

  // Linked Party and Meals for dynamic filtering
  const partyMealMap = {
    'test party': ['test meal', 'demo_meal', 'Deon Taps'],
    'Ashit Packaging': ['Deon Taps', 'Standard Lunch', 'test4_meal'],
    'AJRAMARJI PACKAGING': ['Aaditya PapTech', 'Premium Box'],
    'BoxPrintz Packaging Solutions': ['demo_meal', 'demo2_meal', 'Custom Pack'],
    'Mukul Jamsans': ['H C Shah & Sons'],
    'VINOD MEDICAL SYSTEMS Pvt,Ltd': ['Medical Box'],
    'Pareen Pac.': ['Kherani Paper']
  };

  const [jobForm, setJobForm] = useState(initialJobForm);

  // CENTRAL LOGIC: Size Conversion & Stock Prediction
  useEffect(() => {
    const updatedSpecs = materialSpecs.map(spec => {
      let newSpec = { ...spec };

      // 1. Size Conversion (cm to inch)
      if (spec.sizeCm) {
        const parts = spec.sizeCm.split(/[*x]/i);
        if (parts.length === 2) {
          const w = parseFloat(parts[0]);
          const h = parseFloat(parts[1]);
          if (!isNaN(w) && !isNaN(h)) {
            const wInch = (w / 2.54).toFixed(2);
            const hInch = (h / 2.54).toFixed(2);
            newSpec.sizeInch = `${wInch} x ${hInch}`;
          }
        }
      } else {
        newSpec.sizeInch = '-';
      }

      // 2. Stock Prediction (Rate, NXR, Stock)
      // We only predict if we have all 4 core keys
      const partyKey = jobForm.party?.trim().toLowerCase();
      const mealKey = spec.meal?.trim().toLowerCase();
      const gsmKey = String(spec.gsm).trim().toLowerCase();
      const sizeKey = spec.sizeCm?.trim().toLowerCase();

      if (partyKey && mealKey && gsmKey && sizeKey) {
        const matches = simulatedStock.filter(s =>
          s.party.trim().toLowerCase() === partyKey &&
          s.meal.trim().toLowerCase() === mealKey &&
          String(s.gsm).trim().toLowerCase() === gsmKey &&
          s.sizeCm.trim().toLowerCase() === sizeKey
        );

        if (matches.length > 0) {
          const totalStock = matches.reduce((acc, curr) => acc + curr.stock, 0);
          newSpec.rate = [...new Set(matches.map(m => m.rate))].join(', ');
          newSpec.nxr = [...new Set(matches.map(m => m.nxr))].join(', ');
          newSpec.date = [...new Set(matches.map(m => m.date))].join(', ');
          newSpec.availableStock = totalStock.toString();
        } else {
          // No match found in dummy data
          newSpec.rate = '-';
          newSpec.nxr = '-';
          newSpec.availableStock = '0';
        }
      } else {
        // Not enough info to predict yet
        newSpec.rate = spec.rate || '-';
        newSpec.nxr = spec.nxr || '-';
        newSpec.availableStock = spec.availableStock || '0';
      }

      return newSpec;
    });

    // Check if any significant values changed to avoid infinite loop
    const hasChanged = updatedSpecs.some((spec, i) =>
      spec.sizeInch !== materialSpecs[i]?.sizeInch ||
      spec.rate !== materialSpecs[i]?.rate ||
      spec.nxr !== materialSpecs[i]?.nxr ||
      spec.availableStock !== materialSpecs[i]?.availableStock
    );

    if (hasChanged) {
      setMaterialSpecs(updatedSpecs);
    }
  }, [jobForm.party, materialSpecs]);

  const handleAddJob = (e) => {
    e.preventDefault();

    // Create job entries for each material spec
    const newJobs = materialSpecs.map((spec, i) => {
      const nextId = `SJP-${(jobs.length + i + 1).toString().padStart(3, '0')}`;
      return {
        id: jobForm.id && materialSpecs.length === 1 ? jobForm.id : nextId,
        ...jobForm,
        ...spec,
        status: jobForm.status || 'Job in Schedule'
      };
    });

    if (jobForm.id && materialSpecs.length === 1) {
      setJobs(jobs.map(j => j.id === jobForm.id ? newJobs[0] : j));
    } else {
      setJobs([...newJobs, ...jobs]);
    }

    setJobForm(initialJobForm);
    setMaterialSpecs([{ id: Date.now(), meal: '', gsm: '', sizeCm: '', sizeInch: '-', total: '', rate: '', nxr: '', date: new Date().toLocaleDateString('en-GB').split('/').join('-'), availableStock: '0' }]);
    setActiveTab('manage-jobs');
  };

  const handleDeleteJob = (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      setJobs(jobs.filter(j => j.id !== id));
    }
  };

  const renderAddJob = () => (
    <form onSubmit={handleAddJob} style={{
      background: 'var(--surface)', border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)', width: '100%'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Row 1: Core Identity */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div style={{ width: '450px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              <Tag size={14} style={{ color: 'var(--primary)' }} /> Job Name *
            </label>
            <input
              type="text"
              placeholder="Enter job name"
              required
              value={jobForm.name}
              onChange={(e) => setJobForm({ ...jobForm, name: e.target.value })}
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }}
            />
          </div>
          <div style={{ width: '350px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              <User size={14} style={{ color: 'var(--primary)' }} /> Party Name *
            </label>
            <select
              required
              value={jobForm.party}
              onChange={(e) => {
                const val = e.target.value;
                setJobForm({ ...jobForm, party: val });

                // Trigger prediction for all existing spec rows
                const newSpecs = materialSpecs.map(spec => {
                  const matches = simulatedStock.filter(s =>
                    s.party === val &&
                    s.gsm === spec.gsm &&
                    s.sizeCm === spec.sizeCm
                  );

                  if (matches.length > 0) {
                    const totalStock = matches.reduce((acc, curr) => acc + curr.stock, 0);
                    const rates = [...new Set(matches.map(m => m.rate))].join(', ');
                    const nxrs = [...new Set(matches.map(m => m.nxr))].join(', ');
                    const dates = [...new Set(matches.map(m => m.date))].join(', ');

                    return {
                      ...spec,
                      rate: rates,
                      nxr: nxrs,
                      date: dates,
                      availableStock: totalStock.toString(),
                      sizeInch: matches[0].sizeInch
                    };
                  }
                  return spec;
                });
                setMaterialSpecs(newSpecs);
              }}
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }}
            >
              <option value="">Select Party</option>
              <option>test party</option>
              <option>Ashit Packaging</option>
              <option>AJRAMARJI PACKAGING</option>
              <option>BoxPrintz Packaging Solutions</option>
            </select>
          </div>
        </div>

        {/* Rows: Material Specs & Logistics (Dynamic) */}
        {materialSpecs.map((spec, index) => (
          <div key={spec.id} style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: index % 2 === 0 ? 'rgba(79, 70, 229, 0.05)' : 'rgba(249, 250, 251, 0.5)', position: 'relative' }}>
            <div style={{ width: '250px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <Coffee size={14} style={{ color: 'var(--primary)' }} /> Meal Name *
              </label>
              <select
                required
                value={spec.meal}
                onChange={(e) => {
                  const newSpecs = [...materialSpecs];
                  newSpecs[index].meal = e.target.value;
                  setMaterialSpecs(newSpecs);
                }}
                style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#fff', color: 'var(--text-main)', fontSize: '0.9rem' }}
              >
                <option value="">Select Meal</option>
                {jobForm.party && partyMealMap[jobForm.party] ? (
                  partyMealMap[jobForm.party].map(meal => (
                    <option key={meal}>{meal}</option>
                  ))
                ) : (
                  <option disabled>Select a party first</option>
                )}
              </select>
            </div>
            <div style={{ width: '150px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <Layers size={14} style={{ color: 'var(--primary)' }} /> GSM *
              </label>
              <select
                required
                value={spec.gsm}
                onChange={(e) => {
                  const newSpecs = [...materialSpecs];
                  newSpecs[index].gsm = e.target.value;
                  setMaterialSpecs(newSpecs);
                }}
                style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#fff', color: 'var(--text-main)', fontSize: '0.9rem' }}
              >
                <option value="">Select GSM</option>
                <option>230</option>
                <option>250</option>
                <option>280</option>
                <option>300</option>
                <option>90</option>
                <option>120</option>
                <option>700</option>
              </select>
            </div>
            <div style={{ width: '180px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <Maximize size={14} style={{ color: 'var(--primary)' }} /> Size (cm) *
              </label>
              <select
                required
                value={spec.sizeCm}
                onChange={(e) => {
                  const newSpecs = [...materialSpecs];
                  newSpecs[index].sizeCm = e.target.value;
                  setMaterialSpecs(newSpecs);
                }}
                style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#fff', color: 'var(--text-main)', fontSize: '0.9rem' }}
              >
                <option value="">Select Size (cm)</option>
                <option>20 x 30 cm</option>
                <option>30 x 40 cm</option>
                <option>90 x 90 cm</option>
                <option>70 x 70 cm</option>
                <option>152.40 x 170.18 cm</option>
              </select>
            </div>
            <div style={{ width: '150px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <Maximize size={14} style={{ color: 'var(--primary)' }} /> Size (inch)
              </label>
              <input type="text" value={spec.sizeInch} readOnly style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#f5f5f5', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }} />
            </div>
            <div style={{ width: '150px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <FileText size={14} style={{ color: 'var(--primary)' }} /> Total Sheet *
              </label>
              <input
                type="text"
                placeholder="Enter total"
                required
                value={spec.total}
                onChange={(e) => {
                  const newSpecs = [...materialSpecs];
                  newSpecs[index].total = e.target.value;
                  setMaterialSpecs(newSpecs);
                }}
                style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#fff', fontSize: '0.9rem' }}
              />
            </div>
            <div style={{ width: '180px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <Package size={14} style={{ color: 'var(--primary)' }} /> Available Total Sheet
              </label>
              <input type="text" value={spec.availableStock} readOnly style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#F9FAFB', color: '#10B981', fontWeight: 700, fontSize: '0.9rem' }} />
            </div>
            <div style={{ width: '120px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <CreditCard size={14} style={{ color: 'var(--primary)' }} /> Rate
              </label>
              <input
                type="text"
                placeholder="-"
                value={spec.rate}
                onChange={(e) => {
                  const newSpecs = [...materialSpecs];
                  newSpecs[index].rate = e.target.value;
                  setMaterialSpecs(newSpecs);
                }}
                style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#fff', fontSize: '0.9rem' }}
              />
            </div>
            <div style={{ width: '180px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <Hash size={14} style={{ color: 'var(--primary)' }} /> NXR No
              </label>
              <input
                type="text"
                placeholder="-"
                value={spec.nxr}
                onChange={(e) => {
                  const newSpecs = [...materialSpecs];
                  newSpecs[index].nxr = e.target.value;
                  setMaterialSpecs(newSpecs);
                }}
                style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#fff', fontSize: '0.9rem' }}
              />
            </div>
            <div style={{ width: '250px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <Calendar size={14} style={{ color: 'var(--primary)' }} /> Chalan Date
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={spec.date}
                  onChange={(e) => {
                    const newSpecs = [...materialSpecs];
                    newSpecs[index].date = e.target.value;
                    setMaterialSpecs(newSpecs);
                  }}
                  style={{ flex: 1, padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#fff', fontSize: '0.9rem' }}
                />
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    type="button"
                    onClick={addSpecRow}
                    style={{
                      width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', border: 'none',
                      background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                    }}
                  >
                    <Plus size={16} />
                  </button>
                  {materialSpecs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSpecRow(spec.id)}
                      style={{
                        width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', border: 'none',
                        background: '#EF4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                      }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Row 4: Technical & Machine Specs (ALL TEXTFIELDS) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {[
            { label: 'IMPRESSION', Icon: Printer, field: 'impression' },
            { label: 'MACHINE 2 COLOR', Icon: Printer, field: 'machine2' },
            { label: 'MACHINE 5 COLOR', Icon: Printer, field: 'machine5' },
            { label: 'PKD', Icon: Package, field: 'pkd' },
            { label: 'COLOR', Icon: Palette, field: 'color' },
            { label: 'SPECIAL', Icon: Star, field: 'special' },
            { label: 'INK CODE NO', Icon: Hash, field: 'inkCode' },
            { label: 'PARTY APPROVED SAMPLE', Icon: CheckCircle2, field: 'partySample' }
          ].map(field => (
            <div key={field.label}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <field.Icon size={14} style={{ color: 'var(--primary)' }} /> {field.label}
              </label>
              <input
                type="text"
                placeholder={`Enter ${field.label}`}
                value={jobForm[field.field]}
                onChange={(e) => setJobForm({ ...jobForm, [field.field]: e.target.value })}
                style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }}
              />
            </div>
          ))}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              <LayoutList size={14} style={{ color: 'var(--primary)' }} /> NEW JOB/OLD JOB
            </label>
            <select
              value={jobForm.jobType}
              onChange={(e) => setJobForm({ ...jobForm, jobType: e.target.value })}
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }}
            >
              <option value="">Select Job Type</option>
              <option>NEW JOB</option>
              <option>OLD JOB</option>
            </select>
          </div>
          {[
            { label: 'CTP No', Icon: Hash, field: 'ctpNo' },
            { label: 'CUTTING SIZE', Icon: Maximize, field: 'cuttingSize' },
            { label: 'CUTTING WASTAGE', Icon: Trash2, field: 'cuttingWastage' },
            { label: 'PRINTING WASTAGE', Icon: Trash2, field: 'printingWastage' },
            { label: 'PRINTING WASTAGE QTY', Icon: Trash2, field: 'printingWastageQty' }
          ].map(field => (
            <div key={field.label}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                <field.Icon size={14} style={{ color: 'var(--primary)' }} /> {field.label}
              </label>
              <input
                type="text"
                placeholder={`Enter ${field.label}`}
                value={jobForm[field.field]}
                onChange={(e) => setJobForm({ ...jobForm, [field.field]: e.target.value })}
                style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }}
              />
            </div>
          ))}
        </div>

        {/* Row 5: Process Options (Yes/No Toggles with Conditional Fields) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem', padding: '1.5rem', background: 'rgba(79, 70, 229, 0.02)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          {[
            { label: 'LAMINATION', field: 'lamination', hasQty: true, hasSize: true, sizeField: 'laminationSize', qtyField: 'laminationQty' },
            { label: 'VARNISH', field: 'varnish', hasQty: false, hasSize: false },
            { label: 'UV/DRIP OF UV', field: 'uv', hasQty: true, hasSize: true, sizeField: 'uvSize', qtyField: 'uvQty' },
            { label: 'PUNCHING', field: 'punching', hasQty: false, hasSize: true, sizeField: 'punchingSize' },
            { label: 'SIDE PASTING', field: 'sidePasting', hasQty: false, hasSize: true, sizeField: 'sidePastingSize' }
          ].map(opt => (
            <div key={opt.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1rem', background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Layers size={14} style={{ color: 'var(--primary)' }} /> {opt.label}
              </span>
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
                  <input
                    type="radio"
                    name={opt.field}
                    value="Yes"
                    checked={jobForm[opt.field] === 'Yes'}
                    onChange={(e) => setJobForm({ ...jobForm, [opt.field]: e.target.value })}
                    style={{ accentColor: 'var(--primary)' }}
                  /> Yes
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
                  <input
                    type="radio"
                    name={opt.field}
                    value="No"
                    checked={jobForm[opt.field] === 'No'}
                    onChange={(e) => setJobForm({ ...jobForm, [opt.field]: e.target.value })}
                    style={{ accentColor: 'var(--primary)' }}
                  /> No
                </label>
              </div>

              {/* Conditional Fields */}
              {jobForm[opt.field] === 'Yes' && (
                <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'fadeIn 0.3s ease' }}>
                  {opt.hasSize && (
                    <div>
                      <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'block' }}>SIZE</label>
                      <input
                        type="text"
                        placeholder="Enter size"
                        value={jobForm[opt.sizeField]}
                        onChange={(e) => setJobForm({ ...jobForm, [opt.sizeField]: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}
                      />
                    </div>
                  )}
                  {opt.hasQty && (
                    <div>
                      <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'block' }}>QUANTITY</label>
                      <input
                        type="number"
                        placeholder="Enter qty"
                        value={jobForm[opt.qtyField]}
                        onChange={(e) => setJobForm({ ...jobForm, [opt.qtyField]: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Row 6: Final Metrics */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div style={{ width: '220px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              <FileText size={14} style={{ color: 'var(--primary)' }} /> FINAL QTY
            </label>
            <input
              type="text"
              placeholder="Enter final quantity"
              value={jobForm.finalQty}
              onChange={(e) => setJobForm({ ...jobForm, finalQty: e.target.value })}
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }}
            />
          </div>
          <div style={{ width: '220px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              <Package size={14} style={{ color: 'var(--primary)' }} /> NO OF BUNDLE
            </label>
            <input
              type="text"
              placeholder="Enter bundle count"
              value={jobForm.noOfBundle}
              onChange={(e) => setJobForm({ ...jobForm, noOfBundle: e.target.value })}
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }}
            />
          </div>
        </div>

      </div>

      {/* Form Actions */}
      <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button type="button" onClick={() => setActiveTab('manage-jobs')} style={{ padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Cancel</button>
        <button type="button" onClick={() => { setJobForm(initialJobForm); setMaterialSpecs([{ id: Date.now(), meal: '', gsm: '', sizeCm: '', sizeInch: '-', total: '', rate: '', nxr: '', date: new Date().toLocaleDateString('en-GB').split('/').join('-'), availableStock: '0' }]); }} style={{
          padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
          background: 'var(--bg-color)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.4rem'
        }}>
          <RefreshCcw size={16} /> Reset
        </button>
        <button type="submit" style={{
          padding: '0.6rem 2.5rem', borderRadius: 'var(--radius-md)', border: 'none',
          background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.5rem'
        }}>
          <Save size={18} /> {jobForm.id ? 'Update Job' : 'Add Job'}
        </button>
      </div>
    </form>
  );

  const renderManageJobs = () => (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden'
    }}>
      {/* Table Header / Filters */}
      <div style={{ padding: '0.5rem 1.5rem', borderBottom: '1px solid var(--border-color)', background: 'rgba(79, 70, 229, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <LayoutList size={20} style={{ color: 'var(--primary)' }} />
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>Job Records</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text" placeholder="Search jobs..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '0.55rem 1rem 0.55rem 2.5rem', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)', background: '#fff', fontSize: '0.85rem'
              }}
            />
          </div>
          <select style={{ padding: '0.55rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#fff', fontSize: '0.85rem', minWidth: '150px' }}>
            <option>All Parties</option>
          </select>
          <select style={{ padding: '0.55rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#fff', fontSize: '0.85rem', minWidth: '150px' }}>
            <option>All Jobs</option>
          </select>
          <select style={{ padding: '0.55rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#fff', fontSize: '0.85rem', minWidth: '150px' }}>
            <option>All Paper Sizes</option>
          </select>
          <button onClick={() => setSearch('')} style={{
            padding: '0.55rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
            background: '#fff', color: 'var(--text-main)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer'
          }}>
            <X size={14} /> Clear
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="stock-table-container">
        <table className="stock-table">
          <thead>
            <tr style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
              {[
                'Job Name', 'Party', 'Meal', 'GSM', 'Size (cm)', 'Size (Inch)',
                'Total Sheet', 'Rate', 'NXR No', 'Chalan Date', 'Status', 'Actions'
              ].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jobs.filter(j => j.name.toLowerCase().includes(search.toLowerCase())).slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map((job, idx) => (
              <tr key={job.id} style={{ borderBottom: '1px solid #E2E8F0', background: idx % 2 === 0 ? '#fff' : '#F8FAFC' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 600, borderRight: '1px solid #E2E8F0' }}>{job.name}</td>
                <td style={{ padding: '0.75rem 1rem', borderRight: '1px solid #E2E8F0' }}>{job.party}</td>
                <td style={{ padding: '0.75rem 1rem', borderRight: '1px solid #E2E8F0' }}>{job.meal}</td>
                <td style={{ padding: '0.75rem 1rem', borderRight: '1px solid #E2E8F0' }}>{job.gsm}</td>
                <td style={{ padding: '0.75rem 1rem', borderRight: '1px solid #E2E8F0' }}>{job.sizeCm}</td>
                <td style={{ padding: '0.75rem 1rem', borderRight: '1px solid #E2E8F0' }}>{job.sizeInch}</td>
                <td style={{ padding: '0.75rem 1rem', borderRight: '1px solid #E2E8F0' }}>{job.total}</td>
                <td style={{ padding: '0.75rem 1rem', borderRight: '1px solid #E2E8F0', fontWeight: 700, color: '#10B981' }}>{job.availableStock}</td>
                <td style={{ padding: '0.75rem 1rem', borderRight: '1px solid #E2E8F0' }}>{job.rate}</td>
                <td style={{ padding: '0.75rem 1rem', borderRight: '1px solid #E2E8F0' }}>{job.nxr}</td>
                <td style={{ padding: '0.75rem 1rem', borderRight: '1px solid #E2E8F0' }}>{job.date}</td>
                <td style={{ padding: '0.75rem 1rem', borderRight: '1px solid #E2E8F0' }}>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      position: 'absolute', left: '0.6rem',
                      color: job.status === 'Job Completed' ? '#10B981' :
                        job.status === 'Job Cancel' ? '#EF4444' :
                          job.status === 'Job in Hold' ? '#F59E0B' :
                            job.status === 'Job in Running' ? '#A855F7' : '#1D4ED8',
                      display: 'flex', alignItems: 'center', pointerEvents: 'none'
                    }}>
                      {job.status === 'Job Completed' ? <CheckCircle2 size={14} /> :
                        job.status === 'Job Cancel' ? <X size={14} /> :
                          job.status === 'Job in Hold' ? <AlertCircle size={14} /> :
                            <Clock size={14} />}
                    </div>
                    <select
                      value={job.status}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        setJobs(jobs.map(j => j.id === job.id ? { ...j, status: newStatus } : j));
                      }}
                      style={{
                        padding: '0.4rem 0.6rem 0.4rem 1.8rem', borderRadius: '999px',
                        border: `1px solid ${job.status === 'Job Completed' ? '#10B981' :
                            job.status === 'Job Cancel' ? '#EF4444' :
                              job.status === 'Job in Hold' ? '#F59E0B' :
                                job.status === 'Job in Running' ? '#A855F7' : '#1D4ED8'
                          }`,
                        background: `${job.status === 'Job Completed' ? '#10B98115' :
                            job.status === 'Job Cancel' ? '#EF444415' :
                              job.status === 'Job in Hold' ? '#F59E0B15' :
                                job.status === 'Job in Running' ? '#A855F715' : '#1D4ED815'
                          }`,
                        color: `${job.status === 'Job Completed' ? '#10B981' :
                            job.status === 'Job Cancel' ? '#EF4444' :
                              job.status === 'Job in Hold' ? '#D97706' :
                                job.status === 'Job in Running' ? '#A855F7' : '#1D4ED8'
                          }`,
                        fontSize: '0.7rem', fontWeight: 800,
                        cursor: 'pointer', outline: 'none', appearance: 'none', minWidth: '150px'
                      }}
                    >
                      <option>Job in Schedule</option>
                      <option>Job in Running</option>
                      <option>Job in Hold</option>
                      <option>Job Completed</option>
                      <option>Job Cancel</option>
                    </select>
                  </div>
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button className="btn-action-edit" onClick={() => {
                      setActiveTab('add-job');
                      setJobForm(job);
                      setMaterialSpecs([{
                        id: Date.now(),
                        meal: job.meal,
                        gsm: job.gsm,
                        sizeCm: job.sizeCm,
                        sizeInch: job.sizeInch,
                        total: job.total,
                        rate: job.rate,
                        nxr: job.nxr,
                        date: job.date,
                        availableStock: job.availableStock || '0'
                      }]);
                    }}>
                      <Edit size={12} /> Edit
                    </button>
                    <button className="btn-action-print" onClick={() => window.print()}>
                      <Printer size={12} /> Print
                    </button>
                    <button className="btn-action-repeat" onClick={() => {
                      setActiveTab('add-job');
                      const { id, ...jobData } = job;
                      setJobForm({ ...jobData, name: jobData.name + ' (Repeat)' });
                      setMaterialSpecs([{
                        id: Date.now(),
                        meal: job.meal,
                        gsm: job.gsm,
                        sizeCm: job.sizeCm,
                        sizeInch: job.sizeInch,
                        total: job.total,
                        rate: job.rate,
                        nxr: job.nxr,
                        date: job.date,
                        availableStock: job.availableStock || '0'
                      }]);
                    }}>
                      <RefreshCcw size={12} /> Repeat
                    </button>
                    <button className="btn-action-delete" onClick={() => handleDeleteJob(job.id)}>
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{ padding: '0.75rem 1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing {Math.min((currentPage - 1) * rowsPerPage + 1, jobs.length)} to {Math.min(currentPage * rowsPerPage, jobs.length)} of {jobs.length} entries
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Rows per page:
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: '#fff', fontSize: '0.8rem', outline: 'none', cursor: 'pointer' }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: '#fff', color: currentPage === 1 ? '#ccc' : 'var(--text-muted)', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronLeft size={16} />
            </button>

            {[...Array(Math.max(1, Math.ceil(jobs.length / rowsPerPage)))].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  width: '32px', height: '32px', borderRadius: 'var(--radius-sm)',
                  border: currentPage === i + 1 ? 'none' : '1px solid var(--border-color)',
                  background: currentPage === i + 1 ? 'var(--primary)' : '#fff',
                  color: currentPage === i + 1 ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer'
                }}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(jobs.length / rowsPerPage)))}
              disabled={currentPage === Math.ceil(jobs.length / rowsPerPage) || jobs.length === 0}
              style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: '#fff', color: (currentPage === Math.ceil(jobs.length / rowsPerPage) || jobs.length === 0) ? '#ccc' : 'var(--text-muted)', cursor: (currentPage === Math.ceil(jobs.length / rowsPerPage) || jobs.length === 0) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'add-job', label: 'Add Job', icon: Plus },
    { id: 'manage-jobs', label: 'Manage Jobs', icon: Briefcase },
  ];

  return (
    <div style={{ animation: 'fadeIn .4s ease' }}>
      <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Job Management</span>
            <span>/</span>
            <span style={{ color: 'var(--text-main)' }}>
              {tabs.find(t => t.id === activeTab)?.label}
            </span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Job Management</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
            Create and monitor printing jobs, machine assignments, and production specs.
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

      {activeTab === 'add-job' ? renderAddJob() : renderManageJobs()}

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
      `}</style>
    </div>
  );
};

export default JobManagement;
