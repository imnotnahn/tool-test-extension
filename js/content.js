var buttonStates = {
  dataButton1: 0,
  dataButton2: 0,
  dataButton3: 0,
  dataButton4: 0,
};

var intervalId;
var intervalId2;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.dataButton1);
  console.log(request.dataButton2);
  console.log(request.dataButton3);
  console.log(request.dataButton4);
  const timeButtonDelay = request.dataDelay;

  if (request.action === 'controlButton') {
    var buttonIds = [
      request.dataButton1,
      request.dataButton2,
      request.dataButton3,
      request.dataButton4,
    ];
    var currentIndex = 0;

    intervalId = setInterval(function () {
      var targetButtonId = buttonIds[currentIndex];
      var targetButton = document.getElementById(targetButtonId);
      if (targetButton) {
        buttonStates[targetButtonId] = (buttonStates[targetButtonId] == 1) ? 0 : 1;
        //console.log(`Button ${targetButtonId} state: ${buttonStates[targetButtonId]}`);
        chrome.runtime.sendMessage({ dataBack: 'zxcvzxcvzxc' }); //upgrade
        targetButton.click();
        clearInterval(intervalId2);
        console.log(`Button ${targetButtonId} is pressed`);
        checkButton(targetButton, targetButtonId); // Check immediately after clicking
      }
      currentIndex = (currentIndex + 1) % buttonIds.length;
    }, timeButtonDelay*1000);
  } else if (request.stop === 'stoppls') {
    stopIntervals();
    console.log('stop loop');
  }
});

function checkButton(targetButton, targetButtonId) {
  intervalId2 = setInterval(function () {
    if (targetButton.checked == true && buttonStates[targetButtonId] == 1) {
      console.log('true case 1');
      console.log(targetButton.checked);
      console.log(buttonStates[targetButtonId]);
    } else if(targetButton.checked == false && buttonStates[targetButtonId] == 0){
      console.log('true case 0');
      console.log(targetButton.checked);
      console.log(buttonStates[targetButtonId]);
    } else {
      console.log('falseeeeeeee');
      alert('button bị dội rồiiiiii');
      console.log(targetButton.checked);
      console.log(buttonStates[targetButtonId]);
    }
  }, 15000);
}

function stopIntervals() {
  clearInterval(intervalId);
}
