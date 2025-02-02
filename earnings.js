let totalEarnings = parseFloat(localStorage.getItem("totalEarnings")) || 0;
let startTime = Date.now() - (parseFloat(localStorage.getItem("elapsedTime")) || 0);

function updateEarnings(hourlyRate) {
  const elapsedSeconds = (Date.now() - startTime) / 1000;
  totalEarnings = (hourlyRate / 3600) * elapsedSeconds;

  // Save to localStorage
  localStorage.setItem("totalEarnings", totalEarnings);
  localStorage.setItem("elapsedTime", Date.now() - startTime);

  return totalEarnings;
}

export { updateEarnings };
