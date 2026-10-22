const PDF = 'assets/isd-mun-2026-research-papers.pdf';

const committees = [
  {
    id: 'sc', code: 'SC', name: 'United Nations Security Council',
    chair: { name: 'Afreen Shariff', school: 'Aga Khan', role: 'President / Chair' },
    deputy: { name: 'Amaan Riyaz Sherif', school: 'Al Muntazir', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 2, officer: 'Afreen', title: 'Examining the Legitimacy, Scope, and Limitations of International Intervention in Sovereign States for the Protection of Civilians' },
      { n: 'II', page: 6, officer: 'Amaan Riyaz Sherif', title: 'Safeguarding Freedom of Navigation in Strategic Maritime Chokepoints: Balancing National Security, International Law, and the Prevention of Regional Escalation' }
    ]
  },
  {
    id: 'pc', code: 'PC', name: 'Political Council',
    chair: { name: 'Abdullah bin Imran', school: 'Aga Khan', role: 'President / Chair' },
    deputy: { name: 'Katalina Nalwadda', school: 'Braeburn', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 26, officer: 'Abdullah Bin Imran', title: 'Redefining the Legitimacy of Political and Economic Pressure in International Relations' },
      { n: 'II', page: 28, officer: 'Katalina Nalwadda', title: 'Regulating the Growing Influence of Private Technology Companies in National Governance and Security' }
    ]
  },
  {
    id: 'hrc1', code: 'HRC I', name: 'Human Rights Council I',
    chair: { name: 'Elinkunde Akyoo', school: 'Braeburn', role: 'President / Chair' },
    deputy: { name: 'Krishiv Patel', school: 'Aga Khan', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 55, officer: 'Elinkunde Akyoo / Krishiv Patel', title: 'Balancing the Right to Peaceful Assembly and Freedom of Expression with National Security Imperatives in an Increasingly Volatile Global Environment' },
      { n: 'II', page: 57, officer: 'Elinkunde Akyoo / Krishiv Patel', title: 'Safeguarding Freedom of Expression in the Digital Age: Countering Disinformation Without Undermining Independent Journalism and Civil Liberties' }
    ]
  },
  {
    id: 'hrc2', code: 'HRC II', name: 'Human Rights Council II',
    chair: { name: 'Joan Mahamba', school: 'HOPAC', role: 'President / Chair' },
    deputy: { name: 'Omya Marwaha', school: 'ISD', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 60, officer: 'Joan Mahamba', title: 'Balancing the Right to Peaceful Assembly and Freedom of Expression with National Security Imperatives in an Increasingly Volatile Global Environment' },
      { n: 'II', page: 64, officer: 'Joan Mahamba', title: 'Safeguarding Freedom of Expression in the Digital Age: Countering Disinformation Without Undermining Independent Journalism and Civil Liberties' }
    ]
  },
  {
    id: 'specpol', code: 'SPECPOL', name: 'Special Political and Decolonization Committee',
    chair: { name: 'Ali Akbar Moledina', school: 'Al Muntazir', role: 'President / Chair' },
    deputy: { name: 'Liyaan Tanveer Karbelkar', school: 'Al Muntazir', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 30, officer: 'Aliakbar Moledina', title: 'Examining the Principles of Self-Determination and the Political Status of Non-Self-Governing Territories in the Contemporary International Order' },
      { n: 'II', page: 33, officer: 'Liyaan Karbelkar', title: 'Addressing the Unresolved Question of Self-Determination in Western Sahara and the Role of the United Nations' }
    ]
  },
  {
    id: 'ecofin1', code: 'ECOFIN I', name: 'Economic and Financial Committee I',
    chair: { name: 'Ansh Sareen', school: 'ISD', role: 'President / Chair' },
    deputy: { name: 'Saweera Muhammad Tahir', school: 'Al Muntazir', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 11, officer: 'Ansh Sareen', title: 'Evaluating the Need for Comprehensive Reform of International Sovereign Debt Mechanisms to Address Debt Vulnerability in Developing Economies' },
      { n: 'II', page: 15, officer: 'Saweera Muhammad Tahir', title: 'Addressing the Global Housing Affordability Crisis: Expanding Access to Affordable Housing While Managing Household Debt and Financial Stability Risks' }
    ]
  },
  {
    id: 'ecofin2', code: 'ECOFIN II', name: 'Economic and Financial Committee II',
    chair: { name: 'Bernadette Bakilana', school: 'HOPAC', role: 'President / Chair' },
    deputy: { name: 'Pujhita Sri', school: 'ISD', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 18, officer: 'Bernadette Bakilana', title: 'Addressing the Global Housing Affordability Crisis: Expanding Access to Affordable Housing While Managing Household Debt and Financial Stability Risks' },
      { n: 'II', page: 23, officer: 'Pujitha Shri.H', title: 'Evaluating the Need for Comprehensive Reform of International Sovereign Debt Mechanisms to Address Debt Vulnerability in Developing Economies' }
    ]
  },
  {
    id: 'ecosoc', code: 'ECOSOC', name: 'Economic and Social Council',
    chair: { name: 'Hassan Harunani', school: 'Al Muntazir', role: 'President / Chair' },
    deputy: { name: 'Vyan Kumar', school: 'Aga Khan', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 42, officer: '', title: 'Addressing Global Youth Unemployment and Skills Inequality Amidst Rapid Automation and the Transformation of the Global Labour Market' },
      { n: 'II', page: 49, officer: 'Hassan Harunani', title: 'Evaluating the Responsibility of Developed Nations to Finance Climate Adaptation and Resilience in Vulnerable Developing Countries' }
    ]
  }
];

const councilTopics = [
  { code: 'SECURITY COUNCIL', topics: [committees[0].papers[0].title, committees[0].papers[1].title] },
  { code: 'ECOFIN', topics: [committees[5].papers[0].title, committees[5].papers[1].title] },
  { code: 'ECOSOC', topics: [committees[7].papers[0].title, committees[7].papers[1].title] },
  { code: 'SPECPOL', topics: [committees[4].papers[0].title, committees[4].papers[1].title] },
  { code: 'HRC', topics: [committees[2].papers[0].title, committees[2].papers[1].title] },
  { code: 'POLITICAL COUNCIL', topics: [committees[1].papers[0].title, committees[1].papers[1].title] }
];

const allChairs = committees.flatMap(c => [
  { ...c.chair, committee: c.code },
  { ...c.deputy, committee: c.code }
]);

const allPapers = committees.flatMap(c => c.papers.map(p => ({ ...p, committee: c.code, committeeName: c.name })));

const teamHeads = [
  { name: 'Akilesh Balasubramaniyan', role: 'Secretary-General', image: 'assets/team-08-akilesh-bala.jpg', position: 'center 22%' },
  { name: 'Shresth Sharma', role: 'Deputy Secretary-General', image: 'assets/team-07-shresth-sharma.jpg', position: 'center 20%' },
  { name: 'Devan Prajapati', role: 'Admin', image: 'assets/team-01-devan-prajapati.jpg', position: 'center 16%' },
  { name: 'Dhruv Vadodaria', role: 'Admin', image: 'assets/team-02-dhruv-vadodaria.jpg', position: 'center 18%' },
  { name: 'Joana Jestin', role: 'Creative Head', image: 'assets/team-03-joana-jestin.jpg', position: 'center 24%' },
  { name: 'Mishthi Sharma', role: 'Head of Delegate Affairs', image: 'assets/team-04-mishthi-sharma.jpg', position: 'center 20%' },
  { name: 'Krisha Patel', role: 'Head of Hospitality', image: 'assets/team-05-krisha-patel.jpg', position: 'center 18%' },
  { name: 'Suhrad Jobanputra', role: 'Head of Tech & Media', image: 'assets/team-06-suhrad-jobanputra.jpg', position: 'center 18%' },
  { name: 'Sanskriti Sharma', role: 'Head of Logistics', image: 'assets/team-09-sanskriti-sharma.jpg', position: 'center 16%' }
];


const safe = value => String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
const pdfUrl = page => `${PDF}#page=${page}`;

function renderCommittees() {
  const grid = document.getElementById('committeeGrid');
  grid.innerHTML = committees.map((c, i) => `
    <article class="committee-card reveal" data-index="${String(i + 1).padStart(2, '0')}">
      <span class="code">${safe(c.code)}</span>
      <h3>${safe(c.name)}</h3>
      <p><strong>${safe(c.chair.name)}</strong> · ${safe(c.chair.school)}<br><strong>${safe(c.deputy.name)}</strong> · ${safe(c.deputy.school)}</p>
      <button type="button" data-open="${safe(c.id)}">View committee →</button>
    </article>`).join('');

  grid.addEventListener('click', e => {
    const button = e.target.closest('[data-open]');
    if (!button) return;
    openCommittee(button.dataset.open);
  });
}

function openCommittee(id) {
  const c = committees.find(x => x.id === id);
  if (!c) return;
  const body = document.getElementById('modalBody');
  body.innerHTML = `
    <span class="modal-code">${safe(c.code)}</span>
    <h2>${safe(c.name)}</h2>
    <div class="modal-officers">
      ${[c.chair, c.deputy].map(o => `<div class="modal-officer"><strong>${safe(o.name)}</strong><span>${safe(o.role)} · ${safe(o.school)}</span></div>`).join('')}
    </div>
    ${c.papers.map(p => `<section class="modal-topic">
      <span class="topic-number">Topic / Research paper ${safe(p.n)}</span>
      <h3>${safe(p.title)}</h3>
      ${p.officer ? `<p class="modal-paper-officer">Student officer(s): ${safe(p.officer)}</p>` : ''}
      <a class="btn secondary" href="${pdfUrl(p.page)}" target="_blank" rel="noreferrer">Open paper · page ${p.page} ↗</a>
    </section>`).join('')}`;
  document.getElementById('committeeModal').showModal();
}

function renderChairs() {
  const q = document.getElementById('chairSearch').value.trim().toLowerCase();
  const role = document.getElementById('chairRole').value;
  const filtered = allChairs.filter(x => {
    const text = `${x.name} ${x.school} ${x.committee} ${x.role}`.toLowerCase();
    return (!q || text.includes(q)) && (role === 'all' || x.role === role);
  });
  const grid = document.getElementById('chairGrid');
  grid.innerHTML = filtered.length ? filtered.map(x => `
    <article class="chair-card">
      <span class="role">${safe(x.role)}</span>
      <h3>${safe(x.name)}</h3>
      <div class="meta">${safe(x.committee)} · ${safe(x.school)}</div>
    </article>`).join('') : '<div class="empty">No student officers match your search.</div>';
}



function renderTeamHeads() {
  const grid = document.getElementById('teamGrid');
  if (!grid) return;
  grid.innerHTML = teamHeads.map(person => `
    <article class="team-card reveal">
      <div class="team-photo-wrap"><img class="team-photo" src="${safe(person.image)}" alt="${safe(person.name)} — ${safe(person.role)}" loading="lazy" style="object-position:${safe(person.position || 'center')}" /></div>
      <div class="team-copy">
        <span class="team-role">${safe(person.role)}</span>
        <h3>${safe(person.name)}</h3>
      </div>
    </article>`).join('');
}

function renderTopics() {
  document.getElementById('topicsGrid').innerHTML = councilTopics.map((group, index) => `
    <article class="topic-card reveal">
      <div class="topic-index">${String(index + 1).padStart(2, '0')}</div>
      <h3>${safe(group.code)}</h3>
      <ol>${group.topics.map(topic => `<li>${safe(topic)}</li>`).join('')}</ol>
    </article>`).join('');
}

function setupResearchFilter() {
  const select = document.getElementById('committeeFilter');
  select.innerHTML = '<option value="all">All committees</option>' + committees.map(c => `<option value="${safe(c.code)}">${safe(c.code)} — ${safe(c.name)}</option>`).join('');
}

function renderResearch() {
  const q = document.getElementById('researchSearch').value.trim().toLowerCase();
  const committee = document.getElementById('committeeFilter').value;
  const filtered = allPapers.filter(p => {
    const text = `${p.title} ${p.committee} ${p.committeeName} ${p.officer}`.toLowerCase();
    return (!q || text.includes(q)) && (committee === 'all' || p.committee === committee);
  });
  document.getElementById('researchCount').textContent = `${filtered.length} of ${allPapers.length} papers shown`;
  document.getElementById('researchList').innerHTML = filtered.length ? filtered.map(p => `
    <article class="paper">
      <div class="paper-meta"><strong>${safe(p.committee)}</strong><span>Paper ${safe(p.n)} · page ${p.page}</span></div>
      <div><h3>${safe(p.title)}</h3>${p.officer ? `<div class="officer">Student officer(s): ${safe(p.officer)}</div>` : ''}</div>
      <div class="paper-actions"><a class="btn primary" href="${pdfUrl(p.page)}" target="_blank" rel="noreferrer">Open PDF ↗</a></div>
    </article>`).join('') : '<div class="empty">No papers match your search.</div>';
}

function setupNavigation() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function setupBackToTop() {
  const button = document.getElementById('backToTop');
  if (!button) return;
  button.addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  });
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(x => x.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  items.forEach(x => obs.observe(x));
}



const gossipCouncils = committees.map(c => ({ id: c.id, code: c.code, name: c.name }));
let activeGossipCouncil = null;

function renderGossipBoxes() {
  const grid = document.getElementById('gossipGrid');
  if (!grid) return;
  grid.innerHTML = gossipCouncils.map(c => `
    <button type="button" class="gossip-card reveal" data-gossip-council="${safe(c.id)}" aria-label="Open ${safe(c.name)} gossip box">
      <span class="gossip-icon" aria-hidden="true">✉</span>
      <span class="gossip-code">${safe(c.code)}</span>
      <h3>${safe(c.name)}</h3>
      <p>Anonymous council message box</p>
      <span class="gossip-open">Open box →</span>
    </button>`).join('');

  grid.addEventListener('click', e => {
    const card = e.target.closest('[data-gossip-council]');
    if (!card) return;
    openGossipBox(card.dataset.gossipCouncil);
  });
}

function setStatus(el, message = '', type = '') {
  if (!el) return;
  el.textContent = message;
  el.classList.remove('success', 'error');
  if (type) el.classList.add(type);
}

function openGossipBox(id) {
  const council = gossipCouncils.find(c => c.id === id);
  if (!council) return;
  activeGossipCouncil = council;
  document.getElementById('gossipCouncilCode').textContent = council.code;
  document.getElementById('gossipCouncilName').textContent = `${council.name} Gossip Box`;
  document.getElementById('gossipMessage').value = '';
  document.getElementById('gossipPassword').value = '';
  document.getElementById('gossipCharCount').textContent = '0 / 1000';
  document.getElementById('gossipReadForm').hidden = true;
  document.getElementById('gossipMessages').hidden = true;
  document.getElementById('gossipMessages').innerHTML = '';
  setStatus(document.getElementById('gossipSubmitStatus'));
  setStatus(document.getElementById('gossipReadStatus'));
  document.getElementById('gossipModal').showModal();
}

async function submitGossip(event) {
  event.preventDefault();
  if (!activeGossipCouncil) return;
  const messageEl = document.getElementById('gossipMessage');
  const status = document.getElementById('gossipSubmitStatus');
  const button = document.getElementById('gossipSendButton');
  const message = messageEl.value.trim();
  if (message.length < 3) {
    setStatus(status, 'Please enter at least 3 characters.', 'error');
    return;
  }
  button.disabled = true;
  button.textContent = 'Sending…';
  setStatus(status, '');
  try {
    const res = await fetch('/api/gossip-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ council: activeGossipCouncil.id, message })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Could not send the message.');
    messageEl.value = '';
    document.getElementById('gossipCharCount').textContent = '0 / 1000';
    setStatus(status, 'Sent anonymously to this council’s box ✓', 'success');
  } catch (err) {
    setStatus(status, err.message || 'Could not send the message.', 'error');
  } finally {
    button.disabled = false;
    button.textContent = 'Send to the box';
  }
}

async function readGossip(event) {
  event.preventDefault();
  if (!activeGossipCouncil) return;
  const password = document.getElementById('gossipPassword').value;
  const status = document.getElementById('gossipReadStatus');
  const button = document.getElementById('gossipUnlockButton');
  const messagesEl = document.getElementById('gossipMessages');
  button.disabled = true;
  button.textContent = 'Checking…';
  setStatus(status, '');
  messagesEl.hidden = true;
  try {
    const res = await fetch('/api/gossip-read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ council: activeGossipCouncil.id, password })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Unable to unlock this box.');
    setStatus(status, 'Box unlocked ✓', 'success');
    renderGossipMessages(data.messages || []);
    document.getElementById('gossipPassword').value = '';
  } catch (err) {
    setStatus(status, err.message || 'Unable to unlock this box.', 'error');
  } finally {
    button.disabled = false;
    button.textContent = 'Unlock';
  }
}

function renderGossipMessages(messages) {
  const el = document.getElementById('gossipMessages');
  el.hidden = false;
  if (!messages.length) {
    el.innerHTML = '<div class="gossip-empty">No messages in this box yet.</div>';
    return;
  }
  const rows = messages.map(item =>
    `<article class="gossip-message"><p>${safe(item.message)}</p></article>`
  ).join('');
  el.innerHTML = `<div class="gossip-messages-head"><strong>${messages.length} message${messages.length === 1 ? '' : 's'}</strong><span>Newest first</span></div>${rows}`;
}

function setupGossip() {
  const modal = document.getElementById('gossipModal');
  if (!modal) return;
  document.getElementById('gossipModalClose').addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
  document.getElementById('gossipSubmitForm').addEventListener('submit', submitGossip);
  document.getElementById('gossipReadForm').addEventListener('submit', readGossip);
  document.getElementById('gossipMessage').addEventListener('input', e => {
    document.getElementById('gossipCharCount').textContent = `${e.target.value.length} / 1000`;
  });
  document.getElementById('gossipReadToggle').addEventListener('click', () => {
    const form = document.getElementById('gossipReadForm');
    form.hidden = !form.hidden;
    if (!form.hidden) document.getElementById('gossipPassword').focus();
  });
}


renderCommittees();
renderTeamHeads();
renderGossipBoxes();
renderTopics();
setupResearchFilter();
renderChairs();
renderResearch();
setupNavigation();
setupGossip();
setupBackToTop();
setupReveal();

document.getElementById('chairSearch').addEventListener('input', renderChairs);
document.getElementById('chairRole').addEventListener('change', renderChairs);
document.getElementById('researchSearch').addEventListener('input', renderResearch);
document.getElementById('committeeFilter').addEventListener('change', renderResearch);
document.getElementById('modalClose').addEventListener('click', () => document.getElementById('committeeModal').close());
document.getElementById('committeeModal').addEventListener('click', e => {
  const modal = e.currentTarget;
  if (e.target === modal) modal.close();
});


window.delall = async function(password) {
  const response = await fetch('/api/gossip-clear-all', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command: `delall:${String(password || '')}` })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error || 'Could not clear the gossip boxes.';
    console.error(message);
    return { ok: false, error: message };
  }
  console.log('All gossip boxes cleared.');
  return data;
};

window.readall = async function(password) {
  const response = await fetch('/api/gossip-read-all', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: String(password || '') })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error || 'Could not read all gossip boxes.';
    console.error(message);
    return { ok: false, error: message };
  }

  const rows = [];
  for (const box of data.boxes || []) {
    for (const message of box.messages || []) rows.push({ Council: box.label, Message: message });
  }

  if (rows.length) console.table(rows);
  else console.log('No gossip messages in any council box.');
  console.log(`Total gossip messages: ${data.total || 0}`);
  return data;
};
