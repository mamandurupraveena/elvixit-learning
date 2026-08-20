const API_URL = "http://127.0.0.1:5000";

async function loadBookings() {

    const table = document.getElementById("bookingsTable");
    const count = document.getElementById("bookingCount");
    const message = document.getElementById("adminMessage");

    table.innerHTML = `
        <tr>
            <td colspan="6">Loading bookings...</td>
        </tr>
    `;

    try {

        const response = await fetch(
            API_URL + "/api/bookings"
        );

        const data = await response.json();

        console.log("Bookings:", data);

        count.textContent = data.count;

        table.innerHTML = "";

        if (data.bookings.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="6">
                        No bookings found.
                    </td>
                </tr>
            `;

            return;
        }

        data.bookings.forEach(function(booking) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>#${booking.id}</td>
                <td>${booking.name}</td>
                <td>${booking.email}</td>
                <td>${booking.destination}</td>
                <td>${booking.travelDate}</td>
                <td>${booking.people}</td>
            `;

            table.appendChild(row);
        });

        message.textContent =
            "Showing " + data.count + " booking(s).";

    } catch (error) {

        console.error("ERROR:", error);

        table.innerHTML = `
            <tr>
                <td colspan="6">
                    ❌ Could not connect to TravelGo server.
                </td>
            </tr>
        `;

        count.textContent = "0";
    }
}


loadBookings();