// app.js
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav div a');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            // Hide all sections
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // Show the selected section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).style.display = 'block';
        });
    });

    // Optionally, show the default section
    document.getElementById('about').style.display = 'block';
});
