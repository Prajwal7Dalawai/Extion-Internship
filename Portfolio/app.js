// Intro Part Functionalities
document.addEventListener('DOMContentLoaded', function () {
        let currentSlide = 0;
    
    function moveSlide(direction) {
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;
        
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        
        const sliderTrack = document.querySelector('.slider-track');
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

});

document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const asideLinks = document.querySelectorAll("aside div a");

    const options = {
        root: null, // Use the viewport as the container
        rootMargin: "0px",
        threshold: 0.5 // Trigger when 50% of the section is in view
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const asideLink = document.querySelector(`aside div a[href="#${entry.target.id}"]`);

            if (entry.isIntersecting) {
                asideLinks.forEach(link => link.classList.remove('active'));
                asideLink.classList.add('active');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});

//Education Part Functionalities
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};


