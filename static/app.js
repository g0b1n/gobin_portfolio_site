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


// highlight nav tags to indicate the current page

document.addEventListener('DOMContentLoaded', (event) => {
    const navLinks = document.querySelectorAll('.my_nav_link');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});


// animate and design home page 

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
