let video = document.querySelector("#video");
let canvas = document.querySelector("#canvas");
let filters = document.querySelectorAll(".filter");
let snap = document.querySelector("#snap");
let countDownText = document.querySelector(".countDown");
let photosCol = document.querySelector("#photosCol");

let selectedFilter = "";

// Access camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(function (stream) {
    video.srcObject = stream;
  })
  .catch(function (error) {
    alert("Could not access the camera.");
    console.log(error);
  });

// Apply filters
filters.forEach((div) => {
  div.addEventListener("click", () => {
    selectedFilter = div.getAttribute("data-filter");
    video.style.filter = selectedFilter;
  });
});

// Countdown and take snapshot
snap.addEventListener("click", () => {
  let count = 3;
  countDownText.innerText = count;
  countDownText.style.display = "block";

  let timer = setInterval(() => {
    count--;

    if (count === 0) {
      countDownText.innerText = "Smile!";
    } else if (count < 0) {
      clearInterval(timer);
      countDownText.style.display = "none";
      showPhoto();
    } else {
      countDownText.innerText = count;
    }
  }, 1000);
});

function showPhoto() {
  let context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  context.filter = selectedFilter; // Apply selected filter to canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  let data = canvas.toDataURL("image/png");

  let photodiv = document.createElement("div");
  photodiv.setAttribute("class", "allpic");
  let photo = document.createElement("img");
  photo.src = data;
  photo.classList.add("image");
  photodiv.appendChild(photo);

  let downloadBtn = document.createElement("button");
  downloadBtn.textContent = "Download";
  downloadBtn.setAttribute("id", "downBtn");
  downloadBtn.addEventListener("click", () => {
    let a = document.createElement("a");
    a.href = data;
    a.download = "photo.png";
    a.click();
  });

  photodiv.appendChild(downloadBtn);
  photosCol.appendChild(photodiv);
}
