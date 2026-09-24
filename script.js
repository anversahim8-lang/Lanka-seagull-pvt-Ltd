/* ==========================================================================
   Lanka Seagull Business Manager
   Plain HTML/CSS/JS ERP-style dashboard. All data persists in LocalStorage.
   ========================================================================== */
"use strict";

/* Company logo: swap every <img class="app-logo"> to the embedded copy so
   printing, PDF and JPG exports always include it (works offline / file://). */
const LOGO_SRC = window.LOGO_DATA || "logo.png";
document.querySelectorAll("img.app-logo").forEach(img=>{ img.src = LOGO_SRC; });
function logoImgHtml(w){ return '<img src="'+LOGO_SRC+'" alt="Lanka Seagull Marine Company" style="width:'+(w||110)+'px;height:auto;display:block;margin:0 0 10px">'; }

/* ---------------------------------------------------------------------- *
 * 1. ICONS — tiny inline SVG set, injected wherever <i data-ic="name">   *
 * ---------------------------------------------------------------------- */
const ICONS = {
  grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17" cy="8.5" r="2.6"/><path d="M15.8 14.2c2.7.4 4.7 2.4 4.7 5.8"/></svg>',
  truck:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1.5" y="6" width="13" height="10" rx="1"/><path d="M14.5 10h4l3.5 3.5V16h-7.5z"/><circle cx="6" cy="18.5" r="1.8"/><circle cx="17.5" cy="18.5" r="1.8"/></svg>',
  box:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.5 21 7v10l-9 4.5L3 17V7z"/><path d="M3 7l9 4.5L21 7M12 11.5V21.5"/></svg>',
  layers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 2 7l10 5 10-5z"/><path d="M2 12l10 5 10-5M2 17l10 5 10-5"/></svg>',
  zap:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
  'file-text':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M8.5 13h7M8.5 17h7"/></svg>',
  'shopping-cart':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="20.5" r="1.4"/><circle cx="17.5" cy="20.5" r="1.4"/><path d="M1.5 2h3l2.6 12.6a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21.5 6H5.2"/></svg>',
  receipt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 2h14v20l-2.5-1.6L14 22l-2.5-1.6L9 22l-2.5-1.6L4 22z" transform="translate(0.5 0)"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 19.5V4.5"/></svg>',
  bank:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 9 12 3l10 6"/><path d="M4 9v10M9 9v10M15 9v10M20 9v10M2 21h20"/></svg>',
  wallet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 6.5A2 2 0 0 1 4.5 4.5h13a2 2 0 0 1 2 2V8h-3.5a3 3 0 0 0 0 6H19.5v3a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/><circle cx="16" cy="11" r="1"/></svg>',
  calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20V10M11 20V4M18 20v-7"/><path d="M2 20h20"/></svg>',
  settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.5-2-3.5-2.4 1a7.6 7.6 0 0 0-1.7-1L15 2.5H9l-.3 2.5a7.6 7.6 0 0 0-1.7 1l-2.4-1-2 3.5L4.6 11a7.6 7.6 0 0 0 0 2l-2 1.5 2 3.5 2.4-1a7.6 7.6 0 0 0 1.7 1l.3 2.5h6l.3-2.5a7.6 7.6 0 0 0 1.7-1l2.4 1 2-3.5z"/></svg>',
  menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M5 12h14"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17z"/><path d="M13.5 6.5l4 4"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M9 7V4.5h6V7M6 7l1 13.5h10L18 7"/></svg>',
  eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12.5 9.5 18 20 6"/></svg>',
  printer:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V3h12v6"/><rect x="4" y="9" width="16" height="8" rx="1.5"/><path d="M6 14.5h12V21H6z"/></svg>',
  image:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3.5" width="18" height="17" rx="2"/><circle cx="8.5" cy="9" r="1.8"/><path d="M3 17l5.5-5.5L12 15l3-3 6 6"/></svg>',
  download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v13M7 11l5 5 5-5"/><path d="M4 20.5h16"/></svg>',
  refresh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 11a8 8 0 1 0-2.3 6.4"/><path d="M20 5v6h-6"/></svg>',
  'arrow-down':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v16M6 14l6 6 6-6"/></svg>',
  'arrow-up':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V4M6 10l6-6 6 6"/></svg>',
  sliders:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 21V14M4 10V3M12 21v-8M12 9V3M20 21v-5M20 12V3"/><circle cx="4" cy="12" r="2"/><circle cx="12" cy="11" r="2"/><circle cx="20" cy="14" r="2"/></svg>',
  alert:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3 2 21h20z"/><path d="M12 10v4.5"/><circle cx="12" cy="18" r=".6" fill="currentColor"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h4l2 5-2.5 2a12 12 0 0 0 5.5 5.5l2-2.5 5 2v4a2 2 0 0 1-2.2 2A18 18 0 0 1 2 6.2 2 2 0 0 1 4 4z"/></svg>',
  logout:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>',
};
function renderIcons(root){
  (root||document).querySelectorAll('i[data-ic]').forEach(el=>{
    const name=el.getAttribute('data-ic');
    if(ICONS[name] && !el.dataset.done){ el.innerHTML=ICONS[name]; el.dataset.done="1"; }
  });
}

/* ---------------------------------------------------------------------- *
 * 2. STORAGE                                                             *
 * ---------------------------------------------------------------------- */
const STORAGE_KEY = "lsg_erp_db_v1";
let DB = null;

function loadDB(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(raw){ try{ DB = JSON.parse(raw); }catch(e){ DB=null; } }
  if(!DB){ DB = buildEmptyData(); saveDB(); }
  // backfill any missing collections for forward-compatibility
  ["customers","suppliers","products","stockMovements","invoices","purchases","receipts","expenses","ledger"]
    .forEach(k=>{ if(!DB[k]) DB[k]=[]; });
  if(!DB.settings) DB.settings = defaultSettings();
  if(!DB.counters) DB.counters = {};
}
function saveDB(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(DB)); }

function defaultSettings(){
  return {
    companyName:"Lanka Seagull (Pvt) Ltd",
    phone:"077 834 8603",
    address:"69/1 Mullikandal, Adampan",
    currency:"Rs"
  };
}

function uid(prefix){ return (prefix||"id")+"_"+Date.now().toString(36)+Math.random().toString(36).slice(2,7); }

function nextDocNo(kind){
  DB.counters[kind] = (DB.counters[kind]||0)+1;
  const n = DB.counters[kind];
  const pad = String(n).padStart(4,"0");
  const map={ inv:"INV-", pur:"PUR-", cs:"CS-", rcpt:"RCPT-" };
  return (map[kind]||"DOC-")+pad;
}

/* ---------------------------------------------------------------------- *
 * 2b. AUTH — local device login gate (not a real security boundary;      *
 *     everything lives in this browser's LocalStorage, same as the data) *
 * ---------------------------------------------------------------------- */
const AUTH_KEY = "lsg_auth_v1";
const SESSION_KEY = "lsg_session_v1";

function loadAuth(){
  let raw;
  try{ raw = localStorage.getItem(AUTH_KEY); }catch(e){ raw = null; }
  if(raw){
    try{ const a = JSON.parse(raw); if(a && a.username && a.password) return a; }catch(e){}
  }
  const def = { username:"admin", password:"admin123" };
  localStorage.setItem(AUTH_KEY, JSON.stringify(def));
  return def;
}
function saveAuth(a){ localStorage.setItem(AUTH_KEY, JSON.stringify(a)); }

function isLoggedIn(){
  return localStorage.getItem(SESSION_KEY)==="1" || sessionStorage.getItem(SESSION_KEY)==="1";
}
function setLoggedIn(remember){
  if(remember){ localStorage.setItem(SESSION_KEY,"1"); }
  else{ sessionStorage.setItem(SESSION_KEY,"1"); }
}
function clearSession(){
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

function showApp(){
  const auth = loadAuth();
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("appShell").style.display = "flex";
  const nameEl = document.getElementById("userChipName");
  const avatarEl = document.getElementById("userAvatar");
  if(nameEl) nameEl.textContent = auth.username.charAt(0).toUpperCase()+auth.username.slice(1);
  if(avatarEl) avatarEl.textContent = auth.username.slice(0,2).toUpperCase();
}
function showLogin(){
  document.getElementById("appShell").style.display = "none";
  document.getElementById("loginScreen").style.display = "flex";
  const u = document.getElementById("loginUsername");
  if(u) setTimeout(()=>u.focus(),10);
}

function bindAuthEvents(){
  const form = document.getElementById("loginForm");
  const errorEl = document.getElementById("loginError");
  form.addEventListener("submit", e=>{
    e.preventDefault();
    const auth = loadAuth();
    const u = document.getElementById("loginUsername").value.trim();
    const p = document.getElementById("loginPassword").value;
    if(u===auth.username && p===auth.password){
      errorEl.hidden = true;
      setLoggedIn(document.getElementById("loginRemember").checked);
      form.reset();
      showApp();
      toast("Welcome back, "+auth.username+"!","success");
    } else {
      errorEl.textContent = "Incorrect username or password. Please try again.";
      errorEl.hidden = false;
      document.getElementById("loginPassword").value = "";
      document.getElementById("loginPassword").focus();
    }
  });

  document.getElementById("togglePassword").addEventListener("click",e=>{
    const inp = document.getElementById("loginPassword");
    const showing = inp.type==="text";
    inp.type = showing ? "password" : "text";
    e.currentTarget.setAttribute("aria-label", showing ? "Show password" : "Hide password");
  });

  document.getElementById("logoutBtn").addEventListener("click",()=>{
    confirmDialog("Log out?","You'll need to sign in again to access the dashboard on this device.",()=>{
      clearSession();
      showLogin();
    });
  });
}

/* ---------------------------------------------------------------------- *
 * 3. DEFAULT (EMPTY) DATA                                                *
 * ---------------------------------------------------------------------- */
function iso(d){ return d.toISOString().slice(0,10); }
function daysAgo(n){ const d=new Date(); d.setDate(d.getDate()-n); return iso(d); }

function buildEmptyData(){
  return { customers:[], suppliers:[], products:[], stockMovements:[], invoices:[],
    purchases:[], receipts:[], expenses:[], ledger:[], counters:{}, settings: defaultSettings() };
}

/* ---------------------------------------------------------------------- *
 * 4. UTILITIES                                                           *
 * ---------------------------------------------------------------------- */
function money(n){
  n = Number(n)||0;
  const sign = n<0?"-":"";
  return sign+DB.settings.currency+" "+Math.abs(n).toLocaleString("en-LK",{minimumFractionDigits:2,maximumFractionDigits:2});
}
function fmtDate(d){
  if(!d) return "-";
  const dt = new Date(d+"T00:00:00");
  if(isNaN(dt)) return d;
  return dt.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"});
}
function todayISO(){ return iso(new Date()); }
function escapeHtml(s){ return String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }

function toast(msg,type){
  const box = document.getElementById("toastContainer");
  const el = document.createElement("div");
  el.className = "toast "+(type||"info");
  const iconName = type==="success"?"check":type==="error"?"alert":"bell";
  el.innerHTML = '<i data-ic="'+iconName+'" style="width:16px;height:16px"></i><span>'+escapeHtml(msg)+"</span>";
  box.appendChild(el);
  renderIcons(el);
  setTimeout(()=>{ el.style.opacity="0"; el.style.transform="translateX(16px)"; setTimeout(()=>el.remove(),200); }, 3200);
}

function confirmDialog(title,message,onOk){
  const backdrop = document.getElementById("confirmBackdrop");
  document.getElementById("confirmTitle").textContent = title||"Are you sure?";
  document.getElementById("confirmMessage").textContent = message||"This action cannot be undone.";
  backdrop.classList.add("show");
  const okBtn = document.getElementById("confirmOk");
  const cancelBtn = document.getElementById("confirmCancel");
  function cleanup(){ backdrop.classList.remove("show"); okBtn.removeEventListener("click",onOkHandler); cancelBtn.removeEventListener("click",onCancel); }
  function onOkHandler(){ cleanup(); onOk && onOk(); }
  function onCancel(){ cleanup(); }
  okBtn.addEventListener("click",onOkHandler);
  cancelBtn.addEventListener("click",onCancel);
}

function openModal(title, bodyHtml, footHtml){
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = bodyHtml;
  document.getElementById("modalFoot").innerHTML = footHtml||"";
  document.getElementById("modalBackdrop").classList.add("show");
  renderIcons(document.getElementById("modalBody"));
  renderIcons(document.getElementById("modalFoot"));
}
function closeModal(){ document.getElementById("modalBackdrop").classList.remove("show"); }
document.getElementById("modalClose").addEventListener("click",closeModal);
document.getElementById("modalBackdrop").addEventListener("click",e=>{ if(e.target.id==="modalBackdrop") closeModal(); });

/* ---------------------------------------------------------------------- *
 * 5. NAVIGATION                                                          *
 * ---------------------------------------------------------------------- */
const PAGE_META = {
  "dashboard":["Dashboard","Overview of your business today"],
  "customers":["Customers","Manage your customer accounts"],
  "suppliers":["Suppliers","Manage your supplier accounts"],
  "products":["Products","Manage your product catalogue"],
  "stock":["Stock Management","Track stock levels and movements"],
  "cash-sales":["Cash Sales","Quick point-of-sale for walk-in customers"],
  "sales-invoices":["Sales Invoices","Create and manage credit sales invoices"],
  "purchases":["Purchases","Record purchases from suppliers"],
  "payment-receipts":["Payment Receipts","Record money received or paid"],
  "cash-book":["Cash Book","Double-entry cash ledger"],
  "bank-payments":["Bank & Payments","Track cash, bank and card balances"],
  "daily-expenses":["Daily Expenses","Log day-to-day business expenses"],
  "daily-report":["Daily Business Report","Snapshot of a single day's activity"],
  "reports-center":["Reports Center","Detailed reports across the business"],
  "settings":["Settings","Company information and data management"],
};

function goToPage(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  const target = document.getElementById("page-"+page);
  if(!target) return;
  target.classList.add("active");
  document.querySelectorAll(".nav-item[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  const meta = PAGE_META[page]||["",""];
  document.getElementById("pageTitle").textContent = meta[0];
  document.getElementById("pageSubtitle").textContent = meta[1];
  closeSidebarMobile();
  refreshPage(page);
  window.scrollTo({top:0,behavior:"instant"});
}

function refreshPage(page){
  switch(page){
    case "dashboard": renderDashboard(); break;
    case "customers": renderCustomers(); break;
    case "suppliers": renderSuppliers(); break;
    case "products": renderProducts(); break;
    case "stock": renderStock(); break;
    case "cash-sales": renderCashSalesPage(); break;
    case "sales-invoices": renderInvoiceList(); break;
    case "purchases": renderPurchaseList(); break;
    case "payment-receipts": renderReceiptsPage(); break;
    case "cash-book": renderCashBook(); break;
    case "bank-payments": renderBankPayments(); break;
    case "daily-expenses": renderExpensesPage(); break;
    case "daily-report": renderDailyReport(); break;
    case "reports-center": renderReportsCenter(); break;
    case "settings": renderSettingsPage(); break;
  }
}

document.querySelectorAll("[data-page]").forEach(el=>{
  el.addEventListener("click",()=>goToPage(el.dataset.page));
});

function closeSidebarMobile(){
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebarOverlay").classList.remove("show");
}
document.getElementById("menuToggle").addEventListener("click",()=>{
  document.getElementById("sidebar").classList.add("open");
  document.getElementById("sidebarOverlay").classList.add("show");
});
document.getElementById("sidebarOverlay").addEventListener("click",closeSidebarMobile);

/* ---------------------------------------------------------------------- *
 * 6. DERIVED DATA HELPERS                                                *
 * ---------------------------------------------------------------------- */
function allSales(){ return DB.invoices; } // both credit invoices and cash sales share this array
function creditInvoices(){ return DB.invoices.filter(i=>i.source!=="cash"); }
function cashSalesOnly(){ return DB.invoices.filter(i=>i.source==="cash"); }

function customerById(id){ return DB.customers.find(c=>c.id===id); }
function supplierById(id){ return DB.suppliers.find(s=>s.id===id); }
function productById(id){ return DB.products.find(p=>p.id===id); }

function customerName(inv){
  if(inv.customerName) return inv.customerName;
  const c = customerById(inv.customerId);
  return c ? c.name : "Walk-in Customer";
}

function ledgerBalance(account, uptoDate){
  let bal = 0;
  DB.ledger
    .filter(l=>l.account===account && (!uptoDate || l.date<=uptoDate))
    .sort((a,b)=> a.date.localeCompare(b.date) || a.id.localeCompare(b.id))
    .forEach(l=>{ bal += (l.debit||0) - (l.credit||0); });
  return bal;
}
function totalCashBalance(){ return ledgerBalance("Cash"); }
function totalBankBalance(){ return ledgerBalance("Bank"); }

function customerOutstanding(custId){
  const openBal = (customerById(custId)||{}).openingBalance || 0;
  const inv = DB.invoices.filter(i=>i.customerId===custId).reduce((a,i)=>a+i.balance,0);
  return openBal + inv;
}
function supplierOutstanding(supId){
  const openBal = (supplierById(supId)||{}).openingBalance || 0;
  const pur = DB.purchases.filter(p=>p.supplierId===supId).reduce((a,p)=>a+p.balance,0);
  return openBal + pur;
}
function totalReceivables(){ return DB.customers.reduce((a,c)=>a+customerOutstanding(c.id),0); }
function totalPayables(){ return DB.suppliers.reduce((a,s)=>a+supplierOutstanding(s.id),0); }

function stockStatus(p){
  if(p.stock<=0) return {label:"Out of Stock",cls:"badge-red"};
  if(p.stock<=p.minStock) return {label:"Low Stock",cls:"badge-amber"};
  return {label:"In Stock",cls:"badge-green"};
}

function paymentStatusBadge(status){
  const map = {Paid:"badge-green",Partial:"badge-amber",Unpaid:"badge-red"};
  return '<span class="badge '+(map[status]||"badge-slate")+'">'+status+"</span>";
}

/* ---------------------------------------------------------------------- *
 * 7. DASHBOARD                                                           *
 * ---------------------------------------------------------------------- */
function renderDashboard(){
  const today = todayISO();
  const totalSales = allSales().reduce((a,i)=>a+i.grandTotal,0);
  const todaySales = allSales().filter(i=>i.date===today).reduce((a,i)=>a+i.grandTotal,0);
  const totalPurchases = DB.purchases.reduce((a,p)=>a+p.total,0);
  const totalExpenses = DB.expenses.reduce((a,e)=>a+e.amount,0);
  const lowStock = DB.products.filter(p=>p.stock<=p.minStock).length;

  const cards = [
    {label:"Total Sales", value:money(totalSales), icon:"chart", color:"teal"},
    {label:"Today's Sales", value:money(todaySales), icon:"zap", color:"teal"},
    {label:"Total Purchases", value:money(totalPurchases), icon:"shopping-cart", color:"navy"},
    {label:"Total Expenses", value:money(totalExpenses), icon:"wallet", color:"red"},
    {label:"Total Receivables", value:money(totalReceivables()), icon:"users", color:"amber"},
    {label:"Total Payables", value:money(totalPayables()), icon:"truck", color:"amber"},
    {label:"Cash Balance", value:money(totalCashBalance()), icon:"wallet", color:"green"},
    {label:"Bank Balance", value:money(totalBankBalance()), icon:"bank", color:"green"},
    {label:"Total Customers", value:DB.customers.length, icon:"users", color:"navy"},
    {label:"Total Suppliers", value:DB.suppliers.length, icon:"truck", color:"navy"},
    {label:"Total Products", value:DB.products.length, icon:"box", color:"navy"},
    {label:"Low Stock Items", value:lowStock, icon:"layers", color: lowStock>0?"red":"green"},
  ];
  const colorMap = {teal:["#E3F6F4","#0C8C88"],navy:["#E7EDF5","#15395C"],red:["#FCE7E4","#B7392E"],amber:["#FDF1DD","#9A6A16"],green:["#E2F5EC","#1F7A52"]};
  document.getElementById("summaryCards").innerHTML = cards.map(c=>{
    const [bg,fg] = colorMap[c.color];
    return '<div class="stat-card"><div class="stat-top">'+
      '<span class="stat-label">'+c.label+'</span>'+
      '<span class="stat-icon" style="background:'+bg+';color:'+fg+'"><i data-ic="'+c.icon+'" style="width:18px;height:18px"></i></span>'+
      '</div><div class="stat-value">'+c.value+'</div></div>';
  }).join("");
  renderIcons(document.getElementById("summaryCards"));

  const dot = document.getElementById("notifDot");
  dot.hidden = lowStock===0;

  renderRecentTransactions();
  drawDashboardCharts();
}

function renderRecentTransactions(){
  const rows = [];
  DB.invoices.forEach(i=>rows.push({date:i.date,ref:i.invNo,party:customerName(i),type:i.source==="cash"?"Cash Sale":"Sales Invoice",amount:i.grandTotal,status:i.status,kind:"sale",id:i.id}));
  DB.purchases.forEach(p=>rows.push({date:p.date,ref:p.purNo,party:(supplierById(p.supplierId)||{}).name||"—",type:"Purchase",amount:p.total,status:p.status,kind:"purchase",id:p.id}));
  DB.receipts.forEach(r=>{
    const party = r.partyType==="customer"?(customerById(r.partyId)||{}).name:(supplierById(r.partyId)||{}).name;
    rows.push({date:r.date,ref:r.recNo,party:party||"—",type:r.type==="in"?"Receipt In":"Payment Out",amount:r.amount,status:"Paid",kind:"receipt",id:r.id});
  });
  rows.sort((a,b)=> b.date.localeCompare(a.date));
  const top = rows.slice(0,10);
  const body = document.getElementById("recentTxBody");
  if(!top.length){ body.innerHTML = '<tr class="empty-row"><td colspan="7">No transactions yet.</td></tr>'; return; }
  body.innerHTML = top.map(r=>{
    const onclick = "viewTransaction('"+r.kind+"','"+r.id+"')";
    return "<tr><td>"+fmtDate(r.date)+"</td><td><strong>"+escapeHtml(r.ref)+"</strong></td><td>"+escapeHtml(r.party)+
    "</td><td>"+r.type+"</td><td>"+money(r.amount)+"</td><td>"+paymentStatusBadge(r.status)+
    '</td><td><div class="row-actions"><button title="View" onclick="'+onclick+'"><i data-ic="eye"></i></button></div></td></tr>';
  }).join("");
  renderIcons(body);
}
function viewTransaction(kind,id){
  if(kind==="sale"){
    const inv = DB.invoices.find(i=>i.id===id);
    if(inv.source==="cash"){ goToPage("cash-sales"); toast("Showing cash sale "+inv.invNo,"info"); }
    else { openInvoiceForEdit(inv.id); goToPage("sales-invoices"); }
  } else if(kind==="purchase"){
    goToPage("purchases"); toast("Purchase "+ (DB.purchases.find(p=>p.id===id)||{}).purNo,"info");
  } else if(kind==="receipt"){
    goToPage("payment-receipts");
  }
}

/* ---------------------------------------------------------------------- *
 * 8. LIGHTWEIGHT CANVAS CHARTS (no external chart library needed)        *
 * ---------------------------------------------------------------------- */
function fitCanvas(canvas){
  const ratio = window.devicePixelRatio||1;
  const w = canvas.clientWidth || canvas.parentElement.clientWidth;
  const h = canvas.height ? parseInt(canvas.getAttribute("height")) : 120;
  canvas.width = w*ratio; canvas.height = h*ratio;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio,0,0,ratio,0,0);
  return {ctx,w,h};
}

function drawLineChart(canvasId, series, labels, colors){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const {ctx,w,h} = fitCanvas(canvas);
  ctx.clearRect(0,0,w,h);
  const padL=40,padR=10,padT=10,padB=22;
  const plotW = w-padL-padR, plotH = h-padT-padB;
  const allVals = series.flat();
  const max = Math.max(1, ...allVals);
  const n = labels.length;
  // gridlines
  ctx.strokeStyle="#EEF2F6"; ctx.lineWidth=1;
  for(let g=0;g<=3;g++){
    const y = padT + plotH - (g/3)*plotH;
    ctx.beginPath(); ctx.moveTo(padL,y); ctx.lineTo(w-padR,y); ctx.stroke();
    ctx.fillStyle="#9AA5B8"; ctx.font="10px Inter,sans-serif"; ctx.textAlign="right";
    ctx.fillText(Math.round(max*g/3).toLocaleString(), padL-6, y+3);
  }
  series.forEach((vals,si)=>{
    ctx.strokeStyle = colors[si]; ctx.lineWidth=2.2; ctx.beginPath();
    vals.forEach((v,i)=>{
      const x = padL + (n<=1?0:(i/(n-1))*plotW);
      const y = padT + plotH - (v/max)*plotH;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    });
    ctx.stroke();
    vals.forEach((v,i)=>{
      const x = padL + (n<=1?0:(i/(n-1))*plotW);
      const y = padT + plotH - (v/max)*plotH;
      ctx.fillStyle = colors[si]; ctx.beginPath(); ctx.arc(x,y,2.6,0,7); ctx.fill();
    });
  });
  ctx.fillStyle="#67728A"; ctx.font="10px Inter,sans-serif"; ctx.textAlign="center";
  labels.forEach((l,i)=>{
    const x = padL + (n<=1?0:(i/(n-1))*plotW);
    ctx.fillText(l, x, h-6);
  });
}

function drawBarChart(canvasId, vals, labels, colors){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const {ctx,w,h} = fitCanvas(canvas);
  ctx.clearRect(0,0,w,h);
  const padL=40,padR=10,padT=10,padB=22;
  const plotW=w-padL-padR, plotH=h-padT-padB;
  const max = Math.max(1,...vals);
  const bw = plotW/vals.length*0.55;
  ctx.strokeStyle="#EEF2F6";
  for(let g=0;g<=3;g++){
    const y = padT + plotH - (g/3)*plotH;
    ctx.beginPath(); ctx.moveTo(padL,y); ctx.lineTo(w-padR,y); ctx.stroke();
    ctx.fillStyle="#9AA5B8"; ctx.font="10px Inter,sans-serif"; ctx.textAlign="right";
    ctx.fillText(Math.round(max*g/3).toLocaleString(), padL-6, y+3);
  }
  vals.forEach((v,i)=>{
    const slot = plotW/vals.length;
    const x = padL + i*slot + (slot-bw)/2;
    const bh = (v/max)*plotH;
    const y = padT+plotH-bh;
    const grad = ctx.createLinearGradient(0,y,0,padT+plotH);
    const col = Array.isArray(colors)?colors[i%colors.length]:colors;
    grad.addColorStop(0,col); grad.addColorStop(1,col+"55");
    ctx.fillStyle=grad;
    roundRect(ctx,x,y,bw,bh,4); ctx.fill();
  });
  ctx.fillStyle="#67728A"; ctx.font="10px Inter,sans-serif"; ctx.textAlign="center";
  labels.forEach((l,i)=>{
    const slot = plotW/vals.length;
    const x = padL + i*slot + slot/2;
    ctx.fillText(l, x, h-6);
  });
}
function roundRect(ctx,x,y,w,h,r){
  if(h<=0){h=0.001;}
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.arcTo(x+w,y,x+w,y+h,r);
  ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r);
  ctx.arcTo(x,y,x+w,y,r);
  ctx.closePath();
}

function last7DayLabels(){
  const labels=[], dates=[];
  for(let i=6;i>=0;i--){ const d=daysAgo(i); dates.push(d); labels.push(fmtDate(d).slice(0,6)); }
  return {labels,dates};
}

function drawDashboardCharts(){
  const {labels,dates} = last7DayLabels();
  const salesVals = dates.map(d=>allSales().filter(i=>i.date===d).reduce((a,i)=>a+i.grandTotal,0));
  drawLineChart("chartSales",[salesVals],labels,["#0EA5A0"]);

  const purchaseVals = dates.map(d=>DB.purchases.filter(p=>p.date===d).reduce((a,p)=>a+p.total,0));
  drawBarChart("chartPurchase",purchaseVals,labels,"#15395C");

  // expenses by category (top 5)
  const catTotals = {};
  DB.expenses.forEach(e=>{ catTotals[e.category]=(catTotals[e.category]||0)+e.amount; });
  const catEntries = Object.entries(catTotals).sort((a,b)=>b[1]-a[1]).slice(0,5);
  drawBarChart("chartExpense", catEntries.map(e=>e[1]), catEntries.map(e=>e[0].slice(0,6)), ["#DD5B4E","#E8A63D","#0EA5A0","#15395C","#2E9E6D"]);

  // monthly profit, last 6 months
  const monthLabels=[], profitVals=[];
  for(let i=5;i>=0;i--){
    const d = new Date(); d.setMonth(d.getMonth()-i);
    const ym = d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0");
    monthLabels.push(d.toLocaleDateString("en-GB",{month:"short"}));
    const sales = allSales().filter(x=>x.date.startsWith(ym)).reduce((a,x)=>a+x.grandTotal,0);
    const cogs = DB.purchases.filter(x=>x.date.startsWith(ym)).reduce((a,x)=>a+x.total,0);
    const exp = DB.expenses.filter(x=>x.date.startsWith(ym)).reduce((a,x)=>a+x.amount,0);
    profitVals.push(sales-cogs-exp);
  }
  drawBarChart("chartProfit", profitVals, monthLabels, profitVals.map(v=>v>=0?"#2E9E6D":"#DD5B4E"));

  const cashVals = dates.map(d=>ledgerBalance("Cash",d));
  const bankVals = dates.map(d=>ledgerBalance("Bank",d));
  drawLineChart("chartCashflow",[cashVals,bankVals],labels,["#0EA5A0","#15395C"]);
}
window.addEventListener("resize", debounce(()=>{
  const active = document.querySelector(".page.active");
  if(active && active.id==="page-dashboard") drawDashboardCharts();
  if(active && active.id==="page-cash-book") drawNothingSafe();
},200));
function drawNothingSafe(){}
function debounce(fn,ms){ let t; return function(){ clearTimeout(t); t=setTimeout(fn,ms); }; }

/* ---------------------------------------------------------------------- *
 * 9. CUSTOMERS                                                           *
 * ---------------------------------------------------------------------- */
let customerFilter = "";
function renderCustomers(){
  const body = document.getElementById("customerTableBody");
  const list = DB.customers.filter(c=>{
    const q = customerFilter.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || (c.phone||"").includes(q);
  });
  if(!list.length){ body.innerHTML='<tr class="empty-row"><td colspan="5">No customers found.</td></tr>'; return; }
  body.innerHTML = list.map(c=>{
    const bal = customerOutstanding(c.id);
    return "<tr><td><strong>"+escapeHtml(c.name)+"</strong></td><td>"+escapeHtml(c.phone||"-")+"</td><td>"+escapeHtml(c.email||"-")+
    "</td><td>"+(bal>0?'<span class="badge badge-amber">'+money(bal)+"</span>":'<span class="badge badge-green">Settled</span>')+
    '</td><td><div class="row-actions">'+
    '<button title="View" onclick="viewCustomer(\''+c.id+"')\"><i data-ic=\"eye\"></i></button>"+
    '<button title="Edit" onclick="editCustomer(\''+c.id+"')\"><i data-ic=\"edit\"></i></button>"+
    '<button title="Delete" class="danger" onclick="deleteCustomer(\''+c.id+"')\"><i data-ic=\"trash\"></i></button>"+
    "</div></td></tr>";
  }).join("");
  renderIcons(body);
}
document.getElementById("customerSearch").addEventListener("input",e=>{ customerFilter=e.target.value; renderCustomers(); });

function customerFormHtml(c){
  c = c || {name:"",phone:"",email:"",address:"",openingBalance:0};
  return '<div class="form-grid">'+
    '<div class="field span-2"><label>Customer Name *</label><input id="fName" value="'+escapeHtml(c.name)+'" placeholder="e.g. Nimal Perera"></div>'+
    '<div class="field"><label>Phone</label><input id="fPhone" value="'+escapeHtml(c.phone||"")+'" placeholder="07X XXX XXXX"></div>'+
    '<div class="field"><label>Email</label><input id="fEmail" value="'+escapeHtml(c.email||"")+'" placeholder="name@example.com"></div>'+
    '<div class="field span-2"><label>Address</label><input id="fAddress" value="'+escapeHtml(c.address||"")+'"></div>'+
    '<div class="field"><label>Opening Balance</label><input id="fOpening" type="number" step="0.01" value="'+(c.openingBalance||0)+'"></div>'+
    "</div>";
}
document.getElementById("btnAddCustomer").addEventListener("click",()=>openCustomerModal());
function openCustomerModal(id){
  const existing = id ? customerById(id) : null;
  openModal(existing?"Edit Customer":"Add Customer", customerFormHtml(existing),
    '<button class="btn btn-ghost" onclick="closeModal()">Cancel</button>'+
    '<button class="btn btn-primary" id="saveCustomerBtn"><i data-ic="check"></i>Save Customer</button>');
  document.getElementById("saveCustomerBtn").addEventListener("click",()=>{
    const name = document.getElementById("fName").value.trim();
    if(!name){ toast("Customer name is required","error"); return; }
    const data = {
      name, phone:document.getElementById("fPhone").value.trim(),
      email:document.getElementById("fEmail").value.trim(),
      address:document.getElementById("fAddress").value.trim(),
      openingBalance: parseFloat(document.getElementById("fOpening").value)||0
    };
    if(existing){ Object.assign(existing,data); toast("Customer updated","success"); }
    else{ DB.customers.push(Object.assign({id:uid("cus"),createdAt:todayISO()},data)); toast("Customer added","success"); }
    saveDB(); closeModal(); renderCustomers(); populateAllDatalists();
  });
}
function editCustomer(id){ openCustomerModal(id); }
function deleteCustomer(id){
  confirmDialog("Delete customer?","This will remove the customer record. Related invoices stay on file.",()=>{
    DB.customers = DB.customers.filter(c=>c.id!==id);
    saveDB(); renderCustomers(); populateAllDatalists(); toast("Customer deleted","success");
  });
}
function viewCustomer(id){
  const c = customerById(id); if(!c) return;
  const invs = DB.invoices.filter(i=>i.customerId===id).sort((a,b)=>b.date.localeCompare(a.date));
  const bal = customerOutstanding(id);
  let html = '<div class="form-grid"><div class="field"><label>Phone</label><input value="'+escapeHtml(c.phone||"-")+'" readonly></div>'+
    '<div class="field"><label>Email</label><input value="'+escapeHtml(c.email||"-")+'" readonly></div>'+
    '<div class="field span-2"><label>Address</label><input value="'+escapeHtml(c.address||"-")+'" readonly></div></div>'+
    '<div class="report-tile" style="margin-bottom:14px"><span>Outstanding Balance</span><strong>'+money(bal)+"</strong></div>"+
    "<h4 style='margin-bottom:8px;font-size:13px'>Payment / Invoice History</h4>"+
    '<div class="table-wrap"><table class="data-table"><thead><tr><th>Date</th><th>Ref</th><th>Total</th><th>Paid</th><th>Balance</th><th>Status</th></tr></thead><tbody>';
  if(!invs.length) html += '<tr class="empty-row"><td colspan="6">No transactions yet.</td></tr>';
  invs.forEach(i=>{
    html += "<tr><td>"+fmtDate(i.date)+"</td><td>"+i.invNo+"</td><td>"+money(i.grandTotal)+"</td><td>"+money(i.paid)+"</td><td>"+money(i.balance)+"</td><td>"+paymentStatusBadge(i.status)+"</td></tr>";
  });
  html += "</tbody></table></div>";
  openModal("Customer Details — "+c.name, html, '<button class="btn btn-ghost" onclick="closeModal()">Close</button>');
}

/* ---------------------------------------------------------------------- *
 * 10. SUPPLIERS                                                          *
 * ---------------------------------------------------------------------- */
let supplierFilter = "";
function renderSuppliers(){
  const body = document.getElementById("supplierTableBody");
  const list = DB.suppliers.filter(s=>{
    const q = supplierFilter.toLowerCase();
    return !q || s.name.toLowerCase().includes(q) || (s.phone||"").includes(q);
  });
  if(!list.length){ body.innerHTML='<tr class="empty-row"><td colspan="5">No suppliers found.</td></tr>'; return; }
  body.innerHTML = list.map(s=>{
    const bal = supplierOutstanding(s.id);
    return "<tr><td><strong>"+escapeHtml(s.name)+"</strong></td><td>"+escapeHtml(s.phone||"-")+"</td><td>"+escapeHtml(s.email||"-")+
    "</td><td>"+(bal>0?'<span class="badge badge-amber">'+money(bal)+"</span>":'<span class="badge badge-green">Settled</span>')+
    '</td><td><div class="row-actions">'+
    '<button title="View" onclick="viewSupplier(\''+s.id+"')\"><i data-ic=\"eye\"></i></button>"+
    '<button title="Edit" onclick="editSupplier(\''+s.id+"')\"><i data-ic=\"edit\"></i></button>"+
    '<button title="Delete" class="danger" onclick="deleteSupplier(\''+s.id+"')\"><i data-ic=\"trash\"></i></button>"+
    "</div></td></tr>";
  }).join("");
  renderIcons(body);
}
document.getElementById("supplierSearch").addEventListener("input",e=>{ supplierFilter=e.target.value; renderSuppliers(); });

function supplierFormHtml(s){
  s = s || {name:"",phone:"",email:"",address:"",openingBalance:0};
  return '<div class="form-grid">'+
    '<div class="field span-2"><label>Supplier Name *</label><input id="fName" value="'+escapeHtml(s.name)+'" placeholder="e.g. Ceylon Fisheries Co."></div>'+
    '<div class="field"><label>Phone</label><input id="fPhone" value="'+escapeHtml(s.phone||"")+'"></div>'+
    '<div class="field"><label>Email</label><input id="fEmail" value="'+escapeHtml(s.email||"")+'"></div>'+
    '<div class="field span-2"><label>Address</label><input id="fAddress" value="'+escapeHtml(s.address||"")+'"></div>'+
    '<div class="field"><label>Opening Balance</label><input id="fOpening" type="number" step="0.01" value="'+(s.openingBalance||0)+'"></div>'+
    "</div>";
}
document.getElementById("btnAddSupplier").addEventListener("click",()=>openSupplierModal());
function openSupplierModal(id){
  const existing = id ? supplierById(id) : null;
  openModal(existing?"Edit Supplier":"Add Supplier", supplierFormHtml(existing),
    '<button class="btn btn-ghost" onclick="closeModal()">Cancel</button>'+
    '<button class="btn btn-primary" id="saveSupplierBtn"><i data-ic="check"></i>Save Supplier</button>');
  document.getElementById("saveSupplierBtn").addEventListener("click",()=>{
    const name = document.getElementById("fName").value.trim();
    if(!name){ toast("Supplier name is required","error"); return; }
    const data = {
      name, phone:document.getElementById("fPhone").value.trim(),
      email:document.getElementById("fEmail").value.trim(),
      address:document.getElementById("fAddress").value.trim(),
      openingBalance: parseFloat(document.getElementById("fOpening").value)||0
    };
    if(existing){ Object.assign(existing,data); toast("Supplier updated","success"); }
    else{ DB.suppliers.push(Object.assign({id:uid("sup"),createdAt:todayISO()},data)); toast("Supplier added","success"); }
    saveDB(); closeModal(); renderSuppliers(); populateAllDatalists();
  });
}
function editSupplier(id){ openSupplierModal(id); }
function deleteSupplier(id){
  confirmDialog("Delete supplier?","This will remove the supplier record. Related purchases stay on file.",()=>{
    DB.suppliers = DB.suppliers.filter(s=>s.id!==id);
    saveDB(); renderSuppliers(); populateAllDatalists(); toast("Supplier deleted","success");
  });
}
function viewSupplier(id){
  const s = supplierById(id); if(!s) return;
  const purs = DB.purchases.filter(p=>p.supplierId===id).sort((a,b)=>b.date.localeCompare(a.date));
  const bal = supplierOutstanding(id);
  let html = '<div class="form-grid"><div class="field"><label>Phone</label><input value="'+escapeHtml(s.phone||"-")+'" readonly></div>'+
    '<div class="field"><label>Email</label><input value="'+escapeHtml(s.email||"-")+'" readonly></div>'+
    '<div class="field span-2"><label>Address</label><input value="'+escapeHtml(s.address||"-")+'" readonly></div></div>'+
    '<div class="report-tile" style="margin-bottom:14px"><span>Outstanding Payable</span><strong>'+money(bal)+"</strong></div>"+
    "<h4 style='margin-bottom:8px;font-size:13px'>Payment / Purchase History</h4>"+
    '<div class="table-wrap"><table class="data-table"><thead><tr><th>Date</th><th>Ref</th><th>Total</th><th>Paid</th><th>Balance</th><th>Status</th></tr></thead><tbody>';
  if(!purs.length) html += '<tr class="empty-row"><td colspan="6">No transactions yet.</td></tr>';
  purs.forEach(p=>{
    html += "<tr><td>"+fmtDate(p.date)+"</td><td>"+p.purNo+"</td><td>"+money(p.total)+"</td><td>"+money(p.paid)+"</td><td>"+money(p.balance)+"</td><td>"+paymentStatusBadge(p.status)+"</td></tr>";
  });
  html += "</tbody></table></div>";
  openModal("Supplier Details — "+s.name, html, '<button class="btn btn-ghost" onclick="closeModal()">Close</button>');
}

/* ---------------------------------------------------------------------- *
 * 11. PRODUCTS                                                           *
 * ---------------------------------------------------------------------- */
let productFilter = "";
function renderProducts(){
  const body = document.getElementById("productTableBody");
  const list = DB.products.filter(p=>{
    const q = productFilter.toLowerCase();
    return !q || p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
  });
  if(!list.length){ body.innerHTML='<tr class="empty-row"><td colspan="9">No products found.</td></tr>'; return; }
  body.innerHTML = list.map(p=>{
    const st = stockStatus(p);
    const img = p.image ? '<img class="prod-thumb" src="'+p.image+'">' : '<div class="prod-thumb"></div>';
    return "<tr><td>"+img+"</td><td><strong>"+escapeHtml(p.name)+"</strong><div class='muted'>"+escapeHtml(p.category||"")+"</div></td>"+
    "<td>"+escapeHtml(p.code)+"</td><td>"+escapeHtml(p.category||"-")+"</td><td>"+money(p.purchasePrice)+"</td><td>"+money(p.sellingPrice)+
    "</td><td>"+p.stock+" "+escapeHtml(p.unit||"")+'</td><td><span class="badge '+st.cls+'">'+st.label+"</span></td>"+
    '<td><div class="row-actions">'+
    '<button title="View" onclick="viewProduct(\''+p.id+"')\"><i data-ic=\"eye\"></i></button>"+
    '<button title="Edit" onclick="editProduct(\''+p.id+"')\"><i data-ic=\"edit\"></i></button>"+
    '<button title="Delete" class="danger" onclick="deleteProduct(\''+p.id+"')\"><i data-ic=\"trash\"></i></button>"+
    "</div></td></tr>";
  }).join("");
  renderIcons(body);
}
document.getElementById("productSearch").addEventListener("input",e=>{ productFilter=e.target.value; renderProducts(); });

function productFormHtml(p){
  p = p || {name:"",code:"",category:"",unit:"pcs",purchasePrice:0,sellingPrice:0,stock:0,minStock:5,supplierId:"",image:""};
  const supOpts = DB.suppliers.map(s=>'<option value="'+s.id+'"'+(s.id===p.supplierId?" selected":"")+">"+escapeHtml(s.name)+"</option>").join("");
  return '<div class="form-grid">'+
    '<div class="field span-2"><label>Product Name *</label><input id="fName" value="'+escapeHtml(p.name)+'"></div>'+
    '<div class="field"><label>Product Code *</label><input id="fCode" value="'+escapeHtml(p.code)+'"></div>'+
    '<div class="field"><label>Category</label><input id="fCategory" value="'+escapeHtml(p.category||"")+'"></div>'+
    '<div class="field"><label>Unit</label><input id="fUnit" value="'+escapeHtml(p.unit||"pcs")+'" placeholder="kg / pcs / bag"></div>'+
    '<div class="field"><label>Supplier</label><select id="fSupplier"><option value="">— none —</option>'+supOpts+"</select></div>"+
    '<div class="field"><label>Purchase Price</label><input id="fPurchasePrice" type="number" step="0.01" value="'+p.purchasePrice+'"></div>'+
    '<div class="field"><label>Selling Price</label><input id="fSellingPrice" type="number" step="0.01" value="'+p.sellingPrice+'"></div>'+
    '<div class="field"><label>Current Stock</label><input id="fStock" type="number" value="'+p.stock+'"></div>'+
    '<div class="field"><label>Minimum Stock</label><input id="fMinStock" type="number" value="'+p.minStock+'"></div>'+
    '<div class="field span-2"><label>Product Image</label><input id="fImage" type="file" accept="image/*"><input type="hidden" id="fImageData" value="'+escapeHtml(p.image||"")+'"></div>'+
    "</div>";
}
document.getElementById("btnAddProduct").addEventListener("click",()=>openProductModal());
function openProductModal(id){
  const existing = id ? productById(id) : null;
  openModal(existing?"Edit Product":"Add Product", productFormHtml(existing),
    '<button class="btn btn-ghost" onclick="closeModal()">Cancel</button>'+
    '<button class="btn btn-primary" id="saveProductBtn"><i data-ic="check"></i>Save Product</button>');
  const fileInput = document.getElementById("fImage");
  fileInput.addEventListener("change",()=>{
    const file = fileInput.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = ()=>{ document.getElementById("fImageData").value = reader.result; };
    reader.readAsDataURL(file);
  });
  document.getElementById("saveProductBtn").addEventListener("click",()=>{
    const name = document.getElementById("fName").value.trim();
    const code = document.getElementById("fCode").value.trim();
    if(!name || !code){ toast("Product name and code are required","error"); return; }
    const data = {
      name, code, category:document.getElementById("fCategory").value.trim(),
      unit:document.getElementById("fUnit").value.trim()||"pcs",
      supplierId:document.getElementById("fSupplier").value,
      purchasePrice: parseFloat(document.getElementById("fPurchasePrice").value)||0,
      sellingPrice: parseFloat(document.getElementById("fSellingPrice").value)||0,
      stock: parseFloat(document.getElementById("fStock").value)||0,
      minStock: parseFloat(document.getElementById("fMinStock").value)||0,
      image: document.getElementById("fImageData").value||""
    };
    if(existing){ Object.assign(existing,data); toast("Product updated","success"); }
    else{ DB.products.push(Object.assign({id:uid("prd"),createdAt:todayISO()},data)); toast("Product added","success"); }
    saveDB(); closeModal(); renderProducts(); populateAllDatalists();
  });
}
function editProduct(id){ openProductModal(id); }
function deleteProduct(id){
  confirmDialog("Delete product?","This removes the product from your catalogue.",()=>{
    DB.products = DB.products.filter(p=>p.id!==id);
    saveDB(); renderProducts(); populateAllDatalists(); toast("Product deleted","success");
  });
}
function viewProduct(id){
  const p = productById(id); if(!p) return;
  const st = stockStatus(p);
  const sup = supplierById(p.supplierId);
  const html = (p.image?'<img src="'+p.image+'" style="width:100%;max-height:180px;object-fit:cover;border-radius:10px;margin-bottom:14px">':'')+
    '<div class="form-grid">'+
    '<div class="field"><label>Code</label><input value="'+escapeHtml(p.code)+'" readonly></div>'+
    '<div class="field"><label>Category</label><input value="'+escapeHtml(p.category||"-")+'" readonly></div>'+
    '<div class="field"><label>Purchase Price</label><input value="'+money(p.purchasePrice)+'" readonly></div>'+
    '<div class="field"><label>Selling Price</label><input value="'+money(p.sellingPrice)+'" readonly></div>'+
    '<div class="field"><label>Current Stock</label><input value="'+p.stock+" "+escapeHtml(p.unit||"")+'" readonly></div>'+
    '<div class="field"><label>Minimum Stock</label><input value="'+p.minStock+'" readonly></div>'+
    '<div class="field span-2"><label>Supplier</label><input value="'+escapeHtml(sup?sup.name:"—")+'" readonly></div>'+
    "</div>"+
    '<span class="badge '+st.cls+'">'+st.label+"</span>";
  openModal("Product Details — "+p.name, html, '<button class="btn btn-ghost" onclick="closeModal()">Close</button>');
}

/* ---------------------------------------------------------------------- *
 * 12. STOCK MANAGEMENT                                                   *
 * ---------------------------------------------------------------------- */
let stockFilter = "";
function renderStock(){
  const inStock = DB.products.filter(p=>p.stock>p.minStock).length;
  const low = DB.products.filter(p=>p.stock>0 && p.stock<=p.minStock).length;
  const out = DB.products.filter(p=>p.stock<=0).length;
  document.getElementById("stockCards").innerHTML = [
    {label:"In Stock Items",value:inStock,cls:"badge-green"},
    {label:"Low Stock Items",value:low,cls:"badge-amber"},
    {label:"Out of Stock",value:out,cls:"badge-red"},
    {label:"Total Products",value:DB.products.length,cls:"badge-teal"},
  ].map(c=>'<div class="stat-card"><span class="stat-label">'+c.label+'</span><div class="stat-value">'+c.value+"</div></div>").join("");

  const body = document.getElementById("stockTableBody");
  const list = DB.products.filter(p=>!stockFilter || p.name.toLowerCase().includes(stockFilter.toLowerCase()) || p.code.toLowerCase().includes(stockFilter.toLowerCase()));
  body.innerHTML = list.map(p=>{
    const st = stockStatus(p);
    return "<tr><td><strong>"+escapeHtml(p.name)+"</strong></td><td>"+escapeHtml(p.code)+"</td><td>"+p.stock+" "+escapeHtml(p.unit||"")+
      "</td><td>"+p.minStock+"</td><td><span class='badge "+st.cls+"'>"+st.label+"</span></td></tr>";
  }).join("") || '<tr class="empty-row"><td colspan="5">No products found.</td></tr>';

  const hist = DB.stockMovements.slice().sort((a,b)=>b.date.localeCompare(a.date)).slice(0,30);
  const histBody = document.getElementById("stockHistoryBody");
  histBody.innerHTML = hist.map(m=>{
    const p = productById(m.productId);
    const typeBadge = m.type==="in"?'<span class="badge badge-green">Stock In</span>':m.type==="out"?'<span class="badge badge-red">Stock Out</span>':'<span class="badge badge-amber">Adjustment</span>';
    return "<tr><td>"+fmtDate(m.date)+"</td><td>"+(p?escapeHtml(p.name):"—")+"</td><td>"+typeBadge+"</td><td>"+m.qty+"</td><td class='muted'>"+escapeHtml(m.note||"")+"</td></tr>";
  }).join("") || '<tr class="empty-row"><td colspan="5">No stock movements yet.</td></tr>';
}
document.getElementById("stockSearch").addEventListener("input",e=>{ stockFilter=e.target.value; renderStock(); });

function stockMoveFormHtml(kind){
  const opts = DB.products.map(p=>'<option value="'+p.id+'">'+escapeHtml(p.name)+" ("+escapeHtml(p.code)+")</option>").join("");
  const label = kind==="in"?"Stock In":kind==="out"?"Stock Out":"Stock Adjustment";
  return '<div class="form-grid">'+
    '<div class="field span-2"><label>Product *</label><select id="smProduct">'+opts+"</select></div>"+
    '<div class="field"><label>'+(kind==="adjust"?"New Stock Quantity":"Quantity")+'</label><input id="smQty" type="number" min="0" value="1"></div>'+
    '<div class="field"><label>Date</label><input id="smDate" type="date" value="'+todayISO()+'"></div>'+
    '<div class="field span-2"><label>Note</label><input id="smNote" placeholder="Reason / reference"></div>'+
    "</div>";
}
function openStockMoveModal(kind){
  const titles={in:"Stock In",out:"Stock Out",adjust:"Stock Adjustment"};
  openModal(titles[kind], stockMoveFormHtml(kind),
    '<button class="btn btn-ghost" onclick="closeModal()">Cancel</button>'+
    '<button class="btn btn-primary" id="smSaveBtn"><i data-ic="check"></i>Save</button>');
  document.getElementById("smSaveBtn").addEventListener("click",()=>{
    const pid = document.getElementById("smProduct").value;
    const qty = parseFloat(document.getElementById("smQty").value)||0;
    const date = document.getElementById("smDate").value || todayISO();
    const note = document.getElementById("smNote").value.trim();
    const p = productById(pid);
    if(!p){ toast("Select a product","error"); return; }
    if(kind==="in"){ p.stock += qty; DB.stockMovements.push({id:uid("sm"),date,productId:pid,type:"in",qty,note:note||"Manual stock in"}); }
    else if(kind==="out"){
      if(qty>p.stock){ toast("Not enough stock available","error"); return; }
      p.stock -= qty; DB.stockMovements.push({id:uid("sm"),date,productId:pid,type:"out",qty,note:note||"Manual stock out"});
    } else {
      const diff = qty-p.stock;
      p.stock = qty;
      DB.stockMovements.push({id:uid("sm"),date,productId:pid,type:"adjust",qty:diff,note:note||"Stock adjustment"});
    }
    saveDB(); closeModal(); renderStock(); toast("Stock updated","success");
  });
}
document.getElementById("btnStockIn").addEventListener("click",()=>openStockMoveModal("in"));
document.getElementById("btnStockOut").addEventListener("click",()=>openStockMoveModal("out"));
document.getElementById("btnStockAdjust").addEventListener("click",()=>openStockMoveModal("adjust"));

/* ---------------------------------------------------------------------- *
 * 13. CASH SALES                                                         *
 * ---------------------------------------------------------------------- */
let csItems = [];
function renderCashSalesPage(){
  csItems = [];
  renderCsItems();
  document.getElementById("csPaid").value = 0;
  renderCashSalesList();
}
function renderCsItems(){
  const body = document.getElementById("csItemsBody");
  body.innerHTML = csItems.map((it,idx)=>
    "<tr><td>"+escapeHtml(it.name)+"</td><td>"+it.qty+"</td><td>"+money(it.price)+"</td><td>"+money(it.total)+
    '</td><td><button class="row-actions" style="border:none" onclick="csRemoveItem('+idx+')"><i data-ic="x"></i></button></td></tr>'
  ).join("") || '<tr class="empty-row"><td colspan="5">No items added yet.</td></tr>';
  renderIcons(body);
  const total = csItems.reduce((a,i)=>a+i.total,0);
  document.getElementById("csTotal").textContent = money(total);
  updateCsBalance();
}
function updateCsBalance(){
  const total = csItems.reduce((a,i)=>a+i.total,0);
  const paid = parseFloat(document.getElementById("csPaid").value)||0;
  document.getElementById("csBalance").textContent = money(total-paid);
}
document.getElementById("csPaid").addEventListener("input",updateCsBalance);
function csRemoveItem(idx){ csItems.splice(idx,1); renderCsItems(); }
document.getElementById("csAddItem").addEventListener("click",()=>{
  const name = document.getElementById("csProduct").value.trim();
  const qty = parseFloat(document.getElementById("csQty").value)||0;
  let price = parseFloat(document.getElementById("csPrice").value);
  const product = DB.products.find(p=>p.name===name || (p.name+" ("+p.code+")")===name);
  if(!name || qty<=0){ toast("Enter a product and quantity","error"); return; }
  if(isNaN(price)) price = product?product.sellingPrice:0;
  csItems.push({productId:product?product.id:null,name:product?product.name:name,qty,price,total:qty*price});
  document.getElementById("csProduct").value=""; document.getElementById("csQty").value=1; document.getElementById("csPrice").value="";
  renderCsItems();
});
document.getElementById("csComplete").addEventListener("click",()=>{
  if(!csItems.length){ toast("Add at least one item","error"); return; }
  for(const it of csItems){
    if(it.productId){
      const p = productById(it.productId);
      if(p && it.qty>p.stock){ toast("Not enough stock for "+p.name,"error"); return; }
    }
  }
  const total = csItems.reduce((a,i)=>a+i.total,0);
  const paid = parseFloat(document.getElementById("csPaid").value)||total;
  const method = document.getElementById("csPaymentMethod").value;
  const custName = document.getElementById("csCustomer").value.trim()||"Walk-in Customer";
  const csNo = nextDocNo("cs");
  const date = todayISO();
  const sale = {id:uid("cs"),invNo:csNo,date,customerId:null,customerName:custName,items:csItems.slice(),
    subtotal:total,discount:0,grandTotal:total,paid,balance:total-paid,
    status: paid>=total?"Paid":(paid>0?"Partial":"Unpaid"),source:"cash",method};
  DB.invoices.push(sale);
  csItems.forEach(it=>{
    if(it.productId){
      const p = productById(it.productId); p.stock -= it.qty;
      DB.stockMovements.push({id:uid("sm"),date,productId:p.id,type:"out",qty:it.qty,note:"Cash sale "+csNo});
    }
  });
  if(paid>0) DB.ledger.push({id:uid("lg"),date,account:method==="Cash"?"Cash":"Bank",ref:csNo,description:"Cash sale - "+csNo,debit:paid,credit:0});
  saveDB();
  toast("Cash sale "+csNo+" completed","success");
  window._lastCashSale = sale;
  csItems = []; document.getElementById("csCustomer").value=""; renderCsItems();
  renderCashSalesList(); renderDashboard();
});
function renderCashSalesList(){
  const body = document.getElementById("cashSalesBody");
  const list = cashSalesOnly().slice().sort((a,b)=>b.date.localeCompare(a.date)).slice(0,15);
  body.innerHTML = list.map(s=>
    "<tr><td>"+fmtDate(s.date)+"</td><td>"+s.invNo+"</td><td>"+escapeHtml(s.customerName)+"</td><td>"+money(s.grandTotal)+"</td><td>"+escapeHtml(s.method||"Cash")+
    '</td><td><div class="row-actions"><button title="Receipt" onclick="printDocByRef(\''+s.id+"')\"><i data-ic=\"printer\"></i></button></div></td></tr>"
  ).join("") || '<tr class="empty-row"><td colspan="6">No cash sales yet.</td></tr>';
  renderIcons(body);
}
function printDocByRef(saleId){
  window._lastCashSale = DB.invoices.find(i=>i.id===saleId);
  printReceiptDoc(window._lastCashSale);
}
function buildReceiptHtml(sale){
  const rows = sale.items.map(it=>"<tr><td>"+escapeHtml(it.name)+"</td><td>"+it.qty+"</td><td>"+money(it.price)+"</td><td>"+money(it.total)+"</td></tr>").join("");
  return '<div style="font-family:Inter,sans-serif;padding:20px;max-width:420px">'+logoImgHtml(120)+
    "<h2 style='margin:0 0 2px'>"+escapeHtml(DB.settings.companyName)+"</h2>"+
    "<p class='muted' style='margin:0 0 14px'>"+escapeHtml(DB.settings.address)+" · "+escapeHtml(DB.settings.phone)+"</p>"+
    "<p><strong>Receipt:</strong> "+sale.invNo+" &nbsp; <strong>Date:</strong> "+fmtDate(sale.date)+"</p>"+
    "<p><strong>Customer:</strong> "+escapeHtml(sale.customerName||customerName(sale))+"</p>"+
    '<table class="data-table" style="margin-top:10px"><thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead><tbody>'+rows+"</tbody></table>"+
    '<div style="text-align:right;margin-top:12px"><p>Total: <strong>'+money(sale.grandTotal)+"</strong></p>"+
    "<p>Paid: "+money(sale.paid)+"</p><p>Balance: "+money(sale.balance)+"</p></div>"+
    "<p class='muted' style='margin-top:16px;text-align:center'>Thank you for your business!</p></div>";
}
function printReceiptDoc(sale){
  const w = window.open("","_blank");
  w.document.write("<html><head><title>"+sale.invNo+"</title><link rel='stylesheet' href='style.css'></head><body onload='window.print()'>"+buildReceiptHtml(sale)+"</body></html>");
  w.document.close();
}
document.getElementById("csPrint").addEventListener("click",()=>{
  const sale = window._lastCashSale || {invNo:"DRAFT",date:todayISO(),customerName:document.getElementById("csCustomer").value||"Walk-in Customer",
    items:csItems, grandTotal:csItems.reduce((a,i)=>a+i.total,0),paid:parseFloat(document.getElementById("csPaid").value)||0,
    balance:(csItems.reduce((a,i)=>a+i.total,0))-(parseFloat(document.getElementById("csPaid").value)||0)};
  if(!sale.items.length){ toast("Add items or complete a sale first","error"); return; }
  printReceiptDoc(sale);
});
document.getElementById("csPdf").addEventListener("click",()=>exportReceiptAs("pdf"));
document.getElementById("csJpg").addEventListener("click",()=>exportReceiptAs("jpg"));
function exportReceiptAs(fmt){
  if(!csItems.length && !window._lastCashSale){ toast("Add items or complete a sale first","error"); return; }
  const sale = window._lastCashSale && window._lastCashSale.items===csItems ? window._lastCashSale : {
    invNo:(window._lastCashSale?window._lastCashSale.invNo:"DRAFT"),date:todayISO(),
    customerName:document.getElementById("csCustomer").value||"Walk-in Customer", items:csItems,
    grandTotal:csItems.reduce((a,i)=>a+i.total,0), paid:parseFloat(document.getElementById("csPaid").value)||0,
    balance:(csItems.reduce((a,i)=>a+i.total,0))-(parseFloat(document.getElementById("csPaid").value)||0)
  };
  const holder = document.createElement("div");
  holder.style.position="fixed"; holder.style.left="-9999px"; holder.style.background="#fff";
  holder.innerHTML = buildReceiptHtml(sale);
  document.body.appendChild(holder);
  exportNodeToFile(holder, sale.invNo, fmt).then(()=>holder.remove());
}

/* ---------------------------------------------------------------------- *
 * 14. SALES INVOICES                                                     *
 * ---------------------------------------------------------------------- */
let invItems = [];
let invEditingId = null;
let invFilter = "";

function renderInvoiceList(){
  document.getElementById("invoiceListView").hidden = false;
  document.getElementById("invoiceFormView").hidden = true;
  const body = document.getElementById("invoiceTableBody");
  const list = creditInvoices().filter(i=>{
    const q = invFilter.toLowerCase();
    return !q || i.invNo.toLowerCase().includes(q) || customerName(i).toLowerCase().includes(q);
  }).sort((a,b)=>b.date.localeCompare(a.date));
  body.innerHTML = list.map(i=>
    "<tr><td>"+fmtDate(i.date)+"</td><td><strong>"+i.invNo+"</strong></td><td>"+escapeHtml(customerName(i))+"</td><td>"+money(i.grandTotal)+
    "</td><td>"+money(i.paid)+"</td><td>"+money(i.balance)+"</td><td>"+paymentStatusBadge(i.status)+
    '</td><td><div class="row-actions">'+
    '<button title="View / Print" onclick="printInvoiceById(\''+i.id+"')\"><i data-ic=\"printer\"></i></button>"+
    '<button title="Edit" onclick="openInvoiceForEdit(\''+i.id+"')\"><i data-ic=\"edit\"></i></button>"+
    '<button title="Delete" class="danger" onclick="deleteInvoice(\''+i.id+"')\"><i data-ic=\"trash\"></i></button>"+
    "</div></td></tr>"
  ).join("") || '<tr class="empty-row"><td colspan="8">No invoices yet. Click "New Sales Invoice" to create one.</td></tr>';
  renderIcons(body);
}
document.getElementById("invoiceSearch").addEventListener("input",e=>{ invFilter=e.target.value; renderInvoiceList(); });

function showInvoiceForm(){
  document.getElementById("invoiceListView").hidden = true;
  document.getElementById("invoiceFormView").hidden = false;
}
document.getElementById("btnNewInvoice").addEventListener("click",()=>{
  invEditingId = null; invItems = [];
  document.getElementById("invNo").value = nextDocNoPreview("inv");
  document.getElementById("invDate").value = todayISO();
  document.getElementById("invCustomer").value = "";
  document.getElementById("invPaid").value = 0;
  renderInvItems();
  showInvoiceForm();
});
function nextDocNoPreview(kind){
  const n = (DB.counters[kind]||0)+1;
  const map={ inv:"INV-", pur:"PUR-", cs:"CS-", rcpt:"RCPT-" };
  return (map[kind]||"DOC-")+String(n).padStart(4,"0");
}
function openInvoiceForEdit(id){
  const inv = DB.invoices.find(i=>i.id===id); if(!inv) return;
  invEditingId = id; invItems = inv.items.map(i=>({...i}));
  document.getElementById("invNo").value = inv.invNo;
  document.getElementById("invDate").value = inv.date;
  document.getElementById("invCustomer").value = customerName(inv);
  document.getElementById("invPaid").value = inv.paid;
  renderInvItems();
  showInvoiceForm();
}
document.getElementById("invCancel").addEventListener("click",renderInvoiceList);

function renderInvItems(){
  const body = document.getElementById("invItemsBody");
  body.innerHTML = invItems.map((it,idx)=>
    "<tr><td>"+escapeHtml(it.name)+"</td><td>"+it.qty+"</td><td>"+money(it.price)+"</td><td>"+money(it.discount)+"</td><td>"+money(it.total)+
    '</td><td class="no-print"><button class="row-actions" style="border:none" onclick="invRemoveItem('+idx+')"><i data-ic="x"></i></button></td></tr>'
  ).join("") || '<tr class="empty-row"><td colspan="6">No items added yet.</td></tr>';
  renderIcons(body);
  updateInvTotals();
}
function invRemoveItem(idx){ invItems.splice(idx,1); renderInvItems(); }
document.getElementById("invAddItem").addEventListener("click",()=>{
  const name = document.getElementById("invItemName").value.trim();
  const qty = parseFloat(document.getElementById("invItemQty").value)||0;
  let price = parseFloat(document.getElementById("invItemPrice").value);
  const discount = parseFloat(document.getElementById("invItemDiscount").value)||0;
  const product = DB.products.find(p=>p.name===name || (p.name+" ("+p.code+")")===name);
  if(!name||qty<=0){ toast("Enter item name and quantity","error"); return; }
  if(isNaN(price)) price = product?product.sellingPrice:0;
  const total = qty*price-discount;
  invItems.push({productId:product?product.id:null,name:product?product.name:name,qty,price,discount,total});
  ["invItemName","invItemQty","invItemPrice","invItemDiscount"].forEach(id=>document.getElementById(id).value="");
  document.getElementById("invItemQty").value=1;
  renderInvItems();
});
function updateInvTotals(){
  const subtotal = invItems.reduce((a,i)=>a+i.qty*i.price,0);
  const discount = invItems.reduce((a,i)=>a+i.discount,0);
  const grand = subtotal-discount;
  const paid = parseFloat(document.getElementById("invPaid").value)||0;
  document.getElementById("invSubtotal").textContent = money(subtotal);
  document.getElementById("invDiscountTotal").textContent = money(discount);
  document.getElementById("invGrandTotal").textContent = money(grand);
  document.getElementById("invBalanceDue").textContent = money(grand-paid);
}
document.getElementById("invPaid").addEventListener("input",updateInvTotals);

document.getElementById("invSave").addEventListener("click",()=>{
  const custName = document.getElementById("invCustomer").value.trim();
  if(!custName){ toast("Enter a customer name","error"); return; }
  if(!invItems.length){ toast("Add at least one item","error"); return; }
  for(const it of invItems){
    if(it.productId){
      const p = productById(it.productId);
      const previousQty = (invEditingId && DB.invoices.find(i=>i.id===invEditingId)) ?
        (DB.invoices.find(i=>i.id===invEditingId).items.find(x=>x.productId===it.productId)||{}).qty||0 : 0;
      const available = p.stock+previousQty;
      if(p && it.qty>available){ toast("Not enough stock for "+p.name,"error"); return; }
    }
  }
  let customer = DB.customers.find(c=>c.name.toLowerCase()===custName.toLowerCase());
  if(!customer){
    customer = {id:uid("cus"),name:custName,phone:"",email:"",address:"",openingBalance:0,createdAt:todayISO()};
    DB.customers.push(customer);
  }
  const subtotal = invItems.reduce((a,i)=>a+i.qty*i.price,0);
  const discount = invItems.reduce((a,i)=>a+i.discount,0);
  const grandTotal = subtotal-discount;
  const paid = parseFloat(document.getElementById("invPaid").value)||0;
  const balance = grandTotal-paid;
  const date = document.getElementById("invDate").value || todayISO();
  const status = balance<=0?"Paid":(paid>0?"Partial":"Unpaid");

  if(invEditingId){
    const inv = DB.invoices.find(i=>i.id===invEditingId);
    // revert previous stock impact
    inv.items.forEach(it=>{ if(it.productId){ const p=productById(it.productId); if(p) p.stock += it.qty; } });
    Object.assign(inv,{customerId:customer.id,date,items:invItems.slice(),subtotal,discount,grandTotal,paid,balance,status});
    inv.items.forEach(it=>{ if(it.productId){ const p=productById(it.productId); if(p){ p.stock -= it.qty;
      DB.stockMovements.push({id:uid("sm"),date,productId:p.id,type:"out",qty:it.qty,note:"Sale "+inv.invNo+" (updated)"});
    }}});
    toast("Invoice "+inv.invNo+" updated","success");
  } else {
    const invNo = nextDocNo("inv");
    const inv = {id:uid("inv"),invNo,date,customerId:customer.id,items:invItems.slice(),subtotal,discount,grandTotal,paid,balance,status,source:"invoice"};
    DB.invoices.push(inv);
    inv.items.forEach(it=>{ if(it.productId){ const p=productById(it.productId); if(p){ p.stock -= it.qty;
      DB.stockMovements.push({id:uid("sm"),date,productId:p.id,type:"out",qty:it.qty,note:"Sale "+invNo});
    }}});
    toast("Invoice "+invNo+" saved","success");
  }
  if(paid>0){
    const ref = invEditingId ? DB.invoices.find(i=>i.id===invEditingId).invNo : DB.invoices[DB.invoices.length-1].invNo;
    DB.ledger.push({id:uid("lg"),date,account:"Cash",ref,description:"Payment received - "+ref,debit:paid,credit:0});
  }
  saveDB();
  populateAllDatalists();
  renderInvoiceList();
  renderDashboard();
});

function deleteInvoice(id){
  confirmDialog("Delete invoice?","Stock quantities will be restored.",()=>{
    const inv = DB.invoices.find(i=>i.id===id);
    if(inv){ inv.items.forEach(it=>{ if(it.productId){ const p=productById(it.productId); if(p) p.stock += it.qty; } }); }
    DB.invoices = DB.invoices.filter(i=>i.id!==id);
    saveDB(); renderInvoiceList(); renderDashboard(); toast("Invoice deleted","success");
  });
}
function printInvoiceById(id){ openInvoiceForEdit(id); setTimeout(()=>document.getElementById("invPrint").click(),50); }

document.getElementById("invPrint").addEventListener("click",()=>{
  const html = document.getElementById("invoicePrintArea").outerHTML;
  const w = window.open("","_blank");
  w.document.write("<html><head><title>"+document.getElementById("invNo").value+"</title><link rel='stylesheet' href='style.css'></head><body style='padding:24px'>"+html+"</body></html>");
  w.document.close();
  setTimeout(()=>w.print(),300);
});
document.getElementById("invPdf").addEventListener("click",()=>exportNodeToFile(document.getElementById("invoicePrintArea"), document.getElementById("invNo").value||"invoice","pdf"));
document.getElementById("invJpg").addEventListener("click",()=>exportNodeToFile(document.getElementById("invoicePrintArea"), document.getElementById("invNo").value||"invoice","jpg"));

/* ---------------------------------------------------------------------- *
 * 15. PURCHASES                                                          *
 * ---------------------------------------------------------------------- */
let purItems = [];
let purFilter = "";
function renderPurchaseList(){
  document.getElementById("purchaseListView").hidden = false;
  document.getElementById("purchaseFormView").hidden = true;
  const body = document.getElementById("purchaseTableBody");
  const list = DB.purchases.filter(p=>{
    const q = purFilter.toLowerCase();
    const supName = (supplierById(p.supplierId)||{}).name||"";
    return !q || p.purNo.toLowerCase().includes(q) || supName.toLowerCase().includes(q);
  }).sort((a,b)=>b.date.localeCompare(a.date));
  body.innerHTML = list.map(p=>
    "<tr><td>"+fmtDate(p.date)+"</td><td><strong>"+p.purNo+"</strong></td><td>"+escapeHtml((supplierById(p.supplierId)||{}).name||"—")+
    "</td><td>"+money(p.total)+"</td><td>"+money(p.paid)+"</td><td>"+money(p.balance)+"</td><td>"+paymentStatusBadge(p.status)+
    '</td><td><div class="row-actions"><button title="Delete" class="danger" onclick="deletePurchase(\''+p.id+"')\"><i data-ic=\"trash\"></i></button></div></td></tr>"
  ).join("") || '<tr class="empty-row"><td colspan="8">No purchases yet.</td></tr>';
  renderIcons(body);
}
document.getElementById("purchaseSearch").addEventListener("input",e=>{ purFilter=e.target.value; renderPurchaseList(); });
document.getElementById("btnNewPurchase").addEventListener("click",()=>{
  purItems = [];
  document.getElementById("purNo").value = nextDocNoPreview("pur");
  document.getElementById("purDate").value = todayISO();
  document.getElementById("purSupplier").value = "";
  document.getElementById("purPaid").value = 0;
  renderPurItems();
  document.getElementById("purchaseListView").hidden = true;
  document.getElementById("purchaseFormView").hidden = false;
});
document.getElementById("purCancel").addEventListener("click",renderPurchaseList);
function renderPurItems(){
  const body = document.getElementById("purItemsBody");
  body.innerHTML = purItems.map((it,idx)=>
    "<tr><td>"+escapeHtml(it.name)+"</td><td>"+it.qty+"</td><td>"+money(it.price)+"</td><td>"+money(it.total)+
    '</td><td><button class="row-actions" style="border:none" onclick="purRemoveItem('+idx+')"><i data-ic="x"></i></button></td></tr>'
  ).join("") || '<tr class="empty-row"><td colspan="5">No items added yet.</td></tr>';
  renderIcons(body);
  updatePurTotals();
}
function purRemoveItem(idx){ purItems.splice(idx,1); renderPurItems(); }
document.getElementById("purAddItem").addEventListener("click",()=>{
  const name = document.getElementById("purItemName").value.trim();
  const qty = parseFloat(document.getElementById("purItemQty").value)||0;
  let price = parseFloat(document.getElementById("purItemPrice").value);
  const product = DB.products.find(p=>p.name===name || (p.name+" ("+p.code+")")===name);
  if(!name||qty<=0){ toast("Enter item name and quantity","error"); return; }
  if(isNaN(price)) price = product?product.purchasePrice:0;
  purItems.push({productId:product?product.id:null,name:product?product.name:name,qty,price,total:qty*price});
  ["purItemName","purItemQty","purItemPrice"].forEach(id=>document.getElementById(id).value="");
  document.getElementById("purItemQty").value=1;
  renderPurItems();
});
function updatePurTotals(){
  const total = purItems.reduce((a,i)=>a+i.total,0);
  const paid = parseFloat(document.getElementById("purPaid").value)||0;
  document.getElementById("purTotal").textContent = money(total);
  document.getElementById("purBalance").textContent = money(total-paid);
}
document.getElementById("purPaid").addEventListener("input",updatePurTotals);
document.getElementById("purSave").addEventListener("click",()=>{
  const supName = document.getElementById("purSupplier").value.trim();
  if(!supName){ toast("Enter a supplier name","error"); return; }
  if(!purItems.length){ toast("Add at least one item","error"); return; }
  let supplier = DB.suppliers.find(s=>s.name.toLowerCase()===supName.toLowerCase());
  if(!supplier){ supplier = {id:uid("sup"),name:supName,phone:"",email:"",address:"",openingBalance:0,createdAt:todayISO()}; DB.suppliers.push(supplier); }
  purItems.forEach(it=>{
    if(!it.productId){
      const newProd = {id:uid("prd"),name:it.name,code:("NEW-"+Math.floor(Math.random()*9000+1000)),category:"",unit:"pcs",
        purchasePrice:it.price,sellingPrice:Math.round(it.price*1.3),stock:0,minStock:5,supplierId:supplier.id,image:"",createdAt:todayISO()};
      DB.products.push(newProd); it.productId = newProd.id;
    }
  });
  const total = purItems.reduce((a,i)=>a+i.total,0);
  const paid = parseFloat(document.getElementById("purPaid").value)||0;
  const balance = total-paid;
  const date = document.getElementById("purDate").value || todayISO();
  const purNo = nextDocNo("pur");
  const pur = {id:uid("pur"),purNo,date,supplierId:supplier.id,items:purItems.slice(),total,paid,balance,
    status: balance<=0?"Paid":(paid>0?"Partial":"Unpaid")};
  DB.purchases.push(pur);
  purItems.forEach(it=>{
    const p = productById(it.productId); p.stock += it.qty;
    DB.stockMovements.push({id:uid("sm"),date,productId:p.id,type:"in",qty:it.qty,note:"Purchase "+purNo});
  });
  if(paid>0) DB.ledger.push({id:uid("lg"),date,account:"Bank",ref:purNo,description:"Payment made - "+purNo,debit:0,credit:paid});
  saveDB();
  toast("Purchase "+purNo+" saved and stock updated","success");
  populateAllDatalists();
  renderPurchaseList(); renderDashboard();
});
function deletePurchase(id){
  confirmDialog("Delete purchase?","Stock added by this purchase will be reversed.",()=>{
    const pur = DB.purchases.find(p=>p.id===id);
    if(pur){ pur.items.forEach(it=>{ const p=productById(it.productId); if(p) p.stock -= it.qty; }); }
    DB.purchases = DB.purchases.filter(p=>p.id!==id);
    saveDB(); renderPurchaseList(); renderDashboard(); toast("Purchase deleted","success");
  });
}

/* ---------------------------------------------------------------------- *
 * 16. PAYMENT RECEIPTS                                                   *
 * ---------------------------------------------------------------------- */
function renderReceiptsPage(){
  document.getElementById("recNo").value = nextDocNoPreview("rcpt");
  document.getElementById("recDate").value = todayISO();
  renderReceiptTable();
}
function renderReceiptTable(){
  const body = document.getElementById("receiptTableBody");
  const list = DB.receipts.slice().sort((a,b)=>b.date.localeCompare(a.date));
  body.innerHTML = list.map(r=>{
    const party = r.partyType==="customer"?(customerById(r.partyId)||{}).name:(supplierById(r.partyId)||{}).name;
    return "<tr><td>"+fmtDate(r.date)+"</td><td><strong>"+r.recNo+"</strong></td><td>"+escapeHtml(party||"—")+
    "</td><td>"+(r.type==="in"?'<span class="badge badge-green">Receive</span>':'<span class="badge badge-amber">Pay</span>')+
    "</td><td>"+money(r.amount)+"</td><td>"+escapeHtml(r.method)+
    '</td><td><div class="row-actions"><button title="Print" onclick="printReceiptById(\''+r.id+"')\"><i data-ic=\"printer\"></i></button></div></td></tr>";
  }).join("") || '<tr class="empty-row"><td colspan="7">No receipts recorded yet.</td></tr>';
  renderIcons(body);
}
document.getElementById("recSave").addEventListener("click",()=>{
  const partyName = document.getElementById("recParty").value.trim();
  const amount = parseFloat(document.getElementById("recAmount").value)||0;
  const type = document.getElementById("recType").value;
  const method = document.getElementById("recMethod").value;
  const date = document.getElementById("recDate").value || todayISO();
  if(!partyName || amount<=0){ toast("Enter party name and amount","error"); return; }
  let partyType, partyId;
  if(type==="in"){
    let cust = DB.customers.find(c=>c.name.toLowerCase()===partyName.toLowerCase());
    if(!cust){ cust = {id:uid("cus"),name:partyName,phone:"",email:"",address:"",openingBalance:0,createdAt:todayISO()}; DB.customers.push(cust); }
    partyType="customer"; partyId=cust.id;
    applyPaymentToOpenDocs(DB.invoices.filter(i=>i.customerId===cust.id), amount);
  } else {
    let sup = DB.suppliers.find(s=>s.name.toLowerCase()===partyName.toLowerCase());
    if(!sup){ sup = {id:uid("sup"),name:partyName,phone:"",email:"",address:"",openingBalance:0,createdAt:todayISO()}; DB.suppliers.push(sup); }
    partyType="supplier"; partyId=sup.id;
    applyPaymentToOpenDocs(DB.purchases.filter(p=>p.supplierId===sup.id), amount);
  }
  const recNo = nextDocNo("rcpt");
  const rec = {id:uid("rec"),recNo,date,type,partyType,partyId,amount,method,ref:document.getElementById("recRef").value.trim(),notes:document.getElementById("recNotes").value.trim()};
  DB.receipts.push(rec);
  DB.ledger.push({id:uid("lg"),date,account:method==="Cash"?"Cash":"Bank",ref:recNo,
    description:(type==="in"?"Receipt from ":"Payment to ")+partyName+" - "+recNo, debit:type==="in"?amount:0, credit:type==="out"?amount:0});
  saveDB();
  toast("Receipt "+recNo+" saved","success");
  window._lastReceipt = rec;
  populateAllDatalists();
  renderReceiptsPage(); renderDashboard();
  document.getElementById("recParty").value=""; document.getElementById("recAmount").value=""; document.getElementById("recRef").value=""; document.getElementById("recNotes").value="";
});
function applyPaymentToOpenDocs(docs, amount){
  let remaining = amount;
  docs.filter(d=>d.balance>0).sort((a,b)=>a.date.localeCompare(b.date)).forEach(d=>{
    if(remaining<=0) return;
    const pay = Math.min(remaining, d.balance);
    d.paid += pay; d.balance -= pay; d.status = d.balance<=0?"Paid":"Partial";
    remaining -= pay;
  });
}
function printReceiptById(id){
  const r = DB.receipts.find(x=>x.id===id); if(!r) return;
  const party = r.partyType==="customer"?(customerById(r.partyId)||{}).name:(supplierById(r.partyId)||{}).name;
  const html = '<div style="font-family:Inter,sans-serif;padding:20px;max-width:420px">'+logoImgHtml(120)+
    "<h2 style='margin:0 0 2px'>"+escapeHtml(DB.settings.companyName)+"</h2>"+
    "<p class='muted'>"+escapeHtml(DB.settings.address)+" · "+escapeHtml(DB.settings.phone)+"</p>"+
    "<h3 style='margin-top:16px'>Payment Receipt</h3>"+
    "<p><strong>Receipt No:</strong> "+r.recNo+"<br><strong>Date:</strong> "+fmtDate(r.date)+"</p>"+
    "<p><strong>"+(r.type==="in"?"Received From":"Paid To")+":</strong> "+escapeHtml(party||"—")+"</p>"+
    "<p><strong>Amount:</strong> "+money(r.amount)+"<br><strong>Method:</strong> "+escapeHtml(r.method)+"</p>"+
    (r.ref?"<p><strong>Reference:</strong> "+escapeHtml(r.ref)+"</p>":"")+
    (r.notes?"<p><strong>Notes:</strong> "+escapeHtml(r.notes)+"</p>":"")+"</div>";
  const w = window.open("","_blank");
  w.document.write("<html><head><title>"+r.recNo+"</title></head><body onload='window.print()'>"+html+"</body></html>");
  w.document.close();
}
document.getElementById("recPrint").addEventListener("click",()=>{
  if(window._lastReceipt) printReceiptById(window._lastReceipt.id);
  else toast("Save the receipt first","error");
});
document.getElementById("recPdf").addEventListener("click",()=>exportNodeToFile(document.getElementById("receiptPrintArea"), document.getElementById("recNo").value||"receipt","pdf"));
document.getElementById("recJpg").addEventListener("click",()=>exportNodeToFile(document.getElementById("receiptPrintArea"), document.getElementById("recNo").value||"receipt","jpg"));

/* ---------------------------------------------------------------------- *
 * 17. CASH BOOK                                                          *
 * ---------------------------------------------------------------------- */
let cashBookRange = "today";
document.querySelectorAll("#cashBookFilters .chip").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll("#cashBookFilters .chip").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    cashBookRange = btn.dataset.range;
    renderCashBook();
  });
});
document.getElementById("cashBookCustomBtn").addEventListener("click",()=>{
  cashBookRange = "custom";
  document.querySelectorAll("#cashBookFilters .chip").forEach(b=>b.classList.remove("active"));
  renderCashBook();
});
function dateRangeFor(range){
  const today = todayISO();
  if(range==="today") return [today,today];
  if(range==="week"){ const d=new Date(); const day=d.getDay()||7; const monday=new Date(d); monday.setDate(d.getDate()-day+1); return [iso(monday),today]; }
  if(range==="month"){ const d=new Date(); const first=new Date(d.getFullYear(),d.getMonth(),1); return [iso(first),today]; }
  if(range==="custom"){ return [document.getElementById("cashBookFrom").value||"0000-01-01", document.getElementById("cashBookTo").value||today]; }
  return ["0000-01-01",today];
}
function renderCashBook(){
  const [from,to] = dateRangeFor(cashBookRange);
  const entries = DB.ledger.filter(l=>l.account==="Cash" && l.date>=from && l.date<=to).sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id));
  let running = ledgerBalance("Cash", isoPrev(from));
  const body = document.getElementById("cashBookBody");
  let rows = "";
  entries.forEach(e=>{
    running += (e.debit||0)-(e.credit||0);
    rows += "<tr><td>"+fmtDate(e.date)+"</td><td>"+escapeHtml(e.ref)+"</td><td>"+escapeHtml(e.description)+
      "</td><td>"+(e.debit?money(e.debit):"-")+"</td><td>"+(e.credit?money(e.credit):"-")+"</td><td><strong>"+money(running)+"</strong></td></tr>";
  });
  body.innerHTML = rows || '<tr class="empty-row"><td colspan="6">No cash movements in this range.</td></tr>';
  const totalIn = entries.reduce((a,e)=>a+(e.debit||0),0);
  const totalOut = entries.reduce((a,e)=>a+(e.credit||0),0);
  document.getElementById("cashBookSummary").innerHTML = [
    {label:"Opening Balance",value:money(ledgerBalance("Cash",isoPrev(from)))},
    {label:"Total In",value:money(totalIn)},
    {label:"Total Out",value:money(totalOut)},
    {label:"Closing Balance",value:money(running)},
  ].map(c=>'<div class="stat-card"><span class="stat-label">'+c.label+'</span><div class="stat-value">'+c.value+"</div></div>").join("");
}
function isoPrev(dateStr){
  if(dateStr==="0000-01-01") return dateStr;
  const d = new Date(dateStr+"T00:00:00"); d.setDate(d.getDate()-1); return iso(d);
}

/* ---------------------------------------------------------------------- *
 * 18. BANK & PAYMENTS                                                    *
 * ---------------------------------------------------------------------- */
function renderBankPayments(){
  const cash = totalCashBalance(), bank = totalBankBalance();
  const cashDeposits = DB.ledger.filter(l=>l.account==="Cash").reduce((a,l)=>a+(l.debit||0),0);
  const cashWithdrawals = DB.ledger.filter(l=>l.account==="Cash").reduce((a,l)=>a+(l.credit||0),0);
  const bankDeposits = DB.ledger.filter(l=>l.account==="Bank").reduce((a,l)=>a+(l.debit||0),0);
  const bankWithdrawals = DB.ledger.filter(l=>l.account==="Bank").reduce((a,l)=>a+(l.credit||0),0);
  document.getElementById("bankCards").innerHTML = [
    {label:"Cash Balance",value:money(cash)},{label:"Bank Balance",value:money(bank)},
    {label:"Cash Deposits",value:money(cashDeposits)},{label:"Cash Withdrawals",value:money(cashWithdrawals)},
    {label:"Bank Deposits",value:money(bankDeposits)},{label:"Bank Withdrawals",value:money(bankWithdrawals)},
    {label:"Total Assets",value:money(cash+bank)},{label:"Net Movement",value:money((cashDeposits+bankDeposits)-(cashWithdrawals+bankWithdrawals))},
  ].map(c=>'<div class="stat-card"><span class="stat-label">'+c.label+'</span><div class="stat-value">'+c.value+"</div></div>").join("");

  const body = document.getElementById("bankTableBody");
  const rows = DB.ledger.slice().sort((a,b)=>b.date.localeCompare(a.date)).slice(0,40);
  let running = {};
  const sorted = DB.ledger.slice().sort((a,b)=>a.date.localeCompare(b.date));
  const balances = {};
  sorted.forEach(l=>{ balances[l.id] = (running[l.account]||0)+(l.debit||0)-(l.credit||0); running[l.account]=balances[l.id]; });
  body.innerHTML = rows.map(l=>
    "<tr><td>"+fmtDate(l.date)+"</td><td><span class='badge "+(l.account==="Cash"?"badge-teal":"badge-slate")+"'>"+l.account+"</span></td><td>"+escapeHtml(l.description)+
    "</td><td>"+(l.debit?money(l.debit):"-")+"</td><td>"+(l.credit?money(l.credit):"-")+"</td><td>"+money(balances[l.id])+"</td></tr>"
  ).join("") || '<tr class="empty-row"><td colspan="6">No account movements yet.</td></tr>';
}
document.getElementById("trSubmit").addEventListener("click",()=>{
  const from = document.getElementById("trFrom").value, to = document.getElementById("trTo").value;
  const amount = parseFloat(document.getElementById("trAmount").value)||0;
  if(from===to){ toast("Choose two different accounts","error"); return; }
  if(amount<=0){ toast("Enter a transfer amount","error"); return; }
  if(from==="Cash" && amount>totalCashBalance()){ toast("Insufficient cash balance","error"); return; }
  if(from==="Bank" && amount>totalBankBalance()){ toast("Insufficient bank balance","error"); return; }
  const date = todayISO(); const ref = "TRF-"+Date.now().toString().slice(-6);
  DB.ledger.push({id:uid("lg"),date,account:from,ref,description:"Transfer to "+to,debit:0,credit:amount});
  DB.ledger.push({id:uid("lg"),date,account:to,ref,description:"Transfer from "+from,debit:amount,credit:0});
  saveDB();
  toast("Transferred "+money(amount)+" from "+from+" to "+to,"success");
  document.getElementById("trAmount").value="";
  renderBankPayments(); renderDashboard();
});

/* ---------------------------------------------------------------------- *
 * 19. DAILY EXPENSES                                                     *
 * ---------------------------------------------------------------------- */
let expenseFilter = "";
function renderExpensesPage(){
  document.getElementById("expDate").value = todayISO();
  renderExpenseTable();
}
function renderExpenseTable(){
  const body = document.getElementById("expenseTableBody");
  const list = DB.expenses.filter(e=>{
    const q = expenseFilter.toLowerCase();
    return !q || e.category.toLowerCase().includes(q) || (e.description||"").toLowerCase().includes(q);
  }).sort((a,b)=>b.date.localeCompare(a.date));
  body.innerHTML = list.map(e=>
    "<tr><td>"+fmtDate(e.date)+"</td><td><span class='badge badge-slate'>"+escapeHtml(e.category)+"</span></td><td>"+escapeHtml(e.description||"-")+
    "</td><td>"+money(e.amount)+"</td><td>"+escapeHtml(e.method)+
    '</td><td><div class="row-actions"><button title="Delete" class="danger" onclick="deleteExpense(\''+e.id+"')\"><i data-ic=\"trash\"></i></button></div></td></tr>"
  ).join("") || '<tr class="empty-row"><td colspan="6">No expenses recorded yet.</td></tr>';
  renderIcons(body);
}
document.getElementById("expenseSearch").addEventListener("input",e=>{ expenseFilter=e.target.value; renderExpenseTable(); });
document.getElementById("expSave").addEventListener("click",()=>{
  const amount = parseFloat(document.getElementById("expAmount").value)||0;
  if(amount<=0){ toast("Enter a valid amount","error"); return; }
  const date = document.getElementById("expDate").value || todayISO();
  const category = document.getElementById("expCategory").value;
  const method = document.getElementById("expMethod").value;
  const description = document.getElementById("expDescription").value.trim();
  const notes = document.getElementById("expNotes").value.trim();
  DB.expenses.push({id:uid("exp"),date,category,description,amount,method,notes});
  DB.ledger.push({id:uid("lg"),date,account:method==="Cash"?"Cash":"Bank",ref:"EXP",description:category+(description?" - "+description:""),debit:0,credit:amount});
  saveDB();
  toast("Expense added","success");
  document.getElementById("expAmount").value=""; document.getElementById("expDescription").value=""; document.getElementById("expNotes").value="";
  renderExpenseTable(); renderDashboard();
});
function deleteExpense(id){
  confirmDialog("Delete expense?","This will permanently remove the expense entry.",()=>{
    DB.expenses = DB.expenses.filter(e=>e.id!==id);
    saveDB(); renderExpenseTable(); renderDashboard(); toast("Expense deleted","success");
  });
}

/* ---------------------------------------------------------------------- *
 * 20. DAILY BUSINESS REPORT                                              *
 * ---------------------------------------------------------------------- */
function renderDailyReport(){
  if(!document.getElementById("reportDate").value) document.getElementById("reportDate").value = todayISO();
  generateDailyReport();
}
document.getElementById("reportGenerate").addEventListener("click",generateDailyReport);
function generateDailyReport(){
  const date = document.getElementById("reportDate").value || todayISO();
  document.getElementById("dailyReportDateLabel").textContent = fmtDate(date);
  const salesToday = allSales().filter(s=>s.date===date);
  const cashSalesToday = salesToday.filter(s=>s.source==="cash").reduce((a,s)=>a+s.grandTotal,0);
  const creditSalesToday = salesToday.filter(s=>s.source!=="cash").reduce((a,s)=>a+s.grandTotal,0);
  const totalSales = cashSalesToday+creditSalesToday;
  const totalPurchases = DB.purchases.filter(p=>p.date===date).reduce((a,p)=>a+p.total,0);
  const totalExpenses = DB.expenses.filter(e=>e.date===date).reduce((a,e)=>a+e.amount,0);
  const paymentsReceived = DB.receipts.filter(r=>r.date===date && r.type==="in").reduce((a,r)=>a+r.amount,0)
    + salesToday.reduce((a,s)=>a+s.paid,0);
  const paymentsMade = DB.receipts.filter(r=>r.date===date && r.type==="out").reduce((a,r)=>a+r.amount,0)
    + DB.purchases.filter(p=>p.date===date).reduce((a,p)=>a+p.paid,0);
  const cashBal = ledgerBalance("Cash",date);
  const bankBal = ledgerBalance("Bank",date);
  const netProfit = totalSales-totalPurchases-totalExpenses;
  const tiles = [
    ["Total Sales",totalSales],["Cash Sales",cashSalesToday],["Credit Sales",creditSalesToday],
    ["Total Purchases",totalPurchases],["Total Expenses",totalExpenses],["Payments Received",paymentsReceived],
    ["Payments Made",paymentsMade],["Cash Balance",cashBal],["Bank Balance",bankBal],["Net Profit",netProfit],
  ];
  document.getElementById("dailyReportGrid").innerHTML = tiles.map(([label,val])=>
    '<div class="report-tile"><span>'+label+'</span><strong>'+money(val)+"</strong></div>"
  ).join("");
}
document.getElementById("dailyReportPrint").addEventListener("click",()=>window.print());

/* ---------------------------------------------------------------------- *
 * 21. REPORTS CENTER                                                     *
 * ---------------------------------------------------------------------- */
let activeReport = "sales";
let reportSearch = "";
document.querySelectorAll("#reportTabs .tab").forEach(t=>{
  t.addEventListener("click",()=>{
    document.querySelectorAll("#reportTabs .tab").forEach(x=>x.classList.remove("active"));
    t.classList.add("active"); activeReport = t.dataset.report; renderReportsCenter();
  });
});
document.getElementById("repSearch").addEventListener("input",e=>{ reportSearch=e.target.value; renderReportsCenter(); });
document.getElementById("repApply").addEventListener("click",renderReportsCenter);

function reportRange(){
  const from = document.getElementById("repFrom").value || "0000-01-01";
  const to = document.getElementById("repTo").value || "9999-12-31";
  return [from,to];
}
function inRange(date,from,to){ return date>=from && date<=to; }

function renderReportsCenter(){
  const [from,to] = reportRange();
  const q = reportSearch.toLowerCase();
  const out = document.getElementById("reportOutput");
  let html = "";

  if(activeReport==="sales"){
    const rows = allSales().filter(s=>inRange(s.date,from,to) && (!q || s.invNo.toLowerCase().includes(q) || customerName(s).toLowerCase().includes(q)));
    html = tableHtml(["Date","Ref","Customer","Type","Total","Paid","Balance","Status"],
      rows.map(s=>[fmtDate(s.date),s.invNo,customerName(s),s.source==="cash"?"Cash":"Credit",money(s.grandTotal),money(s.paid),money(s.balance),s.status]));
    html += summaryLine("Total Sales", rows.reduce((a,s)=>a+s.grandTotal,0));
  } else if(activeReport==="purchase"){
    const rows = DB.purchases.filter(p=>inRange(p.date,from,to) && (!q || p.purNo.toLowerCase().includes(q) || ((supplierById(p.supplierId)||{}).name||"").toLowerCase().includes(q)));
    html = tableHtml(["Date","Ref","Supplier","Total","Paid","Balance","Status"],
      rows.map(p=>[fmtDate(p.date),p.purNo,(supplierById(p.supplierId)||{}).name||"—",money(p.total),money(p.paid),money(p.balance),p.status]));
    html += summaryLine("Total Purchases", rows.reduce((a,p)=>a+p.total,0));
  } else if(activeReport==="expense"){
    const rows = DB.expenses.filter(e=>inRange(e.date,from,to) && (!q || e.category.toLowerCase().includes(q) || (e.description||"").toLowerCase().includes(q)));
    html = tableHtml(["Date","Category","Description","Amount","Method"],
      rows.map(e=>[fmtDate(e.date),e.category,e.description||"-",money(e.amount),e.method]));
    html += summaryLine("Total Expenses", rows.reduce((a,e)=>a+e.amount,0));
  } else if(activeReport==="customer"){
    const rows = DB.customers.filter(c=>!q || c.name.toLowerCase().includes(q));
    html = tableHtml(["Name","Phone","Total Purchased","Outstanding Balance"],
      rows.map(c=>[c.name,c.phone||"-",money(DB.invoices.filter(i=>i.customerId===c.id).reduce((a,i)=>a+i.grandTotal,0)),money(customerOutstanding(c.id))]));
  } else if(activeReport==="supplier"){
    const rows = DB.suppliers.filter(s=>!q || s.name.toLowerCase().includes(q));
    html = tableHtml(["Name","Phone","Total Purchased From","Outstanding Payable"],
      rows.map(s=>[s.name,s.phone||"-",money(DB.purchases.filter(p=>p.supplierId===s.id).reduce((a,p)=>a+p.total,0)),money(supplierOutstanding(s.id))]));
  } else if(activeReport==="stock"){
    const rows = DB.products.filter(p=>!q || p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q));
    html = tableHtml(["Product","Code","Stock","Min Stock","Status","Stock Value"],
      rows.map(p=>[p.name,p.code,p.stock+" "+(p.unit||""),p.minStock,stockStatus(p).label,money(p.stock*p.purchasePrice)]));
  } else if(activeReport==="pnl"){
    const sales = allSales().filter(s=>inRange(s.date,from,to)).reduce((a,s)=>a+s.grandTotal,0);
    const cogs = DB.purchases.filter(p=>inRange(p.date,from,to)).reduce((a,p)=>a+p.total,0);
    const exp = DB.expenses.filter(e=>inRange(e.date,from,to)).reduce((a,e)=>a+e.amount,0);
    const rows = [["Revenue (Sales)",money(sales)],["Cost of Goods (Purchases)","("+money(cogs)+")"],["Operating Expenses","("+money(exp)+")"],["Net Profit / Loss",money(sales-cogs-exp)]];
    html = tableHtml(["Item","Amount"],rows);
  } else if(activeReport==="cashflow"){
    const rows = DB.ledger.filter(l=>inRange(l.date,from,to)).sort((a,b)=>a.date.localeCompare(b.date));
    html = tableHtml(["Date","Account","Description","In","Out"],
      rows.map(l=>[fmtDate(l.date),l.account,l.description,l.debit?money(l.debit):"-",l.credit?money(l.credit):"-"]));
  } else if(activeReport==="receivables"){
    const rows = DB.customers.map(c=>({c,bal:customerOutstanding(c.id)})).filter(x=>x.bal>0 && (!q||x.c.name.toLowerCase().includes(q)));
    html = tableHtml(["Customer","Phone","Outstanding"],rows.map(x=>[x.c.name,x.c.phone||"-",money(x.bal)]));
    html += summaryLine("Total Receivables", rows.reduce((a,x)=>a+x.bal,0));
  } else if(activeReport==="payables"){
    const rows = DB.suppliers.map(s=>({s,bal:supplierOutstanding(s.id)})).filter(x=>x.bal>0 && (!q||x.s.name.toLowerCase().includes(q)));
    html = tableHtml(["Supplier","Phone","Outstanding"],rows.map(x=>[x.s.name,x.s.phone||"-",money(x.bal)]));
    html += summaryLine("Total Payables", rows.reduce((a,x)=>a+x.bal,0));
  }
  out.innerHTML = html;
}
function tableHtml(headers, rows){
  let h = '<div class="table-wrap"><table class="data-table"><thead><tr>'+headers.map(x=>"<th>"+x+"</th>").join("")+"</tr></thead><tbody>";
  if(!rows.length) h += '<tr class="empty-row"><td colspan="'+headers.length+'">No records found for this filter.</td></tr>';
  rows.forEach(r=>{ h += "<tr>"+r.map(c=>"<td>"+c+"</td>").join("")+"</tr>"; });
  h += "</tbody></table></div>";
  return h;
}
function summaryLine(label,val){ return '<div class="report-tile" style="max-width:280px;margin-top:14px"><span>'+label+'</span><strong>'+money(val)+"</strong></div>"; }

document.getElementById("repPrint").addEventListener("click",()=>window.print());
document.getElementById("repPdf").addEventListener("click",()=>exportNodeToFile(document.getElementById("reportOutput"), activeReport+"-report","pdf"));
document.getElementById("repCsv").addEventListener("click",()=>{
  const table = document.querySelector("#reportOutput table");
  if(!table){ toast("Nothing to export","error"); return; }
  let csv = "";
  table.querySelectorAll("tr").forEach(tr=>{
    const cells = [...tr.children].map(td=>'"'+td.textContent.replace(/"/g,'""')+'"');
    csv += cells.join(",")+"\n";
  });
  downloadBlob(csv, activeReport+"-report.csv", "text/csv");
  toast("CSV exported","success");
});

/* ---------------------------------------------------------------------- *
 * 22. SETTINGS                                                           *
 * ---------------------------------------------------------------------- */
function renderSettingsPage(){
  document.getElementById("setCompanyName").value = DB.settings.companyName;
  document.getElementById("setPhone").value = DB.settings.phone;
  document.getElementById("setAddress").value = DB.settings.address;
  document.getElementById("setCurrency").value = DB.settings.currency;
  document.getElementById("accUsername").value = loadAuth().username;
}
document.getElementById("accSave").addEventListener("click",()=>{
  const newU = document.getElementById("accUsername").value.trim();
  const newP = document.getElementById("accPassword").value;
  if(!newU){ toast("Username cannot be empty","error"); return; }
  const auth = loadAuth();
  auth.username = newU;
  if(newP) auth.password = newP;
  saveAuth(auth);
  document.getElementById("accPassword").value = "";
  showApp(); // refresh the topbar name/avatar
  toast("Login details updated","success");
});
document.getElementById("setSave").addEventListener("click",()=>{
  DB.settings.companyName = document.getElementById("setCompanyName").value.trim()||"My Company";
  DB.settings.phone = document.getElementById("setPhone").value.trim();
  DB.settings.address = document.getElementById("setAddress").value.trim();
  DB.settings.currency = document.getElementById("setCurrency").value.trim()||"Rs";
  saveDB();
  toast("Settings saved","success");
  renderDashboard();
});
document.getElementById("btnExportData").addEventListener("click",()=>{
  downloadBlob(JSON.stringify(DB,null,2), "business-data-backup.json", "application/json");
  toast("Data exported","success");
});
document.getElementById("btnClearAll").addEventListener("click",()=>{
  confirmDialog("Clear all data?","This permanently deletes every record. This cannot be undone.",()=>{
    const settings = DB.settings;
    DB = {customers:[],suppliers:[],products:[],stockMovements:[],invoices:[],purchases:[],receipts:[],expenses:[],ledger:[],counters:{},settings};
    saveDB();
    toast("All data cleared","success");
    goToPage("dashboard"); populateAllDatalists();
  });
});

/* ---------------------------------------------------------------------- *
 * 23. EXPORT HELPERS (print / pdf / jpg / csv)                           *
 * ---------------------------------------------------------------------- */
function downloadBlob(content, filename, mime){
  const blob = new Blob([content],{type:mime});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),2000);
}
async function exportNodeToFile(node, filename, fmt){
  if(typeof html2canvas==="undefined"){ toast("Export library failed to load — check your internet connection","error"); return; }
  // Reports have no letterhead of their own: add a temporary one for the export.
  let tempHead = null;
  if(!node.querySelector("img.app-logo")){
    tempHead = document.createElement("div");
    tempHead.style.cssText = "display:flex;align-items:center;gap:14px;padding:0 0 12px;margin-bottom:14px;border-bottom:2px solid #1E3A8A";
    tempHead.innerHTML = '<img src="'+LOGO_SRC+'" style="width:90px;height:auto"><div><strong style="font-size:16px">'+escapeHtml(DB.settings.companyName)+'</strong><br><span style="font-size:12px;color:#555">'+escapeHtml(DB.settings.address)+" · "+escapeHtml(DB.settings.phone)+"</span></div>";
    node.insertBefore(tempHead, node.firstChild);
  }
  try{
    const canvas = await html2canvas(node,{scale:2,backgroundColor:"#ffffff"});
    if(fmt==="jpg"){
      const link = document.createElement("a");
      link.download = filename+".jpg";
      link.href = canvas.toDataURL("image/jpeg",0.95);
      link.click();
      toast("JPG downloaded","success");
    } else if(fmt==="pdf"){
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({orientation:"portrait",unit:"pt",format:"a4"});
      const imgW = pdf.internal.pageSize.getWidth()-40;
      const imgH = canvas.height*imgW/canvas.width;
      pdf.addImage(canvas.toDataURL("image/png"),"PNG",20,20,imgW,imgH);
      pdf.save(filename+".pdf");
      toast("PDF downloaded","success");
    }
  }catch(err){
    console.error(err);
    toast("Export failed — please try Print instead","error");
  } finally {
    if(tempHead) tempHead.remove();
  }
}

/* ---------------------------------------------------------------------- *
 * 24. DATALISTS (search-as-you-type helpers across the app)              *
 * ---------------------------------------------------------------------- */
function populateAllDatalists(){
  const custOptions = DB.customers.map(c=>'<option value="'+escapeHtml(c.name)+'">').join("");
  const supOptions = DB.suppliers.map(s=>'<option value="'+escapeHtml(s.name)+'">').join("");
  const prodOptions = DB.products.map(p=>'<option value="'+escapeHtml(p.name)+'">'+escapeHtml(p.code)+"</option>").join("");
  ["csCustomerList","invCustomerList"].forEach(id=>document.getElementById(id).innerHTML = custOptions);
  ["purSupplierList"].forEach(id=>document.getElementById(id).innerHTML = supOptions);
  ["csProductList","invProductList","purProductList"].forEach(id=>document.getElementById(id).innerHTML = prodOptions);
  document.getElementById("recPartyList").innerHTML = custOptions+supOptions;
}

// auto-fill unit price when a known product is typed into a search field
function bindProductAutofill(inputId, priceId, priceField){
  const input = document.getElementById(inputId);
  if(!input) return;
  input.addEventListener("change",()=>{
    const p = DB.products.find(x=>x.name===input.value);
    if(p) document.getElementById(priceId).value = p[priceField];
  });
}
bindProductAutofill("csProduct","csPrice","sellingPrice");
bindProductAutofill("invItemName","invItemPrice","sellingPrice");
bindProductAutofill("purItemName","purItemPrice","purchasePrice");

/* ---------------------------------------------------------------------- *
 * 25. GLOBAL SEARCH                                                      *
 * ---------------------------------------------------------------------- */
document.getElementById("globalSearch").addEventListener("keydown",e=>{
  if(e.key!=="Enter") return;
  const q = e.target.value.trim().toLowerCase();
  if(!q) return;
  if(DB.customers.some(c=>c.name.toLowerCase().includes(q))){ goToPage("customers"); document.getElementById("customerSearch").value=q; customerFilter=q; renderCustomers(); return; }
  if(DB.products.some(p=>p.name.toLowerCase().includes(q)||p.code.toLowerCase().includes(q))){ goToPage("products"); document.getElementById("productSearch").value=q; productFilter=q; renderProducts(); return; }
  if(DB.invoices.some(i=>i.invNo.toLowerCase().includes(q))){ goToPage("sales-invoices"); document.getElementById("invoiceSearch").value=q; invFilter=q; renderInvoiceList(); return; }
  toast("No matching records found","info");
});

/* ---------------------------------------------------------------------- *
 * 26. INIT                                                                *
 * ---------------------------------------------------------------------- */
function init(){
  loadDB();
  renderIcons(document);
  bindAuthEvents();
  populateAllDatalists();
  document.getElementById("reportDate").value = todayISO();
  document.getElementById("repFrom").value = daysAgo(30);
  document.getElementById("repTo").value = todayISO();
  goToPage("dashboard");
  if(isLoggedIn()){ showApp(); } else { showLogin(); }
}
init();
