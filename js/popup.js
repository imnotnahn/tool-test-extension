
//document.addEventListener('DOMContentLoaded', function () {
    let controlButton = document.getElementById('button');
    let stopButton = document.getElementById('buttonstop');
    let resetButton = document.getElementById('buttonreset');
    let getButtonData = document.getElementById('buttonGetData');
    let checkDataButton = document.getElementById('buttonCheckData');
    let idValue = document.getElementById('idvalue');
    controlButton.addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const TimeDelay = document.getElementById('time');
        const messageData = [
          {message5: TimeDelay.value},
          {message6: idValue.value}
        ]
        chrome.tabs.sendMessage(tabs[0].id, 
          { action: 'controlButton',
          dataDelay: messageData[0].message5,
          dataId: messageData[1].message6});
      });
    });
    resetButton.addEventListener('click', function(){
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id,{
          resetdata: "resetdata"
        })
      })
    })
    getButtonData.addEventListener('click', function(){
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id,{
          getbuttondata: "getdatatimer"
        })
      })
    })
    checkDataButton.addEventListener('click', function(){
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id,{
          checkdatabutton: "checkdatabutton"
        })
      })
    })
  stopButton.addEventListener('click', function () {
    let port = chrome.runtime.connect({name: "tobackground"});
    const nameId = document.getElementById('idvaluetobackground');
    const nameValue = nameId.value;
    const deviceId = idValue.value;
    port.postMessage({
      answer: "test",
      idDevice: deviceId,
      nameid: nameValue});
    });

  //});



