// Function to animate the 'my_bio_text' element
function animateBioText() {
    const bioText = document.querySelector('.my_bio_text');
    bioText.style.opacity = '1';
    bioText.style.transform = 'translateY(0)';

    // Fade in the anchor tags after the 'my_bio_text' animation ends
    bioText.addEventListener('transitionend', () => {
        const anchorTags = document.querySelectorAll('.my_bio_text .my_btns');
        anchorTags.forEach(tag => tag.style.opacity = '1');
    });
}

// Function to animate the 'my_about_below' element
function animateAboutBelow() {
    const aboutBelow = document.querySelector('.my_about_below');
    aboutBelow.style.opacity = '1';
    aboutBelow.style.transform = 'translateY(0)';

    // Fade in the anchor tags after the 'my_about_below' animation ends
    aboutBelow.addEventListener('transitionend', () => {
        const anchorTags = document.querySelectorAll('.my_about_below a');
        anchorTags.forEach(tag => tag.style.opacity = '1');
    });
}

// Function to highlight navigation links based on the current page
function highlightNavLinks() {
    const navLinks = document.querySelectorAll('.my_nav_link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// Function to setup smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}



// Centralized event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    animateBioText();
    animateAboutBelow();
    highlightNavLinks();
});


// SHOW FULL SCREEN IMAGES
function openModal(imgElement) {
    // Get the modal
    var modal = document.getElementById("photoModal");

    // Get the image and insert it inside the modal
    var modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = imgElement.src;

    // Prevent event bubbling when clicking on the image
    modalImg.onclick = function(event) {
        event.stopPropagation();
    }

    // Close the modal if the user clicks outside the image
    modal.onclick = function() {
        modal.style.display = "none";
    }
}

// Close modal when the user clicks on the cancel button
document.getElementById("cancelButton").onclick = function() {
    document.getElementById("photoModal").style.display = "none";
}

// Close modal when the user clicks on the close icon
document.getElementById("closeModal").onclick = function() {
    document.getElementById("photoModal").style.display = "none";
}
