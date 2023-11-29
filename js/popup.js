
//document.addEventListener('DOMContentLoaded', function () {
    let controlButton = document.getElementById('button');
    let stopButton = document.getElementById('buttonstop');
    let resetButton = document.getElementById('buttonreset');
    controlButton.addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const messageInput1 = document.getElementById('button1');
        const messageInput2 = document.getElementById('button2');
        const messageInput3 = document.getElementById('button3');
        const messageInput4 = document.getElementById('button4');
        const TimeDelay = document.getElementById('time');
        const messageData = [
          {message1: messageInput1.value+'-value'},
          {message2: messageInput2.value+'-value'},
          {message3: messageInput3.value+'-value'},
          {message4: messageInput4.value+'-value'},
          {message5: TimeDelay.value}
        ]
        chrome.tabs.sendMessage(tabs[0].id, 
          { action: 'controlButton',
          dataButton1: messageData[0].message1,
          dataButton2: messageData[1].message2,
          dataButton3: messageData[2].message3,
          dataButton4: messageData[3].message4,
          dataDelay: messageData[4].message5});
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
    port.postMessage({answer: "test"});

    });
  //});



