// Shared local/serverless API. Credentials are read only from the server environment.
const windows=new Map();
function json(res,status,data){res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.statusCode=status;res.end(JSON.stringify(data));}
export default async function chat(req,res){
 if(req.method!=='POST'){res.setHeader('Allow','POST');return json(res,405,{error:'Send chat questions using POST.'});}
 const origin=req.headers.origin,host=req.headers['x-forwarded-host']||req.headers.host;
 if(origin){try{if(new URL(origin).host!==host)return json(res,403,{error:'Use the chat from this application.'});}catch{return json(res,403,{error:'Invalid request origin.'});}}
 if(!String(req.headers['content-type']||'').includes('application/json'))return json(res,415,{error:'Send application/json.'});
 if(Number(req.headers['content-length']||0)>24000)return json(res,413,{error:'This conversation is too long. Please shorten it.'});
 try{
  let input=req.body;
  if(input===undefined){let raw='';for await(const c of req){raw+=c;if(Buffer.byteLength(raw)>24000)return json(res,413,{error:'This conversation is too long. Please shorten it.'});}try{input=JSON.parse(raw);}catch{return json(res,400,{error:'Invalid chat request.'});}}
  else if(typeof input==='string'||Buffer.isBuffer(input)){try{input=JSON.parse(input.toString());}catch{return json(res,400,{error:'Invalid chat request.'});}}
  if(!input||typeof input!=='object'||Array.isArray(input)||Buffer.byteLength(JSON.stringify(input))>24000)return json(res,400,{error:'Invalid chat request or request too large.'});
  const {message,context='',history=[]}=input;
  if(typeof message!=='string'||!message.trim()||message.length>6000||typeof context!=='string'||!Array.isArray(history))return json(res,400,{error:'Send a question of up to 6,000 characters and a valid conversation.'});
  if(!process.env.GEMINI_API_KEY)return json(res,503,{error:'The AI connection is not configured. You can still explore all atlas content.'});
  // Best-effort per-instance throttle; production-wide quotas belong in shared storage/WAF.
  const ip=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0],now=Date.now();
  for(const [key,w] of windows)if(now-w.start>60000)windows.delete(key);
  const w=windows.get(ip)||{start:now,count:0};if(w.count>=10){res.setHeader('Retry-After','60');return json(res,429,{error:'Too many chat requests. Please wait a minute.'});}w.count++;windows.set(ip,w);
  const safeHistory=history.slice(-8).filter(x=>x&&['user','model'].includes(x.role)&&Array.isArray(x.parts)).map(x=>({role:x.role,parts:x.parts.filter(p=>p&&typeof p.text==='string').slice(0,2).map(p=>({text:p.text.slice(0,6000)}))})).filter(x=>x.parts.length);
  const response=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent',{method:'POST',signal:AbortSignal.timeout(45000),headers:{'Content-Type':'application/json','x-goog-api-key':process.env.GEMINI_API_KEY},body:JSON.stringify({system_instruction:{parts:[{text:'You are Atlas, a concise scientific guide to human biology and longevity. Use plain text and short paragraphs. Distinguish established biology from speculative immortality. Never claim immortality is achievable today. No diagnosis. Current atlas context: '+context.slice(0,6000)}]},contents:[...safeHistory,{role:'user',parts:[{text:message}]}]})});
  let data;try{data=await response.json();}catch{return json(res,502,{error:'The AI provider returned an unexpected response. Please try again shortly.'});}
  if(!response.ok)return json(res,response.status===429?429:502,{error:response.status===429?'Atlas has reached its AI request limit. Please try again shortly.':'The AI service is temporarily unavailable. Please try again shortly.'});
  const text=data.candidates?.[0]?.content?.parts?.filter(p=>!p.thought).map(p=>p.text||'').join('');
  if(!text)return json(res,502,{error:'The AI service returned no answer. Please rephrase your question.'});return json(res,200,{text});
 }catch(e){return json(res,502,{error:e.name==='TimeoutError'?'Atlas took too long to respond. Please try again.':'Unable to reach the AI service. Please try again shortly.'});}
}
