const modal = document.getElementById('cdModal');
const closeBtn = document.querySelector('.close-btn');

function openModal(data) {
    document.getElementById('modalArtist').textContent = data.artist;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDescription').textContent = data.description;
    document.getElementById('modalImage').src = data.image;

    const videoContainer = document.getElementById('videoContainer');
    if (data.video) {
        videoContainer.style.display = 'block';
        document.getElementById('videoFrame').src = data.video;
    } else {
        videoContainer.style.display = 'none';
    }

    // Gallery
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = '';
    data.gallery.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.className = 'gallery-img';
        gallery.appendChild(imgElement);
    });

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('videoFrame').src = '';
}

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});
