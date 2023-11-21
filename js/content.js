var buttonStates = {
  dataButton1: 0,
  dataButton2: 0,
  dataButton3: 0,
  dataButton4: 0
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.dataButton1);
  console.log(request.dataButton2);
  console.log(request.dataButton3);
  console.log(request.dataButton4);

  if (request.action === 'controlButton') {
    var buttonIds = [request.dataButton1, request.dataButton2, request.dataButton3, request.dataButton4];
    var currentIndex = 0;

    var intervalId = setInterval(function() {
      var targetButtonId = buttonIds[currentIndex];
      var targetButton = document.getElementById(targetButtonId);
      if (targetButton) {
        buttonStates[targetButtonId] = (buttonStates[targetButtonId] == 1) ? 0 : 1;

        console.log(`Button ${targetButtonId} state: ${buttonStates[targetButtonId]}`);

        targetButton.click();
        console.log(`Button ${targetButtonId} is pressed`);
      }
      currentIndex = (currentIndex + 1) % buttonIds.length;
    }, 2000);
  }
  else if (request.stop = 'stoppls') {
    clearInterval(intervalId);
    console.log('stop loop');
  }
});
