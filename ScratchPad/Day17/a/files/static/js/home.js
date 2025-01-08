import api from './APIClient.js';

// string value that will be used as the key to store the selected county in localStorage
const SELECTED_COUNTY_KEY = 'selectedCounty';
//dropdown
const countiesSelect = document.querySelector('#counties-select');
countiesSelect.addEventListener('change', e => {
  localStorage.setItem(SELECTED_COUNTY_KEY, e.target.value);
  //save selected country to local storeage
  updateParks();
});

//get selected county from local storage
const storageCounty = localStorage.getItem(SELECTED_COUNTY_KEY);

api.getCounties().then(counties => {
  counties.forEach(county => {
    const countyOptionInstance = countyOptionTemplate.content.cloneNode(true);
    const countyOption = countyOptionInstance.querySelector('option');

    countyOption.value = county.id;
    countyOption.textContent = county.name;
    
    //select the county that was selected before
    if (county.id == storageCounty) {
      countyOption.selected = true;
    }
    // countiesSelect.value = storageCounty;
    countiesSelect.append(countyOption);
  });
  updateParks();
});


function updateParks() {
  const cIndex = countiesSelect.selectedIndex;
  const countyId = countiesSelect[cIndex].value;
  api.getParksByCountyId(countyId).then(parks => {

    resetParks();
    fillParksHTML(parks);

  });
}

/**
 * Clear current parks
 */
function resetParks(parks) {
  const parkList = document.querySelector('#parks-list');
  parkList.innerHTML = '';
}

/**
 * Create all parks HTML and add them to the webpage.
 */
function fillParksHTML(parks) {
  const parkList = document.querySelector('#parks-list');
  parks.forEach(park => {
    parkList.append(createParkHTML(park));
  });

}

/**
 * Create park HTML.
 */
const parkTemplate = document.querySelector('#parkTemplate');
const countyChipTemplate = document.querySelector('#countyChipTemplate');

function createParkHTML(park) {
  const parkInstance = parkTemplate.content.cloneNode(true);
  const parkElement = parkInstance.querySelector('.park');

  parkElement.href = '/park?id=' + park.id;

  const parkName = parkInstance.querySelector('h2');
  parkName.textContent = park.name;

  park.counties.forEach(county => {
    const countyInstance = countyChipTemplate.content.cloneNode(true);
    const countyContainer = countyInstance.querySelector('.county');

    countyContainer.textContent = county.name;
    parkElement.appendChild(countyInstance);
  });

  return parkElement;
}