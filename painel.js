function gerarLinkCurto(urlReal) {
    const id = Math.random().toString(36).substring(2,8).toUpperCase();

    fetch('/api/links', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ id, url: urlReal })
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){
            console.log('Link gerado:', id);
            document.getElementById('resultado').innerText = `${window.location.origin}/lk/${id}`;
        }
    });
}
