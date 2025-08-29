// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
}

// Mobile dropdown toggle
const dropdownLinks = document.querySelectorAll(".dropdown > a");

dropdownLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    if (window.innerWidth <= 992) {
      e.preventDefault();

      const parent = this.parentElement;

      // tutup dropdown lain biar gak numpuk
      document.querySelectorAll(".dropdown").forEach((d) => {
        if (d !== parent) d.classList.remove("open");
      });

      parent.classList.toggle("open");
    }
  });
});

// JS halaman sambutan
document.addEventListener('DOMContentLoaded', function() {
  console.log('Halaman Sambuatan Kepala Sekolah dimuat');
  
  // Animasi fade in untuk section sambutan
  const sambutanSection = document.querySelector('.sambutan-section');
  if (sambutanSection) {
    sambutanSection.style.opacity = '0';
    sambutanSection.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
      sambutanSection.style.opacity = '1';
    }, 100);
  }
  
  // Efek hover untuk foto kepala sekolah
  const kepalaSekolahPhoto = document.querySelector('.kepala-sekolah-photo');
  if (kepalaSekolahPhoto) {
    kepalaSekolahPhoto.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.03)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    kepalaSekolahPhoto.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  }
});

  // JS untuk halaman agenda
document.addEventListener('DOMContentLoaded', function() {
  console.log('Halaman Agenda dimuat');
  
  // Inisialisasi slider
  initAgendaSlider();
  
  // Animasi untuk section agenda
  const agendaSection = document.querySelector('.agenda-section');
  if (agendaSection) {
    agendaSection.style.opacity = '0';
    
    setTimeout(() => {
      agendaSection.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      agendaSection.style.opacity = '1';
    }, 100);
  }
  
  // Fungsi untuk tombol
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.transition = 'all 0.3s ease';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
    
    button.addEventListener('click', function() {
      if (this.classList.contains('btn-primary')) {
        alert('Terima kasih! Anda akan diarahkan ke formulir pendaftaran.');
      } else {
        alert('Detail acara akan ditampilkan di sini.');
      }
    });
  });
});

// Fungsi untuk inisialisasi slider agenda
function initAgendaSlider() {
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  let currentSlide = 0;
  const slideCount = slides.length;
  
  // Fungsi untuk update slider
  function updateSlider() {
    // Update slide visibility
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    
    // Update dots
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    
    // Update track position
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  
  // Event listener untuk tombol next
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      currentSlide = (currentSlide + 1) % slideCount;
      updateSlider();
    });
  }
  
  // Event listener untuk tombol previous
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      updateSlider();
    });
  }
  
  // Event listener untuk dots
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      const slideIndex = parseInt(this.getAttribute('data-slide'));
      currentSlide = slideIndex;
      updateSlider();
    });
  });
  
  // Auto slide (opsional)
  let slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
  }, 5000); // Ganti slide setiap 5 detik
  
  // Hentikan auto slide saat hover
  const slider = document.querySelector('.agenda-slider');
  if (slider) {
    slider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
      }, 5000);
    });
  }
  
  // Swipe untuk perangkat touch
  let touchStartX = 0;
  let touchEndX = 0;
  
  if (track) {
    track.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    track.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);
  }
  
  function handleSwipe() {
    const minSwipeDistance = 50; // Minimum jarak swipe
  
    if (touchStartX - touchEndX > minSwipeDistance) {
      // Swipe kiri - next slide
      currentSlide = (currentSlide + 1) % slideCount;
      updateSlider();
    } 
    
    if (touchEndX - touchStartX > minSwipeDistance) {
      // Swipe kanan - previous slide
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      updateSlider();
    }
  }
}

// Animasi untuk card berita saat di-scroll
document.addEventListener('DOMContentLoaded', function() {
    const newsCards = document.querySelectorAll('.news-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Hentikan observasi setelah elemen terlihat
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Terapkan animasi berurutan dengan delay
    newsCards.forEach((card, index) => {
        // Set delay berdasarkan urutan card
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Efek hover untuk card
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Tombol lihat lainnya dengan animasi
    const viewAllButton = document.querySelector('.view-all-button');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animasi sederhana pada klik
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Simulasi redirect (bisa diganti dengan fungsi sesuai kebutuhan)
            console.log('Tombol Lihat Lainnya diklik');
        });
    }
});

// Section Kerja sama
document.addEventListener('DOMContentLoaded', function() {
    // Logo Slider
    const logoSliderContainer = document.querySelector('.logo-slider .slider-container');
    const logoSlides = document.querySelectorAll('.logo-slide');
    const logoDots = document.querySelectorAll('.logo-slider .slider-dot');
    const logoPrevBtn = document.querySelector('.logo-slider .prev');
    const logoNextBtn = document.querySelector('.logo-slider .next');
    let currentLogoSlide = 0;

    function updateLogoSlider() {
        logoSliderContainer.style.transform = `translateX(-${currentLogoSlide * 100}%)`;
        
        // Update active dot
        logoDots.forEach((dot, index) => {
            if (index === currentLogoSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Next slide
    logoNextBtn.addEventListener('click', () => {
        currentLogoSlide = (currentLogoSlide + 1) % logoSlides.length;
        updateLogoSlider();
    });

    // Previous slide
    logoPrevBtn.addEventListener('click', () => {
        currentLogoSlide = (currentLogoSlide - 1 + logoSlides.length) % logoSlides.length;
        updateLogoSlider();
    });

    // Click on dot
    logoDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentLogoSlide = index;
            updateLogoSlider();
        });
    });

    // Auto slide every 5 seconds
    setInterval(() => {
        currentLogoSlide = (currentLogoSlide + 1) % logoSlides.length;
        updateLogoSlider();
    }, 5000);

    // Banner Slider
    const bannerContainer = document.querySelector('.banner-container');
    const bannerSlides = document.querySelectorAll('.banner-slide');
    const bannerDots = document.querySelectorAll('.banner-dot');
    const bannerPrevBtn = document.querySelector('.banner-prev');
    const bannerNextBtn = document.querySelector('.banner-next');
    let currentBannerSlide = 0;

    function updateBannerSlider() {
        bannerContainer.style.transform = `translateX(-${currentBannerSlide * 100}%)`;
        
        // Update active dot
        bannerDots.forEach((dot, index) => {
            if (index === currentBannerSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Next slide
    bannerNextBtn.addEventListener('click', () => {
        currentBannerSlide = (currentBannerSlide + 1) % bannerSlides.length;
        updateBannerSlider();
    });

    // Previous slide
    bannerPrevBtn.addEventListener('click', () => {
        currentBannerSlide = (currentBannerSlide - 1 + bannerSlides.length) % bannerSlides.length;
        updateBannerSlider();
    });

    // Click on dot
    bannerDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentBannerSlide = index;
            updateBannerSlider();
        });
    });

    // Auto slide every 5 seconds
    setInterval(() => {
        currentBannerSlide = (currentBannerSlide + 1) % bannerSlides.length;
        updateBannerSlider();
    }, 5000);
});

// Animasi untuk section profile
document.addEventListener('DOMContentLoaded', function() {
    const profileContent = document.querySelector('.profile-content');
    const detailItems = document.querySelectorAll('.detail-item');
    const achievementItems = document.querySelectorAll('.achievement-item');
    const images = document.querySelectorAll('.school-image, .small-image');

    // Observer options
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // IntersectionObserver
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                // Profile section
                if (entry.target.classList.contains('profile-content')) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }

                // Detail item (masuk dari kiri ke kanan)
                if (entry.target.classList.contains('detail-item')) {
                    setTimeout(() => {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateX(0)';
                    }, entry.target.dataset.delay || 0);
                }

                // Achievement item (masuk dari bawah ke atas)
                if (entry.target.classList.contains('achievement-item')) {
                    setTimeout(() => {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }, entry.target.dataset.delay || 0);
                }

                // Gambar
                if (entry.target.classList.contains('school-image') || entry.target.classList.contains('small-image')) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'scale(1)';
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Style awal untuk profile
    if (profileContent) {
        profileContent.style.opacity = 0;
        profileContent.style.transform = 'translateY(20px)';
        profileContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(profileContent);
    }

    // Style awal untuk detail item (kiri → kanan)
    detailItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateX(-40px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.dataset.delay = index * 150;
        observer.observe(item);
    });

    // Style awal untuk achievement item (bawah → atas)
    achievementItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(40px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.dataset.delay = index * 150;
        observer.observe(item);
    });

    // Style awal untuk gambar
    images.forEach(image => {
        image.style.opacity = 0;
        image.style.transform = 'scale(0.95)';
        image.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(image);
    });

    // Hover efek gambar kecil
    const smallImages = document.querySelectorAll('.small-image');
    smallImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        });

        image.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.08)';
        });
    });

    // Animasi tombol
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });

        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
});


// Sejarah secion
document.addEventListener('DOMContentLoaded', function() {
    console.log('Halaman Sejarah Sekolah dimuat');
    
    // Inisialisasi tab navigation
    initTabs();
    
    // Inisialisasi gallery modal
    initGalleryModal();
    
    // Animasi saat scroll
    animateOnScroll();
});

// Fungsi untuk tab navigation
function initTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Hapus class active dari semua tab dan konten
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Tambah class active ke tab yang diklik dan kontennya
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Fungsi untuk gallery modal
function initGalleryModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Tambah event listener untuk setiap tombol view
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const galleryItem = this.closest('.gallery-item');
            const imageSrc = galleryItem.querySelector('img').src;
            const imageTitle = galleryItem.querySelector('h3').textContent;
            const imageDesc = galleryItem.querySelector('p').textContent;
            
            modal.style.display = 'block';
            modalImg.src = imageSrc;
            modalCaption.textContent = `${imageTitle} - ${imageDesc}`;
        });
    });
    
    // Tutup modal saat klik tombol close
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Tutup modal saat klik di luar gambar
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Tutup modal dengan tombol ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Fungsi untuk animasi saat scroll
function animateOnScroll() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animasi khusus untuk milestone dan stat items
                if (entry.target.classList.contains('milestone') || 
                    entry.target.classList.contains('stat-item')) {
                    entry.target.style.transitionDelay = '0.2s';
                }
            }
        });
    }, observerOptions);
    
    // Element yang akan dianimate
    const elementsToAnimate = document.querySelectorAll(
        '.school-photo, .history-text, .gallery-item, .milestone, .stat-item'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Fungsi untuk efek parallax pada gambar sekolah
function initParallaxEffect() {
    const schoolPhoto = document.querySelector('.school-photo');
    
    if (schoolPhoto) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.2;
            schoolPhoto.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Panggil fungsi parallax
initParallaxEffect();


// JavaScript untuk halaman daftar guru
document.addEventListener('DOMContentLoaded', function() {
    console.log('Halaman Daftar Guru dimuat');
    
    // Inisialisasi toggle untuk fixed grid
    initFixedGridToggle();
    
    // Inisialisasi toggle untuk grid guru
    initGuruGridToggle();
    
    // Animasi saat scroll
    animateOnScroll();
});

// Fungsi untuk toggle fixed grid
function initFixedGridToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-detail-btn');
    const guruItems = document.querySelectorAll('.guru-fixed-item');
    
    toggleButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Tutup detail lainnya jika terbuka
            guruItems.forEach((item, itemIndex) => {
                if (itemIndex !== index && item.classList.contains('active')) {
                    item.classList.remove('active');
                    const icon = item.querySelector('i');
                    if (icon) {
                        icon.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Toggle item yang diklik
            guruItems[index].classList.toggle('active');
            
            // Update icon
            const icon = this.querySelector('i');
            if (guruItems[index].classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Tutup detail saat klik di luar
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.guru-fixed-item')) {
            guruItems.forEach(item => {
                item.classList.remove('active');
                const icon = item.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        }
    });
}

// Fungsi untuk toggle grid guru
function initGuruGridToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const guruItems = document.querySelectorAll('.guru-grid-item');
    
    toggleButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Tutup detail lainnya jika terbuka
            guruItems.forEach((item, itemIndex) => {
                if (itemIndex !== index && item.classList.contains('active')) {
                    item.classList.remove('active');
                    const icon = item.querySelector('i');
                    if (icon) {
                        icon.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Toggle item yang diklik
            guruItems[index].classList.toggle('active');
            
            // Update icon
            const icon = this.querySelector('i');
            if (guruItems[index].classList.contains('active')) {
                icon.style.transform = 'rotate(45deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Tutup detail saat klik di luar
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.guru-grid-item')) {
            guruItems.forEach(item => {
                item.classList.remove('active');
                const icon = item.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        }
    });
}

// Fungsi untuk animasi saat scroll
function animateOnScroll() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Element yang akan dianimate
    const elementsToAnimate = document.querySelectorAll(
        '.guru-fixed-item, .guru-grid-item'
    );
    
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// JavaScript untuk halaman akreditasi
// Animasi untuk halaman akreditasi
document.addEventListener('DOMContentLoaded', function() {
    // Elements to animate
    const accreditationInfo = document.querySelector('.accreditation-info');
    const descriptionItems = document.querySelectorAll('.description-item');
    const docItems = document.querySelectorAll('.doc-item');
    const benefitItems = document.querySelectorAll('.benefit-item');
    const ctaContent = document.querySelector('.cta-content');
    
    // Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('accreditation-info')) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
                
                if (entry.target.classList.contains('description-item')) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, entry.target.dataset.delay || 0);
                }
                
                if (entry.target.classList.contains('doc-item')) {
                    setTimeout(() => {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }, entry.target.dataset.delay || 0);
                }
                
                if (entry.target.classList.contains('benefit-item')) {
                    setTimeout(() => {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateX(0)';
                    }, entry.target.dataset.delay || 0);
                }
                
                if (entry.target.classList.contains('cta-content')) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Apply animations
    if (accreditationInfo) {
        accreditationInfo.style.opacity = 0;
        accreditationInfo.style.transform = 'translateY(20px)';
        accreditationInfo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(accreditationInfo);
    }
    
    descriptionItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.dataset.delay = index * 100;
        observer.observe(item);
    });
    
    docItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.dataset.delay = index * 100;
        observer.observe(item);
    });
    
    benefitItems.forEach((item, index) => {
        item.style.opacity = 0;
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-20px)';
        } else {
            item.style.transform = 'translateX(20px)';
        }
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.dataset.delay = index * 100;
        observer.observe(item);
    });
    
    if (ctaContent) {
        ctaContent.style.opacity = 0;
        ctaContent.style.transform = 'translateY(20px)';
        ctaContent.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(ctaContent);
    }
    
    // Hover effects for cards
    const cards = document.querySelectorAll('.detail-card, .description-item, .doc-item, .benefit-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // Button animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    
    const docImages = document.querySelectorAll('.doc-image');
    docImages.forEach(image => {
        image.addEventListener('click', function() {
            alert('Nih contoh Gambar nya diperbesar');
        });
    });
});