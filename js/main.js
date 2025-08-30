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
    const bannerContainer = document.querySelector('.banner-containers');
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

// JavaScript untuk halaman fasilitas
document.addEventListener('DOMContentLoaded', function() {
    console.log('Halaman Fasilitas dimuat');
    
    // Inisialisasi efek hover untuk fasilitas
    initFasilitasHover();
    
    // Animasi saat scroll
    animateOnScroll();
    
    // Tambahan efek interaktif
    initAdditionalEffects();
});

// Fungsi untuk efek hover pada fasilitas
function initFasilitasHover() {
    const fasilitasItems = document.querySelectorAll('.fasilitas-item');
    
    fasilitasItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const image = this.querySelector('.fasilitas-image img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const image = this.querySelector('.fasilitas-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
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
                
                // Animasi khusus untuk info items
                if (entry.target.classList.contains('info-item')) {
                    const icon = entry.target.querySelector('.info-icon');
                    if (icon) {
                        icon.style.transform = 'scale(1)';
                        icon.style.transition = 'transform 0.5s ease 0.2s';
                    }
                }
            }
        });
    }, observerOptions);
    
    // Element yang akan dianimate
    const elementsToAnimate = document.querySelectorAll(
        '.fasilitas-item, .info-item'
    );
    
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Fungsi untuk efek tambahan
function initAdditionalEffects() {
    const infoItems = document.querySelectorAll('.info-item');
    
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.info-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.info-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Efek parallax sederhana pada gambar fasilitas
    const fasilitasImages = document.querySelectorAll('.fasilitas-image');
    
    fasilitasImages.forEach(image => {
        image.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            const img = this.querySelector('img');
            img.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        });
        
        image.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1) translate(0, 0)';
            img.style.transition = 'transform 0.5s ease';
        });
    });
}

// Fungsi untuk filter fasilitas (jika diperlukan di masa depan)
function initFasilitasFilter() {
    console.log('Filter functionality can be implemented here when needed');
}

// Javascript Program section
document.addEventListener('DOMContentLoaded', function() {
    console.log('Halaman Program dimuat');
    
    // Inisialisasi tab navigation
    initTabs();
    
    // Animasi saat scroll
    animateOnScroll();
    
    // Efek hover untuk gallery
    initGalleryHover();
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
                
                // Animasi khusus untuk program items
                if (entry.target.classList.contains('program-item')) {
                    const icon = entry.target.querySelector('.program-icon');
                    if (icon) {
                        icon.style.transform = 'scale(1)';
                        icon.style.transition = 'transform 0.5s ease 0.2s';
                    }
                }
            }
        });
    }, observerOptions);
    
    // Element yang akan dianimate
    const elementsToAnimate = document.querySelectorAll(
        '.gallery-item, .program-item'
    );
    
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Fungsi untuk efek hover gallery
function initGalleryHover() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const image = this.querySelector('.gallery-image img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const image = this.querySelector('.gallery-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

// Fungsi untuk efek parallax pada gambar gallery
function initGalleryParallax() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(image => {
        image.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            const img = this.querySelector('img');
            img.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        });
        
        image.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            img.style.transform = 'scale(1) translate(0, 0)';
            img.style.transition = 'transform 0.5s ease';
        });
    });
}

// Panggil fungsi parallax
initGalleryParallax();


// JavaScript untuk halaman prestasi
document.addEventListener('DOMContentLoaded', function() {
    console.log('Halaman Prestasi dimuat');
    
    // Inisialisasi animasi timeline
    initTimelineAnimation();
    
    // Inisialisasi efek hover
    initHoverEffects();
    
    // Inisialisasi counter animation
    initCounterAnimation();
});

// Fungsi untuk animasi timeline
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Delay berbeda untuk setiap item
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animasi untuk year dan icon
                    const year = entry.target.querySelector('.timeline-year');
                    const icon = entry.target.querySelector('.timeline-icon');
                    
                    if (year) {
                        year.style.transform = 'scale(1)';
                        year.style.transition = 'transform 0.5s ease 0.2s';
                    }
                    
                    if (icon) {
                        icon.style.transform = 'scale(1)';
                        icon.style.transition = 'transform 0.5s ease 0.3s';
                    }
                }, index * 200);
            }
        });
    }, observerOptions);
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Fungsi untuk efek hover
function initHoverEffects() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const details = this.querySelector('.timeline-details');
            if (details) {
                details.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const details = this.querySelector('.timeline-details');
            if (details) {
                details.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            }
        });
    });
}

// Fungsi untuk animasi counter
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.prestasi-stats');
    
    let animated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    let current = 0;
                    const duration = 2000;
                    const increment = target / (duration / 20);
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            clearInterval(timer);
                            stat.textContent = target + '+';
                        } else {
                            stat.textContent = Math.floor(current) + '+';
                        }
                    }, 20);
                });
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Fungsi untuk smooth scroll (jika ada anchor links)
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Panggil smooth scroll
initSmoothScroll();

// JavaScript untuk halaman hiring
document.addEventListener('DOMContentLoaded', function() {
    console.log('Halaman Informasi Hiring dimuat');
    
    // Inisialisasi slider lowongan
    initLowonganSlider();
    
    // Animasi saat scroll
    animateOnScroll();
    
    // Event handler untuk tombol daftar
    initDaftarButtons();
});

// Fungsi untuk slider lowongan
function initLowonganSlider() {
    const track = document.querySelector('.slider-tracker');
    const slides = document.querySelectorAll('.slider');
    const dots = document.querySelectorAll('.slider-dotss .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let visibleSlides = getVisibleSlides();
    
    // Fungsi untuk mendapatkan jumlah slide yang terlihat
    function getVisibleSlides() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    // Fungsi untuk update slider
    function updateSlider() {
        const slideWidth = 100 / visibleSlides;
        track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Tombol next
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentSlide < slideCount - visibleSlides) {
                currentSlide++;
                updateSlider();
            }
        });
    }
    
    // Tombol prev
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        });
    }
    
    // Klik dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            currentSlide = slideIndex;
            updateSlider();
        });
    });
    
    // Resize window responsif
    window.addEventListener('resize', function() {
        const newVisibleSlides = getVisibleSlides();
        if (newVisibleSlides !== visibleSlides) {
            visibleSlides = newVisibleSlides;
            currentSlide = 0;
            updateSlider();
        }
    });
    
    // Auto slide
    let slideInterval = setInterval(() => {
        if (currentSlide < slideCount - visibleSlides) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        updateSlider();
    }, 5000);
    
    // Pause saat hover
    const slider = document.querySelector('.lowongan-slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                if (currentSlide < slideCount - visibleSlides) {
                    currentSlide++;
                } else {
                    currentSlide = 0;
                }
                updateSlider();
            }, 5000);
        });
    }
    
    // Swipe untuk mobile
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
        const minSwipeDistance = 50;
    
        if (touchStartX - touchEndX > minSwipeDistance) {
            // Swipe kiri - next
            if (currentSlide < slideCount - visibleSlides) {
                currentSlide++;
                updateSlider();
            }
        } 
        
        if (touchEndX - touchStartX > minSwipeDistance) {
            // Swipe kanan - prev
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            }
        }
    }

    // Inisialisasi awal
    updateSlider();
}

// javascript untuk sekolah
// JavaScript untuk halaman berita
document.addEventListener('DOMContentLoaded', function() {
    console.log('Halaman Berita dimuat');
    
    // Inisialisasi fungsi berita
    initBerita();
    
    // Animasi saat scroll
    animateOnScroll();
    
    // Event handler untuk tombol load more
    initLoadMore();
});

// Fungsi untuk inisialisasi berita
function initBerita() {
    // Tambahkan event listener untuk card berita
    const beritaCards = document.querySelectorAll('.berita-card');
    
    beritaCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Cegah navigasi jika yang diklik adalah link
            if (!e.target.closest('.berita-link')) {
                const link = this.querySelector('.berita-link');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
        
        // Efek hover tambahan
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
            const image = this.querySelector('.berita-image img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.berita-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    // Efek untuk link baca selengkapnya
    const beritaLinks = document.querySelectorAll('.berita-link');
    beritaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation(); // Mencegah event bubbling ke card
            // Tambahkan efek loading atau tracking di sini
            console.log('Membuka berita:', this.closest('.berita-card').querySelector('.berita-title').textContent);
        });
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
    const elementsToAnimate = document.querySelectorAll('.berita-card');
    
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Fungsi untuk tombol load more
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulasi loading
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memuat...';
            this.disabled = true;
            
            // Simulasi pengambilan data
            setTimeout(() => {
                // Reset button
                this.innerHTML = '<i class="fas fa-plus"></i> Muat Lebih Banyak';
                this.disabled = false;
                
                // Tampilkan notifikasi
                showNotification('Tidak ada berita lagi untuk dimuat', 'info');
            }, 1500);
        });
    }
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message, type = 'info') {
    // Hapus notifikasi sebelumnya jika ada
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideInUp 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove setelah 5 detik
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Helper function untuk notifikasi
function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': '#4caf50',
        'error': '#f44336',
        'warning': '#ff9800',
        'info': '#2196f3'
    };
    return colors[type] || '#2196f3';
}

// Tambahkan style untuk notifikasi
const notificationStyles = `
@keyframes slideInUp {
    from {
        transform: translateY(100px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.notification button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    margin-left: 1rem;
    opacity: 0.7;
    transition: opacity 0.3s ease;
}

.notification button:hover {
    opacity: 1;
}
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// JavaScript untuk halaman PPDB sdk
// JavaScript untuk interaksi section Syarat & Ketentuan
document.addEventListener('DOMContentLoaded', function() {
    const termsItems = document.querySelectorAll('.terms-item');
    
    // Animasi saat halaman dimuat
    setTimeout(() => {
        termsItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 150 * index);
        });
    }, 300);
    
    // Setup initial state untuk animasi
    termsItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Efek hover untuk item
    termsItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1)';
        });
    });
    
    // Animasi untuk card saat scroll
    const termsCard = document.querySelector('.terms-card');
    
    function checkScroll() {
        const scrollPosition = window.scrollY;
        const cardPosition = termsCard.getBoundingClientRect().top + scrollPosition;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition > cardPosition - windowHeight + 100) {
            termsCard.style.opacity = '1';
            termsCard.style.transform = 'translateY(0)';
        }
    }
    
    // Setup initial state untuk card animation
    termsCard.style.opacity = '0';
    termsCard.style.transform = 'translateY(30px)';
    termsCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    // Check scroll position on load and scroll
    checkScroll();
    window.addEventListener('scroll', checkScroll);
});

// JavaScript untuk kontak
document.addEventListener('DOMContentLoaded', function() {
    // Elements to animate
    const contactCards = document.querySelectorAll('.contact-card');
    const addressBox = document.querySelector('.address-box');
    const mapSimple = document.querySelector('.map-simple');
    const mapContainer = document.querySelector('.map-container');
    
    // Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('contact-card')) {
                    setTimeout(() => {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }, entry.target.dataset.delay || 0);
                }
                
                if (entry.target.classList.contains('address-box')) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
                
                if (entry.target.classList.contains('map-simple')) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
                
                if (entry.target.classList.contains('map-container')) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Apply animations
    contactCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.dataset.delay = index * 100;
        observer.observe(card);
    });
    
    if (addressBox) {
        addressBox.style.opacity = 0;
        addressBox.style.transform = 'translateY(20px)';
        addressBox.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(addressBox);
    }
    
    if (mapSimple) {
        mapSimple.style.opacity = 0;
        mapSimple.style.transform = 'translateY(20px)';
        mapSimple.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(mapSimple);
    }
    
    if (mapContainer) {
        mapContainer.style.opacity = 0;
        mapContainer.style.transform = 'translateY(20px)';
        mapContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(mapContainer);
    }
    
    // Contact card click functionality
    contactCards.forEach(card => {
        card.addEventListener('click', function() {
            // Simulate contact action based on card type
            const icon = this.querySelector('.contact-icon i');
            const details = this.querySelector('.contact-details p');
            
            if (icon.classList.contains('fa-phone')) {
                alert(`Memanggil: ${details.textContent}`);
            } else if (icon.classList.contains('fa-whatsapp')) {
                alert(`Membuka WhatsApp: ${details.textContent}`);
            } else if (icon.classList.contains('fa-envelope')) {
                alert(`Mengirim email ke: ${details.textContent}`);
            } else if (icon.classList.contains('fa-instagram')) {
                alert(`Membuka Instagram: ${details.textContent}`);
            } else if (icon.classList.contains('fa-youtube')) {
                alert(`Membuka YouTube: ${details.textContent}`);
            } else if (icon.classList.contains('fa-tiktok')) {
                alert(`Membuka TikTok: ${details.textContent}`);
            } else if (icon.classList.contains('fa-phone-square-alt')) {
                alert(`Memanggil: ${details.textContent}`);
            }
        });
        
        // Add pulse animation on hover
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.animation = 'pulse 1s infinite';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.animation = 'none';
        });
    });
    
    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Map interaction
    const simpleMapImage = document.querySelector('.simple-map-image');
    if (simpleMapImage) {
        simpleMapImage.addEventListener('click', function() {
            alert('Denah sekolah akan diperbesar. Dalam implementasi nyata, ini akan membuka modal dengan denah yang lebih detail.');
        });
    }
    
    // Copy to clipboard functionality for contact details
    contactCards.forEach(card => {
        card.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            const details = this.querySelector('.contact-details p');
            const textToCopy = details.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show feedback
                const originalBg = this.style.backgroundColor;
                this.style.backgroundColor = '#e1f5fe';
                
                setTimeout(() => {
                    this.style.backgroundColor = originalBg;
                }, 1000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });
});

// Javascript Testimoni Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimoni-slider');
    const slides = document.querySelectorAll('.testimoni-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let autoSlideInterval;

    // Initialize slider
    function initSlider() {
        updateSlider();
        startAutoSlide();
        
        // Add animation to slides
        slides.forEach((slide, index) => {
            slide.style.opacity = 0;
            slide.style.transform = 'translateY(20px)';
            slide.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Animate first slide
        setTimeout(() => {
            if (slides[0]) {
                slides[0].style.opacity = 1;
                slides[0].style.transform = 'translateY(0)';
            }
        }, 100);
    }

    // Update slider position
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Animate current slide
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.style.opacity = 1;
                slide.style.transform = 'translateY(0)';
            } else {
                slide.style.opacity = 0;
                slide.style.transform = 'translateY(20px)';
            }
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
        resetAutoSlide();
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
        resetAutoSlide();
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
        resetAutoSlide();
    }

    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    // Reset auto slide timer
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Touch swipe for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            nextSlide();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            prevSlide();
        }
    }

    // Hover effects for testimoni cards
    const testimoniCards = document.querySelectorAll('.testimoni-card');
    
    testimoniCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (Array.from(slides).indexOf(this.parentElement) !== currentSlide) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            }
        });
    });

    // CTA button animation
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(26, 86, 219, 0.3)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            alert('Terima kasih! sudah memberikan testimoni.');
        });
    }

    // Initialize the slider
    initSlider();
});