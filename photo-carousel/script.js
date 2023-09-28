let childElement = document.querySelectorAll('.image-container');
let imageUrls = [
  './images/img-1.jpeg',
  './images/img-2.jpeg',
  './images/img-3.jpeg',
  './images/img-4.jpeg',
  './images/img-5.png',
];

let zIndex = 1; // Initial z-index value

childElement.forEach((element, index) => {
  let img = document.createElement('img');
  img.setAttribute('src', imageUrls[index]);
  img.setAttribute('class', 'image');
  element.appendChild(img);

  element.addEventListener('click', () => {
    // Increment z-index by 1
    zIndex++;
    element.style.right = '50em';
    element.style.zIndex = zIndex.toString();
    element.style.transform = 'rotate(0deg)';

    element.style.transition = 'right 0.5s ease';

    // Remove the class and reset the right property after a delay
    setTimeout(() => {
      zIndex -= 3;
      element.style.right = '';
      element.style.zIndex = zIndex.toString();
      element.style.transform = '';

      // Set a transition for clearing the transition property
      element.style.transition = 'all 0.3s ease';

      // Clear the transition property after a slight delay
      setTimeout(() => {
        element.style.transition = '';
      }, 300);
    }, 1000);
  });
});
