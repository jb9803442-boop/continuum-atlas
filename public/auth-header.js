import {supabase} from './auth-client.js';
const target=document.querySelector('header');
if(target){
 const link=document.createElement('a');link.className='account-link';link.href='./login.html';link.textContent='Sign in';link.setAttribute('aria-label','Sign in or create an account');target.append(link);
 const update=session=>{link.textContent=session?'My account':'Sign in';link.href=session?'./login.html?mode=account':'./login.html';link.setAttribute('aria-label',session?'Open your account':'Sign in or create an account');};
 supabase.auth.getSession().then(({data})=>update(data.session)).catch(()=>update(null));supabase.auth.onAuthStateChange((_event,session)=>update(session));
}
