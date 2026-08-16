const API_URL = "http://127.0.0.1:5000";

const detailsContainer =
    document.getElementById("destinationDetails");


// Get destination ID from URL

const params = new URLSearchParams(
    window.location.search
);

const destinationId =
    params.get("id");


// Load destination

async function loadDestination() {

    try {

        const response =
            await fetch(
                `${API_URL}/api/destinations`
            );

        if (!response.ok) {
            throw new Error("Server error");
        }

        const destinations =
            await response.json();


        const destination =
            destinations.find(
                item =>
                    String(item.id) ===
                    String(destinationId)
            );


        if (!destination) {

            detailsContainer.innerHTML = `
                <h2>Destination not found</h2>
                <a href="index.html">
                    Back to Home
                </a>
            `;

            return;
        }


        detailsContainer.innerHTML = `

            <div class="details-card">

                <img
                    src="${destination.image}"
                    alt="${destination.name}"
                    class="details-image"
                >


                <div class="details-content">

                    <span class="details-country">
                        ${destination.country}
                    </span>

                    <h1>
                        ${destination.name}
                    </h1>

                    <h3>
                        ${destination.description}
                    </h3>

                    <p>
                        ⭐⭐⭐⭐⭐
                    </p>

                    <p>
                        Discover the beautiful destination
                        of ${destination.name}.
                        Plan your next unforgettable
                        journey with TravelGo.
                    </p>


                    <div class="details-price">

                        <span>
                            Starting from
                        </span>

                        <strong>
                            ₹${Number(
                                destination.price
                            ).toLocaleString("en-IN")}
                        </strong>

                    </div>


                    <button
                        class="book-btn"
                        onclick="bookTrip()"
                    >
                        Book Now
                    </button>


                    <a
                        href="index.html#destinations"
                        class="back-btn"
                    >
                        ← Back to Destinations
                    </a>

                </div>

            </div>

        `;

    }

    catch (error) {

        console.error(error);

        detailsContainer.innerHTML = `

            <h2>
                Unable to connect to
                TravelGo server.
            </h2>

            <p>
                Please make sure Flask is running.
            </p>

            <a href="index.html">
                ← Back to Home
            </a>

        `;

    }

}


// Book button

function bookTrip() {

    window.location.href =
        `booking.html?id=${destinationId}`;

}


// Start

loadDestination();