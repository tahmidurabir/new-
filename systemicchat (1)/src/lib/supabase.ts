import { createClient } from '@supabase/supabase-js';

const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const getSupabaseConfig = () => {
  return {
    url: localStorage.getItem('supabase_url') || envUrl || '',
    key: localStorage.getItem('supabase_anon_key') || envKey || ''
  };
};

let _client: any = null;

const createFakeClient = () => ({
  from: () => ({ 
    select: () => ({ 
      eq: () => ({ single: () => Promise.resolve({ data: null }) }), 
      in: () => Promise.resolve({ data: null }),
      order: () => ({ limit: () => Promise.resolve({ data: null }) })
    }), 
    update: () => ({ eq: () => Promise.resolve({ error: null }) }),
    insert: () => Promise.resolve({ error: null }) 
  }),
  auth: {
    signInWithPassword: () => Promise.resolve({ error: { message: 'Missing configuration' } }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    getUser: () => Promise.resolve({ data: { user: null } }),
    getSession: () => Promise.resolve({ data: { session: null } })
  }
});

export const getSupabase = () => {
  if (_client) return _client;
  const { url, key } = getSupabaseConfig();
  if (url && key) {
    _client = createClient(url, key);
  } else {
    _client = createFakeClient();
  }
  return _client;
};

export const resetSupabaseClient = () => {
  _client = null;
};

export const supabase = new Proxy({}, {
  get: (target, prop) => {
    return getSupabase()[prop];
  }
}) as any;
