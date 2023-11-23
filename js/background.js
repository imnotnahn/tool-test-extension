

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const data = request.buttondata
    const jsonData = JSON.parse(data);
    console.log(data);
    console.log(jsonData.buttonId1);
    console.log(jsonData.buttonId2);
    console.log(jsonData.buttonId3);
    console.log(request.exportfile);
    if (request.exportfile === 'doit') {
        console.log(data);
        console.log('lẹt gô');
        writeData();
    }
});
