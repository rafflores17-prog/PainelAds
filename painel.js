const realLinkInput = document.getElementById("realLink");
const generateBtn = document.getElementById("generateBtn");
const shortLinkContainer = document.getElementById("shortLinkContainer");
const historyEl = document.getElementById("history");

// Puxar histórico do localStorage
let linksMap = JSON.parse(localStorage.getItem("linksMap") || "{}");
updateHistory();

generateBtn.onclick = () => {
    const realLink = realLinkInput.value.trim();
    if(!realLink) return alert("Cole um link válido!");

    // Gerar ID curto aleatório
    const shortID = Math.random().toString(36).substring(2,8).toUpperCase();

    linksMap[shortID] = realLink;
    localStorage.setItem("linksMap", JSON.stringify(linksMap));

    // Atualizar JSON público (manual upload ou script para Vercel)
    shortLinkContainer.innerHTML = `
        Link curto pronto: 
        <a href="https://apkbugadovip.vercel.app/lk/${shortID}" target="_blank">
            https://apkbugadovip.vercel.app/lk/${shortID}
        </a>
    `;

    updateHistory();
    realLinkInput.value = "";
};

function updateHistory() {
    historyEl.innerHTML = "";
    for(const id in linksMap){
        const li = document.createElement("li");
        li.innerHTML = `${id} → ${linksMap[id]}`;
        historyEl.appendChild(li);
    }
}
