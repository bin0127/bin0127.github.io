"use strict";
const maxim = [
    '「自分の限界を信じてはなりません。その限界を超える方法を見つけましょう。」 byマイケル・ジョーダン',
    '「親切な行いは、たとえそれがどんなに些細なことであったとしても、無駄にはなりません」 byイソップ',
    '「忙しいことを理由にして，やりたいことを放棄しない」 byユング'
];

const typing = (element, target) => {
    const elem = document.querySelector(element);
    const speed = 100;
    const num = Math.floor(Math.random() * maxim.length);
    const string = maxim[num];
    let promises = [];

    elem.classList.remove('is-typing-off');

    new Promise((resolve) => {
        string.split('').forEach((char, index) => {
            promises.push(
                new Promise((resolve) =>{
                    setTimeout(() => {
                        elem.textContent += char;
                        resolve();
                    }, speed * index);
                })
            )
        });
    });

    Promise.all(promises).then(() => {
        setTimeout(() => {
            elem.classList.add('is-typing-off');
            elem.textContent = '';
            target.classList.remove('is-typing-on');
        }, 7000);
    });
};

const modalWindow = () => {
    let target = '';
    let scroll_y = 0;
    let animationend_count = 0;

    const animationendFunc = function(e) {
        const elm_id = this.getAttribute('id');
        animationend_count++;

        if (animationend_count === 2) {
            document.body.style = '';
            window.scrollTo(0, parseInt(scroll_y || '0'));
            document.getElementById(elm_id).classList.remove('is-fadeOut');
            document.getElementById(elm_id).classList.remove('is-fadeIn');
            animationend_count = 0;

            document.getElementById(elm_id).removeEventListener('animationend', animationendFunc);
        }
    };

    const closeFunc = (e) => {
        e.preventDefault();
        const id_flg = e.currentTarget.parentNode.getAttribute('id') !== null;
        const target = id_flg ? e.target.parentNode.getAttribute('id') : e.target.parentNode.parentNode.parentNode.getAttribute('id');
    
        document.querySelector('#' + target).classList.add('is-fadeOut');
        document.querySelector('#' +  target + '.is-fadeOut').addEventListener('animationend', animationendFunc);
    };

    document.querySelectorAll('.js-modal-open').forEach(elem => {
        elem.addEventListener('click', (e) =>{
            e.preventDefault();
            const win_diff = window.innerWidth - document.body.clientWidth;

            target = e.currentTarget.getAttribute('href');
            scroll_y = document.documentElement.scrollTop || document.body.scrollTop
            document.body.style.cssText = 'position: fixed; left: 0; right: 0; height: 100%; overflow: hidden;';
            document.body.style.top = scroll_y * -1 + 'px';

            if (win_diff > 0) {
                document.body.style.paddingRight = `${win_diff}px`;
            }

            const class_list = document.querySelector(target).classList;

            if (class_list.contains('is-fadeOut')) {
                class_list.remove('is-fadeOut');
            }
            class_list.add('is-fadeIn');
        });
    });

    document.querySelectorAll('.js-modal-close').forEach(elem => {
        elem.addEventListener('click', closeFunc);
    });
};
  
document.addEventListener('DOMContentLoaded', () =>{
    document.querySelector('.js-typing-start').addEventListener('click', function(e){
        e.currentTarget.parentNode.classList.add('is-typing-on');
        typing('#js-typing', e.currentTarget.parentNode);
    });

    const anchor_list = document.querySelectorAll('a[href^="#"]');
    const anchor = Array.prototype.slice.call(anchor_list);

    anchor.forEach(element => {
      element.addEventListener('click', (e) => {
        e.preventDefault();

        const href = e.currentTarget.getAttribute('href');
        const target = href == "#" || href == "" ? document.body : document.getElementById(href.replace('#', ''));
        const rect = target.getBoundingClientRect();
        const scroll_top = window.pageYOffset || document.documentElement.scrollTop;
        const position = rect.top + scroll_top;

        window.scrollTo({top: position, behavior: 'smooth'});
      });
    });

    modalWindow();
});

window.addEventListener('scroll', () => {
    const taget = document.getElementById('js-page-top');
    const scroll = window.pageYOffset || document.documentElement.scrollTop;

    if (scroll > 150) {
        taget.style.opacity = 1;
    } else {
        taget.style.opacity = 0;
    }
});
