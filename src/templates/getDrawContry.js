function languages(len) {
  let result = ``;
  for (var key in len) {
    result += `<span>${len[key]}, </span>`;
  }
  return result;
}

export default function getDrawContry(item) {
  return `
      <div class="card">
          <div class="header">
         <img src=${item.flags.svg} alt=${
    item.flags.alt
  } width="76"  height="40"/>
          
          <h2 class="countri">${item.name.official}</h2>
          </div>
          <div class="info">
              <h3 class="capital">Capital:<span class="info-span">${
                item.capital
              }</span></h3>
              <h3 class="population">Population:<span class="info-span">${
                item.population
              }</span></h3>
              <h3 class="languages">Languages:
              <span class="info-span"> ${languages(item.languages)} </span>
                     
              </h3>
              
          </div>
      </div>
        `;
}
