const STORAGE_KEY = 'topwheels-demo-v1';
const money = n => 'Rs ' + Math.round(Number(n || 0)).toLocaleString('en-PK');
const num = n => Math.round(Number(n || 0)).toLocaleString('en-PK');
const today = () => new Date().toISOString().slice(0,10);
const daysAgo = n => { const d = new Date(); d.setDate(d.getDate()-n); return d.toISOString().slice(0,10); };
const prettyDate = d => d ? new Date(d+'T12:00:00').toLocaleDateString('en-PK',{day:'numeric',month:'short',year:'numeric'}) : '—';
const escapeHtml = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid = p => p+'-'+Math.random().toString(36).slice(2,8).toUpperCase();
const iconPaths = {
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  car:'<path d="M5 17h14l-1.4-6.2A2 2 0 0 0 15.6 9H8.4a2 2 0 0 0-2 1.8L5 17Z"/><path d="M3 17h18v3H3zM6 9l1-3h10l1 3M7 20v2m10-2v2M7 14h.01M17 14h.01"/>',
  purchase:'<path d="M3 7h18M6 7l1 12h10l1-12M9 11h6M12 11v5"/><path d="m8 3 4-2 4 2"/>',
  sale:'<path d="M3 4h18v16H3zM3 9h18M7 15h3M15 14h3"/>',
  users:'<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2H3ZM17 5a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v1h-3"/>',
  wallet:'<rect x="3" y="6" width="18" height="15" rx="2"/><path d="M3 9h18M6 6V3h13M17 15h2"/>',
  chart:'<path d="M3 20h18M5 16V9h3v7M11 16V5h3v11M17 16v-4h3v4"/>',
  receipt:'<path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3Z"/><path d="M8 8h8M8 12h8"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  search:'<circle cx="10.7" cy="10.7" r="6.7"/><path d="m16 16 5 5"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
  close:'<path d="M5 5l14 14M19 5 5 19"/>',
  bank:'<path d="m3 9 9-6 9 6H3ZM5 9v10m5-10v10m4-10v10m5-10v10M3 21h18"/>',
  box:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 14h8"/>',
  file:'<path d="M6 2h9l4 4v16H6zM15 2v5h4M9 12h7M9 16h7"/>',
  trend:'<path d="m3 17 6-6 4 4 8-8M15 7h6v6"/>',
  filter:'<path d="M3 5h18M6 12h12M9 19h6"/>',
  dots:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 18v3h16v-3"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1m0-14.2L17 7M7 17l-2.1 2.1"/>'
};
const ico = (name,cls='') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" aria-hidden="true">${iconPaths[name]||iconPaths.grid}</svg>`;
const navItems = [
  ['overview','Overview','grid'],['inventory','Inventory','car'],['purchases','Purchases','purchase'],['sales','Sales / POS','sale'],['people','People & leads','users'],['dues','Payables & receivables','clock'],['accounts','Cash & bank','wallet'],['expenses','Expenses','receipt'],['reports','Reports','chart']
];
const seed = () => {
  const people = [
    {id:'p1',name:'Farhan Khan',role:'Seller',phone:'0333-7128410',cnic:'17301-•••••••-3',address:'Hayatabad, Peshawar'},
    {id:'p2',name:'Ayesha Bibi',role:'Buyer',phone:'0300-9457182',cnic:'17301-•••••••-7',address:'University Town, Peshawar'},
    {id:'p3',name:'Bilal Afridi',role:'Buyer',phone:'0345-1298765',cnic:'17302-•••••••-1',address:'Saddar, Peshawar'},
    {id:'p4',name:'Haris Motors',role:'Seller',phone:'091-5824631',cnic:'',address:'Ring Road, Peshawar'},
    {id:'p5',name:'Sana Ullah',role:'Seller',phone:'0312-6557130',cnic:'17301-•••••••-5',address:'Pishtakhara, Peshawar'},
    {id:'p6',name:'Usman Shah',role:'Buyer',phone:'0301-5547921',cnic:'17301-•••••••-8',address:'Warsak Road, Peshawar'}
  ];
  const vehicles = [
    {id:'v1',make:'Toyota',model:'Corolla Altis',year:2021,color:'Pearl White',reg:'LEB-214',chassis:'JTDBR32E210081214',engine:'1ZR-2184618',mileage:38500,type:'Used',status:'Available',sellerId:'p1',purchasePrice:4200000,askingPrice:4750000,date:daysAgo(12),papers:['Registration book','Transfer letter','CNIC copy'],fileLocation:'Locker A-03',notes:'Original paint, new tyres.'},
    {id:'v2',make:'Honda',model:'Civic Oriel',year:2020,color:'Graphite Grey',reg:'AEB-914',chassis:'MRHFC1680LP101924',engine:'R18Z1-4720021',mileage:51200,type:'Used',status:'Available',sellerId:'p4',purchasePrice:4620000,askingPrice:5150000,date:daysAgo(8),papers:['Registration book','CNIC copy'],fileLocation:'Locker A-07',notes:'Transfer letter pending.'},
    {id:'v3',make:'Suzuki',model:'Alto VXR',year:2024,color:'Silver',reg:'BCN-608',chassis:'MA3EUA61S00482731',engine:'R06A-991527',mileage:9400,type:'Used',status:'Reserved',sellerId:'p5',purchasePrice:2490000,askingPrice:2750000,date:daysAgo(20),papers:['Registration book','Transfer letter','CNIC copy'],fileLocation:'Locker B-02',notes:'Token received; balance due in one week.'},
    {id:'v4',make:'Toyota',model:'Fortuner Sigma 4',year:2022,color:'Black',reg:'ICT-732',chassis:'MHFBA3FS8N2013372',engine:'1GD-1134971',mileage:28700,type:'Used',status:'Available',sellerId:'p4',purchasePrice:12500000,askingPrice:13450000,date:daysAgo(5),papers:['Registration book','Transfer letter','CNIC copy','Tax receipt'],fileLocation:'Locker C-01',notes:'Imported accessories, clean interior.'},
    {id:'v5',make:'Honda',model:'City Aspire',year:2022,color:'White',reg:'AJC-449',chassis:'MRHGM6620NP004821',engine:'L15Z1-389112',mileage:31400,type:'Used',status:'Available',sellerId:'p1',purchasePrice:3790000,askingPrice:4120000,date:daysAgo(17),papers:['Registration book','CNIC copy'],fileLocation:'Home',notes:'Front bumper retouched.'},
    {id:'v6',make:'Suzuki',model:'Swift GLX',year:2023,color:'Red',reg:'BDK-892',chassis:'MA3EWE54S00624518',engine:'K12M-880142',mileage:18200,type:'Used',status:'Sold',sellerId:'p5',purchasePrice:3420000,askingPrice:3850000,date:daysAgo(30),papers:['Registration book','Transfer letter','CNIC copy'],fileLocation:'Delivered',notes:'Delivered with two keys.'},
    {id:'v7',make:'Toyota',model:'Yaris ATIV',year:2021,color:'Super White',reg:'LEC-555',chassis:'MHFAX1BT7M7005123',engine:'2NR-071934',mileage:43300,type:'Used',status:'Sold',sellerId:'p4',purchasePrice:3500000,askingPrice:3970000,date:daysAgo(36),papers:['Registration book','Transfer letter','CNIC copy'],fileLocation:'Delivered',notes:'Sale on credit.'},
    {id:'v8',make:'Kia',model:'Sportage FWD',year:2022,color:'Blue',reg:'AFC-091',chassis:'KNAPN81BBN7761201',engine:'G4NA-641006',mileage:32900,type:'Used',status:'Available',sellerId:'p4',purchasePrice:6150000,askingPrice:6620000,date:daysAgo(3),papers:['Registration book','Transfer letter','CNIC copy'],fileLocation:'Locker C-04',notes:'Fresh stock.'}
  ];
  const purchases = vehicles.map((v,i)=>({id:'PUR-'+String(101+i),vehicleId:v.id,sellerId:v.sellerId,price:v.purchasePrice,date:v.date,dueDate:daysAgo(Math.max(0,2-i)),note:v.notes}));
  const sales = [
    {id:'SAL-201',vehicleId:'v6',buyerId:'p2',price:3820000,date:daysAgo(9),dueDate:daysAgo(9),type:'Cash',note:'Two keys and documents delivered.',delivery:'Complete'},
    {id:'SAL-202',vehicleId:'v7',buyerId:'p3',price:3890000,date:daysAgo(6),dueDate:daysAgo(-12),type:'Credit',note:'Remaining payment on agreed date.',delivery:'Complete'}
  ];
  const accounts=[{id:'a1',name:'Pocket cash',type:'Cash',number:'',opening:850000},{id:'a2',name:'Meezan Bank',type:'Bank',number:'•••• 2194',opening:32500000},{id:'a3',name:'HBL Current',type:'Bank',number:'•••• 6091',opening:6500000}];
  const payments=[
    {id:'pay1',dealType:'purchase',dealId:'PUR-101',accountId:'a2',direction:'out',amount:4200000,date:daysAgo(12),method:'Bank transfer',note:'Purchase paid'},
    {id:'pay2',dealType:'purchase',dealId:'PUR-102',accountId:'a2',direction:'out',amount:3500000,date:daysAgo(8),method:'Bank transfer',note:'Part payment'},
    {id:'pay3',dealType:'purchase',dealId:'PUR-103',accountId:'a2',direction:'out',amount:2490000,date:daysAgo(20),method:'Bank transfer',note:'Purchase paid'},
    {id:'pay4',dealType:'purchase',dealId:'PUR-104',accountId:'a2',direction:'out',amount:10000000,date:daysAgo(5),method:'Bank transfer',note:'Part payment'},
    {id:'pay5',dealType:'purchase',dealId:'PUR-105',accountId:'a3',direction:'out',amount:3790000,date:daysAgo(17),method:'Bank transfer',note:'Purchase paid'},
    {id:'pay6',dealType:'purchase',dealId:'PUR-106',accountId:'a2',direction:'out',amount:3420000,date:daysAgo(30),method:'Bank transfer',note:'Purchase paid'},
    {id:'pay7',dealType:'purchase',dealId:'PUR-107',accountId:'a3',direction:'out',amount:3000000,date:daysAgo(36),method:'Bank transfer',note:'Part payment'},
    {id:'pay8',dealType:'purchase',dealId:'PUR-108',accountId:'a2',direction:'out',amount:5000000,date:daysAgo(3),method:'Bank transfer',note:'Part payment'},
    {id:'pay9',dealType:'sale',dealId:'SAL-201',accountId:'a2',direction:'in',amount:3820000,date:daysAgo(9),method:'Bank transfer',note:'Full payment'},
    {id:'pay10',dealType:'sale',dealId:'SAL-202',accountId:'a1',direction:'in',amount:200000,date:daysAgo(6),method:'Cash',note:'Token'},
    {id:'pay11',dealType:'sale',dealId:'SAL-202',accountId:'a2',direction:'in',amount:2500000,date:daysAgo(4),method:'Bank transfer',note:'Second payment'}
  ];
  const expenses=[
    {id:'EXP-301',vehicleId:'v6',category:'Detailing',amount:35000,date:daysAgo(12),accountId:'a1',note:'Interior and polish'},
    {id:'EXP-302',vehicleId:'v7',category:'Repair',amount:62000,date:daysAgo(8),accountId:'a2',note:'Suspension work'},
    {id:'EXP-303',vehicleId:'',category:'Showroom rent',amount:180000,date:daysAgo(4),accountId:'a2',note:'Monthly rent'},
    {id:'EXP-304',vehicleId:'v2',category:'Detailing',amount:18000,date:daysAgo(2),accountId:'a1',note:'Exterior detailing'}
  ];
  expenses.forEach(e=>payments.push({id:uid('pay'),dealType:'expense',dealId:e.id,accountId:e.accountId,direction:'out',amount:e.amount,date:e.date,method:e.accountId==='a1'?'Cash':'Bank transfer',note:e.category}));
  return {people,vehicles,purchases,sales,accounts,payments,expenses,leads:[{id:'l1',name:'Hamza Ali',phone:'0300-4721189',interest:'Toyota Corolla',status:'Follow up',date:daysAgo(1)},{id:'l2',name:'Maria Khan',phone:'0334-7458710',interest:'Honda Civic',status:'New',date:today()}]};
};
let data;try{data=JSON.parse(localStorage.getItem(STORAGE_KEY))||seed()}catch{data=seed()}
const save=()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
const byId=(list,id)=>data[list].find(x=>x.id===id);
const vehicleName=v=>v?`${v.year} ${v.make} ${v.model}`:'Unknown vehicle';
const partyName=id=>byId('people',id)?.name||'Unknown person';
const dealPayments=(type,id)=>data.payments.filter(p=>p.dealType===type&&p.dealId===id);
const paid=(type,id)=>dealPayments(type,id).reduce((s,p)=>s+Number(p.amount),0);
const balance=(type,d)=>Math.max(0,Number(d.price)-paid(type,d.id));
const accountBalance=id=>{const a=byId('accounts',id);return Number(a?.opening||0)+data.payments.filter(p=>p.accountId===id).reduce((s,p)=>s+(p.direction==='in'?1:-1)*Number(p.amount),0)};
const vehicleCosts=id=>data.expenses.filter(e=>e.vehicleId===id).reduce((s,e)=>s+Number(e.amount),0);
const saleProfit=s=>{const v=byId('vehicles',s.vehicleId);return Number(s.price)-Number(v?.purchasePrice||0)-vehicleCosts(s.vehicleId)};
const total=(arr,key)=>arr.reduce((s,x)=>s+Number(typeof key==='function'?key(x):x[key]||0),0);
const statusBadge=s=>`<span class="badge ${String(s).toLowerCase().replaceAll(' ','-')}">${escapeHtml(s)}</span>`;
const pageState={page:'overview',search:'',filter:'All',period:'This month',modal:null,detail:null,tab:'All',dueTab:'Receivables',reportTab:'Performance'};
const toast=msg=>{const root=document.getElementById('toast-root');root.innerHTML=`<div class="toast">${escapeHtml(msg)}</div>`;setTimeout(()=>root.innerHTML='',3000)};
const periodMatch=d=>{if(pageState.period==='All time')return true;const date=new Date(d+'T12:00:00'),now=new Date();if(pageState.period==='Today')return d===today();if(pageState.period==='This week'){const start=new Date(now);start.setDate(now.getDate()-((now.getDay()+6)%7));start.setHours(0,0,0,0);return date>=start}return date.getMonth()===now.getMonth()&&date.getFullYear()===now.getFullYear()};
const downloadCsv=(name,rows)=>{const csv=rows.map(r=>r.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download=name+'.csv';a.click();URL.revokeObjectURL(a.href)};
const nav=()=>{document.getElementById('navigation').innerHTML=navItems.map(([id,label,icon],i)=>`${i===5?'<div class="nav-separator"></div>':''}<button class="nav-item ${pageState.page===id?'active':''}" data-page="${id}">${ico(icon)}<span>${label}</span>${id==='dues'&&data.sales.some(s=>balance('sale',s)>0)?'<span class="nav-count">'+data.sales.filter(s=>balance('sale',s)>0).length+'</span>':''}</button>`).join('');document.getElementById('breadcrumb-page').textContent=navItems.find(x=>x[0]===pageState.page)?.[1]||'Overview';document.getElementById('topbar-date').textContent=new Date().toLocaleDateString('en-PK',{weekday:'short',day:'numeric',month:'short',year:'numeric'});};
const header=(title,subtitle,actions='',eyebrow='TOP WHEELS / DEMO')=>`<div class="page-head"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${subtitle}</p></div><div class="head-actions">${actions}</div></div>`;
const btn=(label,action,primary=false,icon='plus')=>`<button class="btn ${primary?'btn-primary':''}" data-action="${action}">${ico(icon)} ${label}</button>`;
const searchBox=placeholder=>`<label class="search">${ico('search')}<input id="list-search" type="search" placeholder="${placeholder}" value="${escapeHtml(pageState.search)}" aria-label="Search records"></label>`;
const empty=(msg='No records found.')=>`<div class="empty-state">${ico('box')}<h3>${msg}</h3><p>Try another filter or add a new record.</p></div>`;
const rowTable=(heads,rows)=>`<div class="table-wrap"><table class="data-table"><thead><tr>${heads.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;

function renderOverview(){
  const sales=data.sales.filter(s=>periodMatch(s.date)),purchases=data.purchases.filter(p=>periodMatch(p.date));
  const received=total(data.payments.filter(p=>p.direction==='in'&&p.dealType==='sale'&&periodMatch(p.date)),'amount');
  const profit=total(sales,saleProfit),receivable=total(data.sales,s=>balance('sale',s)),payable=total(data.purchases,p=>balance('purchase',p));
  const available=data.vehicles.filter(v=>v.status==='Available').length;
  const recent=[...data.payments].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);
  const upcoming=data.sales.filter(s=>balance('sale',s)>0).sort((a,b)=>a.dueDate.localeCompare(b.dueDate));
  const monthly=Array.from({length:6},(_,i)=>{const date=new Date();date.setMonth(date.getMonth()-5+i);const mm=date.getMonth(),yy=date.getFullYear();const m=d=>{const x=new Date(d+'T12:00:00');return x.getMonth()===mm&&x.getFullYear()===yy};return {label:date.toLocaleString('en',{month:'short'}),sale:total(data.sales.filter(s=>m(s.date)),'price'),purchase:total(data.purchases.filter(p=>m(p.date)),'price')}});
  const max=Math.max(...monthly.flatMap(m=>[m.sale,m.purchase]),1);
  return header('Good morning, Top Wheels','Here is what is happening at your showroom today.',`<button class="btn" data-action="reset-demo">Reset demo</button>${btn('New sale','new-sale',true,'sale')}`)+
  `<div class="hero-banner"><div><div class="hero-tag">YOUR SHOWROOM AT A GLANCE</div><h2>Every car. Every deal. One clear view.</h2><p>Manage stock, people and payments from a single desk.</p></div><button class="btn btn-primary" data-page="inventory">View inventory ${ico('arrow')}</button></div>`+
  `<div class="metric-grid">
    <div class="card metric"><div class="metric-top"><span class="metric-label">AVAILABLE STOCK</span><span class="metric-icon yellow">${ico('car')}</span></div><div class="metric-value">${available} vehicles</div><div class="metric-foot">${data.vehicles.filter(v=>v.status==='Reserved').length} reserved · ${data.vehicles.length} total recorded</div></div>
    <div class="card metric"><div class="metric-top"><span class="metric-label">SALES · ${pageState.period.toUpperCase()}</span><span class="metric-icon blue">${ico('sale')}</span></div><div class="metric-value">${money(total(sales,'price'))}</div><div class="metric-foot">${sales.length} completed deals</div></div>
    <div class="card metric"><div class="metric-top"><span class="metric-label">GROSS PROFIT · ${pageState.period.toUpperCase()}</span><span class="metric-icon green">${ico('trend')}</span></div><div class="metric-value">${money(profit)}</div><div class="metric-foot">Before showroom overhead</div></div>
    <div class="card metric"><div class="metric-top"><span class="metric-label">TO COLLECT</span><span class="metric-icon red">${ico('clock')}</span></div><div class="metric-value">${money(receivable)}</div><div class="metric-foot warn"><strong>${upcoming.length} open balances</strong> · not cash received</div></div>
  </div>`+
  `<div class="grid-2 overview-grid"><div class="stack">
    <div class="card card-pad"><div class="section-head"><div><h2 class="section-title">Business activity</h2><div class="section-sub">Sale value compared with purchase value</div></div><select id="period-select" class="btn" aria-label="Dashboard period">${['Today','This week','This month','All time'].map(x=>`<option ${pageState.period===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="chart-wrap">${monthly.map(m=>`<div class="chart-column"><div class="chart-bars"><div class="chart-bar purchase" title="Purchases ${money(m.purchase)}" style="height:${Math.max(2,m.purchase/max*100)}%"></div><div class="chart-bar sales" title="Sales ${money(m.sale)}" style="height:${Math.max(2,m.sale/max*100)}%"></div></div><div class="chart-label">${m.label}</div></div>`).join('')}</div><div class="chart-legend"><span>Sales</span><span>Purchases</span></div></div>
    <div class="card card-pad"><div class="section-head"><div><h2 class="section-title">Quick actions</h2><div class="section-sub">The things you do most often</div></div></div><div class="quick-grid">${[['new-purchase','Record purchase','purchase'],['new-sale','Create sale','sale'],['new-person','Add person','users'],['new-payment','Record payment','wallet']].map(([a,l,i])=>`<button class="quick-action" data-action="${a}">${ico(i)}<span>${l}</span></button>`).join('')}</div></div>
    <div class="card table-card"><div class="section-head"><div><h2 class="section-title">Recently added stock</h2><div class="section-sub">Latest vehicles at your showroom</div></div><button class="text-link" data-page="inventory">View all →</button></div>${rowTable(['Vehicle','Registration','Asking price','Status'],[...data.vehicles].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,4).map(v=>`<tr class="clickable" data-detail="vehicle:${v.id}"><td><div class="cell-vehicle"><span class="vehicle-thumb gold">${ico('car')}</span><span class="cell-title">${escapeHtml(vehicleName(v))}<span class="cell-sub">${escapeHtml(v.color)}</span></span></div></td><td>${escapeHtml(v.reg||'Unregistered')}</td><td><strong>${money(v.askingPrice)}</strong></td><td>${statusBadge(v.status)}</td></tr>`))}</div>
  </div><div class="stack">
    <div class="card card-pad"><div class="section-head"><div><h2 class="section-title">Payments to follow up</h2><div class="section-sub">Outstanding customer balances</div></div><button class="text-link" data-page="dues">View all →</button></div><div class="due-list">${upcoming.length?upcoming.slice(0,3).map(s=>`<div class="due-item"><div><strong>${escapeHtml(partyName(s.buyerId))}</strong><small>${escapeHtml(vehicleName(byId('vehicles',s.vehicleId)))} · Due ${prettyDate(s.dueDate)}</small></div><div><div class="amount">${money(balance('sale',s))}</div><button class="text-link" data-action="pay-sale:${s.id}">Record receipt →</button></div></div>`).join(''):empty('All caught up')}</div></div>
    <div class="card card-pad"><div class="section-head"><div><h2 class="section-title">Cash flow snapshot</h2><div class="section-sub">Balances and collections</div></div></div><div class="detail-grid"><div class="detail-box"><small>Received</small><strong>${money(received)}</strong><span>${pageState.period}</span></div><div class="detail-box"><small>Payable</small><strong>${money(payable)}</strong><span>Open to sellers</span></div><div class="detail-box"><small>Accounts</small><strong>${money(total(data.accounts,a=>accountBalance(a.id)))}</strong><span>Cash + bank</span></div></div><button class="text-link mt-16" data-page="accounts">Open cash & bank →</button></div>
    <div class="card card-pad"><div class="section-head"><div><h2 class="section-title">Recent activity</h2><div class="section-sub">Latest recorded money movements</div></div><button class="text-link" data-page="accounts">View ledger →</button></div><div class="activity-list">${recent.map(p=>`<div class="activity"><span class="activity-icon">${ico(p.direction==='in'?'sale':'wallet')}</span><div class="activity-main"><strong>${escapeHtml(p.note||p.dealId)}</strong><span>${prettyDate(p.date)} · ${escapeHtml(byId('accounts',p.accountId)?.name||'Account')}</span></div><span class="activity-amount ${p.direction}">${p.direction==='in'?'+':'−'}${money(p.amount)}</span></div>`).join('')}</div></div>
  </div></div>`;
}

function renderInventory(){
  let list=[...data.vehicles].sort((a,b)=>b.date.localeCompare(a.date));
  if(pageState.filter!=='All')list=list.filter(v=>v.status===pageState.filter);
  if(pageState.search){let q=pageState.search.toLowerCase();list=list.filter(v=>[vehicleName(v),v.reg,v.chassis,v.color].join(' ').toLowerCase().includes(q))}
  const counts={All:data.vehicles.length,Available:data.vehicles.filter(v=>v.status==='Available').length,Reserved:data.vehicles.filter(v=>v.status==='Reserved').length,Sold:data.vehicles.filter(v=>v.status==='Sold').length};
  return header('Vehicle inventory','A clear view of every car and its paperwork.',`${btn('Add vehicle purchase','new-purchase',true,'plus')}`)+
  `<div class="metric-grid"><div class="card metric"><div class="metric-label">TOTAL VEHICLES</div><div class="metric-value">${data.vehicles.length}</div><div class="metric-foot">All recorded stock</div></div><div class="card metric"><div class="metric-label">AVAILABLE</div><div class="metric-value">${counts.Available}</div><div class="metric-foot">Ready for a buyer</div></div><div class="card metric"><div class="metric-label">RESERVED</div><div class="metric-value">${counts.Reserved}</div><div class="metric-foot">Pending handover</div></div><div class="card metric"><div class="metric-label">STOCK VALUE</div><div class="metric-value">${money(total(data.vehicles.filter(v=>v.status==='Available'||v.status==='Reserved'),'purchasePrice'))}</div><div class="metric-foot">At purchase cost</div></div></div>`+
  `<div class="card table-card"><div class="table-toolbar">${searchBox('Search by vehicle, registration or chassis')}<div class="filter-row">${Object.keys(counts).map(f=>`<button class="filter-pill ${pageState.filter===f?'active':''}" data-filter="${f}">${f} <span>${counts[f]}</span></button>`).join('')}</div></div>${list.length?rowTable(['Vehicle','Stock ID','Registration','Purchase cost','Asking price','Paperwork','Status',''],list.map(v=>`<tr class="clickable" data-detail="vehicle:${v.id}"><td><div class="cell-vehicle"><span class="vehicle-thumb ${v.status==='Sold'?'blue':v.status==='Reserved'?'gold':'green'}">${ico('car')}</span><span class="cell-title">${escapeHtml(vehicleName(v))}<span class="cell-sub">${escapeHtml(v.color)} · ${num(v.mileage)} km</span></span></div></td><td>${escapeHtml(v.id.toUpperCase())}</td><td>${escapeHtml(v.reg||'Unregistered')}</td><td>${money(v.purchasePrice)}</td><td><strong>${money(v.askingPrice)}</strong></td><td><span class="badge ${v.papers.length>=3?'complete':'pending'}">${v.papers.length} verified</span></td><td>${statusBadge(v.status)}</td><td><button class="table-action" data-detail="vehicle:${v.id}">View →</button></td></tr>`)):empty('No vehicles match your search')}<div class="table-footer"><span>Showing ${list.length} of ${data.vehicles.length} vehicles</span><span>Sample inventory · PKR</span></div></div>`;
}

function renderPurchases(){
  let list=[...data.purchases].sort((a,b)=>b.date.localeCompare(a.date));
  if(pageState.search)list=list.filter(p=>[p.id,vehicleName(byId('vehicles',p.vehicleId)),partyName(p.sellerId)].join(' ').toLowerCase().includes(pageState.search.toLowerCase()));
  return header('Purchases','Track vehicle acquisitions and money owed to sellers.',`${btn('New purchase','new-purchase',true,'plus')}`)+
  `<div class="metric-grid"><div class="card metric"><div class="metric-label">TOTAL PURCHASES</div><div class="metric-value">${data.purchases.length}</div><div class="metric-foot">Vehicles acquired</div></div><div class="card metric"><div class="metric-label">PURCHASE VALUE</div><div class="metric-value">${money(total(data.purchases,'price'))}</div><div class="metric-foot">Agreed amount</div></div><div class="card metric"><div class="metric-label">PAID TO SELLERS</div><div class="metric-value">${money(total(data.purchases,p=>paid('purchase',p.id)))}</div><div class="metric-foot">Cash and bank payments</div></div><div class="card metric"><div class="metric-label">OUTSTANDING</div><div class="metric-value">${money(total(data.purchases,p=>balance('purchase',p)))}</div><div class="metric-foot">Still payable</div></div></div>`+
  `<div class="card table-card"><div class="table-toolbar">${searchBox('Search purchase, vehicle or seller')}<button class="btn btn-small" data-action="export-purchases">${ico('download')} Export CSV</button></div>${list.length?rowTable(['Purchase','Vehicle','Seller','Date','Agreed price','Paid','Balance','Status',''],list.map(p=>{const v=byId('vehicles',p.vehicleId),b=balance('purchase',p);return `<tr class="clickable" data-detail="purchase:${p.id}"><td class="cell-title">${escapeHtml(p.id)}</td><td><strong>${escapeHtml(vehicleName(v))}</strong><span class="cell-sub">${escapeHtml(v?.reg||'Unregistered')}</span></td><td>${escapeHtml(partyName(p.sellerId))}</td><td>${prettyDate(p.date)}</td><td>${money(p.price)}</td><td>${money(paid('purchase',p.id))}</td><td><strong>${money(b)}</strong></td><td>${statusBadge(b?'Partial':'Paid')}</td><td><button class="table-action" data-detail="purchase:${p.id}">View →</button></td></tr>`})):empty()}<div class="table-footer">${list.length} purchases <span>Click a row for details</span></div></div>`;
}

function renderSales(){
  let list=[...data.sales].sort((a,b)=>b.date.localeCompare(a.date));
  if(pageState.search)list=list.filter(s=>[s.id,vehicleName(byId('vehicles',s.vehicleId)),partyName(s.buyerId)].join(' ').toLowerCase().includes(pageState.search.toLowerCase()));
  return header('Sales & POS','Close a deal, issue a sample receipt and follow every payment.',`${btn('New sale','new-sale',true,'plus')}`)+
  `<div class="metric-grid"><div class="card metric"><div class="metric-label">VEHICLES SOLD</div><div class="metric-value">${data.sales.length}</div><div class="metric-foot">Completed deals</div></div><div class="card metric"><div class="metric-label">SALE VALUE</div><div class="metric-value">${money(total(data.sales,'price'))}</div><div class="metric-foot">Agreed total</div></div><div class="card metric"><div class="metric-label">RECEIVED</div><div class="metric-value">${money(total(data.sales,s=>paid('sale',s.id)))}</div><div class="metric-foot">Posted receipts</div></div><div class="card metric"><div class="metric-label">TO COLLECT</div><div class="metric-value">${money(total(data.sales,s=>balance('sale',s)))}</div><div class="metric-foot">Open receivables</div></div></div>`+
  `<div class="card table-card"><div class="table-toolbar">${searchBox('Search sale, vehicle or buyer')}<button class="btn btn-small" data-action="export-sales">${ico('download')} Export CSV</button></div>${list.length?rowTable(['Sale','Vehicle','Buyer','Date','Type','Sale price','Received','Due',''],list.map(s=>{const v=byId('vehicles',s.vehicleId),b=balance('sale',s);return `<tr class="clickable" data-detail="sale:${s.id}"><td class="cell-title">${escapeHtml(s.id)}</td><td><strong>${escapeHtml(vehicleName(v))}</strong><span class="cell-sub">${escapeHtml(v?.reg||'Unregistered')}</span></td><td>${escapeHtml(partyName(s.buyerId))}</td><td>${prettyDate(s.date)}</td><td>${statusBadge(s.type)}</td><td><strong>${money(s.price)}</strong></td><td>${money(paid('sale',s.id))}</td><td class="${b?'red-text':'green-text'}"><strong>${money(b)}</strong></td><td><button class="table-action" data-detail="sale:${s.id}">View →</button></td></tr>`})):empty()}<div class="table-footer">${list.length} sales <span>Click a row for receipt and details</span></div></div>`;
}

function renderPeople(){
  let list=[...data.people];if(pageState.search)list=list.filter(p=>[p.name,p.phone,p.address,p.role].join(' ').toLowerCase().includes(pageState.search.toLowerCase()));
  const leadList=data.leads.filter(l=>!pageState.search||[l.name,l.phone,l.interest].join(' ').toLowerCase().includes(pageState.search.toLowerCase()));
  return header('People & leads','Customers, sellers and every relationship in one place.',`${btn('Add lead','new-lead',false,'plus')}${btn('Add person','new-person',true,'plus')}`)+
  `<div class="card table-card"><div class="tab-row" style="padding:0 16px;margin-bottom:0"><button class="tab ${pageState.tab==='People'?'active':''}" data-tab="People">People (${data.people.length})</button><button class="tab ${pageState.tab==='Leads'?'active':''}" data-tab="Leads">Leads (${data.leads.length})</button></div><div class="table-toolbar" style="padding-top:16px">${searchBox('Search by name, phone or address')}</div>${pageState.tab==='Leads'?(leadList.length?rowTable(['Name','Phone','Interested in','Status','Added',''],leadList.map(l=>`<tr><td class="cell-title">${escapeHtml(l.name)}</td><td>${escapeHtml(l.phone)}</td><td>${escapeHtml(l.interest)}</td><td>${statusBadge(l.status)}</td><td>${prettyDate(l.date)}</td><td><button class="table-action" data-action="lead-followup:${l.id}">Mark follow up →</button></td></tr>`)):empty('No leads found')):(list.length?rowTable(['Person','Role','Phone','Location','Bought','Sold','Balance',''],list.map(p=>{const buys=data.sales.filter(s=>s.buyerId===p.id),sells=data.purchases.filter(x=>x.sellerId===p.id),bal=total(buys,s=>balance('sale',s))-total(sells,x=>balance('purchase',x));return `<tr class="clickable" data-detail="person:${p.id}"><td class="cell-title">${escapeHtml(p.name)}<span class="cell-sub">${p.cnic?escapeHtml(p.cnic):'No CNIC on file'}</span></td><td>${escapeHtml(p.role)}</td><td>${escapeHtml(p.phone)}</td><td>${escapeHtml(p.address)}</td><td>${buys.length}</td><td>${sells.length}</td><td class="${bal>0?'green-text':bal<0?'red-text':''}"><strong>${bal===0?'—':money(Math.abs(bal))}</strong></td><td><button class="table-action" data-detail="person:${p.id}">View →</button></td></tr>`})):empty('No people found'))}<div class="table-footer">Use a person in purchases and sales without entering them twice.</div></div>`;
}

function renderDues(){
  const rec=data.sales.filter(s=>balance('sale',s)>0),pay=data.purchases.filter(p=>balance('purchase',p)>0),items=pageState.dueTab==='Receivables'?rec:pay;
  return header('Payables & receivables','Know who owes you and what you still owe.',btn('Record payment','new-payment',true,'plus'))+
  `<div class="metric-grid"><div class="card metric"><div class="metric-label">TO COLLECT</div><div class="metric-value green-text">${money(total(rec,s=>balance('sale',s)))}</div><div class="metric-foot">Across ${rec.length} sale deals</div></div><div class="card metric"><div class="metric-label">TO PAY</div><div class="metric-value red-text">${money(total(pay,p=>balance('purchase',p)))}</div><div class="metric-foot">Across ${pay.length} purchases</div></div><div class="card metric"><div class="metric-label">OVERDUE RECEIPTS</div><div class="metric-value">${rec.filter(s=>s.dueDate<today()).length}</div><div class="metric-foot">Need follow up</div></div><div class="card metric"><div class="metric-label">NET OPEN BALANCE</div><div class="metric-value">${money(total(rec,s=>balance('sale',s))-total(pay,p=>balance('purchase',p)))}</div><div class="metric-foot">Receivable minus payable</div></div></div>`+
  `<div class="card table-card"><div class="tab-row" style="padding:0 16px;margin-bottom:0"><button class="tab ${pageState.dueTab==='Receivables'?'active':''}" data-due-tab="Receivables">Receivables (${rec.length})</button><button class="tab ${pageState.dueTab==='Payables'?'active':''}" data-due-tab="Payables">Payables (${pay.length})</button></div><div class="table-toolbar" style="padding-top:16px">${searchBox('Search by person or vehicle')}</div>${items.length?rowTable(['Person','Vehicle','Deal','Due date','Total','Paid','Remaining','', ''],items.filter(d=>!pageState.search||[pageState.dueTab==='Receivables'?partyName(d.buyerId):partyName(d.sellerId),vehicleName(byId('vehicles',d.vehicleId))].join(' ').toLowerCase().includes(pageState.search.toLowerCase())).map(d=>{const type=pageState.dueTab==='Receivables'?'sale':'purchase';return `<tr><td class="cell-title">${escapeHtml(partyName(type==='sale'?d.buyerId:d.sellerId))}</td><td>${escapeHtml(vehicleName(byId('vehicles',d.vehicleId)))}</td><td>${escapeHtml(d.id)}</td><td>${prettyDate(d.dueDate)}</td><td>${money(d.price)}</td><td>${money(paid(type,d.id))}</td><td><strong>${money(balance(type,d))}</strong></td><td>${statusBadge(d.dueDate<today()?'Overdue':'Pending')}</td><td><button class="table-action" data-action="pay-${type}:${d.id}">Record ${type==='sale'?'receipt':'payment'} →</button></td></tr>`})):empty('No open balances')}<div class="table-footer">Balances come from each deal and its posted payments.</div></div>`;
}

function renderAccounts(){
  const entries=[...data.payments].sort((a,b)=>b.date.localeCompare(a.date));
  return header('Cash & bank','Every balance has a matching transaction.',`${btn('Transfer','transfer',false,'arrow')}${btn('Add account','new-account',true,'plus')}`)+
  `<div class="account-grid">${data.accounts.map((a,i)=>`<div class="account-card ${i===0?'featured':''}"><div class="account-top"><span>${escapeHtml(a.type.toUpperCase())}</span><span class="account-icon">${ico(a.type==='Cash'?'wallet':'bank')}</span></div><h3>${money(accountBalance(a.id))}</h3><small>${escapeHtml(a.name)} ${a.number?'· '+escapeHtml(a.number):''}</small></div>`).join('')}</div>`+
  `<div class="card table-card"><div class="section-head"><div><h2 class="section-title">Transaction history</h2><div class="section-sub">Cash, bank, sale, purchase, expense and transfers</div></div></div><div class="table-toolbar">${searchBox('Search by note, deal or account')}<button class="btn btn-small" data-action="export-ledger">${ico('download')} Export CSV</button></div>${rowTable(['Date','Description','Reference','Account','Method','Money in','Money out'],entries.filter(p=>!pageState.search||[p.note,p.dealId,byId('accounts',p.accountId)?.name].join(' ').toLowerCase().includes(pageState.search.toLowerCase())).map(p=>`<tr><td>${prettyDate(p.date)}</td><td class="cell-title">${escapeHtml(p.note||p.dealType)}</td><td>${escapeHtml(p.dealId)}</td><td>${escapeHtml(byId('accounts',p.accountId)?.name||'—')}</td><td>${escapeHtml(p.method)}</td><td class="green-text"><strong>${p.direction==='in'?money(p.amount):'—'}</strong></td><td class="red-text"><strong>${p.direction==='out'?money(p.amount):'—'}</strong></td></tr>`))}<div class="table-footer">${entries.length} posted entries <span>Opening balances are demo values</span></div></div>`;
}

function renderExpenses(){
  let list=[...data.expenses].sort((a,b)=>b.date.localeCompare(a.date));if(pageState.search)list=list.filter(e=>[e.category,e.note,vehicleName(byId('vehicles',e.vehicleId))].join(' ').toLowerCase().includes(pageState.search.toLowerCase()));
  return header('Expenses','Track operating costs and vehicle preparation.',btn('Add expense','new-expense',true,'plus'))+
  `<div class="metric-grid"><div class="card metric"><div class="metric-label">TOTAL EXPENSES</div><div class="metric-value">${money(total(data.expenses,'amount'))}</div><div class="metric-foot">All recorded expenses</div></div><div class="card metric"><div class="metric-label">VEHICLE COSTS</div><div class="metric-value">${money(total(data.expenses.filter(e=>e.vehicleId),'amount'))}</div><div class="metric-foot">Included in unit gross profit</div></div><div class="card metric"><div class="metric-label">SHOWROOM OVERHEAD</div><div class="metric-value">${money(total(data.expenses.filter(e=>!e.vehicleId),'amount'))}</div><div class="metric-foot">Separate from unit profit</div></div><div class="card metric"><div class="metric-label">THIS MONTH</div><div class="metric-value">${money(total(data.expenses.filter(e=>{let x=new Date(e.date+'T12:00:00'),n=new Date();return x.getMonth()===n.getMonth()&&x.getFullYear()===n.getFullYear()}),'amount'))}</div><div class="metric-foot">Posted this month</div></div></div>`+
  `<div class="card table-card"><div class="table-toolbar">${searchBox('Search expenses')}<button class="btn btn-small" data-action="export-expenses">${ico('download')} Export CSV</button></div>${list.length?rowTable(['Expense','Date','Category','Vehicle / area','Paid from','Amount','Note'],list.map(e=>`<tr><td class="cell-title">${escapeHtml(e.id)}</td><td>${prettyDate(e.date)}</td><td>${escapeHtml(e.category)}</td><td>${e.vehicleId?escapeHtml(vehicleName(byId('vehicles',e.vehicleId))):'Showroom overhead'}</td><td>${escapeHtml(byId('accounts',e.accountId)?.name||'—')}</td><td><strong>${money(e.amount)}</strong></td><td>${escapeHtml(e.note||'—')}</td></tr>`)):empty()}<div class="table-footer">Vehicle-linked expenses affect per-car gross profit.</div></div>`;
}

function renderReports(){
  const gross=total(data.sales,saleProfit),overhead=total(data.expenses.filter(e=>!e.vehicleId),'amount'),saleValue=total(data.sales,'price'),purchaseValue=total(data.purchases,'price');
  const sold=data.sales.map(s=>({s,v:byId('vehicles',s.vehicleId),profit:saleProfit(s)}));
  const cats=[...new Set(data.expenses.map(e=>e.category))].map(c=>({name:c,value:total(data.expenses.filter(e=>e.category===c),'amount')}));const max=Math.max(...cats.map(c=>c.value),1);
  return header('Reports','Understand margins, collections and stock health.',`<button class="btn" data-action="export-reports">${ico('download')} Export summary</button>`)+
  `<div class="notice"><strong>Demo reporting:</strong> Gross profit is sale price less vehicle purchase cost and linked expenses. The estimated net figure below also subtracts recorded showroom overhead. Tax and other accounting adjustments are not included.</div>`+
  `<div class="report-grid"><div class="card report-card"><small>Total sale value</small><strong>${money(saleValue)}</strong><em>${data.sales.length} sales recorded</em></div><div class="card report-card"><small>Gross profit on sold cars</small><strong class="green-text">${money(gross)}</strong><em>${saleValue?((gross/saleValue)*100).toFixed(1):0}% margin on sales</em></div><div class="card report-card"><small>Estimated profit after overhead</small><strong>${money(gross-overhead)}</strong><em>Based on recorded items only</em></div></div>`+
  `<div class="grid-2"><div class="stack"><div class="card table-card"><div class="section-head"><div><h2 class="section-title">Profit by vehicle</h2><div class="section-sub">A transparent view of each completed deal</div></div></div>${rowTable(['Vehicle','Sale price','Purchase','Vehicle costs','Gross profit'],sold.map(({s,v,profit})=>`<tr class="clickable" data-detail="sale:${s.id}"><td class="cell-title">${escapeHtml(vehicleName(v))}</td><td>${money(s.price)}</td><td>${money(v?.purchasePrice)}</td><td>${money(vehicleCosts(v?.id))}</td><td class="green-text"><strong>${money(profit)}</strong></td></tr>`))}</div><div class="card card-pad"><div class="section-head"><div><h2 class="section-title">Expense categories</h2><div class="section-sub">Where the money went</div></div></div><div class="breakdown">${cats.map(c=>`<div class="breakdown-row"><span class="label">${escapeHtml(c.name)}</span><span class="bar"><i style="width:${c.value/max*100}%"></i></span><b>${money(c.value)}</b></div>`).join('')}</div></div></div>
  <div class="stack"><div class="card card-pad"><div class="section-head"><div><h2 class="section-title">Collections</h2><div class="section-sub">Sale receipts against agreed sale value</div></div></div><h2 style="font:800 25px Manrope;margin:0 0 9px">${saleValue?Math.round(total(data.sales,s=>paid('sale',s.id))/saleValue*100):0}% <span style="font-size:11px;color:#98a2ad">collected</span></h2><div class="progress-line"><span style="width:${saleValue?Math.min(100,total(data.sales,s=>paid('sale',s.id))/saleValue*100):0}%"></span></div><div class="detail-grid mt-16"><div class="detail-box"><small>Billed</small><strong>${money(saleValue)}</strong></div><div class="detail-box"><small>Received</small><strong>${money(total(data.sales,s=>paid('sale',s.id)))}</strong></div><div class="detail-box"><small>Remaining</small><strong>${money(total(data.sales,s=>balance('sale',s)))}</strong></div></div></div><div class="card card-pad"><div class="section-head"><div><h2 class="section-title">Inventory snapshot</h2><div class="section-sub">What is still on the floor</div></div></div><div class="detail-grid"><div class="detail-box"><small>Available</small><strong>${data.vehicles.filter(v=>v.status==='Available').length}</strong></div><div class="detail-box"><small>Reserved</small><strong>${data.vehicles.filter(v=>v.status==='Reserved').length}</strong></div><div class="detail-box"><small>At cost</small><strong>${money(total(data.vehicles.filter(v=>v.status!=='Sold'),'purchasePrice'))}</strong></div></div><div class="summary-total"><span>All-time purchase commitments</span><strong>${money(purchaseValue)}</strong></div></div></div></div>`;
}

function render(){
  nav();
  const views={overview:renderOverview,inventory:renderInventory,purchases:renderPurchases,sales:renderSales,people:renderPeople,dues:renderDues,accounts:renderAccounts,expenses:renderExpenses,reports:renderReports};
  document.getElementById('app').innerHTML=(views[pageState.page]||renderOverview)();
  renderOverlay();
}

const options=(list,value,label,placeholder='Select')=>`<option value="">${placeholder}</option>${list.map(x=>`<option value="${escapeHtml(x[value])}">${escapeHtml(typeof label==='function'?label(x):x[label])}</option>`).join('')}`;
const field=(label,name,type='text',required=false,value='',extra='')=>`<div class="field"><label for="f-${name}">${label}${required?' <span class="required">*</span>':''}</label><input id="f-${name}" name="${name}" type="${type}" value="${escapeHtml(value)}" ${required?'required':''} ${extra}></div>`;
const selectField=(label,name,html,required=false)=>`<div class="field"><label for="f-${name}">${label}${required?' <span class="required">*</span>':''}</label><select id="f-${name}" name="${name}" ${required?'required':''}>${html}</select></div>`;
const textArea=(label,name,value='')=>`<div class="field full"><label for="f-${name}">${label}</label><textarea id="f-${name}" name="${name}">${escapeHtml(value)}</textarea></div>`;
const modalWrap=(title,subtitle,body,form,large=false,button='Save record')=>`<div class="modal-backdrop" data-action="close-overlay"><div class="modal ${large?'large':''}" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}"><div class="modal-head"><div><h2>${title}</h2><p>${subtitle}</p></div><button class="icon-button" type="button" data-action="close-overlay" aria-label="Close">${ico('close')}</button></div><form id="${form}" class="modal-body">${body}<div class="form-footer"><span class="form-note">Demo data stays in this browser.</span><div class="right"><button class="btn" type="button" data-action="close-overlay">Cancel</button><button class="btn btn-primary" type="submit">${button}</button></div></div></form></div></div>`;

function purchaseForm(){
 const body=`<div class="form-section"><h3>Vehicle information</h3><div class="form-grid">
 ${selectField('Vehicle type','type',['Used','New','Booking'].map(x=>`<option>${x}</option>`).join(''),true)}
 ${field('Purchase date','date','date',true,today())}
 ${field('Make','make','text',true,'','placeholder="e.g. Toyota"')}${field('Model','model','text',true,'','placeholder="e.g. Corolla Altis"')}
 ${field('Year','year','number',true,'','min="1980" max="2035"')}${field('Color','color','text',true)}
 ${field('Registration number','reg','text',false,'','placeholder="If registered"')}${field('File / PBO number','file','text')}
 ${field('Chassis / VIN','chassis','text',true)}${field('Engine number','engine','text')}
 ${field('Mileage (km)','mileage','number',false,'0','min="0"')}${field('Asking price (PKR)','askingPrice','number',true,'','min="1"')}
 </div></div><div class="form-section"><h3>Source & purchase terms</h3><div class="form-grid">
 ${selectField('Seller','sellerId',options(data.people,'id','name','Select seller'),true)}
 <div class="field"><label>&nbsp;</label><button class="btn" type="button" data-action="new-person">${ico('plus')} Add person</button></div>
 ${field('Purchase price (PKR)','price','number',true,'','min="1"')}${field('Paid now (PKR)','initialPaid','number',false,'0','min="0"')}
 ${selectField('Paid from','accountId',options(data.accounts,'id','name','Select account'))}${field('Balance due date','dueDate','date',false,today())}
 </div></div><div class="form-section"><h3>Documents & custody</h3><div class="form-grid">${field('Where are the papers?','fileLocation','text',false,'Locker')}
 <div class="field"><label>Verified papers</label><div class="inline-actions">${['Registration book','Transfer letter','CNIC copy','Tax receipt','Sale invoice'].map(x=>`<label style="font-size:10px;color:#677481"><input type="checkbox" name="papers" value="${x}"> ${x}</label>`).join('')}</div></div>${textArea('Notes','notes')}</div></div>`;
 return modalWrap('Record a purchase','Add a car to stock and capture its acquisition.',body,'purchase-form',true,'Create purchase');
}

function saleForm(){
 const available=data.vehicles.filter(v=>v.status==='Available'||v.status==='Reserved');
 const body=`<div class="notice"><strong>Sample deal:</strong> Completing a sale changes the car to Sold. You can record a deposit now and collect the remaining balance later.</div>
 <div class="form-section"><h3>Car & buyer</h3><div class="form-grid">
 ${selectField('Vehicle','vehicleId',options(available,'id',v=>`${vehicleName(v)} · ${v.reg||v.id}`,'Select available vehicle'),true)}
 ${selectField('Buyer','buyerId',options(data.people,'id','name','Select buyer'),true)}
 ${field('Sale date','date','date',true,today())}${selectField('Sale type','type',['Cash','Credit','Trade-in'].map(x=>`<option>${x}</option>`).join(''),true)}
 </div></div><div class="form-section"><h3>Price & payment</h3><div class="form-grid">
 ${field('Agreed sale price (PKR)','price','number',true,'','min="1"')}${field('Received now (PKR)','initialPaid','number',false,'0','min="0"')}
 ${selectField('Received into','accountId',options(data.accounts,'id','name','Select account'))}${field('Remaining due date','dueDate','date',false,today())}
 </div></div><div class="form-section" id="trade-section" hidden><h3>Trade-in vehicle</h3><p>The incoming car becomes a separate stock item at its agreed valuation.</p><div class="form-grid">${field('Trade-in allowance (PKR)','tradeValue','number',false,'0','min="0"')}${field('Trade-in make','tradeMake','text')}${field('Trade-in model','tradeModel','text')}${field('Trade-in year','tradeYear','number',false,'','min="1980" max="2035"')}${field('Trade-in registration','tradeReg','text')}${field('Trade-in chassis','tradeChassis','text')}</div></div>
 <div class="form-section"><h3>Handover</h3><div class="form-grid">${selectField('Delivery status','delivery',['Pending','Complete'].map(x=>`<option>${x}</option>`).join(''))}${textArea('Deal notes','notes')}</div></div>`;
 return modalWrap('Create a sale','Select a car, record terms and create a demo receipt.',body,'sale-form',true,'Complete sale');
}

function paymentForm(context){
 const [type,id]=(context||'').split(':');
 const ds=type==='purchase'?data.purchases.filter(d=>balance('purchase',d)>0):type==='sale'?data.sales.filter(d=>balance('sale',d)>0):[...data.sales.filter(d=>balance('sale',d)>0),...data.purchases.filter(d=>balance('purchase',d)>0)];
 const body=`<div class="form-grid">${selectField('Deal','deal',`<option value="">Select open deal</option>${ds.map(d=>{const t=d.id.startsWith('SAL')?'sale':'purchase';return `<option value="${t}:${d.id}" ${id===d.id?'selected':''}>${d.id} · ${escapeHtml(vehicleName(byId('vehicles',d.vehicleId)))} · ${money(balance(t,d))} remaining</option>`}).join('')}`,true)}
 ${field('Date','date','date',true,today())}${field('Amount (PKR)','amount','number',true,'','min="1"')}${selectField('Account','accountId',options(data.accounts,'id','name','Select account'),true)}
 ${selectField('Method','method',['Cash','Bank transfer','Cheque','Other'].map(x=>`<option>${x}</option>`).join(''))}${field('Reference / note','note','text')}
 </div><div class="notice mt-16">Receipts increase the selected account. Purchase payments reduce it. The open deal balance updates immediately.</div>`;
 return modalWrap('Record a payment','Apply a receipt or supplier payment to an open deal.',body,'payment-form',false,'Post payment');
}
function personForm(){return modalWrap('Add a person','Use one record as buyer, seller or witness.',`<div class="form-grid">${field('Full name','name','text',true)}${selectField('Primary role','role',['Buyer','Seller','Buyer & seller','Witness','Investor','Other'].map(x=>`<option>${x}</option>`).join(''))}${field('Phone','phone','tel',true)}${field('CNIC (optional)','cnic','text',false,'','placeholder="00000-0000000-0"')}${field('Address','address','text')}${textArea('Notes','notes')}</div>`,'person-form',false,'Add person')}
function leadForm(){return modalWrap('Add a lead','Keep track of a buyer inquiry.',`<div class="form-grid">${field('Name','name','text',true)}${field('Phone','phone','tel',true)}${field('Interested in','interest','text',true)}${selectField('Status','status',['New','Follow up','Visited','Closed'].map(x=>`<option>${x}</option>`).join(''))}${textArea('Notes','notes')}</div>`,'lead-form',false,'Add lead')}
function accountForm(){return modalWrap('Add an account','Cash or bank balances for this demo workspace.',`<div class="form-grid">${field('Account name','name','text',true)}${selectField('Type','type',['Bank','Cash'].map(x=>`<option>${x}</option>`).join(''))}${field('Account number (last digits only)','number','text')}${field('Opening balance (PKR)','opening','number',true,'0','min="0"')}</div>`,'account-form',false,'Add account')}
function transferForm(){return modalWrap('Transfer funds','Move money between two demo accounts.',`<div class="form-grid">${selectField('From account','from',options(data.accounts,'id','name'),true)}${selectField('To account','to',options(data.accounts,'id','name'),true)}${field('Amount (PKR)','amount','number',true,'','min="1"')}${field('Date','date','date',true,today())}${field('Note','note','text',false,'Account transfer')}</div>`,'transfer-form',false,'Record transfer')}
function expenseForm(){return modalWrap('Add an expense','Link preparation costs to a vehicle or leave as showroom overhead.',`<div class="form-grid">${selectField('Category','category',['Repair','Detailing','Transport','Transfer fee','Showroom rent','Utilities','Salary','Marketing','Other'].map(x=>`<option>${x}</option>`).join(''))}${field('Date','date','date',true,today())}${field('Amount (PKR)','amount','number',true,'','min="1"')}${selectField('Vehicle (optional)','vehicleId',options(data.vehicles,'id',vehicleName,'Showroom overhead'))}${selectField('Paid from','accountId',options(data.accounts,'id','name'),true)}${field('Note','note','text')}</div>`,'expense-form',false,'Add expense')}
function resetForm(){return modalWrap('Reset demo data','Start the walkthrough again with the original sample records.',`<div class="notice"><strong>This replaces changes saved in this browser.</strong> The original demo vehicles, deals and balances will return.</div>`,'reset-form',false,'Reset sample data')}

function detailView(type,id){
 if(type==='vehicle')return vehicleDetail(byId('vehicles',id));
 if(type==='purchase')return dealDetail('purchase',byId('purchases',id));
 if(type==='sale')return dealDetail('sale',byId('sales',id));
 if(type==='person')return personDetail(byId('people',id));
 return '';
}
const drawerWrap=(tag,title,body)=>`<div class="drawer-backdrop" data-action="close-overlay"><div class="drawer" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}"><div class="drawer-head"><div><small>${tag}</small><h2>${escapeHtml(title)}</h2></div><button data-action="close-overlay" aria-label="Close">×</button></div><div class="drawer-body">${body}</div></div></div>`;
const kv=(label,value)=>`<div class="kv"><small>${label}</small><strong>${escapeHtml(value??'—')}</strong></div>`;

function vehicleDetail(v){if(!v)return '';
 const p=data.purchases.find(x=>x.vehicleId===v.id),s=data.sales.find(x=>x.vehicleId===v.id),expenses=data.expenses.filter(e=>e.vehicleId===v.id);
 return drawerWrap('Vehicle record',vehicleName(v),`<div class="drawer-section"><div class="section-head"><div>${statusBadge(v.status)} <span class="badge">${escapeHtml(v.type)}</span></div>${v.status!=='Sold'?`<button class="btn btn-primary btn-small" data-action="new-sale:${v.id}">Create sale</button>`:''}</div><div class="kv-grid">${kv('Registration',v.reg||'Unregistered')}${kv('Color',v.color)}${kv('Chassis / VIN',v.chassis)}${kv('Engine',v.engine)}${kv('Mileage',num(v.mileage)+' km')}${kv('Acquired',prettyDate(v.date))}</div></div>
 <div class="drawer-section"><h3>Price & ownership</h3><div class="detail-grid"><div class="detail-box"><small>Purchase</small><strong>${money(v.purchasePrice)}</strong></div><div class="detail-box"><small>Asking</small><strong>${money(v.askingPrice)}</strong></div><div class="detail-box"><small>Prep costs</small><strong>${money(vehicleCosts(v.id))}</strong></div></div><div class="kv-grid mt-16">${kv('Purchased from',partyName(v.sellerId))}${kv('File location',v.fileLocation)}</div></div>
 <div class="drawer-section"><h3>Document checklist</h3><div class="doc-list">${['Registration book','Transfer letter','CNIC copy','Tax receipt','Sale invoice'].map(d=>`<div class="doc-item ${v.papers.includes(d)?'yes':'no'}">${v.papers.includes(d)?'✓':'○'} ${d}</div>`).join('')}</div></div>
 <div class="drawer-section"><h3>Vehicle history</h3><div class="timeline"><div class="timeline-item"><span class="timeline-dot"></span><div><strong>Purchase ${escapeHtml(p?.id||'')}</strong><span>${prettyDate(v.date)} · ${money(v.purchasePrice)}</span></div></div>${expenses.map(e=>`<div class="timeline-item"><span class="timeline-dot"></span><div><strong>${escapeHtml(e.category)} expense</strong><span>${prettyDate(e.date)} · ${money(e.amount)}</span></div></div>`).join('')}${s?`<div class="timeline-item"><span class="timeline-dot"></span><div><strong>Sold · ${escapeHtml(s.id)}</strong><span>${prettyDate(s.date)} · ${money(s.price)}</span></div></div>`:''}</div></div>
 <div class="drawer-section"><h3>Notes</h3><p class="muted" style="font-size:11px">${escapeHtml(v.notes||'No notes added.')}</p><div class="inline-actions">${p?`<button class="btn btn-small" data-detail="purchase:${p.id}">View purchase</button>`:''}${s?`<button class="btn btn-small" data-detail="sale:${s.id}">View sale</button>`:''}</div></div>`);
}

function dealDetail(type,d){if(!d)return '';const v=byId('vehicles',d.vehicleId),isSale=type==='sale',party=partyName(isSale?d.buyerId:d.sellerId),b=balance(type,d),payments=dealPayments(type,d.id);
 return drawerWrap(isSale?'Sale record':'Purchase record',d.id,`<div class="drawer-section"><div class="section-head"><div>${statusBadge(b?'Partial':'Paid')} ${isSale?statusBadge(d.type):''}</div><button class="btn btn-small" data-detail="vehicle:${v.id}">View vehicle</button></div><div class="kv-grid">${kv('Vehicle',vehicleName(v))}${kv(isSale?'Buyer':'Seller',party)}${kv('Date',prettyDate(d.date))}${kv('Due date',prettyDate(d.dueDate))}${isSale?kv('Delivery',d.delivery):kv('File location',v?.fileLocation)}</div></div>
 <div class="drawer-section"><h3>Payment summary</h3><div class="detail-grid"><div class="detail-box"><small>Total</small><strong>${money(d.price)}</strong></div><div class="detail-box"><small>Paid</small><strong>${money(paid(type,d.id))}</strong></div><div class="detail-box"><small>Remaining</small><strong>${money(b)}</strong></div></div>${b?`<button class="btn btn-primary btn-small mt-16" data-action="pay-${type}:${d.id}">${isSale?'Record receipt':'Pay seller'}</button>`:''}</div>
 <div class="drawer-section"><h3>Payment history</h3>${payments.length?`<div class="timeline">${payments.map(p=>`<div class="timeline-item"><span class="timeline-dot"></span><div><strong>${money(p.amount)} · ${escapeHtml(p.method)}</strong><span>${prettyDate(p.date)} · ${escapeHtml(byId('accounts',p.accountId)?.name||'In-kind exchange')} · ${escapeHtml(p.note||'')}</span></div></div>`).join('')}</div>`:'<p class="muted" style="font-size:11px">No payment posted yet.</p>'}</div>
 ${isSale?`<div class="drawer-section"><h3>Vehicle margin</h3><div class="kv-grid">${kv('Purchase cost',money(v?.purchasePrice))}${kv('Vehicle expenses',money(vehicleCosts(v?.id)))}${kv('Gross profit',money(saleProfit(d)))}</div><button class="btn btn-small mt-16" data-action="print-sale:${d.id}">${ico('file')} Print demo receipt</button></div>`:''}
 <div class="drawer-section"><h3>Notes</h3><p class="muted" style="font-size:11px">${escapeHtml(d.note||'No notes added.')}</p></div>`);
}

function personDetail(p){if(!p)return '';const purchases=data.purchases.filter(x=>x.sellerId===p.id),sales=data.sales.filter(x=>x.buyerId===p.id);
 return drawerWrap('Person record',p.name,`<div class="drawer-section"><div class="kv-grid">${kv('Role',p.role)}${kv('Phone',p.phone)}${kv('CNIC',p.cnic||'Not recorded')}${kv('Address',p.address||'Not recorded')}</div></div><div class="drawer-section"><h3>Connected deals</h3><div class="timeline">${[...purchases.map(d=>({d,type:'purchase'})),...sales.map(d=>({d,type:'sale'}))].map(({d,type})=>`<div class="timeline-item"><span class="timeline-dot"></span><div><strong>${type==='sale'?'Bought':'Sold to showroom'} · ${escapeHtml(vehicleName(byId('vehicles',d.vehicleId)))}</strong><span>${escapeHtml(d.id)} · ${prettyDate(d.date)} · ${money(d.price)}</span><button class="text-link" data-detail="${type}:${d.id}">View ${type} →</button></div></div>`).join('')||'<span class="muted">No connected deals.</span>'}</div></div><div class="drawer-section"><h3>Open balance</h3><div class="detail-grid"><div class="detail-box"><small>Receivable</small><strong>${money(total(sales,d=>balance('sale',d)))}</strong></div><div class="detail-box"><small>Payable</small><strong>${money(total(purchases,d=>balance('purchase',d)))}</strong></div></div></div>`);
}

function renderOverlay(){
 const root=document.getElementById('modal-root');
 if(pageState.detail){const [type,id]=pageState.detail.split(':');root.innerHTML=detailView(type,id);return}
 if(!pageState.modal){root.innerHTML='';return}
 const [action,context]=pageState.modal.split('|');
 const forms={'new-purchase':purchaseForm,'new-sale':saleForm,'new-payment':()=>paymentForm(context),'new-person':personForm,'new-lead':leadForm,'new-account':accountForm,'transfer':transferForm,'new-expense':expenseForm,'reset-demo':resetForm};
 root.innerHTML=(forms[action]||(()=>''))();
 if(action==='new-sale'&&context){const sel=root.querySelector('[name=vehicleId]');if(sel)sel.value=context;const v=byId('vehicles',context);if(v)root.querySelector('[name=price]').value=v.askingPrice}
 if(action==='new-payment'&&context){const [type,id]=context.split(':');const d=type==='sale'?byId('sales',id):byId('purchases',id);if(d)root.querySelector('[name=amount]').value=balance(type,d)}
 root.querySelector('input,select,button')?.focus();
}

function formData(form){const fd=new FormData(form),o={};for(const [k,v] of fd.entries()){if(k==='papers'){(o.papers??=[]).push(v)}else o[k]=String(v).trim()}return o}
const fail=msg=>{toast(msg);return false};
function handleSubmit(form){
 const x=formData(form),id=form.id;
 if(id==='purchase-form'){
  const price=Number(x.price),initial=Number(x.initialPaid||0),asking=Number(x.askingPrice);
  if(!price||!asking||initial<0||initial>price)return fail('Check purchase price, asking price and amount paid.');
  if(initial&&!x.accountId)return fail('Select the account used for the payment.');
  if(data.vehicles.some(v=>v.chassis.toLowerCase()===x.chassis.toLowerCase()))return fail('That chassis number already exists in this demo.');
  const vId=uid('v'),pId=uid('PUR');
  data.vehicles.unshift({id:vId,make:x.make,model:x.model,year:Number(x.year),color:x.color,reg:x.reg||'',chassis:x.chassis,engine:x.engine||'',mileage:Number(x.mileage||0),type:x.type,status:x.type==='Booking'?'Reserved':'Available',sellerId:x.sellerId,purchasePrice:price,askingPrice:asking,date:x.date,papers:x.papers||[],fileLocation:x.fileLocation||'Not recorded',notes:x.notes||''});
  data.purchases.unshift({id:pId,vehicleId:vId,sellerId:x.sellerId,price,date:x.date,dueDate:x.dueDate||x.date,note:x.notes||''});
  if(initial)data.payments.unshift({id:uid('pay'),dealType:'purchase',dealId:pId,accountId:x.accountId,direction:'out',amount:initial,date:x.date,method:byId('accounts',x.accountId)?.type==='Cash'?'Cash':'Bank transfer',note:'Purchase payment'});
  save();pageState.modal=null;pageState.page='purchases';pageState.search='';render();toast('Purchase recorded and vehicle added to stock.');return true;
 }
 if(id==='sale-form'){
  const v=byId('vehicles',x.vehicleId),price=Number(x.price),initial=Number(x.initialPaid||0),trade=x.type==='Trade-in'?Number(x.tradeValue||0):0;
  if(!v||!['Available','Reserved'].includes(v.status))return fail('Select an available or reserved vehicle.');
  if(data.sales.some(s=>s.vehicleId===v.id))return fail('This vehicle already has a completed sale.');
  if(!price||initial<0||trade<0||initial+trade>price)return fail('Check sale price, receipt and trade-in allowance.');
  if(initial&&!x.accountId)return fail('Select the account receiving the payment.');
  if(x.type==='Trade-in'&&(!trade||!x.tradeMake||!x.tradeModel||!x.tradeYear||!x.tradeChassis))return fail('Complete all trade-in vehicle details.');
  if(x.type==='Trade-in'&&data.vehicles.some(y=>y.chassis.toLowerCase()===x.tradeChassis.toLowerCase()))return fail('Trade-in chassis number already exists.');
  const sId=uid('SAL');data.sales.unshift({id:sId,vehicleId:v.id,buyerId:x.buyerId,price,date:x.date,dueDate:x.dueDate||x.date,type:x.type,note:x.notes||'',delivery:x.delivery||'Pending'});v.status='Sold';
  if(initial)data.payments.unshift({id:uid('pay'),dealType:'sale',dealId:sId,accountId:x.accountId,direction:'in',amount:initial,date:x.date,method:byId('accounts',x.accountId)?.type==='Cash'?'Cash':'Bank transfer',note:'Sale receipt'});
  if(trade){const tId=uid('v'),pId=uid('PUR');data.vehicles.unshift({id:tId,make:x.tradeMake,model:x.tradeModel,year:Number(x.tradeYear),color:'Not recorded',reg:x.tradeReg||'',chassis:x.tradeChassis,engine:'',mileage:0,type:'Used',status:'Available',sellerId:x.buyerId,purchasePrice:trade,askingPrice:trade,date:x.date,papers:[],fileLocation:'To verify',notes:`Received as trade-in for ${sId}; valuation and papers need review.`});data.purchases.unshift({id:pId,vehicleId:tId,sellerId:x.buyerId,price:trade,date:x.date,dueDate:x.date,note:`Trade-in for ${sId}`});data.payments.unshift({id:uid('pay'),dealType:'sale',dealId:sId,accountId:'',direction:'in',amount:trade,date:x.date,method:'Trade-in',note:`Incoming vehicle ${tId}`},{id:uid('pay'),dealType:'purchase',dealId:pId,accountId:'',direction:'out',amount:trade,date:x.date,method:'Trade-in',note:`Exchange for ${sId}`})}
  save();pageState.modal=null;pageState.page='sales';pageState.search='';pageState.detail='sale:'+sId;render();toast('Sale completed. Vehicle moved to Sold.');return true;
 }
 if(id==='payment-form'){
  const [type,dealId]=(x.deal||'').split(':'),d=type==='sale'?byId('sales',dealId):byId('purchases',dealId),amount=Number(x.amount);
  if(!d||!amount||amount<=0||amount>balance(type,d))return fail('Payment must be greater than zero and no more than the open balance.');
  data.payments.unshift({id:uid('pay'),dealType:type,dealId,accountId:x.accountId,direction:type==='sale'?'in':'out',amount,date:x.date,method:x.method,note:x.note||`${type==='sale'?'Sale receipt':'Purchase payment'}`});
  save();pageState.modal=null;render();toast('Payment posted to the deal and account.');return true;
 }
 if(id==='person-form'){
  if(data.people.some(p=>p.phone&&p.phone===x.phone))return fail('A person with this phone number already exists.');
  data.people.unshift({id:uid('p'),name:x.name,role:x.role,phone:x.phone,cnic:x.cnic||'',address:x.address||'',notes:x.notes||''});save();pageState.modal=null;pageState.page='people';pageState.tab='People';render();toast('Person added.');return true;
 }
 if(id==='lead-form'){data.leads.unshift({id:uid('l'),name:x.name,phone:x.phone,interest:x.interest,status:x.status,date:today(),notes:x.notes||''});save();pageState.modal=null;pageState.page='people';pageState.tab='Leads';render();toast('Lead added.');return true}
 if(id==='account-form'){data.accounts.push({id:uid('a'),name:x.name,type:x.type,number:x.number||'',opening:Number(x.opening||0)});save();pageState.modal=null;pageState.page='accounts';render();toast('Account added.');return true}
 if(id==='transfer-form'){
  const amount=Number(x.amount);if(x.from===x.to)return fail('Choose two different accounts.');if(amount>accountBalance(x.from))return fail('Not enough demo balance in the source account.');
  const t=uid('TRF');data.payments.unshift({id:uid('pay'),dealType:'transfer',dealId:t,accountId:x.from,direction:'out',amount,date:x.date,method:'Transfer',note:x.note||'Account transfer'},{id:uid('pay'),dealType:'transfer',dealId:t,accountId:x.to,direction:'in',amount,date:x.date,method:'Transfer',note:x.note||'Account transfer'});save();pageState.modal=null;pageState.page='accounts';render();toast('Transfer recorded in both accounts.');return true;
 }
 if(id==='expense-form'){
  const amount=Number(x.amount);if(amount<=0)return fail('Enter a valid expense amount.');const eId=uid('EXP');data.expenses.unshift({id:eId,vehicleId:x.vehicleId||'',category:x.category,amount,date:x.date,accountId:x.accountId,note:x.note||''});data.payments.unshift({id:uid('pay'),dealType:'expense',dealId:eId,accountId:x.accountId,direction:'out',amount,date:x.date,method:byId('accounts',x.accountId)?.type==='Cash'?'Cash':'Bank transfer',note:x.category});save();pageState.modal=null;pageState.page='expenses';render();toast('Expense recorded.');return true;
 }
 if(id==='reset-form'){data=seed();save();pageState.modal=null;pageState.search='';pageState.page='overview';render();toast('Demo data reset.');return true}
 return false;
}

function printSale(id){const s=byId('sales',id),v=byId('vehicles',s?.vehicleId);if(!s||!v)return;const existing=document.querySelector('.print-sheet');if(existing)existing.remove();const sheet=document.createElement('div');sheet.className='print-sheet';sheet.innerHTML=`<div style="border-bottom:3px solid #222;padding-bottom:16px;display:flex;justify-content:space-between"><div><h1>TOP WHEELS</h1><div>Showroom Desk · Peshawar, Pakistan</div></div><div style="text-align:right"><strong>SAMPLE RECEIPT</strong><div>${escapeHtml(s.id)}</div><div>${prettyDate(s.date)}</div></div></div><p style="font-weight:bold;color:#a22">DEMO ONLY — NOT A TAX INVOICE</p><table><tr><th>Vehicle</th><td>${escapeHtml(vehicleName(v))}</td></tr><tr><th>Registration</th><td>${escapeHtml(v.reg||'Unregistered')}</td></tr><tr><th>Chassis</th><td>${escapeHtml(v.chassis)}</td></tr><tr><th>Buyer</th><td>${escapeHtml(partyName(s.buyerId))}</td></tr><tr><th>Sale type</th><td>${escapeHtml(s.type)}</td></tr><tr><th>Sale price</th><td>${money(s.price)}</td></tr><tr><th>Received to date</th><td>${money(paid('sale',s.id))}</td></tr><tr><th>Remaining</th><td>${money(balance('sale',s))}</td></tr></table><p style="margin-top:30px">This is a sample document for product feedback. It does not verify ownership, transfer or tax compliance.</p><div style="display:flex;justify-content:space-between;margin-top:80px"><span>____________________<br>Showroom signature</span><span>____________________<br>Buyer signature</span></div>`;document.body.appendChild(sheet);window.print();setTimeout(()=>sheet.remove(),1000)}

function exportAction(action){
 if(action==='export-purchases')downloadCsv('top-wheels-purchases',[['ID','Date','Vehicle','Seller','Price','Paid','Balance'],...data.purchases.map(p=>[p.id,p.date,vehicleName(byId('vehicles',p.vehicleId)),partyName(p.sellerId),p.price,paid('purchase',p.id),balance('purchase',p)])]);
 if(action==='export-sales')downloadCsv('top-wheels-sales',[['ID','Date','Vehicle','Buyer','Type','Price','Received','Due'],...data.sales.map(s=>[s.id,s.date,vehicleName(byId('vehicles',s.vehicleId)),partyName(s.buyerId),s.type,s.price,paid('sale',s.id),balance('sale',s)])]);
 if(action==='export-ledger')downloadCsv('top-wheels-ledger',[['Date','Note','Reference','Account','Method','Direction','Amount'],...data.payments.map(p=>[p.date,p.note,p.dealId,byId('accounts',p.accountId)?.name||'In-kind',p.method,p.direction,p.amount])]);
 if(action==='export-expenses')downloadCsv('top-wheels-expenses',[['ID','Date','Category','Vehicle','Account','Amount','Note'],...data.expenses.map(e=>[e.id,e.date,e.category,vehicleName(byId('vehicles',e.vehicleId)),byId('accounts',e.accountId)?.name,e.amount,e.note])]);
 if(action==='export-reports')downloadCsv('top-wheels-summary',[['Metric','Amount'],['Sale value',total(data.sales,'price')],['Gross profit',total(data.sales,saleProfit)],['Open receivables',total(data.sales,s=>balance('sale',s))],['Open payables',total(data.purchases,p=>balance('purchase',p))],['Showroom overhead',total(data.expenses.filter(e=>!e.vehicleId),'amount')]]);
 toast('CSV downloaded.');
}

document.addEventListener('click',e=>{
 const page=e.target.closest('[data-page]');if(page){pageState.page=page.dataset.page;pageState.search='';pageState.filter='All';pageState.detail=null;pageState.modal=null;document.getElementById('sidebar').classList.remove('open');render();window.scrollTo(0,0);return}
 const filter=e.target.closest('[data-filter]');if(filter){pageState.filter=filter.dataset.filter;render();return}
 const tab=e.target.closest('[data-tab]');if(tab){pageState.tab=tab.dataset.tab;render();return}
 const dueTab=e.target.closest('[data-due-tab]');if(dueTab){pageState.dueTab=dueTab.dataset.dueTab;render();return}
 const detail=e.target.closest('[data-detail]');if(detail){pageState.modal=null;pageState.detail=detail.dataset.detail;renderOverlay();return}
 const act=e.target.closest('[data-action]');if(!act)return;
 const a=act.dataset.action;
 if(a==='close-overlay'){if((act.classList.contains('modal-backdrop')||act.classList.contains('drawer-backdrop'))&&e.target!==act)return;pageState.modal=null;pageState.detail=null;renderOverlay();return}
 if(a==='menu'){document.getElementById('sidebar').classList.toggle('open');return}
 if(a==='help'){pageState.modal=null;pageState.detail=null;document.getElementById('modal-root').innerHTML=modalWrap('Feedback guide','Use this demo to review Top Wheels workflows.',`<div class="notice"><strong>Suggested walkthrough:</strong> Record a purchase → inspect inventory → create a sale → record remaining payment → review reports.</div><p style="font-size:11px;line-height:1.7;color:#66727e">This is a browser-only mockup. Please note missing fields, print formats, calculations and approval steps. Use the PRD in the project to record decisions before building the production system.</p>`,'help-form',false,'Close');return}
 if(a==='reset-demo'){pageState.detail=null;pageState.modal='reset-demo';renderOverlay();return}
 if(a.startsWith('export-')){exportAction(a);return}
 if(a.startsWith('print-sale:')){printSale(a.split(':')[1]);return}
 if(a.startsWith('lead-followup:')){const l=byId('leads',a.split(':')[1]);if(l){l.status='Follow up';save();render();toast('Lead marked for follow up.')}return}
 if(a.startsWith('pay-sale:')||a.startsWith('pay-purchase:')){pageState.detail=null;pageState.modal='new-payment|'+a.slice(4);renderOverlay();return}
 if(a.startsWith('new-sale:')){pageState.detail=null;pageState.modal='new-sale|'+a.split(':')[1];renderOverlay();return}
 if(['new-purchase','new-sale','new-payment','new-person','new-lead','new-account','new-expense','transfer'].includes(a)){pageState.detail=null;pageState.modal=a;renderOverlay();return}
});
document.addEventListener('submit',e=>{if(!e.target.matches('form'))return;e.preventDefault();if(e.target.id==='help-form'){pageState.modal=null;document.getElementById('modal-root').innerHTML='';return}handleSubmit(e.target)});
document.addEventListener('input',e=>{if(e.target.id==='list-search'){const pos=e.target.selectionStart;pageState.search=e.target.value;render();const input=document.getElementById('list-search');if(input){input.focus();input.setSelectionRange(pos,pos)}}});
document.addEventListener('change',e=>{if(e.target.id==='period-select'){pageState.period=e.target.value;render()}if(e.target.name==='type'&&e.target.closest('#sale-form')){const section=document.getElementById('trade-section');if(section)section.hidden=e.target.value!=='Trade-in'}if(e.target.name==='vehicleId'&&e.target.closest('#sale-form')){const v=byId('vehicles',e.target.value),price=document.querySelector('#sale-form [name=price]');if(v&&price&&!price.value)price.value=v.askingPrice}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){pageState.modal=null;pageState.detail=null;renderOverlay();document.getElementById('sidebar').classList.remove('open')}});
if(!localStorage.getItem(STORAGE_KEY))save();pageState.tab='People';render();
