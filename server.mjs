import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('public');
function json(res,status,data){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));}
http.createServer(async(req,res)=>{
  const url=new URL(req.url,'http://atlas.local');
  // The same-document endpoint also works when Arena serves the preview under a path prefix.
  const chatRoute=url.pathname==='/api/chat'||url.searchParams.get('atlas_api')==='chat';
  if(chatRoute){
    if(req.method!=='POST')return json(res,405,{error:'Send chat questions using POST.'});
    let raw='';
    try{
      for await(const c of req){raw+=c;if(Buffer.byteLength(raw)>24000)return json(res,413,{error:'This conversation is too long. Please refresh and start a new chat.'});}
      let input;try{input=JSON.parse(raw);}catch{return json(res,400,{error:'Invalid chat request.'});}
      const {message,context='',history=[]}=input;
      if(typeof message!=='string'||!message.trim()||message.length>6000||!Array.isArray(history))return json(res,400,{error:'Please send a question of up to 6,000 characters.'});
      if(!process.env.GEMINI_API_KEY)return json(res,503,{error:'The AI connection is not configured. You can still explore all atlas content.'});
      const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent',{
        method:'POST',signal:AbortSignal.timeout(45000),headers:{'Content-Type':'application/json','x-goog-api-key':process.env.GEMINI_API_KEY},
        body:JSON.stringify({system_instruction:{parts:[{text:'You are Atlas, a concise scientific guide to human biology and longevity. Use plain text and short paragraphs. Distinguish established biology from speculative immortality. Never claim immortality is achievable today. No diagnosis. Current atlas context: '+String(context).slice(0,6000)}]},contents:[...history.slice(-8),{role:'user',parts:[{text:message}]}]})
      });
      const responseText=await r.text();let data;
      try{data=JSON.parse(responseText);}catch{return json(res,502,{error:'The AI provider returned an unexpected response. Please try again shortly.'});}
      if(!r.ok){console.error('Gemini request failed:',r.status,data.error?.status||'unknown');return json(res,r.status===429?429:502,{error:r.status===429?'Atlas has reached its AI request limit. Please try again shortly.':'The AI service is temporarily unavailable. Please try again shortly.'});}
      const text=data.candidates?.[0]?.content?.parts?.filter(p=>!p.thought).map(p=>p.text||'').join('');
      if(!text)return json(res,502,{error:'The AI service returned no answer. Please rephrase your question.'});
      return json(res,200,{text});
    }catch(e){console.error('Chat request failed:',e.name);return json(res,502,{error:e.name==='TimeoutError'?'Atlas took too long to respond. Please try again.':'Unable to reach the AI service. Please try again shortly.'});}
  }
  let name;try{name=decodeURIComponent(url.pathname);}catch{res.writeHead(400);res.end('Invalid URL');return;}
  const file=path.join(root,name==='/'?'index.html':name);
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  fs.readFile(file,(e,b)=>{if(e){res.writeHead(404);res.end('Not found');return;}res.setHeader('Content-Type',({'html':'text/html','js':'text/javascript','css':'text/css','png':'image/png','svg':'image/svg+xml','json':'application/json'})[file.split('.').pop()]||'text/plain');if(/\.(html|js|css)$/.test(file))res.setHeader('Cache-Control','no-store, max-age=0');res.end(b);});
}).listen(3000,'0.0.0.0');
