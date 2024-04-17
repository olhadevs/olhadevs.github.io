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
                ' / 0' +
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
                ' / 0' +
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