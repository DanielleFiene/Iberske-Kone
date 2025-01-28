const button = document.querySelector(".button-cruzado");

button.addEventListener("mouseenter", function(e) {
    createFireworks(e);
});

function createFireworks(e) {
    const numberOfParticles = 150; // Increased particles for a more intense effect
    const buttonRect = button.getBoundingClientRect(); // Get button position and size

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        
        // Randomize the starting position within the button (now including top-right corner)
        const startX = Math.random() * buttonRect.width;
        const startY = Math.random() * buttonRect.height;

        // Randomize angle and distance for movement
        const angle = Math.random() * 360;
        const distance = Math.random() * 250 + 100; // Increased distance for more spread
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        // Randomize the scale and color
        const scale = Math.random() * 2 + 0.5; // Larger particles
        const colors = [
            '#ff6347',  // Tomato (warm red)
            '#ff1493',  // Deep Pink (vivid pink)
            '#00bfff',  // Deep Sky Blue (bright blue)
            '#32cd32',  // Lime Green (vivid green)
            '#ff8c00',  // Dark Orange (strong orange)
            '#8a2be2',  // Blue Violet (vibrant purple)
            '#ff4500',  // Orange Red (intense red-orange)
            '#adff2f',  // Green Yellow (light lime green)
            '#dda0dd',  // Plum (soft purple)
            '#ff1493',  // Deep Pink (vibrant pink)
            '#ffff00',  // Yellow (classic bright yellow)
            '#7fff00',  // Chartreuse (lime yellow-green)
            '#ff69b4',  // Hot Pink (bright pink)
            '#00ff7f',  // Spring Green (bright green)
            '#ff00ff'   // Magenta (bright purple-pink)
          ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Set CSS variables for random movement, scale, and color
        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);
        particle.style.setProperty('--scale', scale);
        particle.style.backgroundColor = color;

        // Set the initial position of the particle
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;

        // Append particle to the button
        button.appendChild(particle);

        // Remove the particle after animation completes
        setTimeout(() => {
            particle.remove();
        }, 1000); // 1s to match the animation duration
    }
}
