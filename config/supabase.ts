import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xoxrdzexvsnbakcckdkd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhveHJkemV4dnNuYmFrY2NrZGtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzNjM4MTgsImV4cCI6MjA0OTkzOTgxOH0.dYklRwNDp1E_6H3vfAKbXJSdlVkjDShe-IEnWqhvokk';

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