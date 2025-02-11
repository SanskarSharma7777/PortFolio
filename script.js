$(document).ready(function() {
  const $window = $(window);
  const $headerArea = $(".header-area");
  const $headerLinks = $(".header ul li a");
  const $form = document.forms['submitToGoogleSheet'];
  const $msg = $("#msg");

  // Debounce function to limit the rate at which a function can fire.
  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  // Sticky header
  $window.scroll(debounce(function() {
    if ($window.scrollTop() > 1) {
      $headerArea.addClass("sticky");
    } else {
      $headerArea.removeClass("sticky");
    }
    updateActiveSection();
  }, 50));

  // Smooth scroll and active link update
  $headerLinks.click(function(e) {
    e.preventDefault();
    const target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    const offset = target === "#home" ? 0 : $(target).offset().top - 40;
    $("html, body").animate({ scrollTop: offset }, 500);

    $headerLinks.removeClass("active");
    $(this).addClass("active");
  });

  // Initial content revealing
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", { origin: "left" });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", { origin: "right" });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .job", { origin: "right" });
  ScrollReveal().reveal(".project-title, .contact-title", { origin: "top" });
  ScrollReveal().reveal(".projects, .contact", { origin: "bottom" });

  // Additional animations
  ScrollReveal().reveal(".service-item", { origin: "bottom", distance: "50px", duration: 1000, delay: 300 });
  ScrollReveal().reveal(".testimonial", { origin: "left", distance: "50px", duration: 1000, delay: 400 });
  ScrollReveal().reveal(".footer", { origin: "top", distance: "50px", duration: 1000, delay: 500 });

  // Contact form submission
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';

  $form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData($form) })
      .then(response => {
        $msg.text("Message sent successfully");
        setTimeout(() => $msg.text(""), 5000);
        $form.reset();
      })
      .catch(error => console.error('Error!', error.message));
  });

  // Update active section in the header
  function updateActiveSection() {
    const scrollPosition = $window.scrollTop();

    if (scrollPosition === 0) {
      $headerLinks.removeClass("active");
      $headerLinks.filter("[href='#home']").addClass("active");
      return;
    }

    $("section").each(function() {
      const $this = $(this);
      const target = $this.attr("id");
      const offset = $this.offset().top;
      const height = $this.outerHeight();

      if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
        $headerLinks.removeClass("active");
        $headerLinks.filter(`[href='#${target}']`).addClass("active");
      }
    });
  }
});
