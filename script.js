function loadSection(section) {
    const SHEET_ID = "1TgyQ03rAL4OI2L5OiIcHSDwpC7uXnIikdk9VpDrKgA8";

    const fileMap = {
        missions: `https://opensheet.elk.sh/1TgyQ03rAL4OI2L5OiIcHSDwpC7uXnIikdk9VpDrKgA8/2`,
        personnel: `https://opensheet.elk.sh/1TgyQ03rAL4OI2L5OiIcHSDwpC7uXnIikdk9VpDrKgA8/1`,
        hvts: `https://opensheet.elk.sh/1TgyQ03rAL4OI2L5OiIcHSDwpC7uXnIikdk9VpDrKgA8/3`
    };


    fetch(fileMap.personnel)
    .then(res => res.json())
    .then(data => {
        currentPersonnelData = data;
        document.getElementById("sort-controls").style.display = "block";
        renderSection("personnel", data);
    });

}

function statusClass(status) {
    if (!status) return "status-unknown";

    switch (status.toUpperCase()) {
        case "ACTIVE": return "status-active";
        case "MIA": return "status-mia";
        case "KIA": return "status-kia";
        case "INJURED": return "status-injured";
        case "ON LEAVE": return "status-leave";
        default: return "status-unknown";
    }
}


function renderSection(section, data) {
    const content = document.getElementById("content");
    content.innerHTML = `<h2>${formatTitle(section)}</h2>`;

    data.forEach((item, index) => {
        const entry = document.createElement("div");
        entry.classList.add("entry");
        entry.style.opacity = "0"; // start invisible

        entry.innerHTML = `
            <a href="${item.link}" class="entry-link">
                <div class="entry-content">
                    <span class="status-badge ${statusClass(item.status)}">${item.status}</span>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
                ${item.image ? `<img src="${item.image}" class="entry-img">` : ""}
            </a>
        `;



        content.appendChild(entry);

        // Animate each entry with a delay
        setTimeout(() => {
            entry.style.opacity = "1";
            entry.style.transform = "translateY(0)";
        }, index * 120);
    });
}

let currentPersonnelData = [];

function sortPersonnel(type) {
    if (type === "name") {
        currentPersonnelData.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (type === "status") {
        const order = ["ACTIVE", "INJURED", "ON LEAVE", "MIA", "KIA", "UNKNOWN"];
        currentPersonnelData.sort((a, b) =>
            order.indexOf(a.status.toUpperCase()) - order.indexOf(b.status.toUpperCase())
        );
    }

    renderSection("personnel", currentPersonnelData);
}




function formatTitle(section) {
    return {
        missions: "Past Missions",
        personnel: "Current Personnel",
        hvts: "High‑Value Target Profiles"
    }[section];
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}
