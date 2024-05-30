document.addEventListener('DOMContentLoaded', function () {

  //scroll to anchor 
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    });
  });

  let isMob = window.innerWidth <= 768 ? true : false;

  new simpleParallax(document.querySelectorAll('.parallax-main'), {
    delay: .6,
    orientation: 'up',
    scale: isMob ? 1 : 1.4,
    overflow: true,
    transition: 'cubic-bezier(0,0,0,1)'
  });

  new simpleParallax(document.querySelectorAll('.parallax-main-image'), {
    delay: .6,
    orientation: isMob ? 'down' : 'up',
    scale: isMob ? 1.9 : 1.4,
    overflow: true,
    transition: 'cubic-bezier(0,0,0,1)'
  });

  new simpleParallax(document.querySelectorAll('.parallax-slide'), {
    delay: .6,
    orientation: 'up',
    scale: isMob ? 1.6 : 1.2,
    overflow: true,
    transition: 'cubic-bezier(0,0,0,1)'
  });

  new simpleParallax(document.querySelectorAll('.parallax-slide-text'), {
    delay: .6,
    orientation: 'down',
    scale: isMob ? 1 : 3,
    overflow: true,
    transition: 'cubic-bezier(0,0,0,1)'
  });

  new simpleParallax(document.querySelectorAll('.parallax-mission'), {
    delay: .6,
    orientation: 'up',
    scale: 1.2,
    overflow: true,
    transition: 'cubic-bezier(0,0,0,1)'
  });

  new simpleParallax(document.querySelectorAll('.parallax-mission-text'), {
    delay: .6,
    orientation: 'down',
    scale: 1.2,
    overflow: true,
    transition: 'cubic-bezier(0,0,0,1)'
  });

  new simpleParallax(document.querySelectorAll('.parallax-services'), {
    delay: .6,
    orientation: 'up',
    scale: isMob ? 1.4 : 1.2,
    overflow: true,
    transition: 'cubic-bezier(0,0,0,1)'
  });

  new simpleParallax(document.querySelectorAll('.parallax-contact'), {
    delay: .6,
    orientation: 'up',
    scale: 1.2,
    overflow: true,
    transition: 'cubic-bezier(0,0,0,1)'
  });

  new simpleParallax(document.querySelectorAll('.parallax-events-main-image'), {
    delay: .6,
    orientation: 'down',
    scale: isMob ? 1.9 : 1.6,
    overflow: true,
    transition: 'cubic-bezier(0,0,0,1)'
  });

  function checkForVisibility() {
    var titles = document.querySelectorAll(".title-appearable");
    titles.forEach(function(title) {
      if (isElementInViewport(title)) {
        title.classList.add("title-appear");
      }
    });
  }
  
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
  
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  if (window.addEventListener) {
    addEventListener("DOMContentLoaded", checkForVisibility, false);
    addEventListener("load", checkForVisibility, false);
    addEventListener("scroll", checkForVisibility, false);
  }

  var mainSwiper = new Swiper(".main-slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: true,
    effect: "fade",
    crossFade: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
      clickable: true,
      renderFraction: function (currentClass, totalClass) {
        return '0<span class="' + currentClass + '">0</span>' +
                '/0' +
                '<span class="' + totalClass + '">0</span>';
      }
    },
    breakpoints: {
      768: {
        autoHeight: false,
        effect: "fade",
        crossFade: true
      },
    }
  });

  var achievementSwiper = new Swiper(".achievement-slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: true,
    effect: "fade",
    crossFade: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
      clickable: true,
      renderFraction: function (currentClass, totalClass) {
        return '0<span class="' + currentClass + '">0</span>' +
                '/0' +
                '<span class="' + totalClass + '">0</span>';
      }
    },
    breakpoints: {
      768: {
        autoHeight: false,
        effect: "fade",
        crossFade: true
      },
    }
  });
  
  // Tabs 
  if (document.querySelector('.tabs')) {
    const tabs = document.querySelectorAll('[data-tab-target]')

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabSiblings = Array.from(tab.parentElement.children).filter(sibling => sibling !== tab && sibling.classList.contains('tab'));
        const target = document.querySelector(tab.dataset.tabTarget);

        const tabContentSiblings = Array.from(target.parentElement.children).filter(sibling => sibling !== target);

        tabContentSiblings.forEach(tabContent => {
          tabContent.classList.remove('active')
        })
     
        tabSiblings.forEach(tab => {
          tab.classList.remove('active')
        })

        tab.classList.add('active')
        target.classList.add('active')
      })
    })
  }
});