import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { getFirestore, collection, addDoc, onSnapshot, getDocs, query, where, orderBy, deleteDoc, doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

    const res = await fetch("/.netlify/functions/verifyFb");
const config = await res.json();
const app = initializeApp(config);
    const auth = getAuth(app);
const db = getFirestore(app);
    const pointCollection = collection(db, "points");
    
    // SIGN UP
    const signupForm = document.getElementById('signup-form');
    const errorMessage = document.getElementById('errorMessage');

    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        errorMessage.style.color = "green";
        errorMessage.innerHTML = "✅ Account created successfully!";
        console.log("User created:", user);
        initPoints();
        signupForm.reset();
        setTimeout(() => window.location.href = "/index.html", 1500);
      } catch (error) {
        errorMessage.style.color = "red";
        errorMessage.innerHTML = error.message;
      }
    });

    // LOGIN
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert("✅ Login successful! Welcome " + user.email);
        window.location.href = "/index.html";
      } catch (error) {
        alert("❌ " + error.message);
      }
    });
    window.initPoints = async function initPoints() {
      if(document.querySelector("#referEm")){
   const pointEm = document.getElementById("referEm").value.trim();

  try {
    
    const pq = query(pointCollection, where("emailAdd", "==", pointEm));
    const snapshot = await getDocs(pq);

    let userDoc;

    if (snapshot.empty) {
      // First time → create new doc with 5 points
      const newDoc = await addDoc(pointCollection, {
        emailAdd: pointEm,
        points: 2,
        claimed: false, // means already claimed initial reward
        createdAt: Date.now()
      });
      userDoc = { id: newDoc.id, points: 2 };
      
    } else {
      // User already has a doc
      const docSnap = snapshot.docs[0];
      userDoc = { id: docSnap.id, ...docSnap.data() };
      // If they don’t have points yet (claimed = false), grant once
        
        const userRef = doc(db, "points", userDoc.id);
        await updateDoc(userRef, {
          points: (userDoc.points || 0) + 2,
        });
        userDoc.points = (userDoc.points || 0) + 2;
      
    }

  } catch (err) {
    console.error("Error initializing points:", err);
  }
      }
      else{
        console.log("not found.")
      }
}
