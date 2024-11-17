const timerScreen = document.getElementById("timer-screen");
const downloadButton = document.getElementById("download-button");
const downloadScreen = document.getElementById("download-screen");
const downlaodURL =
  "https://codingartistweb.com/wp-content/uploads/2024/11/Expanding-Menu.zip";
let downloadInterval;
let count = 10;
const displayTimer = () => {
  count -= 1;
  timerScreen.innerHTML = `Download will start in ${count} seconds`;
  if (count == 0) {
    clearInterval(downloadInterval);
    timerScreen.innerHTML = `Your file is downloading...`;
    setTimeout(() => {
      location.href = downlaodURL;
      timerScreen.classList.add("hide");
      downloadButton.innerText = "Download again";
      downloadScreen.classList.remove("hide");
      count = 10;
    }, 2000);
  }
};

downloadButton.addEventListener("click", () => {
  timerScreen.classList.remove("hide");
  downloadScreen.classList.add("hide");
  downloadInterval = setInterval(displayTimer, 1000);
});
