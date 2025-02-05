import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Fetch user details from Firebase Realtime Database
export async function fetchUserDetails(userId) {
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);
  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.error("No user data found.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
}

// Calculate earnings in real-time
export function calculateEarnings(hourlyRate, hoursPerDay, workDays) {
  const balanceDisplay = document.getElementById("balanceDisplay");
  const totalSecondsPerDay = hoursPerDay * 3600;
  const earningsPerSecond = hourlyRate / 3600;

  // Ensure workDays is an array
  if (!Array.isArray(workDays)) {
    console.error("workDays is not an array:", workDays);
    balanceDisplay.textContent = "Error: Invalid workdays data.";
    return;
  }

  // Get the current day in the format of the saved workDays array
  const currentDay = new Date().toLocaleString("en-GB", { weekday: "long" });

  // Normalize workDays to ensure it matches the format of currentDay
  const normalizedWorkDays = workDays.map(day => day.trim());

  // Check if the current day is a working day
  if (!normalizedWorkDays.includes(currentDay)) {
    balanceDisplay.textContent = "£0.00 (Not a working day)";
    return;
  }

  let elapsedSeconds = 0;
  const interval = setInterval(() => {
    if (elapsedSeconds >= totalSecondsPerDay) {
      clearInterval(interval);
      return;
    }

    elapsedSeconds++;
    const currentEarnings = (elapsedSeconds * earningsPerSecond).toFixed(2);
    balanceDisplay.textContent = `£${currentEarnings}`;
  }, 1000);
}
