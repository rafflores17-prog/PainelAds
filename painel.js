const gerarBtn = document.getElementById("gerar");
const urlInput = document.getElementById("url");
const resultado = document.getElementById("resultado");
const listaDiv = document.getElementById("lista");

// Carrega histórico do localStorage
function render(){
    let lista = JSON.parse(localStorage.getItem("links") || "[]");
    listaDiv.innerHTML = "";

    lista.forEach(item => {
        let div = document.createElement("div");
        div.className = "link-box";
        div.innerHTML = `${item.link}<br><small>${item.data}</small>`;
        listaDiv.appendChild(div);
    });
}

function salvar(link){
    let lista = JSON.parse(localStorage.getItem("links") || "[]");
    lista.unshift({
        link,
        data: new Date().toLocaleString()
    });
    localStorage.setItem("links", JSON.stringify(lista));
    render();
}

// Gera link base64
gerarBtn.onclick = () => {
    let url = urlInput.value.trim();
    if(!url) return alert("Cole um link!");

    let encoded = btoa(url);
    let final = `${window.location.origin}/?d=${encoded}`;
    resultado.innerHTML = `<div class="link-box">${final}</div>`;

    salvar(final);
}

render();