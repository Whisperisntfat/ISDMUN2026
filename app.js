const PDF = 'assets/isd-mun-2026-research-papers.pdf';

const committees = [
  {
    id: 'sc', code: 'SC', name: 'United Nations Security Council',
    chair: { name: 'Afreen Shariff', school: 'The Aga Khan Mzizima Secondary School', role: 'President / Chair' },
    deputy: { name: 'Amaan Riyaz Sherif', school: 'Al Muntazir Islamic International School', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 2, officer: 'Afreen', title: 'Examining the Legitimacy, Scope, and Limitations of International Intervention in Sovereign States for the Protection of Civilians' },
      { n: 'II', page: 6, officer: 'Amaan Riyaz Sherif', title: 'Safeguarding Freedom of Navigation in Strategic Maritime Chokepoints: Balancing National Security, International Law, and the Prevention of Regional Escalation' }
    ]
  },
  {
    id: 'pc', code: 'PC', name: 'Political Council',
    chair: { name: 'Abdullah bin Imran', school: 'The Aga Khan Mzizima Secondary School', role: 'President / Chair' },
    deputy: { name: 'Katalina Nalwadda', school: 'Braeburn Dar es Salaam International School', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 26, officer: 'Abdullah Bin Imran', title: 'Redefining the Legitimacy of Political and Economic Pressure in International Relations' },
      { n: 'II', page: 28, officer: 'Katalina Nalwadda', title: 'Regulating the Growing Influence of Private Technology Companies in National Governance and Security' }
    ]
  },
  {
    id: 'hrc1', code: 'HRC I', name: 'Human Rights Council I',
    chair: { name: 'Elinkunde Akyoo', school: 'Braeburn Dar es Salaam International School', role: 'President / Chair' },
    deputy: { name: 'Krishiv Patel', school: 'The Aga Khan Mzizima Secondary School', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 55, officer: 'Elinkunde Akyoo / Krishiv Patel', title: 'Balancing the Right to Peaceful Assembly and Freedom of Expression with National Security Imperatives in an Increasingly Volatile Global Environment' },
      { n: 'II', page: 57, officer: 'Elinkunde Akyoo / Krishiv Patel', title: 'Safeguarding Freedom of Expression in the Digital Age: Countering Disinformation Without Undermining Independent Journalism and Civil Liberties' }
    ]
  },
  {
    id: 'hrc2', code: 'HRC II', name: 'Human Rights Council II',
    chair: { name: 'Joan Mahamba', school: 'Haven of Peace Academy', role: 'President / Chair' },
    deputy: { name: 'Omya Marwaha', school: 'Indian School Dar es Salaam', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 60, officer: 'Joan Mahamba', title: 'Balancing the Right to Peaceful Assembly and Freedom of Expression with National Security Imperatives in an Increasingly Volatile Global Environment' },
      { n: 'II', page: 64, officer: 'Joan Mahamba', title: 'Safeguarding Freedom of Expression in the Digital Age: Countering Disinformation Without Undermining Independent Journalism and Civil Liberties' }
    ]
  },
  {
    id: 'specpol', code: 'SPECPOL', name: 'Special Political and Decolonization Committee',
    chair: { name: 'Ali Akbar Moledina', school: 'Al Muntazir Islamic International School', role: 'President / Chair' },
    deputy: { name: 'Liyaan Tanveer Karbelkar', school: 'Al Muntazir Islamic International School', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 30, officer: 'Aliakbar Moledina', title: 'Examining the Principles of Self-Determination and the Political Status of Non-Self-Governing Territories in the Contemporary International Order' },
      { n: 'II', page: 33, officer: 'Liyaan Karbelkar', title: 'Addressing the Unresolved Question of Self-Determination in Western Sahara and the Role of the United Nations' }
    ]
  },
  {
    id: 'ecofin1', code: 'ECOFIN I', name: 'Economic and Financial Committee I',
    chair: { name: 'Ansh Sareen', school: 'Indian School Dar es Salaam', role: 'President / Chair' },
    deputy: { name: 'Saweera Muhammad Tahir', school: 'Al Muntazir Islamic International School', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 11, officer: 'Ansh Sareen', title: 'Evaluating the Need for Comprehensive Reform of International Sovereign Debt Mechanisms to Address Debt Vulnerability in Developing Economies' },
      { n: 'II', page: 15, officer: 'Saweera Muhammad Tahir', title: 'Addressing the Global Housing Affordability Crisis: Expanding Access to Affordable Housing While Managing Household Debt and Financial Stability Risks' }
    ]
  },
  {
    id: 'ecofin2', code: 'ECOFIN II', name: 'Economic and Financial Committee II',
    chair: { name: 'Bernadette Bakilana', school: 'Haven of Peace Academy', role: 'President / Chair' },
    deputy: { name: 'Pujhita Sri', school: 'Indian School Dar es Salaam', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 18, officer: 'Bernadette Bakilana', title: 'Addressing the Global Housing Affordability Crisis: Expanding Access to Affordable Housing While Managing Household Debt and Financial Stability Risks' },
      { n: 'II', page: 23, officer: 'Pujitha Shri.H', title: 'Evaluating the Need for Comprehensive Reform of International Sovereign Debt Mechanisms to Address Debt Vulnerability in Developing Economies' }
    ]
  },
  {
    id: 'ecosoc', code: 'ECOSOC', name: 'Economic and Social Council',
    chair: { name: 'Hassan Harunani', school: 'Al Muntazir Islamic International School', role: 'President / Chair' },
    deputy: { name: 'Vyan Kumar', school: 'The Aga Khan Mzizima Secondary School', role: 'Deputy Chair' },
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
  { name: 'Akilesh Balasubramaniyan', role: 'Secretary-General', image: 'assets/team-08-akilesh-balasubramaniyan.jpg', position: 'center 22%' },
  { name: 'Shresth Sharma', role: 'Deputy Secretary-General', image: 'assets/team-07-shresth-sharma.jpg', position: 'center 20%' },
  { name: 'Devan Prajapati', role: 'Admin', image: 'assets/team-01-devan-prajapati.jpg', position: 'center top', scale: 1.0 },
  { name: 'Dhruv Vadodaria', role: 'Admin', image: 'assets/team-02-dhruv-vadodaria.jpg', position: 'center 18%' },
  { name: 'Joana Jestin', role: 'Creative Head', image: 'assets/team-03-joana-jestin.jpg', position: 'center 24%' },
  { name: 'Mishthi Sharma', role: 'Head of Delegate Affairs', image: 'assets/team-04-mishthi-sharma.jpg', position: 'center 20%' },
  { name: 'Krisha Patel', role: 'Head of Hospitality', image: 'assets/team-05-krisha-patel.jpg', position: 'center 36%' },
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
  grid.innerHTML = teamHeads.map(person => {
    const imageStyle = `object-position:${safe(person.position || 'center')};transform:scale(${safe(person.scale || 1.12)})`;
    return `
    <article class="team-card reveal">
      <div class="team-photo-wrap"><img class="team-photo" src="${safe(person.image)}" alt="${safe(person.name)} — ${safe(person.role)}" loading="lazy" style="${imageStyle}" /></div>
      <div class="team-copy">
        <span class="team-role">${safe(person.role)}</span>
        <h3>${safe(person.name)}</h3>
      </div>
    </article>`;
  }).join('');
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

function formatLogTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value || '');
  const pad = n => String(n).padStart(2, '0');
  let hours = date.getHours();
  const minutes = pad(date.getMinutes());
  const suffix = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${String(date.getFullYear()).slice(-2)} ${hours}:${minutes} ${suffix}`;
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



const gossipIconByCouncil = {
  sc: 'assets/gossip-icons/sc.svg',
  pc: 'assets/gossip-icons/pc.svg',
  hrc1: 'assets/gossip-icons/hrc1.svg',
  hrc2: 'assets/gossip-icons/hrc2.svg',
  specpol: 'assets/gossip-icons/specpol.svg',
  ecofin1: 'assets/gossip-icons/ecofin1.svg',
  ecofin2: 'assets/gossip-icons/ecofin2.svg',
  ecosoc: 'assets/gossip-icons/ecosoc.svg'
};

const gossipCouncils = committees.map(c => ({ id: c.id, code: c.code, name: c.name, icon: gossipIconByCouncil[c.id] }));
let activeGossipCouncil = null;
let activeGossipMessages = [];

function renderGossipBoxes() {
  const grid = document.getElementById('gossipGrid');
  if (!grid) return;
  grid.innerHTML = gossipCouncils.map(c => `
    <button type="button" class="gossip-card reveal" data-gossip-council="${safe(c.id)}" aria-label="Open ${safe(c.name)} gossip box">
      <img class="gossip-icon-image" src="${safe(c.icon)}" alt="" aria-hidden="true" loading="lazy" />
      <span class="gossip-code">${safe(c.code)}</span>
      <h3>${safe(c.name)}</h3>
      <p>Private council message box</p>
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

function setCouncilAccessState(authenticated) {
  const login = document.getElementById('gossipAccessForm');
  const content = document.getElementById('gossipProtectedContent');
  if (login) login.hidden = authenticated;
  if (content) content.hidden = !authenticated;
}

async function checkCouncilAccess() {
  if (!activeGossipCouncil) return;
  const status = document.getElementById('gossipAccessStatus');
  setCouncilAccessState(false);
  setStatus(status, 'Checking council access…');
  try {
    const res = await fetch(`/api/gossip-auth?council=${encodeURIComponent(activeGossipCouncil.id)}`, {
      method: 'GET',
      credentials: 'same-origin',
      cache: 'no-store'
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.authenticated) {
      setCouncilAccessState(true);
      setStatus(status, '');
      return;
    }
    setCouncilAccessState(false);
    if (data.blocked || data.error === 'You cannot access other councils') {
      setStatus(status, 'You cannot access other councils', 'error');
      return;
    }
    setStatus(status, 'Enter your council password to access this box.');
    document.getElementById('gossipAccessPassword')?.focus();
  } catch {
    setCouncilAccessState(false);
    setStatus(status, 'Enter your council password to access this box.');
  }
}

function openGossipBox(id) {
  const council = gossipCouncils.find(c => c.id === id);
  if (!council) return;
  activeGossipCouncil = council;
  activeGossipMessages = [];
  document.getElementById('gossipCouncilCode').textContent = council.code;
  document.getElementById('gossipCouncilName').textContent = `${council.name} Gossip Box`;
  document.getElementById('gossipMessage').value = '';
  document.getElementById('gossipAccessPassword').value = '';
  document.getElementById('gossipReaderPassword').value = '';
  document.getElementById('gossipCharCount').textContent = '0 / 1000';
  document.getElementById('gossipMessages').hidden = true;
  document.getElementById('gossipMessages').innerHTML = '';
  setStatus(document.getElementById('gossipSubmitStatus'));
  setStatus(document.getElementById('gossipReadStatus'));
  setStatus(document.getElementById('gossipAccessStatus'));
  setCouncilAccessState(false);
  document.getElementById('gossipModal').showModal();
  checkCouncilAccess();
}

async function loginCouncilAccess(event) {
  event.preventDefault();
  if (!activeGossipCouncil) return;
  const passwordEl = document.getElementById('gossipAccessPassword');
  const status = document.getElementById('gossipAccessStatus');
  const button = document.getElementById('gossipAccessButton');
  const password = passwordEl.value;
  button.disabled = true;
  button.textContent = 'Checking…';
  setStatus(status, '');
  try {
    const res = await fetch('/api/gossip-auth', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ council: activeGossipCouncil.id, password })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Unable to unlock this council.');
    passwordEl.value = '';
    setCouncilAccessState(true);
    setStatus(status, '');
    document.getElementById('gossipMessage').focus();
  } catch (err) {
    setCouncilAccessState(false);
    setStatus(status, err.message || 'Unable to unlock this council.', 'error');
  } finally {
    button.disabled = false;
    button.textContent = 'Enter council';
  }
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
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ council: activeGossipCouncil.id, message })
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) {
      setCouncilAccessState(false);
      throw new Error('Incorrect password');
    }
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
  const status = document.getElementById('gossipReadStatus');
  const button = document.getElementById('gossipReadToggle');
  const passwordEl = document.getElementById('gossipReaderPassword');
  const readerPassword = passwordEl.value;
  button.disabled = true;
  button.textContent = 'Opening…';
  setStatus(status, '');
  try {
    const res = await fetch('/api/gossip-read', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ council: activeGossipCouncil.id, password: readerPassword })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Incorrect password');
    passwordEl.value = '';
    renderGossipMessages(data.messages || []);
  } catch (err) {
    setStatus(status, err.message || 'Unable to read this box.', 'error');
  } finally {
    button.disabled = false;
    button.textContent = 'Open / refresh box';
  }
}

function renderGossipMessages(messages) {
  const el = document.getElementById('gossipMessages');
  activeGossipMessages = Array.isArray(messages) ? messages : [];
  el.hidden = false;
  if (!activeGossipMessages.length) {
    el.innerHTML = '<div class="gossip-empty">No messages in this box yet.</div>';
    return;
  }
  const rows = activeGossipMessages.map(item =>
    `<article class="gossip-message"><p>${safe(item.message)}</p></article>`
  ).join('');
  el.innerHTML = `<div class="gossip-messages-head"><strong>${activeGossipMessages.length} message${activeGossipMessages.length === 1 ? '' : 's'}</strong><span>Newest first</span></div><button type="button" class="btn secondary gossip-download-button" id="gossipDownloadMessages">Download messages</button>${rows}`;
  document.getElementById('gossipDownloadMessages')?.addEventListener('click', downloadActiveCouncilMessages);
}


function wrapCanvasText(ctx, text, maxWidth) {
  const output = [];
  const paragraphs = String(text ?? '').replace(/\r/g, '').split('\n');
  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) { output.push(''); continue; }
    const words = paragraph.trim().split(/\s+/);
    let line = '';
    for (let word of words) {
      if (ctx.measureText(word).width > maxWidth) {
        if (line) { output.push(line); line = ''; }
        let chunk = '';
        for (const char of word) {
          const test = chunk + char;
          if (chunk && ctx.measureText(test).width > maxWidth) {
            output.push(chunk);
            chunk = char;
          } else chunk = test;
        }
        word = chunk;
      }
      const test = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(test).width > maxWidth) {
        output.push(line);
        line = word;
      } else line = test;
    }
    if (line) output.push(line);
  }
  return output;
}

function newPdfCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 1240;
  canvas.height = 1754;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return { canvas, ctx, y: 108 };
}

function renderMessagesToCanvasPages(groups) {
  const pages = [];
  let page = newPdfCanvas();
  const marginX = 100;
  const maxWidth = 1040;
  const bottom = 1640;

  const finishPage = () => { pages.push(page.canvas); page = newPdfCanvas(); };
  const ensure = height => { if (page.y + height > bottom) finishPage(); };

  const drawHeader = (title, subtitle = '') => {
    ensure(100);
    page.ctx.fillStyle = '#17392f';
    page.ctx.font = '700 44px Georgia, serif';
    page.ctx.fillText(title, marginX, page.y);
    page.y += 54;
    if (subtitle) {
      page.ctx.fillStyle = '#6c6f68';
      page.ctx.font = '24px Arial, sans-serif';
      page.ctx.fillText(subtitle, marginX, page.y);
      page.y += 46;
    }
  };

  drawHeader('ISDMUN 2026', groups.length === 1 ? `${groups[0].label} Gossip Messages` : 'All Gossip Messages');

  for (const group of groups) {
    ensure(92);
    page.ctx.fillStyle = '#17392f';
    page.ctx.font = '700 34px Georgia, serif';
    page.ctx.fillText(group.label, marginX, page.y);
    page.y += 46;
    page.ctx.strokeStyle = '#d8d2c0';
    page.ctx.lineWidth = 2;
    page.ctx.beginPath();
    page.ctx.moveTo(marginX, page.y);
    page.ctx.lineTo(marginX + maxWidth, page.y);
    page.ctx.stroke();
    page.y += 32;

    if (!group.messages.length) {
      ensure(60);
      page.ctx.fillStyle = '#6c6f68';
      page.ctx.font = 'italic 25px Arial, sans-serif';
      page.ctx.fillText('No messages in this box.', marginX, page.y);
      page.y += 64;
      continue;
    }

    group.messages.forEach((message, index) => {
      page.ctx.font = '26px Arial, sans-serif';
      const lines = wrapCanvasText(page.ctx, message, maxWidth - 56);
      const blockHeight = Math.max(76, 36 + lines.length * 38 + 28);
      ensure(blockHeight + 18);

      page.ctx.fillStyle = '#f5f0e3';
      page.ctx.fillRect(marginX, page.y - 18, maxWidth, blockHeight);
      page.ctx.fillStyle = '#314b42';
      page.ctx.font = '700 19px Arial, sans-serif';
      page.ctx.fillText(`Message ${index + 1}`, marginX + 28, page.y + 10);
      page.ctx.font = '26px Arial, sans-serif';
      let lineY = page.y + 48;
      for (const line of lines) {
        page.ctx.fillText(line || ' ', marginX + 28, lineY);
        lineY += 38;
      }
      page.y += blockHeight + 18;
    });
    page.y += 22;
  }

  pages.push(page.canvas);
  return pages;
}

async function canvasToJpegBytes(canvas) {
  const blob = await new Promise((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error('Could not create PDF page image.')), 'image/jpeg', 0.92));
  return new Uint8Array(await blob.arrayBuffer());
}

function concatBytes(parts) {
  const size = parts.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(size);
  let offset = 0;
  for (const part of parts) { out.set(part, offset); offset += part.length; }
  return out;
}

async function canvasesToPdfBlob(canvases) {
  const enc = new TextEncoder();
  const jpegPages = await Promise.all(canvases.map(canvasToJpegBytes));
  const chunks = [];
  const offsets = [0];
  let length = 0;
  const push = bytes => { chunks.push(bytes); length += bytes.length; };
  const pushText = text => push(enc.encode(text));
  const objectCount = 2 + canvases.length * 3;

  pushText('%PDF-1.4\n%ISDMUN\n');
  const writeObject = (num, parts) => {
    offsets[num] = length;
    pushText(`${num} 0 obj\n`);
    for (const part of parts) typeof part === 'string' ? pushText(part) : push(part);
    pushText('\nendobj\n');
  };

  writeObject(1, ['<< /Type /Catalog /Pages 2 0 R >>']);
  const kids = canvases.map((_, i) => `${3 + i * 3} 0 R`).join(' ');
  writeObject(2, [`<< /Type /Pages /Kids [${kids}] /Count ${canvases.length} >>`]);

  for (let i = 0; i < canvases.length; i++) {
    const pageObj = 3 + i * 3;
    const imageObj = pageObj + 1;
    const contentObj = pageObj + 2;
    const canvas = canvases[i];
    const jpg = jpegPages[i];
    const content = `q\n595.28 0 0 841.89 0 0 cm\n/Im${i + 1} Do\nQ`;
    const contentBytes = enc.encode(content);

    writeObject(pageObj, [`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im${i + 1} ${imageObj} 0 R >> >> /Contents ${contentObj} 0 R >>`]);
    writeObject(imageObj, [
      `<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpg.length} >>\nstream\n`,
      jpg,
      '\nendstream'
    ]);
    writeObject(contentObj, [`<< /Length ${contentBytes.length} >>\nstream\n`, contentBytes, '\nendstream']);
  }

  const xrefOffset = length;
  pushText(`xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`);
  for (let i = 1; i <= objectCount; i++) pushText(`${String(offsets[i]).padStart(10, '0')} 00000 n \n`);
  pushText(`trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
  return new Blob([concatBytes(chunks)], { type: 'application/pdf' });
}

async function downloadMessagePdf(groups, filename) {
  const canvases = renderMessagesToCanvasPages(groups);
  const blob = await canvasesToPdfBlob(canvases);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function downloadActiveCouncilMessages() {
  if (!activeGossipCouncil) return;
  await downloadMessagePdf(
    [{ label: activeGossipCouncil.code, messages: activeGossipMessages.map(item => item.message) }],
    `ISDMUN-2026-${activeGossipCouncil.code.replace(/\s+/g, '-')}-Gossip-Messages.pdf`
  );
}

function setupGossip() {
  const modal = document.getElementById('gossipModal');
  if (!modal) return;
  document.getElementById('gossipModalClose').addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
  document.getElementById('gossipAccessForm').addEventListener('submit', loginCouncilAccess);
  document.getElementById('gossipSubmitForm').addEventListener('submit', submitGossip);
  document.getElementById('gossipMessage').addEventListener('input', e => {
    document.getElementById('gossipCharCount').textContent = `${e.target.value.length} / 1000`;
  });
  document.getElementById('gossipReadForm').addEventListener('submit', readGossip);
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

window.logs = async function(password) {
  const response = await fetch('/api/gossip-logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: String(password || '') })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error || 'Could not load gossip logs.';
    console.error(message);
    return { ok: false, error: message };
  }

  const rows = (data.logs || []).map(item => ({
    Time: formatLogTime(item.createdAt),
    Council: item.councilLabel,
    BrowserTag: item.browserTag,
    IPAddress: item.ipAddress,
    NetworkTag: item.networkTag,
    UserAgent: item.userAgent,
    BrowserBrands: item.clientBrands,
    Platform: item.platform,
    Mobile: item.mobile
  }));

  if (rows.length) console.table(rows);
  else console.log('No council login logs yet.');
  console.log(`Total council login logs: ${data.total || 0}`);
  return data;
};

window.clearlogs = async function(password) {
  const response = await fetch('/api/gossip-clear-logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: String(password || '') })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error || 'Could not clear gossip logs.';
    console.error(message);
    return { ok: false, error: message };
  }
  console.log('All gossip logs cleared.');
  return data;
};


window.download = async function(password) {
  const response = await fetch('/api/gossip-download-all', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: String(password || '') })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error || 'Could not download gossip messages.';
    console.error(message);
    return { ok: false, error: message };
  }
  await downloadMessagePdf(data.boxes || [], 'ISDMUN-2026-All-Gossip-Messages.pdf');
  console.log('Downloaded all current gossip messages as PDF.');
  return data;
};

window.who = async function(password, browserTag) {
  const response = await fetch('/api/gossip-who', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: String(password || ''), browserTag: String(browserTag || '').trim() })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error || 'Could not inspect that Browser Tag.';
    console.error(message);
    return { ok: false, error: message };
  }

  const p = data.profile || {};
  console.table([{
    BrowserTag: p.browserTag || '',
    Logins: p.loginCount || 0,
    FirstSeen: p.firstSeen || '',
    LastSeen: p.lastSeen || '',
    Councils: (p.councils || []).join(', '),
    IPAddresses: (p.ipAddresses || []).join(', '),
    NetworkTags: (p.networkTags || []).join(', '),
    Platforms: (p.platforms || []).join(', '),
    Languages: (p.languages || []).join(', '),
    MobileHints: (p.mobileHints || []).join(', '),
    DoNotTrack: (p.doNotTrack || []).join(', ')
  }]);
  console.log('User agents:', p.userAgents || []);
  console.log('Browser brands:', p.clientBrands || []);
  return data;
};


window.signout = async function(password, browserTag) {
  const response = await fetch('/api/gossip-signout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: String(password || ''), browserTag: String(browserTag || '').trim() })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error || 'Could not sign out that Browser Tag.';
    console.error(message);
    return { ok: false, error: message };
  }
  console.log(`Signed out Browser Tag: ${data.browserTag || browserTag}`);
  return data;
};

window.message = async function(password, messageText) {
  const response = await fetch('/api/gossip-message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: String(password || ''), message: String(messageText || '') })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data.error || 'Could not send the broadcast.';
    console.error(message);
    return { ok: false, error: message };
  }
  console.log('Broadcast sent to current site visitors.');
  return data;
};

(function setupBroadcastPolling() {
  let initialized = false;
  let lastSeenId = '';

  async function pollBroadcast() {
    try {
      const response = await fetch('/api/gossip-broadcast');
      const data = await response.json().catch(() => ({}));
      if (data?.signedOut) {
        window.location.reload();
        return;
      }
      const broadcast = data?.broadcast;

      if (!initialized) {
        initialized = true;
        lastSeenId = broadcast?.id || '';
        return;
      }

      if (broadcast?.id && broadcast.id !== lastSeenId) {
        lastSeenId = broadcast.id;
        window.alert(String(broadcast.message || ''));
      }
    } catch {
      // Broadcast checks are best-effort and should never affect normal site use.
    }
  }

  pollBroadcast();
  window.setInterval(pollBroadcast, 300000);
})();
