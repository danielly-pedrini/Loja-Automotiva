document.addEventListener('DOMContentLoaded', function() {
    let prevButton = document.getElementById('prev');
    let nextButton = document.getElementById('next');
    let container = document.querySelector('.container');
    let items = container.querySelectorAll('.list .item');
    let indicator = document.querySelector('.indicators');
    let dots = indicator.querySelectorAll('ul li');
    let list = container.querySelector('.list');
    let active = 0;
    let firstPosition = 0;
    let lastPosition = items.length - 1;
    
    // Inicializar o slider
    items[0].classList.add('active');
    
    function setSlider() {
        let itemOld = container.querySelector('.list .item.active');
        itemOld.classList.remove('active');
        
        let dotsOld = indicator.querySelector('ul li.active');
        dotsOld.classList.remove('active');
        dots[active].classList.add('active');
        
        indicator.querySelector('.number').innerHTML = '0' + (active + 1);
    }
    
    nextButton.onclick = () => {
        list.style.setProperty('--calculation', 1);
        active = active + 1 > lastPosition ? 0 : active + 1;
        setSlider();
        items[active].classList.add('active');
    }
    
    prevButton.onclick = () => {
        list.style.setProperty('--calculation', -1);
        active = active - 1 < firstPosition ? lastPosition : active - 1;
        setSlider();
        items[active].classList.add('active');
    }
    
    // Menu mobile toggle
    const menuButton = document.querySelector('.menu-mobile');
    const nav = document.querySelector('header nav');
    
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um item
    const menuItems = document.querySelectorAll('header nav ul li');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
            }
        });
    });
    
    // Ajustar quando o tamanho da janela mudar
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
        }
    });
    
    // Adicionar suporte para swipe em dispositivos touchscreen
    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swipe para a esquerda (próximo)
            nextButton.click();
        }
        if (touchEndX > touchStartX) {
            // Swipe para a direita (anterior)
            prevButton.click();
        }
    }
    
    // Iniciar slideshow automático (opcional)
    // const slideInterval = setInterval(() => {
    //     nextButton.click();
    // }, 5000);
});