document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const answer = button.nextElementSibling;
        answer.style.display = answer.style.display === "block" ? "none" : "block";
    });
});

// Loop through each FAQ question button
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        // Toggle the corresponding arrow's 'active' class
        const arrow = button.querySelector('.fa-chevron-down');
        arrow.classList.toggle('active');
    });
});
