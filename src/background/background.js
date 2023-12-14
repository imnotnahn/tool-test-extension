let data;
let jsonData;


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

});

chrome.runtime.onConnect.addListener(function (port) {
    console.assert(port.name === "tobackground");
    port.onMessage.addListener(function (msg) {
        console.log(msg.nameid);
        if (msg.answer === "test") {
            chrome.storage.local.get(["deviceId"]).then((result) => {
                console.log(result);
                const deviceId = result.deviceId;
                console.log(deviceId);
                for (let storedId in deviceId) {
                    if (msg.nameid === deviceId[storedId].nameDevice) {
                        exportToExcel(deviceId[storedId].infoDevice);
                        console.log(deviceId[storedId].infoDevice);
                        break; 
                    } else {
                        console.log('Invalid ID');
                    }
                }
            });
        } else {
            console.log('nothingg');
        }
    });
});

function exportToExcel(info) {
    const jsonData = [{ info }];
    const csvContent = "data:text/csv;charset=utf-8," + convertToCSV(jsonData);
    const encodedUri = encodeURI(csvContent);
    chrome.downloads.download({
        url: encodedUri,
        filename: 'data.csv',
        saveAs: true
    });
}

function convertToCSV(objArray) {
    console.log(objArray);
    const infoOfArray = objArray[0].info;
    console.log(infoOfArray);
    const isJson = JSON.parse(infoOfArray);
    console.log(isJson);
    const array = typeof objArray !== 'object' ? JSON.parse(isJson) : isJson;
    console.log(array);
    let str = '';

    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (line !== '') line += ',';
            line += array[i][index];
        }
        str += line + '\r\n';
    }
    return str;
}
