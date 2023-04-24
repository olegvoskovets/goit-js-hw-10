const BASE_URL = `https://restcountries.com/v3.1/name/`;
function fetchCountries(name) {
  if (name) {
    return fetch(BASE_URL + name).then(res => {
      if (!res.ok) {
        console.log('все пропало');
      } else {
        return res.json();
      }
    });
  }
}

export default { fetchCountries };
