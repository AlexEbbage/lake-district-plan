mapboxgl.accessToken = 'pk.eyJ1IjoiZWJiYWdlIiwiYSI6ImNrb2llYmd2bTFlcHIybnRyOW9odGFld28ifQ.zmALWbpNj2NMcbPaYJHG1g';

setupMap();

function setupMap(){
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-3.0946354, 54.433919],
    zoom: 9.8,
  });

  const navigation = new mapboxgl.NavigationControl();
  map.addControl(navigation);
}