const PROFILE_URL = `https://opensheet.elk.sh/1TgyQ03rAL4OI2L5OiIcHSDwpC7uXnIikdk9VpDrKgA8/2`;

const params = new URLSearchParams(window.location.search);
const trooperId = params.get("id");

fetch(PROFILE_URL)
    .then(res => res.json())
    .then(data => {
        const trooper = data.find(p => p.id === trooperId);

        if (!trooper) {
            document.getElementById("profile-root").innerHTML =
                `<p>Profile not found.</p>`;
            return;
        }

        renderProfile(trooper);
    });

function renderProfile(p) {
    const opsList = p.operations
        .split(",")
        .map(op => `<li>${op.trim()}</li>`)
        .join("");

    document.getElementById("profile-root").innerHTML = `
        <div class="profile-container">

            <div class="profile-top">
                <img src="${p.image}" class="profile-image">

                <div class="profile-bio">
                    <div class="profile-header">
                        <h1 class="profile-name">${p.name}</h1>
                        <span class="status-badge status-${p.status.toLowerCase()}">${p.status}</span>
                    </div>


                    <p class="profile-description">${p.bio}</p>
                </div>
            </div>

            <div class="profile-section">
                <h2>Service Details</h2>
                <ul class="profile-list">
                    <li>Rank: ${p.rank}</li>
                    <li>Company: ${p.company}</li>
                    <li>Join Date: ${p.joindate}</li>
                </ul>
            </div>

            <div class="profile-section">
                <h2>List of Operations</h2>
                <ul class="profile-list">
                    ${opsList}
                </ul>
            </div>

        </div>
    `;
}
