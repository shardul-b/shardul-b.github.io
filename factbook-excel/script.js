const regionContainer = document.querySelector('.region-container');
const countryContainer = document.querySelector('.country-container');
const allButton = document.querySelector('.all-data');

let region = {};
//options required from object
const required = [
  'Population',
  'Age structure',
  'Population below poverty line',
  'Literacy',
  'Urbanization',
  'GDP (official exchange rate)',
  'Real GDP (purchasing power parity)',
  'Real GDP per capita',
  'Birth rate',
  'Population growth rate',
];
//expected labels in the excel sheet (to be taken from user in future)
const expected = [
  'Population',
  '0-14 Years',
  '% Below Poverty Line',
  'Literacy Rate',
  'Urbanization Rate',
  'GDP (USD)',
  'Purchase GDP',
  'Annual Per Capita Income (USD)',
  'Birth Rate per 1000',
  'Popn GR',
];
//Create Excel file
const createExcel = (finalData, name) => {
  let workSheet = XLSX.utils.json_to_sheet(finalData);
  const workBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workBook, workSheet, 'data');
  XLSX.writeFile(workBook, `${name}.xlsx`, { compression: true });
};
//Format the data object based on required parameters
const getFormattedObject = (data) => {
  //Currently we just need Economy and People's data (in future this would be based on user)
  let requiredData = { ...data.Economy, ...data['People and Society'] };
  // console.log(requiredData);
  let finalData = {},
    formattedData = {};
  required.forEach((dataValue) => {
    //specific format for each option (removes 'text' as well)
    if (dataValue == 'Age structure') {
      // console.log('Age structure');
      // console.log(requiredData[dataValue]);
      //condition checks for undefined
      finalData[dataValue] = requiredData[dataValue]
        ? Object.values(requiredData[dataValue]['0-14 years'])[0]
        : 'NA';
    } else if (dataValue == 'Literacy') {
      // console.log('Literacy');
      // console.log(requiredData[dataValue]);
      finalData[dataValue] = requiredData[dataValue]
        ? Object.values(requiredData[dataValue]['total population'])[0]
        : 'NA';
    } else if (dataValue == 'Real GDP (purchasing power parity)') {
      finalData[dataValue] = requiredData[dataValue]
        ? Object.values(Object.values(requiredData[dataValue])[0])[0]
        : 'NA';
    } else if (dataValue == 'Real GDP per capita') {
      // console.log('Real GDP per capita');
      // console.log(requiredData[dataValue]);
      finalData[dataValue] = requiredData[dataValue]
        ? Object.values(Object.values(requiredData[dataValue])[0])[0]
        : 'NA';
    } else if (dataValue == 'Urbanization') {
      // console.log('Urna');
      // console.log(requiredData[dataValue]);
      finalData[dataValue] = requiredData[dataValue]
        ? Object.values(requiredData[dataValue]['rate of urbanization'])[0]
        : 'NA';
    } else {
      // console.log('ALL');
      // console.log(requiredData[dataValue]);

      finalData[dataValue] = requiredData[dataValue]
        ? Object.values(requiredData[dataValue])[0]
        : 'NA';
    }
  });
  //add name in final object
  formattedData['Name'] = data.Name;
  //create final object based on preference (update in future)
  for (let i = 0; i < required.length; i++) {
    formattedData[expected[i]] = finalData[required[i]];
  }

  return formattedData;
};
//Not getSheet should be called get Data since it simply fetches from url
const getSheet = (region, code, name) => {
  let url = `https://raw.githubusercontent.com/factbook/factbook.json/master/${region}/${code}.json`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data['Name'] = name;
      let finalObject = getFormattedObject(data);
      // console.log(finalObject);
      createExcel([finalObject], name);
      //     let keys = Object.keys(data);
    })
    .catch((error) => console.log(error));
};
//create buttons for countries based on clicked regionName
const showCountries = (regionName) => {
  countryContainer.innerHTML = '';
  for (let i of region[regionName]) {
    let countryButton = document.createElement('button');
    countryButton.classList.add('country-button');
    countryButton.addEventListener('click', () => {
      getSheet(regionName, i.Code, i.Name);
    });
    countryButton.innerText = i.Name;
    countryContainer.appendChild(countryButton);
  }
};
window.onload = async () => {
  regionContainer.innerHTML = '';
  region = {};
  //create region buttons
  await country_codes.map((country) => {
    let arr = country_codes.filter((innerCountry) => {
      return innerCountry.Region == country.Region;
    });
    // console.log(arr);
    //replace '&' and 'and' with 'n' (for url)
    let formattedRegion = country.Region.toLowerCase()
      .replace('&', 'n')
      .replace('and', 'n')
      .split(' ')
      .join('-');
    // create array of objects for each region which contains countries
    if (!Object.keys(region).includes(formattedRegion)) {
      region[formattedRegion] = arr;
      regionContainer.innerHTML += `
      <div class="region ${formattedRegion}">
        <button class="region-button" onclick="showCountries('${formattedRegion}')">${country.Region}</button>
      </div>
      `;
      // region.push(formattedRegion);
    }
  });
};
//all country data
allButton.addEventListener('click', () => {
  // console.log(region);
  let dets = [];
  //form urls for every country
  for (let i of Object.keys(region)) {
    for (let j of region[i]) {
      dets.push({
        url: `https://raw.githubusercontent.com/factbook/factbook.json/master/${i}/${j.Code}.json`,
        name: j.Name,
      });
    }
  }
  //all urls called here
  var promises = dets.map((details) =>
    fetch(details.url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data['Name'] = details.name;
        return data;
      })
  );
  //once all url return succesfully download the excel file
  Promise.allSettled(promises).then((results) => {
    // console.log(results);
    let allObjects = [];
    results.forEach((result) => {
      let finalObject = getFormattedObject(result.value);
      // console.log(final)
      allObjects.push(finalObject);
    });
    // console.log(allObjects);
    createExcel(allObjects, 'all_countries');
  });
});
