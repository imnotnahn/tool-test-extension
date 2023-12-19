const updateInfo = document.getElementById('infodevices');
document.getElementById("buttonRelay").addEventListener("click", function(event) {
  openTab(event, 'testRelay');
});

document.getElementById("buttonTimer").addEventListener("click", function(event) {
  openTab(event, 'testTimer');
});

chrome.storage.local.get(["deviceId"]).then((result) => {
  const deviceIds = result.deviceId;
  let fullInfo = '';
  if(deviceIds){
    deviceIds.forEach((deviceId) => {
      const jsonArray = JSON.parse(deviceId.infoDevice);
      const mapArray = jsonArray.map((item)=>{
        return `${item.nameButton}: ${item.stateButton}<br>`;
      });
      fullInfo += mapArray.join(' ');
    });
  } else {
    console.log('no infomation');
  }

  updateInfo.innerHTML = fullInfo;
});

function openTab(event, nameTab) {
  let i, tabcontent, tablinks;
  console.log(nameTab);

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  document.getElementById(nameTab).style.display = "block";
  event.currentTarget.classList.add("active");
}
