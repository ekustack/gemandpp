import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { getFirestore, collection, addDoc, onSnapshot, getDocs, query, where, orderBy, deleteDoc, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

    const res=await fetch("/.netlify/functions/verifyFb");const config=await res.json();const app = initializeApp(config)

    const auth = getAuth(app);
    const db = getFirestore(app);
    const pointCollection = collection(db, "points");
    
let currentUser = null;
const userCard={
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
}



    onAuthStateChanged(auth, (user) => {
        if(user){
      currentUser = user;
      
      console.log(user.displayName);
   
    
        const bgImage = currentUser.photoURL;
            
bgImage?userCard.image.style.cssText = `background: url(${bgImage}) no-repeat center;
background-size: contain;`:userCard.image.textContent=`U`;
                
                currentUser.displayName?userCard.image.textContent=`${currentUser.displayName.slice(0,1)}`:userCard.image.textContent="U";
            
            
             
    userCard.name.textContent=`${currentUser.displayName? currentUser.displayName:`${currentUser.id?'user_'+currentUser.id.slice(0,5):'user_'}`}`;
const giftCount = document.querySelector(".gift-count");
userCard.uem.value=currentUser.email;
            userCard.uname.value=currentUser.displayName;
document.getElementById("refURL").value = `https://gemandpp.netlify.app/enter#ref?id=${encodeURIComponent(currentUser.email)}`;
giftCount.innerText = userCard.claimCard.querySelectorAll(".card").length;
userCard.getGift.addEventListener("click", (e)=>{
  
  userCard.claimCard.style.display='block';
})
userCard.gmIcon.addEventListener("click", (e)=>{
  payFor(9,4.00);
  
})
userCard.claimCard.querySelectorAll(".card button").forEach(btn=>{
  btn.onclick=function claimed(){
  btn.style.opacity = "50%";
  btn.textContent = "CLAIMED";
  addPoint(1);
  giftCount.innerText -=1;
 btn.onclick=null;
      window.open("https://www.revenuecpmgate.com/uxx2gjrqc?key=76a628bbfc45e55ee2e31d6593b85938");
}
});



 
window.initPoints = async function initPoints() {
   const pointEm = currentUser.email;

  try {
    // query for existing record
    const pq = query(pointCollection, where("emailAdd", "==", pointEm));
    const snapshot = await getDocs(pq);

    let userDoc;

    if (snapshot.empty) {
      // First time → create new doc with 5 points
      const newDoc = await addDoc(pointCollection, {
        emailAdd: pointEm,
        points: 5,
        claimed: true, // means already claimed initial reward
        createdAt: Date.now()
      });
      userDoc = { id: newDoc.id, points: 5 };
      userCard.pp.name=userDoc.id?userDoc.id:null;
    } else {
      // User already has a doc
      const docSnap = snapshot.docs[0];
      userDoc = { id: docSnap.id, ...docSnap.data() };

      userCard.pp.name=userDoc.id?userDoc.id:null;
      // If they don’t have points yet (claimed = false), grant once
      if (userDoc.claimed === false) {
        
        const userRef = doc(db, "points", userDoc.id);
        await updateDoc(userRef, {
          points: (userDoc.points || 0) + 5,
          claimed: true
        });
        userDoc.points = (userDoc.points || 0) + 5;
      }
    }

    // update UI
    
    if (userCard.pp) {
      userCard.pp.textContent = userDoc.points||0;
      userCard.tpp.value=userDoc.points||0;
    }
      const arr = [15,12,24,17,28,10,26,8,13,20,25,14,6,13,18,27,19,16,7,19];
  const num=arr[Math.floor(Math.random()*arr.length)];
      const nr=(userDoc.points||0 - 30)/num;
      userCard.ngn.textContent=fn(nr); 
   

    if (userDoc.points >= 50) {
  if (userCard.gm) {
    // Compute ratio: (points - 5) / points
    let ratio = (userDoc.points - 46) / userDoc.points;
    
    
    if (ratio < 0) {
      ratio = 0;
    }
    
    
    userCard.gm.textContent = ratio.toFixed(2);
    userCard.tgm.value=ratio.toFixed(2);
           }
}
  } catch (err) {
    console.error("Error initializing points:", err);
  }
  
}

initPoints();
    } 
     else{
      window.location.href =("/enter.html");
     }
}); 
document.getElementById("logoutBtn").addEventListener('click', () => {
          signOut(auth).then(() => {
            console.log("Logged out successfully");
            window.location.reload();
          }).catch((error) => {
            console.error("Logout error:", error);
          });
        });

window.addPoint = async function addPoint(pointTo) {
  const uRef = doc(db, "points", userCard.pp.name);
  await updateDoc(uRef, {
    points: increment(pointTo),
  });
  initPoints();
};

window.payFor = async function payFor(addPP, PPamt) {
    document.querySelector(".pay-for").style.display = 'block';
    document.querySelector("#paypal-button-container").innerHTML =" ";
   const paySection=document.querySelector(".pay-for");
  if (window.paypal && document.querySelector("#paypal-button-container")) {
    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{ amount: { value: String(PPamt) } }]
        });
      },
      onApprove: async (data, actions) => {
        const details = await actions.order.capture();
        
        
        
        await addPoint(addPP);
        alert(`Thank you, ${details.payer.name.given_name}! You are credited with posting points and can now add your "Learn More" link.`);
      }
    }).render('#paypal-button-container');}else{}}
window.fn = function fn(fng) {
  return fng.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const spinResult = document.getElementById("spinResult");

const rewards = [
  { text: "+5 PP", value: 5 },
  { text: "+1 PP", value: 1 }, 
  { text: "-3 PP", value: -3 },
  { text: "Try Again", value: 0 },
  { text: "+10 PP", value: 10 },
  { text: "-1 PP", value: -1 }, 
  { text: "-10 PP", value: -10 }, 
  { text: "+2 PP", value: 2 }, 
  { text: "+9 PP", value: 9 }, 
  { text: "-13 PP", value: -13 }, 
  { text: "Try Again", value: 0 },
  { text: "+25 PP", value: 25 },
  { text: "-9 PP", value: -9 }, 
  { text: "Try Again", value: 0 }, 
  { text: "-7 PP", value: -7 },
  { text: "-16 PP", value: -16 },
  { text: "-12 PP", value: -12 },
  { text: "+4 PP", value: 4}
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


spinBtn.addEventListener("click", () => {
  if(userCard.pp.textContent<6){
 alert("You have insufficient PP to access this feature.\n Continue engaging to earn more pp.");
}
else{
  let deg = 0;
  const spins = 15 + Math.random() * 10; // random spins
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
    }
    if(reward.value==0)window.open("https://www.revenuecpmgate.com/uxx2gjrqc?key=76a628bbfc45e55ee2e31d6593b85938");
    spinResult.textContent = `Result: ${reward.text}`;
  }, 3000);
} 
});
document.getElementById("withR").addEventListener("submit",async function(e){
    e.preventDefault();
    const f = e.target;
    if (Number(document.querySelector(".gm-count").textContent) < 1 ||
    Number(document.querySelector(".pp-count").textContent) < 300){
    document.getElementById("msg").innerHTML=`<div style="color:#B00; font-weight:500;">❌ Request blocked. You do not meet the minimum requirements: <ul style="margin:6px 0; padding-left:20px;"><li>4 Referrals</li><li>1 Gem (GM)</li><li>400 Posting Points (PP)</li></ul></div>`;
    }else{
    const data = new FormData(f);try{
    const r=await fetch("https://formspree.io/f/xnndzvnl",{method:"POST",body:data,headers:{ "Accept": "application/json" }});
    if(r.ok){
    document.getElementById("msg").innerText="✅ Sent successfully!";f.reset();}else{document.getElementById("msg").innerText="❌ Error sending form.";}}catch(err){document.getElementById("msg").innerText="⚠️ Network error.";}}});
