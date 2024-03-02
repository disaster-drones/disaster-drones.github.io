import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://rrtmhqpuufvotvxuhuni.supabase.co/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydG1ocXB1dWZ2b3R2eHVodW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5MzU3OTUsImV4cCI6MjAxMzUxMTc5NX0.hPVM8MHs565RXBq3beKJPfLWVIdlSB7VqoStjNiFges"
);
