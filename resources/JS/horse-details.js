fetch('./resources/horses.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch horse data');
    }
    return response.json();
  })
  .then(horses => {
    // Get the horse ID from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const horseId = parseInt(urlParams.get('id'), 10); // Ensure ID is an integer

    // Find the horse by ID in the JSON array
    const horse = horses.find(h => h.id === horseId);

    if (horse) {
      // Populate the page with horse details
      document.getElementById('horse-name').textContent = horse.name;
      document.getElementById('horse-breed').textContent = `${horse.breed}`;
      document.getElementById('horse-image').src = horse.image;
      document.getElementById('horse-image').alt = horse.name;
      document.getElementById('horse-gender').textContent = horse.gender;
      document.getElementById('horse-color').textContent = horse.color;
      document.getElementById('horse-age').textContent = `${horse.age} let`;
      document.getElementById('horse-discipline').textContent = horse.discipline.join(', ');
      document.getElementById('horse-size').textContent = `${horse.size} cm`;
      document.getElementById('horse-price').textContent = horse.price === "Na dotaz" ? "Na dotaz" : `${horse.price} €`;
      document.getElementById('horse-approved').innerHTML = horse.approvedForBreeding 
        ? '<span style="color: green;">✔</span>' 
        : '<span style="color: red;">✖</span>';
      document.getElementById('horse-xrays').innerHTML = horse['x-rays'] 
        ? '<span style="color: green;">✔</span>' 
        : '<span style="color: red;">✖</span>';
      
      // New fields for character and riding level
      document.getElementById('horse-character').textContent = `${horse.character}`;
      document.getElementById('horse-riding-level').textContent = `${horse.ridingLevel}`;

      // Scroll to the horse details section
      document.querySelector('.horse-details').scrollIntoView({
        behavior: 'smooth', // Smooth scroll effect
        block: 'start' // Align the top of the section with the top of the viewport
      });
    } else {
      // If the horse is not found, display an error message
      document.querySelector('.hero__content').innerHTML = '<h1>Kůň nenalezen</h1>';
    }
  })
  .catch(error => {
    console.error('Error loading horse data:', error);
    document.querySelector('.hero__content').innerHTML = '<h1>Chyba při načítání dat o koni</h1>';
  });
