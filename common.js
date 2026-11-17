"use strict";
/* ===== Codice condiviso da index.html e risultati.html ===== */
const GG=["Lun","Mar","Mer","Gio","Ven","Sab","Dom"], H0=8, NH=16, N=7*NH; // 7 giorni × 16 ore (8:00–24:00)
const $=s=>document.querySelector(s), pad=n=>String(n).padStart(2,"0");
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const iso=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
const fromIso=s=>{const[a,b,c]=s.split("-").map(Number);return new Date(a,b-1,c)};
function monday(off){const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-((d.getDay()+6)%7)+off*7);return d}
function slotStart(w,d,h){const x=new Date(w);x.setDate(x.getDate()+d);x.setHours(H0+h);return x}
const isPast=(w,d,h)=>slotStart(w,d,h).getTime()+3600000<Date.now();
const lab=h=>pad(H0+h)+":00–"+pad(H0+h+1)+":00";
const dayLab=(w,d)=>{const x=slotStart(w,d,0);return GG[d]+" "+pad(x.getDate())+"/"+pad(x.getMonth()+1)};
// Maschera di 112 slot <-> stringa esadecimale di 28 caratteri
const toHex=m=>{let s="";for(let i=0;i<N;i+=4)s+=(m[i]*8+m[i+1]*4+m[i+2]*2+m[i+3]).toString(16);return s};
const fromHex=s=>{const m=[];for(const c of s){const v=parseInt(c,16);m.push(v>>3&1,v>>2&1,v>>1&1,v&1)}return m};
const rid=()=>Array.from(crypto.getRandomValues(new Uint8Array(10)),b=>"abcdefghijklmnopqrstuvwxyz0123456789"[b%36]).join("");
const param=k=>new URLSearchParams(location.search).get(k);
const pageUrl=(file,q)=>new URL(file+(q?"?"+q:""),location.href).href;

function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("on");setTimeout(()=>e.classList.remove("on"),2000)}
async function copy(t){try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();try{document.execCommand("copy")}catch(_){}a.remove()}toast("Copiato!")}
const wa=t=>window.open("https://wa.me/?text="+encodeURIComponent(t),"_blank");

/* ===== Database (Supabase, API REST) ===== */
async function api(path,opt={}){
  const r=await fetch(CONFIG.SUPABASE_URL+"/rest/v1/"+path,Object.assign({},opt,{headers:Object.assign({apikey:CONFIG.SUPABASE_KEY,"Content-Type":"application/json"},opt.headers)}));
  if(!r.ok)throw new Error(await r.text());
  return r.status===204||opt.method==="POST"?null:r.json();
}

/* ===== Tema chiaro/scuro ===== */
try{const t=localStorage.getItem("uscite-tema");if(t)document.documentElement.dataset.theme=t}catch(e){}
document.addEventListener("DOMContentLoaded",()=>{
  $("#theme").onclick=()=>{const r=document.documentElement,dark=r.dataset.theme==="dark"||(!r.dataset.theme&&matchMedia("(prefers-color-scheme:dark)").matches);r.dataset.theme=dark?"light":"dark";try{localStorage.setItem("uscite-tema",r.dataset.theme)}catch(e){}};
  if(/XXXX|INSERISCI/.test(CONFIG.SUPABASE_URL+CONFIG.SUPABASE_KEY))$("main").insertAdjacentHTML("afterbegin",'<div class="card">⚠️ Database non configurato: compila <b>config.js</b> (vedi README).</div>');
});
