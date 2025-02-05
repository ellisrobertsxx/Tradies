import { database, ref, set } from "./firebase-config.js";

async function saveUserDetails(userId, hourlyRate) {
  const userRef = ref(database, `users/${userId}`);
  await set(userRef, { hourlyRate });
}

export { saveUserDetails };
