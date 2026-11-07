// ==========================================================================
// Romantic Website Script for Vedanshee ❤️
// Features: 3D Tilt, 3D Carousel, Canvas Hearts, Love Meter, Music Synth, Lightbox
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // Ensure full-page background video plays continuously across all browsers & devices
  const siteBgVideo = document.getElementById('site-bg-video');
  if (siteBgVideo) {
    siteBgVideo.play().catch(() => {
      const handleUserGesture = () => {
        siteBgVideo.play();
        window.removeEventListener('click', handleUserGesture);
        window.removeEventListener('touchstart', handleUserGesture);
      };
      window.addEventListener('click', handleUserGesture);
      window.addEventListener('touchstart', handleUserGesture);
    });
  }

  // ------------------------------------------------------------------------
  // 1. Romantic Canvas: Floating 3D Hearts & Sakura Petals
  // ------------------------------------------------------------------------
  const canvas = document.getElementById('romantic-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 45;

    class RomanticParticle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : height + 20;
        this.size = Math.random() * 16 + 10;
        this.speedY = -(Math.random() * 1.2 + 0.6);
        this.speedX = Math.sin(Math.random() * 10) * 0.8;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 1.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.type = Math.random() > 0.4 ? 'heart' : 'petal'; // hearts and petals
        this.oscillation = Math.random() * Math.PI * 2;
        this.oscillationSpeed = Math.random() * 0.03 + 0.01;
        this.color = Math.random() > 0.5 ? '#f43f5e' : (Math.random() > 0.5 ? '#fb7185' : '#fda4af');
      }

      update() {
        this.oscillation += this.oscillationSpeed;
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.oscillation) * 0.7;
        this.rotation += this.rotationSpeed;

        if (this.y < -30 || this.x < -30 || this.x > width + 30) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        if (this.type === 'heart') {
          // Draw a smooth bezier heart
          const s = this.size / 15;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-5 * s, -8 * s, -14 * s, -4 * s, -14 * s, 4 * s);
          ctx.bezierCurveTo(-14 * s, 11 * s, -5 * s, 18 * s, 0, 24 * s);
          ctx.bezierCurveTo(5 * s, 18 * s, 14 * s, 11 * s, 14 * s, 4 * s);
          ctx.bezierCurveTo(14 * s, -4 * s, 5 * s, -8 * s, 0, 0);
          ctx.fill();
        } else {
          // Draw a soft petal
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 0.6, this.size * 0.3, Math.PI / 4, 0, 2 * Math.PI);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new RomanticParticle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ------------------------------------------------------------------------
  // 2. Interactive Cursor Sparkles & Click Hearts
  // ------------------------------------------------------------------------
  let lastSparkleTime = 0;
  window.addEventListener('pointermove', (e) => {
    const now = Date.now();
    if (now - lastSparkleTime > 40) {
      lastSparkleTime = now;
      createSparkle(e.clientX, e.clientY);
    }
  });

  function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'cursor-sparkle';
    const size = Math.random() * 8 + 6;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${x - size / 2}px`;
    sparkle.style.top = `${y - size / 2}px`;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  }

  window.addEventListener('click', (e) => {
    // If clicked on an interactive control, still spawn cute heart
    createFloatingClickHeart(e.clientX, e.clientY);
  });

  function createFloatingClickHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-click-heart';
    const hearts = ['❤️', '💖', '💕', '✨', '🌹', '💗'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
  }

  // ------------------------------------------------------------------------
  // 3. 3D Tilt Cards with Dynamic Specular Glare
  // ------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    let glare = card.querySelector('.tilt-card-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'tilt-card-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate 3D tilt angles
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;

      // Dynamic glare light position
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.35) 0%, transparent 65%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // ------------------------------------------------------------------------
  // 4. 3D Rotating Showcase Ring (Interactive 3D Carousel)
  // ------------------------------------------------------------------------
  const ring = document.getElementById('carousel-3d-ring');
  if (ring) {
    const items = ring.querySelectorAll('.carousel-3d-item');
    const totalItems = items.length;
    let currAngle = 0;
    const radius = window.innerWidth < 768 ? 260 : 380;
    const angleStep = 360 / totalItems;
    let isAutoRotating = true;
    let autoRotateInterval;

    function setupRing() {
      items.forEach((item, index) => {
        const itemAngle = index * angleStep;
        item.style.transform = `rotateY(${itemAngle}deg) translateZ(${radius}px)`;
      });
    }
    setupRing();

    function rotateRing(newAngle) {
      currAngle = newAngle;
      ring.style.transform = `rotateY(${currAngle}deg)`;
    }

    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        isAutoRotating = false;
        rotateRing(currAngle + angleStep);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        isAutoRotating = false;
        rotateRing(currAngle - angleStep);
      });
    }

    // Touch / Drag functionality for 3D Carousel
    let startX = 0;
    let isDragging = false;

    ring.parentElement.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      isAutoRotating = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const diffX = e.clientX - startX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) rotateRing(currAngle + angleStep);
        else rotateRing(currAngle - angleStep);
        startX = e.clientX;
      }
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Mobile touch swipe
    ring.parentElement.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isAutoRotating = false;
    });

    ring.parentElement.addEventListener('touchmove', (e) => {
      const diffX = e.touches[0].clientX - startX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) rotateRing(currAngle + angleStep);
        else rotateRing(currAngle - angleStep);
        startX = e.touches[0].clientX;
      }
    });

    // Auto rotate gently
    function startAutoRotation() {
      autoRotateInterval = setInterval(() => {
        if (isAutoRotating) {
          rotateRing(currAngle - 0.25);
        }
      }, 30);
    }
    startAutoRotation();

    ring.parentElement.addEventListener('mouseenter', () => (isAutoRotating = false));
    ring.parentElement.addEventListener('mouseleave', () => (isAutoRotating = true));
  }

  // ------------------------------------------------------------------------
  // 5. 3D Interactive Love Letter Envelope
  // ------------------------------------------------------------------------
  const envelope = document.getElementById('love-envelope');
  const openLetterBtn = document.getElementById('open-letter-btn');
  const seal = document.getElementById('envelope-seal');

  function openEnvelope() {
    if (!envelope) return;
    envelope.classList.add('opened');
    triggerConfettiHearts();

    // Smoothly scroll down so she can read the letter comfortably
    setTimeout(() => {
      const letterContent = document.getElementById('letter-content');
      if (letterContent) {
        letterContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 600);
  }

  if (envelope) {
    envelope.addEventListener('click', openEnvelope);
  }
  if (openLetterBtn) {
    openLetterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnvelope();
    });
  }
  if (seal) {
    seal.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnvelope();
    });
  }

  // ------------------------------------------------------------------------
  // 6. Reasons Why I Love You (3D Flip Cards)
  // ------------------------------------------------------------------------
  const flipBoxes = document.querySelectorAll('.flip-card-box');
  flipBoxes.forEach((box) => {
    box.addEventListener('click', () => {
      const inner = box.querySelector('.flip-card-inner');
      if (inner) inner.classList.toggle('flipped');
    });
  });

  // ------------------------------------------------------------------------
  // 7. Interactive Love Meter
  // ------------------------------------------------------------------------
  const loveSlider = document.getElementById('love-meter-slider');
  const loveValueText = document.getElementById('love-meter-value');
  const loveBoostBtn = document.getElementById('love-boost-btn');
  const loveMessage = document.getElementById('love-meter-message');

  const loveMilestones = [
    { threshold: 100, msg: "100% - Himanshu loves Vedu with all his heart! ❤️" },
    { threshold: 500, msg: "500% - Himanshu's heart races every single time he sees your smile! 💖" },
    { threshold: 1000, msg: "1,000% - Himanshu is falling deeper in love with my Vedu (Vishwa) every second! 🌹" },
    { threshold: 5000, msg: "5,000% - Himanshu loves you more than all the stars in the night sky combined! ✨" },
    { threshold: 10000, msg: "10,000% - Vedu, you are Himanshu's true soulmate & forever queen! 💍" },
    { threshold: 99999, msg: "♾️ INFINITY & BEYOND! Himanshu's love for Vedu has no boundaries, no end! 🚀💞" }
  ];

  function updateLoveMeter(val) {
    if (!loveValueText) return;
    const num = parseInt(val, 10);
    if (num >= 99999) {
      loveValueText.innerHTML = `&infin;% Infinite Love`;
      loveValueText.className = 'text-4xl md:text-5xl font-extrabold text-gold-shimmer animate-heartbeat';
    } else {
      loveValueText.textContent = `${num.toLocaleString()}%`;
    }

    if (loveMessage) {
      for (let i = loveMilestones.length - 1; i >= 0; i--) {
        if (num >= loveMilestones[i].threshold) {
          loveMessage.textContent = loveMilestones[i].msg;
          break;
        }
      }
    }
  }

  if (loveSlider) {
    loveSlider.addEventListener('input', (e) => {
      updateLoveMeter(e.target.value);
    });
  }

  if (loveBoostBtn) {
    loveBoostBtn.addEventListener('click', () => {
      if (loveSlider) {
        loveSlider.value = 99999;
        updateLoveMeter(99999);
      }
      triggerConfettiHearts();
      const rect = loveBoostBtn.getBoundingClientRect();
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          createFloatingClickHeart(
            rect.left + Math.random() * rect.width,
            rect.top + Math.random() * rect.height
          );
        }, i * 70);
      }
    });
  }

  // ------------------------------------------------------------------------
  // 8. Photo Lightbox Modal (For all 10 photos of Vedanshee)
  // ------------------------------------------------------------------------
  const lightbox = document.getElementById('romantic-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxHeartBtn = document.getElementById('lightbox-heart-btn');
  const lightboxHeartCount = document.getElementById('lightbox-heart-count');

  let currentPhotoIndex = 0;
  const galleryItems = document.querySelectorAll('[data-gallery-img]');

  function openLightbox(index) {
    if (!lightbox || !galleryItems[index]) return;
    currentPhotoIndex = index;
    const item = galleryItems[index];
    const src = item.getAttribute('data-gallery-img');
    const caption = item.getAttribute('data-gallery-caption') || 'Our Beautiful Memory ❤️';

    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) {
        closeLightbox();
      }
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      currentPhotoIndex = (currentPhotoIndex - 1 + galleryItems.length) % galleryItems.length;
      openLightbox(currentPhotoIndex);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      currentPhotoIndex = (currentPhotoIndex + 1) % galleryItems.length;
      openLightbox(currentPhotoIndex);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev && lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext && lightboxNext.click();
  });

  if (lightboxHeartBtn) {
    let heartsCount = 143;
    lightboxHeartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      heartsCount++;
      if (lightboxHeartCount) lightboxHeartCount.textContent = heartsCount;
      const rect = lightboxHeartBtn.getBoundingClientRect();
      createFloatingClickHeart(rect.left + rect.width / 2, rect.top);
    });
  }

  // ------------------------------------------------------------------------
  // 9. Video Showcase Controls
  // ------------------------------------------------------------------------
  const customVideo = document.getElementById('featured-video');
  const playOverlayBtn = document.getElementById('video-play-overlay');
  const videoMuteBtn = document.getElementById('video-mute-toggle');

  if (customVideo && playOverlayBtn) {
    playOverlayBtn.addEventListener('click', () => {
      if (customVideo.paused) {
        customVideo.play();
        playOverlayBtn.style.opacity = '0';
        playOverlayBtn.style.pointerEvents = 'none';
      } else {
        customVideo.pause();
        playOverlayBtn.style.opacity = '1';
        playOverlayBtn.style.pointerEvents = 'auto';
      }
    });

    customVideo.addEventListener('click', () => {
      if (customVideo.paused) {
        customVideo.play();
        playOverlayBtn.style.opacity = '0';
        playOverlayBtn.style.pointerEvents = 'none';
      } else {
        customVideo.pause();
        playOverlayBtn.style.opacity = '1';
        playOverlayBtn.style.pointerEvents = 'auto';
      }
    });

    customVideo.addEventListener('ended', () => {
      playOverlayBtn.style.opacity = '1';
      playOverlayBtn.style.pointerEvents = 'auto';
    });
  }

  if (customVideo && videoMuteBtn) {
    videoMuteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      customVideo.muted = !customVideo.muted;
      videoMuteBtn.innerHTML = customVideo.muted
        ? '<i class="fa-solid fa-volume-xmark"></i> Unmute Video'
        : '<i class="fa-solid fa-volume-high"></i> Mute Video';
    });
  }

  const videoBrightnessBtn = document.getElementById('video-brightness-toggle');
  if (customVideo && videoBrightnessBtn) {
    let isUltraBright = false;
    videoBrightnessBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isUltraBright = !isUltraBright;
      if (isUltraBright) {
        customVideo.classList.add('video-ultra-bright');
        videoBrightnessBtn.innerHTML = '<i class="fa-solid fa-sun text-amber-300"></i> Ultra Bright ✨';
      } else {
        customVideo.classList.remove('video-ultra-bright');
        videoBrightnessBtn.innerHTML = '<i class="fa-regular fa-sun"></i> Boost Brightness ☀️';
      }
    });
  }

  // ------------------------------------------------------------------------
  // 10. Built-in "Happy Birthday to You" Melody Synthesizer (Web Audio API)
  // ------------------------------------------------------------------------
  let audioCtx = null;
  let isPlayingMusic = false;
  let birthdayMusicTimer = null;
  const musicToggle = document.getElementById('music-toggle');
  const musicLabel = document.getElementById('music-label');
  const equalizerBars = document.querySelectorAll('.equalizer-bar');

  // Exact pitch frequencies for Happy Birthday melody in C Major
  const G4 = 392.00, A4 = 440.00, B4 = 493.88, C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99;
  const C4 = 261.63, E4 = 329.63, F4 = 349.23;

  // Complete "Happy Birthday to You (Dear Vedu)" Musical Score
  const happyBirthdayScore = [
    // Phrase 1: "Hap-py Birth-day to you,"
    { note: G4, duration: 0.75, chord: C4 },
    { note: G4, duration: 0.25, chord: null },
    { note: A4, duration: 1.0,  chord: F4 },
    { note: G4, duration: 1.0,  chord: C4 },
    { note: C5, duration: 1.0,  chord: E4 },
    { note: B4, duration: 2.0,  chord: G4 },

    // Phrase 2: "Hap-py Birth-day to you,"
    { note: G4, duration: 0.75, chord: G4 },
    { note: G4, duration: 0.25, chord: null },
    { note: A4, duration: 1.0,  chord: F4 },
    { note: G4, duration: 1.0,  chord: G4 },
    { note: D5, duration: 1.0,  chord: B4 },
    { note: C5, duration: 2.0,  chord: C4 },

    // Phrase 3: "Hap-py Birth-day dear Ve-du,"
    { note: G4, duration: 0.75, chord: C4 },
    { note: G4, duration: 0.25, chord: null },
    { note: G5, duration: 1.0,  chord: E4 },
    { note: E5, duration: 1.0,  chord: C4 },
    { note: C5, duration: 1.0,  chord: A4 },
    { note: B4, duration: 1.0,  chord: G4 },
    { note: A4, duration: 2.0,  chord: F4 },

    // Phrase 4: "Hap-py Birth-day to you!"
    { note: F5, duration: 0.75, chord: F4 },
    { note: F5, duration: 0.25, chord: null },
    { note: E5, duration: 1.0,  chord: C4 },
    { note: C5, duration: 1.0,  chord: E4 },
    { note: D5, duration: 1.0,  chord: G4 },
    { note: C5, duration: 2.5,  chord: C4 }
  ];

  let currentScoreIndex = 0;
  const beatDurationMs = 480; // Gentle, sweet tempo

  function initRomanticMusic() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playTone(freq, duration = 1.0, gainLevel = 0.09) {
    if (!audioCtx || audioCtx.state === 'suspended') {
      audioCtx?.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    // Sweet music-box & warm Rhodes timbre
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(gainLevel, audioCtx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  function playNextBirthdayNote() {
    if (!isPlayingMusic) return;

    const item = happyBirthdayScore[currentScoreIndex];
    const noteTime = item.duration * beatDurationMs;

    // Play melody note
    playTone(item.note, (item.duration * beatDurationMs) / 1000 * 1.3, 0.1);

    // Play soft warm bass harmony if present
    if (item.chord) {
      playTone(item.chord, 1.2, 0.04);
    }

    currentScoreIndex++;
    if (currentScoreIndex >= happyBirthdayScore.length) {
      currentScoreIndex = 0;
      // Pause slightly at the end of the song before restarting
      birthdayMusicTimer = setTimeout(playNextBirthdayNote, 1600);
    } else {
      birthdayMusicTimer = setTimeout(playNextBirthdayNote, noteTime);
    }
  }

  function toggleMusic() {
    initRomanticMusic();

    if (isPlayingMusic) {
      clearTimeout(birthdayMusicTimer);
      isPlayingMusic = false;
      if (musicLabel) musicLabel.textContent = 'Play Happy Birthday Song 🎂';
      equalizerBars.forEach((bar) => bar.classList.add('paused'));
    } else {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      isPlayingMusic = true;
      if (musicLabel) musicLabel.textContent = 'Happy Birthday Vedu! 🎵';
      equalizerBars.forEach((bar) => bar.classList.remove('paused'));

      currentScoreIndex = 0;
      playNextBirthdayNote();
      triggerConfettiHearts();
    }
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', toggleMusic);
  }

  // ------------------------------------------------------------------------
  // 11. Grand Romantic Finale Surprise & 4-Candle Cake Ritual
  // ------------------------------------------------------------------------
  const finaleSurpriseBtn = document.getElementById('finale-surprise-btn');
  const section9ToSurpriseBtn = document.getElementById('section9-to-surprise-btn');
  const surpriseModal = document.getElementById('surprise-modal');
  const surpriseModalClose = document.getElementById('surprise-modal-close');
  const loveYouTooBtn = document.getElementById('love-you-too-btn');

  // Multi-Candle & Audio Elements
  const surpriseAudio = document.getElementById('surprise-audio') || new Audio('WhatsApp Ptt 2026-11-08 at 01.12.05.ogg');
  const modalAudioBadge = document.getElementById('modal-audio-badge');
  const modalCandleRitual = document.getElementById('modal-candle-ritual');
  const modalFinalMessage = document.getElementById('modal-final-message');
  const modalBlowBtn = document.getElementById('modal-blow-btn');
  const modalBlowBtnText = document.getElementById('modal-blow-btn-text');
  const candlesStatusBadge = document.getElementById('candles-status-badge');
  const modalRelightBtn = document.getElementById('modal-relight-btn');

  let currentCandleIndex = 0;
  const totalPartyCandles = 4;
  let isFinalCandleBlowing = false;

  function triggerConfettiHearts() {
    if (typeof confetti === 'function') {
      // Big romantic burst
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#fb7185', '#fda4af', '#f59e0b', '#ffffff'],
        shapes: ['circle']
      });

      // Extra fountain
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#e11d48', '#fda4af']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#e11d48', '#fda4af']
        });
      }, 300);
    }
  }

  function playSurpriseAudio() {
    // If Web Audio background music is playing, pause it so sounds don't overlap
    if (isPlayingMusic) {
      toggleMusic();
    }
    if (surpriseAudio) {
      try {
        surpriseAudio.currentTime = 0;
        const playPromise = surpriseAudio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            if (modalAudioBadge) modalAudioBadge.classList.remove('hidden');
          }).catch((err) => {
            console.log('Audio autoplay note:', err);
          });
        }
        surpriseAudio.onended = () => {
          if (modalAudioBadge) modalAudioBadge.classList.add('hidden');
        };
      } catch (e) {
        console.log('Audio play error:', e);
      }
    }
  }

  function extinguishPartyCandle(index) {
    const flame = document.getElementById(`party-flame-${index + 1}`);
    const smoke = document.getElementById(`party-smoke-${index + 1}`);
    if (flame) {
      flame.classList.remove('flickering-hard');
      flame.classList.add('extinguished');
    }
    if (smoke) {
      smoke.classList.add('rise');
    }
  }

  function blowNextPartyCandle() {
    if (isFinalCandleBlowing) return;
    if (currentCandleIndex >= totalPartyCandles) return;

    // Start playing Himanshu's special track on first blow action
    if (currentCandleIndex === 0) {
      playSurpriseAudio();
    }

    if (currentCandleIndex < 3) {
      // Normal candle blow (Candles 1, 2, 3)
      extinguishPartyCandle(currentCandleIndex);
      currentCandleIndex++;

      // Small confetti burst on each candle blow
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.6 }
        });
      }

      const remaining = totalPartyCandles - currentCandleIndex;
      if (currentCandleIndex === 3) {
        if (modalBlowBtnText) {
          modalBlowBtnText.innerHTML = `Make Deep Wish & Blow Last Candle (1 remaining)! 💖`;
        }
        if (candlesStatusBadge) {
          candlesStatusBadge.innerHTML = `🔥 1 Candle Remaining! Make Your Deepest Wish! ✨`;
        }
      } else {
        if (modalBlowBtnText) {
          modalBlowBtnText.innerHTML = `Blow Candle ${currentCandleIndex + 1} (${remaining} remaining) 🌬️`;
        }
        if (candlesStatusBadge) {
          candlesStatusBadge.innerHTML = `🔥 ${remaining} Candles Lit &bull; Keep Blowing!`;
        }
      }
    } else if (currentCandleIndex === 3) {
      // The 4th and LAST candle: "last cancle boojing like that"
      // Wait 2-3 seconds with intense flicker before blowing out!
      isFinalCandleBlowing = true;
      const lastFlame = document.getElementById('party-flame-4');
      if (lastFlame) {
        lastFlame.classList.add('flickering-hard');
      }

      if (modalBlowBtn) modalBlowBtn.disabled = true;
      if (modalBlowBtnText) {
        modalBlowBtnText.innerHTML = `<span class="animate-pulse">🌬️ Making the ultimate wish... (Blowing hard... 2-3s) ✨</span>`;
      }
      if (candlesStatusBadge) {
        candlesStatusBadge.innerHTML = `🌬️ Blowing the final candle... Hold your wish tight! ✨`;
      }

      setTimeout(() => {
        // Last candle extinguishes ("boojh gayi")
        extinguishPartyCandle(3);
        currentCandleIndex = 4;
        isFinalCandleBlowing = false;

        if (candlesStatusBadge) {
          candlesStatusBadge.innerHTML = `🎉 All 4 Candles Blown! Himanshu & Vedu Forever! 🎂✨`;
        }

        // Grand celebratory confetti burst
        triggerConfettiHearts();
        const end = Date.now() + 3500;
        const interval = setInterval(() => {
          if (Date.now() > end) {
            clearInterval(interval);
            return;
          }
          triggerConfettiHearts();
        }, 350);

        // Smoothly fade out ritual & reveal Grand Final Message
        setTimeout(() => {
          if (modalCandleRitual) modalCandleRitual.classList.add('hidden');
          if (modalFinalMessage) {
            modalFinalMessage.classList.remove('hidden');
            modalFinalMessage.classList.add('animate-fade-in');
          }
        }, 850);
      }, 2500); // 2.5 seconds (the exact 2-3 second wait)
    }
  }

  // Interactive blow button
  if (modalBlowBtn) {
    modalBlowBtn.addEventListener('click', blowNextPartyCandle);
  }

  // Tapping individual candles
  for (let i = 0; i < 4; i++) {
    const candleEl = document.getElementById(`party-candle-${i + 1}`);
    if (candleEl) {
      candleEl.addEventListener('click', () => {
        blowNextPartyCandle();
      });
    }
  }

  // Re-light candles button
  if (modalRelightBtn) {
    modalRelightBtn.addEventListener('click', () => {
      currentCandleIndex = 0;
      isFinalCandleBlowing = false;
      for (let i = 1; i <= 4; i++) {
        const flame = document.getElementById(`party-flame-${i}`);
        const smoke = document.getElementById(`party-smoke-${i}`);
        if (flame) flame.classList.remove('extinguished', 'flickering-hard');
        if (smoke) smoke.classList.remove('rise');
      }
      if (modalBlowBtn) modalBlowBtn.disabled = false;
      if (modalBlowBtnText) modalBlowBtnText.innerHTML = `Blow Candle 1 (4 remaining) 🌬️`;
      if (candlesStatusBadge) candlesStatusBadge.innerHTML = `🔥 4 Candles Lit &bull; Tap a Candle or Click Below`;

      if (modalFinalMessage) modalFinalMessage.classList.add('hidden');
      if (modalCandleRitual) modalCandleRitual.classList.remove('hidden');

      triggerConfettiHearts();
    });
  }

  function openSurpriseModal() {
    if (!surpriseModal) return;
    surpriseModal.classList.remove('hidden');
    surpriseModal.classList.add('flex');

    if (currentCandleIndex >= totalPartyCandles) {
      if (modalCandleRitual) modalCandleRitual.classList.add('hidden');
      if (modalFinalMessage) modalFinalMessage.classList.remove('hidden');
    } else {
      if (modalCandleRitual) modalCandleRitual.classList.remove('hidden');
      if (modalFinalMessage) modalFinalMessage.classList.add('hidden');
    }

    triggerConfettiHearts();
  }

  if (finaleSurpriseBtn) {
    finaleSurpriseBtn.addEventListener('click', openSurpriseModal);
  }

  if (section9ToSurpriseBtn) {
    section9ToSurpriseBtn.addEventListener('click', openSurpriseModal);
  }

  if (surpriseModalClose && surpriseModal) {
    surpriseModalClose.addEventListener('click', () => {
      surpriseModal.classList.add('hidden');
      surpriseModal.classList.remove('flex');
      if (surpriseAudio) {
        surpriseAudio.pause();
      }
      if (modalAudioBadge) {
        modalAudioBadge.classList.add('hidden');
      }
    });
  }

  if (loveYouTooBtn) {
    loveYouTooBtn.addEventListener('click', () => {
      triggerConfettiHearts();
      loveYouTooBtn.innerHTML = '❤️ Himanshu Loves Vedu Forever! ❤️';
      loveYouTooBtn.classList.add('scale-105');
    });
  }

  // ------------------------------------------------------------------------
  // 12. Birthday & Live Age Counter (Birthdate: November 10, 2003)
  // ------------------------------------------------------------------------
  const birthDate = new Date('2003-11-10T00:00:00');
  const liveAgeEl = document.getElementById('live-age-counter');
  const bdayCountdownEl = document.getElementById('birthday-countdown');

  function updateTimers() {
    const now = new Date();

    // 1. Exact Live Age Calculation
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();
    let hours = now.getHours() - birthDate.getHours();
    let minutes = now.getMinutes() - birthDate.getMinutes();
    let seconds = now.getSeconds() - birthDate.getSeconds();

    if (seconds < 0) { seconds += 60; minutes--; }
    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0) { months += 12; years--; }

    if (liveAgeEl) {
      liveAgeEl.innerHTML = `
        <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 text-center">
          <div class="bg-black/50 backdrop-blur-md px-2 sm:px-3 py-2 rounded-xl border border-rose-500/30">
            <span class="block text-xl sm:text-3xl font-extrabold text-rose-300 font-mono">${years}</span>
            <span class="text-[10px] sm:text-xs uppercase tracking-wider text-rose-200/80">Years</span>
          </div>
          <div class="bg-black/50 backdrop-blur-md px-2 sm:px-3 py-2 rounded-xl border border-rose-500/30">
            <span class="block text-xl sm:text-3xl font-extrabold text-rose-300 font-mono">${months}</span>
            <span class="text-[10px] sm:text-xs uppercase tracking-wider text-rose-200/80">Months</span>
          </div>
          <div class="bg-black/50 backdrop-blur-md px-2 sm:px-3 py-2 rounded-xl border border-rose-500/30">
            <span class="block text-xl sm:text-3xl font-extrabold text-rose-300 font-mono">${days}</span>
            <span class="text-[10px] sm:text-xs uppercase tracking-wider text-rose-200/80">Days</span>
          </div>
          <div class="bg-black/50 backdrop-blur-md px-2 sm:px-3 py-2 rounded-xl border border-rose-500/30">
            <span class="block text-xl sm:text-3xl font-extrabold text-rose-300 font-mono">${hours.toString().padStart(2, '0')}</span>
            <span class="text-[10px] sm:text-xs uppercase tracking-wider text-rose-200/80">Hours</span>
          </div>
          <div class="bg-black/50 backdrop-blur-md px-2 sm:px-3 py-2 rounded-xl border border-rose-500/30">
            <span class="block text-xl sm:text-3xl font-extrabold text-rose-300 font-mono">${minutes.toString().padStart(2, '0')}</span>
            <span class="text-[10px] sm:text-xs uppercase tracking-wider text-rose-200/80">Mins</span>
          </div>
          <div class="bg-black/50 backdrop-blur-md px-2 sm:px-3 py-2 rounded-xl border border-rose-500/30">
            <span class="block text-xl sm:text-3xl font-extrabold text-rose-300 font-mono">${seconds.toString().padStart(2, '0')}</span>
            <span class="text-[10px] sm:text-xs uppercase tracking-wider text-rose-200/80">Secs</span>
          </div>
        </div>
      `;
    }

    // 2. Birthday Countdown for November 10th
    if (bdayCountdownEl) {
      let bdayThisYear = new Date(now.getFullYear(), 10, 10, 0, 0, 0); // Month 10 = November (0-indexed)
      
      // If it is today (Nov 10)
      if (now.getMonth() === 10 && now.getDate() === 10) {
        bdayCountdownEl.innerHTML = `
          <div class="p-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white font-bold text-center text-lg sm:text-2xl shadow-2xl animate-heartbeat border border-white/40">
            🎂🎉 TODAY IS VEDANSHEE'S (VEDU'S) BIRTHDAY! HAPPY 23rd BIRTHDAY MY QUEEN! 👑💖
          </div>
        `;
        return;
      }

      // If Nov 10 has passed this year, count to next year
      if (now > bdayThisYear) {
        bdayThisYear = new Date(now.getFullYear() + 1, 10, 10, 0, 0, 0);
      }

      const diffMs = bdayThisYear - now;
      const bDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const bHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const bMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const bSecs = Math.floor((diffMs % (1000 * 60)) / 1000);

      bdayCountdownEl.innerHTML = `
        <div class="flex items-center justify-center gap-2 sm:gap-4 text-center">
          <div class="bg-rose-950/60 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl border border-amber-400/30">
            <span class="block text-xl sm:text-3xl font-extrabold text-amber-300 font-mono">${bDays}</span>
            <span class="text-[10px] sm:text-xs uppercase tracking-wider text-rose-200">Days</span>
          </div>
          <span class="text-xl text-rose-400 font-bold">:</span>
          <div class="bg-rose-950/60 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl border border-amber-400/30">
            <span class="block text-xl sm:text-3xl font-extrabold text-amber-300 font-mono">${bHours.toString().padStart(2, '0')}</span>
            <span class="text-[10px] sm:text-xs uppercase tracking-wider text-rose-200">Hours</span>
          </div>
          <span class="text-xl text-rose-400 font-bold">:</span>
          <div class="bg-rose-950/60 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl border border-amber-400/30">
            <span class="block text-xl sm:text-3xl font-extrabold text-amber-300 font-mono">${bMins.toString().padStart(2, '0')}</span>
            <span class="text-[10px] sm:text-xs uppercase tracking-wider text-rose-200">Mins</span>
          </div>
          <span class="text-xl text-rose-400 font-bold">:</span>
          <div class="bg-rose-950/60 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl border border-amber-400/30">
            <span class="block text-xl sm:text-3xl font-extrabold text-amber-300 font-mono">${bSecs.toString().padStart(2, '0')}</span>
            <span class="text-[10px] sm:text-xs uppercase tracking-wider text-rose-200">Secs</span>
          </div>
        </div>
      `;
    }
  }

  setInterval(updateTimers, 1000);
  updateTimers();

  // ------------------------------------------------------------------------
  // 13. Interactive Love Trivia Quiz (Himanshu & Vedu / Vishwa)
  // ------------------------------------------------------------------------
  const quizData = [
    {
      question: "Where did we go for our very first date together? 🎬❤️",
      options: [
        { text: "Movie Theatre 🎬", correct: true },
        { text: "Romantic Cafe ☕", correct: false },
        { text: "Peaceful Beach Walk 🌊", correct: false },
        { text: "Shopping Mall 🛍️", correct: false }
      ],
      correctMsg: "Aww yes! Our magical first date at the theatre! 🎬🍿 You remember, my Vedu!"
    },
    {
      question: "Which thing does Himanshu NOT like at all about what you do? ⏳",
      options: [
        { text: "Sleeping in too late 😴", correct: false },
        { text: "Timepass ⏳", correct: true },
        { text: "Cute silly teasing 💬", correct: false },
        { text: "Eating extra snacks 🍕", correct: false }
      ],
      correctMsg: "Haha 100% correct! Zero timepass with Himanshu! 😂❤️"
    },
    {
      question: "What was the very first gift Himanshu gave to you? 🎁✨",
      options: [
        { text: "A Cute Teddy Bear 🧸", correct: false },
        { text: "A Box of Chocolates 🍫", correct: false },
        { text: "A Beautiful Bracelet 💫", correct: true },
        { text: "A Bouquet of Red Roses 🌹", correct: false }
      ],
      correctMsg: "Yes, my love! That beautiful bracelet, chosen with all my heart! 💍✨"
    },
    {
      question: "What thing does Himanshu like the most in your body / about you? ✨",
      options: [
        { text: "Bindi ✨", correct: false },
        { text: "Mehndi 🌿", correct: false },
        { text: "Eyes 👀", correct: false },
        { text: "ALL! Every single inch & detail of you! ❤️", correct: true }
      ],
      correctMsg: "Aww 1000% YES! The answer is ALL! Himanshu loves your bindi, your mehndi, your eyes, and every single thing about you! You are pure perfection! ❤️✨"
    }
  ];

  let currentQuestionIndex = 0;
  const questionTitleEl = document.getElementById('quiz-question-title');
  const questionCounterEl = document.getElementById('quiz-step-counter');
  const optionsContainerEl = document.getElementById('quiz-options-container');
  const quizFeedbackEl = document.getElementById('quiz-feedback');
  const quizProgressBar = document.getElementById('quiz-progress-bar');
  const quizContentCard = document.getElementById('quiz-content-card');
  const quizVictoryCard = document.getElementById('quiz-victory-card');
  const restartQuizBtn = document.getElementById('restart-quiz-btn');
  const himanshuVeduLoveBtn = document.getElementById('himanshu-vedu-love-btn');

  function renderQuizQuestion() {
    if (!questionTitleEl || !optionsContainerEl) return;
    const currentQ = quizData[currentQuestionIndex];

    if (questionCounterEl) {
      questionCounterEl.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    }
    if (quizProgressBar) {
      quizProgressBar.style.width = `${((currentQuestionIndex) / quizData.length) * 100}%`;
    }

    questionTitleEl.textContent = currentQ.question;
    optionsContainerEl.innerHTML = '';
    if (quizFeedbackEl) {
      quizFeedbackEl.textContent = '';
      quizFeedbackEl.className = 'text-center text-sm font-medium min-h-[28px] mt-3';
    }

    currentQ.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn group';
      btn.innerHTML = `
        <span class="flex items-center gap-3">
          <span class="w-7 h-7 rounded-full bg-white/10 group-hover:bg-rosebright flex items-center justify-center text-xs font-bold font-mono">
            ${['A', 'B', 'C', 'D'][idx]}
          </span>
          <span class="text-sm sm:text-base">${opt.text}</span>
        </span>
        <i class="fa-regular fa-circle text-rose-300/50 group-hover:text-white"></i>
      `;

      btn.addEventListener('click', () => handleOptionClick(btn, opt.correct, currentQ.correctMsg));
      optionsContainerEl.appendChild(btn);
    });
  }

  function handleOptionClick(btn, isCorrect, correctMsg) {
    const allBtns = optionsContainerEl.querySelectorAll('.quiz-option-btn');

    if (isCorrect) {
      btn.classList.add('quiz-correct');
      btn.querySelector('i').className = 'fa-solid fa-circle-check text-emerald-400';
      allBtns.forEach(b => b.disabled = true);

      if (quizFeedbackEl) {
        quizFeedbackEl.innerHTML = `<span class="text-emerald-400 font-semibold animate-pulse">${correctMsg}</span>`;
      }

      triggerConfettiHearts();

      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
          renderQuizQuestion();
        } else {
          // Show victory card
          showQuizVictory();
        }
      }, 1400);
    } else {
      btn.classList.add('quiz-wrong');
      btn.querySelector('i').className = 'fa-solid fa-circle-xmark text-rose-400';
      if (quizFeedbackEl) {
        quizFeedbackEl.innerHTML = `<span class="text-rose-400">Oopsie! Try again my love 💕</span>`;
      }
      setTimeout(() => {
        btn.classList.remove('quiz-wrong');
        btn.querySelector('i').className = 'fa-regular fa-circle text-rose-300/50';
      }, 800);
    }
  }

  function showQuizVictory() {
    if (quizProgressBar) quizProgressBar.style.width = '100%';
    if (quizContentCard && quizVictoryCard) {
      quizContentCard.classList.add('hidden');
      quizVictoryCard.classList.remove('hidden');
      triggerConfettiHearts();

      // Extra big celebratory burst
      setTimeout(() => triggerConfettiHearts(), 500);
    }
  }

  if (restartQuizBtn) {
    restartQuizBtn.addEventListener('click', () => {
      currentQuestionIndex = 0;
      if (quizVictoryCard && quizContentCard) {
        quizVictoryCard.classList.add('hidden');
        quizContentCard.classList.remove('hidden');
        renderQuizQuestion();
      }
    });
  }

  if (himanshuVeduLoveBtn) {
    himanshuVeduLoveBtn.addEventListener('click', () => {
      triggerConfettiHearts();
      const rect = himanshuVeduLoveBtn.getBoundingClientRect();
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          createFloatingClickHeart(
            rect.left + Math.random() * rect.width,
            rect.top + Math.random() * rect.height
          );
        }, i * 60);
      }
    });
  }


  // ------------------------------------------------------------------------
  // 15. Send a Kiss & Love Explosion
  // ------------------------------------------------------------------------
  const kissToggleBtn = document.getElementById('kiss-toggle');
  if (kissToggleBtn) {
    kissToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerConfettiHearts();
      const kisses = ['💋', '💖', '😘', '❤️', '💕', '🌹'];
      const rect = kissToggleBtn.getBoundingClientRect();
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          const heart = document.createElement('div');
          heart.className = 'floating-click-heart';
          heart.textContent = kisses[Math.floor(Math.random() * kisses.length)];
          heart.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 60}px`;
          heart.style.top = `${rect.top - 20}px`;
          document.body.appendChild(heart);
          setTimeout(() => heart.remove(), 1200);
        }, i * 70);
      }
    });
  }

  renderQuizQuestion();


  // Initialize AOS scroll animations if loaded
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 900,
      once: true,
      easing: 'ease-out-cubic'
    });
  }

});
