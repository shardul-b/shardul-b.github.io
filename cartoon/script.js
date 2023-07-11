function openCvReady() {
  cv['onRuntimeInitialized'] = () => {
    imageApply();
  };
}
const imageApply = () => {
  const imgElement = document.createElement('img');
  imgElement.src = './images.jpeg';
  imgElement.onload = function () {
    //load an image
    const mat = cv.imread(imgElement);
    //Create matrix from image
    const newImage = new cv.Mat();
    //convert image to grayscale
    cv.cvtColor(mat, newImage, cv.COLOR_BGR2GRAY, 0);
    //Blur
    // cv.medianBlur(newImage, newImage, 5);

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
    // cv.imshow('outputCanvas', color);

    cv.imshow('outputCanvas', cartoon);
    // cv.imshow('edges', edges);
    // // cv.imshow('Cartoon', cartoon);

    // cv.waitKey();

    mat.delete();
    newImage.delete();
    edges.delete();
    // color.delete();
    cartoon.delete();

    // cv.destroyAllWindows();
  };
};
