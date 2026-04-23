import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
        import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
        import { getFirestore, collection, addDoc, getDocs, query, where, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const res=await fetch("/.netlify/functions/verifyFb");const config=await res.json();const app = initializeApp(config);const auth = getAuth(app);const db = getFirestore(app);const pointCollection = collection(db, "points");
        
document.addEventListener("DOMContentLoaded", ()=>{
    
        window.initPoints = async function initPoints() {
            const referInput = document.getElementById("referEm");
            if (referInput && referInput.value.trim()) {
                const pointEm = referInput.value.trim();
                try {
                    const pq = query(pointCollection, where("emailAdd", "==", pointEm));
                    const snapshot = await getDocs(pq);

                    if (snapshot.empty) {
                        await addDoc(pointCollection, {
                            emailAdd: pointEm,
                            points: 2,
                            claimed: false,
                            createdAt: Date.now()
                        });
                    } else {
                        const docSnap = snapshot.docs[0];
                        const userDoc = { id: docSnap.id, ...docSnap.data() };
                        const userRef = doc(db, "points", userDoc.id);
                        await updateDoc(userRef, {
                            points: (userDoc.points || 0) + 5,
                        });
                    }
                } catch (err) {
                    console.error("Error initializing points:", err);
                }
            }
        };

        // ===== SIGN UP =====
        const signupForm = document.getElementById('signup-form');

        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                // Update display name
                if (fullname) {
                    await updateProfile(user, { displayName: fullname });
                }
                
                // Process referral
                await initPoints();
                
                showAlert('success', 'Account Created!', 
                    `Welcome ${fullname || email}! Redirecting to dashboard...`);
                
                signupForm.reset();
                setTimeout(() => window.location.href = "/index.html", 2000);
            } catch (error) {
                let errorMsg = error.message;
                if (error.code === 'auth/email-already-in-use') {
                    errorMsg = 'This email is already registered. Try logging in.';
                } else if (error.code === 'auth/weak-password') {
                    errorMsg = 'Password is too weak. Use at least 6 characters.';
                } else if (error.code === 'auth/invalid-email') {
                    errorMsg = 'Please enter a valid email address.';
                }
                showAlert('error', 'Sign Up Failed', errorMsg);
            }
        });

        // ===== LOGIN =====
        const loginForm = document.getElementById('login-form');

        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                const displayName = user.displayName || email.split('@')[0];
                showAlert('success', 'Welcome Back!', 
                    `Hi ${displayName}! Redirecting to dashboard...`);
                
                setTimeout(() => window.location.href = "/index.html", 1500);
            } catch (error) {
                let errorMsg = error.message;
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    errorMsg = 'Invalid email or password. Please try again.';
                } else if (error.code === 'auth/invalid-email') {
                    errorMsg = 'Please enter a valid email address.';
                } else if (error.code === 'auth/too-many-requests') {
                    errorMsg = 'Too many attempts. Please try again later.';
                }
                showAlert('error', 'Login Failed', errorMsg);
            }
        });
      
});
