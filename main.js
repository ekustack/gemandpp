import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { getFirestore, collection, addDoc, onSnapshot, getDocs, query, where, orderBy, deleteDoc, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

    const res = await fetch("/.netlify/functions/verifyFb");
const config = await res.json();
const app = initializeApp(config);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const pointCollection = collection(db, "points");
    
let currentUser = null;
const userCard={
  image: document.querySelector(".re-user-img"), 
  name: document.querySelector(".re-user-name"), 
  pp: document.querySelector(".pp-count"), 
  gm: document.querySelector(".gm-count"), 
  ex: document.querySelector(".c-ex"), 
  ppIcon: document.querySelector(".icon.pp"), 
  gmIcon: document.querySelector(".gem"),
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
background-size: contain;`:userCard.image.textContent=`${currentUser.displayName.slice(0,1)}`;
userCard.image.textContent=`${currentUser.displayName.slice(0,1)}`;

    userCard.name.textContent=currentUser.displayName;
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
  document.querySelector(".pay-for").style.display = 'block';
})
userCard.claimCard.querySelectorAll(".card button").forEach(btn=>{
  btn.onclick=function claimed(){
  btn.style.opacity = "50%";
  btn.textContent = "CLAIMED";
  addPoint(1);
  giftCount.innerText -=1;
 btn.onclick=null;
      setTimeout(()=>{
  window.open("https://www.effectivecpmrate.com/uxx2gjrqc?key=76a628bbfc45e55ee2e31d6593b85938");
      }, 300);
}
})

const sellCard = document.querySelectorAll(".part-par");
sellCard.forEach(card =>{
  const leftTag = card.querySelector(".part-1");
  const rightTag = card.querySelector(".part-2");
  const innerColor = card.querySelector(".part-cover");
  leftTag.addEventListener("click", (e)=>{
    innerColor.style.marginLeft="0";
    innerColor.style.borderRadius="10px 0 0 10px";
  });
  rightTag.addEventListener("click", (e)=>{
    innerColor.style.marginLeft="45%";
    innerColor.style.borderRadius="0 10px 10px 0";
  });
  const ppGet = card.querySelectorAll(".pp-get");
  const ppPrice = card.querySelectorAll(".pp-price");
  const gmGet = card.querySelectorAll(".gm-get");
  const gmPrice = card.querySelectorAll(".gm-price");
  const ppGetBtn = card.querySelectorAll(".get");
  const gmGetBtn = card.querySelectorAll(".get-gm");
  const buyGem = card.querySelector(".buy-gem");
  
  ppGetBtn.forEach(ppBtn=>{
    ppBtn.addEventListener("click", (e)=>{
    payFor(+ppBtn.parentElement.querySelector(".pp-get").innerText,ppBtn.parentElement.querySelector(".pp-price").innerText);
    document.querySelector(".pay-for").style.display='block';
    
    });
    
  })
  gmGetBtn.forEach(gmBtn => {
      gmBtn.addEventListener("click", (e) => {
        payFor(+gmBtn.parentElement.querySelector(".gm-get").innerText * 7, gmBtn.parentElement.querySelector(".gm-price").innerText);
        document.querySelector(".pay-for").style.display = 'block';
        
      });
  });
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
      userCard.pp.textContent = userDoc.points;
      userCard.tpp.value=userDoc.points;
    }
    if (userDoc.points >= 30) {
  if (userCard.gm) {
    // Compute ratio: (points - 5) / points
    let ratio = (userDoc.points - 5) / userDoc.points;
    
    // If result is negative, clamp it to 0
    if (ratio < 0) {
      ratio = 0;
    }
    
    // Format to one decimal place
    userCard.gm.textContent = ratio.toFixed(1);
    userCard.tgm.value=ratio.toFixed(1);
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
document.getElementById("log").addEventListener('click', () => {
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

function payFor(addPP, PPamt) {
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
    }).render('#paypal-button-container');
  } else {
    console.warn("PayPal SDK not loaded or button container missing");
  }
}
