import React, { useState, useEffect } from 'react';
import {
  Package, Plus, Search, Filter, FileText, Mail,
  Printer, Download, Edit, Trash2, ChevronLeft,
  ChevronRight, X, Save, RefreshCcw, Calculator,
  TrendingUp, Activity, BarChart3, User, Coffee,
  Hash, Calendar, Layers, Maximize, Briefcase
} from 'lucide-react';

const StockData = () => {
  const [activeTab, setActiveTab] = useState('add'); // 'add', 'manage', 'report'
  const [search, setSearch] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const tabs = [
    { id: 'add', label: 'Add Stock', icon: Plus },
    { id: 'manage', label: 'Manage Stock', icon: Package },
    { id: 'report', label: 'Stock Report', icon: BarChart3 },
  ];

  const [stockItems, setStockItems] = useState([
    // AJRAMARJI PACKAGING - Group 1
    { id: 101, party: 'AJRAMARJI PACKAGING', meal: 'Aaditya PapTech', gsm: 120, sizeCm: '152.40 x 170.18 cm', sizeInch: '60 x 67 inch', grandTotal: '30', totalSheet: '30', date: '11-May-2026', invoice: 'INV-101', nxr: '12', jobDesc: 'Stock Added' },
    { id: 102, party: 'AJRAMARJI PACKAGING', meal: 'Aaditya PapTech', gsm: 120, sizeCm: '152.40 x 170.18 cm', sizeInch: '60 x 67 inch', grandTotal: '140', totalSheet: '140', date: '11-May-2026', invoice: 'INV-102', nxr: 'No NXR', jobDesc: 'Stock Added' },
    { id: 103, isJob: true, party: 'AJRAMARJI PACKAGING', meal: 'Aaditya PapTech', gsm: 120, sizeCm: '152.40 x 170.18 cm', sizeInch: '60 x 67 inch', grandTotal: '0', totalSheet: '-20', date: '11-May-2026', invoice: '-', nxr: '12', jobDesc: 'test with Nxr:12 - 10 sheets remaining, Nxr:No NXR has 140 sheets' },
    { id: 104, isJob: true, party: 'AJRAMARJI PACKAGING', meal: 'Aaditya PapTech', gsm: 120, sizeCm: '152.40 x 170.18 cm', sizeInch: '60 x 67 inch', grandTotal: '0', totalSheet: '-100', date: '11-May-2026', invoice: '-', nxr: 'No NXR', jobDesc: 'test with Nxr:12 - closed, Nxr:No NXR - 50 sheets remaining' },
    { id: 105, isJob: true, party: 'AJRAMARJI PACKAGING', meal: 'Aaditya PapTech', gsm: 120, sizeCm: '152.40 x 170.18 cm', sizeInch: '60 x 67 inch', grandTotal: '0', totalSheet: '-9', date: '11-May-2026', invoice: '-', nxr: 'No NXR', jobDesc: 'test with Nxr:No NXR - 41 sheets remaining' },

    // Party: 12 - Group 2 & 3
    { id: 201, party: '12', meal: 'Stock', gsm: '-', sizeCm: '98 x 87 cm', sizeInch: '38.58 x 34.25 inch', grandTotal: '3024', totalSheet: '3024', date: '12-May-2026', invoice: 'INV-201', jobDesc: 'Stock Added' },
    { id: 202, party: '12', meal: 'Stock', gsm: '-', sizeCm: '90 x 90 cm', sizeInch: '35.43 x 35.43 inch', grandTotal: '1728', totalSheet: '1728', date: '12-May-2026', invoice: 'INV-202', jobDesc: 'Stock Added' },

    // Ashit Packaging - Group 4
    { id: 301, party: 'Ashit Packaging', meal: 'Deon Taps', gsm: 700, sizeCm: '70 x 70 cm', sizeInch: '27.56 x 27.56 inch', grandTotal: '120', totalSheet: '120', date: '21-Mar-2026', invoice: 'INV-301', jobDesc: 'Stock Added' },
    { id: 302, party: 'Ashit Packaging', meal: 'Deon Taps', gsm: 700, sizeCm: '70 x 70 cm', sizeInch: '27.56 x 27.56 inch', grandTotal: '36', totalSheet: '36', date: '21-Mar-2026', invoice: 'INV-302', jobDesc: 'Stock Added' },
    { id: 303, isJob: true, party: 'Ashit Packaging', meal: 'Deon Taps', gsm: 700, sizeCm: '70 x 70 cm', sizeInch: '27.56 x 27.56 inch', grandTotal: '0', totalSheet: '-100', date: '21-Mar-2026', invoice: '-', jobDesc: 'job 6 with Nxr:2020 - 20 sheets remaining, Nxr:2021 has 36 sheets' },

    // test party - Group 5 (Deon Taps)
    { id: 401, party: 'test party', meal: 'Deon Taps', gsm: 90, sizeCm: '90 x 90 cm', sizeInch: '35.43 x 35.43 inch', grandTotal: '180', totalSheet: '180', date: '10-Mar-2026', invoice: 'INV-401', jobDesc: 'Stock Added' },
    { id: 402, isJob: true, party: 'test party', meal: 'Deon Taps', gsm: 90, sizeCm: '90 x 90 cm', sizeInch: '35.43 x 35.43 inch', grandTotal: '0', totalSheet: '-80', date: '10-Mar-2026', invoice: '-', jobDesc: 'test job1 with Nxr:2 - 100 sheets remaining' },

    // test party - Group 6 (test meal)
    { id: 501, party: 'test party', meal: 'test meal', gsm: 90, sizeCm: '90 x 90 cm', sizeInch: '35.43 x 35.43 inch', grandTotal: '210', totalSheet: '210', date: '10-Mar-2026', invoice: 'INV-501', jobDesc: 'Stock Added' },
    { id: 502, party: 'test party', meal: 'test meal', gsm: 90, sizeCm: '90 x 90 cm', sizeInch: '35.43 x 35.43 inch', grandTotal: '112', totalSheet: '112', date: '10-Mar-2026', invoice: 'INV-502', jobDesc: 'Stock Added' },
    { id: 503, isJob: true, party: 'test party', meal: 'test meal', gsm: 90, sizeCm: '90 x 90 cm', sizeInch: '35.43 x 35.43 inch', grandTotal: '0', totalSheet: '-100', date: '10-Mar-2026', invoice: '-', jobDesc: 'test job 2 with Nxr:1 - 110 sheets remaining, Nxr:3 has 112 sheets' },
    { id: 504, isJob: true, party: 'test party', meal: 'test meal', gsm: 90, sizeCm: '90 x 90 cm', sizeInch: '35.43 x 35.43 inch', grandTotal: '0', totalSheet: '-200', date: '10-Mar-2026', invoice: '-', jobDesc: 'test job 2 with Nxr:1 - closed, Nxr:3 - 22 sheets remaining' },
    { id: 505, isJob: true, party: 'test party', meal: 'test meal', gsm: 90, sizeCm: '90 x 90 cm', sizeInch: '35.43 x 35.43 inch', grandTotal: '0', totalSheet: '-22', date: '10-Mar-2026', invoice: '-', jobDesc: 'test job 4 with Nxr:3 - closed' },
  ]);

  const [stockForm, setStockForm] = useState({
    party: '',
    meal: '',
    invoice: '',
    nxr: '',
    rate: '',
    date: new Date().toLocaleDateString('en-GB').split('/').join('-')
  });

  const [stockSpecs, setStockSpecs] = useState([{
    id: Date.now(),
    bundleNo: '',
    perBundleRim: '',
    totalRim: '',
    sheetsInRim: '',
    totalSheet: '',
    gsm: '',
    size: '',
    sizeUnit: 'cm',
    weight: '',
    convSize: '',
    mode: 'calc' // 'calc' or 'manual'
  }]);

  const addSpecRow = () => {
    setStockSpecs([...stockSpecs, {
      id: Date.now(),
      bundleNo: '',
      perBundleRim: '',
      totalRim: '',
      sheetsInRim: '',
      totalSheet: '',
      gsm: '',
      size: '',
      sizeUnit: 'cm',
      weight: '',
      convSize: '',
      mode: 'calc'
    }]);
  };

  const removeSpecRow = (id) => {
    if (stockSpecs.length > 1) {
      setStockSpecs(stockSpecs.filter(row => row.id !== id));
    }
  };

  // Proper Logic and Formulas as per Shreeji Data PDF
  const calculateValues = (spec, gsm, size, sizeUnit) => {
    const bundleNo = parseFloat(spec.bundleNo) || 0;
    const perBundleRim = parseFloat(spec.perBundleRim) || 0;
    const sheetsInRim = parseFloat(spec.sheetsInRim) || 0;
    const gsmNum = parseFloat(gsm) || 0;

    let totalRim = spec.totalRim;
    let totalSheet = spec.totalSheet;
    let weight = '0.00';
    let convSize = '-';

    // Formula 1: Total Rim = Bundle No * Per Bundle Rim
    if (spec.mode === 'calc') {
      totalRim = (bundleNo * perBundleRim).toFixed(2);
      // Formula 2: Total Sheet = Total Rim * Sheets In Rim
      totalSheet = (parseFloat(totalRim) * sheetsInRim).toFixed(2);
    }

    const currentTotalSheet = parseFloat(totalSheet) || 0;

    if (size) {
      const parts = size.split(/[*x]/i);
      if (parts.length === 2) {
        const width = parseFloat(parts[0]);
        const height = parseFloat(parts[1]);

        if (!isNaN(width) && !isNaN(height)) {
          let widthInch, heightInch;

          // Formula 3: Unit Conversion (1 inch = 2.54 cm)
          if (sizeUnit === 'cm') {
            widthInch = width / 2.54;
            heightInch = height / 2.54;
            convSize = `${widthInch.toFixed(2)} x ${heightInch.toFixed(2)} inch`;
          } else {
            widthInch = width;
            heightInch = height;
            convSize = `${(width * 2.54).toFixed(2)} x ${(height * 2.54).toFixed(2)} cm`;
          }

          // Formula 4: Weight (kg) Calculation
          // Weight (kg) = [ {(GSM × Width(inches) × Height(inches)) ÷ 1550} * Total Sheets ] ÷ 1000
          if (gsmNum > 0 && currentTotalSheet > 0) {
            const gramsPerSheet = (gsmNum * widthInch * heightInch) / 1550;
            weight = ((gramsPerSheet * currentTotalSheet) / 1000).toFixed(2);
          }
        }
      }
    }

    return { totalRim, totalSheet, convSize, weight };
  };

  useEffect(() => {
    const updatedSpecs = stockSpecs.map(spec => {
      const calcs = calculateValues(spec, spec.gsm, spec.size, spec.sizeUnit);
      return { ...spec, ...calcs };
    });

    const hasChanged = updatedSpecs.some((spec, i) =>
      spec.totalRim !== stockSpecs[i]?.totalRim ||
      spec.totalSheet !== stockSpecs[i]?.totalSheet ||
      spec.weight !== stockSpecs[i]?.weight ||
      spec.convSize !== stockSpecs[i]?.convSize
    );

    if (hasChanged) {
      setStockSpecs(updatedSpecs);
    }
  }, [stockSpecs.map(s => `${s.bundleNo}-${s.perBundleRim}-${s.sheetsInRim}-${s.totalSheet}-${s.mode}-${s.gsm}-${s.size}-${s.sizeUnit}`).join(',')]);

  const handleAddStock = (e) => {
    e.preventDefault();

    const itemsToAdd = stockSpecs.map(spec => ({
      id: stockForm.id && stockSpecs.length === 1 ? stockForm.id : Date.now() + Math.random(),
      ...stockForm,
      bundleNo: spec.bundleNo,
      perBundleRim: spec.perBundleRim,
      totalRim: spec.totalRim,
      sheetsInRim: spec.sheetsInRim,
      totalSheet: spec.totalSheet,
      grandTotal: spec.totalSheet,
      weight: spec.weight,
      gsm: spec.gsm,
      sizeCm: spec.sizeUnit === 'cm' ? spec.size + ' cm' : spec.convSize,
      sizeInch: spec.sizeUnit === 'inch' ? spec.size + ' inch' : spec.convSize,
    }));

    if (stockForm.id && stockSpecs.length === 1) {
      setStockItems(stockItems.map(s => s.id === stockForm.id ? itemsToAdd[0] : s));
    } else {
      setStockItems([...itemsToAdd, ...stockItems]);
    }

    setStockForm({ party: '', meal: '', invoice: '', nxr: '', rate: '', date: new Date().toLocaleDateString('en-GB').split('/').join('-') });
    setStockSpecs([{ id: Date.now(), bundleNo: '', perBundleRim: '', totalRim: '', sheetsInRim: '', totalSheet: '', gsm: '', size: '', sizeUnit: 'cm', weight: '', convSize: '', mode: 'calc' }]);
    setActiveTab('manage');
  };

  const handleDeleteStock = (id) => {
    if (window.confirm('Are you sure you want to delete this stock entry?')) {
      setStockItems(stockItems.filter(s => s.id !== id));
    }
  };

  const renderAddStock = () => (
    <form onSubmit={handleAddStock} style={{
      background: 'var(--surface)', border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)', width: '100%'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

        {/* Group 1: Basic Identity */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div style={{ width: '350px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              <User size={14} style={{ color: 'var(--primary)' }} /> Party Name *
            </label>
            <select
              required
              value={stockForm.party}
              onChange={(e) => setStockForm({ ...stockForm, party: e.target.value })}
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }}
            >
              <option value="">Select Party</option>
              <option>test party</option>
              <option>Ashit Packaging</option>
              <option>AJRAMARJI PACKAGING</option>
              <option>BoxPrintz Packaging Solutions</option>
              <option>Mukul Jamsans</option>
              <option>VINOD MEDICAL SYSTEMS Pvt,Ltd</option>
              <option>Pareen Pac.</option>
            </select>
          </div>
          <div style={{ width: '250px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              <Coffee size={14} style={{ color: 'var(--primary)' }} /> Meal Name *
            </label>
            <select
              required
              value={stockForm.meal}
              onChange={(e) => setStockForm({ ...stockForm, meal: e.target.value })}
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }}
            >
              <option value="">Select Meal</option>
              <option>test meal</option>
              <option>Deon Taps</option>
              <option>Aaditya PapTech</option>
              <option>H C Shah & Sons</option>
              <option>Kherani Paper</option>
            </select>
          </div>
          <div style={{ width: '220px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              <FileText size={14} style={{ color: 'var(--primary)' }} /> Invoice No *
            </label>
            <input
              type="text"
              placeholder="Enter invoice number"
              required
              value={stockForm.invoice}
              onChange={(e) => setStockForm({ ...stockForm, invoice: e.target.value })}
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }}
            />
          </div>
        </div>

        {/* Dynamic Groups: Optimized Widths for Density */}
        {stockSpecs.map((spec, index) => (
          <div key={spec.id} style={{
            display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end', padding: '1.25rem',
            border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)',
            background: index % 2 === 0 ? 'rgba(79, 70, 229, 0.05)' : 'rgba(249, 250, 251, 0.5)'
          }}>
            <div style={{ width: '100px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                <Layers size={14} style={{ color: 'var(--primary)' }} /> Bundle No
              </label>
              <input
                type="number"
                step="any"
                placeholder="0"
                value={spec.bundleNo}
                disabled={spec.mode === 'manual'}
                onChange={(e) => {
                  const newSpecs = [...stockSpecs];
                  newSpecs[index].bundleNo = e.target.value;
                  setStockSpecs(newSpecs);
                }}
                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: spec.mode === 'manual' ? '#f5f5f5' : '#fff', fontSize: '0.85rem' }}
              />
            </div>
            <div style={{ width: '130px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                <Layers size={14} style={{ color: 'var(--primary)' }} /> Per Bundle Rim
              </label>
              <input
                type="number"
                step="any"
                placeholder="0"
                value={spec.perBundleRim}
                disabled={spec.mode === 'manual'}
                onChange={(e) => {
                  const newSpecs = [...stockSpecs];
                  newSpecs[index].perBundleRim = e.target.value;
                  setStockSpecs(newSpecs);
                }}
                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: spec.mode === 'manual' ? '#f5f5f5' : '#fff', fontSize: '0.85rem' }}
              />
            </div>
            <div style={{ width: '100px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                <FileText size={14} style={{ color: 'var(--primary)' }} /> Total Rim
              </label>
              <input
                type="text"
                value={spec.totalRim}
                readOnly
                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem' }}
              />
            </div>
            <div style={{ width: '110px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                <Maximize size={14} style={{ color: 'var(--primary)' }} /> Sheets in Rim
              </label>
              <input
                type="number"
                placeholder="0"
                value={spec.sheetsInRim}
                disabled={spec.mode === 'manual'}
                onChange={(e) => {
                  const newSpecs = [...stockSpecs];
                  newSpecs[index].sheetsInRim = e.target.value;
                  setStockSpecs(newSpecs);
                }}
                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: spec.mode === 'manual' ? '#f5f5f5' : '#fff', fontSize: '0.85rem' }}
              />
            </div>
            <div style={{ width: '180px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                <Calculator size={14} style={{ color: 'var(--primary)' }} /> Total Sheet *
              </label>
              <div style={{ display: 'flex', gap: '0px', position: 'relative' }}>
                <input
                  type="number"
                  step="any"
                  value={spec.totalSheet}
                  required
                  readOnly={spec.mode === 'calc'}
                  onChange={(e) => {
                    if (spec.mode === 'manual') {
                      const newSpecs = [...stockSpecs];
                      newSpecs[index].totalSheet = e.target.value;
                      setStockSpecs(newSpecs);
                    }
                  }}
                  style={{ flex: 1, minWidth: 0, padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md) 0 0 var(--radius-md)', border: '1px solid var(--border-color)', borderRight: 'none', background: spec.mode === 'calc' ? 'var(--bg-color)' : '#fff', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem' }}
                />
                <select
                  value={spec.mode}
                  onChange={(e) => {
                    const newSpecs = [...stockSpecs];
                    newSpecs[index].mode = e.target.value;
                    setStockSpecs(newSpecs);
                  }}
                  style={{ width: '75px', padding: '0.5rem 0.3rem', borderRadius: '0 var(--radius-md) var(--radius-md) 0', border: '1px solid var(--border-color)', background: '#fff', fontSize: '0.75rem', cursor: 'pointer', outline: 'none' }}
                >
                  <option value="calc">Calc</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
            </div>
            <div style={{ width: '85px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                <Layers size={14} style={{ color: 'var(--primary)' }} /> GSM *
              </label>
              <input
                type="number"
                placeholder="e.g. 80"
                required
                value={spec.gsm}
                onChange={(e) => {
                  const newSpecs = [...stockSpecs];
                  newSpecs[index].gsm = e.target.value;
                  setStockSpecs(newSpecs);
                }}
                style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#fff', fontSize: '0.85rem' }}
              />
            </div>
            <div style={{ width: '180px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                <Maximize size={14} style={{ color: 'var(--primary)' }} /> Paper/Reel Size *
              </label>
              <div style={{ display: 'flex', gap: '0px' }}>
                <input
                  type="text"
                  placeholder="e.g., 60*67"
                  required
                  value={spec.size}
                  onChange={(e) => {
                    const newSpecs = [...stockSpecs];
                    newSpecs[index].size = e.target.value;
                    setStockSpecs(newSpecs);
                  }}
                  style={{ flex: 1, minWidth: 0, padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md) 0 0 var(--radius-md)', border: '1px solid var(--border-color)', borderRight: 'none', background: '#fff', fontSize: '0.85rem' }}
                />
                <select
                  value={spec.sizeUnit}
                  onChange={(e) => {
                    const newSpecs = [...stockSpecs];
                    newSpecs[index].sizeUnit = e.target.value;
                    setStockSpecs(newSpecs);
                  }}
                  style={{ width: '60px', padding: '0.5rem 0.3rem', borderRadius: '0 var(--radius-md) var(--radius-md) 0', border: '1px solid var(--border-color)', background: '#fff', fontSize: '0.75rem', cursor: 'pointer', outline: 'none' }}
                >
                  <option value="cm">cm</option>
                  <option value="inch">inch</option>
                </select>
              </div>
            </div>
            <div style={{ width: '130px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                <RefreshCcw size={14} style={{ color: 'var(--primary)' }} /> Conv. Size
              </label>
              <input type="text" value={spec.convSize} readOnly style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem' }} />
            </div>
            <div style={{ width: '140px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                <Briefcase size={14} style={{ color: 'var(--primary)' }} /> Weight (kg)
              </label>
              <input type="text" value={spec.weight} readOnly style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem' }} />
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button
                type="button"
                onClick={addSpecRow}
                style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
              >
                <Plus size={18} />
              </button>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeSpecRow(spec.id)}
                  style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', border: 'none', background: '#EF4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Group 4: Logistics */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div style={{ width: '180px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              <Hash size={14} style={{ color: 'var(--primary)' }} /> NXR No
            </label>
            <input
              type="text"
              placeholder="Enter NXR"
              value={stockForm.nxr}
              onChange={(e) => setStockForm({ ...stockForm, nxr: e.target.value })}
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }}
            />
          </div>
          <div style={{ width: '150px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              <TrendingUp size={14} style={{ color: 'var(--primary)' }} /> Rate
            </label>
            <input
              type="number"
              step="any"
              placeholder="0.00"
              value={stockForm.rate}
              onChange={(e) => setStockForm({ ...stockForm, rate: e.target.value })}
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }}
            />
          </div>
          <div style={{ width: '220px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              <Calendar size={14} style={{ color: 'var(--primary)' }} /> Chalan Date
            </label>
            <input
              type="text"
              placeholder="dd-mm-yyyy"
              value={stockForm.date}
              onChange={(e) => setStockForm({ ...stockForm, date: e.target.value })}
              style={{ width: '100%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.9rem' }}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <button type="button" onClick={() => setActiveTab('manage')} style={{ padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Cancel</button>
        <button type="button" onClick={() => { setStockForm({ party: '', meal: '', invoice: '', nxr: '', rate: '', date: new Date().toLocaleDateString('en-GB').split('/').join('-') }); setStockSpecs([{ id: Date.now(), bundleNo: '', perBundleRim: '', totalRim: '', sheetsInRim: '', totalSheet: '', gsm: '', size: '', sizeUnit: 'cm', weight: '', convSize: '', mode: 'calc' }]); }} style={{
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
          <Save size={18} /> {stockForm.id ? 'Update Stock' : 'Add Stock'}
        </button>
      </div>
    </form>
  );

  const renderManageStock = () => (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden'
    }}>
      {/* Header & Search Bar */}
      <div style={{ padding: '0.5rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(79, 70, 229, 0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Package size={20} style={{ color: 'var(--primary)' }} />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>Stock Inventory</h2>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text" placeholder="Search stock..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '0.55rem 1rem 0.55rem 2.5rem', borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)', fontSize: '0.85rem'
              }}
            />
          </div>

          <button onClick={() => setSearch('')} style={{ padding: '0.55rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#fff', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <X size={14} /> Clear
          </button>

          <button onClick={() => window.print()} style={{ padding: '0.55rem 1rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--primary)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
            <FileText size={16} /> Export Data to Pdf and Send Email
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="stock-table-container" style={{ overflowX: 'auto' }}>
        <table className="stock-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
              {[
                'Party', 'Meal', 'Invoice', 'Bundle No', 'Per Bundle Rim', 'Total Rim',
                'Sheets in Rim', 'Total Sheet', 'Grand Total Sheet', 'Weight',
                'Size (cm)', 'Size (inch)', 'GSM', 'NXR No', 'Rate', 'Chalan Date', 'Actions'
              ].map(h => (
                <th key={h} style={{ padding: '0.4rem 0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'none', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stockItems.filter(s => !s.isJob && (s.party.toLowerCase().includes(search.toLowerCase()) || s.meal.toLowerCase().includes(search.toLowerCase()))).slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage).map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid var(--border-color)', background: '#fff' }}>
                <td style={{ padding: '0.45rem 0.75rem', fontWeight: 500, whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{s.party}</td>
                <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{s.meal}</td>
                <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{s.invoice}</td>
                <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{s.bundleNo}</td>
                <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{s.perBundleRim}</td>
                <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{s.totalRim}</td>
                <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{s.sheetsInRim}</td>
                <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{s.totalSheet}</td>
                <td style={{ padding: '0.45rem 0.75rem', fontWeight: 700, color: 'var(--primary)', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{s.grandTotal}</td>
                <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{s.weight} kg</td>
                <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{s.sizeCm}</td>
                <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{s.sizeInch}</td>
                <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{s.gsm}</td>
                <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{s.nxr}</td>
                <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{s.rate ? `₹${s.rate}` : ''}</td>
                <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{s.date}</td>
                <td style={{ padding: '0.45rem 0.75rem', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button className="btn-action-edit" onClick={() => {
                      setActiveTab('add');
                      const unit = s.sizeCm.toLowerCase().includes('cm') ? 'cm' : 'inch';
                      setStockForm({
                        ...s,
                        nxr: s.nxr,
                        rate: s.rate
                      });
                      setStockSpecs([{
                        ...s,
                        id: Date.now(),
                        gsm: s.gsm,
                        size: unit === 'cm' ? s.sizeCm.replace(' cm', '') : s.sizeInch.replace(' inch', ''),
                        sizeUnit: unit,
                        convSize: unit === 'cm' ? s.sizeInch : s.sizeCm,
                        mode: 'manual'
                      }]);
                    }}>
                      <Edit size={14} /> Edit
                    </button>
                    <button className="btn-action-delete" onClick={() => handleDeleteStock(s.id)}>
                      <Trash2 size={14} /> Delete
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
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Showing {Math.min((currentPage - 1) * rowsPerPage + 1, stockItems.length)} to {Math.min(currentPage * rowsPerPage, stockItems.length)} of {stockItems.length} entries
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

            {[...Array(Math.max(1, Math.ceil(stockItems.length / rowsPerPage)))].map((_, i) => (
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
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(stockItems.length / rowsPerPage)))}
              disabled={currentPage === Math.ceil(stockItems.length / rowsPerPage) || stockItems.length === 0}
              style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: '#fff', color: (currentPage === Math.ceil(stockItems.length / rowsPerPage) || stockItems.length === 0) ? '#ccc' : 'var(--text-muted)', cursor: (currentPage === Math.ceil(stockItems.length / rowsPerPage) || stockItems.length === 0) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStockReport = () => {
    // Dynamically calculate report data based on stockItems
    const groupedData = {};

    stockItems.forEach(item => {
      const key = `${item.party}|${item.meal}|${item.gsm}|${item.sizeCm}`;
      if (!groupedData[key]) {
        groupedData[key] = {
          party: item.party,
          meal: item.meal,
          gsm: item.gsm,
          size: item.sizeCm,
          flows: [],
          totals: { used: 0, added: 0, avail: 0 }
        };
      }

      const added = parseFloat(item.grandTotal) || 0;
      const avail = parseFloat(item.totalSheet) || 0;
      const used = added - avail;

      groupedData[key].flows.push({
        prev: (groupedData[key].totals.avail).toString(),
        used: used > 0 ? used.toString() : '',
        added: added.toString(),
        avail: (groupedData[key].totals.avail + added - used).toString(),
        date: item.date || 'N/A',
        jobs: item.jobDesc || (used > 0 ? `Used ${used} sheets` : 'Stock Added')
      });

      groupedData[key].totals.added += added;
      groupedData[key].totals.avail += avail;
      groupedData[key].totals.used += used;
    });

    const reportData = Object.values(groupedData);

    return (
      <div style={{ animation: 'fadeIn .4s ease' }}>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden'
        }}>

          {/* Header & Filter Bar */}
          <div style={{
            padding: '0.5rem 1.5rem', borderBottom: '1px solid var(--border-color)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
            background: 'rgba(79, 70, 229, 0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <BarChart3 size={20} style={{ color: 'var(--primary)' }} />
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>Material Breakdown</h2>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button onClick={() => window.print()} style={{ padding: '0.55rem 1.5rem', borderRadius: 'var(--radius-md)', background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={16} /> Export Report
              </button>
            </div>
          </div>

          {/* Table Section */}
          <div className="stock-table-container" style={{ overflowX: 'auto' }}>
            <table className="stock-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
                  {[
                    'Party Name', 'Meal Name', 'GSM', 'Size (cm)', 'Previous Stock (Sheets)',
                    'Used Stock (Sheets)', 'Added Stock', 'Available Stock', 'Date', 'Jobs'
                  ].map(h => (
                    <th key={h} style={{ padding: '0.4rem 0.75rem', fontWeight: 700, color: 'var(--text-muted)', borderRight: '1px solid rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reportData.length === 0 ? (
                  <tr>
                    <td colSpan="10" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No stock data available for report.</td>
                  </tr>
                ) : reportData.map((group, gIdx) => (
                  <React.Fragment key={gIdx}>
                    {group.flows.map((flow, fIdx) => (
                      <tr key={fIdx} style={{ borderBottom: '1px solid var(--border-color)', background: '#fff' }}>
                        {fIdx === 0 ? (
                          <>
                            <td rowSpan={group.flows.length + 1} style={{ padding: '0.45rem 0.75rem', fontWeight: 600, borderRight: '1px solid rgba(0,0,0,0.05)', verticalAlign: 'top' }}>{group.party}</td>
                            <td rowSpan={group.flows.length + 1} style={{ padding: '0.45rem 0.75rem', borderRight: '1px solid rgba(0,0,0,0.05)', verticalAlign: 'top' }}>{group.meal}</td>
                          </>
                        ) : null}
                        <td style={{ padding: '0.45rem 0.75rem', borderRight: '1px solid rgba(0,0,0,0.05)' }}>{group.gsm}</td>
                        <td style={{ padding: '0.45rem 0.75rem', borderRight: '1px solid rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>{group.size}</td>
                        <td style={{ padding: '0.45rem 0.75rem', borderRight: '1px solid rgba(0,0,0,0.05)', textAlign: 'right' }}>{flow.prev}</td>
                        <td style={{ padding: '0.45rem 0.75rem', borderRight: '1px solid rgba(0,0,0,0.05)', textAlign: 'right' }}>{flow.used}</td>
                        <td style={{ padding: '0.45rem 0.75rem', borderRight: '1px solid rgba(0,0,0,0.05)', textAlign: 'right', color: flow.added ? '#10B981' : 'inherit', fontWeight: flow.added ? 700 : 'normal' }}>{flow.added || ''}</td>
                        <td style={{ padding: '0.45rem 0.75rem', borderRight: '1px solid rgba(0,0,0,0.05)', textAlign: 'right', fontWeight: 700 }}>{flow.avail}</td>
                        <td style={{ padding: '0.45rem 0.75rem', borderRight: '1px solid rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>{flow.date}</td>
                        <td style={{ padding: '0.45rem 0.75rem', borderRight: '1px solid rgba(0,0,0,0.05)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>{flow.jobs}</td>
                      </tr>
                    ))}
                    {/* Subtotal Row */}
                    <tr style={{ background: 'rgba(79, 70, 229, 0.03)', borderBottom: '2px solid var(--border-color)' }}>
                      {/* Columns 1 & 2 are occupied by rowSpan from the first row of the group */}
                      <td style={{ padding: '0.4rem 0.75rem', fontWeight: 800, borderRight: '1px solid rgba(0,0,0,0.05)' }}>Total</td> {/* GSM Column */}
                      <td style={{ padding: '0.4rem 0.75rem', borderRight: '1px solid rgba(0,0,0,0.05)' }}></td> {/* Size Column */}
                      <td style={{ padding: '0.4rem 0.75rem', borderRight: '1px solid rgba(0,0,0,0.05)' }}></td> {/* Previous Stock Column */}
                      <td style={{ padding: '0.4rem 0.75rem', borderRight: '1px solid rgba(0,0,0,0.05)', textAlign: 'right', fontWeight: 800 }}>{group.totals.used || ''}</td>
                      <td style={{ padding: '0.4rem 0.75rem', borderRight: '1px solid rgba(0,0,0,0.05)', textAlign: 'right', fontWeight: 800, color: '#10B981' }}>{group.totals.added}</td>
                      <td style={{ padding: '0.4rem 0.75rem', borderRight: '1px solid rgba(0,0,0,0.05)', textAlign: 'right', fontWeight: 800, color: 'var(--primary)' }}>{group.totals.avail}</td>
                      <td colSpan={2} style={{ borderRight: '1px solid rgba(0,0,0,0.05)' }}></td> {/* Date & Jobs Columns */}
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ animation: 'fadeIn .4s ease' }}>
      <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Stock Management</span>
            <span>/</span>
            <span style={{ color: 'var(--text-main)' }}>{tabs.find(t => t.id === activeTab)?.label || 'add'}</span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Stock Management</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.2rem', fontSize: '0.9rem' }}>
            Centralized hub for monitoring and managing your paper inventory accurately.
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

      {activeTab === 'add' && renderAddStock()}
      {activeTab === 'manage' && renderManageStock()}
      {activeTab === 'report' && renderStockReport()}

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
      `}</style>
    </div>
  );
};

export default StockData;
