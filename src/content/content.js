let buttonStates = {
  dataButton1: 0,
  dataButton2: 0,
  dataButton3: 0,
  dataButton4: 0,
};
let coutbutton = {
  button1: 0,
  button2: 0,
  button3: 0,
  button4: 0,
  coutfalse: 0
};
let buttonIds = [];
let boxData = [];
let intervalControl;
let intervalCheckButton;
let deviceId = [];

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

  const timeButtonDelay = request.dataDelay;
  const dataIdValue = request.dataId;
  //console.log(request.dataId);

  if (request.action === 'controlButton') {
    autoClick(buttonIds);
    console.log(buttonIds);
    let currentIndex = 0;

    intervalControl = setInterval(function () {
      const targetButtonId = buttonIds[currentIndex];
      const targetButton = document.getElementById(targetButtonId);
      const JsonButtonData = JSON.stringify(getDataButton(dataIdValue, buttonIds));
      if (targetButton) {
        buttonStates[targetButtonId] = (buttonStates[targetButtonId] == 1) ? 0 : 1;
        targetButton.click();
        saveToStorage(dataIdValue, JsonButtonData);
        console.log(`Button ${targetButtonId} is pressed`);

        clearInterval(intervalCheckButton);
        checkButton(targetButton, targetButtonId);
        checkAndSaveState(targetButtonId, buttonIds);
        sendResponse({test: 'nothinggggggg'});
      }
      currentIndex = (currentIndex + 1) % buttonIds.length;
    }, timeButtonDelay*1000);
  } else if (request.resetdata === "resetdata"){
    chrome.storage.local.clear(function() {
      var error = chrome.runtime.lastError;
      if (error) {
          console.error(error);
      }
      console.log('clear data');
    });
  } else if (request.getbuttondata === "getdatatimer") {
    console.log('getdatatimer');
    getDataTimer();
  } else if (request.checkdatabutton === "checkdatabutton") {
    console.log('checkdatabutton');
    checkDataTimer();
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
      coutbutton.coutfalse++;
      buttonStates[targetButtonId] = (buttonStates[targetButtonId] == 1) ? 0 : 1;
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

function getDataButton(dataIdValue, buttonIds){
  let ButtonData = [
    {nameButton: buttonIds[0],
    stateButton: coutbutton.button1},
    {nameButton: buttonIds[1],
    stateButton: coutbutton.button2},
    {nameButton: buttonIds[2],
    stateButton: coutbutton.button3},
    {nameButton: buttonIds[3],
    stateButton: coutbutton.button4},
    {nameButton: dataIdValue+' false',
    stateButton: coutbutton.coutfalse},
  ];
  return ButtonData;
}

function saveToStorage(dataIdValue, JsonButtonData){
  chrome.storage.local.get(["deviceId"]).then((result) => {
    let savedData = result.deviceId;
    if (!Array.isArray(savedData) || !savedData) {
        savedData = [];
    }
    const existingIndex = savedData.findIndex(item => item.nameDevice === dataIdValue);

    if (existingIndex !== -1) {
        savedData[existingIndex].nameDevice = dataIdValue;
        savedData[existingIndex].infoDevice = JsonButtonData;
    } else {
        savedData.push({ nameDevice: dataIdValue, infoDevice: JsonButtonData });
    }

    chrome.storage.local.set({ deviceId: savedData }).then(() => {
        console.log('value is set');
        console.log(dataIdValue);
    });
  });
}

function autoClick(buttonIds){
  const elements = document.querySelectorAll('.text-slate-500');
  elements.forEach((element, index) => {
    if (index !== 1) {       
        const fidElement = element.querySelector('p:first-child');
      if (fidElement) {
        const fidText = fidElement.textContent.trim();
        const fid = fidText.split(': ')[1];
        if (hasNumber(fid)) {
          const newValue = fid + "-value";
          buttonIds.push(newValue);
          console.log(newValue);
        }
      }
    }
  });
}

function hasNumber(str) {
  return /\d/.test(str);
}

function getDataTimer(){
  const rawIntro = Array.from(document.getElementsByClassName('intro-y col-span-12 lg:col-span-6'));
  rawIntro.forEach((dataElement, index) => {
    const boxElement = dataElement.querySelector('div:nth-child(1)');
    const labelElement = boxElement.querySelector('a.font-medium');
    const flexElement = boxElement.querySelectorAll('.flex.items-center.mb-5');
    flexElement.forEach((flexElement, index) => {
      const labelTimer = flexElement.querySelector('p.font-medium');
      const timeElements = flexElement.querySelectorAll('.btn.btn-sm.btn-rounded-success');
      console.log(timeElements);
      console.log(timeElements[0].textContent);
      console.log(timeElements[1].textContent);
      console.log(labelTimer.textContent);
    })
    const label = labelElement.textContent.trim();
    console.log(label);
    /*
    Data Structure:
    label: nameButton
    labelTimer: labelTimer
    starttime: timeElement[0]
    endtime: timeElement[1] 
    */
  })
}

function checkDataTimer(){
  const getTable = document.getElementsByClassName('table');
  const bodyTable = getTable[6].querySelector('tbody');
  const rowLength = getTable[6].rows.length;
  const rowData = bodyTable.querySelectorAll('tr');

  rowData.forEach((row, index) => {
    console.log(index);
    const dataRowFirst = row.querySelector('td:nth-child(1)');
    const dataRowSecond = row.querySelector('td:nth-child(2)');
    const spanRowSecond = dataRowSecond.querySelectorAll('span');
    const dataRowThird = row.querySelector('td:nth-child(3)');
    spanRowSecond.forEach((dataElement) => {
      const spanData = dataElement.textContent;
      console.log(spanData);
    })
    console.log(dataRowSecond);
  })
  //readTable(bodyTable);
}

function saveDataTimer(){
  chrome.storage.local.set({dataTimer: 'data'}).then(()=>{})
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