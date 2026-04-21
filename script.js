let fullPersonnelData = [];


function loadSection(section) {
    const SHEET_ID = "1TgyQ03rAL4OI2L5OiIcHSDwpC7uXnIikdk9VpDrKgA8";

    const fileMap = {
        missions: `https://opensheet.elk.sh/${SHEET_ID}/2`,
        personnel: `https://opensheet.elk.sh/${SHEET_ID}/1`,
        hvts: `https://opensheet.elk.sh/${SHEET_ID}/3`
    };

    // Show filters ONLY for personnel
    document.getElementById("filter-controls").style.display =
        section === "personnel" ? "flex" : "none";

    fetch(fileMap[section])
        .then(res => res.json())
        .then(data => {
            if (section === "personnel") {
                fullPersonnelData = data;
                populateRankDropdown(data);
            }
            renderSection(section, data);
        });
}


function statusClass(status) {
    if (!status) return "status-unknown";

    switch (status.toUpperCase()) {
        case "ACTIVE": return "status-active";
        case "MIA": return "status-mia";
        case "DECEASED": return "status-deceased";
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

function populateRankDropdown(data) {
    const rankSelect = document.getElementById("rank-filter");

    const ranks = [...new Set(data.map(p => p.rank).filter(r => r && r !== ""))];

    ranks.forEach(rank => {
        const option = document.createElement("option");
        option.value = rank;
        option.textContent = rank;
        rankSelect.appendChild(option);
    });
}

function applyFilters() {
    const rank = document.getElementById("rank-filter").value;
    const status = document.getElementById("status-filter").value;
    const company = document.getElementById("company-filter").value;

    let filtered = fullPersonnelData;

    if (rank !== "ALL") {
        filtered = filtered.filter(p => p.rank === rank);
    }

    if (status !== "ALL") {
        filtered = filtered.filter(p => p.status && p.status.toUpperCase() === status);
    }

    if (company !== "ALL") {
        filtered = filtered.filter(p => p.company === company);
    }

    renderSection("personnel", filtered);
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
