/* =============================================================
   1. CALCULADORA BIO-ANÁLISE (Mantida)
   ============================================================= */
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

/* =============================================================
   2. SISTEMA DE ACESSO INTELIGENTE (Atualizado sem Alert)
   ============================================================= */

let programaSelecionado = 'Geral';

// Função para ABRIR o Modal OU o Welcome Back
function abrirModal(nomeDoTreino) {
    if (nomeDoTreino) {
        programaSelecionado = nomeDoTreino;
    }

    // 1. VERIFICAÇÃO DE MEMÓRIA: O aluno já veio aqui antes?
    const alunoSalvo = localStorage.getItem('alunoCarlinhos');

    if (alunoSalvo) {
        // SIM! O aluno já existe. 
        const dadosAluno = JSON.parse(alunoSalvo);

        // Em vez de alert, preenchemos o Modal Bonito:
        const nomeDisplay = dadosAluno.nome.split(' ')[0]; // Pega só o primeiro nome
        document.getElementById('nomeAlunoWelcome').innerText = nomeDisplay.toUpperCase();

        // Abre o Modal VIP
        document.getElementById('modalWelcome').style.display = 'flex';
        return;
    }

    // NÃO! É a primeira vez. Abre o modal de cadastro (Cadeado).
    const modal = document.getElementById('modalLock');
    modal.style.display = 'flex';
}

// Função para fechar os modais
function fecharModal() {
    document.getElementById('modalLock').style.display = 'none';
    document.getElementById('modalWelcome').style.display = 'none';
}

// Função Inteligente que escolhe a página certa
function irParaTreino() {
    console.log("Redirecionando para: " + programaSelecionado);

    // Verifica o nome do programa e manda para o HTML certo
    if (programaSelecionado.includes('Seca') || programaSelecionado.includes('Barriga')) {
        window.location.href = "treino_secabarriga.html";
    }
    else if (programaSelecionado.includes('Gluteos') || programaSelecionado.includes('Glúteos')) {
        window.location.href = "treino_gluteos.html";
    }
    else {
        // Se for Hipertrofia (ou qualquer outro não identificado), vai para o Hipertrofia
        window.location.href = "treino_hipertrofia.html";
    }
}

// Função de Envio (SheetMonkey) continua a mesma...
function liberarAcesso(event) {
    event.preventDefault();

    const nome = document.getElementById('nomeLead').value;
    const zap = document.getElementById('zapLead').value;
    const dataAtual = new Date().toLocaleString('pt-BR');

    if (nome && zap) {
        const btn = event.target.querySelector('button');
        const textoOriginal = btn.innerHTML;
        btn.innerHTML = '⏳ SALVANDO...';
        btn.disabled = true;

        const dados = {
            "Nome": nome,
            "Whatsapp": zap,
            "Data": dataAtual,
            "Programa": programaSelecionado
        };

        // SEU LINK DO SHEETMONKEY
        const endpoint = 'https://api.sheetmonkey.io/form/wJNK7FoXsqoDufxi2yzLkE';

        fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados),
        })
            .then(response => {
            // GRAVA NA MEMÓRIA
            localStorage.setItem('alunoCarlinhos', JSON.stringify({ nome: nome, zap: zap }));
            
            // AQUI MUDOU: Chama a função inteligente em vez de ir direto
            irParaTreino(); 
        })
        // ... DENTRO DO .catch()
        .catch((error) => {
            console.error('Erro:', error);
            localStorage.setItem('alunoCarlinhos', JSON.stringify({ nome: nome, zap: zap }));
            
            // AQUI TAMBÉM MUDOU:
            irParaTreino();
        })

    } else {
        alert("Por favor, preencha os dados.");
    }
}

// Fecha qualquer modal se clicar fora
window.onclick = function (event) {
    const modal1 = document.getElementById('modalLock');
    const modal2 = document.getElementById('modalWelcome');

    if (event.target == modal1 || event.target == modal2) {
        modal1.style.display = 'none';
        modal2.style.display = 'none';
    }
}