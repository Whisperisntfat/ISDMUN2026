const PDF = 'assets/isd-mun-2026-research-papers.pdf';

const committees = [
  {
    id: 'sc', code: 'SC', name: 'United Nations Security Council',
    chair: { name: 'Afreen Shariff', school: 'Aga Khan', role: 'President / Chair' },
    deputy: { name: 'Amaan Riyaz Sherif', school: 'Al Muntazir', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 2, officer: 'Afreen Shariff', title: 'Examining the Legitimacy, Scope, and Limitations of International Intervention in Sovereign States for the Protection of Civilians' },
      { n: 'II', page: 6, officer: 'Amaan Riyaz Sherif', title: 'Safeguarding Freedom of Navigation in Strategic Maritime Chokepoints: Balancing National Security, International Law, and the Prevention of Regional Escalation' }
    ]
  },
  {
    id: 'pc', code: 'PC', name: 'Political Council',
    chair: { name: 'Abdullah bin Imran', school: 'Aga Khan', role: 'President / Chair' },
    deputy: { name: 'Katalina Nalwadda', school: 'Braeburn', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 24, officer: 'Abdullah bin Imran', title: 'Redefining the Legitimacy of Political and Economic Pressure in International Relations' },
      { n: 'II', page: 25, officer: 'Katalina Nalwadda', title: 'Regulating the Growing Influence of Private Technology Companies in National Governance and Security' }
    ]
  },
  {
    id: 'hrc1', code: 'HRC I', name: 'Human Rights Council I',
    chair: { name: 'Elinkunde Akyoo', school: 'Braeburn', role: 'President / Chair' },
    deputy: { name: 'Krishiv Patel', school: 'Aga Khan', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 52, officer: 'Elinkunde Akyoo', title: 'Balancing the Right to Peaceful Assembly and Freedom of Expression with National Security Imperatives in an Increasingly Volatile Global Environment' },
      { n: 'II', page: 53, officer: 'Elinkunde Akyoo / Krishiv Patel', title: 'Safeguarding Freedom of Expression in the Digital Age: Countering Disinformation Without Undermining Independent Journalism and Civil Liberties' }
    ]
  },
  {
    id: 'hrc2', code: 'HRC II', name: 'Human Rights Council II',
    chair: { name: 'Joan Mahamba', school: 'HOPAC', role: 'President / Chair' },
    deputy: { name: 'Omya Marwaha', school: 'ISD', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 57, officer: 'Joan Mahamba', title: 'Balancing the Right to Peaceful Assembly and Freedom of Expression with National Security Imperatives in an Increasingly Volatile Global Environment' },
      { n: 'II', page: 60, officer: 'Joan Mahamba / Omya Marwaha', title: 'Safeguarding Freedom of Expression in the Digital Age: Countering Disinformation Without Undermining Independent Journalism and Civil Liberties' }
    ]
  },
  {
    id: 'specpol', code: 'SPECPOL', name: 'Special Political and Decolonization Committee',
    chair: { name: 'Ali Akbar Moledina', school: 'Al Muntazir', role: 'President / Chair' },
    deputy: { name: 'Liyaan Tanveer Karbelkar', school: 'Al Muntazir', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 28, officer: 'Ali Akbar Moledina', title: 'Examining the Principles of Self-Determination and the Political Status of Non-Self-Governing Territories in the Contemporary International Order' },
      { n: 'II', page: 29, officer: 'Liyaan Tanveer Karbelkar', title: 'Addressing the Unresolved Question of Self-Determination in Western Sahara and the Role of the United Nations' }
    ]
  },
  {
    id: 'ecofin1', code: 'ECOFIN I', name: 'Economic and Financial Committee I',
    chair: { name: 'Ansh Sareen', school: 'ISD', role: 'President / Chair' },
    deputy: { name: 'Saweera Muhammad Tahir', school: 'Al Muntazir', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 11, officer: 'Ansh Sareen', title: 'Evaluating the Need for Comprehensive Reform of International Sovereign Debt Mechanisms to Address Debt Vulnerability in Developing Economies' },
      { n: 'II', page: 13, officer: 'Saweera Muhammad Tahir', title: 'Addressing the Global Housing Affordability Crisis: Expanding Access to Affordable Housing While Managing Household Debt and Financial Stability Risks' }
    ]
  },
  {
    id: 'ecofin2', code: 'ECOFIN II', name: 'Economic and Financial Committee II',
    chair: { name: 'Bernadette Bakilana', school: 'HOPAC', role: 'President / Chair' },
    deputy: { name: 'Pujhita Sri', school: 'ISD', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 17, officer: 'Bernadette Bakilana', title: 'Addressing the Global Housing Affordability Crisis: Expanding Access to Affordable Housing While Managing Household Debt and Financial Stability Risks' },
      { n: 'II', page: 21, officer: 'Pujhita Sri', title: 'Evaluating the Need for Comprehensive Reform of International Sovereign Debt Mechanisms to Address Debt Vulnerability in Developing Economies' }
    ]
  },
  {
    id: 'ecosoc', code: 'ECOSOC', name: 'Economic and Social Council',
    chair: { name: 'Hassan Harunani', school: 'Al Muntazir', role: 'President / Chair' },
    deputy: { name: 'Vyan Kumar', school: 'Aga Khan', role: 'Deputy Chair' },
    papers: [
      { n: 'I', page: 39, officer: 'Hassan Harunani / Vyan Kumar', title: 'Addressing Global Youth Unemployment and Skills Inequality Amidst Rapid Automation and the Transformation of the Global Labour Market' },
      { n: 'II', page: 45, officer: 'Hassan Harunani / Vyan Kumar', title: 'Evaluating the Responsibility of Developed Nations to Finance Climate Adaptation and Resilience in Vulnerable Developing Countries' }
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

const initials = name => name.split(/\s+/).map(x => x[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
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
      <p class="modal-paper-officer">Student officer(s): ${safe(p.officer)}</p>
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
      <div class="avatar">${safe(initials(x.name))}</div>
      <span class="role">${safe(x.role)}</span>
      <h3>${safe(x.name)}</h3>
      <div class="meta">${safe(x.committee)} · ${safe(x.school)}</div>
    </article>`).join('') : '<div class="empty">No student officers match your search.</div>';
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
      <div><h3>${safe(p.title)}</h3><div class="officer">Student officer(s): ${safe(p.officer)}</div></div>
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

renderCommittees();
renderTopics();
setupResearchFilter();
renderChairs();
renderResearch();
setupNavigation();
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
