let slides = document.querySelectorAll(".slide-container .slides"); //slides
let next = document.querySelector(".next"); // next button
let prev = document.querySelector(".prev"); // prev button
let dots = document.querySelectorAll(".dot"); //dots
let slideText = document.querySelectorAll(".slide-text"); // for the text div
let tl = gsap.timeline();

let counter = 0;
let autoSlideInterval;
let animating = false; // Track  animation is in progress



document.querySelectorAll('.anc-btn1').forEach(button => {
  button.addEventListener('click', function() {
    this.classList.toggle("open1"); 
    document.querySelector('.side').classList.toggle('open');
  });
});










// animate text elements
function animateText() {
  tl.clear();

  tl.fromTo(
    ".slide-container .slides.activeSlide .slide-text h1",
    {
      delay: 1,
      x: -100,
      opacity: 0,
    },
    {
      delay: 1,
      x: 0,
      opacity: 1,
    }
  );

  tl.fromTo(
    ".slide-container .slides.activeSlide .slide-text p",
    {
      delay: 1,
      y: 50,
      opacity: 0,
    },
    {
      duration: 0.5,
      y: 0,
      opacity: 1,
    },
    "-=0.5"
  );

  tl.fromTo(
    ".slide-container .slides.activeSlide .slide-text button",
    {
      delay: 1,
      y: 100,
      opacity: 0,
    },
    {
      duration: 0.5,
      y: 0,
      opacity: 1,
    },
    "-=0.5"
  );
}

function afterSlide() {
  // Reset the auto-slide interval
  resetAutoSliding();

  animateText();
  // Removing animation state
  setTimeout(() => {
    animating = false;
    next.classList.remove("no-click");
    prev.classList.remove("no-click");
  }, 1500);
}

next.addEventListener("click", slideNext);
function slideNext() {
  if (animating) return;
  animating = true; // animation state
  next.classList.add("no-click");
  prev.classList.add("no-click");
  slides[counter].style.animation = "next1 1s ease-in-out forwards";
  dots[counter].classList.remove("active");
  if (counter == slides.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  slides[counter].style.animation = "next2 1s ease-in-out forwards";
  slides[counter].classList.add("activeSlide");
  dots[counter].classList.add("active");

  afterSlide();
}

prev.addEventListener("click", slidePrev);
function slidePrev() {
  if (animating) return;
  animating = true; // animation state
  next.classList.add("no-click");
  prev.classList.add("no-click");
  slides[counter].style.animation = "prev1 1s ease-in-out forwards";
  dots[counter].classList.remove("active");
  if (counter == 0) {
    counter = slides.length - 1;
  } else {
    counter--;
  }
  slides[counter].style.animation = "prev2 1s ease-in-out forwards";
  slides[counter].classList.add("activeSlide");
  dots[counter].classList.add("active");

  afterSlide();
}

//auto-slide
function resetAutoSliding() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
  autoSlideInterval = setInterval(timer, 4000);
}

function timer() {
  slideNext();
}

function autoSliding() {
  resetAutoSliding();
}
autoSliding();

// Pause
document
  .querySelector(".slide-container")
  .addEventListener("mousedown", function () {
    clearInterval(autoSlideInterval);
  });

// Resume
document
  .querySelector(".slide-container")
  .addEventListener("mouseup", function () {
    autoSliding();
  });

// Resume
document
  .querySelector(".slide-container")
  .addEventListener("mouseleave", function () {
    autoSliding();
  });

// Add click event to the dot
for (let dot of dots) {
  dot.addEventListener("click", function () {
    // Get the index of the clicked dot
    let slideId = parseInt(this.getAttribute("attr"));
    if (animating) return;
    animating = true; // animation state
    next.classList.add("no-click");
    prev.classList.add("no-click");

    if (slideId !== counter) {
      if (slideId > counter) {
        slides[counter].style.animation = "next1 1s ease-in-out forwards";
        dots[counter].classList.remove("active");
        counter = slideId;
        slides[counter].style.animation = "next2 1s ease-in-out forwards";
        slides[counter].classList.add("activeSlide");
        dots[counter].classList.add("active");
        afterSlide();
      } else {
        slides[counter].style.animation = "prev1 1s ease-in-out forwards";
        dots[counter].classList.remove("active");
        counter = slideId;
        slides[counter].style.animation = "prev2 1s ease-in-out forwards";
        slides[counter].classList.add("activeSlide");
        dots[counter].classList.add("active");

        afterSlide();
      }
    }
  });
}




gsap.from(".outer-container .container #card1", {
  duration: 0.8,
  x: -70,
  opacity:0,
  scrollTrigger:{
        trigger:".outer-container .container #card1",
        scroller:"body",
        start:"top 60%",
        end:"top 0",
        // markers:true,
        scrub:1
      }      
})



gsap.from(".outer-container .container #card3", {
  duration: 0.8,
  x: 70,
  opacity:0,
  scrollTrigger:{
        trigger:".outer-container .container #card3",
        scroller:"body",
        start:"top 60%",
        end:"top 0",
        // markers:true,
        scrub:1
      }      
})

gsap.from(".outer-container .container #card2", {
  duration: 0.8,
  y: 60,
  opacity:0,
  scrollTrigger:{
        trigger:".outer-container .container #card2",
        scroller:"body",
        start:"top 60%",
        end:"top 0",
        // markers:true,
        scrub:2
      }      
})



gsap.from(".not .container #card4", {
  duration: 0.8,
  x: -70,
  opacity:0,
  scrollTrigger:{
        trigger:".not .container #card4",
        scroller:"body",
        start:"top 60%",
        end:"top 0",
        // markers:true,
        scrub:1
      }      
})



gsap.from(".not .container #card6", {
  duration: 0.8,
  x: 70,
  opacity:0,
  scrollTrigger:{
        trigger:".not .container #card6",
        scroller:"body",
        start:"top 60%",
        end:"top 0",

        scrub:1
      }      
})

gsap.from(".not .container #card5", {
  duration: 0.8,
  y: 60,
  opacity:0,
  scrollTrigger:{
        trigger:".not .container #card5",
        scroller:"body",
        start:"top 60%",
        end:"top 0",

        scrub:2
      }      
})









// gsap.from(".outer-container .container #card1", {
//   duration: 0.2,
//   x: -70,
//   opacity:0,
//   scrollTrigger:{
//     trigger:".outer-container .container #card1",
//     scroller:"body",
//     start:"top 80%",
//     end:"top 50%",
//     scrub:2

//   }
// })

// gsap.from(".outer-container .container #card3", {
//   opacity:0,
//   duration: 0.2,
//   x: 70,
//   scrollTrigger:{
//     trigger:".outer-container .container #card3",
//     scroller:"body",
//     start:"top 80%",
//     end:"top 50%",
//     scrub:2

//   }
// })

// gsap.from(".outer-container .container", {
//   // opacity:0,
//   duration: 0.2,
//   y: 200,
//   scrollTrigger:{
//     trigger:".outer-container .container #card2",
//     scroller:"body",
//     start:"top 80%",
//     end:"top 50%",
//     scrub:2
//   }
// })