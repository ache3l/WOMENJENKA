//contact form
if (document.getElementById("contactForm")) {
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var name = document.getElementById("name").value;
      var email = document.getElementById("email-c").value;
      var phone = document.getElementById("phone").value;
      var message = document.getElementById("message").value;

      // You can now use these variables to send a request to your server
      // For demonstration, I'm just logging them to the console
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Phone:", phone);
      console.log("Message:", message);

      var data = JSON.stringify({
        formType: "contactForm",
        name: name,
        email: email,
        phone: phone,
        message: message,
      });

      // Fetch API to send the POST request
      fetch(
        "https://pxq0vxh504.execute-api.ap-southeast-2.amazonaws.com/dev/submit-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          document.getElementById("contactForm").classList.add("hidden");
          document
            .getElementById("thankyou-contactForm")
            .classList.remove("hidden");
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      document.getElementById("contact-submit").innerText = "Submitting...";
      // document.getElementById("contactForm").reset();

      // Here you would typically send the data to the server
      // using something like an AJAX request or fetch API.

      // For now, we'll just show an alert
      // alert("Form Submitted! Check the console for the data.");
    });
}

//subscriptionForm form
if (document.getElementById("subscriptionForm")) {
  document
    .getElementById("subscriptionForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var email = document.getElementById("email").value;

      // Prepare data to be sent in the POST request
      var data = JSON.stringify({
        formType: "subscriptionForm",
        email: email,
      });

      // Fetch API to send the POST request
      fetch(
        "https://pxq0vxh504.execute-api.ap-southeast-2.amazonaws.com/dev/submit-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: data,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          document.getElementById("subscriptionForm").classList.add("hidden");
          document
            .getElementById("thankyou-subscribing")
            .classList.remove("hidden");
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      // Optionally, clear the form
      // document.getElementById("subscriptionForm").reset();
      document.getElementById("subscription-submit").innerText =
        "Submitting...";
    });
}

// Toggle mobile menu
const mobileMenuButton = document.querySelector("button.mobile-menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

if (mobileMenuButton) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Toggle dropdown menu
const dropdownButton = document.getElementById("dropdown-button");
const dropdownMenu = document.getElementById("dropdown-menu");

if (dropdownButton) {
  dropdownButton.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
  });
}

// Carousel Component
document.addEventListener("DOMContentLoaded", function () {
  const carouselItems = document.querySelectorAll(".carousel-item");
  if (carouselItems.length > 0) {
    let currentIndex = 0;
    let slideInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    const carouselInner = document.querySelector(".carousel-inner");

    function updateSlidePosition() {
      const offset = currentIndex * -100;
      carouselInner.style.transform = `translateX(${offset}%)`;
    }

    function goToNextSlide() {
      currentIndex = (currentIndex + 1) % carouselItems.length;
      updateSlidePosition();
    }

    function goToPrevSlide() {
      currentIndex =
        (currentIndex - 1 + carouselItems.length) % carouselItems.length;
      updateSlidePosition();
    }

    function handleTouchStart(evt) {
      touchStartX = evt.touches[0].clientX;
    }

    function handleTouchMove(evt) {
      touchEndX = evt.touches[0].clientX;
    }

    function handleTouchEnd() {
      if (touchStartX - touchEndX > 50) {
        goToNextSlide();
      } else if (touchEndX - touchStartX > 50) {
        goToPrevSlide();
      }
    }

    carouselInner.addEventListener("touchstart", handleTouchStart, false);
    carouselInner.addEventListener("touchmove", handleTouchMove, false);
    carouselInner.addEventListener("touchend", handleTouchEnd, false);

    const prevButton = document.querySelector(".carousel-control-prev");
    const nextButton = document.querySelector(".carousel-control-next");

    if (prevButton && nextButton) {
      prevButton.addEventListener("click", goToPrevSlide);
      nextButton.addEventListener("click", goToNextSlide);
    }

    function startSlideInterval() {
      slideInterval = setInterval(goToNextSlide, 5000);
    }

    startSlideInterval();

    // Update the slide position initially
    updateSlidePosition();
  }
});

function toggleAccordion(contentId, header) {
  var content = document.getElementById(contentId);
  var icon = header.querySelector("span");

  if (content.classList.contains("hidden")) {
    content.classList.remove("hidden");
    icon.classList.remove("fa-plus");
    icon.classList.add("fa-minus");
  } else {
    content.classList.add("hidden");
    icon.classList.remove("fa-minus");
    icon.classList.add("fa-plus");
  }
}

function openPopup(imageSrc) {
  document.getElementById("popup-img").src = imageSrc;
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

// Event listener for closing popup when clicking outside the image
if (document.getElementById("popup")) {
  document.getElementById("popup").addEventListener("click", function (event) {
    if (event.target === this) {
      closePopup();
    }
  });
}
