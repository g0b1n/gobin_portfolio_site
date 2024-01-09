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

// Function to initialize and start the background image slideshow
function startSlideshow() {
    const images = document.querySelectorAll('#slideshow img');
    let currentImageIndex = 0;

    function nextImage() {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    }

    setInterval(nextImage, 5000); // Change image every 5 seconds
}

// Function to load background images from the server
// function loadBackgroundImages() {
//     fetch('/get-background-images')
//         .then(response => response.json())
//         .then(images => {
//             console.log("Images received:", images) // to check received images
//             const bioTextDiv = document.querySelector('.my_bio_text');
//             if(images.length > 0) {
//                 // Set the first image as the background
//                 bioTextDiv.style.backgroundImage = `url(${images[0]})`;
//                 console.log("Backgroung set to:", images[0]); // To confirm the background is set

//                 // Optional: To cycle through images
//                 let currentImageIndex = 0;
//                 setInterval(() => {
//                     bioTextDiv.style.backgroundImage = `url(${images[currentImageIndex]})`;
//                     currentImageIndex = (currentImageIndex + 1) % images.length;
//                 }, 5000); // Change every 5 seconds
//             }
            
//         });
//         .catch(error => console.error('Error loading images:', error));
// }

function loadBackgroundImages() {
    fetch('/get-background-images')
        .then(response => response.json())
        .then(images => {
            if (images.length > 0) {
                const bioTextDiv = document.querySelector('.my_bio_text');
                let currentImageIndex = 0;

                function updateBackgroundImage() {
                    bioTextDiv.style.backgroundImage = `url(${images[currentImageIndex]})`;
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                }

                // Initially set the background image
                updateBackgroundImage();

                // Change the background image every 5 seconds
                setInterval(updateBackgroundImage, 5000);
            }
        })
        .catch(error => console.error('Error loading images:', error));
}


// function loadBackgroundImages() {
//     const bioTextDiv = document.querySelector('.my_bio_text');
//     bioTextDiv.style.backgroundImage = "url('/images/totoApp.png')";
// }




// Centralized event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    animateBioText();
    animateAboutBelow();
    highlightNavLinks();
    setupSmoothScrolling();
    loadBackgroundImages();
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
