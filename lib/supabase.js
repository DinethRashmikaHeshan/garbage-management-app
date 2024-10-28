
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://sikaymofurdgcnkmjirs.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpa2F5bW9mdXJkZ2Nua21qaXJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4ODg2NDIsImV4cCI6MjA0NDQ2NDY0Mn0.8Z6DRme7P8Uup5DgEhFVq1K2Urx0ToDur0R5Tw7vTNs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);