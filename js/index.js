var ul = document.getElementById('idparking'),
url = 'https://data.orleans-metropole.fr/api/records/1.0/search/?dataset=mobilite-places-disponibles-parkings-en-temps-reel&rows=24&sort=dispo';

var createNode = function createNode(element) {return document.createElement(element);};
var append = function append(parent, el) {return parent.appendChild(el);};

fetch(url).
then(function (response) {return response.json();}).
then(function (data) {
  var parking = data.records;
  return parking.map(
  function (parking) {

    var li = createNode('li'),
    nom = createNode('h1'),
    place = createNode('span'),
    dispo = createNode('span'),
    gps = createNode('span');

    nom.innerHTML = '<div class="tile"><b>' +
    parking.fields.name + '</b></div>';

    place.innerHTML =
    parking.fields.dispo + " places dispos";


    dispo.innerHTML = '<progress class="progress is-success" value="' +
    parking.fields.disponibilite + '" max="100">50%</progress>taux de disponnibilit\xE9';


    gps.innerHTML = '<a class="button is-rounded" href="https://www.google.com/maps/dir/?api=1&destination=' +
    parking.fields.coords + '&travelmode=driving">acc\xE8s &nbsp...<i class="fas fa-car-side"></i></a>';

    append(li, nom);
    append(li, place);
    append(li, dispo);
    append(li, gps);
    append(ul, li);

  });
}).
catch(function (error) {console.log(error);});