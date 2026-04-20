function loadSection(section) {
    const fileMap = {
        missions: "data/missions.json",
        personnel: "data/personnel.json",
        hvts: "data/hvts.json"
    };

    fetch(fileMap[section])
        .then(res => res.json())
        .then(data => renderSection(section, data));
}

function renderSection(section, data) {
    const content = document.getElementById("content");
    content.innerHTML = `<h2>${formatTitle(section)}</h2>`;

    data.forEach(item => {
        content.innerHTML += `
            <div class="entry">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                ${item.image ? `<img src="${item.image}" class="entry-img">` : ""}
                <hr>
            </div>
        `;
    });
}

function formatTitle(section) {
    return {
        missions: "Past Missions",
        personnel: "Current Personnel",
        hvts: "High‑Value Target Profiles"
    }[section];
}
