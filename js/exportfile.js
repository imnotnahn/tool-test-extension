const excel = require(excel);
const filename = 'Datatest.xlsx';
const wb = new Workbook();
const ws = wb.addWorksheet('My sheet');


















function writeData(){

}

function configData(jsonData){
    const dataArray = [
        {buttonName1: jsonData.buttonId1},
        {buttonName2: jsonData.buttonId2},
        {buttonName3: jsonData.buttonId3},
        {buttonName4: jsonData.buttonId4},
        {buttonCout1: jsonData.coutStateButton1},
        {buttonCout2: jsonData.coutStateButton2},
        {buttonCout3: jsonData.coutStateButton3},
        {buttonCout4: jsonData.coutStateButton4},
    ]
    return dataArray;
}