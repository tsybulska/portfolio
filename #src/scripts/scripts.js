// polyfill ie
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// preloader
const $preloader = document.getElementById('preloader')

function preloaderShow(el) {
    el.style.opacity = 1
    let interPreloader = setInterval(function () {
        el.style.opacity = el.style.opacity - 0.05
        if (el.style.opacity <= 0.05) {
            clearInterval(interPreloader)
            $preloader.style.display = "none"
        }
    }, 16)
}

window.onload = function () {
    setTimeout(function () {
        preloaderShow($preloader)
    }, 1000)
}

// button switch theme
const $themeHead = document.getElementById('theme-head')
const $themeBtn = document.getElementById('theme-btn')

const dark = '--color-bg:#1f1f1f;--color-text:#fcfcfc;--color-primary:#343341;--color-secondary:#28aaba;--color-shadow1:0 0 10px 5px rgba(255, 255, 255, 0.05);--color-shadow2:0 5px 0 rgba(255, 255, 255, 0.1)'
const light = '--color-bg:#ffffff;--color-text:#322824;--color-primary:#e0d1cc;--color-secondary:#00b5ff;--color-shadow1:0 0 10px 5px rgba(0, 0, 0, 0.05);--color-shadow2:0 5px 0 rgba(0, 0, 0, 0.1)'

$themeBtn.addEventListener('click', switchTheme)

function switchTheme() {
    if (!localStorage.getItem('theme-switched')) {
        document.body.classList.add('theme-switched')
        document.body.setAttribute('style', light)
        localStorage.setItem('theme-switched', JSON.stringify(true))
    } else {
        document.body.classList.remove('theme-switched')
        document.body.setAttribute('style', dark)
        localStorage.removeItem('theme-switched')
    }
}

// back to top
const $backtop = document.getElementById("backtop")

window.addEventListener('scroll', backtopShow)

$backtop.onclick = function(e) {
    e.preventDefault()
    scrollToTop()
}

function backtopShow() {
    if (window.scrollY > 0) {
        document.body.classList.add('backtop-show')
    } else {
        document.body.classList.remove('backtop-show')
    }
}

let scrollToTop = () => {
    let c = document.documentElement.scrollTop || document.body.scrollTop
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop)
        window.scrollTo(0, c - c / 10)
    }
}

// nav fix animation
const $nav = document.getElementById('nav')
let topOfNav = $nav.offsetTop

window.addEventListener('scroll', navFix)

function navFix() {
    if (window.scrollY >= topOfNav) {
        document.body.classList.add('nav-fixed')
    } else {
        document.body.classList.remove('nav-fixed')
    }
}

// nav anchors scroll
$nav.querySelectorAll('a[href^="#"').forEach(link => {

    link.addEventListener('click', function(e) {
        e.preventDefault()

        let href = this.getAttribute('href').substring(1)

        const scrollTarget = document.getElementById(href)

        const topOffset = document.querySelector('nav').offsetHeight * 1.8
        const elementPosition = scrollTarget.getBoundingClientRect().top
        const offsetPosition = elementPosition - topOffset

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        })

        if ($nav.classList.contains('menu-active')) {
            $nav.classList.remove('menu-active')
        }
    })
})

// nav mobile toggle
let $navIcon = document.querySelector('.nav__icon')

$navIcon.addEventListener('click', function() {
    $nav.classList.toggle('menu-active')
})

// close nav if click anywhere
document.documentElement.addEventListener('click', function (e) {
    if (!e.target.closest('.nav') && $nav.classList.contains('menu-active')) {
        $nav.classList.toggle('menu-active')
    }
})

// images carousel
document.querySelectorAll('.projects-img__btn').forEach(btn => {
    btn.addEventListener('click', projectsBtn)
})

function projectsBtn(event) {
    let btn = event.target.closest('button').className
    let btnText = event.target.closest('.projects__img').querySelector('.projects-img__num').querySelector('span')
    let slider = event.target.closest('.projects__img').querySelector('.projects-img__slider')
    let sliderElements = slider.querySelectorAll('.projects-img__slide')
    let slideCurrent = slider.querySelector('.slide-active')

    let slideNumber
    sliderElements.forEach(getSlideNumber)
    
    function getSlideNumber(el, index) {
        if (el.classList.contains('slide-active')) slideNumber = index + 1
    }

    let slideNew
    if ((btn === 'projects-img__prev') && (slideNumber > 1)) {
        slideNew = slideNumber - 1
    } else if ((btn === 'projects-img__prev') && (slideNumber === 1)) {
        slideNew = sliderElements.length
    } else if ((btn === 'projects-img__next') && (slideNumber < sliderElements.length)) {
        slideNew = slideNumber + 1
    } else if ((btn === 'projects-img__next') && (slideNumber === sliderElements.length)) {
        slideNew = 1
    }

    if (slideNew) {
        slideCurrent.classList.remove('slide-active')
        sliderElements[slideNew - 1].classList.add('slide-active')
        btnText.textContent = slideNew
    }
}

// show images modal
document.querySelectorAll('.btn-expand').forEach(btn => {
    btn.addEventListener('click', expandImageBtn)
})

function expandImageBtn(event) {
    let modal = document.getElementById('modal')
    let modalContent = modal.querySelector('.modal__content')
    let img = event.target.closest('.projects__item').querySelector('.projects__img')
    let modalImg = img.cloneNode(true)
    let close = document.querySelector('.modal__close')

    modal.style.display = 'block'
    modalContent.appendChild(modalImg)

    modalContent.querySelector('.projects-img__btn').addEventListener('click', projectsBtn)

    close.addEventListener('click', () => {
        modalContent.innerHTML = ''
        modal.style.display = 'none'
    })
}