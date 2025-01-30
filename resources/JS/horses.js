// Store fetched horses for filtering
let horseData = [];

// Fetch horse data from the JSON file
fetch('./resources/horses.json')
  .then(response => response.json())
  .then(horses => {
    horseData = horses; // Store the data
    renderHorseCards(horses); // Initial render
  })
  .catch(error => console.error('Error loading horse data:', error));

// Function to render horse cards
function renderHorseCards(horses) {
  const horseCardsContainer = document.getElementById('horse-cards');
  horseCardsContainer.innerHTML = ''; // Clear existing cards

  horses.forEach(horse => {
    // Create a new horse card element
    const horseCard = document.createElement('div');
    horseCard.classList.add('horse-card');

    // Create the image element
    const horseImage = document.createElement('img');
    horseImage.src = horse.image;
    horseImage.alt = horse.name;

    // Create the horse details container
    const horseDetails = document.createElement('div');
    horseDetails.classList.add('horse-card__details');

    // Create the horse name, age, and price elements
    const horseName = document.createElement('h3');
    horseName.textContent = horse.name;

    const horseBreed = document.createElement('p');
    horseBreed.innerHTML = `<span style="font-weight: 900">Plemeno:</span> ${horse.breed}`;

    const horseGender = document.createElement('p');
    horseGender.innerHTML = `<span style="font-weight: 900">Pohlaví:</span> ${horse.gender}`;

    const horseColor = document.createElement('p');
    horseColor.innerHTML = `<span style="font-weight: 900">Barva:</span> ${horse.color}`;

    const horseAge = document.createElement('p');
    horseAge.innerHTML = `<span style="font-weight: 900">Věk:</span> ${horse.age}`;

    const horseDiscipline = document.createElement('p');
    horseDiscipline.innerHTML = `<span style="font-weight: 900">Vhodný pro:</span> ${horse.discipline.join(', ')}`;    

    const horseSize = document.createElement('p');
    horseSize.innerHTML = `<span style="font-weight: 900">Výška:</span> ${horse.size}`;

    const horsePrice = document.createElement('p');
    // Format the price with a dot separator (e.g., "20.500")
    const formattedPrice = horse.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    horsePrice.innerHTML = `<span style="font-weight: 900">Cena:</span> ${formattedPrice} €`;

    // approved for breeding indicator
    const horseApproved = document.createElement('p');
    horseApproved.classList.add('horse-xrays');
    if (horse["approvedForBreeding"]) {
      horseApproved.innerHTML = '<span style="font-weight: 900">Uchovnění:</span> <span style="color: green;">✔</span>';
    } else {
      horseApproved.innerHTML = '<span style="font-weight: 900">Uchovnění:</span> <span style="color: red;">✖</span>';
    }

    // X-ray indicator
    const horseXRays = document.createElement('p');
    horseXRays.classList.add('horse-xrays');
    if (horse["x-rays"]) {
      horseXRays.innerHTML = '<span style="font-weight: 900">Má RTG:</span> <span style="color: green;">✔</span>';
    } else {
      horseXRays.innerHTML = '<span style="font-weight: 900">Má RTG:</span> <span style="color: red;">✖</span>';
    }

    // Append the elements to the card
    horseDetails.appendChild(horseName);
    horseDetails.appendChild(horseBreed);
    horseDetails.appendChild(horseColor);
    horseDetails.appendChild(horseGender);
    horseDetails.appendChild(horseAge);    
    horseDetails.appendChild(horseDiscipline);
    horseDetails.appendChild(horseSize);
    horseDetails.appendChild(horseApproved);
    horseDetails.appendChild(horseXRays);
    horseDetails.appendChild(horsePrice);


    // Wrap the horse card in a link element
    const horseLink = document.createElement('a');
    horseLink.href = `horse-details.html?id=${horse.id}`;
    horseLink.target = '_blank';
    horseLink.classList.add('no-underline');
    horseLink.appendChild(horseImage);
    horseLink.appendChild(horseDetails);

    // Append the link to the card container
    horseCard.appendChild(horseLink);

    // Append the horse card to the container
    horseCardsContainer.appendChild(horseCard);
  });
}

// Function to filter horses based on selected filters
function filterHorses() {
  const breedFilter = document.getElementById('breed').value;
  const genderFilter = document.getElementById('gender').value;
  const ageFilter = document.getElementById('age').value;
  const disciplineFilter = document.getElementById('discipline').value;
  const sizeFilter = document.getElementById('size').value;
  const priceFilter = document.getElementById('price').value;
  const approvedFilter = document.getElementById('approved').value;
  const colorFilter = document.getElementById('color').value;  // Added for color filter

  // Filter horses based on selected filter values
  const filteredHorses = horseData.filter(horse => {
      // Apply filter for each category if it's not "all"
      const isBreedMatch = breedFilter === 'all' || horse.breed === breedFilter;

      // Check if the selected discipline matches the horse's disciplines
      const isDisciplineMatch = disciplineFilter === 'all' || horse.discipline.includes(disciplineFilter);

      // Size filtering logic
      let isSizeMatch = false;
      if (sizeFilter === 'all') {
          isSizeMatch = true; // No size filter applied
      } else if (sizeFilter === 'below-160') {
          isSizeMatch = parseFloat(horse.size) <= 160;
      } else if (sizeFilter === '160-170') {
          isSizeMatch = parseFloat(horse.size) >= 160 && parseFloat(horse.size) <= 170;
      } else if (sizeFilter === 'above-170') {
          isSizeMatch = parseFloat(horse.size) >= 170;
      }

      // Price filtering logic
      let isPriceMatch = false;
      if (priceFilter === 'all') {
          isPriceMatch = true; // No price filter applied
      } else if (priceFilter === 'below-5000') {
          isPriceMatch = parseInt(horse.price.replace('€', '').replace(',', '')) <= 5000;
      } else if (priceFilter === '5000-10000') {
          isPriceMatch = parseInt(horse.price.replace('€', '').replace(',', '')) >= 5000 && parseInt(horse.price.replace('€', '').replace(',', '')) <= 10000;
      } else if (priceFilter === '10000-15000') {
          isPriceMatch = parseInt(horse.price.replace('€', '').replace(',', '')) >= 10000 && parseInt(horse.price.replace('€', '').replace(',', '')) <= 15000;
      } else if (priceFilter === '15000-25000') {
          isPriceMatch = parseInt(horse.price.replace('€', '').replace(',', '')) >= 15000 && parseInt(horse.price.replace('€', '').replace(',', '')) <= 25000;
      } else if (priceFilter === 'above-25000') {
          isPriceMatch = parseInt(horse.price.replace('€', '').replace(',', '')) >= 25000;
      } else if (priceFilter === 'on-request') {
          isPriceMatch = horse.price === 'Na dotaz';
      }

      // Gender filtering logic
      let isGenderMatch = false;
      if (genderFilter === 'all') {
          isGenderMatch = true; // No gender filter applied
      } else {
          isGenderMatch = horse.gender === genderFilter;
      }

      // Age filtering logic
      let isAgeMatch = false;
      if (ageFilter === 'all') {
          isAgeMatch = true; // No age filter applied
      } else {
          // Extract numerical age from the horse's "age" string (e.g., "6 let" -> 6)
          const horseAge = parseInt(horse.age); 

          // Split the age filter (e.g., "0-1" -> [0, 1])
          const [minAge, maxAge] = ageFilter.split('-').map(val => {
              if (val === "15+") return 15; // Special case for "15+" age filter
              return parseInt(val);
          });

          if (maxAge) {
              // Check if horse's age is within the selected range
              isAgeMatch = horseAge >= minAge && horseAge <= maxAge;
          } else {
              // For the "15+" case, we only check if horse's age is greater than or equal to 15
              isAgeMatch = horseAge >= minAge;
          }
      }

      // "approvedForBreeding" filtering logic
      let isApprovedMatch = false;
      if (approvedFilter === 'all') {
          isApprovedMatch = true; // No "approvedForBreeding" filter applied
      } else if (approvedFilter === 'ano') {
          isApprovedMatch = horse.approvedForBreeding === true;
      } else if (approvedFilter === 'ne') {
          isApprovedMatch = horse.approvedForBreeding === false;
      }

      // Color filtering logic (added here)
      let isColorMatch = false;
      if (colorFilter === 'all') {
          isColorMatch = true; // No color filter applied
      } else {
          isColorMatch = horse.color === colorFilter; // Match the horse's color with the selected filter
      }

      // Return true if all conditions match, otherwise false
      return isBreedMatch && isGenderMatch && isAgeMatch && isDisciplineMatch && isSizeMatch && isPriceMatch && isApprovedMatch && isColorMatch;
  });

  renderHorseCards(filteredHorses); // Render the filtered horses
}

// Add event listener to the "Hledat" button
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', filterHorses);
