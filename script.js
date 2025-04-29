document.getElementById("cabForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const destination = document.getElementById("destination").value;

    // Simulate the process of requesting a cab
    const driver = assignRandomDriver();
    const fare = calculateFare(destination);

    // Display the details
    document.getElementById("driverName").innerText = driver;
    document.getElementById("fare").innerText = fare;

    // Show the ride details
    document.getElementById("rideDetails").style.display = "block";
});

function assignRandomDriver() {
    const drivers = ["Driver 1", "Driver 2", "Driver 3"];
    const randomIndex = Math.floor(Math.random() * drivers.length);
    return drivers[randomIndex];
}

function calculateFare(destination) {
    const fares = {
        "A": 10,
        "B": 20,
        "C": 30,
        "D": 40
    };

    return fares[destination] || 50;
}
