import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to handle Supabase responses
export const handleSupabaseResponse = <T>(
  response: { data: T | null; error: any },
  errorMessage: string = 'Operation failed'
): { success: boolean; data?: T; error?: any } => {
  if (response.error) {
    console.error(errorMessage, response.error);
    return { success: false, error: response.error };
  }
  if (response.data === null) {
    return { success: false, error: 'No data returned' };
  }
  return { success: true, data: response.data };
};
