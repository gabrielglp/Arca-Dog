const target = document.querySelectorAll('[data-anime')
const animationClass = 'animate'

function animeScroll() {
  const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4)
  target.forEach(function (e) {
    if((windowTop) > e.offsetTop) {
        e.classList.add(animationClass)
    }
  })
}

window.addEventListener('scroll', function() {
    animeScroll()
})
