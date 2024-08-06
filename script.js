function startLoader() {
    let counterElement = document.querySelector('.counter');
    let currentValue = 0;

    function updateCounter() {
        if (currentValue === 100) {
            return;
        }

        currentValue += Math.floor(Math.random() * 10) + 1;

        if (currentValue > 100) {
            currentValue = 100;
        }

        counterElement.textContent = currentValue;

        let delay = Math.floor(Math.random() * 200) + 50;
        setTimeout(updateCounter, delay);
    }

    updateCounter();
}

startLoader();

gsap.to('.counter', 0.25, {
    delay: 3.5, opacity: 0,
})

gsap.registerPlugin(ScrollTrigger);

$(function () {
    //h2 쪼개기
    const myText = new SplitType('.con01 h2');

    gsap.to('.char', {
        y: 0, stagger: .1, // .1초 간격으로
        delay: 3.6, //3.6초 지나면 텍스트 애니메이션 실행
        duration: .1, // .1초 동안
        ease: "bounce.out",
    })

    // .circle
    gsap.timeline({
        scrollTrigger: {
            trigger: '.con02', start: '0% 50%', end: '30% 20%', scrub: 1, // markers:true
        }
    })
        .fromTo('.circle', {
            'width': '0', 'height': '0', 'duration': '10', 'ease': 'elastic', 'top': '3%'
        }, {'width': '2500', 'height': '2500', 'duration': '10', 'opacity': '1', 'top': '30%'}, 0)

    gsap.timeline({
        scrollTrigger: {
            trigger: '.con02 .textBox', start: '0% 80%', end: '100% 80%', scrub: 1, // markers:true
        }
    })
        .fromTo('.textBox', {'top': '50%', 'duration': '5', 'ease': 'elastic', 'opacity': '0',}, {
            'duration': '5', 'ease': 'none', 'opacity': '1', 'top': '40%'
        }, 0)


    gsap.to(".spin", {
        opacity: 1, duration: 1,  // 애니메이션이 지속될 시간
        delay: 3.8    // 애니메이션 시작 전 대기 시간
    });

    //scrolldown 이미지 사라지게
    gsap.timeline({
        scrollTrigger: {
            trigger: '.spin', start: '0% 80%', end: '100% 80%', scrub: 1, // markers:true
        }
    })
        .fromTo('.spin, .arrow', {'opacity': '1',}, {'top': '60%', 'opacity': '0'}, 0)


    //소개란 img_wrap, text_wrap 나타나게
    gsap.timeline({
        scrollTrigger: {
            trigger: '.img_wrap', start: '20% 90%', end: '50% 100%', scrub: 1, // markers:true
        }
    })
        .fromTo('.img_wrap, .text_wrap', {'opacity': '0',}, {'opacity': '1'}, 0)


    //포트폴리오 슬라이드
    let list = gsap.utils.toArray('.con03 ul li');
    let scrollTween = gsap.to(list, {
        xPercent: -100 * (list.length - 1),//원래 리스트의 갯수보다
        ease: 'none', scrollTrigger: {
            trigger: '.con03', pin: true, scrub: 1, start: 'center center', end: '300%',//숫자가 높아질수록 속도가 느려짐
            // markers:true
        }
    });

    //imgBox모션

    gsap.utils.toArray('.imgBox').forEach(function (imgBox) {
        //03-1:imgBox커지는 애니메이션 오른쪽에서 커져서 중앙에서 끝나는
        gsap.timeline({
            scrollTrigger: {
                trigger: imgBox,
                containerAnimation: scrollTween,
                start: 'center right',
                end: 'center center',
                scrub: true, // markers:true,
            }
        })
            .to(imgBox, {'transform': 'scale(1)', ease: 'none', duration: 1}, 0)

        //03-2:imgBox 센터에서 왼쪽으로 가면서 작아지는 애니메이션
        gsap.timeline({
            scrollTrigger: {
                trigger: imgBox,
                containerAnimation: scrollTween,
                start: 'center center',
                end: 'center left',
                scrub: true, // markers:true,
            }
        })
            .to(imgBox, {'transform': 'scale(0.5)', ease: 'none', duration: 1}, 0)
    })


    //text_box모션

    gsap.utils.toArray('.text_box').forEach(function (text_box) {
        //04-1:text_box커지는 애니메이션 오른쪽에서 커져서 중앙에서 끝나는
        gsap.timeline({
            scrollTrigger: {
                trigger: text_box,
                containerAnimation: scrollTween,
                start: 'center 70%',
                end: 'center center',
                scrub: true, // markers:true,
            }
        })
            .to(text_box, {'opacity': '1', 'x': -100}, 0)

        //04-2:textBox 센터에서 왼쪽으로 가면서 작아지는 애니메이션
        gsap.timeline({
            scrollTrigger: {
                trigger: text_box,
                containerAnimation: scrollTween,
                start: 'center 30%',
                end: 'center 20%',
                scrub: true, // markers:true,
            }
        })
            .to(text_box, {'opacity': '0'}, 0)
    })
})


let $text = $('.track1 .text');
let $wrap = $('.track1');

$text.clone().appendTo($wrap);

TweenMax.to($wrap, 20, {
    x: -($text.width()), ease: Linear.easeNone, repeat: -1
});

let $text2 = $('.track2 .text');
let $wrap2 = $('.track2');

$text2.clone().appendTo($wrap2);

TweenMax.to($wrap2, 15, {
    x: -($text2.width()), ease: Linear.easeNone, repeat: -1
});


(function () {
    const wrapper = document.querySelector(".confetti");
    const isAnimationOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    const icons = ["🎉", "✨", "👍", "❤️", "💚", "😎"];
    const iconCount = 18;
    var elements = [];

    init();

    function init() {
        for (let i = 0; i < iconCount; i++) {
            createIcon();
        }

        gsap.set(elements, {
            transformOrigin: "50% 50%", scale: 0
        });
    }

    function createIcon(icon) {
        if (icon === null || icon === undefined) {
            icon = document.createElement("span");
            icon.classList.add("confetti__item");
            wrapper.appendChild(icon);
            elements.push(icon);
        }

        icon.innerText = gsap.utils.random(icons);
        if (isAnimationOk) animateIcon(icon);
    }

    function animateIcon(icon) {
        let durationFall = gsap.utils.random(1.75, 2.5);
        let durationFade = .3;
        let delay = gsap.utils.random(0, .75);
        let xDirection = gsap.utils.random(0, 1) > .5 ? 1 : -1;
        let x = (gsap.utils.random(0, window.outerWidth / 2) + 100) * xDirection;
        let tl = new gsap.timeline();

        tl.to(icon, {
            repeat: -1, delay: delay, keyframes: [{
                scale: 2, duration: .1
            }, {
                y: `random(${-window.outerHeight / 4}, 0)`, ease: Back.easeOut.config(5), duration: durationFall
            }, {
                x: (gsap.utils.random(0, window.outerWidth / 4) + 100) * xDirection,
                ease: "Power1.easeOut",
                duration: durationFall,
                delay: -durationFall
            }, {
                opacity: 0, scale: 4, ease: "Power1.easeOut", duration: durationFade, delay: -durationFade
            }]
        }, "<");
    }
}());