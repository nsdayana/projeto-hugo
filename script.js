document.addEventListener('DOMContentLoaded', () => {
    // Carrossel de Fotos
    const images = document.querySelectorAll('.carousel-img');
    let currentImageIndex = 0;

    function showNextImage() {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    }

    // Altera a imagem a cada 4 segundos (4000 milissegundos)
    setInterval(showNextImage, 4000);

    // Exibe a primeira imagem ao carregar a página
    if (images.length > 0) {
        images[currentImageIndex].classList.add('active');
    }

    // Função auxiliar para converter números em palavras (até 99)
    function numberToWords(num) {
        const units = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
        const teens = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
        const tens = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];

        if (num === 0) return 'zero';
        if (num < 10) return units[num];
        if (num >= 10 && num < 20) return teens[num - 10];
        if (num >= 20 && num < 100) {
            const unit = num % 10;
            const ten = Math.floor(num / 10);
            return tens[ten] + (unit > 0 ? ' e ' + units[unit] : '');
        }
        return num.toString(); // Para números maiores que 99, retorna o número normal
    }

    // Cronômetro do Amor
    // Data inicial do relacionamento: 16 de Janeiro de 2021
    const startDate = new Date('2021-01-16T00:00:00'); 
    const loveTimerElement = document.getElementById('love-timer');

    function updateLoveTimer() {
        const now = new Date();
        
        // Cálculos para anos, meses e dias
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();

        // Ajusta meses e anos se o dia atual for menor que o dia de início
        if (days < 0) {
            months--;
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0); 
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Converte os números para palavras
        const yearsInWords = numberToWords(years);
        const monthsInWords = numberToWords(months);
        const daysInWords = numberToWords(days);

        // Frase formatada com "e contando..." e números por extenso
        loveTimerElement.textContent = `eu te amo há ${yearsInWords} ano${years !== 1 ? 's' : ''}, ${monthsInWords} mese${months !== 1 ? 's' : ''} e ${daysInWords} dia${days !== 1 ? 's' : ''}... e contando...`;
    }

    // Atualiza o cronômetro a cada segundo
    setInterval(updateLoveTimer, 1000);

    // Chama a função pela primeira vez para exibir o tempo inicial imediatamente
    updateLoveTimer();


    // ===== INÍCIO DO CÓDIGO PARA AUTOPLAY DO ÁUDIO APÓS INTERAÇÃO =====
    const backgroundMusic = document.getElementById('background-music');
    let hasInteracted = false; // Flag para garantir que toque apenas uma vez

    // Função para tentar tocar a música
    function playAudio() {
        if (!hasInteracted) { // Só tenta tocar se ainda não houve interação que disparou
            backgroundMusic.play().then(() => {
                // Áudio começou a tocar com sucesso
                hasInteracted = true;
                document.removeEventListener('click', playAudio); // Remove o listener após o sucesso
                document.removeEventListener('scroll', playAudio);
                // Você pode remover outros listeners se adicionar mais
            }).catch(error => {
                // Erro ao tentar tocar (pode ser o bloqueio do navegador)
                // console.log('Erro ao tocar áudio:', error);
            });
        }
    }

    // Adiciona listeners para os eventos mais comuns de interação
    document.addEventListener('click', playAudio);
    document.addEventListener('scroll', playAudio);
    // Você pode adicionar outros eventos como 'touchstart', 'keypress' se quiser
    // ================== FIM DO CÓDIGO AUTOPLAY ======================
});