import { database, ref, set } from "./firebase-config.js";

// Save user details to Firebase
function saveUserDetails(firstName, lastName, hourlyRate) {
  const userId = "user_1"; // Static user ID

  return set(ref(database, `users/${userId}`), {
    firstName: firstName,
    lastName: lastName,
    hourlyRate: hourlyRate
  });
}

export { saveUserDetails };