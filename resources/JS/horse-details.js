fetch('./resources/horses.json')
  .then(response => response.json())
  .then(horses => {
    const urlParams = new URLSearchParams(window.location.search);
    const horseId = parseInt(urlParams.get('id'), 10);
    const horse = horses.find(h => h.id === horseId);

    if (horse) {
      document.getElementById('horse-name').textContent = horse.name;
      document.getElementById('horse-breed').textContent = horse.breed;
      document.getElementById('horse-gender').textContent = horse.gender;
      document.getElementById('horse-color').textContent = horse.color;
      document.getElementById('horse-age').textContent = `${horse.age} let`;
      document.getElementById('horse-discipline').textContent = horse.discipline.join(', ');
      document.getElementById('horse-size').textContent = `${horse.size} cm`;
      
      const horsePriceElement = document.getElementById('horse-price');
      // Format the price with a dot separator (e.g., "20.500") and no euro sign on na dotaz
      const formattedPrice = typeof horse.price === "number" 
        ? horse.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") 
        : horse.price;
      horsePriceElement.textContent = horse.price === "Na dotaz" ? "Na dotaz" : `${formattedPrice} €`;

       // Approved for breeding
      document.getElementById('horse-approved').innerHTML = horse.approvedForBreeding 
        ? '<span style="color: green;">✔</span>' 
        : '<span style="color: red;">✖</span>';
      document.getElementById('horse-xrays').innerHTML = horse['x-rays'] 
        ? '<span style="color: green;">✔</span>' 
        : '<span style="color: red;">✖</span>';

      document.getElementById('horse-character').textContent = horse.character;
      document.getElementById('horse-riding-level').textContent = horse.ridingLevel;

      // Check if a video exists and embed it
      const horseVideoElement = document.getElementById('horse-video'); // Make sure this element exists in your HTML

      if (horse.video) {
        if (horse.video.includes("youtube.com") || horse.video.includes("vimeo.com")) {
          const horseVideoEmbed = document.createElement('iframe');
          horseVideoEmbed.src = horse.video.replace("watch?v=", "embed/"); // Convert YouTube link to embed format
          horseVideoEmbed.width = "560";
          horseVideoEmbed.height = "315";
          horseVideoEmbed.allow = "fullscreen";
          horseVideoElement.appendChild(horseVideoEmbed); // Append it to the video section
        } else {
          // For other video links, just show a normal clickable link
          const horseVideoLink = document.createElement('p');
          horseVideoLink.innerHTML = `<a href="${horse.video}" target="_blank" style="font-weight: 900; color: blue;">Watch Video</a>`;
          horseVideoElement.appendChild(horseVideoLink);
        }
      }

      // Slideshow
      let slideshowImages = horse.slideshow;
      let currentSlide = 0;
      const slideshowElement = document.getElementById('horse-slideshow');

      function updateSlide() {
        slideshowElement.src = slideshowImages[currentSlide];
      }

      document.getElementById('prev-slide').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideshowImages.length) % slideshowImages.length;
        updateSlide();
      });

      document.getElementById('next-slide').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideshowImages.length;
        updateSlide();
      });

      updateSlide(); // Initialize the first slide

      window.scrollTo({
        top: document.querySelector('.horse-details').offsetTop, // Scroll to the top of the horse details section
        behavior: 'smooth' // Smooth scroll animation
      });

    } 
  });
