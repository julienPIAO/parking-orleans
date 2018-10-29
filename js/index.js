const ul = document.getElementById('idparking'),
      url = 'https://data.orleans-metropole.fr/api/records/1.0/search/?dataset=mobilite-places-disponibles-parkings-en-temps-reel&rows=24&sort=dispo';

const createNode = (element) => { return document.createElement(element); }
const append = (parent, el) => { return parent.appendChild(el); }

fetch(url)
  .then((response) => { return response.json(); })
  .then( data => {
    let parking = data.records; 
    return parking.map(
      parking => { 
      
        let li = createNode('li'),
          nom = createNode('h1'),
          place = createNode('span'),
          dispo = createNode('span'),
          gps = createNode ('span');
      
      nom.innerHTML =
        `<div class="tile"><b>${parking.fields.name}</b></div>`;
      
        place.innerHTML =
        `${parking.fields.dispo}${" places dispos"}`;
      
        
      dispo.innerHTML =
        `<progress class="progress is-success" value="${parking.fields.disponibilite}" max="100">50%</progress>taux de disponnibilité`;
      
        
        gps.innerHTML =
        `<a class="button" href="https://www.google.fr/maps/search/${parking.fields.coords}"><i class="fas fa-map"></i>&nbsp;carte</a> <a class="button is-rounded" href="https://www.google.fr/maps/dir/${parking.fields.coords}"><i class="fas fa-car-side"></i></a>`;
      
      append(li, nom);
      append(li, place);
      append(li, dispo);
      append(li, gps);
      append(ul, li);
        
    });
  })
  .catch( error => { console.log(error); })
