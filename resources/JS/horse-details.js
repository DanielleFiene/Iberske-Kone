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
      
      // Calculate age dynamically
      function calculateAge(dateOfBirth) {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // If birth month hasn't occurred yet this year, subtract one year from age
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      }

      document.getElementById('horse-age').textContent = `${calculateAge(horse.dateOfBirth)} let`;

      document.getElementById('horse-discipline').textContent = horse.discipline.join(', ');
      document.getElementById('horse-size').textContent = `${horse.size} cm`;

      const horsePriceElement = document.getElementById('horse-price');
      const formattedPrice = typeof horse.price === "number" 
        ? horse.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") 
        : horse.price;
      horsePriceElement.textContent = horse.price === "Na dotaz" ? "Na dotaz" : `${formattedPrice} €`;

      document.getElementById('horse-approved').innerHTML = horse.approvedForBreeding 
        ? '<span style="color: green;">✔</span>' 
        : '<span style="color: red;">✖</span>';
      document.getElementById('horse-xrays').innerHTML = horse['x-rays'] 
        ? '<span style="color: green;">✔</span>' 
        : '<span style="color: red;">✖</span>';

      document.getElementById('horse-character').textContent = horse.character;
      document.getElementById('horse-riding-level').textContent = horse.ridingLevel;

      const horseVideoElement = document.getElementById('horse-video');

      if (horse.video) {
        if (horse.video.includes("youtube.com") || horse.video.includes("vimeo.com")) {
          const horseVideoEmbed = document.createElement('iframe');
          horseVideoEmbed.src = horse.video.replace("watch?v=", "embed/");
          horseVideoEmbed.width = "560";
          horseVideoEmbed.height = "315";
          horseVideoEmbed.allow = "fullscreen";
          horseVideoElement.appendChild(horseVideoEmbed);
        } else {
          const horseVideoLink = document.createElement('p');
          horseVideoLink.innerHTML = `<a href="${horse.video}" target="_blank" style="font-weight: 900; color: blue;">Watch Video</a>`;
          horseVideoElement.appendChild(horseVideoLink);
        }
      }

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

      updateSlide();

      window.scrollTo({
        top: document.querySelector('.horse-details').offsetTop,
        behavior: 'smooth'
      });
    } 
  });
