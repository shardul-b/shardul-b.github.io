const topicContainer = document.getElementById('topic-container');
const topicInput = document.getElementById('topic-input');
const submitTopic = document.getElementById('submit-topic');
const listTitle = document.getElementById('list-title');
const settingButton = document.getElementById('setting-button');
const listInput = document.getElementById('list-input');
const proCount = document.getElementById('pro-count');
const conCount = document.getElementById('con-count');
const listContainer = document.querySelector('.list-container');
const pointInput = document.querySelector('.point');
const proButton = document.querySelector('.pro');
const cancelButton = document.querySelector('.cancel');
const conButton = document.querySelector('.con');
const addButton = document.querySelector('.add');
const themeContainer = document.getElementById('theme-container');
const prosSectionItems = document.querySelector('.pros-section-items');
const consSectionItems = document.querySelector('.cons-section-items');
const editTitleButton = document.getElementById('edit-title');
const setTitleButton = document.getElementById('set-title');
const themeCount = 5;
//empty checks left
let topicValue = '',
  proValue = '',
  conValue = '',
  proIndex = 0,
  conIndex = 0,
  updateNote = '',
  currentTheme = '';
const checkEmpty = (value) => {
  if (value.trim() == '') {
    return true;
  }
  return false;
};
const switchDisplay = (element1, element2) => {
  element1.classList.add('hide');
  element2.classList.remove('hide');
};
//remove list item from local storage
const removeListItem = (listItemValue) => {
  localStorage.removeItem(listItemValue);
  displayListItems();
};
//add list item to local storage
const updateStorage = (index, listItemValue, listItemCategory) => {
  localStorage.setItem(`${index}_${listItemCategory}`, listItemValue);
  displayListItems();
};
//disables edit buttons
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName('edit');
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};
//Topic screen
submitTopic.addEventListener('click', () => {
  topicValue = topicInput.value;
  if (checkEmpty(topicValue)) {
    alert('Please enter a topic');
    return false;
  }
  listTitle.innerText = topicValue;
  switchDisplay(topicContainer, listContainer);
  prosSectionItems.innerHTML = '';
  consSectionItems.innerHTML = '';
  proCount.innerText = prosSectionItems.childElementCount;
  conCount.innerText = consSectionItems.childElementCount;
  if (Object.keys(localStorage).length > 0) {
    displayListItems();
  }
  currentTheme = 'theme1';
});
//add task
addButton.addEventListener('click', () => {
  conButton.disabled = false;
  proButton.disabled = false;
  listInput.classList.remove('hide');
  pointInput.value = '';
});
//cancel button
cancelButton.addEventListener('click', () => {
  listInput.classList.add('hide');
  pointInput.value = '';
});
const appendListItem = (category) => {
  disableButtons(false);
  if (checkEmpty(pointInput.value)) {
    alert('List item cannot be empty');
    return false;
  }
  if (updateNote == '') {
    //new
    if (category == 'pro') {
      proIndex += 1;
      updateStorage(proIndex, pointInput.value, category);
    } else {
      conIndex += 1;
      updateStorage(conIndex, pointInput.value, category);
    }
  } else {
    //update
    updateStorage(
      updateNote.split('_')[0],
      pointInput.value,
      updateNote.split('_')[1]
    );

    updateNote = '';
  }
  listInput.classList.add('hide');
};
//pro button
proButton.addEventListener('click', () => {
  appendListItem('pro');
});
//con button
conButton.addEventListener('click', () => {
  appendListItem('con');
});

const displayListItems = () => {
  //clear the tasks
  // if (Object.keys(localStorage).length < 0) {
  //   prosSectionItems.style.display = 'none';
  //   consSectionItems.style.display = 'none';
  // } else {
  //   if (
  //     Object.keys(localStorage).filter((value) => {
  //       value.includes('pro');
  //     }).length < 0
  //   ) {
  //     prosSectionItems.style.display = 'none';
  //   } else if (
  //     Object.keys(localStorage).filter((value) => {
  //       value.includes('con');
  //     }).length < 0
  //   ) {
  //     consSectionItems.style.display = 'none';
  //   }
  // }
  prosSectionItems.innerHTML = '';
  consSectionItems.innerHTML = '';
  //fetch all the keys in localstorage(localstorage stores in the format key:value)
  let listItems = Object.keys(localStorage);
  for (let key of listItems) {
    //get all the values
    let value = localStorage.getItem(key);

    //key would be 'index_category' eg: '0_pro'
    let innerDiv = document.createElement('div');
    innerDiv.classList.add('task');
    innerDiv.setAttribute('id', key);
    innerDiv.innerHTML = `<span id="item-name">${value}</span>`;
    let editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.innerHTML = `<i class="fas fa-pencil-alt"></i>`;
    innerDiv.appendChild(editButton);

    innerDiv.innerHTML += `<button class="delete">
    <i class="far fa-trash-alt"></i>
    </button>`;
    if (key.split('_')[1] == 'pro') {
      prosSectionItems.appendChild(innerDiv);
    } else {
      consSectionItems.appendChild(innerDiv);
    }
  }
  proCount.innerText = prosSectionItems.childElementCount;
  conCount.innerText = consSectionItems.childElementCount;

  //edit tasks
  editItems = document.getElementsByClassName('edit');
  Array.from(editItems).forEach((element) => {
    element.addEventListener('click', (e) => {
      //stop propogation to outer elements(if removed, whem we click  delete eventually the click will move to parent)
      e.stopPropagation();
      //disable other edit buttons when one task is being edited
      disableButtons(true);
      //update input value and remove div
      let parent = element.parentElement;
      pointInput.value = parent.querySelector('#item-name').innerText;
      //set updateNote to the task that is being edited
      updateNote = parent.id;
      //remove task
      parent.remove();
      removeListItem(updateNote);
      conButton.disabled = false;
      proButton.disabled = false;
      if (updateNote.includes('pro')) {
        conButton.disabled = true;
      } else {
        proButton.disabled = true;
      }
      listInput.classList.remove('hide');
    });
  });
  //delete task
  deleteItems = document.getElementsByClassName('delete');
  Array.from(deleteItems).forEach((element) => {
    element.addEventListener('click', (e) => {
      e.stopPropagation();
      //delete from local storage and remove div
      let parent = element.parentElement;
      removeListItem(parent.id);
      parent.remove();
    });
  });
};

settingButton.addEventListener('click', () => {
  themeContainer.innerHTML = '';
  themeContainer.classList.remove('hide');
  for (let i = 1; i <= themeCount; i++) {
    themeContainer.innerHTML += `<button class='theme-option theme${i}' onclick="setTheme(${i})"></button>`;
  }
});
const setTheme = (themeValue) => {
  themeContainer.classList.add('hide');
  let currentThemeElements = document.querySelectorAll(`.${currentTheme}`);
  currentThemeElements.forEach((element) => {
    element.classList.remove(currentTheme);
    element.classList.add(`theme${themeValue}`);
  });
  currentTheme = `theme${themeValue}`;
};
//Edit title
editTitleButton.addEventListener('click', () => {
  listTitle.contentEditable = true;
  listTitle.focus();
  setTitleButton.classList.remove('hide');
});

//Set title
setTitleButton.addEventListener('click', () => {
  setTitleButton.classList.add('hide');
  listTitle.contentEditable = false;
});

window.onload = () => {
  topicInput.value = '';
};
