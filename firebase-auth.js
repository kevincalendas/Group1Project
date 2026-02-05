// Firebase Authentication Helper Functions
// Include this AFTER firebase-config.js in your HTML

// Sign up user with email and password
async function signUp(email, password, fullname, username) {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Store user data in Realtime Database
    await firebase.database().ref(`users/${user.uid}`).set({
      uid: user.uid,
      email: email,
      fullname: fullname,
      username: username,
      createdAt: new Date().toISOString()
    });

    return { success: true, user: user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Sign in user
async function signIn(email, password) {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Sign out user
async function logOut() {
  try {
    await firebase.auth().signOut();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Get user data from database
async function getUserData(uid) {
  try {
    const snapshot = await firebase.database().ref(`users/${uid}`).get();
    if (snapshot.exists()) {
      return { success: true, data: snapshot.val() };
    } else {
      return { success: false, error: "User data not found" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Check if username exists
async function checkUsernameExists(username) {
  try {
    const snapshot = await firebase.database().ref('users').get();
    if (snapshot.exists()) {
      const users = snapshot.val();
      for (const uid in users) {
        if (users[uid].username === username) {
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    console.error("Error checking username:", error);
    return false;
  }
}

// Update user profile
async function updateUserProfile(uid, updates) {
  try {
    await firebase.database().ref(`users/${uid}`).update(updates);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
