  $(function(){
    $('.submenu_mover').click(function(){
        if ($(this).parent().hasClass('open')) {
            $('.catmenu_item.open').removeClass('open').find('.submenu').animate({
                height: 0
            }, 1000);
        } else {
            $('.catmenu_item.open').removeClass('open').find('.submenu').animate({
                height: 0
            }, 1000);
            $(this).parent().addClass('open').find('.submenu').animate({
                height: ($(this).parent().find('.submenu a').length * 24)
            }, 1000);
        }
    });
    
    $('button.basket').click(function(){
        $('.popup-desk').addClass('active');
        $('.popup').html('<p class="popup-header">Личный кабинет</p><input type="text" name="fullname" placeholder="Логин"><input type="password" name="password" placeholder="Пароль"><button type="submit">Войти</button><a href="https://yandex.ru/" class="register">Зарегистрироваться</a>');
        $('.basket').html(6);
    });
    
    $('.popup-desk').click(function(e){
        if (e.target == this) {
            $(this).removeClass('active');
            $('.popup').empty();
            $('.basket').html(5);
        }
    });
    
    $(document).on('click', '.register', function(e){
        e.preventDefault();
        if ($('.basket').html()==6) {
            $('.popup').html('<p class="popup-header">Личный кабинет закрыт на ремонт.<br>Регистрации не будет до 1 января.</p><a href="https://yandex.ru/" class="register">Войти</a>');
            $('.basket').html(5);
        } else {
            $('.popup').html('<p class="popup-header">Личный кабинет</p><input type="text" name="fullname" placeholder="Логин"><input type="password" name="password" placeholder="Пароль"><button type="submit">Войти</button><a href="https://yandex.ru/" class="register">Зарегистрироваться</a>');
            $('.basket').html(6);
        }
    });
    
    $(document).on('click', 'button[type="submit"]', function(){
        alert('OGOGO!!!');
    });
    
    $(document).on('click', '.order .del > div', function(){
        tovarDelete(this);
    });
    
    $(document).on('input', '.order .num > input', function(){
        tovarChange(this);
    });
});



/* order */
const order = [
    {
        id: 5711,
        value: 10
    },
    {
        id: 3432,
        value: 10
    },
    {
        id: 4846,
        value: 10
    }
]
function tovarDelete(point) {
    let b = point.parentNode.parentNode;
    let t_id = b.querySelector('th').dataset.tovar;
    for (let i = 0; i < order.length; i++) {
        if (order[i].id == t_id) {
            order.splice(i, 1);
            console.log(t_id); // имитация отправки бэку сообщения об удалении товара
            break;
        }
    }
    b.remove();
    if (order.length > 0) {
        tovarCount();
    } else {
        orderEmpty();
    }
}
function tovarChange(point) {
    let new_quantity = point.value;
    if (new_quantity <= 0) {
        tovarDelete(point);
    } else {
        let tovar_id = point.parentNode.parentNode.querySelector('th').dataset.tovar;
        for (let i = 0; i < order.length; i++) {
            if (order[i].id == tovar_id) {
                order[i].value = new_quantity;
                console.log(order[i]);
                break;
            }
        }
        tovarCount();
    }
}
function tovarCount() { // пересчет товара
    let itog = 0; // общий итог
    for (let i = 0; i < order.length; i++) { // перебираем в цикле корзину
        const row = $('.order .table tbody tr').eq(i); // берем строку, соответствующую по порядковому номеру перебираемому товару в корзине
        row.find('th').html(i + 1); // выставляем порядковый номер товара. +1 потому что надо считать с 1, а у нас счет с 0
        row.find('.sum').html(row.find('.rub').html() * order[i].value); // в ячейку с классом sum кладем произведение количества товара, взятого из корзины, на цену товара, взятую из ячейки с классом rub
        itog += +row.find('.sum').html(); // плюсуем к итогу содержимое ячейки с классом sum (произведение количества на цену нашего товара)
    }
    $('.order .table .allsum').html(itog); // кладем итог в ячейку с классом allsum
}
function orderEmpty() {
    $('.order').addClass('empty');
}


/* calendar */
const MONTHNAMES = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь',];
const TODAY = new Date();
let birthday = null;
let selected_day = null;

function makePopup(my_year, my_month){
    let my_weekday = new Date(my_year, my_month).getDay();
    let month_length = Math.floor((new Date(my_year, my_month + 1) - new Date(my_year, my_month)) / (1000 * 60 * 60 * 24));
    let prev_days = (my_weekday + 6) % 7;
    let weeks = Math.ceil((month_length + prev_days) / 7);

    let str = '<div class="header">';
    str += '<span class="left">&#171;</span>';
    str += '<b>' + MONTHNAMES[my_month] + ' ' + my_year + '</b>';
    str += '<span class="right">&#187;</span>';
    str += '</div>';
    
    str += '<table><tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th class="holiday">Сб</th><th class="holiday">Вс</th></tr>';
    for (let i = 0; i < weeks; i++) {
        str += '<tr>';
        for (let j = 0; j < 7; j++) {
            let x = '';
            let y = (j + (i * 7)) + 1;
            let z = my_year + ',' + my_month + ',';
            if ((y < prev_days + 1) || (y > prev_days + month_length)) {
                y = '';
                x = 'noourmonth';
            } else {
                y -= prev_days;
                z += y;
                if (j > 4)  {
                    x = 'holiday';
                } else {
                    x = 'workday';
                }
                if ((y == TODAY.getDate()) && (my_year == TODAY.getFullYear()) && (my_month == TODAY.getMonth())) {
                    x += ' today';
                }
                if (selected_day) {
                    if((y == selected_day.getDate()) && (my_year == selected_day.getFullYear()) && (my_month == selected_day.getMonth())) {
                        x += ' selected';
                    }
                }
            }
            str += '<td class="' + x + '" data-date="' + z + '">' + y + '</td>';
        }
        str += '</tr>';
    }
    str += '</table>';
    
    str += '<div class="footer"></div>';
    
    $('.modal').html(str);
    
    $('.header span').click(function(){
        let a = my_year;
        let b = my_month;
        if ($(this).hasClass('left')) {
            b--;
        } else {
            b++;
        }
        if (b < 0) {
            b += 12;
            a--;
        } else if (b > 11) {
            b -= 12;
            a++;
        }
        makePopup(a, b);
    });
    
    $('.holiday, .workday').click(function(){
        let arr = this.dataset.date.split(',');
        arr[1] = +arr[1] + 1;
        if (arr[1] < 10) arr[1] = '0' + arr[1];
        if (arr[2].length < 2) arr[2] = '0' + arr[2];
        let str = arr[2] + '-' + arr[1] + '-' + arr[0];
        $('input').val(str);
        $('.active').removeClass('active');
        $('.modal').empty();
    });
    
    $('.screen').addClass('active');
}

$(function(){
    $('input').mask('00-00-0000');
    $('input, .getcalendar').click(function(){
        if ($('input').val()) {
            let chooseDate = $('input').val();
            let choose_year = chooseDate.slice(6, 10);
            let choose_month = chooseDate.substring(3, 5);
            let choose_date = chooseDate.substr(0, 2);
            selected_day = new Date(choose_year, choose_month - 1, choose_date);
            makePopup(selected_day.getFullYear(),selected_day.getMonth());
        } else {
            makePopup(TODAY.getFullYear(),TODAY.getMonth());
        }
    });
    $('.screen').click(function(e){
        if ($(e.target).hasClass('active')) {
            $('.active').removeClass('active');
            $('.modal').empty();
        }
    });
});

/* slider */
$(function(){
    sliderRun(); // запускаем нашу программу, когда готов DOM
});
function sliderRun() {
    const w = $('.slide').width(); // ширина слайда - самая важная константа, ее везде используем
    const t = 1000; // время в миллисекундах, вынесено в константу для удобства. для таймаута я взял удвоенный интервал.
    let current = 0; // указатели на текущий слайд и его соседей слева и справа
    let left = -1; // -1 соответствует length-1, то есть последнему слайду из набора
    let right = 1;
    let flag1 = false; // три флага блокировки, так как у нас три независимых асинхронных процесса, исхода которых необходимо ждать
    let flag2 = false;
    let flag3 = false;
    $('.slide').eq(current).addClass('active').css('left', 0);
    $('.slide').eq(left).css('left', -w); // располагаем левый и правый слайды по бокам от основного. поскольку overflow: hidden - их не видно. используем одно и то же свойство left для всех слайдов.
    $('.slide').eq(right).css('left', w);
    function moveLeft() {
        if (flag1 || flag2 || flag3) return; // проверяем флаги, если хоть один не убран, отказываемся действовать. это не позволит одновременно выполняться вызовам от постоянной прокрутки и кнопок или от двух кнопок сразу.
        flag1 = true; // поднимаем все флаги, чтобы не допустить нового вызова, пока не отработал текущий
        flag2 = true;
        flag3 = true;
        left = current; // текущий слайд становится левым и уезжает налево
        $('.slide').eq(left).animate({left: -w}, t, function(){
            $(this).removeClass('active');
            flag1 = false; // когда анимация отработала, один флаг убирается
        });
        current = right; // правый становится текущим и выезжает справа
        $('.slide').eq(current).addClass('active').animate({left: 0}, t, function(){
            flag2 = false; // когда анимация отработала, еще один флаг убирается
        });
        right++; // переводим правый указатель еще правее
        if (right > $('.slide').length - 2) {
            right -= $('.slide').length; // если значение указателя больше индекса предпоследнего слайда, уменьшаем на его количество слайдов: последний слайд получается по индексу -1.
        }
        $('.slide').eq(right).css('left', w); // устанавливаем правый слайд в готовности справа. поскольку он не должен быть виден - без анимации.
        flag3 = false; // убираем третий флаг
    }
    function moveRight() { // все аналогично предыдущей функции, только в обратную сторону
        if (flag1 || flag2 || flag3) return;
        flag1 = true;
        flag2 = true;
        flag3 = true;
        right = current;
        $('.slide').eq(right).animate({left: w}, t, function(){
            $(this).removeClass('active');
            flag1 = false;
        });
        current = left;
        $('.slide').eq(current).addClass('active').animate({left: 0}, t, function(){
            flag2 = false;
        });
        left--;
        if (left < -1) {
            left += $('.slide').length;
        }
        $('.slide').eq(left).css('left', -w);
        flag3 = false;
    }
    let tm = setTimeout(everScroll, t * 2); // назначаем вызов вспомогательной функции с задержкой
    function everScroll() {
        moveLeft(); // вспомогательная функция вызывает прокрутку влево
        tm = setTimeout(everScroll, t * 2); // и назначает новый вызов себя с задержкой. это не рекурсия, так как функция сразу и заканчивает работу, а не ждет результатов вызова.
    }
    $('.left').click(moveLeft); // на кнопки навещиваем вызов прокрутки влево и вправо соответственно
    $('.right').click(moveRight);
    /*
    $('.stop').click(function(){
        clearTimeout(tm);
        setTimeout(function(){
            clearTimeout(tm);
        }, t * 1.2);
    });
    $('.go').click(everScroll);
    */
}
