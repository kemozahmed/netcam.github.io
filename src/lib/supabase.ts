import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mmgsxbkrfbwqncwcbniz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_4h8e-Sk2rPcB2oMGY0Y5tg_zSeENAho';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
