function requestCab() {
    var name = document.getElementById("username").value;
    var source = document.getElementById("source").value;
    var destination = document.getElementById("destination").value;

    var driver = "Driver 1";
    var fare = 500; // ₹500 fare

    var result = `
        <p><strong>Passenger:</strong> ${name}</p>
        <p><strong>Route:</strong> From ${source} to ${destination}</p>
        <p><strong>Driver:</strong> ${driver}</p>
        <p><strong>Fare:</strong> ₹${fare}</p>
    `;

    document.getElementById("result").innerHTML = result;
}
