
document.addEventListener('DOMContentLoaded', function () {
    var controlButton = document.getElementById('button');
    var stopButton = document.getElementById('buttonstop');
    controlButton.addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const messageInput1 = document.getElementById('button1');
        const messageInput2 = document.getElementById('button2');
        const messageInput3 = document.getElementById('button3');
        const messageInput4 = document.getElementById('button4');
        const TimeDelay = document.getElementById('time');
        const message1 = messageInput1.value+'-value';
        const message2 = messageInput2.value+'-value';
        const message3 = messageInput3.value+'-value';
        const message4 = messageInput4.value+'-value';
        const message5 = TimeDelay.value;
        chrome.tabs.sendMessage(tabs[0].id, 
          { action: 'controlButton',
          dataButton1: message1,
          dataButton2: message2,
          dataButton3: message3,
          dataButton4: message4,
          dataDelay: message5});
      });
    });
  stopButton.addEventListener('click', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id,
        { stop: 'stoppls'});
        console.log('stop button');
    });
  });
});


