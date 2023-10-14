document.addEventListener('DOMContentLoaded', function () {
    const intervalInput = document.getElementById('interval');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const countdownValue = document.getElementById('countdown-value');
    let countdownInterval;
  
    startButton.addEventListener('click', function () {
      const initialInterval = parseInt(intervalInput.value) * 1000; // Convert seconds to milliseconds
      let interval = initialInterval;
      countdownValue.textContent = intervalInput.value;
      startButton.disabled = true;
      stopButton.disabled = false;
  
      // Define a function to refresh the tab and start the loop
      function refreshTabAndLoop() {
        intervalInput.value = Math.ceil(interval / 1000); // Update the displayed value
        countdownValue.textContent = intervalInput.value;
  
        if (interval <= 0) {
            chrome.tabs.reload();  
            interval = initialInterval; // Reset the interval value
        }
  
        if (startButton.disabled) {
          countdownInterval = setTimeout(refreshTabAndLoop, 1000);
        }
        interval -= 1000;
      }
  
      countdownInterval = setTimeout(refreshTabAndLoop, 1000);
    });
  
    stopButton.addEventListener('click', function () {
      clearTimeout(countdownInterval);
      startButton.disabled = false;
      stopButton.disabled = true;
    });
  });
  