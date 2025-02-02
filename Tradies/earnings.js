// earnings.js

let interval;
let startTime;

function startEarningsTracking(hourlyRate) {
  clearInterval(interval);

  // Immediately show the last known earnings before updates start
  let totalEarnings = parseFloat(localStorage.getItem('totalEarnings')) || 0;

  let timeElapsed = parseFloat(localStorage.getItem('timeElapsed')) || 0;
  startTime = Date.now() - timeElapsed;

  interval = setInterval(() => {
    const elapsedMinutes = (Date.now() - startTime) / (1000 * 60);

    // Calculate total earnings
    totalEarnings = (hourlyRate / 60) * elapsedMinutes;

    // Store updated earnings
    localStorage.setItem('totalEarnings', totalEarnings);
    localStorage.setItem('timeElapsed', Date.now() - startTime);
  }, 1000);
}

// Initialize earnings tracking if hourly rate is set
document.addEventListener('DOMContentLoaded', () => {
  const savedHourlyRate = localStorage.getItem('hourlyRate');
  if (savedHourlyRate) {
    startEarningsTracking(parseFloat(savedHourlyRate));
  }
});
