// netlify
exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      apiKey: process.env.PUBLIC_FB_KEY,
      authDomain: "imad-4bcd4.firebaseapp.com",
      projectId: "imad-4bcd4",
      storageBucket: "imad-4bcd4.firebasestorage.app",
      messagingSenderId: "337645433222",
      appId: "1:337645433222:web:f66274356a7ba3bc39bc07",
      measurementId: "G-RP7VQ7PT4C"
    }),
  };
};
