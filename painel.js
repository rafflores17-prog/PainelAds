const linkInput = document.getElementById("apk-link");
const generateBtn = document.getElementById("generate-btn");
const historyList = document.getElementById("history-list");

// Recupera histórico do localStorage
let linksMap = JSON.parse(localStorage.getItem("linksMap")) || {};
updateHistory();

generateBtn.onclick = () => {
    const originalLink = linkInput.value.trim();
    if (!originalLink) return alert("Cole um link válido!");

    // Gerar ID curto aleatório
    const shortID = generateID(6);
    
    // Salvar ID -> base64 do link real
    linksMap[shortID] = btoa(originalLink);
    localStorage.setItem("linksMap", JSON.stringify(linksMap));

    // Adicionar ao histórico
    updateHistory();

    // Mostrar link curto pronto para enviar
    const shortLink = `${window.location.origin}/lk/${shortID}`;
    alert(`Link curto gerado:\n${shortLink}`);
    linkInput.value = "";
};

// Atualiza histórico na tela
function updateHistory() {
    historyList.innerHTML = "";
    for (let id in linksMap) {
        const li = document.createElement("li");
        const shortLink = `${window.location.origin}/lk/${id}`;
        li.textContent = `${shortLink} → ${atob(linksMap[id])}`;
        historyList.appendChild(li);
    }
}

// Gera ID aleatório de tamanho n (letras maiúsculas e números)
function generateID(n) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < n; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Garantir que não repita IDs
    if (linksMap[result]) return generateID(n);
    return result;
}
