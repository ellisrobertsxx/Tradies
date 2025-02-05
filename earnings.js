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

// Calculate earnings in real-time based on work hours
export function calculateEarnings(hourlyRate, workDays, startTime, endTime) {
  const balanceDisplay = document.getElementById("balanceDisplay");

  // Ensure startTime and endTime are valid
  if (!startTime || !endTime) {
    balanceDisplay.textContent = "Error: Invalid work hours.";
    return;
  }

  const currentDay = new Date().toLocaleString("en-GB", { weekday: "long" });

  // Check if today is a working day
  if (!workDays.includes(currentDay)) {
    balanceDisplay.textContent = "£0.00 (Not a working day)";
    return;
  }

  const now = new Date();
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const start = new Date();
  const end = new Date();
  start.setHours(startHour, startMinute, 0, 0);
  end.setHours(endHour, endMinute, 0, 0);

  // If outside working hours, show the balance as 0
  if (now < start || now > end) {
    balanceDisplay.textContent = "£0.00 (Outside working hours)";
    return;
  }

  const totalSeconds = (end - start) / 1000;
  const earningsPerSecond = hourlyRate / totalSeconds;
  let elapsedSeconds = Math.floor((now - start) / 1000);

  const interval = setInterval(() => {
    const currentTime = new Date();

    if (currentTime >= end) {
      clearInterval(interval);
      return;
    }

    elapsedSeconds++;
    const currentEarnings = (elapsedSeconds * earningsPerSecond).toFixed(2);
    balanceDisplay.textContent = `£${currentEarnings}`;
  }, 1000);
}
