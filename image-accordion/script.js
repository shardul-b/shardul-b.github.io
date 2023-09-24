const items = document.querySelectorAll('.item');

let imageUrls = [
  './images/img-1.jpeg',
  './images/img-2.jpeg',
  './images/img-3.jpeg',
  './images/img-4.jpeg',
  './images/img-5.png',
];

//intially empty
let deviceType = '';
let events = {
  mouse: {
    start: 'mouseover',
    end: 'mouseout',
  },
  touch: {
    start: 'touchstart',
    end: 'touchend',
  },
};
const isTouchDevice = () => {
  try {
    //We try to create TouchEvent (it would fail for desktops and throw error)
    document.createEvent('TouchEvent');
    deviceType = 'touch';
    return true;
  } catch (e) {
    deviceType = 'mouse';
    return false;
  }
};
isTouchDevice();
items.forEach((item, index) => {
  let img = document.createElement('img');
  img.setAttribute('src', imageUrls[index]);
  // Set base style for the images
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';

  item.appendChild(img);

  // initial CSS properties for all items
  item.style.flex = '1';
  item.style.transition = 'flex 0.8s ease';

  item.addEventListener(events[deviceType].start, () => {
    item.style.flex = '9'; // Expand the item
  });

  item.addEventListener(events[deviceType].end, () => {
    item.style.flex = '1'; // Contract the item
  });
});
