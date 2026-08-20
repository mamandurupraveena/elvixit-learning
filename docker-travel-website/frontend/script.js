// ==========================================
// TravelGo Frontend JavaScript
// ==========================================

// Flask backend
const API_URL = "http://127.0.0.1:5000";


// ==========================================
// Get HTML elements
// ==========================================

const searchButton = document.getElementById("searchBtn");
const destinationInput = document.getElementById("destinationInput");
const dateInput = document.getElementById("dateInput");
const searchResult = document.getElementById("searchResult");
const destinationGrid = document.getElementById("destinationGrid");


// ==========================================
// Load destinations
// ==========================================

async function loadDestinations() {

    try {

        console.log("Connecting to TravelGo backend...");

        const response = await fetch(
            `${API_URL}/api/destinations`
        );

        if (!response.ok) {
            throw new Error(
                `Server returned ${response.status}`
            );
        }

        const destinations = await response.json();

        console.log(
            "Destinations received:",
            destinations
        );


        // Clear loading message
        destinationGrid.innerHTML = "";


        // Create cards
        destinations.forEach(destination => {

            const card =
                document.createElement("article");

            card.className =
                "destination-card";


            card.innerHTML = `

                <div
                    class="destination-image"
                    style="
                        background-image:
                        url('${destination.image}');
                    "
                >

                    <span>
                        ${destination.country}
                    </span>

                </div>


                <div class="card-content">

                    <h3>
                        ${destination.name}
                    </h3>

                    <p>
                        ${destination.description}
                    </p>


                    <div class="card-bottom">

                        <span>
                            ★★★★★
                        </span>

                        <strong>
                            ₹${Number(
                                destination.price
                            ).toLocaleString("en-IN")}
                        </strong>

                    </div>


                    <button
                        class="details-btn"
                        onclick="
                            viewDestination(
                                ${destination.id}
                            )
                        "
                    >
                        View Details
                    </button>

                </div>

            `;


            destinationGrid.appendChild(card);

        });

    }


    catch (error) {

        console.error(
            "Backend connection error:",
            error
        );


        destinationGrid.innerHTML = `

            <div class="error-message">

                <h3>
                    Unable to connect to
                    the TravelGo server.
                </h3>

                <p>
                    Please make sure the Flask
                    backend is running.
                </p>

            </div>

        `;

    }

}


// ==========================================
// Search destinations
// ==========================================

if (searchButton) {

    searchButton.addEventListener(
        "click",
        async function () {

            const destination =
                destinationInput.value.trim();

            const date =
                dateInput.value;


            // Check destination
            if (!destination) {

                searchResult.textContent =
                    "Please enter a destination.";

                return;

            }


            // Check date
            if (!date) {

                searchResult.textContent =
                    "Please select a travel date.";

                return;

            }


            searchResult.textContent =
                "Searching...";


            try {

                const response =
                    await fetch(
                        `${API_URL}/api/search?destination=${encodeURIComponent(destination)}`
                    );


                if (!response.ok) {

                    throw new Error(
                        `Server returned ${response.status}`
                    );

                }


                const data =
                    await response.json();


                if (
                    !data.success ||
                    data.count === 0
                ) {

                    searchResult.textContent =
                        `No destinations found for "${destination}".`;

                    return;

                }


                const names =
                    data.results
                        .map(item => item.name)
                        .join(", ");


                searchResult.textContent =
                    `Found ${data.count} destination(s): ${names}`;


            }


            catch (error) {

                console.error(
                    "Search error:",
                    error
                );


                searchResult.textContent =
                    "Unable to connect to the TravelGo server.";

            }

        }
    );

}


// ==========================================
// View destination details
// ==========================================

function viewDestination(id) {

    window.location.href =
        `destination.html?id=${id}`;

}


// ==========================================
// Login button
// ==========================================

const loginButton =
    document.querySelector(".login-btn");


if (loginButton) {

    loginButton.addEventListener(
        "click",
        function () {

            alert(
                "Login feature will be added soon!"
            );

        }
    );

}


// ==========================================
// Start application
// ==========================================

loadDestinations();