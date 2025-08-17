let map, directionsService, directionsRenderer, autocompletePickup, autocompleteDrop;

function initMap() {
  // Initialize map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 28.6139, lng: 77.2090 }, // Default: Delhi
    zoom: 12,
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  // Setup autocomplete
  autocompletePickup = new google.maps.places.Autocomplete(document.getElementById("pickup"));
  autocompleteDrop = new google.maps.places.Autocomplete(document.getElementById("drop"));
}

window.onload = initMap;

document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let pickup = document.getElementById("pickup").value;
  let drop = document.getElementById("drop").value;
  let cabType = document.getElementById("cabType").value;

  if (!pickup || !drop) {
    alert("Please enter both pickup and drop locations.");
    return;
  }

  calculateRoute(pickup, drop, cabType);
});

function calculateRoute(pickup, drop, cabType) {
  let request = {
    origin: pickup,
    destination: drop,
    travelMode: google.maps.TravelMode.DRIVING,
  };

  directionsService.route(request, function(result, status) {
    if (status === "OK") {
      directionsRenderer.setDirections(result);

      // Get distance
      let distanceText = result.routes[0].legs[0].distance.text;
      let distanceValue = result.routes[0].legs[0].distance.value / 1000; // in KM

      // Fare calculation
      let fare = calculateFare(distanceValue, cabType);

      document.getElementById("fare").innerHTML =
        `Distance: ${distanceText} <br> Estimated Fare (${cabType}): ₹${fare}`;
    } else {
      alert("Could not calculate route: " + status);
    }
  });
}

function calculateFare(distance, cabType) {
  let baseFare = 50; // starting fare
  let perKmRate;

  switch (cabType) {
    case "mini":
      perKmRate = 10;
      break;
    case "sedan":
      perKmRate = 15;
      break;
    case "suv":
      perKmRate = 20;
      break;
    default:
      perKmRate = 10;
  }

  return Math.round(baseFare + (distance * perKmRate));
}
