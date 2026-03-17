const PROBLEMS=[
  {id:1,title:"Finding a reliable handyman takes days of searching",who:"Homeowners in suburban areas",frequency:"Every few months",pain:4,industry:"Home Services",userType:"Consumer",replies:3,upvotes:24,workaround:"Asking neighbors on Nextdoor or scrolling Yelp for hours",willPay:"Yes, up to $10/month",description:"Every time something breaks — a leaky faucet, a stuck door — I spend more time finding someone trustworthy than the actual repair takes. I've been burned by no-shows and overcharges.",postedBy:"Maria K.",avatar:"MK",postedDate:"2 days ago",questions:[{from:"Alex Chen",text:"How much time do you typically spend searching?",date:"1 day ago"},{from:"Jordan Ellis",text:"Would you trust a platform's vetting process?",date:"12 hours ago"}]},
  {id:2,title:"Tracking freelance invoices across multiple clients is chaos",who:"Freelance designers and developers",frequency:"Weekly",pain:5,industry:"Finance",userType:"Freelancer",replies:7,upvotes:41,workaround:"Spreadsheets and scattered email threads",willPay:"Yes, $15–20/month",description:"I juggle 4–6 clients. Each has different payment terms and invoicing formats. I lose track of who's paid and end up doing accounting instead of design work every Friday.",postedBy:"Sam Torres",avatar:"ST",postedDate:"5 hours ago",questions:[{from:"Nina Park",text:"Do you use any invoicing tool, or is it purely manual?",date:"3 hours ago"}]},
  {id:3,title:"Meal planning for a family with allergies is exhausting",who:"Parents of children with food allergies",frequency:"Daily",pain:4,industry:"Health",userType:"Consumer",replies:2,upvotes:18,workaround:"Rotating through the same 10 safe recipes",willPay:"Yes, $8/month",description:"My son has nut and dairy allergies. Every meal requires checking ingredients, and most recipe sites don't filter for multiple allergies. We eat the same things over and over.",postedBy:"Priya Raj",avatar:"PR",postedDate:"1 day ago",questions:[]},
  {id:4,title:"Managing shared expenses in a co-living house is awkward",who:"Young professionals in shared housing",frequency:"Monthly",pain:3,industry:"Finance",userType:"Consumer",replies:1,upvotes:9,workaround:"Splitwise, but people forget to log things",willPay:"Maybe, if it solved the social awkwardness",description:"We're 4 people in a house. The real problem isn't the math — it's that nobody wants to be the person nagging others about money. It creates tension.",postedBy:"Jake Lin",avatar:"JL",postedDate:"3 days ago",questions:[{from:"Casey Wu",text:"Have you tried automating the expense tracking?",date:"2 days ago"}]},
  {id:5,title:"Getting mental health support as a night-shift worker",who:"Healthcare workers, factory staff on night shifts",frequency:"Ongoing",pain:5,industry:"Health",userType:"Professional",replies:5,upvotes:56,workaround:"Trying to schedule during rare days off, often giving up",willPay:"Yes, $30–50/session",description:"I work 7pm to 7am. Every therapist has 9-to-5 hours. By the time I'm free, I'm too tired to advocate for myself. The system wasn't built for people like me.",postedBy:"Devon Miles",avatar:"DM",postedDate:"6 hours ago",questions:[{from:"Riley Shaw",text:"Would async therapy work for your schedule?",date:"4 hours ago"},{from:"Taylor Reeves",text:"What time window would be ideal for a live session?",date:"2 hours ago"}]},
  {id:6,title:"Onboarding new hires remotely feels impersonal and chaotic",who:"HR managers at remote-first startups",frequency:"Monthly",pain:4,industry:"SaaS / B2B",userType:"Professional",replies:4,upvotes:33,workaround:"Long Notion docs and a Slack flood on day one",willPay:"Yes, $200–500/month",description:"Every new hire gets a 40-page Notion doc and 15 Slack channels on day one. Half are overwhelmed, the other half miss critical info.",postedBy:"Lena Cho",avatar:"LC",postedDate:"12 hours ago",questions:[{from:"Marcus Hill",text:"What does a 'good' first day look like?",date:"8 hours ago"}]},
  {id:7,title:"Small e-commerce brands can't afford good product photography",who:"Shopify store owners under $10k/month",frequency:"Every product launch",pain:3,industry:"E-Commerce",userType:"Small Business",replies:2,upvotes:15,workaround:"iPhone photos with cheap ring lights",willPay:"Yes, $50–100 per product",description:"Professional photography costs $500+ per session. I can't justify that for every new scent, but my iPhone photos look amateur.",postedBy:"Nora Blake",avatar:"NB",postedDate:"4 days ago",questions:[]},
  {id:8,title:"Finding flexible office space without a 12-month lease",who:"Early-stage startup founders (5-person teams)",frequency:"Every 6–12 months",pain:4,industry:"Real Estate",userType:"Founder",replies:6,upvotes:38,workaround:"Co-working that doesn't fit, or expensive subleases",willPay:"Yes, if pricing were transparent",description:"WeWork is too expensive for dedicated space. Traditional leases want 12-month commitments. We need something in between.",postedBy:"Omar Farouk",avatar:"OF",postedDate:"1 day ago",questions:[{from:"Ava Kim",text:"What's your budget per desk per month?",date:"18 hours ago"}]},
];

const INDUSTRIES=["All","Health","Finance","Home Services","SaaS / B2B","E-Commerce","Real Estate"];
const USER_TYPES=["All","Consumer","Freelancer","Professional","Small Business","Founder"];
const PAIN_OPTS=["All","5 — Severe","4 — High","3 — Moderate","1–2 — Low"];

let S={page:'landing',detailId:null,search:'',industry:'All',pain:'All',userType:'All',sort:'trending',votes:{},pf:{title:'',who:'',frequency:'',pain:3,workaround:'',willPay:'',industry:''},postDone:false,pt:{title:'',desc:'',target:'',problem:'',assumptions:'',feedbackTypes:[],rewardType:'',rewardAmount:'',rewardMsg:''},ptDone:false,discVotes:{},discBest:null,co:{name:'',email:'',card:'',exp:'',cvc:''},coStep:'form'};

function go(p,id){S.page=p;if(id)S.detailId=id;document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));document.getElementById('page-'+p).classList.add('active');document.querySelectorAll('.nav-link').forEach(l=>l.classList.toggle('active',l.dataset.nav===p));window.scrollTo({top:0,behavior:'smooth'});if(p==='board')renderBoard();if(p==='detail')renderDetail();if(p==='post')renderPost();if(p==='pressuretest')renderPT();if(p==='checkout'){S.coStep='form';renderCO();}if(p==='landing')initReveal();}

function pc(l){return l>=5?'pain-5':l>=4?'pain-4':l>=3?'pain-3':'pain-low'}
function pl(l){return l>=5?'Severe':l>=4?'High':l>=3?'Moderate':'Low'}
function chk(){return '<svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'}

function getF(){let it=[...PROBLEMS];const q=S.search.toLowerCase();if(q)it=it.filter(p=>p.title.toLowerCase().includes(q)||p.who.toLowerCase().includes(q)||p.industry.toLowerCase().includes(q)||p.description.toLowerCase().includes(q));if(S.industry!=='All')it=it.filter(p=>p.industry===S.industry);if(S.userType!=='All')it=it.filter(p=>p.userType===S.userType);if(S.pain!=='All'){if(S.pain.startsWith('5'))it=it.filter(p=>p.pain===5);else if(S.pain.startsWith('4'))it=it.filter(p=>p.pain===4);else if(S.pain.startsWith('3'))it=it.filter(p=>p.pain===3);else it=it.filter(p=>p.pain<=2);}if(S.sort==='trending')it.sort((a,b)=>b.upvotes-a.upvotes);else if(S.sort==='newest')it.sort((a,b)=>b.id-a.id);else it.sort((a,b)=>b.pain-a.pain||b.upvotes-a.upvotes);return it;}
function ac(){return[S.industry,S.pain,S.userType].filter(f=>f!=='All').length;}

function filHTML(){let h='';const g=(t,o,c,k)=>{h+=`<div class="filter-group"><div class="filter-title">${t}</div>`;o.forEach(v=>{const a=c===v?'active':'';h+=`<div class="filter-opt ${a}" onclick="sF('${k}','${v.replace(/'/g,"\\'")}')"><span class="filter-dot">${a?chk():''}</span>${v}</div>`;});h+='</div>';};g('Industry',INDUSTRIES,S.industry,'industry');g('Pain Level',PAIN_OPTS,S.pain,'pain');g('User Type',USER_TYPES,S.userType,'userType');if(ac()>0)h+=`<button class="clear-btn" onclick="cF()">Clear all filters</button>`;return h;}
function sF(k,v){S[k]=v;renderBoard();}
function cF(){S.industry='All';S.pain='All';S.userType='All';renderBoard();}
function sS(s){S.sort=s;renderBoard();}
function tV(id,e){if(e)e.stopPropagation();S.votes[id]=!S.votes[id];if(S.page==='board')renderBoard();else renderDetail();}
function openDrawer(){document.getElementById('drawer-overlay').classList.remove('hide');document.getElementById('drawer-filters').innerHTML=filHTML();}
function closeDrawer(){document.getElementById('drawer-overlay').classList.add('hide');}

function renderBoard(){const it=getF();const a=ac();
document.getElementById('toolbar').innerHTML=`<div class="search-wrap"><svg class="search-ico" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5.5" stroke="#9CA3AF" stroke-width="1.5"/><line x1="11" y1="11" x2="14.5" y2="14.5" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round"/></svg><input class="search-input" value="${S.search}" oninput="S.search=this.value;renderBoard()" placeholder="Search problems by keyword, industry, audience…"></div><div class="sort-grp">${[['trending','🔥 Trending'],['newest','🕐 Newest'],['most-pain','🔴 Most Pain']].map(([k,l])=>`<button class="sort-btn ${S.sort===k?'active':''}" onclick="sS('${k}')">${l}</button>`).join('')}</div><button class="mob-filter-btn" onclick="openDrawer()"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Filters${a>0?`<span class="badge">${a}</span>`:''}</button>`;
document.getElementById('sidebar').innerHTML=filHTML();document.getElementById('drawer-filters').innerHTML=filHTML();
let c='';if(!it.length){c=`<div class="empty"><div class="empty-ico">🔍</div><h3>No problems match</h3><p>Try broadening your search or clearing filters.</p></div>`;}else{c=`<div class="board-meta"><span>${it.length} problem${it.length!==1?'s':''} found</span>${a>0?'<button style="color:var(--coral);background:none;font-size:12px;font-weight:700;cursor:pointer;border:none" onclick="cF()">Clear filters</button>':''}</div>`;it.forEach((p,i)=>{const v=S.votes[p.id];c+=`<div class="card card-hover p-card" onclick="go('detail',${p.id})" style="animation:fadeUp .35s ease ${i*.04}s both"><button class="upvote ${v?'voted':''}" onclick="tV(${p.id},event)"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 2L12 9H2L7 2Z" fill="${v?'var(--teal)':'#9CA3AF'}"/></svg><span class="upvote-n">${v?p.upvotes+1:p.upvotes}</span></button><div class="p-body"><div class="p-title">${p.title}</div><div class="p-excerpt">${p.description}</div><div class="p-footer"><span class="pain ${pc(p.pain)}">${p.pain}/5 ${pl(p.pain)}</span><span class="tag">🏷 ${p.industry}</span><span class="tag">👤 ${p.userType}</span><span class="p-meta">💬 ${p.replies} · ${p.postedDate}</span></div></div></div>`;});}
document.getElementById('board-main').innerHTML=c;}

function renderDetail(){const p=PROBLEMS.find(x=>x.id===S.detailId);if(!p)return;const v=S.votes[p.id];
let qH='';if(p.questions.length){qH=`<div class="card" style="padding:24px;margin-bottom:14px;border-radius:var(--r-lg)"><div class="panel-title">💬 Founder Questions (${p.questions.length})</div><div class="q-list">`;p.questions.forEach(q=>{const ini=q.from.split(' ').map(n=>n[0]).join('');qH+=`<div class="q-item"><div class="q-head"><div class="q-author"><span class="av-sm av-teal">${ini}</span><span class="q-name">${q.from}</span></div><span class="q-date">${q.date}</span></div><div class="q-text">${q.text}</div></div>`;});qH+='</div></div>';}
document.getElementById('detail-content').innerHTML=`<button class="back-btn" onclick="go('board')">← Back to Problems</button><div class="card detail-hero"><div class="detail-inner"><button class="upvote ${v?'voted':''}" onclick="tV(${p.id},event)"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 2L12 9H2L7 2Z" fill="${v?'var(--teal)':'#9CA3AF'}"/></svg><span class="upvote-n">${v?p.upvotes+1:p.upvotes}</span></button><div class="detail-body"><h1 class="detail-title">${p.title}</h1><div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px"><span class="pain ${pc(p.pain)}">${p.pain}/5 ${pl(p.pain)}</span><span class="tag">🏷 ${p.industry}</span><span class="tag">👤 ${p.userType}</span><span class="tag">🔁 ${p.frequency}</span></div><p class="detail-desc">${p.description}</p><div class="detail-author"><span class="av-sm av-coral">${p.avatar}</span><span><strong>${p.postedBy}</strong> · ${p.postedDate}</span></div></div></div></div><div class="meta-grid"><div class="card meta-card"><span class="meta-label">👥 Who has this problem</span><span class="meta-val">${p.who}</span></div><div class="card meta-card"><span class="meta-label">🔧 Current workaround</span><span class="meta-val">${p.workaround}</span></div><div class="card meta-card"><span class="meta-label">💰 Would pay for a solution?</span><span class="meta-val">${p.willPay}</span></div></div><div class="card connect-panel"><div class="panel-title">Start a conversation with ${p.postedBy}</div><div id="cs"></div><div class="tab-bar"><button class="tab-btn active" onclick="sT(this,'question')">💬 Ask a Question</button><button class="tab-btn" onclick="sT(this,'interview')">☕ Request 15-min Chat</button><button class="tab-btn" onclick="sT(this,'message')">✉️ Send Message</button></div><div id="ih" class="interview-hint hide"><p>Request a casual 15-minute video or phone chat with <strong>${p.postedBy}</strong>. Come with curiosity — they'll appreciate specific questions about their experience.</p></div><textarea id="cm" class="form-input" rows="4" placeholder="What would you like to know about this problem?"></textarea><button id="csb" class="btn btn-teal" style="margin-top:12px" onclick="sC()">Send Question</button></div>${qH}`;
window._ct='question';window._cn=p.postedBy;}

function sT(b,t){document.querySelectorAll('.tab-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');window._ct=t;document.getElementById('ih').classList.toggle('hide',t!=='interview');document.getElementById('cm').placeholder=t==='question'?"What would you like to know?":t==='interview'?"Introduce yourself — what are you building and what do you want to learn?":"Write your message…";document.getElementById('csb').textContent=t==='question'?"Send Question":t==='interview'?"Request Chat":"Send Message";}
function sC(){const m=document.getElementById('cm');if(!m.value.trim())return;const t=window._ct;const l=t==='question'?'Question sent!':t==='interview'?'Chat request sent!':'Message sent!';document.getElementById('cs').innerHTML=`<div class="success-msg">✓ ${l}</div>`;m.value='';setTimeout(()=>{const e=document.getElementById('cs');if(e)e.innerHTML='';},3500);}

function renderPost(){if(S.postDone){document.getElementById('post-content').innerHTML=`<div class="card success-state"><div class="success-emoji">🎉</div><h2>You've been heard!</h2><p>Your problem is now visible to our community of founding members — committed builders looking for exactly this kind of validated frustration to solve.</p><div class="success-ctas"><button class="btn btn-teal" onclick="go('board')">See the Problem Board</button><button class="btn btn-ghost" onclick="S.postDone=false;S.pf={title:'',who:'',frequency:'',pain:3,workaround:'',willPay:'',industry:''};renderPost();">Share Another</button></div></div>`;return;}
const f=S.pf;const pb=[1,2,3,4,5].map(n=>{const a=f.pain===n;const bg=a?(n>=4?'#EF4444':n>=3?'#F59E0B':'#22C55E'):'';return`<button class="pain-btn ${a?'active':''}" style="${a?'background:'+bg+';color:#fff;border-color:transparent':''}" onclick="S.pf.pain=${n};renderPost()">${n}</button>`;}).join('');
const io=INDUSTRIES.filter(i=>i!=='All').map(i=>`<option value="${i}" ${f.industry===i?'selected':''}>${i}</option>`).join('');
document.getElementById('post-content').innerHTML=`<h2 class="page-heading">💬 Share a problem</h2><p class="page-sub">Describe a real frustration you experience. Be specific and honest — our founding members are actively looking for validated pain points to build solutions around.</p><div class="card form-card"><div class="form-field"><label class="form-label">What's the problem?</label><input class="form-input" value="${f.title}" oninput="S.pf.title=this.value" placeholder="e.g. Finding a dentist who accepts my insurance is a nightmare"></div><div class="form-field"><label class="form-label">Who else deals with this?</label><input class="form-input" value="${f.who}" oninput="S.pf.who=this.value" placeholder="e.g. People with employer-sponsored dental insurance"></div><div class="field-row"><div class="form-field"><label class="form-label">Industry</label><select class="form-input" onchange="S.pf.industry=this.value"><option value="">Pick one…</option>${io}</select></div><div class="form-field"><label class="form-label">How often?</label><input class="form-input" value="${f.frequency}" oninput="S.pf.frequency=this.value" placeholder="e.g. Every week"></div></div><div class="form-field"><label class="form-label">How painful is this? ${f.pain}/5</label><div class="pain-selector">${pb}</div></div><div class="form-field"><label class="form-label">What do you do about it now?</label><textarea class="form-input" rows="3" oninput="S.pf.workaround=this.value" placeholder="Describe your current workaround — even if it's just complaining about it">${f.workaround}</textarea></div><div class="form-field"><label class="form-label">Would you pay for a real solution?</label><input class="form-input" value="${f.willPay}" oninput="S.pf.willPay=this.value" placeholder="e.g. Absolutely — up to $10/month"></div><button class="btn btn-coral btn-full btn-lg" style="opacity:${f.title.trim()?'1':'0.5'};margin-top:8px" onclick="if(S.pf.title.trim()){dbSaveProblem(S.pf);S.postDone=true;renderPost();}">Share this problem →</button></div>`;}

function toggleFBType(t){const i=S.pt.feedbackTypes.indexOf(t);if(i===-1)S.pt.feedbackTypes.push(t);else S.pt.feedbackTypes.splice(i,1);renderPT();}
function toggleDiscVote(id,e){if(e)e.stopPropagation();S.discVotes[id]=!S.discVotes[id];renderPT();}
function toggleDiscBest(id,e){if(e)e.stopPropagation();S.discBest=S.discBest===id?null:id;renderPT();}

function renderPT(){
if(S.ptDone){document.getElementById('pt-content').innerHTML=`
<div class="card success-state"><div class="success-emoji">🎯</div><h2>Your idea is live!</h2><p>Your startup idea has been posted to the community. Founding members and problem facers can now challenge your assumptions, identify logical flaws, and help strengthen your thinking.</p><div class="success-ctas"><button class="btn btn-teal" onclick="go('board')">Explore Problem Board</button><button class="btn btn-ghost" onclick="S.ptDone=false;S.pt={title:'',desc:'',target:'',problem:'',assumptions:'',feedbackTypes:[],rewardType:'',rewardAmount:'',rewardMsg:''};S.discVotes={};S.discBest=null;renderPT();">Post Another Idea</button></div></div>`;return;}

const f=S.pt;
const fbOpts=[
  ['flaws','🔍','Find logical flaws'],
  ['assumptions','🤔','Challenge assumptions'],
  ['improvements','💡','Suggest improvements'],
  ['experience','🌍','Share real-world experience']
];
const fbHTML=fbOpts.map(([k,e,l])=>{
  const a=f.feedbackTypes.includes(k)?'active':'';
  return`<div class="fb-opt ${a}" onclick="toggleFBType('${k}')"><span class="fb-check">${a?chk():''}</span><span class="fb-emoji">${e}</span>${l}</div>`;
}).join('');

const rewardOpts=['Cash reward','Gift card','Platform points','No reward'].map(r=>`<option value="${r}" ${f.rewardType===r?'selected':''}>${r}</option>`).join('');

// Discussion preview data
const exComments=[
  {id:'d1',name:'Sarah M.',initials:'SM',time:'2 hours ago',text:'Your assumption that small business owners will switch from spreadsheets assumes low switching cost — but their bookkeepers are trained on Excel. Have you talked to any bookkeepers about this?',votes:12,type:'flaw'},
  {id:'d2',name:'Raj P.',initials:'RP',time:'5 hours ago',text:'I ran a similar SaaS for freelancers in 2022. The biggest challenge wasn\'t the product — it was getting people to trust a new tool with their financial data. Trust-building took us 6 months longer than expected.',votes:24,type:'experience'},
  {id:'d3',name:'Mika T.',initials:'MT',time:'1 day ago',text:'Instead of building a full invoicing platform, what if you started with just the "overdue payment reminder" feature? That\'s the moment of highest pain and you could validate with a simple email tool.',votes:31,type:'improvement'}
];

const discHTML=exComments.map(c=>{
  const dv=S.discVotes[c.id];
  const isBest=S.discBest===c.id;
  const typeLabel=c.type==='flaw'?'🔍 Logical flaw':c.type==='experience'?'🌍 Real experience':'💡 Improvement';
  return`<div class="disc-card">
    <div class="disc-top">
      <div class="disc-user"><span class="av-sm ${c.type==='flaw'?'av-coral':'av-teal'}">${c.initials}</span><span class="disc-name">${c.name}</span><span class="tag" style="font-size:10px">${typeLabel}</span></div>
      <span class="disc-time">${c.time}</span>
    </div>
    <div class="disc-text">${c.text}</div>
    <div class="disc-actions">
      <button class="disc-upvote ${dv?'voted':''}" onclick="toggleDiscVote('${c.id}',event)">
        <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M7 2L12 9H2L7 2Z" fill="${dv?'var(--teal)':'#9CA3AF'}"/></svg>
        ${dv?c.votes+1:c.votes}
      </button>
      <button class="disc-best ${isBest?'marked':''}" onclick="toggleDiscBest('${c.id}',event)">${isBest?'⭐ Best Feedback':'☆ Mark as Best'}</button>
      ${isBest?'<span class="disc-best-badge">🏆 Best Feedback</span>':''}
    </div>
  </div>`;
}).join('');

document.getElementById('pt-content').innerHTML=`
<div class="pt-header">
  <span class="pt-icon">🎯</span>
  <h1 class="pt-heading">Pressure Test Your <span class="hl">Startup Idea</span></h1>
  <p class="pt-sub">Post your idea and invite others to challenge your assumptions, find weaknesses, and suggest improvements. The best ideas survive scrutiny.</p>
</div>

<!-- Section 1: Idea Submission -->
<div class="pt-section">
  <div class="pt-section-header"><span class="pt-section-num">1</span><span class="pt-section-title">Your Startup Idea</span></div>
  <div class="card form-card">
    <div class="form-field"><label class="form-label">Idea Title</label><input class="form-input" value="${f.title}" oninput="S.pt.title=this.value" placeholder="e.g. AI-powered invoice tracker for freelancers"></div>
    <div class="form-field"><label class="form-label">Short Idea Description</label><textarea class="form-input" rows="3" oninput="S.pt.desc=this.value" placeholder="Explain your startup idea in 2–3 sentences. What does it do and why does it matter?">${f.desc}</textarea></div>
    <div class="form-field"><label class="form-label">Target Users</label><input class="form-input" value="${f.target}" oninput="S.pt.target=this.value" placeholder="Who will use this product? Be specific about the audience."></div>
    <div class="form-field"><label class="form-label">Problem Being Solved</label><textarea class="form-input" rows="2" oninput="S.pt.problem=this.value" placeholder="What problem are you trying to solve? Why is the current situation painful?">${f.problem}</textarea></div>
    <div class="form-field"><label class="form-label">Your Current Assumptions</label><textarea class="form-input" rows="3" oninput="S.pt.assumptions=this.value" placeholder="What do you believe is true about this problem and your solution? Be honest — these are what people will challenge.">${f.assumptions}</textarea></div>
    <div class="form-field">
      <label class="form-label">What kind of feedback are you looking for?</label>
      <div class="fb-options">${fbHTML}</div>
    </div>
  </div>
</div>

<!-- Section 2: Bounty -->
<div class="pt-section">
  <div class="pt-section-header"><span class="pt-section-num">2</span><span class="pt-section-title">Optional Reward</span></div>
  <div class="bounty-card">
    <div class="bounty-header"><span class="bounty-badge">🏆 Bounty</span></div>
    <div class="bounty-title">Offer a Reward for the Best Insight</div>
    <div class="bounty-desc">"The most insightful comment that genuinely challenges my idea wins the reward. Looking for honesty, not flattery."</div>
    <div class="bounty-row">
      <div class="form-field" style="margin-bottom:0"><label class="form-label">Reward Type</label><select class="form-input" onchange="S.pt.rewardType=this.value"><option value="">Select reward…</option>${rewardOpts}</select></div>
      <div class="form-field" style="margin-bottom:0"><label class="form-label">Amount (optional)</label><input class="form-input" value="${f.rewardAmount}" oninput="S.pt.rewardAmount=this.value" placeholder="e.g. $25, 500 points"></div>
    </div>
  </div>
</div>

<!-- Section 3: Discussion Preview -->
<div class="pt-section">
  <div class="pt-section-header"><span class="pt-section-num">3</span><span class="pt-section-title">What Feedback Looks Like</span></div>
  <div class="disc-preview">
    <span class="disc-label">💬 Example Discussion</span>
    <p style="font-size:13px;color:var(--t3);margin-bottom:14px;line-height:1.55">Here's what happens after you post — real people challenge your thinking with specific, actionable feedback.</p>
    ${discHTML}
  </div>
</div>

<!-- Section 4: Tips -->
<div class="pt-section">
  <div class="tips-box">
    <div class="tips-title">💡 How to Get Better Feedback</div>
    <ul class="tips-list">
      <li><span class="tip-icon tip-teal">🎯</span><span><strong>Be brutally clear about your assumptions.</strong> The more specific you are about what you believe, the easier it is for people to challenge those beliefs constructively.</span></li>
      <li><span class="tip-icon tip-coral">🙏</span><span><strong>Invite criticism, not praise.</strong> Ask "what am I wrong about?" instead of "what do you think?" You'll get much more useful responses.</span></li>
      <li><span class="tip-icon tip-teal">❓</span><span><strong>Ask specific questions.</strong> Instead of "is this a good idea?", try "would a freelancer switch from their spreadsheet to this tool? Why or why not?"</span></li>
      <li><span class="tip-icon tip-coral">🏆</span><span><strong>Offer a reward.</strong> A small bounty attracts deeper, more thoughtful insights. People take the time when they know their feedback is valued.</span></li>
    </ul>
  </div>
</div>

<!-- Submit -->
<button class="btn btn-teal btn-full btn-lg" style="opacity:${f.title.trim()&&f.desc.trim()?'1':'0.5'};margin-top:8px" onclick="if(S.pt.title.trim()&&S.pt.desc.trim()){dbSaveIdea(S.pt);S.ptDone=true;renderPT();}">🎯 Submit for Pressure Testing →</button>
<p style="text-align:center;font-size:13px;color:var(--t3);margin-top:10px">Your idea will be visible to the community for feedback and discussion.</p>
`;}

function renderCO(){
const c=S.co;
const step=S.coStep;

const stepsHTML=`<div class="checkout-steps">
  <div class="checkout-step ${step==='form'?'active':step==='processing'||step==='done'?'done':''}"><span class="checkout-step-dot">${step==='form'?'1':chk()}</span>Payment</div>
  <div class="checkout-divider" style="background:${step==='processing'||step==='done'?'var(--teal)':'var(--brd)'}"></div>
  <div class="checkout-step ${step==='processing'?'active':step==='done'?'done':''}"><span class="checkout-step-dot">${step==='done'?chk():'2'}</span>Confirm</div>
  <div class="checkout-divider" style="background:${step==='done'?'var(--teal)':'var(--brd)'}"></div>
  <div class="checkout-step ${step==='done'?'active':''}"><span class="checkout-step-dot">3</span>Access</div>
</div>`;

const summaryHTML=`<div class="checkout-summary">
  <div class="checkout-item"><div class="checkout-item-ico">P</div><div><div class="checkout-item-name">Early Founder Access</div><div class="checkout-item-desc">Lifetime founding member</div></div></div>
  <div class="checkout-price">$5</div>
</div>`;

if(step==='form'){
document.getElementById('checkout-content').innerHTML=`
  <button class="back-btn" onclick="go('landing')" style="color:var(--teal);font-size:14px;font-weight:700;margin-bottom:20px;display:flex;align-items:center;gap:6px;padding:0">← Back</button>
  <h2 class="page-heading" style="text-align:center">🔓 Complete Your Early Access</h2>
  <p class="page-sub" style="text-align:center;max-width:400px;margin:0 auto 24px">Become a founding member. One-time payment, lifetime early access.</p>
  ${stepsHTML}
  ${summaryHTML}
  <div class="card checkout-form-card">
    <div class="form-field"><label class="form-label">Full Name</label><input class="form-input" value="${c.name}" oninput="S.co.name=this.value" placeholder="Jane Doe"></div>
    <div class="form-field"><label class="form-label">Email Address</label><input class="form-input" type="email" value="${c.email}" oninput="S.co.email=this.value" placeholder="jane@startup.com"></div>
    <div class="checkout-divider-line"></div>
    <div class="form-field"><label class="form-label">Card Number</label><div class="card-input-mock"><input class="form-input" value="${c.card}" oninput="S.co.card=this.value" placeholder="4242 4242 4242 4242" maxlength="19"><div class="card-icons"><span class="card-icon card-visa">VISA</span><span class="card-icon card-mc">MC</span></div></div></div>
    <div class="checkout-row">
      <div class="form-field"><label class="form-label">Expiry</label><input class="form-input" value="${c.exp}" oninput="S.co.exp=this.value" placeholder="MM / YY" maxlength="7"></div>
      <div class="form-field"><label class="form-label">CVC</label><input class="form-input" value="${c.cvc}" oninput="S.co.cvc=this.value" placeholder="123" maxlength="4"></div>
    </div>
    <button class="btn btn-teal btn-full btn-lg" style="margin-top:8px;opacity:${c.name.trim()&&c.email.trim()?'1':'0.5'}" onclick="if(S.co.name.trim()&&S.co.email.trim()){dbSaveSignup(S.co.name,S.co.email,'checkout');S.coStep='processing';renderCO();setTimeout(()=>{S.coStep='done';renderCO();},2200);}">🔒 Pay $5 — Join Early Access</button>
    <p style="text-align:center;font-size:11px;color:var(--t3);margin-top:10px">🔒 Secure simulated checkout · No real charge</p>
  </div>`;
} else if(step==='processing'){
document.getElementById('checkout-content').innerHTML=`
  ${stepsHTML}
  ${summaryHTML}
  <div class="card"><div class="checkout-processing">
    <div class="spinner"></div>
    <div class="processing-text">Processing your access...</div>
    <div class="processing-sub">This is a simulated checkout to test willingness to pay.</div>
  </div></div>`;
} else if(step==='done'){
document.getElementById('checkout-content').innerHTML=`
  ${stepsHTML}
  <div class="card confirm-card">
    <div class="confirm-check"><svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M8 16l5 5L24 10" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
    <h2>Welcome aboard! 🎉</h2>
    <p>You're now a founding member of problemfirst. You have full early access to explore validated problems, post your startup ideas for pressure testing, and connect directly with potential users.</p>
    <div class="confirm-details">
      <div class="confirm-row"><span class="confirm-row-label">Plan</span><span class="confirm-row-val">Early Founder Access</span></div>
      <div class="confirm-row"><span class="confirm-row-label">Amount</span><span class="confirm-row-val">$5.00 (one-time)</span></div>
      <div class="confirm-row"><span class="confirm-row-label">Member</span><span class="confirm-row-val">${c.name||'Founding Member'}</span></div>
      <div class="confirm-row"><span class="confirm-row-label">Status</span><span class="confirm-row-val" style="color:var(--teal)">✓ Active</span></div>
    </div>
    <div class="confirm-note">💡 This was a simulated transaction to validate our revenue model. No real payment was processed. Your willingness to pay is the most valuable signal we can receive — thank you.</div>
    <div class="success-ctas">
      <button class="btn btn-teal" onclick="go('board')">🔍 Explore Problem Board</button>
      <button class="btn btn-coral" onclick="go('pressuretest')">🎯 Pressure Test an Idea</button>
      <button class="btn btn-ghost" onclick="go('landing')">← Back to Home</button>
    </div>
  </div>`;
}
}

function initReveal(){setTimeout(()=>{const o=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:.1,rootMargin:'0px 0px -30px 0px'});document.querySelectorAll('#page-landing .reveal').forEach(el=>{el.classList.remove('visible');o.observe(el);});},50);}
document.addEventListener('DOMContentLoaded',()=>{initReveal();});
