let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

document.addEventListener('DOMContentLoaded', function() {
    if (slides.length > 0) {
        initializeSlideshow();
    }

    initializeNavigation();

    if (document.querySelector('.gallery-main')) {
        initializeGallery();
    }

    if (document.querySelector('.community-main')) {
        initializeCommunityTabs();
    }
});

function initializeSlideshow() {
    if (slides.length === 0) {
        console.warn('No slides found');
        return;
    }
    
    showSlide(0);
    setInterval(nextSlide, 5000);
}

function showSlide(index) {
    if (index < 0 || index >= slides.length) {
        console.warn('Invalid slide index:', index);
        return;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    
    if (indicators.length === slides.length) {
        indicators.forEach(indicator => indicator.classList.remove('active'));
        indicators[index].classList.add('active');
    }
    
    slides[index].classList.add('active');
    currentSlideIndex = index;
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
}

function changeSlide(direction) {
    if (direction === 1) {
        nextSlide();
    } else {
        prevSlide();
    }
}

function currentSlide(index) {
    showSlide(index - 1);
}

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

function initializeGallery() {
    const tagButtons = document.querySelectorAll('.tag[data-tag]');
    const tagSections = document.querySelectorAll('.tag-section');

    tagButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTag = this.dataset.tag;
            
            tagButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            tagSections.forEach(section => {
                if (section.id === targetTag) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });
}

function openModal(title, artist, imageSrc, description) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalArtist = document.getElementById('modal-artist');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');

    if (modal && modalTitle && modalArtist && modalImage && modalDescription) {
        modalTitle.textContent = title;
        modalArtist.textContent = `by: ${artist}`;
        modalImage.src = imageSrc;
        modalImage.alt = title;
        modalDescription.textContent = description;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

window.addEventListener('click', function(e) {
    const modal = document.getElementById('modal');
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

function initializeCommunityTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            tabContents.forEach(content => {
                if (content.id === targetTab) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            const query = this.value.toLowerCase();
            filterContent(query);
        }, 300));
    }
}