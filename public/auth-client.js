import {createClient} from './vendor/supabase.js';
import {SUPABASE_URL,SUPABASE_ANON_KEY} from './supabase-config.js';
export const supabase=createClient(SUPABASE_URL,SUPABASE_ANON_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,storageKey:'continuum-auth-v1',flowType:'pkce'}});
export function callbackURL(mode=''){const url=new URL('./login.html',location.href);if(mode)url.searchParams.set('mode',mode);return url.href;}
