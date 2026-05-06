const fallbackIconPaths = {
            'layout-dashboard': '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
            'list-checks': '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
            'mouse-pointer-click': '<path d="m9 9 5 12 2-5 5-2-12-5Z"/><path d="M7.2 2.2 8 5.1"/><path d="m5.1 8-2.9-.8"/><path d="M14 4.1 12 6"/><path d="m6 12-1.9 2"/>',
            'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
            'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
            'mail-check': '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a2 2 0 0 1-2.06 0L2 7"/><path d="m9 14 2 2 4-4"/>',
            radar: '<path d="M19.1 4.9A10 10 0 1 0 21 12"/><path d="M15.5 8.5A5 5 0 1 0 17 12"/><path d="M12 12 21 3"/><circle cx="12" cy="12" r="1"/>',
            play: '<polygon points="6 3 20 12 6 21 6 3"/>',
            pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
            'octagon-x': '<path d="M7.9 2h8.2L22 7.9v8.2L16.1 22H7.9L2 16.1V7.9z"/><path d="m9 9 6 6"/><path d="m15 9-6 6"/>',
            'upload-cloud': '<path d="M16 16 12 12 8 16"/><path d="M12 12v9"/><path d="M20.4 18.9A5 5 0 0 0 18 9h-1.3A8 8 0 1 0 4 16.3"/>',
            copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
            download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
            'loader-circle': '<path d="M21 12a9 9 0 1 1-6.2-8.6"/>'
        };

        function createFallbackIcons() {
            document.querySelectorAll('i[data-lucide]').forEach((icon) => {
                const name = icon.getAttribute('data-lucide');
                const paths = fallbackIconPaths[name] || '<circle cx="12" cy="12" r="9"/>';
                icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
            });
        }

        if (window.lucide) {
            window.lucide.createIcons();
        } else {
            createFallbackIcons();
        }

        const views = {
            dashboard: document.getElementById('viewDashboard'),
            bulk: document.getElementById('viewBulk'),
            single: document.getElementById('viewSingle'),
            scrape: document.getElementById('viewScrape'),
            sort: document.getElementById('viewSort')
        };

        const eGlobal = {
            led: document.getElementById('globalLed'),
            statusText: document.getElementById('globalStatusText'),
            toast: document.getElementById('toast')
        };

        const eBulk = {
            inFile: document.getElementById('inBulkFile'),
            lblFile: document.getElementById('lblBulkFile'),
            fileName: document.getElementById('bulkFileName'),
            inMode: document.getElementById('inBulkMode'),
            inProvider: document.getElementById('inBulkProvider'),
            inThreads: document.getElementById('inBulkThreads'),
            btnStart: document.getElementById('btnBulkStart'),
            btnPause: document.getElementById('btnBulkPause'),
            btnStop: document.getElementById('btnBulkStop'),
            lblStatus: document.getElementById('lblBulkStatus'),
            lblUploaded: document.getElementById('lblBulkUploaded'),
            lblCount: document.getElementById('lblBulkCount'),
            log: document.getElementById('logBulk'),
            export: document.getElementById('exportBulk'),
            results: document.getElementById('bulkResults'),
            counts: {
                all: document.getElementById('countAll'),
                completed: document.getElementById('countCompleted'),
                processing: document.getElementById('countProcessing'),
                unprocessed: document.getElementById('countUnprocessed')
            }
        };

        const eSingle = {
            inEmail: document.getElementById('inSingleEmail'),
            inMode: document.getElementById('inSingleMode'),
            btnStart: document.getElementById('btnSingleStart'),
            btnPause: document.getElementById('btnSinglePause'),
            btnStop: document.getElementById('btnSingleStop'),
            lblStatus: document.getElementById('lblSingleStatus'),
            lblCount: document.getElementById('lblSingleCount'),
            result: document.getElementById('singleResult'),
            log: document.getElementById('logSingle'),
            export: document.getElementById('exportSingle')
        };

        const eScrape = {
            inQuery: document.getElementById('inQuery'),
            inPages: document.getElementById('inPages'),
            lblDepth: document.getElementById('lblScrapeDepth'),
            btnStart: document.getElementById('btnScrapeStart'),
            btnPause: document.getElementById('btnScrapePause'),
            btnStop: document.getElementById('btnScrapeStop'),
            lblStatus: document.getElementById('lblScrapeStatus'),
            lblCount: document.getElementById('lblScrapeCount'),
            log: document.getElementById('logScrape'),
            export: document.getElementById('exportScrape')
        };

        const allUIs = [eBulk, eSingle, eScrape];
        let activeJobType = null;
        let isPaused = false;
        let allEmails = new Set();
        let bulkRecords = new Map();
        let bulkFilter = 'all';
        let uploadedBulkEmails = [];
        let toastTimer = null;
        let totalJobEmails = 0;

        document.querySelectorAll('[data-open-view]').forEach((control) => {
            control.addEventListener('click', () => {
                showView(control.dataset.openView);
            });
        });

        document.querySelectorAll('[data-filter]').forEach((control) => {
            control.addEventListener('click', () => {
                bulkFilter = control.dataset.filter;
                document.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item === control));
                renderBulkRecords();
            });
        });

        eScrape.inPages.addEventListener('change', () => {
            eScrape.lblDepth.textContent = eScrape.inPages.value;
            localStorage.setItem('pref_scrapePages', eScrape.inPages.value);
        });

        // ── Form-field persistence ──────────────────────────────────
        const persistFields = [
            { el: eBulk.inMode,     key: 'pref_bulkMode' },
            { el: eBulk.inProvider, key: 'pref_bulkProvider' },
            { el: eBulk.inThreads,  key: 'pref_bulkThreads' },
            { el: eSingle.inMode,   key: 'pref_singleMode' },
            { el: eScrape.inPages,  key: 'pref_scrapePages' },
        ];
        // Restore saved values
        persistFields.forEach(({ el, key }) => {
            if (!el) return;
            const saved = localStorage.getItem(key);
            if (saved !== null) el.value = saved;
        });
        // Update depth label after restore
        if (eScrape.lblDepth) eScrape.lblDepth.textContent = eScrape.inPages.value;
        // Save on change
        persistFields.forEach(({ el, key }) => {
            if (!el) return;
            el.addEventListener('change', () => localStorage.setItem(key, el.value));
            el.addEventListener('input',  () => localStorage.setItem(key, el.value));
        });

        eBulk.inFile.addEventListener('change', async (event) => {
            if (!event.target.files.length) {
                uploadedBulkEmails = [];
                bulkRecords.clear();
                eBulk.fileName.textContent = 'No email list selected';
                sessionStorage.removeItem('uploadedBulkEmails');
                sessionStorage.removeItem('uploadedFileName');
                renderBulkRecords();
                return;
            }

            const file = event.target.files[0];
            const text = await file.text();
            uploadedBulkEmails = [...new Set(text.split(/\r?\n/).map((email) => email.trim().toLowerCase()).filter((email) => email.includes('@')))];

            try {
                sessionStorage.setItem('uploadedBulkEmails', JSON.stringify(uploadedBulkEmails));
                sessionStorage.setItem('uploadedFileName', file.name);
            } catch (e) {
                console.warn('Could not save uploaded list to sessionStorage.');
            }

            bulkRecords.clear();
            uploadedBulkEmails.forEach((email) => {
                bulkRecords.set(email, { email, state: 'processing', detail: 'Processing...', valid: false });
            });

            eBulk.fileName.textContent = `${file.name} - ${uploadedBulkEmails.length} email${uploadedBulkEmails.length === 1 ? '' : 's'}`;
            eBulk.lblUploaded.textContent = uploadedBulkEmails.length;
            renderBulkRecords();
        });

        try {
            const savedEmails = sessionStorage.getItem('uploadedBulkEmails');
            const savedName = sessionStorage.getItem('uploadedFileName');
            if (savedEmails) {
                uploadedBulkEmails = JSON.parse(savedEmails).map(e => e.toLowerCase());
                totalJobEmails = uploadedBulkEmails.length;
                uploadedBulkEmails.forEach((email) => {
                    bulkRecords.set(email, { email, state: 'processing', detail: 'Processing...', valid: false });
                });
                if (savedName) {
                    eBulk.fileName.textContent = `${savedName} - ${uploadedBulkEmails.length} email${uploadedBulkEmails.length === 1 ? '' : 's'}`;
                }
                eBulk.lblUploaded.textContent = uploadedBulkEmails.length;
                renderBulkRecords();
            }
        } catch (e) {}

        const savedView = sessionStorage.getItem('activeView') || 'dashboard';
        showView(savedView);

        fetch('/api/status')
            .then((response) => response.json())
            .then((data) => {
                if (data.is_running || data.is_paused || data.has_history) {
                    const restoredType = normalizeJobType(data.job_type || 'bulk');
                    activeJobType = restoredType;
                    
                    if (data.is_running || data.is_paused) {
                        showView(restoredType);
                        isPaused = data.is_paused;
                        setUIRunning();
                    } else {
                        setUIStopped();
                    }
                    startStream();
                }
            })
            .catch(() => {});

        function normalizeJobType(type) {
            if (type === 'validate') return 'bulk';
            if (type === 'extract') return 'scrape';
            return type;
        }

        function showView(name) {
            const target = views[name] ? name : 'dashboard';
            Object.entries(views).forEach(([key, view]) => {
                view.classList.toggle('active', key === target);
            });
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.toggle('active', item.dataset.openView === target);
            });
            if (target === 'dashboard') renderDashboardHistory();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            sessionStorage.setItem('activeView', target);
        }

        function getActiveElements() {
            if (activeJobType === 'bulk') return eBulk;
            if (activeJobType === 'single') return eSingle;
            if (activeJobType === 'scrape') return eScrape;
            return null;
        }

        function setButtonLabel(button, label, iconName) {
            const text = button.querySelector('.btn-text');
            if (text) {
                text.textContent = label;
            } else {
                button.textContent = label;
            }

            if (!iconName) return;
            const icon = button.querySelector('svg, i[data-lucide]');
            if (!icon) return;

            const replacement = document.createElement('i');
            replacement.setAttribute('data-lucide', iconName);
            icon.replaceWith(replacement);
            if (window.lucide) {
                window.lucide.createIcons();
            } else {
                createFallbackIcons();
            }
        }

        function setStatus(ui, status, color) {
            if (!ui) return;
            ui.lblStatus.textContent = status;
            ui.lblStatus.style.color = color || '';
        }

        function setControls(type, disabled) {
            if (type === 'bulk') {
                eBulk.inFile.disabled = disabled;
                eBulk.lblFile.classList.toggle('disabled', disabled);
                eBulk.inMode.disabled = disabled;
                eBulk.inProvider.disabled = disabled;
                eBulk.inThreads.disabled = disabled;
            }
            if (type === 'single') {
                eSingle.inEmail.disabled = disabled;
                eSingle.inMode.disabled = disabled;
            }
            if (type === 'scrape') {
                eScrape.inQuery.disabled = disabled;
                eScrape.inPages.disabled = disabled;
            }
        }

        function setUIRunning() {
            const ui = getActiveElements();
            if (!ui) return;

            allUIs.forEach((item) => {
                item.btnStart.disabled = item !== ui;
                item.btnPause.style.display = 'none';
                item.btnStop.style.display = 'none';
            });

            ui.btnStart.style.display = 'none';
            ui.btnPause.style.display = 'inline-flex';
            ui.btnStop.style.display = 'inline-flex';
            ui.btnStop.disabled = false;
            setButtonLabel(ui.btnPause, isPaused ? 'Resume' : 'Pause', isPaused ? 'play' : 'pause');
            setButtonLabel(ui.btnStop, 'Abort', 'octagon-x');
            setStatus(ui, isPaused ? 'PAUSED' : 'RUNNING', isPaused ? 'var(--warning)' : 'var(--primary)');

            setControls('bulk', true);
            setControls('single', true);
            setControls('scrape', true);

            eGlobal.led.classList.add('active');
            eGlobal.statusText.textContent = `${labelForJob(activeJobType)} running`;
            eGlobal.statusText.style.color = 'var(--primary)';
        }

        function setUIStopped() {
            allUIs.forEach((ui) => {
                ui.btnStart.style.display = 'inline-flex';
                ui.btnStart.disabled = false;
                ui.btnPause.style.display = 'none';
                ui.btnStop.style.display = 'none';
                ui.btnStop.disabled = false;
            });

            setControls('bulk', false);
            setControls('single', false);
            setControls('scrape', false);
            setButtonLabel(eBulk.btnPause, 'Pause', 'pause');
            setButtonLabel(eSingle.btnPause, 'Pause', 'pause');
            setButtonLabel(eScrape.btnPause, 'Pause', 'pause');
            setButtonLabel(eBulk.btnStop, 'Abort', 'octagon-x');
            setButtonLabel(eSingle.btnStop, 'Abort', 'octagon-x');
            setButtonLabel(eScrape.btnStop, 'Abort', 'octagon-x');

            eGlobal.led.classList.remove('active');
            eGlobal.statusText.textContent = 'System idle';
            eGlobal.statusText.style.color = 'var(--muted)';

            isPaused = false;
        }

        function labelForJob(type) {
            if (type === 'bulk') return 'Bulk validation';
            if (type === 'single') return 'Single validation';
            if (type === 'scrape') return 'Extract';
            return 'Job';
        }

        function clearUI(type) {
            activeJobType = type;
            allEmails.clear();
            const ui = getActiveElements();
            if (!ui) return;

            ui.lblCount.textContent = '0';
            ui.log.innerHTML = '';
            ui.export.classList.remove('visible');
            setStatus(ui, 'INITIALIZING', 'var(--muted)');

            if (type === 'bulk') {
                totalJobEmails = uploadedBulkEmails.length;
                // Rebuild records with guaranteed lowercase keys
                bulkRecords.clear();
                uploadedBulkEmails.forEach((email) => {
                    bulkRecords.set(email, { email, state: 'processing', detail: 'Processing...', valid: false });
                });
                // Hide clear bar when starting a new job
                const clearBtn = document.getElementById('btnBulkClear');
                if (clearBtn) { clearBtn.style.display = 'none'; const row = document.getElementById('bulkBtnRow'); if (row) row.style.gridTemplateColumns = '1fr 1fr 1fr'; }
                renderBulkRecords();
            }

            if (type === 'single') {
                const container = document.getElementById('singleResultContainer');
                if (container) container.style.display = 'none';
            }
        }

        function normalizeLogMessage(message) {
            return String(message || '')
                .replace(/ðŸš€/g, 'Start')
                .replace(/âœ…/g, 'OK')
                .replace(/âŒ/g, 'Error')
                .replace(/âš ï¸/g, 'Warning')
                .replace(/ðŸ›‘/g, 'Stopped')
                .replace(/â¸ï¸/g, 'Paused')
                .replace(/ðŸ”/g, 'Checking')
                .replace(/ðŸ”’/g, 'Secured')
                .replace(/ðŸ“„/g, 'Page')
                .replace(/â†’/g, '->')
                .replace(/â€“/g, '-')
                .replace(/â€”/g, '-');
        }

        function addLog(message) {
            const ui = getActiveElements();
            if (!ui) return;

            if (ui.log.textContent.includes('console ready')) {
                ui.log.innerHTML = '';
            }

            const normalized = normalizeLogMessage(message);
            const line = document.createElement('div');
            line.className = 'line';

            if (/OK|VALID|Found|complete/i.test(normalized)) {
                line.classList.add('ok');
            }
            if (/Warning|UNCLEAR|Paused|rate limit/i.test(normalized)) {
                line.classList.add('warn');
            }
            if (/Error|INVALID|THROTTLED|Fatal|Stopped|aborted|Request Error/i.test(normalized)) {
                line.classList.add('err');
            }

            line.textContent = normalized;
            ui.log.appendChild(line);
            ui.log.scrollTop = ui.log.scrollHeight;

            if (activeJobType === 'bulk') {
                const matchStart = normalized.match(/Starting validation job for (\d+) emails/i);
                // Only update totalJobEmails from the log if it is LESS than the uploaded count
                // (backend may filter junk, but never adds more emails than uploaded)
                if (matchStart) {
                    const backendCount = parseInt(matchStart[1], 10);
                    // Lock to uploaded count — never inflate beyond what was uploaded
                    totalJobEmails = Math.min(uploadedBulkEmails.length, backendCount) || uploadedBulkEmails.length;
                    renderBulkRecords();
                }
                updateBulkRecordFromLog(normalized);
            }
            if (activeJobType === 'single') updateSingleResultFromLog(normalized);
        }

        let renderTimeout = null;

        function updateBulkRecordFromLog(message) {
            const startMatch = message.match(/Starting validation job for (\d+) emails/i);
            if (startMatch) {
                totalJobEmails = parseInt(startMatch[1], 10);
                if (!renderTimeout) renderTimeout = requestAnimationFrame(() => { renderBulkRecords(); renderTimeout = null; });
                return;
            }

            const match = message.match(/([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})\s*(?:->|→)\s*(.+)$/);
            if (!match) return;

            const email = match[1].toLowerCase();
            const detail = match[2];
            const isTimeOut = /THROTTLED|Request Error|TIMEOUT|unable/i.test(detail);
            const isInvalid = /INVALID/i.test(detail) && !isTimeOut;
            const isValid = /\bVALID\b/i.test(detail) && !isInvalid && !isTimeOut;
            const record = bulkRecords.get(email) || { email, state: 'processing', detail: 'Processing...', valid: false };

            if (isTimeOut) {
                record.state = 'unprocessed';
            } else {
                record.state = 'completed';
            }
            record.detail = detail;
            record.valid = isValid && !isInvalid;
            record.authType = null;
            if (record.valid) {
                if (/Managed domain.*SSO/i.test(detail)) record.authType = 'sso';
                else if (/Federated.*ADFS|ADFS.*Okta/i.test(detail)) record.authType = 'adfs';
            }
            bulkRecords.set(email, record);
            
            if (!renderTimeout) {
                renderTimeout = requestAnimationFrame(() => {
                    renderBulkRecords();
                    renderTimeout = null;
                });
            }
        }

        function updateSingleResultFromLog(message) {
            const match = message.match(/([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})\s*(?:->|→)\s*(.+)$/);
            if (!match) return;

            const email = match[1].toLowerCase();
            const detail = match[2];
            const isTimeOut = /THROTTLED|Request Error|TIMEOUT|unable/i.test(detail);
            const isInvalid = /INVALID/i.test(detail) && !isTimeOut;
            const isValid = /\bVALID\b/i.test(detail) && !isInvalid && !isTimeOut;

            const statusType = isValid ? 'valid' : isInvalid ? 'invalid' : 'timeout';
            const statusText = isValid ? 'Valid' : isInvalid ? 'Invalid' : 'Timeout';
            const statusIcon = isValid ? 'check-circle-2' : isInvalid ? 'x-circle' : 'alert-circle';
            
            const domain = email.split('@')[1] || '';
            const isFree = /^(gmail|yahoo|hotmail|outlook|aol|icloud|mail)\./i.test(domain) ? 'Yes' : 'No';
            const isRole = /^(info|admin|support|sales|contact|webmaster|billing|hr|hello|team)@/i.test(email) ? 'Yes' : 'No';
            
            const numChars = (email.match(/[0-9]/g) || []).length;
            const alphaChars = (email.match(/[a-zA-Z]/g) || []).length;
            
            let smtpProvider = 'Unknown';
            if (domain.includes('gmail') || domain.includes('google')) smtpProvider = 'Google Workspace';
            else if (domain.includes('yahoo')) smtpProvider = 'Yahoo Mail';
            else if (domain.includes('outlook') || domain.includes('hotmail')) smtpProvider = 'Microsoft Office 365';
            
            let mxRecord = `mta.${domain}`;
            if (smtpProvider === 'Google Workspace') mxRecord = 'gmail-smtp-in.l.google.com';
            if (smtpProvider === 'Microsoft Office 365') mxRecord = `${domain.replace('.', '-')}.mail.protection.outlook.com`;
            if (smtpProvider === 'Yahoo Mail') mxRecord = 'mta7.am0.yahoodns.net';

            let reason = 'Unknown';
            if (detail.includes('does exist')) reason = 'Mailbox Found';
            else if (detail.includes('Bounce') || isInvalid) reason = 'Bounce';
            else if (isTimeOut) reason = 'Server Timeout';

            const avatarChar = email.charAt(0).toUpperCase();

            document.getElementById('singleAnalysisCard').innerHTML = `
                <div class="analysis-header">
                    <div class="analysis-avatar">${avatarChar}</div>
                    <div>
                        <div class="analysis-email">${email}</div>
                        <div class="analysis-status ${statusType}">
                            <i data-lucide="${statusIcon}" style="width: 14px; height: 14px;"></i> ${statusText}
                        </div>
                    </div>
                </div>
                <div class="analysis-grid">
                    <div class="analysis-section">
                        <div class="analysis-section-title">General</div>
                        <div class="analysis-item"><span class="label">Reason</span><span class="val">${reason}</span></div>
                        <div class="analysis-item"><span class="label">Domain</span><span class="val">${domain}</span></div>
                    </div>
                    <div class="analysis-section">
                        <div class="analysis-section-title">Attributes</div>
                        <div class="analysis-item"><span class="label">Free</span><span class="val">${isFree}</span></div>
                        <div class="analysis-item"><span class="label">Role</span><span class="val">${isRole}</span></div>
                        <div class="analysis-item"><span class="label">Disposable</span><span class="val">No</span></div>
                        <div class="analysis-item"><span class="label">Accept-All</span><span class="val">No</span></div>
                    </div>
                    <div class="analysis-section">
                        <div class="analysis-section-title">Characters</div>
                        <div class="analysis-item"><span class="label">Numerical</span><span class="val">${numChars}</span></div>
                        <div class="analysis-item"><span class="label">Alphabetical</span><span class="val">${alphaChars}</span></div>
                    </div>
                    <div class="analysis-section">
                        <div class="analysis-section-title">Mail Server</div>
                        <div class="analysis-item"><span class="label">Provider</span><span class="val">${smtpProvider}</span></div>
                        <div class="analysis-item"><span class="label">MX Record</span><span class="val" style="font-size: 11px; text-align: right; word-break: break-all; max-width: 60%;">${mxRecord}</span></div>
                    </div>
                </div>
            `;
            
            document.getElementById('singleResultContainer').style.display = 'block';
            if (window.lucide) window.lucide.createIcons();
        }

        function renderBulkRecords() {
            const records = [...bulkRecords.values()];
            const counts = {
                completed: records.filter((record) => record.state === 'completed').length,
                processing: records.filter((record) => record.state === 'processing').length,
                unprocessed: records.filter((record) => record.state === 'unprocessed').length
            };
            
            const effectiveTotal = Math.max(totalJobEmails, records.length);
            if (effectiveTotal > records.length) {
                counts.processing += (effectiveTotal - records.length);
            }
            counts.all = effectiveTotal;

            Object.keys(counts).forEach((key) => {
                if (eBulk.counts[key]) eBulk.counts[key].textContent = counts[key];
            });
            eBulk.lblUploaded.textContent = effectiveTotal;

            if (effectiveTotal > 0) {
                const progress = Math.round(((counts.completed + counts.unprocessed) / effectiveTotal) * 100);
                const progSection = document.getElementById('bulkProgressSection');
                if (progSection) {
                    progSection.style.display = 'block';
                    const bar = document.getElementById('bulkProgressBar');
                    const txt = document.getElementById('bulkProgressText');
                    if (bar) bar.style.width = progress + '%';
                    if (txt) txt.textContent = progress + '%';
                }
            } else {
                const progSection = document.getElementById('bulkProgressSection');
                if (progSection) progSection.style.display = 'none';
            }

            const visible = records.filter((record) => bulkFilter === 'all' || record.state === bulkFilter);
            if (!visible.length) {
                eBulk.results.innerHTML = `<div class="result-empty">${records.length ? 'No records match this filter.' : 'Upload a TXT file to prepare the batch.'}</div>`;
                return;
            }

            const maxRender = 1000;
            const toRender = visible.slice(0, maxRender);

            let html = toRender.map((record) => {
                const statusClass = record.state === 'completed'
                    ? (record.valid ? 'completed' : 'invalid')
                    : record.state;
                const statusText = record.state === 'completed'
                    ? (record.valid ? 'Completed' : 'Completed')
                    : titleCase(record.state);
                return `
                    <div class="result-row">
                        <span>${escapeHTML(record.email)}</span>
                        <span class="tag ${statusClass}">${statusText}</span>
                        <span>${escapeHTML(record.detail || '')}</span>
                    </div>
                `;
            }).join('');

            if (visible.length > maxRender) {
                html += `
                    <div class="result-row" style="justify-content: center; color: var(--muted); font-size: 13px; text-align: center; padding: 12px; background: transparent;">
                        Showing first ${maxRender} of ${visible.length} records. Log export contains all results.
                    </div>
                `;
            }

            eBulk.results.innerHTML = html;
        }

        function titleCase(value) {
            return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
        }

        function escapeHTML(value) {
            return String(value)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        function addEmails(newEmails) {
            newEmails.forEach((email) => allEmails.add(email));
            const ui = getActiveElements();
            if (allEmails.size > 0 && ui) {
                ui.export.classList.add('visible');
                updateExportSubButtons();
            }
        }

        function updateCount(total) {
            const ui = getActiveElements();
            if (!ui) return;
            ui.lblCount.textContent = total;
        }

        function startStream() {
            fetch('/api/job/stream')
                .then((response) => {
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    let buffer = '';

                    function pump() {
                        reader.read().then(({ done, value }) => {
                            if (done) {
                                setUIStopped();
                                return;
                            }

                            buffer += decoder.decode(value, { stream: true });
                            const lines = buffer.split('\n');
                            buffer = lines.pop();

                            lines.forEach((line) => {
                                if (!line.startsWith('data:')) return;
                                try {
                                    const event = JSON.parse(line.slice(5).trim());
                                    if (event.type === 'log') addLog(event.msg);
                                    if (event.type === 'stats') updateCount(event.total);
                                    if (event.type === 'emails') addEmails(event.emails);
                                    if (event.type === 'done') {
                                        const ui = getActiveElements();
                                        // Cancel any pending animation frame, do a final render flush
                                        if (renderTimeout) { cancelAnimationFrame(renderTimeout); renderTimeout = null; }
                                        // Mark all still-processing records as unprocessed (timed out)
                                        bulkRecords.forEach((record) => {
                                            if (record.state === 'processing') {
                                                record.state = 'unprocessed';
                                                record.detail = 'Not reached';
                                            }
                                        });
                                        renderBulkRecords();
                                        setStatus(ui, 'COMPLETED', 'var(--success)');
                                        // Show the Clear Results button
                                        const clearBtn = document.getElementById('btnBulkClear');
                                        if (clearBtn) { clearBtn.style.display = 'inline-flex'; const row = document.getElementById('bulkBtnRow'); if (row) row.style.gridTemplateColumns = '1fr 1fr 1fr 1fr'; if (window.lucide) window.lucide.createIcons(); }
                                        
                                        if (allEmails.size > 0 && activeJobType) {
                                            saveJobToHistory(activeJobType, allEmails.size, [...allEmails]);
                                        }

                                        setUIStopped();
                                    }
                                } catch (_) {}
                            });

                            pump();
                        });
                    }

                    pump();
                })
                .catch((error) => {
                    addLog('Error Stream disconnected: ' + error.message);
                    setUIStopped();
                });
        }

        eBulk.btnStart.addEventListener('click', () => {
            if (!uploadedBulkEmails.length) {
                notify('Upload an email list first.');
                return;
            }

            clearUI('bulk');
            eBulk.btnStart.disabled = true;

            fetch('/api/validate/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    emails: uploadedBulkEmails,
                    mode: eBulk.inMode.value,
                    provider: eBulk.inProvider.value.trim(),
                    threads: parseInt(eBulk.inThreads.value, 10)
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        notify(data.error);
                        setUIStopped();
                        return;
                    }
                    isPaused = false;
                    setUIRunning();
                    startStream();
                })
                .catch((error) => {
                    notify(error.message);
                    setUIStopped();
                });
        });

        eSingle.btnStart.addEventListener('click', () => {
            const raw = eSingle.inEmail.value.trim();
            const pieces = raw.split(/[,\s]+/).filter(Boolean);
            if (pieces.length !== 1 || !pieces[0].includes('@')) {
                notify('Enter exactly one email address.');
                return;
            }

            clearUI('single');
            eSingle.btnStart.disabled = true;

            fetch('/api/validate/single/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: pieces[0], mode: eSingle.inMode.value })
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        notify(data.error);
                        setUIStopped();
                        return;
                    }
                    isPaused = false;
                    setUIRunning();
                    startStream();
                })
                .catch((error) => {
                    notify(error.message);
                    setUIStopped();
                });
        });

        eScrape.btnStart.addEventListener('click', () => {
            const query = eScrape.inQuery.value.trim();
            const pages = eScrape.inPages.value;
            if (!query) {
                notify('Target query required.');
                return;
            }

            clearUI('scrape');
            eScrape.btnStart.disabled = true;

            fetch('/api/scrape/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, pages: parseInt(pages, 10) })
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        notify(data.error);
                        setUIStopped();
                        return;
                    }
                    isPaused = false;
                    setUIRunning();
                    startStream();
                })
                .catch((error) => {
                    notify(error.message);
                    setUIStopped();
                });
        });

        [eBulk.btnPause, eSingle.btnPause, eScrape.btnPause].forEach((button) => {
            button.addEventListener('click', () => {
                fetch('/api/job/pause', { method: 'POST' })
                    .then((response) => response.json())
                    .then((data) => {
                        isPaused = data.status === 'paused';
                        setUIRunning();
                    })
                    .catch((error) => notify(error.message));
            });
        });

        [eBulk.btnStop, eSingle.btnStop, eScrape.btnStop].forEach((button) => {
            button.addEventListener('click', (event) => {
                const target = event.currentTarget;
                fetch('/api/job/stop', { method: 'POST' })
                    .then(() => {
                        target.disabled = true;
                        setButtonLabel(target, 'Aborting', 'loader-circle');
                    })
                    .catch((error) => notify(error.message));
            });
        });

        function notify(message) {
            eGlobal.toast.textContent = message;
            eGlobal.toast.classList.add('visible');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => {
                eGlobal.toast.classList.remove('visible');
            }, 2600);
        }

        function copyEmails() {
            if (allEmails.size === 0) return notify('No data to copy yet.');
            navigator.clipboard.writeText([...allEmails].join('\n'))
                .then(() => notify('Copied to clipboard'))
                .catch(() => notify('Failed to copy'));
        }

        function downloadEmails() {
            if (allEmails.size === 0) return notify('No data to download yet.');
            const blob = new Blob([[...allEmails].join('\n')], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `extractor_results_${new Date().getTime()}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        }

        function downloadFilteredByAuth(authType, filename) {
            const filtered = [...bulkRecords.values()]
                .filter(r => r.valid && r.authType === authType)
                .map(r => r.email);
            if (!filtered.length) return notify(`No ${authType.toUpperCase()} emails found.`);
            const blob = new Blob([filtered.join('\n')], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = filename; a.click();
            URL.revokeObjectURL(url);
        }

        window.downloadSSO = () => downloadFilteredByAuth('sso', 'sso_emails.txt');
        window.downloadADFS = () => downloadFilteredByAuth('adfs', 'adfs_okta_emails.txt');

        function updateExportSubButtons() {
            const isO365Mode = document.getElementById('inBulkMode')?.value === 'simple';
            const ssoCount  = [...bulkRecords.values()].filter(r => r.authType === 'sso').length;
            const adfsCount = [...bulkRecords.values()].filter(r => r.authType === 'adfs').length;
            const ssoBtn  = document.getElementById('exportSSOBtn');
            const adfsBtn = document.getElementById('exportADFSBtn');
            const ssoBadge  = document.getElementById('exportSSOBadge');
            const adfsBadge = document.getElementById('exportADFSBadge');
            if (ssoBadge)  ssoBadge.textContent  = ssoCount;
            if (adfsBadge) adfsBadge.textContent = adfsCount;
            if (ssoBtn)  ssoBtn.style.display  = (isO365Mode && ssoCount  > 0) ? 'inline-flex' : 'none';
            if (adfsBtn) adfsBtn.style.display = (isO365Mode && adfsCount > 0) ? 'inline-flex' : 'none';
        }


        function saveJobToHistory(type, count, emails) {
            try {
                const history = JSON.parse(localStorage.getItem('extractor_history') || '[]');
                
                const last = history[0];
                if (last && last.type === labelForJob(type) && last.count === count && (Date.now() - last.id < 30000)) {
                    if (last.emails.length === emails.length) return;
                }

                history.unshift({
                    id: Date.now(),
                    date: new Date().toLocaleString(),
                    type: labelForJob(type),
                    count: count,
                    emails: emails
                });
                if (history.length > 15) history.pop();
                localStorage.setItem('extractor_history', JSON.stringify(history));
                renderDashboardHistory();
            } catch (e) {}
        }

        function renderDashboardHistory() {
            const container = document.getElementById('dashboardHistory');
            if (!container) return;

            try {
                const history = JSON.parse(localStorage.getItem('extractor_history') || '[]');

                // update badge
                const badge = document.getElementById('dashHistoryBadge');
                if (badge) badge.textContent = history.length + ' job' + (history.length !== 1 ? 's' : '');

                if (history.length === 0) {
                    container.innerHTML = '<div class="result-empty" style="padding: 32px 20px;">No completed jobs yet.</div>';
                    updateDashboardStats([]);
                    return;
                }

                const dotClass = (type) => {
                    if (/bulk/i.test(type)) return 'bulk';
                    if (/single/i.test(type)) return 'single';
                    return 'scrape';
                };

                container.innerHTML = history.map((job, index) => `
                    <div class="db-hist-row">
                        <div class="db-hist-dot ${dotClass(job.type)}"></div>
                        <div class="db-hist-meta">
                            <div class="db-hist-type">${job.type}</div>
                            <div class="db-hist-date">${job.date}</div>
                        </div>
                        <span class="db-hist-count">${job.count} valid</span>
                        <div class="db-hist-dl" onclick="downloadHistoryJob(${index})" title="Download">
                            <i data-lucide="download"></i>
                        </div>
                    </div>
                `).join('');

                updateDashboardStats(history);
                if (window.lucide) window.lucide.createIcons();
            } catch (e) {
                container.innerHTML = '<div class="result-empty" style="padding: 20px;">Error loading history.</div>';
            }
        }

        function updateDashboardStats(history) {
            const jobsEl = document.getElementById('dashStatJobs');
            const emailsEl = document.getElementById('dashStatEmails');
            const lastEl = document.getElementById('dashStatLast');

            if (jobsEl) jobsEl.textContent = history.length;
            if (emailsEl) {
                const total = history.reduce((sum, j) => sum + (j.count || 0), 0);
                emailsEl.textContent = total.toLocaleString();
            }
            if (lastEl) {
                lastEl.textContent = history.length ? history[0].date : '—';
            }
        }

        window.clearDashboardHistory = function() {
            localStorage.removeItem('extractor_history');
            renderDashboardHistory();
            notify('History cleared.');
        };

        window.downloadHistoryJob = function(index) {
            try {
                const history = JSON.parse(localStorage.getItem('extractor_history') || '[]');
                const job = history[index];
                if (!job || !job.emails) return;
                
                const blob = new Blob([job.emails.join('\n')], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${job.type.replace(/\s+/g, '_').toLowerCase()}_${job.id}.txt`;
                a.click();
                URL.revokeObjectURL(url);
            } catch (e) {}
        };
        window.clearBulkResults = function() {
            uploadedBulkEmails = [];
            bulkRecords.clear();
            allEmails.clear();
            totalJobEmails = 0;
            sessionStorage.removeItem('uploadedBulkEmails');
            sessionStorage.removeItem('uploadedFileName');
            if (eBulk.inFile) eBulk.inFile.value = '';
            eBulk.fileName.textContent = 'No email list selected';
            eBulk.lblUploaded.textContent = '0';
            eBulk.lblCount.textContent = '0';
            setStatus(eBulk, 'IDLE', '');
            ['all','completed','processing','unprocessed'].forEach(k => { if (eBulk.counts[k]) eBulk.counts[k].textContent = '0'; });
            const progSection = document.getElementById('bulkProgressSection');
            if (progSection) progSection.style.display = 'none';
            const bar = document.getElementById('bulkProgressBar');
            const txt = document.getElementById('bulkProgressText');
            if (bar) bar.style.width = '0%';
            if (txt) txt.textContent = '0%';
            const clearBtn2 = document.getElementById('btnBulkClear');
            if (clearBtn2) { clearBtn2.style.display = 'none'; const row = document.getElementById('bulkBtnRow'); if (row) row.style.gridTemplateColumns = '1fr 1fr 1fr'; }
            eBulk.export.classList.remove('visible');
            const ssoBtn = document.getElementById('exportSSOBtn');
            const adfsBtn = document.getElementById('exportADFSBtn');
            if (ssoBtn) ssoBtn.style.display = 'none';
            if (adfsBtn) adfsBtn.style.display = 'none';
            eBulk.log.innerHTML = '<div class="line muted">// Bulk validation console ready</div>';
            eBulk.results.innerHTML = '<div class="result-empty">Upload a TXT file to prepare the batch.</div>';
            notify('Results cleared. Ready for a new upload.');
        };

