export default function get_Countries(item) {
  return `<div class="card">
          <div class="header">
                <img src=${item.flags.svg} alt=${item.flags.alt} width="76"  height='40'/>
                 <h2 class="countri-array">${item.name.official}  </h2>
          </div>
          
      </div>
        `;
}
