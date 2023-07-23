const imgElement = document.getElementById('image');
const fileInput = document.getElementById('file');
const downloadButton = document.getElementById('download');
const previewButton = document.getElementById('preview');
const container = document.querySelector('.container');
const outputCanvas = document.getElementById('output-canvas');
const postUploadContainer = document.getElementById('post-upload-container');
let cvReady = false,
  fileName = '';
function openCvReady() {
  cv['onRuntimeInitialized'] = () => {
    cvReady = true;
  };
}
fileInput.onchange = () => {
  //The FileReader object helps to read contents of file stored on computer
  let reader = new FileReader();
  //readAsDataURL reads the content of input File
  reader.readAsDataURL(fileInput.files[0]);

  reader.onload = () => {
    //onload is triggered after file reading operation is successfully completed.
    //set src attribute of image to the result/input File
    imgElement.setAttribute('src', reader.result);
    container.classList.add('hide');
    postUploadContainer.classList.remove('hide');
  };
  //set filename for setting download file name later
  fileName = fileInput.files[0].name.split('.')[0];
};
const imageApply = () => {
  //load an image
  const mat = cv.imread(imgElement);
  //Create matrix from image
  const newImage = new cv.Mat();
  //convert image to grayscale
  cv.cvtColor(mat, newImage, cv.COLOR_BGR2GRAY, 0);
  //Blur
  const edges = new cv.Mat();
  //thresholding image (needed but doesn't work with color)
  cv.adaptiveThreshold(
    newImage,
    edges,
    255,
    cv.ADAPTIVE_THRESH_MEAN_C,
    cv.THRESH_BINARY,
    9,
    9
  );

  const color = new cv.Mat();
  cv.bilateralFilter(newImage, color, 9, 250, 250, cv.BORDER_DEFAULT);
  cv.cvtColor(mat, color, cv.COLOR_RGBA2RGB, 0);

  const cartoon = new cv.Mat();
  cv.bitwise_and(color, color, cartoon, edges); 
  cv.imshow('output-canvas', cartoon);
  mat.delete();
  newImage.delete();
  edges.delete();
  cartoon.delete();
};
previewButton.addEventListener('click', () => {
  if (cvReady) {
    imageApply();
    downloadButton.classList.remove('hide');
    let imagedata = outputCanvas.toDataURL('image/png');
    downloadButton.href = imagedata;
    downloadButton.download = `${fileName}.png`;
  } else {
    alert('Something went wrong, please try again..');
  }
});
