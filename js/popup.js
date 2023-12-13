
//document.addEventListener('DOMContentLoaded', function () {
    let controlButton = document.getElementById('button');
    let stopButton = document.getElementById('buttonstop');
    let resetButton = document.getElementById('buttonreset');
    let idValue = document.getElementById('idvalue');
    controlButton.addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // const messageInput1 = document.getElementById('button1');
        // const messageInput2 = document.getElementById('button2');
        // const messageInput3 = document.getElementById('button3');
        // const messageInput4 = document.getElementById('button4');
        const TimeDelay = document.getElementById('time');
        const messageData = [
          // {message1: messageInput1.value+'-value'},
          // {message2: messageInput2.value+'-value'},
          // {message3: messageInput3.value+'-value'},
          // {message4: messageInput4.value+'-value'},
          {message5: TimeDelay.value},
          {message6: idValue.value}
        ]
        chrome.tabs.sendMessage(tabs[0].id, 
          { action: 'controlButton',
          // dataButton1: messageData[0].message1,
          // dataButton2: messageData[1].message2,
          // dataButton3: messageData[2].message3,
          // dataButton4: messageData[3].message4,
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



