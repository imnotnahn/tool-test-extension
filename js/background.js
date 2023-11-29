let data;
let jsonData;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    data = request.buttondata
    jsonData = JSON.parse(data);
});

chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name === "tobackground");
    port.onMessage.addListener(function(msg){
        if (msg.answer === "test") {
            console.log('received');
            console.log(data);
        } else {
            console.log('nothingg');
        }
    })
});

