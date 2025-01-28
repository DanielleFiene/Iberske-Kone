// Function to trigger the breed filter when a hero title is clicked
function triggerBreedFilter(breed) {
    // Set the breed filter value to the clicked breed
    const breedSelect = document.getElementById('breed');
    breedSelect.value = breed;

    // Trigger the filter function after setting the breed
    filterHorses(); // Assuming filterHorses() is available in the global scope
    
    // Scroll the page down to the horses section smoothly
    const horseCardsSection = document.getElementById('horse-cards'); // or use any other section where horses are rendered
    horseCardsSection.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'start' // Align the top of the section with the viewport
    });
}

// Add event listeners to each breed title
document.getElementById('lusitano').addEventListener('click', function() {
    triggerBreedFilter('Lusitano');
});

document.getElementById('pre').addEventListener('click', function() {
    triggerBreedFilter('PRE');
});

document.getElementById('cruzado').addEventListener('click', function() {
    triggerBreedFilter('Cruzado');
});
