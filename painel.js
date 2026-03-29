function gerarLinkCurto(urlReal) {
    const id = Math.random().toString(36).substring(2,8).toUpperCase();

    fetch('https://apkbugadovip.vercel.app/api/links', { // coloque a URL do site principal
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ id, url: urlReal })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){
            document.getElementById('resultado').innerText = `${window.location.origin}/lk/${id}`;
        } else {
            document.getElementById('resultado').innerText = 'Erro ao gerar link';
        }
    })
    .catch(e => document.getElementById('resultado').innerText = 'Erro de conexão');
}
