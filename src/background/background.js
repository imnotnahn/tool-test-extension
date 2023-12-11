let data;
let jsonData

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    data = request.buttondata;
    jsonData = JSON.parse(data);
});

chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name === "tobackground");
    port.onMessage.addListener(function(msg){
        if (msg.answer === "test") {
            console.log('received');
            console.log(data);
            exportToExcel();
            console.log(convertToCSV(jsonData));
        } else {
            console.log('nothingg');
        }
    });
});

function exportToExcel() {
    const csvContent = "data:text/csv;charset=utf-8," + convertToCSV(jsonData);
    const encodedUri = encodeURI(csvContent);
    chrome.downloads.download({
        url: encodedUri,
        filename: 'data.csv', 
        saveAs: true 
    });
}
function convertToCSV(objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    console.log(array);
    console.log(objArray);
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
