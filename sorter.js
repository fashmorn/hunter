// ── Country Sorter ────────────────────────────────────────────
const PROVIDER_MAP = {
  // Russia
  'mail.ru':'Russia','bk.ru':'Russia','list.ru':'Russia','inbox.ru':'Russia',
  'yandex.ru':'Russia','yandex.com':'Russia','rambler.ru':'Russia','ro.ru':'Russia',
  // Germany
  'web.de':'Germany','gmx.de':'Germany','t-online.de':'Germany','freenet.de':'Germany',
  'gmx.net':'Germany','posteo.de':'Germany','1und1.de':'Germany',
  // France
  'wanadoo.fr':'France','orange.fr':'France','sfr.fr':'France','free.fr':'France',
  'laposte.net':'France','bbox.fr':'France','numericable.fr':'France',
  // Italy
  'libero.it':'Italy','virgilio.it':'Italy','alice.it':'Italy','tin.it':'Italy',
  'tiscali.it':'Italy','inwind.it':'Italy',
  // Brazil
  'uol.com.br':'Brazil','bol.com.br':'Brazil','terra.com.br':'Brazil','ig.com.br':'Brazil',
  'r7.com':'Brazil','globo.com':'Brazil',
  // China
  '163.com':'China','126.com':'China','qq.com':'China','sina.com':'China',
  'sohu.com':'China','foxmail.com':'China','139.com':'China','yeah.net':'China',
  // Japan
  'yahoo.co.jp':'Japan','docomo.ne.jp':'Japan','softbank.ne.jp':'Japan',
  'ezweb.ne.jp':'Japan','au.com':'Japan','nifty.com':'Japan',
  // South Korea
  'naver.com':'South Korea','daum.net':'South Korea','hanmail.net':'South Korea',
  'kakao.com':'South Korea','nate.com':'South Korea',
  // Spain
  'telefonica.net':'Spain','terra.es':'Spain','ya.com':'Spain','ono.com':'Spain',
  // Poland
  'wp.pl':'Poland','onet.pl':'Poland','interia.pl':'Poland','o2.pl':'Poland',
  'gazeta.pl':'Poland','poczta.fm':'Poland',
  // Netherlands
  'xs4all.nl':'Netherlands','ziggo.nl':'Netherlands','kpnmail.nl':'Netherlands',
  // Czech Republic
  'seznam.cz':'Czech Republic','centrum.cz':'Czech Republic','atlas.cz':'Czech Republic',
  // Romania
  'yahoo.ro':'Romania',
  // Ukraine
  'ukr.net':'Ukraine','meta.ua':'Ukraine','i.ua':'Ukraine',
  // Turkey
  'turknet.net.tr':'Turkey','mynet.com':'Turkey','turk.net':'Turkey',
  // India
  'rediffmail.com':'India','sify.com':'India',
  // Sweden
  'spray.se':'Sweden','tele2.se':'Sweden','comhem.se':'Sweden',
  // United Kingdom
  'btinternet.com':'United Kingdom','sky.com':'United Kingdom',
  'ntlworld.com':'United Kingdom','talktalk.net':'United Kingdom','blueyonder.co.uk':'United Kingdom',
  // Australia
  'bigpond.com':'Australia','bigpond.net.au':'Australia','optusnet.com.au':'Australia',
  'iinet.net.au':'Australia',
  // Canada
  'sympatico.ca':'Canada','shaw.ca':'Canada','rogers.com':'Canada','telus.net':'Canada',
  // Portugal
  'sapo.pt':'Portugal',
  // Belgium
  'skynet.be':'Belgium','telenet.be':'Belgium','proximus.be':'Belgium',
  // Austria
  'aon.at':'Austria','chello.at':'Austria',
  // Switzerland
  'bluewin.ch':'Switzerland',
  // Hungary
  'freemail.hu':'Hungary','citromail.hu':'Hungary',
  // Israel
  'walla.com':'Israel',
  // Global (no country)
  'gmail.com':'International','yahoo.com':'International','hotmail.com':'International',
  'outlook.com':'International','icloud.com':'International','proton.me':'International',
  'protonmail.com':'International','aol.com':'International','live.com':'International',
  'msn.com':'International','me.com':'International','googlemail.com':'International',
};

const TLD_MAP = {
  ru:'Russia',de:'Germany',fr:'France',it:'Italy',br:'Brazil',cn:'China',
  jp:'Japan',kr:'South Korea',es:'Spain',pl:'Poland',nl:'Netherlands',
  cz:'Czech Republic',ro:'Romania',ua:'Ukraine',tr:'Turkey','in':'India',
  ar:'Argentina',mx:'Mexico',se:'Sweden',no:'Norway',dk:'Denmark',
  fi:'Finland',za:'South Africa',eg:'Egypt',sa:'Saudi Arabia',
  uk:'United Kingdom',au:'Australia',ca:'Canada',pt:'Portugal',
  be:'Belgium',at:'Austria',ch:'Switzerland',hu:'Hungary',gr:'Greece',
  il:'Israel',ng:'Nigeria',gh:'Ghana',ke:'Kenya',id:'Indonesia',
  my:'Malaysia',sg:'Singapore',ph:'Philippines',th:'Thailand',vn:'Vietnam',
  pk:'Pakistan',bd:'Bangladesh',nz:'New Zealand',ir:'Iran',
};

const SLD_MAP = { uk:'United Kingdom',br:'Brazil',jp:'Japan',au:'Australia',za:'South Africa',nz:'New Zealand','in':'India' };

const ISO_COUNTRY = {
  AF:'Afghanistan',AL:'Albania',DZ:'Algeria',AD:'Andorra',AO:'Angola',AR:'Argentina',
  AM:'Armenia',AU:'Australia',AT:'Austria',AZ:'Azerbaijan',BS:'Bahamas',BH:'Bahrain',
  BD:'Bangladesh',BY:'Belarus',BE:'Belgium',BZ:'Belize',BJ:'Benin',BT:'Bhutan',
  BO:'Bolivia',BA:'Bosnia & Herzegovina',BW:'Botswana',BR:'Brazil',BN:'Brunei',
  BG:'Bulgaria',BF:'Burkina Faso',BI:'Burundi',KH:'Cambodia',CM:'Cameroon',
  CA:'Canada',CV:'Cape Verde',CF:'Central African Republic',TD:'Chad',CL:'Chile',
  CN:'China',CO:'Colombia',KM:'Comoros',CD:'DR Congo',CG:'Congo',CR:'Costa Rica',
  HR:'Croatia',CU:'Cuba',CY:'Cyprus',CZ:'Czech Republic',DK:'Denmark',DJ:'Djibouti',
  DO:'Dominican Republic',EC:'Ecuador',EG:'Egypt',SV:'El Salvador',EE:'Estonia',
  ET:'Ethiopia',FJ:'Fiji',FI:'Finland',FR:'France',GA:'Gabon',GM:'Gambia',GE:'Georgia',
  DE:'Germany',GH:'Ghana',GR:'Greece',GT:'Guatemala',GN:'Guinea',GY:'Guyana',
  HT:'Haiti',HN:'Honduras',HK:'Hong Kong',HU:'Hungary','IN':'India',ID:'Indonesia',
  IR:'Iran',IQ:'Iraq',IE:'Ireland',IL:'Israel',IT:'Italy',JM:'Jamaica',JP:'Japan',
  JO:'Jordan',KZ:'Kazakhstan',KE:'Kenya',KW:'Kuwait',KG:'Kyrgyzstan',LA:'Laos',
  LV:'Latvia',LB:'Lebanon',LS:'Lesotho',LY:'Libya',LI:'Liechtenstein',LT:'Lithuania',
  LU:'Luxembourg',MO:'Macao',MK:'North Macedonia',MG:'Madagascar',MW:'Malawi',
  MY:'Malaysia',MV:'Maldives',ML:'Mali',MT:'Malta',MR:'Mauritania',MU:'Mauritius',
  MX:'Mexico',MD:'Moldova',MC:'Monaco',MN:'Mongolia',ME:'Montenegro',MA:'Morocco',
  MZ:'Mozambique',MM:'Myanmar',NA:'Namibia',NP:'Nepal',NL:'Netherlands',NZ:'New Zealand',
  NI:'Nicaragua',NE:'Niger',NG:'Nigeria',NO:'Norway',OM:'Oman',PK:'Pakistan',
  PS:'Palestine',PA:'Panama',PG:'Papua New Guinea',PY:'Paraguay',PE:'Peru',
  PH:'Philippines',PL:'Poland',PT:'Portugal',QA:'Qatar',RO:'Romania',RU:'Russia',
  RW:'Rwanda',SA:'Saudi Arabia',SN:'Senegal',RS:'Serbia',SL:'Sierra Leone',
  SG:'Singapore',SK:'Slovakia',SI:'Slovenia',SO:'Somalia',ZA:'South Africa',
  KR:'South Korea',SS:'South Sudan',ES:'Spain',LK:'Sri Lanka',SD:'Sudan',
  SR:'Suriname',SZ:'Swaziland',SE:'Sweden',CH:'Switzerland',SY:'Syria',
  TW:'Taiwan',TJ:'Tajikistan',TZ:'Tanzania',TH:'Thailand',TL:'Timor-Leste',
  TG:'Togo',TT:'Trinidad & Tobago',TN:'Tunisia',TR:'Turkey',TM:'Turkmenistan',
  UG:'Uganda',UA:'Ukraine',AE:'United Arab Emirates',GB:'United Kingdom',
  US:'United States',UY:'Uruguay',UZ:'Uzbekistan',VE:'Venezuela',VN:'Vietnam',
  YE:'Yemen',ZM:'Zambia',ZW:'Zimbabwe',
};

const FLAGS = {
  Russia:'🇷🇺',Germany:'🇩🇪',France:'🇫🇷',Italy:'🇮🇹',Brazil:'🇧🇷',China:'🇨🇳',
  Japan:'🇯🇵','South Korea':'🇰🇷',Spain:'🇪🇸',Poland:'🇵🇱',Netherlands:'🇳🇱',
  'Czech Republic':'🇨🇿',Romania:'🇷🇴',Ukraine:'🇺🇦',Turkey:'🇹🇷',India:'🇮🇳',
  Argentina:'🇦🇷',Mexico:'🇲🇽',Sweden:'🇸🇪',Norway:'🇳🇴',Denmark:'🇩🇰',
  Finland:'🇫🇮','South Africa':'🇿🇦',Egypt:'🇪🇬','Saudi Arabia':'🇸🇦',
  'United Kingdom':'🇬🇧',Australia:'🇦🇺',Canada:'🇨🇦',Portugal:'🇵🇹',
  Belgium:'🇧🇪',Austria:'🇦🇹',Switzerland:'🇨🇭',Hungary:'🇭🇺',Greece:'🇬🇷',
  Israel:'🇮🇱',Nigeria:'🇳🇬',Ghana:'🇬🇭',Kenya:'🇰🇪',Indonesia:'🇮🇩',
  Malaysia:'🇲🇾',Singapore:'🇸🇬',Philippines:'🇵🇭',Thailand:'🇹🇭',Vietnam:'🇻🇳',
  Pakistan:'🇵🇰',Bangladesh:'🇧🇩','New Zealand':'🇳🇿','United States':'🇺🇸',
  Iran:'🇮🇷',Ireland:'🇮🇪','Hong Kong':'🇭🇰',Taiwan:'🇹🇼',
  'United Arab Emirates':'🇦🇪','Saudi Arabia':'🇸🇦',
  International:'🌐',Unknown:'❓',
};

const COUNTRY_ISO = Object.fromEntries(Object.entries(ISO_COUNTRY).map(([k, v]) => [v, k.toLowerCase()]));

function getFlagHtml(country) {
  if (country === 'International') return '<i data-lucide="globe" style="width:18px;height:18px;vertical-align:middle;color:var(--primary)"></i>';
  if (country === 'Unknown') return '<i data-lucide="help-circle" style="width:18px;height:18px;vertical-align:middle;color:var(--muted)"></i>';
  const iso = COUNTRY_ISO[country];
  if (iso) return `<span class="fi fi-${iso}" style="border-radius:2px;font-size:16px;"></span>`;
  return '<i data-lucide="globe" style="width:18px;height:18px;vertical-align:middle;color:var(--primary)"></i>';
}

// MX hostname → country (covers common mail infrastructure)
const MX_HOST_MAP = {
  // Google
  'google.com':'International','googlemail.com':'International','gmail.com':'International',
  // Microsoft
  'outlook.com':'International','hotmail.com':'International','microsoft.com':'International',
  'protection.outlook.com':'International',
  // Yahoo
  'yahoodns.net':'International','yahoo.com':'International',
  // Yandex (Russia)
  'yandex.ru':'Russia','yandex.net':'Russia',
  // Mail.ru (Russia)
  'mail.ru':'Russia',
  // QQ / NetEase (China)
  'qq.com':'China','163.com':'China','126.com':'China',
  // Naver (South Korea)
  'naver.com':'South Korea',
  // Daum / Kakao (South Korea)
  'daum.net':'South Korea','kakao.com':'South Korea',
  // Free.fr (France)
  'free.fr':'France','laposte.net':'France','orange.fr':'France','sfr.fr':'France',
  // Web.de / GMX.de (Germany)
  'web.de':'Germany','gmx.de':'Germany','gmx.net':'Germany','t-online.de':'Germany',
  // Libero.it (Italy)
  'libero.it':'Italy','virgilio.it':'Italy',
  // UOL / Terra (Brazil)
  'uol.com.br':'Brazil','terra.com.br':'Brazil',
  // Wp.pl / Onet.pl (Poland)
  'wp.pl':'Poland','onet.pl':'Poland',
  // Seznam.cz (Czech)
  'seznam.cz':'Czech Republic',
  // Rediffmail (India)
  'rediffmail.com':'India',
  // Ukr.net (Ukraine)
  'ukr.net':'Ukraine',
  // Proton
  'protonmail.ch':'International','proton.me':'International',
  // Zoho (global)
  'zoho.com':'International','zohomail.com':'International',
  // Fastmail
  'fastmail.com':'International','messagingengine.com':'International',
};

// ── Classification ────────────────────────────────────────────

function classifyDomainFast(domain) {
  const d = domain.toLowerCase();
  if (PROVIDER_MAP[d]) return { country: PROVIDER_MAP[d], method: 'provider' };
  const parts = d.split('.');
  const tld = parts[parts.length - 1];
  const sld = parts.length > 2 ? parts[parts.length - 2] : '';
  if (SLD_MAP[sld]) return { country: SLD_MAP[sld], method: 'sld' };
  if (TLD_MAP[tld]) return { country: TLD_MAP[tld], method: 'tld' };
  // Generic TLDs (.com .net .org .io .co etc) -> need geo lookup
  const genericTLDs = ['com','net','org','io','co','info','biz','mobi','name','pro'];
  if (genericTLDs.includes(tld)) return { country: null, method: 'geo_needed' };
  return { country: 'Unknown', method: 'fallback' };
}

const geoCache = {};

// Extract root domain from MX hostname (e.g. "aspmx.l.google.com" → "google.com")
function mxRootDomain(mx) {
  const h = mx.replace(/\.$/, '').toLowerCase();
  const parts = h.split('.');
  if (parts.length >= 2) return parts.slice(-2).join('.');
  return h;
}

// Derive country from an MX hostname string
function countryFromMXHost(mx) {
  const h = mx.replace(/\.$/, '').toLowerCase();
  // Exact / suffix match against MX_HOST_MAP
  for (const key of Object.keys(MX_HOST_MAP)) {
    if (h === key || h.endsWith('.' + key)) return MX_HOST_MAP[key];
  }
  // Root domain TLD fallback (e.g. mx.companyname.fr → France)
  const root = mxRootDomain(h);
  const tld = root.split('.').pop();
  if (TLD_MAP[tld]) return TLD_MAP[tld];
  return null;
}

async function resolveMXCountry(domain) {
  try {
    const r = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=MX`, {
      headers: { Accept: 'application/dns-json' }
    });
    const data = await r.json();
    const answers = (data.Answer || []).filter(a => a.type === 15);
    if (!answers.length) return null;
    // Sort by priority (lowest = preferred)
    answers.sort((a, b) => {
      const pa = parseInt((a.data || '').split(' ')[0], 10) || 999;
      const pb = parseInt((b.data || '').split(' ')[0], 10) || 999;
      return pa - pb;
    });
    // Try each MX record until we get a country
    for (const ans of answers) {
      const mxHost = (ans.data || '').split(' ')[1] || '';
      const country = countryFromMXHost(mxHost);
      if (country) return country;
    }
    return null;
  } catch {
    return null;
  }
}

async function resolveIPCountry(domain) {
  try {
    const r = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
      headers: { Accept: 'application/dns-json' }
    });
    const data = await r.json();
    const answer = (data.Answer || []).find(a => a.type === 1);
    if (!answer) return null;
    const ip = answer.data;
    const gr = await fetch(`https://api.country.is/${ip}`);
    const gdata = await gr.json();
    const iso = gdata.country;
    return iso ? (ISO_COUNTRY[iso] || iso) : null;
  } catch {
    return null;
  }
}

async function resolveCountryForDomain(domain) {
  if (geoCache[domain]) return geoCache[domain];
  // Stage 1: MX record → country (most reliable for mail infrastructure)
  const mxCountry = await resolveMXCountry(domain);
  if (mxCountry) {
    geoCache[domain] = mxCountry;
    return mxCountry;
  }
  // Stage 2: A record → IP geolocation (fallback for domains with no useful MX)
  const ipCountry = await resolveIPCountry(domain);
  geoCache[domain] = ipCountry;
  return ipCountry;
}

// ── State ─────────────────────────────────────────────────────
let sorterGroups = {};
let sorterSelectedCountry = null;
let sorterTotalEmails = 0;

// ── Render ────────────────────────────────────────────────────
function renderSorterUI() {
  const panel = document.getElementById('sorterPanel');
  if (!panel) return;

  const countries = Object.keys(sorterGroups).sort((a, b) => {
    if (a === 'International') return 1;
    if (b === 'International') return 1;
    if (a === 'Unknown') return 1;
    if (b === 'Unknown') return 1;
    return sorterGroups[b].length - sorterGroups[a].length;
  });

  // Summary bar
  const named = countries.filter(c => c !== 'Unknown' && c !== 'International').length;
  document.getElementById('sorterTotalCount').textContent = sorterTotalEmails.toLocaleString() + ' emails';
  document.getElementById('sorterCountryCount').textContent = named + ' countries';
  document.getElementById('sorterSummaryBar').style.display = 'flex';
  panel.style.display = 'flex';
  document.getElementById('sorterDropZone').style.display = 'none';

  // Country list
  const listEl = document.getElementById('sorterCountryList');
  listEl.innerHTML = countries.map(c => {
    const flag = getFlagHtml(c);
    const count = sorterGroups[c].length;
    return `<div class="sc-item" data-country="${c}">
      <span class="sc-flag">${flag}</span>
      <span class="sc-name">${c}</span>
      <span class="sc-badge">${count}</span>
    </div>`;
  }).join('');

  listEl.querySelectorAll('.sc-item').forEach(el => {
    el.addEventListener('click', () => selectCountry(el.dataset.country));
  });

  if (window.lucide) window.lucide.createIcons();

  // Select first by default
  if (countries.length) selectCountry(sorterSelectedCountry && sorterGroups[sorterSelectedCountry] ? sorterSelectedCountry : countries[0]);
}

function selectCountry(country) {
  sorterSelectedCountry = country;
  document.querySelectorAll('.sc-item').forEach(el => {
    el.classList.toggle('active', el.dataset.country === country);
  });

  const emails = sorterGroups[country] || [];
  const flag = getFlagHtml(country);
  document.getElementById('sorterEmailHeader').innerHTML =
    `<span style="font-size:22px">${flag}</span> <strong>${country}</strong> <span style="color:var(--muted);font-size:13px;font-weight:600">${emails.length} emails</span>`;

  document.getElementById('sorterEmailList').innerHTML = emails
    .map(e => `<div class="se-row">${escapeHTML(e)}</div>`).join('');

  if (window.lucide) window.lucide.createIcons();

  document.getElementById('sorterDlSelected').onclick = () => downloadCountry(country);
}

function renderProgress(done, total, label) {
  const el = document.getElementById('sorterGeoProgress');
  if (!el) return;
  if (done >= total) { el.style.display = 'none'; return; }
  el.style.display = 'inline';
  el.textContent = `${label || 'Resolving'} ${done}/${total}...`;
}

// ── Main Sort Pipeline ────────────────────────────────────────
async function sortAndRender(emails) {
  const groups = {};
  const geoNeeded = [];

  emails.forEach(email => {
    const domain = (email.split('@')[1] || '').toLowerCase();
    const { country } = classifyDomainFast(domain);
    if (country) {
      (groups[country] = groups[country] || []).push(email);
    } else {
      geoNeeded.push({ email, domain });
    }
  });

  sorterGroups = groups;
  sorterTotalEmails = emails.length;
  saveSorterState();
  renderSorterUI();

  if (!geoNeeded.length) return;

  // Concurrent async worker pool (simulated multi-threading)
  const uniqueDomains = [...new Set(geoNeeded.map(x => x.domain))];
  const domainCountry = {};
  
  let completed = 0;
  const CONCURRENCY_LIMIT = 20;
  const queue = [...uniqueDomains];

  renderProgress(0, uniqueDomains.length, 'MX+IP lookup');

  async function geoWorker() {
    while (queue.length > 0) {
      const domain = queue.shift();
      const c = await resolveCountryForDomain(domain);
      domainCountry[domain] = c || 'Unknown';
      completed++;
      renderProgress(completed, uniqueDomains.length, 'MX+IP lookup');
    }
  }

  const workers = [];
  for (let i = 0; i < Math.min(CONCURRENCY_LIMIT, uniqueDomains.length); i++) {
    workers.push(geoWorker());
  }
  await Promise.all(workers);

  // Assign geo results
  geoNeeded.forEach(({ email, domain }) => {
    const c = domainCountry[domain] || 'Unknown';
    (sorterGroups[c] = sorterGroups[c] || []).push(email);
  });

  renderProgress(uniqueDomains.length, uniqueDomains.length);
  saveSorterState();
  renderSorterUI();
}

function saveSorterState() {
  try {
    sessionStorage.setItem('sorter_groups', JSON.stringify(sorterGroups));
    sessionStorage.setItem('sorter_total', sorterTotalEmails);
  } catch (e) {
    console.warn("Could not save to sessionStorage (file too large?)", e);
  }
}

// ── Downloads ─────────────────────────────────────────────────
function downloadCountry(country) {
  const emails = sorterGroups[country] || [];
  triggerDownload(emails.join('\n'), `${country.replace(/\s+/g,'_').toLowerCase()}_emails.txt`);
}

window.downloadAllSorted = function() {
  const lines = [];
  const countries = Object.keys(sorterGroups).sort((a,b)=>sorterGroups[b].length-sorterGroups[a].length);
  countries.forEach(c => {
    lines.push(`# ${FLAGS[c]||''} ${c} (${sorterGroups[c].length})`);
    sorterGroups[c].forEach(e => lines.push(e));
    lines.push('');
  });
  triggerDownload(lines.join('\n'), 'sorted_by_country.txt');
};

function triggerDownload(text, filename) {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ── File Input ────────────────────────────────────────────────
function initSorter() {
  const dropZone = document.getElementById('sorterDropZone');
  const fileInput = document.getElementById('sorterFileInput');
  if (!dropZone || !fileInput) return;

  dropZone.addEventListener('click', () => fileInput.click());
  dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', e => {
    e.preventDefault(); dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files[0]) processSorterFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener('change', e => {
    if (e.target.files[0]) processSorterFile(e.target.files[0]);
  });

  const reset = document.getElementById('sorterReset');
  if (reset) reset.addEventListener('click', () => {
    sorterGroups = {}; sorterSelectedCountry = null; sorterTotalEmails = 0;
    sessionStorage.removeItem('sorter_groups');
    sessionStorage.removeItem('sorter_total');
    document.getElementById('sorterPanel').style.display = 'none';
    document.getElementById('sorterSummaryBar').style.display = 'none';
    document.getElementById('sorterDropZone').style.display = 'flex';
    fileInput.value = '';
  });

  // Restore from session storage
  const savedGroups = sessionStorage.getItem('sorter_groups');
  const savedTotal = sessionStorage.getItem('sorter_total');
  if (savedGroups && savedTotal) {
    try {
      sorterGroups = JSON.parse(savedGroups);
      sorterTotalEmails = parseInt(savedTotal, 10);
      renderSorterUI();
    } catch (e) {
      console.error('Failed to restore sorter state', e);
    }
  }
}

function processSorterFile(file) {
  const reader = new FileReader();
  reader.onload = e => {
    const emails = [...new Set(
      e.target.result.split(/\r?\n/).map(l => l.trim()).filter(l => l.includes('@'))
    )];
    sortAndRender(emails);
  };
  reader.readAsText(file);
}

function escapeHTML(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
