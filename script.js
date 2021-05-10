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

  map.on("load", function () {
    map.addSource("places", {
      // This GeoJSON contains features that include an "icon" property. The value of the "icon" property corresponds to an image in the Mapbox Streets style's sprite.
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
              icon: "theatre-15",
            },
            geometry: {
              type: "Point",
              coordinates: [-77.038659, 38.931567],
            },
          },
        ],
      },
    });

    // Add a layer showing the places.
    map.addLayer({
      id: "places",
      type: "symbol",
      source: "places",
      layout: {
        "icon-image": "{icon}",
        "icon-allow-overlap": true,
      },
    });

    // When a click event occurs on a feature in the places layer, open a popup at the location of the feature, with description HTML from its properties.
    map.on("click", "places", function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on("mouseenter", "places", function () {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "places", function () {
      map.getCanvas().style.cursor = "";
    });
  });
}