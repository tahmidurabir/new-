import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Database, 
  BarChart3, 
  LogOut,
  Bell,
  Search,
  Plus,
  Loader2,
  Save,
  Mail,
  Edit2,
  Trash2,
  X,
  Plug,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '../contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { INITIAL_CONTENT } from '../constants';

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/abir' },
    { icon: Users, label: 'Leads (CRM)', path: '/abir/leads' },
    { icon: Database, label: 'CMS / Content', path: '/abir/cms' },
    { icon: Plug, label: 'Integrations', path: '/abir/integrations' },
    { icon: BarChart3, label: 'Analytics', path: '/abir/analytics' },
    { icon: Settings, label: 'Settings', path: '/abir/settings' },
  ];

  return (
    <div className="flex h-screen bg-transparent">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-white/[0.02] backdrop-blur-xl hidden md:flex flex-col">
        <div className="p-8 pb-4">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Database className="text-white w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl">Systemic<span className="text-primary">Chat</span></span>
          </Link>
          <div className="text-xs font-bold text-text-secondary uppercase tracking-[0.2em] mb-6">Main Menu</div>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                  location.pathname === item.path 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-text-secondary hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn("w-5 h-5", location.pathname === item.path ? "text-primary" : "group-hover:text-white")} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-white/5">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="leads" element={<LeadsCRM />} />
            <Route path="cms" element={<CMSManager />} />
            <Route path="integrations" element={<IntegrationsView />} />
            <Route path="analytics" element={<AnalyticsView />} />
            <Route path="settings" element={<SettingsView />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function Overview() {
  const [stats, setStats] = useState({ visits: '12.4k', leads: '0', conv: '0%', response: '1.2m' });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const { count } = await supabase.from('leads').select('*', { count: 'exact', head: true });
      const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5);
      
      setStats(prev => ({ ...prev, leads: count?.toString() || '0' }));
      if (data) setRecentLeads(data);
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-text-secondary">Live metrics from your campaign.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Visits', value: stats.visits, change: 'Stable', color: 'text-primary' },
          { label: 'Total Leads', value: stats.leads, change: 'Live', color: 'text-secondary' },
          { label: 'Conv. Rate', value: stats.conv, change: 'N/A', color: 'text-accent' },
          { label: 'Avg. Response', value: stats.response, change: 'Target', color: 'text-white' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6">
            <p className="text-sm text-text-secondary mb-2">{stat.label}</p>
            <div className="flex items-baseline justify-between">
              <span className={cn("text-2xl font-bold font-display", stat.color)}>{stat.value}</span>
              <span className="text-[10px] text-secondary font-bold uppercase tracking-wider">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">Recent Leads</h3>
            <Link to="/abir/leads" className="text-xs text-primary hover:underline font-bold uppercase tracking-widest">View All</Link>
          </div>
          <div className="space-y-4">
             {recentLeads.length > 0 ? recentLeads.map(lead => (
               <div key={lead.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{lead.name}</p>
                      <p className="text-xs text-text-secondary">{lead.email}</p>
                    </div>
                 </div>
                 <div className="flex gap-2">
                    <span className="px-2 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded uppercase">{lead.status}</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">{lead.plan || 'No Plan'}</span>
                    <span className="px-2 py-1 bg-white/5 text-text-secondary text-[10px] font-bold rounded uppercase">{lead.platform}</span>
                 </div>
               </div>
             )) : (
               <div className="py-12 text-center text-text-secondary text-sm">No leads captured yet.</div>
             )}
          </div>
        </div>

        <div className="glass-card p-6">
           <h3 className="font-bold mb-6">System Health</h3>
           <div className="space-y-6">
              {[
                { title: 'Supabase Realtime', status: 'Online', color: 'bg-secondary' },
                { title: 'Messenger API', status: 'Active', color: 'bg-primary' },
                { title: 'Automation Worker', status: 'Idle', color: 'bg-text-secondary' },
              ].map((n, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{n.title}</span>
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", n.color)} />
                    <span className="text-xs text-text-secondary">{n.status}</span>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

function LeadsCRM() { 
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLead, setEditingLead] = useState<any | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (data) setLeads(data);
    setLoading(false);
  };

  const deleteLead = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      await supabase.from('leads').delete().eq('id', id);
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  const saveLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;
    
    await supabase.from('leads').update({
      name: editingLead.name,
      email: editingLead.email,
      plan: editingLead.plan,
      platform: editingLead.platform,
      status: editingLead.status
    }).eq('id', editingLead.id);
    
    setEditingLead(null);
    fetchLeads();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Leads Management</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input placeholder="Search leads..." className="input-glass py-2 pl-10 text-sm w-64" />
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-xs font-bold uppercase tracking-wider text-text-secondary border-b border-white/5">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Plan</th>
              <th className="px-6 py-4">Platform</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={7} className="text-center py-20"><Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" /></td></tr>
            ) : leads.length > 0 ? leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4 font-medium">{lead.name}</td>
                <td className="px-6 py-4 text-text-secondary text-sm">{lead.email}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-[10px] font-bold">{lead.plan || 'No Plan'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-bold">{lead.platform}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-1 rounded text-[10px] font-bold uppercase",
                    lead.status === 'new' ? "bg-primary/10 text-primary" : "bg-white/5 text-text-secondary"
                  )}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-text-secondary text-xs">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-100 group-hover:opacity-100 transition-opacity md:opacity-0">
                    <a href={`mailto:${lead.email}`} className="p-2 hover:bg-white/10 rounded-lg text-text-secondary hover:text-white transition-colors" title="Send Email">
                      <Mail className="w-4 h-4" />
                    </a>
                    <button onClick={() => setEditingLead(lead)} className="p-2 hover:bg-white/10 rounded-lg text-text-secondary hover:text-white transition-colors" title="Edit Lead">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteLead(lead.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-text-secondary hover:text-red-500 transition-colors" title="Delete Lead">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={7} className="text-center py-20 text-text-secondary">No leads found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Lead Modal */}
      {editingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f1115] border border-white/10 rounded-2xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setEditingLead(null)}
              className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-lg text-text-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-bold mb-6">Edit Lead</h3>
            <form onSubmit={saveLead} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-secondary mb-2 uppercase">Name</label>
                <input 
                  type="text" 
                  className="input-glass w-full" 
                  value={editingLead.name || ''} 
                  onChange={e => setEditingLead({...editingLead, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-secondary mb-2 uppercase">Email</label>
                <input 
                  type="email" 
                  className="input-glass w-full" 
                  value={editingLead.email || ''} 
                  onChange={e => setEditingLead({...editingLead, email: e.target.value})}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-2 uppercase">Plan</label>
                  <select 
                    className="input-glass w-full appearance-none" 
                    value={editingLead.plan || ''} 
                    onChange={e => setEditingLead({...editingLead, plan: e.target.value})}
                  >
                    <option value="">No Plan</option>
                    <option value="Starter">Starter</option>
                    <option value="Pro">Pro</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary mb-2 uppercase">Platform</label>
                  <select 
                    className="input-glass w-full appearance-none" 
                    value={editingLead.platform || ''} 
                    onChange={e => setEditingLead({...editingLead, platform: e.target.value})}
                  >
                    <option value="Messenger">Messenger</option>
                    <option value="Instagram">Instagram</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Website">Website</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-text-secondary mb-2 uppercase">Status</label>
                <select 
                  className="input-glass w-full appearance-none" 
                  value={editingLead.status || ''} 
                  onChange={e => setEditingLead({...editingLead, status: e.target.value})}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setEditingLead(null)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  ); 
}

function CMSManager() { 
  const [siteData, setSiteData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from('site_content').select('*').in('section', ['hero', 'pricing']);
      const map: any = {
        hero: INITIAL_CONTENT.hero,
        pricing: INITIAL_CONTENT.pricing
      };
      if (data) {
        data.forEach(d => {
          if (d.section === 'hero' || d.section === 'pricing') {
             map[d.section] = { ...map[d.section], ...d.content };
          }
        });
      }
      setSiteData(map);
      setLoading(false);
    };
    fetchContent();
  }, []);

  const handleUpdate = async (e: React.FormEvent, section: string) => {
    e.preventDefault();
    setSaving(true);
    const content = siteData[section];
    const { data: existing } = await supabase.from('site_content').select('id').eq('section', section).single();
    if (existing) {
      await supabase.from('site_content').update({ content }).eq('section', section);
    } else {
      await supabase.from('site_content').insert([{ section, content }]);
    }
    setSaving(false);
    alert(`${section} updated successfully!`);
  };

  if (loading) return <div className="flex items-center justify-center p-20"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Content Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* HERO SECTION */}
        <form onSubmit={(e) => handleUpdate(e, 'hero')} className="glass-card p-6 space-y-6">
          <h3 className="font-bold text-lg mb-4 border-b border-white/5 pb-2">Hero Section</h3>
          <div>
            <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Headline</label>
            <input 
              className="input-glass text-sm" 
              value={siteData.hero?.headline || ''} 
              onChange={(e) => setSiteData({...siteData, hero: {...siteData.hero, headline: e.target.value}})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Subheadline</label>
            <textarea 
              className="input-glass text-sm h-24" 
              value={siteData.hero?.subheadline || ''} 
              onChange={(e) => setSiteData({...siteData, hero: {...siteData.hero, subheadline: e.target.value}})}
            />
          </div>
          <button type="submit" disabled={saving} className="btn-primary py-2 w-full text-sm flex items-center justify-center gap-2">
            {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <><Save className="w-4 h-4" /> Save Hero Settings</>}
          </button>
        </form>

        {/* PRICING SECTION */}
        <form onSubmit={(e) => handleUpdate(e, 'pricing')} className="glass-card p-6 space-y-6">
          <h3 className="font-bold text-lg mb-4 border-b border-white/5 pb-2">Pricing Section</h3>
          <div>
            <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Headline</label>
            <input 
              className="input-glass text-sm" 
              value={siteData.pricing?.headline || ''} 
              onChange={(e) => setSiteData({...siteData, pricing: {...siteData.pricing, headline: e.target.value}})}
            />
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-text-secondary">Plans</h4>
            {siteData.pricing?.plans?.map((plan: any, index: number) => (
              <div key={plan.id} className="p-4 border border-white/10 rounded-lg space-y-4 bg-white/5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-text-secondary mb-1">Name</label>
                    <input 
                      className="input-glass text-xs" 
                      value={plan.name} 
                      onChange={(e) => {
                        const newPlans = [...siteData.pricing.plans];
                        newPlans[index].name = e.target.value;
                        setSiteData({...siteData, pricing: {...siteData.pricing, plans: newPlans}});
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-text-secondary mb-1">Price</label>
                    <input 
                      className="input-glass text-xs" 
                      value={plan.price} 
                      onChange={(e) => {
                        const newPlans = [...siteData.pricing.plans];
                        newPlans[index].price = e.target.value;
                        setSiteData({...siteData, pricing: {...siteData.pricing, plans: newPlans}});
                      }}
                    />
                  </div>
                </div>
                <div>
                   <label className="block text-[10px] font-bold uppercase text-text-secondary mb-1">Features (comma separated)</label>
                   <textarea 
                     className="input-glass text-xs h-16" 
                     value={plan.features.join(', ')} 
                     onChange={(e) => {
                       const newPlans = [...siteData.pricing.plans];
                       newPlans[index].features = e.target.value.split(',').map(f => f.trim());
                       setSiteData({...siteData, pricing: {...siteData.pricing, plans: newPlans}});
                     }}
                   />
                </div>
              </div>
            ))}
          </div>

          <button type="submit" disabled={saving} className="btn-primary py-2 w-full text-sm flex items-center justify-center gap-2">
            {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <><Save className="w-4 h-4" /> Save Pricing Settings</>}
          </button>
        </form>
      </div>
    </div>
  );
}

function AnalyticsView() { 
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from('site_content').select('*').eq('section', 'analytics').single();
      if (data) {
        setContent(data.content);
      } else {
        setContent({ 
          ga4Id: '', 
          googleSearchConsole: '',
          microsoftClarity: '',
          metaPixel: '',
          tiktokPixel: '',
          hotjar: '',
          customHeadScripts: '',
          youtubeLink: ''
        });
      }
      setLoading(false);
    };
    fetchContent();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Upsert the analytics scripts into site_content
    const { data: existing } = await supabase.from('site_content').select('id').eq('section', 'analytics').single();
    
    if (existing) {
      await supabase.from('site_content').update({ content }).eq('section', 'analytics');
    } else {
      await supabase.from('site_content').insert([{ section: 'analytics', content }]);
    }
    
    setSaving(false);
    alert('Tracking codes updated successfully!');
  };

  if (loading) return <div className="flex items-center justify-center p-20"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics & Tracking</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleUpdate} className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 space-y-6">
            <h3 className="font-bold text-lg mb-4 border-b border-white/5 pb-2">Google Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Google Analytics 4 (Measurement ID)</label>
                <input 
                  className="input-glass text-sm" 
                  placeholder="G-XXXXXXXXXX"
                  value={content?.ga4Id || ''} 
                  onChange={(e) => setContent({...content, ga4Id: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Search Console (Verification ID)</label>
                <input 
                  className="input-glass text-sm" 
                  placeholder="html-tag-verification-code"
                  value={content?.googleSearchConsole || ''} 
                  onChange={(e) => setContent({...content, googleSearchConsole: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 space-y-6">
            <h3 className="font-bold text-lg mb-4 border-b border-white/5 pb-2">Behavior & Heatmaps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Microsoft Clarity (Project ID)</label>
                <input 
                  className="input-glass text-sm" 
                  placeholder="50xxxxxx"
                  value={content?.microsoftClarity || ''} 
                  onChange={(e) => setContent({...content, microsoftClarity: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Hotjar (Site ID)</label>
                <input 
                  className="input-glass text-sm" 
                  placeholder="1234567"
                  value={content?.hotjar || ''} 
                  onChange={(e) => setContent({...content, hotjar: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 space-y-6">
            <h3 className="font-bold text-lg mb-4 border-b border-white/5 pb-2">Social Pixels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Meta Pixel ID</label>
                <input 
                  className="input-glass text-sm" 
                  placeholder="123456789012345"
                  value={content?.metaPixel || ''} 
                  onChange={(e) => setContent({...content, metaPixel: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-text-secondary mb-2">TikTok Pixel ID</label>
                <input 
                  className="input-glass text-sm" 
                  placeholder="C0XXXXXXXXXXXXXXXXXX"
                  value={content?.tiktokPixel || ''} 
                  onChange={(e) => setContent({...content, tiktokPixel: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-6 space-y-6">
            <h3 className="font-bold text-lg mb-4 border-b border-white/5 pb-2">Media & URLs</h3>
            <div>
              <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Product Demo (YouTube URL)</label>
              <input 
                className="input-glass text-sm" 
                placeholder="https://www.youtube.com/watch?v=..."
                value={content?.youtubeLink || ''} 
                onChange={(e) => setContent({...content, youtubeLink: e.target.value})}
              />
              <p className="text-[11px] text-text-secondary mt-2">Paste a YouTube link to update the main product demo video on your landing page.</p>
            </div>
          </div>

          <div className="glass-card p-6 space-y-6">
            <h3 className="font-bold text-lg mb-4 border-b border-white/5 pb-2">Custom Scripts</h3>
            <div>
              <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Custom Header Scripts</label>
              <textarea 
                className="input-glass text-sm h-32 font-mono" 
                placeholder="<script>...</script>"
                value={content?.customHeadScripts || ''} 
                onChange={(e) => setContent({...content, customHeadScripts: e.target.value})}
              />
              <p className="text-[11px] text-text-secondary mt-2">These scripts will be injected exactly as written into the &lt;head&gt; of your landing page.</p>
            </div>
          </div>

          <button type="submit" disabled={saving} className="btn-primary py-3 w-full text-sm flex items-center justify-center gap-2">
            {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <><Save className="w-4 h-4" /> Save Tracking Codes</>}
          </button>
        </form>
        
        <div className="space-y-6">
          <div className="glass-card p-8 text-center text-text-secondary shadow-lg">
            <BarChart3 className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h4 className="text-white font-bold mb-2">Boost Your Insights</h4>
            <p className="text-sm">We automatically inject these tracking scripts to your site's header based on the IDs provided. Leave blank any services you do not use.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsView() { 
  const { user } = useAuth();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from('site_content').select('*').eq('section', 'email_settings').single();
      if (data) {
        setContent(data.content);
      } else {
        setContent({ serviceId: '', templateId: '', publicKey: '' });
      }
      setLoading(false);
    };
    fetchContent();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { data: existing } = await supabase.from('site_content').select('id').eq('section', 'email_settings').single();
    if (existing) {
      await supabase.from('site_content').update({ content }).eq('section', 'email_settings');
    } else {
      await supabase.from('site_content').insert([{ section: 'email_settings', content }]);
    }
    setSaving(false);
    alert('Email settings updated successfully!');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-6 space-y-6 self-start">
          <h3 className="font-bold text-lg mb-4 border-b border-white/5 pb-2">Account Details</h3>
          <div>
            <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Email Address</label>
            <input className="input-glass text-sm" readOnly value={user?.email || ''} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Project ID</label>
            <div className="flex gap-2">
              <input className="input-glass text-sm font-mono" readOnly value="P-298374928" />
              <button className="btn-secondary px-4 text-xs">Copy</button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <form onSubmit={handleUpdate} className="glass-card p-6 space-y-6 self-start">
            <h3 className="font-bold text-lg mb-2 border-b border-white/5 pb-2">Brevo Email Automation</h3>
            <p className="text-xs text-text-secondary mb-4">Connect Brevo to automatically send a welcome or confirmation email when a user submits the lead form.</p>
            <div>
              <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Brevo API Key (Starts with xkeysib-)</label>
              <input 
                className="input-glass text-sm" 
                placeholder="xkeysib-xxxxxxxxxxxxxxxxx"
                type="password"
                value={content?.brevoApiKey || ''}
                onChange={e => setContent({...content, brevoApiKey: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-text-secondary mb-2">From Email</label>
              <input 
                className="input-glass text-sm" 
                placeholder="hello@yourdomain.com"
                value={content?.brevoFromEmail || ''}
                onChange={e => setContent({...content, brevoFromEmail: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-text-secondary mb-2">From Name</label>
              <input 
                className="input-glass text-sm" 
                placeholder="SystemicChat"
                value={content?.brevoFromName || ''}
                onChange={e => setContent({...content, brevoFromName: e.target.value})}
              />
            </div>
            <div className="pt-4 border-t border-white/5">
              <h3 className="font-bold text-lg mb-2 pb-2">Webhook Integration</h3>
              <p className="text-xs text-text-secondary mb-4">Send lead data to Zapier, Make, or any custom webhook automatically when a new lead is submitted.</p>
              <label className="block text-xs font-bold uppercase text-text-secondary mb-2">Webhook URL</label>
              <input 
                className="input-glass text-sm" 
                placeholder="https://hooks.zapier.com/hooks/..."
                value={content?.webhookUrl || ''}
                onChange={e => setContent({...content, webhookUrl: e.target.value})}
              />
            </div>
            <button type="submit" disabled={saving} className="btn-primary py-2 w-full text-sm flex items-center justify-center gap-2">
              {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <><Save className="w-4 h-4" /> Save Settings</>}
            </button>
            <div className="mt-4 p-4 rounded bg-white/5 border border-white/10 text-xs text-text-secondary">
              <strong>How to connect Brevo & Avoid Spam:</strong>
              <ol className="list-decimal ml-4 mt-2 space-y-2">
                <li>Create a <a href="https://brevo.com" target="_blank" className="text-primary hover:underline">Brevo</a> account.</li>
                <li>Go to Your Profile &gt; SMTP &amp; API &gt; <strong>API Keys</strong> tab.</li>
                <li>Generate a new API key. <strong className="text-primary">Make sure it starts with `xkeysib-`</strong> (Do not use the SMTP key which starts with `xsmtpsib-`).</li>
                <li>Paste it here along with your sender email address.</li>
                <li className="text-primary"><strong>CRITICAL:</strong> To prevent your emails from going to the Spam folder, you must authenticate your domain in Brevo (Senders &amp; IP &gt; Domains). You need to add the provided TXT and DKIM records to your domain's DNS settings.</li>
              </ol>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function IntegrationsView() {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(() => {
    return !!localStorage.getItem('supabase_url');
  });
  const [showForm, setShowForm] = useState(false);
  const [credentials, setCredentials] = useState({
    url: localStorage.getItem('supabase_url') || '',
    key: localStorage.getItem('supabase_anon_key') || '',
  });
  const [error, setError] = useState('');

  const handleConnectClick = () => {
    setShowForm(true);
  };

  const handleSaveAndConnect = async () => {
    if (!credentials.url || !credentials.key) {
      setError('Both URL and Anon Key are required');
      return;
    }
    
    setConnecting(true);
    setError('');
    
    try {
      localStorage.setItem('supabase_url', credentials.url);
      localStorage.setItem('supabase_anon_key', credentials.key);
      
      // Reloading ensures the proxy client in lib/supabase.ts picks up the new credentials
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'Failed to connect to Supabase');
      setConnecting(false);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('supabase_url');
    localStorage.removeItem('supabase_anon_key');
    window.location.reload();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-display font-bold mb-2">Integrations</h2>
        <p className="text-text-secondary">Connect securely to your Supabase project instance.</p>
      </div>

      <div className="glass-card p-10 relative overflow-hidden group hover:border-[#3ECF8E]/30 transition-colors duration-500">
        <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[200%] bg-[#3ECF8E]/10 blur-[120px] pointer-events-none mix-blend-screen group-hover:bg-[#3ECF8E]/20 transition-all duration-700" />
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10 w-full">
          <div className="w-32 h-32 rounded-3xl bg-[#3ECF8E]/10 border border-[#3ECF8E]/20 flex items-center justify-center p-6 shadow-[0_0_30px_rgba(62,207,142,0.1)] group-hover:shadow-[0_0_50px_rgba(62,207,142,0.2)] transition-all duration-500 group-hover:scale-105 shrink-0">
            <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_15px_rgba(62,207,142,0.5)]">
              <path d="M60 10C32.3858 10 10 32.3858 10 60C10 87.6142 32.3858 110 60 110C87.6142 110 110 87.6142 110 60C110 32.3858 87.6142 10 60 10ZM56.7601 36.213L72.9317 56.4025H60.3347L63.2399 83.787L47.0683 63.5975H59.6653L56.7601 36.213Z" fill="#3ECF8E"/>
            </svg>
          </div>
          
          <div className="flex-1 text-center md:text-left w-full">
            <h3 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Supabase Connection</h3>
            <p className="text-text-secondary/80 font-light mb-8 text-lg leading-relaxed max-w-2xl">
              Real-time database, Authentication, and Edge Functions. Maintain a strict sync with your structured data automatically without complex setup.
            </p>
            
            {connected && !showForm ? (
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] border border-[#3ECF8E]/30 text-sm font-bold shadow-[0_0_20px_rgba(62,207,142,0.15)] animate-in slide-in-from-bottom-4 fade-in duration-500">
                  <CheckCircle2 className="w-5 h-5" />
                  Connected Successfully
                </div>
                <button 
                  onClick={handleDisconnect}
                  className="text-white/50 hover:text-white hover:underline text-sm font-medium transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : showForm ? (
              <div className="space-y-4 max-w-md animate-in slide-in-from-bottom-4 fade-in duration-500 w-full text-left">
                {error && <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">{error}</div>}
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">Project URL</label>
                  <input 
                    type="url"
                    value={credentials.url}
                    onChange={(e) => setCredentials(prev => ({...prev, url: e.target.value}))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#3ECF8E]/50 focus:ring-1 focus:ring-[#3ECF8E]/50 transition-all font-mono text-sm"
                    placeholder="https://your-project.supabase.co"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">Anon / Public Key</label>
                  <input 
                    type="password"
                    value={credentials.key}
                    onChange={(e) => setCredentials(prev => ({...prev, key: e.target.value}))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#3ECF8E]/50 focus:ring-1 focus:ring-[#3ECF8E]/50 transition-all font-mono text-sm"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  />
                </div>
                
                <div className="flex items-center gap-3 pt-2">
                  <button 
                    onClick={handleSaveAndConnect}
                    disabled={connecting}
                    className="bg-gradient-to-r from-[#3ECF8E] to-[#2E8E62] hover:opacity-90 text-bg-dark font-bold px-6 py-3 rounded-xl inline-flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(62,207,142,0.3)] hover:shadow-[0_0_30px_rgba(62,207,142,0.5)] flex-1"
                  >
                    {connecting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Plug className="w-5 h-5" /> Connect via Keys</>}
                  </button>
                  <button 
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-all duration-300 hover:border-white/20"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleConnectClick}
                className="bg-gradient-to-r from-[#3ECF8E] to-[#2E8E62] hover:opacity-90 text-bg-dark font-bold px-8 py-3 rounded-full inline-flex items-center gap-3 transition-all duration-300 shadow-[0_0_30px_rgba(62,207,142,0.3)] hover:shadow-[0_0_40px_rgba(62,207,142,0.5)] hover:-translate-y-1"
              >
                <Plug className="w-5 h-5" /> Provider Setup
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
