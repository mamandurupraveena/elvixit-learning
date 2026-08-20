function generateResume() {

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();

if (!name || !email) {
    alert("Please enter your name and email.");
    return;
}
    const phone = document.getElementById("phone").value;
    const summary = document.getElementById("summary").value;
    const education = document.getElementById("education").value;
    const skills = document.getElementById("skills").value;
    const projects = document.getElementById("projects").value;
    const experience = document.getElementById("experience").value;

    document.getElementById("previewName").textContent =
        name || "Your Name";

    document.getElementById("previewContact").textContent =
        `${email || "Email"} | ${phone || "Phone"}`;

    document.getElementById("previewSummary").textContent =
        summary || "Your professional summary will appear here.";

    document.getElementById("previewEducation").textContent =
        education || "Your education details will appear here.";

    document.getElementById("previewSkills").textContent =
        skills || "Your skills will appear here.";

    document.getElementById("previewProjects").textContent =
        projects || "Your projects will appear here.";

    document.getElementById("previewExperience").textContent =
        experience || "Your experience will appear here.";
}

function generateSummary() {

    const name = document.getElementById("name").value;
    const education = document.getElementById("education").value;
    const skills = document.getElementById("skills").value;
    const experience = document.getElementById("experience").value;

    if (!skills && !education && !experience) {
        alert("Please enter your education, skills, or experience first.");
        return;
    }

    let summary = "";

    if (name) {
        summary += `${name} is a motivated professional `;
    } else {
        summary += "A motivated professional ";
    }

    if (education) {
        summary += `with a background in ${education}. `;
    } else {
        summary += "with a strong interest in developing professional skills. ";
    }

    if (skills) {
        summary += `Skilled in ${skills}. `;
    }

    if (experience) {
        summary += `Has experience in ${experience}. `;
    }

    summary +=
        "Passionate about learning new technologies, solving problems, and contributing to a professional team.";

    document.getElementById("summary").value = summary;

    generateResume();
}
function saveResume() {

    const resumeData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        summary: document.getElementById("summary").value,
        education: document.getElementById("education").value,
        skills: document.getElementById("skills").value,
        projects: document.getElementById("projects").value,
        experience: document.getElementById("experience").value
    };

    localStorage.setItem("resumeData", JSON.stringify(resumeData));

    alert("Resume saved successfully!");
}


function loadResume() {

    const savedData = localStorage.getItem("resumeData");

    if (!savedData) {
        alert("No saved resume found.");
        return;
    }

    const resumeData = JSON.parse(savedData);

    document.getElementById("name").value = resumeData.name || "";
    document.getElementById("email").value = resumeData.email || "";
    document.getElementById("phone").value = resumeData.phone || "";
    document.getElementById("summary").value = resumeData.summary || "";
    document.getElementById("education").value = resumeData.education || "";
    document.getElementById("skills").value = resumeData.skills || "";
    document.getElementById("projects").value = resumeData.projects || "";
    document.getElementById("experience").value = resumeData.experience || "";

    generateResume();

    alert("Resume loaded successfully!");
}
function clearResume() {

    const confirmClear = confirm(
        "Are you sure you want to clear your resume?"
    );

    if (!confirmClear) {
        return;
    }

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("summary").value = "";
    document.getElementById("education").value = "";
    document.getElementById("skills").value = "";
    document.getElementById("projects").value = "";
    document.getElementById("experience").value = "";

    localStorage.removeItem("resumeData");

    generateResume();

    alert("Resume cleared successfully!");
}