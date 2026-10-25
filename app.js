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




function setStatus(el, message = '', type = '') {
  if (!el) return;
  el.textContent = message;
  el.classList.remove('success', 'error');
  if (type) el.classList.add(type);
}

function renderGossipBoxesDisabled() {
  const grid = document.getElementById('gossipGrid');
  if (!grid) return;
  const icons = {
    sc: 'assets/gossip-icons/sc.svg',
    pc: 'assets/gossip-icons/pc.svg',
    hrc1: 'assets/gossip-icons/hrc1.svg',
    hrc2: 'assets/gossip-icons/hrc2.svg',
    specpol: 'assets/gossip-icons/specpol.svg',
    ecofin1: 'assets/gossip-icons/ecofin1.svg',
    ecofin2: 'assets/gossip-icons/ecofin2.svg',
    ecosoc: 'assets/gossip-icons/ecosoc.svg'
  };
  grid.innerHTML = committees.map(c => `
    <button type="button" class="gossip-card gossip-card-disabled feature-disabled reveal" disabled aria-disabled="true" tabindex="-1">
      <img class="gossip-icon-image" src="${safe(icons[c.id] || '')}" alt="" aria-hidden="true" loading="lazy" />
      <span class="gossip-code">${safe(c.code)}</span>
      <h3>${safe(c.name)}</h3>
      <p>Gossip box closed</p>
      <span class="gossip-open">Disabled</span>
    </button>`).join('');
}

renderCommittees();
renderTeamHeads();
renderGossipBoxesDisabled();
renderTopics();
setupResearchFilter();
renderChairs();
renderResearch();
setupNavigation();
setupFeedback();
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



function setFeedbackSubmittedState(submitted) {
  const form = document.getElementById('feedbackForm');
  const complete = document.getElementById('feedbackComplete');
  const openButton = document.getElementById('feedbackOpen');
  if (form) form.hidden = Boolean(submitted);
  if (complete) complete.hidden = !submitted;
  if (openButton) openButton.classList.toggle('submitted', Boolean(submitted));
}

async function checkFeedbackStatus() {
  try {
    const response = await fetch('/api/feedback', { credentials: 'same-origin', cache: 'no-store' });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Could not check feedback status.');
    setFeedbackSubmittedState(Boolean(data.submitted));
    return Boolean(data.submitted);
  } catch (error) {
    setStatus(document.getElementById('feedbackStatus'), error.message || 'Could not check feedback status.', 'error');
    return false;
  }
}

async function submitFeedback(event) {
  event.preventDefault();
  const positiveEl = document.getElementById('feedbackPositive');
  const shortcomingsEl = document.getElementById('feedbackShortcomings');
  const nameEl = document.getElementById('feedbackName');
  const likedSiteEl = document.querySelector('input[name="feedbackLikedSite"]:checked');
  const button = document.getElementById('feedbackSubmit');
  const status = document.getElementById('feedbackStatus');
  const positive = positiveEl?.value.trim() || '';
  const shortcomings = shortcomingsEl?.value.trim() || '';
  const name = nameEl?.value.trim() || '';
  const likedSite = likedSiteEl?.value || '';

  if (!['yes', 'no'].includes(likedSite)) {
    setStatus(status, 'Please select whether you liked the site.', 'error');
    return;
  }

  if (positive.length < 3) {
    setStatus(status, 'Please enter at least 3 characters of positive feedback.', 'error');
    return;
  }

  button.disabled = true;
  button.textContent = 'Submitting…';
  setStatus(status);
  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likedSite, positive, shortcomings, name })
    });
    const data = await response.json().catch(() => ({}));
    if (response.status === 409) {
      setFeedbackSubmittedState(true);
      return;
    }
    if (!response.ok) throw new Error(data.error || 'Could not submit feedback.');
    try { localStorage.setItem('isdmun_feedback_submitted', '1'); } catch {}
    setFeedbackSubmittedState(true);
  } catch (error) {
    setStatus(status, error.message || 'Could not submit feedback.', 'error');
    button.disabled = false;
    button.textContent = 'Submit feedback';
  }
}

function setupFeedback() {
  const modal = document.getElementById('feedbackModal');
  const openButton = document.getElementById('feedbackOpen');
  const closeButton = document.getElementById('feedbackClose');
  openButton?.addEventListener('click', async () => {
    setStatus(document.getElementById('feedbackStatus'));
    try {
      if (localStorage.getItem('isdmun_feedback_submitted') === '1') setFeedbackSubmittedState(true);
    } catch {}
    modal.showModal();
    await checkFeedbackStatus();
  });
  closeButton?.addEventListener('click', () => modal.close());
  modal?.addEventListener('click', event => { if (event.target === modal) modal.close(); });
  document.getElementById('feedbackForm')?.addEventListener('submit', submitFeedback);
}
