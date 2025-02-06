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

// Calculate daily earnings in real-time
export function calculateEarnings(hourlyRate, workDays, startTime, endTime) {
  const balanceDisplay = document.getElementById("balanceDisplay");

  if (!startTime || !endTime) {
    balanceDisplay.textContent = "Error: Invalid work hours.";
    return;
  }

  const currentDay = new Date().toLocaleString("en-GB", { weekday: "long" });

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

// Calculate weekly earnings in real-time
export function calculateWeeklyEarnings(hourlyRate, workDays, startTime, endTime) {
  const weeklyBalanceDisplay = document.getElementById("weeklyBalanceDisplay");
  const weeklySummary = document.getElementById("weeklySummary");

  if (!startTime || !endTime) {
    weeklyBalanceDisplay.textContent = "Error: Invalid work hours.";
    return;
  }

  const now = new Date();
  const currentDay = now.toLocaleString("en-GB", { weekday: "long" });

  if (!workDays.includes(currentDay)) {
    weeklyBalanceDisplay.textContent = "£0.00 (Not a working day)";
    return;
  }

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const start = new Date();
  const end = new Date();
  start.setHours(startHour, startMinute, 0, 0);
  end.setHours(endHour, endMinute, 0, 0);

  if (now < start || now > end) {
    weeklyBalanceDisplay.textContent = "£0.00 (Outside working hours)";
    return;
  }

  let weeklyTotal = parseFloat(localStorage.getItem("weeklyTotal")) || 0;
  const totalSeconds = (end - start) / 1000;
  const earningsPerSecond = hourlyRate / totalSeconds;
  let elapsedSeconds = Math.floor((now - start) / 1000);

  const interval = setInterval(() => {
    const currentTime = new Date();

    if (currentTime >= end || !workDays.includes(currentDay)) {
      clearInterval(interval);
      weeklySummary.textContent = `Weekly Total: £${weeklyTotal.toFixed(2)}`;
      localStorage.setItem("weeklyTotal", weeklyTotal);
      return;
    }

    elapsedSeconds++;
    const currentEarnings = elapsedSeconds * earningsPerSecond;
    weeklyTotal += earningsPerSecond;
    weeklyBalanceDisplay.textContent = `£${currentEarnings.toFixed(2)}`;
  }, 1000);
}

// Calculate monthly earnings in real-time
export function calculateMonthlyEarnings(hourlyRate, workDays, startTime, endTime) {
  const monthlyBalanceDisplay = document.getElementById("monthlyBalanceDisplay");
  const monthlySummary = document.getElementById("monthlySummary");

  if (!startTime || !endTime) {
    monthlyBalanceDisplay.textContent = "Error: Invalid work hours.";
    return;
  }

  const now = new Date();
  const currentDay = now.toLocaleString("en-GB", { weekday: "long" });

  if (!workDays.includes(currentDay)) {
    monthlyBalanceDisplay.textContent = "£0.00 (Not a working day)";
    return;
  }

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const start = new Date();
  const end = new Date();
  start.setHours(startHour, startMinute, 0, 0);
  end.setHours(endHour, endMinute, 0, 0);

  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  if (now < start || now > end) {
    monthlyBalanceDisplay.textContent = "£0.00 (Outside working hours)";
    return;
  }

  let monthlyTotal = parseFloat(localStorage.getItem("monthlyTotal")) || 0;
  const totalSeconds = (end - start) / 1000;
  const earningsPerSecond = hourlyRate / totalSeconds;
  let elapsedSeconds = Math.floor((now - start) / 1000);

  const interval = setInterval(() => {
    const currentTime = new Date();

    if (currentTime >= end || !workDays.includes(currentDay)) {
      clearInterval(interval);
    }

    if (currentTime > lastDayOfMonth) {
      clearInterval(interval);
      monthlySummary.textContent = `Monthly Total: £${monthlyTotal.toFixed(2)}`;
      localStorage.setItem("monthlyTotal", monthlyTotal);
      return;
    }

    elapsedSeconds++;
    const currentEarnings = elapsedSeconds * earningsPerSecond;
    monthlyTotal += earningsPerSecond;
    monthlyBalanceDisplay.textContent = `£${currentEarnings.toFixed(2)}`;
  }, 1000);
}

// Calculate yearly earnings in real-time
export function calculateYearlyEarnings(hourlyRate, workDays, startTime, endTime) {
  const yearlyBalanceDisplay = document.getElementById("yearlyBalanceDisplay");
  const yearlySummary = document.getElementById("yearlySummary");

  if (!startTime || !endTime) {
    yearlyBalanceDisplay.textContent = "Error: Invalid work hours.";
    return;
  }

  const now = new Date();
  const currentDay = now.toLocaleString("en-GB", { weekday: "long" });

  if (!workDays.includes(currentDay)) {
    yearlyBalanceDisplay.textContent = "£0.00 (Not a working day)";
    return;
  }

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const start = new Date();
  const end = new Date();
  start.setHours(startHour, startMinute, 0, 0);
  end.setHours(endHour, endMinute, 0, 0);

  const lastDayOfYear = new Date(now.getFullYear(), 11, 31);

  if (now < start || now > end) {
    yearlyBalanceDisplay.textContent = "£0.00 (Outside working hours)";
    return;
  }

  let yearlyTotal = parseFloat(localStorage.getItem("yearlyTotal")) || 0;
  const totalSeconds = (end - start) / 1000;
  const earningsPerSecond = hourlyRate / totalSeconds;
  let elapsedSeconds = Math.floor((now - start) / 1000);

  const interval = setInterval(() => {
    const currentTime = new Date();

    if (currentTime >= end || !workDays.includes(currentDay)) {
      clearInterval(interval);
    }

    if (currentTime > lastDayOfYear) {
      clearInterval(interval);
      yearlySummary.textContent = `Yearly Total: £${yearlyTotal.toFixed(2)}`;
      localStorage.setItem("yearlyTotal", yearlyTotal);
      return;
    }

    elapsedSeconds++;
    const currentEarnings = elapsedSeconds * earningsPerSecond;
    yearlyTotal += earningsPerSecond;
    yearlyBalanceDisplay.textContent = `£${currentEarnings.toFixed(2)}`;
  }, 1000);
}
