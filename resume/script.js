let topDiv = document.querySelector('.top');
let outputContainer = document.querySelector('.output_container');
let userInputDiv; //will be set later
// let formatButtons = document.querySelectorAll('.format-button');
let boldButton = document.getElementById('bold');
let italicButton = document.getElementById('italic');
let underlineButton = document.getElementById('underline');
let subscriptButton = document.getElementById('subscript');
let superscriptButton = document.getElementById('superscript');
let titleDiv = document.querySelectorAll('.titles');
let breakDiv = document.querySelectorAll('.break');
let backgroundColorButton = document.getElementById('backgroundColor');
let backgroundColorLabel = document.getElementById('backgroundColorLabel');
let fontColorButton = document.getElementById('fontColor');
let fontName = document.getElementById('fontName');
let fontSizeRef = document.getElementById('fontSize');
let resumeRef = document.querySelector('.resume');
let optionsButtons = document.querySelectorAll('.option-button');
let downloadButton = document.getElementById('download');
let heading = document.querySelectorAll('.heading');
// Resume input Section
let resumeInput = document.querySelector('.resume_input_container');
let submitButton = document.getElementById('submitInputs');
let addEducation = document.getElementById('education_add');
let education_add_container = document.getElementById(
  'education_input_container'
);
let addExperience = document.getElementById('experience_add');
let experience_add_container = document.getElementById(
  'experience_input_container'
);
//User Inputs
let usertitle = document.getElementById('title');
let userName = document.getElementById('username');
let useremail = document.getElementById('emailuser');
let contactRef = document.getElementById('contactnumberuser');
let collegeRef = document.getElementsByClassName('education_college');
let educationYearRef = document.getElementsByClassName('education_year');
let educationDegreeRef = document.getElementsByClassName('education_degree');
let skillsRef = document.getElementById('skills-input');
let experienceCompany = document.getElementsByClassName('experience_company');
let experienceStart = document.getElementsByClassName('experience_start_year');
let experienceEnd = document.getElementsByClassName('experience_end_year');
let experiencePosition = document.getElementsByClassName('experience_position');
let websiteLink = document.getElementById('websiteLink');
let imageLink = document.getElementById('imageLink');
let summaryInput = document.getElementById('about_user');
//Outputs
let displayUserName = document.getElementById('user-name');
let displayTitle = document.getElementById('headline');
let displayContact = document.getElementById('phone');
let displayEmail = document.getElementById('email');
let displayWebsite = document.getElementById('website');
let displaySummary = document.getElementById('summary');
let displayExperience = document.getElementById('display-experience');
let displayEducation = document.getElementById('display-education');
let displaySkills = document.getElementById('skills');
let displayImage = document.getElementById('userImage');
//set this variable to the class of div the user has clicked on
let applyStylesTo;
//list of fonts
let fontList = [
  'Arial',
  'Arial Black',
  'Verdana',
  'Helvetica',
  'Franklin Gothic Medium',
  'Arial Narrow',
  'Tahoma',
  'Trebuchet MS',
  'Impact',
  'Times New Roman',
  'Georgia',
  'Courier',
  'Lucida Console',
  'Comic Sans MS',
  'Cambria',
  'Segoe UI',
];
//Initial setup
const initializer = () => {
  // FontNames
  fontList.sort().map((value) => {
    let option = document.createElement('option');
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });
  //FontSizes
  for (let i = 1; i <= 40; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }
};
// For the inputs section

//Add Education Inputs
addEducation.addEventListener('click', () => {
  let div = document.createElement('div');
  div.classList.add('education_block', 'flex-space');
  div.innerHTML = `
    <input type="text" class="education_college resume-input" placeholder="College/School Name">
    <input type="text" class="education_year resume-input" placeholder="Passing Year">
    <input type="text" class="education_degree resume-input" placeholder="Enter Degree">
    <button id="removeEducation" onclick="remove(event)" class="resume-input-button">Remove</button>
  `;

  education_add_container.appendChild(div);
});
//Remove Education/Experience
const remove = (e) => {
  e.target.parentElement.remove();
};
//Add Experience Inputs
addExperience.addEventListener('click', () => {
  let div = document.createElement('div');
  div.classList.add('experience_block');
  div.innerHTML += `
    <input type="text" class="experience_company resume-input" placeholder="Company Name">
    <div class="flex">
      <input type="text" class="experience_start_year resume-input" placeholder="Start Year">
      <input type="text" class="experience_end_year resume-input" placeholder="End Year">
    </div>
    <input type="text" class="experience_position resume-input" placeholder="Enter Position">
    <button id="removeExperience" onclick="remove(event)" class="resume-input-button">Remove</button>
  `;
  experience_add_container.appendChild(div);
});
//Display inputs in resume
submitButton.addEventListener('click', () => {
  resumeInput.classList.add('hide');
  outputContainer.classList.remove('hide');
  displayImage.src = imageLink.value;
  displayUserName.innerText = userName.value;
  displayTitle.innerText = usertitle.value;
  displayEmail.innerText = useremail.value;
  displayWebsite.innerText = websiteLink.value;
  displayContact.innerText = contactRef.value;
  displaySummary.innerText = summaryInput.value;
  //skills
  let skillsArray = skillsRef.value.split(',');
  // console.log(skillsRef);
  skillsArray.forEach((value) => {
    displaySkills.innerHTML += `<div class='skill user-input'>${value}</div>`;
  });
  //sets experience
  for (let i = 0; i < experienceCompany.length; i++) {
    let div = document.createElement('div');
    div.classList.add('display-experience-block');
    div.innerHTML += `
        <div id="display-position" class="user-input">${experiencePosition[i].value}</div>
        <div id="display-company" class="user-input">${experienceCompany[i].value}</div>
        <div id="display-year" class="user-input">${experienceStart[i].value} - ${experienceEnd[i].value}</div>
    `;
    displayExperience.appendChild(div);
  }
  // sets education
  for (let i = 0; i < collegeRef.length; i++) {
    let div = document.createElement('div');
    div.classList.add('display-education-block');

    div.innerHTML += `
        <div id="display-college" class="user-input">${collegeRef[i].value}</div>
        <div id="display-degree" class="user-input">${educationDegreeRef[i].value}</div>
        <div id="display-education-year" class="user-input">${educationYearRef[i].value}</div>
    `;
    displayEducation.appendChild(div);
  }
  //for editable user inputs in resume
  userInputDiv = document.querySelectorAll('.user-input');
  userInputDiv.forEach((element) => {
    element.addEventListener('click', () => {
      if (element.classList.contains('active')) {
        element.classList.remove('active');
        elementSetter('');
        element.contentEditable = false;
      } else {
        backgroundColorLabel.classList.add('hide');
        backgroundColorButton.classList.add('hide');
        classAdder(element, 'active');
        elementSetter(element);
        element.contentEditable = true;
      }
    });
  });
});
//get element styles
const getStyles = (element, property) => {
  return window.getComputedStyle(element, null).getPropertyValue(property);
};
//set element to which we need to apply styles
const elementSetter = (caller) => {
  applyStylesTo = caller;
  fontName.value = getStyles(caller, 'font-family');
  fontSizeRef.value = getStyles(caller, 'font-size').replace('px', '');
  //if selected box has bold text
  let boldStatus = getStyles(caller, 'font-weight');
  if (boldStatus > 400) {
    boldButton.classList.add('buttonActive');
  } else {
    boldButton.classList.remove('buttonActive');
  }
  //if selected box has italic text
  let italicStatus = getStyles(caller, 'font-style');
  if (italicStatus == 'italic') {
    italicButton.classList.add('buttonActive');
  } else {
    italicButton.classList.remove('buttonActive');
  }
  //if selected box has underlined text
  let underlineStatus = getStyles(caller, 'text-decoration');
  if (underlineStatus.includes('underline')) {
    underlineButton.classList.add('buttonActive');
  } else {
    underlineButton.classList.remove('buttonActive');
  }
  // backgroundColorButton.value = '';
};
//add class for caller and remove for others
const classAdder = (caller, className) => {
  let matchedElements = document.querySelectorAll(`.${className}`);
  [].forEach.call(matchedElements, (el) => {
    el.classList.remove(className);
  });
  caller.classList.add(className);
};

//for line breaks
breakDiv.forEach((element) => {
  element.addEventListener('click', () => {
    if (element.classList.contains('active')) {
      element.classList.remove('active');
      elementSetter('');
    } else {
      backgroundColorLabel.classList.add('hide');
      backgroundColorButton.classList.add('hide');
      classAdder(element, 'active');
      elementSetter(element);
    }
  });
});

//for titles
titleDiv.forEach((element) => {
  element.addEventListener('click', () => {
    if (element.classList.contains('active')) {
      element.classList.remove('active');
      elementSetter('');
    } else {
      backgroundColorLabel.classList.add('hide');
      backgroundColorButton.classList.add('hide');
      classAdder(element, 'active');
      elementSetter(element);
    }
  });
});
// For top headings
heading.forEach((element) => {
  element.addEventListener('click', () => {
    if (element.classList.contains('active')) {
      element.classList.remove('active');
      elementSetter('');
      element.contentEditable = false;
    } else {
      backgroundColorLabel.classList.add('hide');
      backgroundColorButton.classList.add('hide');
      classAdder(element, 'active');
      elementSetter(element);
      element.contentEditable = true;
    }
  });
});

//whole resume
resumeRef.addEventListener(
  'click',
  () => {
    if (resumeRef.classList.contains('active')) {
      resumeRef.classList.remove('active');
      backgroundColorLabel.classList.add('hide');
      backgroundColorButton.classList.add('hide');
      elementSetter('');
    } else {
      classAdder(resumeRef, 'active');
      elementSetter(resumeRef);
      backgroundColorLabel.classList.remove('hide');
      backgroundColorButton.classList.remove('hide');
    }
  },
  true
);
//background Color
backgroundColorButton.addEventListener('change', () => {
  applyStylesTo.style.backgroundColor = backgroundColorButton.value;
});
//font color
fontColorButton.addEventListener('change', () => {
  applyStylesTo.style.color = fontColorButton.value;
});
//font Name
fontName.addEventListener('change', () => {
  applyStylesTo.style.fontFamily = fontName.value;
});
//bold
boldButton.addEventListener('click', () => {
  if (window.getSelection().type == 'Range') {
    document.execCommand('bold', false, null);
  } else {
    if (boldButton.classList.contains('buttonActive')) {
      boldButton.classList.remove('buttonActive');
      applyStylesTo.style.fontWeight = 'normal';
    } else {
      boldButton.classList.add('buttonActive');
      applyStylesTo.style.fontWeight = 600;
    }
  }
});
//italic
italicButton.addEventListener('click', () => {
  if (window.getSelection().type == 'Range') {
    document.execCommand('italic', false, null);
  } else {
    if (italicButton.classList.contains('buttonActive')) {
      italicButton.classList.remove('buttonActive');
      applyStylesTo.style.fontStyle = 'normal';
    } else {
      italicButton.classList.add('buttonActive');
      applyStylesTo.style.fontStyle = 'italic';
    }
  }
});
//underline
underlineButton.addEventListener('click', () => {
  if (window.getSelection().type == 'Range') {
    document.execCommand('underline', false, null);
  } else {
    if (underlineButton.classList.contains('buttonActive')) {
      underlineButton.classList.remove('buttonActive');
      applyStylesTo.style.textDecoration = 'none';
    } else {
      underlineButton.classList.add('buttonActive');
      applyStylesTo.style.textDecoration = 'underline';
    }
  }
});
// superscriptButton.addEventListener('click', () => {
//   if (superscriptButton.classList.contains('buttonActive')) {
//     superscriptButton.classList.remove('buttonActive');
//   } else {
//     superscriptButton.classList.add('buttonActive');
//     document.execCommand('superscript', false, null);
//   }
// });
// subscriptButton.addEventListener('click', () => {
//   if (subscriptButton.classList.contains('buttonActive')) {
//     subscriptButton.classList.remove('buttonActive');
//   } else {
//     subscriptButton.classList.add('buttonActive');
//     document.execCommand('subscript', false, null);
//   }
// });
downloadButton.addEventListener('click', () => {
  let options = {
    margin: 0,
    html2canvas: {
      scrollY: -window.scrollY,
      userCors: true,
    },
  };
  // var element = document.getElementById('element-to-print');
  html2pdf().set(options).from(resumeRef).save();
});
//optionButtons(format and super/sub script)
// optionsButtons.addEventListener('click', () => {});
window.onload = initializer();
