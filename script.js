function gerarTreino() {
    const genero = document.getElementById('genero').value;
    const objetivo = document.getElementById('objetivo').value;
    const nivel = document.getElementById('nivel').value;
    const resultArea = document.getElementById('resultArea');
    const textoRecomendacao = document.getElementById('textoRecomendacao');

    let sugestao = "";
    let nomeProtocolo = "";

    if (objetivo === 'emagrecimento') {
        if (nivel === 'iniciante') {
            nomeProtocolo = "Protocolo Start Burn 30";
            sugestao = "Focaremos em circuitos metabólicos para acelerar a queima calórica sem impacto excessivo.";
        } else {
            nomeProtocolo = "Protocolo HIIT Advanced";
            sugestao = "Alta intensidade intercalada com musculação pesada para 'secar' mantendo massa magra.";
        }
    } else if (objetivo === 'hipertrofia') {
        if (nivel === 'avancado') {
            nomeProtocolo = "Método Iron Load Elite";
            sugestao = "Periodização ondulatória com foco em cargas máximas e falha mecânica.";
        } else {
            nomeProtocolo = "Construção Sólida";
            sugestao = "Foco total na execução perfeita e progressão de carga linear.";
        }
    } else {
        nomeProtocolo = "Consultoria Wellness 360";
        sugestao = "Foco em mobilidade, fortalecimento do core e resistência cardiovascular.";
    }

    let textoGenero = genero === 'feminino' ? "projetada para o corpo feminino" : "de alta performance";
    textoRecomendacao.innerHTML = `<strong>${nomeProtocolo}:</strong><br> Uma estratégia ${textoGenero}.<br> ${sugestao}`;
    resultArea.style.display = "block";
}