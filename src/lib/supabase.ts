import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bdkxqrigcypwuvbflvhd.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_dhqW_ntcFuu_WFW7JRnZlw_awN2KQXl';

export const supabase = createClient(supabaseUrl, supabaseKey);
