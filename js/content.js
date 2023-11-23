var buttonStates = {
  dataButton1: 0,
  dataButton2: 0,
  dataButton3: 0,
  dataButton4: 0,
};
var coutbutton = {
  button1: 0,
  button2: 0,
  button3: 0,
  button4: 0
};

var intervalControl;
var intervalCheckButton;

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

    intervalControl = setInterval(function () {
      var targetButtonId = buttonIds[currentIndex];
      var targetButton = document.getElementById(targetButtonId);
      if (targetButton) {
        buttonStates[targetButtonId] = (buttonStates[targetButtonId] == 1) ? 0 : 1;
        //console.log(`Button ${targetButtonId} state: ${buttonStates[targetButtonId]}`);
        targetButton.click();
        clearInterval(intervalCheckButton);
        console.log(`Button ${targetButtonId} is pressed`);
        checkButton(targetButton, targetButtonId);
        checkAndSaveState(targetButtonId, buttonIds);
        if (request.stop == 'stoppls') {
          var JsonButtonData = JSON.stringify(getDataButton(buttonIds));
          chrome.runtime.sendMessage ({
            buttondata: JsonButtonData,
            exportfile: 'doit'
          });
        }
      }
      currentIndex = (currentIndex + 1) % buttonIds.length;
    }, timeButtonDelay*1000);
  }
});

function checkButton(targetButton, targetButtonId) {
  intervalCheckButton = setInterval(function () {
    if (targetButton.checked == true && buttonStates[targetButtonId] == 1) {
      console.log('true case 1');
      console.log(targetButton.checked);
      console.log(buttonStates[targetButtonId]);
    } else if (targetButton.checked == false && buttonStates[targetButtonId] == 0){
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

function checkAndSaveState(infoButton, buttonIds){
  if (infoButton == buttonIds[0]) {
    coutbutton.button1++;
    console.log(buttonIds[0]);
  } else if (infoButton == buttonIds[1]) {
    coutbutton.button2++;
    console.log(buttonIds[1]);
  } else if (infoButton == buttonIds[2]) {
    coutbutton.button3++;
    console.log(coutbutton.button3);
  } else if (infoButton == buttonIds[3]) {
    coutbutton.button4++;
    console.log(coutbutton.button4);
  }
}

function getDataButton(buttonIds){
  var ButtonData = {
    buttonId1: buttonIds[0],
    coutStateButton1: coutbutton.button1,
    buttonId2: buttonIds[1],
    coutStateButton2: coutbutton.button2,
    buttonId3: buttonIds[2],
    coutStateButton3: coutbutton.button3,
    buttonId4: buttonIds[3],
    coutStateButton4: coutbutton.button4,
  };
  return ButtonData;
}

function sendToBackGround(){
  if (request.stop === 'stoppls') {
    chrome.runtime.sendMessage({});
    console.log('stop loop');
  } else {
    console.log('nothing yet');
  }
}

//Pending
function checkNetwork(){
  while (true) {
      console.log('wifi check');
      window.addEventListener("online", function() {
          console.log('connected');
      })
          window.addEventListener("offline", function() {
          console.log('disconnected');
      })
  }
}

function stopIntervals() {
  setTimeout(function() {stopIntervals(intervalControl); clearInterval(intervalControl); }, 5000);
}
