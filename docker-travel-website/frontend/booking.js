const API_URL = "http://127.0.0.1:5000";

const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");
const bookingDestination =
    document.getElementById("bookingDestination");


// Get destination ID from URL
const params = new URLSearchParams(
    window.location.search
);

const destinationId = params.get("id");


// Load destination
async function loadDestination() {

    try {

        const response = await fetch(
            `${API_URL}/api/destinations`
        );

        if (!response.ok) {
            throw new Error("Unable to load destinations");
        }

        const destinations = await response.json();

        const destination = destinations.find(
            item => String(item.id) === String(destinationId)
        );

        if (destination) {

            bookingDestination.value =
                destination.name;

        } else {

            bookingDestination.value =
                "Unknown destination";

        }

    } catch (error) {

        console.error(error);

        bookingDestination.value =
            "Unable to load destination";
    }
}


// Submit booking
bookingForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const destination =
            bookingDestination.value;

        const travelDate =
            document.getElementById("travelDate").value;

        const people =
            document.getElementById("people").value;


        bookingMessage.textContent =
            "Saving your booking...";


        try {

            const response = await fetch(
                `${API_URL}/api/bookings`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        name: name,
                        email: email,
                        destination: destination,
                        travelDate: travelDate,
                        people: people

                    })
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Booking failed"
                );

            }


            // Show success
            bookingMessage.innerHTML = `

                <strong>
                    ✅ Booking confirmed!
                </strong>

                <br><br>

                Booking ID:
                <strong>
                    #${data.booking.id}
                </strong>

                <br>

                Name:
                ${data.booking.name}

                <br>

                Destination:
                ${data.booking.destination}

                <br>

                Travel Date:
                ${data.booking.travelDate}

                <br>

                People:
                ${data.booking.people}

            `;


            bookingForm.reset();

            bookingDestination.value =
                destination;


        } catch (error) {

            console.error(error);

            bookingMessage.innerHTML = `

                ❌ Booking failed.

                <br>

                ${error.message}

            `;

        }

    }
);


// Start
loadDestination();