// Script principal para o site romântico
document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const startBtn = document.getElementById('start-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const restartBtn = document.getElementById('restart-btn');
    const currentDateElement = document.getElementById('current-date');
    
    // Cartões de mensagens
    const introCard = document.querySelector('.intro-card');
    const message1 = document.getElementById('message-1');
    const message2 = document.getElementById('message-2');
    const message3 = document.getElementById('message-3');
    const question1 = document.getElementById('question-1');
    const yesResponse = document.getElementById('yes-response');
    const finalMessage = document.getElementById('final-message');
    
    // Todos os botões "próximo"
    const nextButtons = document.querySelectorAll('.next-btn');
    
    // Sequência de cartões para navegação
    const cardSequence = [
        introCard,
        message1,
        message2,
        message3,
        question1,
        // yesResponse e finalMessage são mostrados condicionalmente
    ];
    
    // Exibir data atual no rodapé
    const today = new Date();
    currentDateElement.textContent = today.toLocaleDateString('pt-BR');
    
    // Função para mostrar um cartão com animação
    function showCard(card) {
        // Esconder todos os cartões primeiro
        document.querySelectorAll('.card').forEach(c => {
            c.classList.add('hidden');
            c.classList.remove('fade-in');
        });
        
        // Mostrar o cartão desejado com animação
        card.classList.remove('hidden');
        setTimeout(() => {
            card.classList.add('fade-in');
        }, 10);
        
        // Rolar para o topo do cartão
        window.scrollTo({
            top: card.offsetTop - 20,
            behavior: 'smooth'
        });
    }
    
    // Função para avançar para o próximo cartão na sequência
    function showNextCard(currentCard) {
        const currentIndex = cardSequence.indexOf(currentCard);
        if (currentIndex < cardSequence.length - 1) {
            showCard(cardSequence[currentIndex + 1]);
        }
    }
    
    // Iniciar a jornada
    startBtn.addEventListener('click', function() {
        showCard(message1);
    });
    
    // Configurar todos os botões "próximo"
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentCard = button.closest('.card');
            showNextCard(currentCard);
        });
    });
    
    // Resposta "Sim"
    yesBtn.addEventListener('click', function() {
        showCard(yesResponse);
        
        // Configurar o botão "próximo" do yesResponse para ir para a mensagem final
        const yesNextBtn = yesResponse.querySelector('.next-btn');
        yesNextBtn.addEventListener('click', function() {
            showCard(finalMessage);
        }, { once: true }); // Garantir que o evento seja adicionado apenas uma vez
    });
    
    // Comportamento do botão "Não" que foge
    noBtn.addEventListener('mouseover', function(e) {
        // Obter dimensões da tela
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Calcular nova posição aleatória dentro da tela visível
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;
        
        // Garantir que o botão não saia da tela
        const maxX = windowWidth - btnWidth - 20;
        const maxY = windowHeight - btnHeight - 20;
        
        // Gerar posição aleatória
        const randomX = Math.max(20, Math.floor(Math.random() * maxX));
        const randomY = Math.max(20, Math.floor(Math.random() * maxY));
        
        // Aplicar nova posição
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        
        // Adicionar mensagem divertida em um balão
        showTooltip(noBtn, 'Não adianta tentar! 😉');
    });
    
    // Função para mostrar tooltip/balão de mensagem
    function showTooltip(element, message) {
        // Remover tooltip existente se houver
        const existingTooltip = document.querySelector('.tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        // Criar novo tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = message;
        tooltip.style.position = 'fixed';
        tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '8px 12px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.fontSize = '14px';
        tooltip.style.zIndex = '1000';
        tooltip.style.pointerEvents = 'none';
        
        // Posicionar acima do elemento
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - 40) + 'px';
        
        // Adicionar ao corpo do documento
        document.body.appendChild(tooltip);
        
        // Remover após alguns segundos
        setTimeout(() => {
            tooltip.remove();
        }, 2000);
    }
    
    // Botão para recomeçar
    restartBtn.addEventListener('click', function() {
        // Resetar posição do botão "Não"
        noBtn.style.position = 'static';
        
        // Voltar para o início
        showCard(introCard);
    });
    
    // Adicionar efeitos de patas de animais seguindo o cursor
    document.addEventListener('mousemove', function(e) {
        // Limitar a frequência de criação de patas (a cada 200px de movimento)
        if (Math.random() > 0.98) { // Apenas ocasionalmente criar patas
            createPawPrint(e.clientX, e.clientY);
        }
    });
    
    // Função para criar pegada de animal
    function createPawPrint(x, y) {
        const paw = document.createElement('div');
        paw.className = 'paw-print';
        paw.style.position = 'fixed';
        paw.style.left = (x - 10) + 'px';
        paw.style.top = (y - 10) + 'px';
        paw.style.width = '20px';
        paw.style.height = '20px';
        paw.style.backgroundImage = 'url(\'data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5,10 C3,8 3,5 5,3 C7,1 10,1 12,3 M15,3 C17,1 20,1 22,3 C24,5 24,8 22,10 M10,15 C8,17 5,17 3,15 C1,13 1,10 3,8 M17,8 C19,10 19,13 17,15 C15,17 12,17 10,15 M13,10 C15,8 18,8 20,10 C22,12 22,15 20,17" fill="none" stroke="%232e8b57" stroke-width="1"/></svg>\')';
        paw.style.backgroundSize = 'contain';
        paw.style.backgroundRepeat = 'no-repeat';
        paw.style.opacity = '0.5';
        paw.style.pointerEvents = 'none';
        paw.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        paw.style.zIndex = '-1';
        
        document.body.appendChild(paw);
        
        // Desvanecer e remover após alguns segundos
        setTimeout(() => {
            paw.style.transition = 'opacity 1s';
            paw.style.opacity = '0';
            setTimeout(() => {
                paw.remove();
            }, 1000);
        }, 2000);
    }
    
    // Adicionar contador de dias desde a data especial
    const specialDate = new Date('2020-05-03');
    const timeDiff = today - specialDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // Adicionar essa informação em algum lugar do site
    const subtitle = document.querySelector('.subtitle');
    subtitle.innerHTML = `Desde 03/05/2020 <span style="display:block;font-size:0.8em;margin-top:5px;">${daysDiff} dias de amor</span>`;
});
