import chat from './lib/chat-handler.mjs';
import health from './api/health.mjs';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('public');
function json(res,status,data){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));}
http.createServer(async(req,res)=>{
  const url=new URL(req.url,'http://atlas.local');
  // The same-document endpoint also works when Arena serves the preview under a path prefix.
  const chatRoute=url.pathname==='/api/chat'||url.searchParams.get('atlas_api')==='chat';
  if(chatRoute)return chat(req,res);
  if(url.pathname==='/api/health')return health(req,res);
  let name;try{name=decodeURIComponent(url.pathname);}catch{res.writeHead(400);res.end('Invalid URL');return;}
  const file=path.join(root,name==='/'?'index.html':name);
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  fs.readFile(file,(e,b)=>{if(e){res.writeHead(404);res.end('Not found');return;}res.setHeader('Content-Type',({'html':'text/html','js':'text/javascript','css':'text/css','png':'image/png','svg':'image/svg+xml','json':'application/json'})[file.split('.').pop()]||'text/plain');if(/\.(html|js|css)$/.test(file))res.setHeader('Cache-Control','no-store, max-age=0');res.end(b);});
}).listen(3000,'0.0.0.0');
