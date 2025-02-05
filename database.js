import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { auth } from "./firebase-config.js";

export async function saveUserDetails(userId, firstName, lastName, hourlyRate, workHours, workDays) {
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);
  try {
    await update(userRef, {
      firstName: firstName || "",
      lastName: lastName || "",
      hourlyRate: hourlyRate || 0,
      workHours: workHours || 0,
      workDays: workDays || "",
    });
    console.log("User details saved successfully!");
  } catch (error) {
    console.error("Error saving user details:", error);
    throw error;
  }
}
