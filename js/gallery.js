function seebigimage() {
    // получаем адрес большой картинки
    let imageurl = document.querySelector('.main-image img').src.split('_medium.jpg').join('_big.jpg');
    
    // вставляем в попап верстку и адрес для картинки, а также кнопку-крестик для уборки попапа
    document.querySelector('.popup-desk').innerHTML = '<div class="popup lightbox"><img src="' + imageurl + '"><div class="cross">+</div></div>';
    
    // получаем доступные размеры экрана и соотношение сторон картинки
    // -120 пикселей - потому что у нас по стилям отступы от края экрана до попапа по 30 пикселей и поля попапа тоже по 30 пикселей с каждой стороны
    let winsize = {
        w: document.documentElement.clientWidth - 120,
        h: document.documentElement.clientHeight - 120
    };
    let sides = document.querySelector('.main-image img').clientWidth / document.querySelector('.main-image img').clientHeight;
    
    // сравниваем реальные размеры попапа и размеры при правильном соотношении сторон у картинки. при необходимости вносим исправления
    if (winsize.w / sides > winsize.h) {
        let correction = (winsize.w - (winsize.h * sides)) / 2;
        document.querySelector('.popup').style = 'margin: 0 ' + correction + 'px';
        winsize.w = winsize.h * sides;
    } else {
        winsize.h = winsize.w / sides;
    }
    
    // прописываем размеры картинки
    document.querySelector('.lightbox img').style = 'width:' + winsize.w + 'px;height:' + winsize.h + 'px';
    
    // прописываем уборку попапа по клику на кнопку-крестик
    document.querySelector('.cross').addEventListener('click',function(){
        document.querySelector('.popup-desk').dispatchEvent(new Event("click"));
    });
    
    // проявляем попап
    document.querySelector('.popup-desk').classList.add('active');
}
function changeimage(event) { // аргументом будет событие клика
    // из объекта события мы берем указатель на место события - event.target
    // это место - наша картинка
    // из ее атрибута src вычисляем адрес картинки среднего размера
    let imageurl = event.target.src.split('_small').join('_medium');
    
    // всталяем этот адрес в атрибут src главной картинки
    document.querySelector('.main-image img').src = imageurl;
}