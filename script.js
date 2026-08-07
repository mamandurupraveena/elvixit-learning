// Appointment Form
const form = document.getElementById("appointmentForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    alert("✅ Appointment booked successfully!");

    form.reset();
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Doctor Buttons
const doctorButtons = document.querySelectorAll(".doctor-card button");

doctorButtons.forEach(button => {
    button.addEventListener("click", () => {
        document.getElementById("appointment").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Scroll to Top Button
const topBtn = document.createElement("button");
topBtn.innerHTML = "↑";
topBtn.id = "topBtn";
document.body.appendChild(topBtn);

topBtn.style.cssText = `
position:fixed;
bottom:20px;
right:20px;
padding:10px 15px;
font-size:20px;
border:none;
border-radius:50%;
background:#0077b6;
color:white;
cursor:pointer;
display:none;
`;

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});