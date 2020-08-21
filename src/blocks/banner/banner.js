let position = 0;
const slidesToShow = 1;
const slidesToScroll = 1;
const slideInterval = 3000;
const container = document.querySelector('.slider-container');
const track = document.querySelector('.slider-track');
const items = document.querySelectorAll('.slider-item');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const itemsCount = items.length
const itemWidth = container.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;
const tagList = []
const navBtnss = document.querySelectorAll('#nav-btns .slide-nav-btn');
const chbox = document.getElementById('checkbox-stop-slide');

function nextSlide() {
    position -= position <= -(itemsCount - slidesToShow) * itemWidth ? position : movePosition
    setPosition()
}

let switchInterval = setInterval(nextSlide, slideInterval);
let switchIntervalOne
chbox.addEventListener('click', function () {
    if (chbox.checked === true) {
        clearInterval(switchIntervalOne)
        clearInterval(switchInterval)
    } else {
        switchIntervalOne = setInterval(nextSlide, slideInterval);
    }
})

function addAtribut() {
    chbox.checked = !0
}

Array.prototype.forEach.call(items, function (item) {
    item.style.cssText = 'min-width: ' + itemWidth + 'px'
})

btnNext.addEventListener('click', function () {
    nextSlide()
    sec()
    addAtribut()
})

btnPrev.addEventListener('click', function () {
    position += position === 0 ? -(itemsCount - slidesToShow) * itemWidth : movePosition
    setPosition()
    sec()
    setPosition()
    addAtribut()

})

function setPosition() {
    track.style.cssText = 'transform: translateX(' + position + 'px)'


}
function sec() {
    clearInterval(switchIntervalOne)
    clearInterval(switchInterval)

}


for (let i = 0; i < navBtnss.length; i++) {
    tagList.push(navBtnss[i].dataset.id);
}
for (let i = 0; i < navBtnss.length; i++) {
    navBtnss[i].onclick = function () {
        let position = tagList.indexOf(this.dataset.id)
        position -= position != slidesToShow ? position * itemWidth : movePosition

        track.style.cssText = 'transform: translateX(' + position + 'px)'
        sec()
        addAtribut()
        let b = document.querySelector(".slide-nav-btn.slide-nav-btn-active");
        if (b) b.classList.remove("slide-nav-btn-active");
        this.classList.add('slide-nav-btn-active');
    }

    navBtnss[i].addEventListener("load", function () {
        let position = tagList.indexOf(this.dataset.id)
        position -= position != slidesToShow ? position * itemWidth : movePosition
        console.log('22', position)
    })

}

