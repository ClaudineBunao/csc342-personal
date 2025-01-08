// import {counties, parks} from './data.js';

//Import the HTTPClient object from the HTTPClient.js file.
import HTTPClient from './HTTPClient.js';

// replace these implementations with calls to the NC Parks API
const getCounties = () => {
  return HTTPClient.get('/api/counties');
  // return new Promise((resolve, reject) => {
  //   resolve(Object.values(counties));
  // });
};

const getCountyById = (id) => {
  return HTTPClient.get(`/api/counties/${id}`);
  // return new Promise((resolve, reject) => {
  //   const county = counties[id];
  //   if(county) {
  //     resolve(county);
  //   }
  //   else {
  //     reject();
  //   }
  // });
};

const getParksByCountyId = (countyId) => {
  return HTTPClient.get(`/api/counties/${countyId}/parks`);
  // return new Promise((resolve, reject) => {
  //   try{
  //     countyId = parseInt(countyId);
  //     const results = Object.values(parks).filter(park => !countyId || countyId === NaN || park.county.includes(countyId));
  //     results.forEach(park => {
  //       park.counties = getParkCountyArray(park);
  //     });
  //     resolve(results);
  //   }
  //   catch (error) {
  //     reject(error);
  //   }
  // });
};

const getParkById = (id) => {
  return HTTPClient.get(`/api/parks/${id}`);
  // return new Promise((resolve, reject) => {
  //   const park = parks[id];
  //   if(park) {
  //     park.counties = getParkCountyArray(park);
  //     resolve(park);
  //   }
  //   else {
  //     reject();
  //   }
  // });
};


export default {
  getCounties,
  getCountyById,
  getParksByCountyId,
  getParkById
};


// function getParkCountyArray(park) {
//   let parkCounties = [];
//   park.county.forEach(countyId => {
//     getCountyById(countyId).then(county => {
//       parkCounties.push(county);
//     });
//   });
//   return parkCounties;
// }