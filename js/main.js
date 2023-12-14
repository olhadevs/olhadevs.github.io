"use strict";

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

  // Menu toggle
  document.querySelector('.nav-toggle').addEventListener('click', () => {
    document.querySelector('.header').classList.toggle('nav-active');
  })
  document.querySelector('.header-menu-overlay').addEventListener('click', () => {
    if (document.querySelector('.header.nav-active')) {
      document.querySelector('.header.nav-active').classList.remove('nav-active');
    }
  })

  if (document.querySelector('.dropdown') && window.innerWidth < 1200) {
    document.querySelectorAll('.dropdown-toggle').forEach(item => {
      item.addEventListener('click', () => {
        if (document.querySelector('.dropdown.open')) {
          document.querySelector('.dropdown.open').classList.remove('open');
        }
        item.closest('.dropdown').classList.add('open');
      })
    })
    document.addEventListener('click', e => {
      if (!e.target.classList.contains('dropdown') && !e.target.classList.contains('dropdown-toggle')) {
        if (document.querySelector('.dropdown.open')) {
          document.querySelector('.dropdown.open').classList.remove('open');
        }
      }
    })
  }

  // To top button 
  var basicScrollTop = function () {  
    var btnTop = document.querySelector('.go-top');
    var btnReveal = function () { 
      if (window.scrollY >= 500) {
        btnTop.classList.add('is-visible');
      } else {
        btnTop.classList.remove('is-visible');
      }    
    }  
    var scrollToTop = function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.addEventListener('scroll', btnReveal);
    btnTop.addEventListener('click', scrollToTop);  
  };
  basicScrollTop();

  // Slots slider
  const slotSwiper = new Swiper('.slots-slider', {
    speed: 500,
    spaceBetween: 10,
    slidesPerView: 1.1,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    navigation: {
      enabled: false,
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      740: {
        spaceBetween: 50,
      },
      768: {
        spaceBetween: 50,
        slidesPerView: 2,
      },
      1024: {
        spaceBetween: 50,
        slidesPerView: 3,
        navigation: {
          enabled: true,
        },
      },
      1600: {
        spaceBetween: 50,
        slidesPerView: 4,
      },
    }
  });

  // Sorces slider
  var swiperSources = Swiper;
  var initSwiperSorces = false;
  swiperMode();

  window.addEventListener('resize', function () {
    swiperMode();
  });

  function swiperMode() {
    let mobile = window.matchMedia('(max-width: 960px)');
    let desktop = window.matchMedia('(min-width: 961px)');

    // Enable (for mobile)
    if (mobile.matches) {
      if (!initSwiperSorces) {
        initSwiperSorces = true;
        swiperSources = new Swiper('.sources-slider', {
          speed: 500,
          slidesPerView: 1.1,
          spaceBetween: 10,
          scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
          },
          740: {
            spaceBetween: 30,
          },
        });
      }
    }
    // Disable (for desktop)
    else if (desktop.matches && initSwiperSorces) {
      swiperSources.destroy();
      initSwiperSorces = false;
    }
  }

  // Sort buttons
  if (document.querySelector('.sort-buttons')) {
    document.querySelectorAll('.sort-buttons .btn-default').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelector('.sort-buttons .btn-default.sort-active').classList.remove('sort-active');
        btn.classList.add('sort-active');
      })
    })
  }

  // Sort table
  if (document.querySelector('.sortable-table')) {
    document.querySelectorAll('.sortable-table').forEach(table => {
      const headers = table.querySelectorAll('th');
    
      headers.forEach((header, index) => {
        header.addEventListener('click', (e) => {
          if (e.target.classList.contains('sort-desc') || e.target.classList.contains('pa-arrow-down')) {
            if (table.querySelector('.sort-active')) {
              table.querySelector('.sort-active').classList.remove('sort-active');
            }
            e.target.closest('.sort-desc').classList.add('sort-active')
            sortTable(index, 'desc');
          } else if (e.target.classList.contains('sort-asc') || e.target.classList.contains('pa-arrow-up')) {
            if (table.querySelector('.sort-active')) {
              table.querySelector('.sort-active').classList.remove('sort-active');
            }
            e.target.closest('.sort-asc').classList.add('sort-active')
            sortTable(index, 'asc');
          }
        });
      });

      function sortTable(columnIndex, sortType) {
        const rows = Array.from(table.querySelectorAll('tr')).slice(1);

        rows.sort((a, b) => {
          const aValue = a.children[columnIndex].textContent.trim();
          const bValue = b.children[columnIndex].textContent.trim();

          if (!isNaN(aValue) && !isNaN(bValue)) {
            // Both values are numeric
            return parseFloat(aValue) - parseFloat(bValue);
          } else {
            // One or both values are non-numeric (treat as strings)
            return aValue.localeCompare(bValue);
          }
        });

        // Remove existing rows
        table.querySelectorAll('tr:not(:first-child)').forEach(tr => {
          tr.remove();
        })

        // Append sorted rows
        if (sortType == 'desc') {rows.reverse();}
        rows.forEach(row => {
          table.appendChild(row);
        });
      }
    })
  }

  // Accordion
  if (document.querySelector('.accordion')) {
    // (Optional) Active an item if it has the class "is-active"  
    // document.querySelector('.accordion-content .accordion-item.active');

    document.querySelectorAll('.accordion-content .accordion-item > .accordion-heading').forEach((item) => {
      item.addEventListener('click', function () {
        //event.preventDefault();
        let accordion = item.closest('.accordion');
        let content = item.parentNode.querySelector('.accordion-text');
        // Cancel the siblings
        if (item.parentNode.classList.contains('active')) {
          item.parentNode.classList.remove('active')
          content.style.maxHeight = 0;
        } else {
          if (!accordion.classList.contains('accordion-multiple') && document.querySelector('.accordion-content .accordion-item.active')) {
            document.querySelector('.accordion-content .accordion-item.active .accordion-text').style.maxHeight = 0;
            document.querySelector('.accordion-content .accordion-item.active').classList.remove('active');
          }
          // Toggle the item
          item.parentNode.classList.add('active');
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    })
  } 
});


(function () {
  /* Opening modal window function */
  function openModal() {
    /* Get trigger element */
    var modalTrigger = document.getElementsByClassName('jsModalTrigger');

    /* Set onclick event handler for all trigger elements */
    for (var i = 0; i < modalTrigger.length; i++) {
      modalTrigger[i].onclick = function () {
        var target = this.getAttribute('href').substr(1);
        var modalWindow = document.getElementById(target);

        modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open';
        document.querySelector('body').classList.add('unscroll');
       
      }
    }
  }

  function closeModal() {
    /* Get close button */
    var closeButton = document.getElementsByClassName('jsModalClose');
    var closeOverlay = document.getElementsByClassName('jsOverlay');
    var fullscreenButton = document.getElementsByClassName('jsModalFullscreen');

    /* Set onclick event handler for close buttons */
    for (var i = 0; i < closeButton.length; i++) {
      closeButton[i].onclick = function () {
        var modalWindow = this.closest('.modal');
        modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        document.querySelector('body').classList.remove('unscroll');
      }
    }

    /* Set onclick event handler for modal overlay */
    for (var i = 0; i < closeOverlay.length; i++) {
      closeOverlay[i].onclick = function () {
        var modalWindow = this.parentNode;

        modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        document.querySelector('body').classList.remove('unscroll');
      }
    }

    /* Set onclick event handler for modal overlay */
    for (var i = 0; i < fullscreenButton.length; i++) {
      fullscreenButton[i].onclick = function () {
        var modalWindow = this.closest('.modal');

        modalWindow.classList.toggle('fullscreen');
      }
    }

  }

  /* Handling domready event IE9+ */
  function ready(fn) {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  /* Triggering modal window function after dom ready */
  ready(openModal);
  ready(closeModal);
}());
