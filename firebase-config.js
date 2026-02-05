<!-- Firebase SDK from CDN -->
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB7Eac47fswoK0xVKhL1_RHKX6xjSAysWE",
    authDomain: "beatrix-core-database.firebaseapp.com",
    databaseURL: "https://beatrix-core-database-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "beatrix-core-database",
    storageBucket: "beatrix-core-database.firebasestorage.app",
    messagingSenderId: "444256156441",
    appId: "1:444256156441:web:7b3aa0ca4041bed0a52388",
    measurementId: "G-0ERX0XVSYC"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Get references to services
  const auth = firebase.auth();
  const database = firebase.database();
  
  // Initialize Analytics (optional)
  firebase.analytics();
</script>
