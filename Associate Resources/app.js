document.addEventListener('DOMContentLoaded', () => {
  const state = {
    role: 'Experienced Advisor',
    searchQuery: '',
    activeSection: 'directory' // default section
  };

  const els = {
    navLinks: document.getElementById('navLinks'),
    roleFilter: document.getElementById('roleFilter'),
    searchInput: document.getElementById('searchInput'),
    contentArea: document.getElementById('contentArea'),
    welcomeTitle: document.getElementById('welcomeTitle'),
    welcomeDesc: document.getElementById('welcomeDesc'),
  };

  function init() {
    els.roleFilter.addEventListener('change', (e) => {
      state.role = e.target.value;
      renderNav();
      renderContent();
    });

    els.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase();
      renderContent();
    });

    renderNav();
    renderContent();
  }

  function renderNav() {
    els.navLinks.innerHTML = '';
    portalData.navigation.forEach(navItem => {
      if (navItem.roles.includes('All') || navItem.roles.includes(state.role) || state.role === 'All') {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = navItem.label;
        if (state.activeSection === navItem.id) {
          a.classList.add('active');
        }
        a.addEventListener('click', (e) => {
          e.preventDefault();
          state.activeSection = navItem.id;
          state.searchQuery = '';
          els.searchInput.value = '';
          renderNav();
          renderContent();
        });
        li.appendChild(a);
        els.navLinks.appendChild(li);
      } else {
        // If active section is hidden due to role change, revert to directory
        if (state.activeSection === navItem.id) {
          state.activeSection = 'directory';
        }
      }
    });
  }

  function renderContent() {
    els.contentArea.innerHTML = '';
    
    if (state.activeSection === 'directory') {
      renderDirectory();
    } else if (state.activeSection === 'commissions') {
      renderCommissions();
    } else if (state.activeSection === 'compliance') {
      renderCompliance();
    } else {
      renderGenericResources(state.activeSection);
    }
  }

  function updateWelcome(title, desc) {
    els.welcomeTitle.textContent = title;
    els.welcomeDesc.textContent = desc;
  }

  function applySearchFilter(text) {
    if (!state.searchQuery) return true;
    return text.toLowerCase().includes(state.searchQuery);
  }

  // --- Directory Renderer ---
  function renderDirectory() {
    updateWelcome(portalData.directory.title, portalData.directory.desc);
    
    // Setup TABS
    const storedTab = state.directoryTab || 'British Columbia';
    
    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'tabs';
    
    portalData.directory.tabs.forEach(tab => {
      const btn = document.createElement('button');
      btn.className = `tab ${tab === storedTab ? 'active' : ''}`;
      btn.textContent = tab;
      btn.addEventListener('click', () => {
        state.directoryTab = tab;
        renderContent();
      });
      tabsContainer.appendChild(btn);
    });
    
    els.contentArea.appendChild(tabsContainer);

    const grid = document.createElement('div');
    grid.className = 'contact-grid';
    
    const filteredContacts = portalData.directory.contacts.filter(c => {
      const matchRegion = c.region === storedTab;
      const searchStr = `${c.name} ${c.role} ${c.handles}`.toLowerCase();
      const matchSearch = applySearchFilter(searchStr);
      return matchRegion && matchSearch;
    });

    if (filteredContacts.length === 0) {
      grid.innerHTML = `<div class="empty-state"><h3>No contacts found matching your search.</h3></div>`;
    }

    filteredContacts.forEach(c => {
      const card = document.createElement('div');
      card.className = `contact-card ${c.exec ? 'exec' : ''}`;
      card.innerHTML = `
        <h3>${c.name}</h3>
        <div class="role">${c.role}</div>
        <div class="detail">📧 <a href="mailto:${c.email}">${c.email}</a></div>
        ${c.phone ? `<div class="detail">📞 ${c.phone}</div>` : ''}
        <div class="handles">
          <strong>Handles:</strong> ${c.handles}<br>
          <em>Expected response: ${c.responseTime}</em>
        </div>
      `;
      grid.appendChild(card);
    });
    
    els.contentArea.appendChild(grid);
  }

  // --- Commissions Renderer ---
  function renderCommissions() {
    updateWelcome(portalData.commissions.title, portalData.commissions.desc);
    
    const container = document.createElement('div');
    
    // Carrier schedules
    let html = `<div class="category-group">
      <h3 class="category-title">Carrier Commissions</h3>
      <div class="resource-grid">`;
      
    portalData.commissions.carriers.forEach(c => {
      if (!applySearchFilter(c.name)) return;
      html += `
        <div class="resource-card">
          <h3>${c.name}</h3>
          <p>${c.hasPortalLogin ? 'Advisor portal login required to view live schedule.' : 'Schedule available directly.'}</p>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <a href="${c.scheduleUrl}" class="btn" style="background:#0F2A44;">Live Schedule</a>
            <a href="${c.guideUrl}" class="btn">How to Check</a>
          </div>
        </div>
      `;
    });
    
    html += `</div></div>`;
    
    // Operational
    html += `<div class="category-group">
      <h3 class="category-title">Understanding Your Compensation</h3>
      <div class="resource-grid">`;
      
    portalData.commissions.operational.forEach(o => {
      if (!applySearchFilter(o.title + ' ' + o.desc)) return;
      html += `
        <div class="resource-card">
          <h3>${o.title}</h3>
          <p>${o.desc}</p>
          <a href="${o.url}" class="btn">View Document</a>
        </div>
      `;
    });
    
    html += `</div></div>`;
    container.innerHTML = html;
    els.contentArea.appendChild(container);
  }

  // --- Compliance Renderer ---
  function renderCompliance() {
    updateWelcome(portalData.compliance.title, portalData.compliance.desc);
    const container = document.createElement('div');

    if (state.searchQuery) {
      container.innerHTML = `<p><em>Showing results matching "${state.searchQuery}":</em></p><br>`;
    }

    // 1. My Licenses
    let section1 = `<div class="category-group"><h3 class="category-title">1. My Licenses (By Province)</h3><div>`;
    let count1 = 0;
    portalData.compliance.licenses.forEach(l => {
      if (!applySearchFilter(l.prov + ' ' + l.reqs)) return;
      count1++;
      section1 += `
        <div class="province-row">
          <div class="province-header">${l.prov} License</div>
          <div style="flex-grow:1; margin:0 2rem; font-size:0.9rem; color:#555;">
            <strong>Renewal:</strong> ${l.renewal} &bull; ${l.reqs}
          </div>
          <div class="province-links">
            <a href="${l.portal}" target="_blank" class="btn" style="padding:0.4rem 0.8rem; font-size:0.8rem;">Council Portal</a>
          </div>
        </div>
      `;
    });
    section1 += `</div></div>`;
    if(count1 > 0) container.innerHTML += section1;

    // 2. E&O
    let section2 = `<div class="category-group"><h3 class="category-title">2. E&O Insurance</h3><div class="resource-grid">`;
    let count2 = 0;
    portalData.compliance.eo.forEach(e => {
      if (!applySearchFilter(e.provider + ' ' + e.features)) return;
      count2++;
      section2 += `
        <div class="resource-card">
          <div class="card-badges"><span class="badge" style="background:#E3F2FD; color:#1565C0;">${e.type} E&O</span></div>
          <h3>${e.provider}</h3>
          <p>${e.features}</p>
          <a href="${e.url}" class="btn">View Details</a>
        </div>
      `;
    });
    section2 += `</div></div>`;
    if(count2 > 0) container.innerHTML += section2;

    // 3. Toolkit
    let section3 = `<div class="category-group"><h3 class="category-title">3. Compliance Toolkit</h3><div class="resource-grid">`;
    let count3 = 0;
    portalData.compliance.toolkitFiles.forEach(t => {
      // Filter out admin-only files for non-admins
      if (t.adminOnly && state.role !== 'Administrator' && state.role !== 'All') return;
      if (!applySearchFilter(t.title + ' ' + t.desc + ' ' + t.category)) return;
      
      count3++;
      let badges = `<span class="badge">${t.category}</span>`;
      if (t.reviewRequired) {
        badges += `<span class="badge compliance">Compliance Review Required Before Use</span>`;
      }
      if (t.adminOnly) {
        badges += `<span class="badge" style="background:#FFEBEE; color:#C62828;">Administrator / Staff Only</span>`;
      }

      section3 += `
        <div class="resource-card">
          <div class="card-badges">${badges}</div>
          <h3>${t.title} <span style="font-size:0.7rem; color:#999; font-weight:normal;">(${t.date})</span></h3>
          <p>${t.desc}</p>
          <a href="#" class="btn">Download Template</a>
        </div>
      `;
    });
    section3 += `</div></div>`;
    if(count3 > 0) container.innerHTML += section3;

    // 4. Regulatory Bodies & 5. Codes
    // Simplification for prototype
    let section4 = `<div style="display:flex; gap:2rem; flex-wrap:wrap;">
      <div class="category-group" style="flex:1; min-width:300px;">
        <h3 class="category-title">4. Regulatory Bodies</h3>
        <ul style="list-style:none;">`;
    portalData.compliance.bodies.forEach(b => {
      if (applySearchFilter(b.name)) section4 += `<li style="margin-bottom:0.8rem;"><strong>${b.type}:</strong> <a href="${b.url}" target="_blank">${b.name}</a></li>`;
    });
    section4 += `</ul></div>
      <div class="category-group" style="flex:1; min-width:300px;">
        <h3 class="category-title">5. Carrier Codes of Conduct</h3>
        <ul style="list-style:none;">`;
    portalData.compliance.codes.forEach(c => {
      if (applySearchFilter(c.carrier)) section4 += `<li style="margin-bottom:0.8rem;"><a href="${c.url}">${c.carrier} Code of Conduct</a></li>`;
    });
    section4 += `</ul></div></div>`;
    
    container.innerHTML += section4;
    els.contentArea.appendChild(container);
  }

  // --- Generic Resource Renderer (Journeys) ---
  function renderGenericResources(sectionId) {
    const sectionNav = portalData.navigation.find(n => n.id === sectionId);
    updateWelcome(sectionNav.label, `Resources tailored for ${sectionNav.label.toLowerCase()}.`);

    // Group items by category within this section
    const resources = portalData.resources.filter(r => {
      if (r.section !== sectionId) return false;
      // Filter by role
      if (state.role !== 'All' && !r.roles.includes(state.role) && !r.roles.includes('All')) return false;
      // Filter by search
      if (!applySearchFilter(r.title + ' ' + r.desc + ' ' + r.category)) return false;
      return true;
    });

    if (resources.length === 0) {
      els.contentArea.innerHTML = `<div class="empty-state"><h3>No resources found matching your current role and search.</h3></div>`;
      return;
    }

    const grouped = {};
    resources.forEach(r => {
      if(!grouped[r.category]) grouped[r.category] = [];
      grouped[r.category].push(r);
    });

    Object.keys(grouped).forEach(cat => {
      const gDiv = document.createElement('div');
      gDiv.className = 'category-group';
      gDiv.innerHTML = `<h3 class="category-title">${cat}</h3>`;
      
      const grid = document.createElement('div');
      grid.className = 'resource-grid';
      
      grouped[cat].forEach(r => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        
        // badges
        let badgesHtml = '';
        if (state.role === 'All' && r.roles[0] !== 'All') {
           badgesHtml += `<span class="badge">${r.roles.join(', ')}</span>`;
        }
        r.tags.forEach(t => {
          let badgeClass = 'badge';
          if (t.includes('Compliance Review')) badgeClass += ' compliance';
          badgesHtml += `<span class="${badgeClass}">${t}</span>`;
        });
        
        card.innerHTML = `
          ${badgesHtml ? `<div class="card-badges">${badgesHtml}</div>` : ''}
          <h3>${r.title}</h3>
          <p>${r.desc}</p>
          <a href="#" class="btn">View Resource</a>
        `;
        grid.appendChild(card);
      });
      
      gDiv.appendChild(grid);
      els.contentArea.appendChild(gDiv);
    });
  }

  // Initialize App
  init();
});
