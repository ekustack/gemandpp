    // ===== CUSTOM ALERT SYSTEM =====
const alertBox = document.getElementById('customAlert');
const alertIcon = document.getElementById('alertIcon');
const alertTitle = document.getElementById('alertTitle');
const alertMessage = document.getElementById('alertMessage');

let alertTimeout;

window.showAlert = function(type = 'info', title = '', message = '', duration = 4000) {
    clearTimeout(alertTimeout);
    
    // Remove existing classes
    alertBox.classList.remove('success', 'error', 'warning', 'info', 'show');
    
    // Set icon based on type
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    alertIcon.textContent = icons[type] || icons.info;
    alertTitle.textContent = title;
    alertMessage.textContent = message;
    
    // Add type class
    alertBox.classList.add(type);
    
    // Force reflow
    void alertBox.offsetWidth;
    
    // Show alert
    alertBox.classList.add('show');
    
    // Auto hide
    alertTimeout = setTimeout(() => {
        alertBox.classList.remove('show');
    }, duration);
};

window.hideAlert = function() {
    clearTimeout(alertTimeout);
    alertBox.classList.remove('show');
};

// Override window.alert
window.alert = function(message) {
    showAlert('info', 'Notification', message, 3000);
};

// ===== FIREBASE INTEGRATION =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


    const res=await fetch("/.netlify/functions/verifyFb");const config=await res.json();const app = initializeApp(config);const auth = getAuth(app);const db = getFirestore(app);const pointCollection = collection(db, "points");

let currentUser = null;
const userCard = {
    image: document.querySelector(".re-user-img"),
    name: document.querySelector(".re-user-name"),
    pp: document.querySelector(".pp-count"),
    gm: document.querySelector(".gm-count"),
    ngn: document.querySelector(".ngn"),
    ex: document.querySelector(".c-ex"),
    ppIcon: document.querySelector(".icon"),
    gmIcon: document.querySelector(".gm"),
    getGem: document.querySelector(".gem"),
    getGift: document.querySelector(".gift"),
    claimCard: document.querySelector(".gift-claim"),
    claimGm: document.querySelector(".gm-claim"),
    uname: document.getElementById("uname"),
    uem: document.getElementById("uem"),
    tpp: document.getElementById("tpp"),
    tgm: document.getElementById("tgm"),
};

// Loader
let p = 0;
let intv = setInterval(() => {
    p += 7;
    const fill = document.getElementById('loadFill');
    if (fill) fill.style.width = p + '%';
    if (p >= 100) {
        clearInterval(intv);
        setTimeout(() => {
            const loader = document.getElementById('pageLoader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => { loader.style.display = 'none'; }, 600);
            }
        }, 200);
    }
}, 60);

// Enhanced menu toggle with animation
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
    
    // Close menu when clicking a nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Auth state
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        
        userCard.image.textContent = currentUser.displayName ? currentUser.displayName.slice(0, 1) : "U";
        
        userCard.name.textContent = currentUser.displayName || `user_${currentUser.uid?.slice(0, 5) || 'user'}`;
        document.querySelector(".form.u-name").textContent = userCard.name.textContent;
        
        const giftCount = document.querySelector(".gift-count");
        if (userCard.uem) userCard.uem.value = currentUser.email;
        document.querySelector("#u-email").textContent = currentUser.email;
        
        if (userCard.uname) userCard.uname.value = currentUser.displayName || 'User';
        
        const refInput = document.getElementById("refURL");
        if (refInput) refInput.value = `https://gemandpp.netlify.app/enter#ref?id=${encodeURIComponent(currentUser.email)}`;
        
        if (giftCount) {
            const cards = userCard.claimCard?.querySelectorAll(".card");
            if (cards) giftCount.innerText = cards.length;
        }
        
        userCard.getGift?.addEventListener("click", () => {
            if (userCard.claimCard) userCard.claimCard.style.display = 'block';
        });
        
        userCard.claimCard?.querySelectorAll(".card button").forEach(btn => {
            btn.onclick = function claimed() {
                btn.style.opacity = "50%";
                btn.textContent = "CLAIMED";
                addPoint(1);
                if (giftCount) giftCount.innerText = parseInt(giftCount.innerText) - 1;
                btn.onclick = null;
                window.open("https://www.revenuecpmgate.com/uxx2gjrqc?key=76a628bbfc45e55ee2e31d6593b85938");
            };
        });
        
        initPoints();
    } else {
        window.location.href = "/enter.html";
    }
});

// Logout
document.getElementById("logoutBtn")?.addEventListener('click', () => {
    signOut(auth).then(() => {
        showAlert('success', 'Logged Out', 'You have been logged out successfully');
        setTimeout(() => window.location.reload(), 1500);
    }).catch((error) => {
        showAlert('error', 'Error', error.message);
    });
});

// Points initialization
window.initPoints = async function initPoints() {
    if (!currentUser) return;
    
    const pointEm = currentUser.email;
    try {
        const pq = query(pointCollection, where("emailAdd", "==", pointEm));
        const snapshot = await getDocs(pq);
        let userDoc;
        
        if (snapshot.empty) {
            const newDoc = await addDoc(pointCollection, {
                emailAdd: pointEm,
                points: 5,
                claimed: true,
                createdAt: Date.now()
            });
            userDoc = { id: newDoc.id, points: 5 };
            userCard.pp.name = userDoc.id;
        } else {
            const docSnap = snapshot.docs[0];
            userDoc = { id: docSnap.id, ...docSnap.data() };
            userCard.pp.name = userDoc.id;
            
            if (userDoc.claimed === false) {
                const userRef = doc(db, "points", userDoc.id);
                await updateDoc(userRef, {
                    points: (userDoc.points || 0) + 5,
                    claimed: true
                });
                userDoc.points = (userDoc.points || 0) + 5;
            }
        }
        
        if (userCard.pp) {
            userCard.pp.textContent = userDoc.points || 0;
            document.querySelector(".form.u-pp").textContent = userCard.pp.textContent;
            
            if (userCard.tpp){ userCard.tpp.value = userDoc.points || 0;
            } 
        }
        
        const arr = [15, 12, 24, 17, 28, 10, 26, 8, 13, 20, 25, 14, 6, 13, 18, 27, 19, 16, 7, 19];
        const num = arr[Math.floor(Math.random() * arr.length)];
        const nr = ((userDoc.points || 0) - 30) / num;
        
        if (userCard.ngn){ userCard.ngn.textContent = fn(nr > 0 ? nr : 0);
        document.querySelector(".form.u-ngn").textContent = userCard.ngn.textContent;
        } 
        
        if (userDoc.points >= 50) {
            if (userCard.gm) {
                let ratio = (userDoc.points - 46) / userDoc.points;
                ratio = ratio < 0 ? 0 : ratio;
                userCard.gm.textContent = ratio.toFixed(2);
                document.querySelector(".form.u-gm").textContent = userCard.gm.textContent;
                
                if (userCard.tgm) userCard.tgm.value = ratio.toFixed(2);
                
            }
        }
        // Call on load and  
updateLeaderboardPosition();
    } catch (err) {
        console.error("Error initializing points:", err);
    }
};

window.addPoint = async function addPoint(pointTo) {
    if (!userCard.pp.name) return;
    const uRef = doc(db, "points", userCard.pp.name);
    await updateDoc(uRef, { points: increment(pointTo) });
    initPoints();
};

window.fn = function fn(fng) {
    return fng.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// PayPal
window.payFor = async function payFor(addPP, PPamt) {
    const paySection = document.querySelector(".pay-for");
    if (paySection) paySection.style.display = 'block';
    
    const container = document.querySelector("#paypal-button-container");
    if (container) container.innerHTML = "";
    
    if (window.paypal && container) {
        paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{ amount: { value: String(PPamt) } }]
                });
            },
            onApprove: async (data, actions) => {
                const details = await actions.order.capture();
                await addPoint(addPP);
                showAlert('success', 'Payment Successful!', 
                    `Thank you, ${details.payer.name.given_name}! ${addPP} PP added to your account.`);
                if (paySection) paySection.style.display = 'none';
            },
            onError: (err) => {
                showAlert('error', 'Payment Failed', 'Please try again later.');
            }
        }).render('#paypal-button-container');
    }
};

// Spin Wheel
const canvas = document.getElementById("wheel");
if (canvas) {
    const ctx = canvas.getContext("2d");
    const rewards = [
        { text: "+5 PP", value: 5 }, { text: "+1 PP", value: 1 }, { text: "-3 PP", value: -3 },
        { text: "Try Again", value: 0 }, { text: "+10 PP", value: 10 }, { text: "-1 PP", value: -1 },
        { text: "-10 PP", value: -10 }, { text: "+2 PP", value: 2 }, { text: "+9 PP", value: 9 },
        { text: "-13 PP", value: -13 }, { text: "Try Again", value: 0 }, { text: "+25 PP", value: 25 },
        { text: "-9 PP", value: -9 }, { text: "Try Again", value: 0 }, { text: "-7 PP", value: -7 },
        { text: "-16 PP", value: -16 }, { text: "-12 PP", value: -12 }, { text: "+4 PP", value: 4 }
    ];
    
    function drawWheel() {
        const arc = (2 * Math.PI) / rewards.length;
        rewards.forEach((reward, i) => {
            ctx.beginPath();
            ctx.fillStyle = i % 2 === 0 ? "#f4a261" : "#2a9d8f";
            ctx.moveTo(150, 150);
            ctx.arc(150, 150, 150, i * arc, (i + 1) * arc);
            ctx.fill();
            ctx.save();
            ctx.fillStyle = "#fff";
            ctx.translate(150, 150);
            ctx.rotate(i * arc + arc / 2);
            ctx.textAlign = "right";
            ctx.font = "16px Arial";
            ctx.fillText(reward.text, 140, 10);
            ctx.restore();
        });
    }
    drawWheel();
    
    document.getElementById("spinBtn")?.addEventListener("click", () => {
        const ppCount = parseInt(userCard.pp?.textContent) || 0;
        if (ppCount < 6) {
            showAlert('warning', 'Insufficient PP', 
                'You need at least 6 PP to spin. Keep engaging to earn more!');
            return;
        }
        
        let deg = 0;
        const spins = 15 + Math.random() * 10;
        const interval = setInterval(() => {
            deg += 15;
            canvas.style.transform = `rotate(${deg}deg)`;
        }, 20);
        
        setTimeout(() => {
            clearInterval(interval);
            const index = Math.floor(Math.random() * rewards.length);
            const reward = rewards[index];
            
            if (reward.value !== 0) {
                addPoint(reward.value);
                showAlert('success', 'Spin Result', `You won ${reward.text}!`);
            } else {
                showAlert('info', 'Try Again', 'Better luck next time!');
                window.open("https://www.revenuecpmgate.com/uxx2gjrqc?key=76a628bbfc45e55ee2e31d6593b85938");
            }
            
            const spinResult = document.getElementById("spinResult");
            if (spinResult) spinResult.textContent = `Result: ${reward.text}`;
        }, 3000);
    });
}

// Withdrawal Form
document.getElementById("withR")?.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const gmCount = parseFloat(userCard.gm?.textContent) || 0;
    const ppCount = parseInt(userCard.pp?.textContent) || 0;
    const msgDiv = document.getElementById("msg");
    
    if (gmCount < 2 || ppCount < 300) {
        if (msgDiv) {
            msgDiv.innerHTML = `
                <div class="error-box">
                    <strong>❌ Request Blocked</strong><br>
                    <span>You do not meet the minimum requirements:</span>
                    <ul style="margin:8px 0 0 20px;">
                    <li>refer to unlock your first 2 Gem</li>
                        <li>1 Gem (GM) ${gmCount >= 2 ? '✓' : '✗'}</li>
                        <li>300 Posting Points (PP) ${ppCount >= 300 ? '✓' : '✗'}</li>
                    </ul>
                </div>
            `;
        }
        showAlert('error', 'Withdrawal Failed', 'Minimum requirements not met. refer to unlock your first 2 Gem');
        return;
    }
    
    const f = e.target;
    const data = new FormData(f);
    
    try {
        const r = await fetch("https://formspree.io/f/xnndzvnl", {
            method: "POST",
            body: data,
            headers: { "Accept": "application/json" }
        });
        
        if (r.ok) {
            if (msgDiv) {
                msgDiv.innerHTML = '<div class="success-box">✅ Withdrawal request sent successfully! You will receive payment within 24 hours.</div>';
            }
            f.reset();
            showAlert('success', 'Request Sent', 'Your withdrawal request has been submitted.');
        } else {
            if (msgDiv) {
                msgDiv.innerHTML = '<div class="error-box">❌ Error sending request. Please try again.</div>';
            }
            showAlert('error', 'Submission Failed', 'Could not send withdrawal request.');
        }
    } catch (err) {
        if (msgDiv) {
            msgDiv.innerHTML = '<div class="error-box">⚠️ Network error. Check your connection.</div>';
        }
        showAlert('error', 'Network Error', 'Please check your internet connection.');
    }
});

// Share functions
window.shareOn = (platform) => {
    const url = encodeURIComponent(document.getElementById('refURL')?.value || 'https://teampp.app/ref/xYZ123');
    const text = encodeURIComponent('Join TeamPP and earn amazing rewards! 💎✨');
    if (platform === 'whatsapp') window.open(`https://wa.me/?text=${text}%20${url}`);
    else if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
};

window.copyRef = () => {
    const input = document.getElementById('refURL');
    if (input) {
        navigator.clipboard?.writeText(input.value);
        showAlert('success', 'Copied!', 'Referral link copied to clipboard.');
    }
};

// Chart
const ctxChart = document.getElementById('chartRunningChart')?.getContext('2d');
if (ctxChart) {
    const dataChart = {
        labels: Array(30).fill(''),
        datasets: [{
            data: Array.from({ length: 30 }, () => 70 + Math.random() * 40),
            borderColor: '#38bdf8',
            tension: 0.3,
            fill: true,
            backgroundColor: '#38bdf820'
        }]
    };
    const chart = new Chart(ctxChart, {
        type: 'line',
        data: dataChart,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } }
        }
    });
    
    setInterval(() => {
        const last = dataChart.datasets[0].data.slice(-1)[0];
        dataChart.datasets[0].data.push(last + (Math.random() - 0.4) * 8);
        dataChart.datasets[0].data.shift();
        chart.update();
    }, 2000);
}

// Counter
let counterEl = document.querySelector('.counter');
let val = 0.0003400;
setInterval(() => {
    val += 0.0000020 + Math.random() * 0.00001;
    if (counterEl) counterEl.textContent = val.toFixed(7);
}, 900);

// Close popups on outside click
window.onclick = (e) => {
    if (e.target.classList.contains('pay-for') || 
        e.target.classList.contains('gm-claim') || 
        e.target.classList.contains('gift-claim')) {
        e.target.style.display = 'none';
    }
};

// Dismiss buttons
document.querySelectorAll('.dismiss-gift').forEach(btn => {
    btn.addEventListener('click', function() {
        this.parentElement.style.display = 'none';
    });
});


// Update leaderboard with real user data
function updateLeaderboardPosition() {
    const userPP = parseInt(userCard.pp?.textContent) || 0;
    const userGems = parseFloat(userCard.gm?.textContent) || 0;
    const userName = userCard.uname?.textContent || 'You';
    
    document.querySelector(".u-pp-count").textContent = userPP;
    document.querySelector(".u-gm-count").textContent = userGems;
    
    
    // Calculate approximate rank based on PP
    let rank = 42;
    if (userPP >= 1000000) rank = 93;
    else if (userPP >= 500000) rank = 122;
    else if (userPP >= 100000) rank = 128;
    else if (userPP >= 10000) rank = 135;
    else if (userPP >= 1000) rank = 140;
    else rank = 362;
    
    // Update rank display
    const rankElement = document.querySelector('.leaderboard-row.highlight .row-rank');
    if (rankElement) rankElement.textContent = `#${rank}`;
    
    // Update user avatar initial
    const avatarElement = document.querySelector('.leaderboard-row.highlight .re-user-img');
    if (avatarElement && userName) {
        avatarElement.textContent = userName.charAt(0).toUpperCase();
    }
}

