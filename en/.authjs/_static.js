document.addEventListener("DOMContentLoaded", () => {
                
(async =>{   
   // ===== CUSTOM ALERT SYSTEM =====
        const alertBox = document.getElementById('customAlert');
        const alertIcon = document.getElementById('alertIcon');
        const alertTitle = document.getElementById('alertTitle');
        const alertMessage = document.getElementById('alertMessage');
        let alertTimeout;

        window.showAlert = function(type = 'info', title = '', message = '', duration = 4000) {
            clearTimeout(alertTimeout);
            alertBox.classList.remove('success', 'error', 'info', 'show');
            
            const icons = { success: '✓', error: '✕', info: 'ℹ' };
            alertIcon.textContent = icons[type] || icons.info;
            alertTitle.textContent = title;
            alertMessage.textContent = message;
            alertBox.classList.add(type);
            
            void alertBox.offsetWidth;
            alertBox.classList.add('show');
            
            alertTimeout = setTimeout(() => { alertBox.classList.remove('show'); }, duration);
        };

        window.hideAlert = function() {
            clearTimeout(alertTimeout);
            alertBox.classList.remove('show');
        };

        // ===== TAB SWITCHING =====
        const tabs = document.querySelectorAll('.auth-tab');
        const forms = document.querySelectorAll('.auth-form');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                forms.forEach(f => f.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(tab.dataset.target).classList.add('active');
            });
        });

        document.querySelectorAll('[data-switch]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const target = e.target.getAttribute('data-switch');
                document.querySelector(`.auth-tab[data-target="${target}"]`).click();
            });
        });

        // ===== REFERRAL CODE PROCESSING =====
        function processReferCode() {
            const params = new URLSearchParams(window.location.search);
            let value = params.get("id");
            
            if (!value) {
                const hash = window.location.hash;
                if (hash.startsWith("#ref")) {
                    const queryString = hash.split("?")[1];
                    if (queryString) {
                        const hashParams = new URLSearchParams(queryString);
                        value = hashParams.get("id");
                    }
                }
            }
            
            if (value) {
                document.getElementById("referEm").value = decodeURIComponent(value).trim();
            }
        }
        processReferCode();
})()
})
