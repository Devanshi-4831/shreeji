import React from 'react';
import { 
  Package, Briefcase, Users, Coffee, AlertTriangle, 
  ArrowUpRight, ArrowDownRight, Clock, Plus, FileText, 
  Search, TrendingUp, BarChart3, PieChart as PieChartIcon, Activity
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';

const data = [
  { name: 'Jan', stock: 400, jobs: 240, meals: 240 },
  { name: 'Feb', stock: 300, jobs: 139, meals: 221 },
  { name: 'Mar', stock: 200, jobs: 980, meals: 229 },
  { name: 'Apr', stock: 278, jobs: 390, meals: 200 },
  { name: 'May', stock: 189, jobs: 480, meals: 218 },
  { name: 'Jun', stock: 239, jobs: 380, meals: 250 },
];

const pieData = [
  { name: 'Stock', value: 400 },
  { name: 'Jobs', value: 300 },
  { name: 'Parties', value: 300 },
  { name: 'Meals', value: 200 },
];

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const DashboardCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)', padding: '1.5rem',
    boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column',
    gap: '0.75rem', transition: 'transform 0.2s',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ 
        width: 44, height: 44, borderRadius: 'var(--radius-md)', 
        background: `${color}15`, color: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Icon size={24} />
      </div>
      {trend && (
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: '0.25rem',
          fontSize: '0.8rem', fontWeight: 600,
          color: trend === 'up' ? '#10B981' : '#EF4444'
        }}>
          {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trendValue}
        </div>
      )}
    </div>
    <div>
      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {title}
      </div>
      <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.25rem' }}>
        {value}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div style={{ animation: 'fadeIn .4s ease' }}>
      <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Dashboard Overview</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{
            padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
            background: 'var(--surface)', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            <FileText size={16} /> Generate Report
          </button>
        </div>
      </div>

      {/* ─── STATS CARDS ─── */}
      <div style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', marginBottom: '1.25rem' 
      }}>
        <DashboardCard title="Total Stock" value="1,284" icon={Package} trend="up" trendValue="12%" color="#6366F1" />
        <DashboardCard title="Available Sheets" value="84,500" icon={Activity} trend="down" trendValue="5%" color="#10B981" />
        <DashboardCard title="Total Jobs" value="482" icon={Briefcase} trend="up" trendValue="8%" color="#F59E0B" />
        <DashboardCard title="Total Parties" value="24" icon={Users} color="#8B5CF6" />
        <DashboardCard title="Total Meals" value="156" icon={Coffee} color="#EC4899" />
        <DashboardCard title="Pending Jobs" value="12" icon={Clock} color="#EF4444" />
        <DashboardCard title="Low Stock" value="3" icon={AlertTriangle} color="#F43F5E" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        {/* ─── CHARTS ─── */}
        <div style={{ 
          background: 'var(--surface)', border: '1px solid var(--border-color)', 
          borderRadius: 'var(--radius-lg)', padding: '1rem', boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} /> Stock Usage Chart
            </h3>
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-main)' }}
                />
                <Area type="monotone" dataKey="stock" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorStock)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ 
          background: 'var(--surface)', border: '1px solid var(--border-color)', 
          borderRadius: 'var(--radius-lg)', padding: '1rem', boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={18} /> Monthly Job Completion
            </h3>
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--text-muted)', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                  contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                />
                <Bar dataKey="jobs" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {/* ─── RECENT ACTIVITIES ─── */}
        <div style={{ 
          background: 'var(--surface)', border: '1px solid var(--border-color)', 
          borderRadius: 'var(--radius-lg)', padding: '1rem', boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>Recent Activities</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { type: 'Stock', msg: 'New stock added: 200 rims of 80 GSM Paper', time: '10 mins ago', icon: Package, bg: '#6366F1' },
              { type: 'Job', msg: 'Job #482 completed for Acme Corp', time: '2 hours ago', icon: Briefcase, bg: '#F59E0B' },
              { type: 'Party', msg: 'New party "Global Printers" added', time: '5 hours ago', icon: Users, bg: '#8B5CF6' },
              { type: 'Meal', msg: 'Meal log for Lunch (Parties) recorded', time: 'Yesterday', icon: Coffee, bg: '#EC4899' },
            ].map((act, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ 
                  width: 32, height: 32, borderRadius: '50%', background: act.bg, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 
                }}>
                  <act.icon size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{act.msg}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── QUICK ACTIONS ─── */}
        <div style={{ 
          background: 'var(--surface)', border: '1px solid var(--border-color)', 
          borderRadius: 'var(--radius-lg)', padding: '1rem', boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { label: 'Add Stock', icon: Plus, color: '#6366F1' },
              { label: 'Add Job', icon: Plus, color: '#F59E0B' },
              { label: 'Add Party', icon: Plus, color: '#8B5CF6' },
              { label: 'Export PDF', icon: FileText, color: '#10B981' },
            ].map((action, i) => (
              <button key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
                background: 'var(--bg-color)', cursor: 'pointer', transition: 'all 0.2s'
              }}>
                <div style={{ color: action.color }}>
                  <action.icon size={24} />
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }
      `}</style>
    </div>
  );
};

export default Dashboard;
