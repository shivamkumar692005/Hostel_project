let slides = document.querySelectorAll(".slide-container .slides"); //slides
let next = document.querySelector(".next"); // next button
let prev = document.querySelector(".prev"); // prev button
let dots = document.querySelectorAll(".dot"); //dots
let slideText = document.querySelectorAll(".slide-text"); // for the text div
let tl = gsap.timeline();

let counter = 0;
let autoSlideInterval;
let animating = false; // Track  animation is in progress

// <-----------------------------NAVBAR --------------------------------------->

const navToggleBtn = document.querySelectorAll(".nav-toggle-btn");
for (let btn of navToggleBtn) {
  btn.addEventListener("click", () => {
    console.log("hii");
    document.querySelector(".toggle-nav-link").classList.toggle("toggle-right");
  });
}

// <----------------------------Announcment ----------------------->
document.querySelectorAll(".anc-btn1").forEach((button) => {
  button.addEventListener("click", function () {
    this.classList.toggle("open1");
    document.querySelector(".side").classList.toggle("open");
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

// Listen for keyboard arrow key presses
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    slideNext();
  } else if (event.key === "ArrowLeft") {
    slidePrev();
  }
});

// ?lissten for mobile swip
let startX = 0;
let endX = 0;
let threshold = 50;

let slideCont = document.querySelector(".slide-container");

slideCont.addEventListener("touchstart", function (event) {
  startX = event.touches[0].clientX;
});

slideCont.addEventListener("touchmove", function (event) {
  endX = event.touches[0].clientX;
});

slideCont.addEventListener("touchend", function () {
  let distance = endX - startX;

  if (Math.abs(distance) > threshold) {
    if (distance < 0) {
      slideNext();  // Swipe left to trigger next slide
    } else {
      slidePrev();  // Swipe right to trigger previous slide
    }
  }
});

// CARDS ANIMATION
gsap.from(".outer-container .container #card1", {
  duration: 0.8,
  x: -70,
  opacity: 0,
  scrollTrigger: {
    trigger: ".outer-container .container #card1",
    scroller: "body",
    start: "top 60%",
    end: "top 30%",
    // markers:true,
    scrub: 1,
  },
});

gsap.from(".outer-container .container #card3", {
  duration: 0.8,
  x: 70,
  opacity: 0,
  scrollTrigger: {
    trigger: ".outer-container .container #card3",
    scroller: "body",
    start: "top 60%",
    end: "top 30%",
    // markers:true,
    scrub: 1,
  },
});

gsap.from(".outer-container .container #card2", {
  duration: 0.8,
  y: 60,
  opacity: 0,
  scrollTrigger: {
    trigger: ".outer-container .container #card2",
    scroller: "body",
    start: "top 60%",
    end: "top 30%",
    // markers:true,
    scrub: 2,
  },
});

gsap.from(".not .container #card4", {
  duration: 0.8,
  x: -70,
  opacity: 0,
  scrollTrigger: {
    trigger: ".not .container #card4",
    scroller: "body",
    start: "top 60%",
    end: "top 30%",
    // markers:true,
    scrub: 1,
  },
});

gsap.from(".not .container #card6", {
  duration: 0.8,
  x: 70,
  opacity: 0,
  scrollTrigger: {
    trigger: ".not .container #card6",
    scroller: "body",
    start: "top 60%",
    end: "top 30%",
    scrub: 1,
  },
});

gsap.from(".not .container #card5", {
  duration: 0.8,
  y: 60,
  opacity: 0,
  scrollTrigger: {
    trigger: ".not .container #card5",
    scroller: "body",
    start: "top 60%",
    end: "top 30%",
    scrub: 2,
  },
});

// <!------------------------------ FAQS ------------------------------>
document.addEventListener("DOMContentLoaded", function () {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.closest(".faq-item");
      const answer = faqItem.querySelector(".faq-answer");
      const isOpen = faqItem.classList.contains("active");

      // Close all other open items
      document.querySelectorAll(".faq-item.active").forEach((item) => {
        if (item !== faqItem) {
          item.classList.remove("active");
          item.querySelector(".faq-answer").style.maxHeight = null;
          item.querySelector(".faq-toggle").textContent = "+";
        }
      });

      // Toggle the current item
      if (isOpen) {
        faqItem.classList.remove("active");
        answer.style.maxHeight = null;
        faqItem.querySelector(".faq-toggle").textContent = "+";
      } else {
        faqItem.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
        faqItem.querySelector(".faq-toggle").textContent = "-";
      }
    });
  });
});

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
