const navToggleAbr = document.querySelector(".nav-toggle_abrir");
const navToggleCerr = document.querySelector(".nav-toggle_cerrar");
const empBtn1 = document.querySelector(".Empty-button-white_1");
const empBtn2 = document.querySelector(".Empty-button-white_2");
const navMenu = document.querySelector(".nav-menu");
const body = document.querySelector("body");
const fade = document.querySelector('#fade');
const slider = document.querySelector(".cards-container");
// Transforma la variable en un array con el cual podre seleccionar las diferentes cards
const slides = Array.from(document.querySelectorAll(".card"));
let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  currentIndex = 0

// add our event listeners
slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img')
  // disable default image drag
  slideImage.addEventListener('dragstart', (e) => e.preventDefault())
  // touch events
  slide.addEventListener('touchstart', touchStart(index))
  slide.addEventListener('touchend', touchEnd)
  slide.addEventListener('touchmove', touchMove)
  // mouse events
  slide.addEventListener('mousedown', touchStart(index))
  slide.addEventListener('mouseup', touchEnd)
  slide.addEventListener('mousemove', touchMove)
  slide.addEventListener('mouseleave', touchEnd)
})

// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndex)

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

// use a HOF so we have index in a closure
function touchStart(index) {
  return function (event) {
    currentIndex = index
    startPos = getPositionX(event)
    console.log(startPos)
    isDragging = true
    animationID = requestAnimationFrame(animation)
    slider.classList.add('grabbing')
  }
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event)
    currentTranslate = prevTranslate + currentPosition - startPos
  }
}

function touchEnd() {
  cancelAnimationFrame(animationID)
  isDragging = false

  slider.classList.remove('grabbing')
}

function animation() {
  setSliderPosition()
  if (isDragging) requestAnimationFrame(animation)
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition()
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}
      

navToggleAbr.addEventListener("click", () => {
    navMenu.classList.toggle("nav-menu_visible"),
    body.classList.toggle("body_modif"),
    fade.style.display='block',
    empBtn2.style.display='block',
    empBtn1.style.display='none'

});

navToggleCerr.addEventListener("click", () => {
    navMenu.classList.toggle("nav-menu_visible"),
    body.classList.toggle("body_modif"),
    document.getElementById('fade').style.display='none'

});

