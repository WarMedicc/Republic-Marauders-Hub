function loadSection(section) {
    const SHEET_ID = "1TgyQ03rAL4OI2L5OiIcHSDwpC7uXnIikdk9VpDrKgA8";

    const fileMap = {
        missions: `https://opensheet.elk.sh/1TgyQ03rAL4OI2L5OiIcHSDwpC7uXnIikdk9VpDrKgA8/2`,
        personnel: `https://opensheet.elk.sh/1TgyQ03rAL4OI2L5OiIcHSDwpC7uXnIikdk9VpDrKgA8/1`,
        hvts: `https://opensheet.elk.sh/1TgyQ03rAL4OI2L5OiIcHSDwpC7uXnIikdk9VpDrKgA8/3`
    };


    fetch(fileMap[section])
        .then(res => res.json())
        .then(data => renderSection(section, data));
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
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                ${item.image ? `<img src="${item.image}" class="entry-img">` : ""}
            </a>
            <hr>
        `;

        content.appendChild(entry);

        // Animate each entry with a delay
        setTimeout(() => {
            entry.style.opacity = "1";
            entry.style.transform = "translateY(0)";
        }, index * 120);
    });
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
