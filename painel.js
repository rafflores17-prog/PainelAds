const fill = document.getElementById("fill");
const statusText = document.getElementById("status-text");
const continueBtn = document.getElementById("continue-btn");

// Pegar ID curto da URL
const path = window.location.pathname.split("/");
const shortID = path[path.length - 1];

// Buscar JSON do painel
fetch("https://painel-links-iota.vercel.app/links.json")
    .then(res => res.json())
    .then(linksMap => {
        const targetURL = linksMap[shortID];
        if(!targetURL){
            document.body.innerHTML = "<h2 style='text-align:center;margin-top:100px;'>Link inválido ou expirado.</h2>";
            return;
        }

        // Contador animado
        let progress = 0;
        const timer = setInterval(() => {
            progress += 10;
            fill.style.width = progress + "%";
            statusText.innerText = `Verificando sistema... ${progress}%`;
            if(progress >= 100){
                clearInterval(timer);
                continueBtn.disabled = false;
                continueBtn.innerText = "CONTINUAR PARA DOWNLOAD";
            }
        }, 500);

        continueBtn.onclick = () => {
            window.location.href = targetURL;
        };
    })
    .catch(err => {
        document.body.innerHTML = "<h2 style='text-align:center;margin-top:100px;'>Erro ao buscar link.</h2>";
        console.error(err);
    });
