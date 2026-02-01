import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Phone, Mail, MapPin, ArrowRight,
  Star, Menu, X,
  ParkingSquare,
  Camera, Map, Upload, Send, Calendar,
  Flame, Signpost, Trophy, Droplet, Wrench, ChevronLeft, ChevronRight, ChevronDown
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

gsap.registerPlugin(ScrollTrigger);

// Gallery Carousel Component with Instagram-style pagination
function GalleryCarousel({ title, images, onImageClick }: { title: string; images: string[]; onImageClick: (image: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const itemsVisible = 5; // Number of visible items on desktop
  const maxIndex = Math.max(0, images.length - itemsVisible);

  const handlePrev = () => setCurrentIndex(prev => Math.max(0, prev - 1));
  const handleNext = () => setCurrentIndex(prev => Math.min(maxIndex, prev + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const getDotClass = (index: number) => {
    if (index === currentIndex) return 'carousel-dot active';
    if (Math.abs(index - currentIndex) === 1) return 'carousel-dot adjacent';
    return 'carousel-dot';
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-xl text-[#1E2A3B]">{title}</h3>
        <div className="hidden md:flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#1E2A3B] hover:bg-[#FAF8F5] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#1E2A3B] hover:bg-[#FAF8F5] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        className="gallery-carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="gallery-track"
          style={{ transform: `translateX(calc(-${currentIndex} * (20% + 3.2px)))` }}
        >
          {images.map((image, i) => (
            <div key={i} className="gallery-slide cursor-pointer" onClick={() => onImageClick(image)}>
              <img src={image} alt={`${title} project ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot Pagination */}
      <div className="carousel-dots">
        {Array.from({ length: Math.min(images.length, maxIndex + 1) }).map((_, i) => (
          <button
            key={i}
            className={getDotClass(i)}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [estimateStep, setEstimateStep] = useState(1);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const coverageRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll detection for navbar
    const handleScroll = () => {
      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        setScrolledPastHero(window.scrollY > heroHeight - 88); // 88 is nav height
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Scroll animations for sections
    const sections = [
      { ref: servicesRef, class: '.services-animate' },
      { ref: processRef, class: '.process-animate' },
      { ref: coverageRef, class: '.coverage-animate' },
      { ref: testimonialsRef, class: '.testimonials-animate' },
      { ref: contactRef, class: '.contact-animate' },
    ];

    sections.forEach(({ ref, class: className }) => {
      if (ref.current) {
        gsap.fromTo(className,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 88; // Height of the fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
    setIsMobileServicesOpen(false);
  };

  const handleEstimateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Estimate request submitted! We\'ll contact you within 24 hours.');
    setIsEstimateOpen(false);
    setEstimateStep(1);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Toaster position="top-center" richColors />

      {/* Lightbox for Gallery */}
      <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
        <DialogContent className="max-w-[95vw] max-h-[90vh] p-0 overflow-hidden bg-transparent border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {lightboxImage && (
              <img
                src={lightboxImage}
                alt="Gallery Preview"
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            )}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-[#C94A4A] transition-colors"
            >
              <X size={32} />
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4 transition-all duration-500 ${scrolledPastHero ? 'bg-transparent backdrop-blur-0' : 'bg-[#FAF8F5]/95 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo with Slogan and License */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="S&P Striping Logo" className="h-10 w-auto" />
              <div className="flex flex-col">
                <span className="font-display text-xl text-[#1E2A3B]">
                  S&P <span className="text-[#C94A4A]">STRIPING</span>
                </span>
                <span className="text-[10px] text-[#6B7280] hidden sm:block">License #1142328</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => scrollToSection(heroRef)} className="btn-pill-active">Home</button>
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button onClick={() => scrollToSection(servicesRef)} className="btn-pill">Services</button>
              <div className={`services-dropdown ${isServicesOpen ? 'show' : ''}`}>
                <button className="services-dropdown-item" onClick={() => scrollToId('service-line-striping')}>Line Striping</button>
                <button className="services-dropdown-item" onClick={() => scrollToId('service-ada-fire-compliance')}>ADA + Fire Compliance</button>
                <button className="services-dropdown-item" onClick={() => scrollToId('service-signage')}>Signage</button>
                <button className="services-dropdown-item" onClick={() => scrollToId('service-recreational-courts')}>Recreational Courts</button>
                <button className="services-dropdown-item" onClick={() => scrollToId('service-seal-coating')}>Seal Coating</button>
                <button className="services-dropdown-item" onClick={() => scrollToId('service-crack-filling')}>Crack Filling</button>
              </div>
            </div>
            <button onClick={() => scrollToSection(testimonialsRef)} className="btn-pill">Reviews</button>
            <button onClick={() => scrollToId('our-work')} className="btn-pill">Our Work</button>
            <button onClick={() => scrollToSection(contactRef)} className="btn-pill">Contact</button>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEstimateOpen(true)}
              className="btn-primary hidden sm:flex items-center gap-2"
            >
              <Calendar size={16} />
              Book Now
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-[#1E2A3B]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FAF8F5] pt-20 px-6 lg:hidden overflow-y-auto">
          <div className="flex flex-col gap-4 pb-8">
            <button onClick={() => scrollToSection(heroRef)} className="btn-pill-active w-full">Home</button>
            <button
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="btn-pill w-full flex items-center justify-between"
            >
              Services
              <ChevronDown size={20} className={`transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isMobileServicesOpen && (
              <div className="pl-4 flex flex-col gap-2 animate-fade-in">
                <button onClick={() => scrollToId('service-line-striping')} className="text-left text-sm text-[#6B7280] hover:text-[#C94A4A] py-2">Line Striping</button>
                <button onClick={() => scrollToId('service-ada-fire-compliance')} className="text-left text-sm text-[#6B7280] hover:text-[#C94A4A] py-2">ADA + Fire Compliance</button>
                <button onClick={() => scrollToId('service-signage')} className="text-left text-sm text-[#6B7280] hover:text-[#C94A4A] py-2">Signage</button>
                <button onClick={() => scrollToId('service-recreational-courts')} className="text-left text-sm text-[#6B7280] hover:text-[#C94A4A] py-2">Recreational Courts</button>
                <button onClick={() => scrollToId('service-seal-coating')} className="text-left text-sm text-[#6B7280] hover:text-[#C94A4A] py-2">Seal Coating</button>
                <button onClick={() => scrollToId('service-crack-filling')} className="text-left text-sm text-[#6B7280] hover:text-[#C94A4A] py-2">Crack Filling</button>
              </div>
            )}
            <button onClick={() => scrollToSection(testimonialsRef)} className="btn-pill w-full">Reviews</button>
            <button onClick={() => scrollToId('our-work')} className="btn-pill w-full">Our Work</button>
            <button onClick={() => scrollToSection(contactRef)} className="btn-pill w-full">Contact</button>
            <button
              onClick={() => { setIsEstimateOpen(true); setIsMenuOpen(false); }}
              className="btn-primary text-center mt-4"
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* Hero Section - Full-width video background */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden picket-lines">
        {/* Background Video */}
        <video
          src="/spstriping hero video 2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="hero-video-bg"
        />
        <div className="hero-video-overlay" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:pt-48 lg:pb-32">
          <div className="max-w-2xl">
            {/* Main Heading */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6 animate-fade-in-up">
              FRESNO'S
              <br />
              <span className="inline-block overflow-hidden h-[1.1em] align-bottom">
                <span className="flex flex-col animate-revolve-up">
                  <span className="text-[#C94A4A]">STRIPING</span>
                  <span className="text-[#C94A4A]">SEALCOATING</span>
                  <span className="text-[#C94A4A]">STRIPING</span>
                </span>
              </span>
              <br />
              EXPERTS
            </h1>

            {/* Slogan - moved here and changed to white */}
            <div className="mb-8 animate-fade-in-up animation-delay-100">
              <span className="font-mono-label text-white tracking-wider">
                QUALITY SERVICE FOR YOUR QUALITY BUSINESS
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-[#9CA3AF] text-lg max-w-md mb-8 animate-fade-in-up animation-delay-200 font-body">
              Where precision meets durability. Professional line striping,
              sealcoating, and ADA-compliant markings for the Central Valley.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up animation-delay-300">
              <button
                onClick={() => setIsEstimateOpen(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Calendar size={18} />
                Book Appointment
              </button>
              <button onClick={() => scrollToId('our-work')} className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold relative transition-all duration-300 hover:bg-white/20 active:scale-95 rounded-lg border border-white/20">
                See Our Work
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 lg:gap-12 animate-fade-in-up animation-delay-500">
              <div>
                <div className="font-display text-3xl lg:text-4xl text-[#C94A4A]">12+</div>
                <div className="font-mono-label text-[#9CA3AF] text-xs">Years Experience</div>
              </div>
              <div>
                <div className="font-display text-3xl lg:text-4xl text-[#C94A4A]">2.4K+</div>
                <div className="font-mono-label text-[#9CA3AF] text-xs">Projects Complete</div>
              </div>
              <div>
                <div className="font-display text-3xl lg:text-4xl text-[#C94A4A]">5.0</div>
                <div className="font-mono-label text-[#9CA3AF] text-xs">Rating Score</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="section-flowing bg-white relative">
        <div className="relative z-10 px-6 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="services-animate text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="font-mono-label text-[#C94A4A]">Our Services</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#1E2A3B] mb-6">
                Striping. Sealcoating.
                <br />
                <span className="text-[#C94A4A]">Compliance.</span>
              </h2>
              <p className="text-[#6B7280] max-w-2xl mx-auto font-body">
                We layout, paint, and protect asphalt surfaces—so your lot looks sharp and stays compliant.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  id: 'service-line-striping',
                  icon: ParkingSquare,
                  title: 'Line Striping',
                  desc: 'Fresh, crisp lines that define your space and direct traffic flow with precision.',
                  image: '/sp-61.jpeg'
                },
                {
                  id: 'service-ada-fire-compliance',
                  icon: Flame,
                  title: 'ADA + Fire Compliance',
                  desc: 'Full compliance with ADA and fire lane standards for accessible, safe parking.',
                  image: '/sp-62.jpeg'
                },
                {
                  id: 'service-signage',
                  icon: Signpost,
                  title: 'Signage',
                  desc: 'Professional pavement markings, directional arrows, and custom stencils.',
                  image: '/sp-63.jpeg'
                },
                {
                  id: 'service-recreational-courts',
                  icon: Trophy,
                  title: 'Recreational Courts',
                  desc: 'Basketball, tennis, pickleball—precision court striping for sports facilities.',
                  image: '/sp-64.jpeg'
                },
                {
                  id: 'service-seal-coating',
                  icon: Droplet,
                  title: 'Seal Coating',
                  desc: 'Protective coating that extends pavement life and restores that like-new black finish.',
                  image: '/sp-65.jpeg'
                },
                {
                  id: 'service-crack-filling',
                  icon: Wrench,
                  title: 'Crack Filling',
                  desc: 'Stop cracks before they spread. Hot-pour crack sealing for lasting repairs.',
                  image: '/sp-66.jpeg'
                },
              ].map((service, i) => (
                <div
                  key={i}
                  className="services-animate group card-hover bg-[#FAF8F5] border border-[#E5E7EB] rounded-2xl overflow-hidden cursor-pointer"
                  onClick={() => scrollToId(service.id)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#C94A4A]/10 flex items-center justify-center">
                        <service.icon className="w-5 h-5 text-[#C94A4A]" />
                      </div>
                      <h3 className="font-display text-lg text-[#1E2A3B] group-hover:text-[#C94A4A] transition-colors">{service.title}</h3>
                    </div>
                    <p className="text-[#6B7280] text-sm font-body">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="services-animate flex flex-wrap justify-center gap-4 mt-12">
              <button onClick={() => scrollToSection(contactRef)} className="btn-primary">Get a Quote</button>
              <button onClick={() => scrollToId('our-work')} className="btn-ghost">See Our Work</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Moved here and made dark */}
      <section ref={testimonialsRef} className="section-flowing bg-[#1E2A3B] relative">
        <div className="relative z-10 px-6 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="testimonials-animate text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-[#C94A4A] fill-[#C94A4A]" />
                <span className="font-mono-label text-[#C94A4A]">Testimonials</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4">
                They Notice The <span className="text-[#C94A4A]">Details.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "S&P - Line Striping and Sealcoating did an excellent job for our gym. Their team was both professional and courteous. They paid great attention to detail, ensuring that all lines were accurately drawn—from beneath the basketball hoop to the free throw lines, and the volleyball court was perfectly centered. Shivam and his brother truly did an outstanding job! I highly recommend them for any indoor or outdoor court striping needs!",
                  name: "Mitesh Gajjar",
                  role: "Google Review",
                  rating: 5
                },
                {
                  quote: "I highly recommend S&P line striping. They are very responsive and easy to work with. They didn't sell us anything we didn't need, were honest and straight to the point. They resealed our entire parking lot, repaired all lines, arrows, accessible parking, curbs and even custom wording. Very happy with the results!",
                  name: "Eric Stoner",
                  role: "Google Review",
                  rating: 5
                },
                {
                  quote: "First and foremost I would like to state how professional this company is when it came to communication and planning. Pricing for striping was extremely reasonable compared to other companies who quoted almost double. The team at S&P Line Striping works fast and does an amazing job. If you're looking for striping for your business this is the company to reach out to!",
                  name: "Max Lor",
                  role: "Google Review",
                  rating: 5
                },
              ].map((testimonial, i) => (
                <div key={i} className="testimonials-animate p-6 bg-white border-2 border-[#1E2A3B] rounded-2xl card-hover">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                    ))}
                  </div>
                  <p className="text-[#6B7280] mb-6 text-sm leading-relaxed font-body line-clamp-5">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C94A4A]/10 flex items-center justify-center">
                      <span className="font-display text-[#C94A4A] text-sm">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-display text-lg text-[#1E2A3B]">{testimonial.name}</div>
                      <div className="text-[#9CA3AF] text-xs font-body flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Now "Our Work" */}
      <section id="our-work" className="section-flowing bg-[#FAF8F5] relative scroll-mt-24">
        <div className="relative z-10 px-6 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#1E2A3B] mb-4">
                Our <span className="text-[#C94A4A]">Work</span>
              </h2>
              <p className="text-[#6B7280] max-w-2xl mx-auto font-body">
                Browse our recent projects across different service categories.
              </p>
            </div>

            {/* Gallery Rows */}
            {[
              { id: 'service-line-striping', title: 'Line Striping', images: ['/sp-1.jpeg', '/sp-2.jpg', '/sp-3.jpg', '/sp-4.jpg', '/sp-5.jpg', '/sp-6.jpg', '/sp-7.JPG', '/sp-8.jpg', '/sp-9.jpg', '/sp-10.jpg'] },
              { id: 'service-ada-fire-compliance', title: 'ADA + Fire Signage', images: ['/sp-11.jpg', '/sp-12.jpg', '/sp-13.jpg', '/sp-14.jpg', '/sp-15.jpeg', '/sp-16.jpeg', '/sp-17.jpeg', '/sp-18.jpeg', '/sp-19.jpeg', '/sp-20.jpeg'] },
              { id: 'service-signage', title: 'Signage & Markings', images: ['/sp-21.jpeg', '/sp-22.jpeg', '/sp-23.jpeg', '/sp-24.jpeg', '/sp-25.jpeg', '/sp-26.jpeg', '/sp-27.jpeg', '/sp-28.jpeg', '/sp-29.jpeg', '/sp-30.jpeg'] },
              { id: 'service-recreational-courts', title: 'Recreational Courts', images: ['/sp-31.jpeg', '/sp-32.jpeg', '/sp-33.jpeg', '/sp-34.jpeg', '/sp-35.jpeg', '/sp-36.jpeg', '/sp-37.jpeg', '/sp-38.jpeg', '/sp-39.jpeg', '/sp-40.jpeg'] },
              { id: 'service-seal-coating', title: 'Seal Coating', images: ['/sp-41.jpeg', '/sp-42.JPG', '/sp-43.JPG', '/sp-44.jpeg', '/sp-45.jpeg', '/sp-46.jpeg', '/sp-47.jpeg', '/sp-48.jpeg', '/sp-49.jpeg', '/sp-50.jpeg'] },
              { id: 'service-crack-filling', title: 'Crack Filling', images: ['/sp-51.jpeg', '/sp-52.jpeg', '/sp-53.jpeg', '/sp-54.jpeg', '/sp-55.jpeg', '/sp-56.jpeg', '/sp-57.jpeg', '/sp-58.jpeg', '/sp-59.jpeg', '/sp-60.jpeg'] },
            ].map((category, categoryIndex) => (
              <div key={categoryIndex} id={category.id} className="scroll-mt-24">
                <GalleryCarousel
                  title={category.title}
                  images={category.images}
                  onImageClick={(image) => setLightboxImage(image)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="section-flowing bg-white relative">
        <div className="relative z-10 px-6 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="process-animate text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="font-mono-label text-[#C94A4A]">Our Process</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#1E2A3B] mb-4">
                From Quote To
                <br />
                <span className="text-[#C94A4A]">Fresh Paint.</span>
              </h2>
              <p className="text-[#6B7280] max-w-2xl mx-auto font-body">
                Our proven three-step process ensures precision, compliance, and complete satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                { step: '01', title: 'Measure & Layout', desc: 'We survey, chalk, and confirm compliance before paint hits pavement.', image: '/sp-67.jpeg' },
                { step: '02', title: 'Prep & Paint', desc: 'Clean surface, crisp lines, high-visibility paint or thermoplastic.', image: '/sp-68.jpeg' },
                { step: '03', title: 'Walkthrough', desc: 'Inspect, touch up, and sign off—no invoice until you\'re satisfied.', image: '/sp-69.jpeg' },
              ].map((item, i) => (
                <div key={i} className="process-animate relative bg-[#FAF8F5] border-2 border-[#E5E7EB] rounded-2xl card-hover overflow-hidden">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="relative p-6 pt-8">
                    <div className="absolute -top-5 left-6 bg-[#C94A4A] text-white px-4 py-2 rounded-full text-sm font-bold font-mono-label">
                      {item.step}
                    </div>
                    <h3 className="font-display text-xl text-[#1E2A3B] mb-3">{item.title}</h3>
                    <p className="text-[#6B7280] text-sm font-body">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="process-animate text-center mt-12">
              <button onClick={() => setIsEstimateOpen(true)} className="btn-primary flex items-center gap-2 mx-auto">
                Start Your Quote
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section ref={coverageRef} className="section-flowing bg-[#FAF8F5] relative">
        <div className="relative z-10 px-6 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto text-center">
            <div className="coverage-animate mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-[#C94A4A]" />
                <span className="font-mono-label text-[#C94A4A]">Service Area</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1E2A3B] mb-4">
                Fresno &
                <br />
                <span className="text-[#C94A4A]">Central Valley.</span>
              </h2>
              <p className="text-[#6B7280] max-w-2xl mx-auto font-body">
                From downtown lots to warehouse campuses—if it's asphalt, we stripe it.
              </p>
            </div>

            <div className="coverage-animate flex flex-wrap justify-center gap-3 lg:gap-4 mb-12">
              {['Fresno', 'Clovis', 'Madera', 'Visalia', 'Hanford', 'Selma', 'Sanger'].map((city, i) => (
                <span key={i} className="btn-pill">
                  {city}
                </span>
              ))}
            </div>

            <div className="coverage-animate bg-white rounded-2xl p-6 lg:p-8 max-w-3xl mx-auto border-2 border-[#E5E7EB]">
              <div className="flex items-center justify-center gap-2 text-[#C94A4A] mb-4">
                <MapPin size={20} />
                <span className="font-mono-label">Service Area</span>
              </div>
              <p className="text-[#6B7280] text-sm font-body">
                We serve Fresno County and surrounding areas within a 75-mile radius.
                Not sure if we cover your location? Give us a call—we're always expanding our reach.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section ref={contactRef} className="section-flowing bg-[#1E2A3B] relative">
        <div className="relative z-10 px-6 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              <div className="w-full lg:w-1/2">
                <div className="contact-animate">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="font-mono-label text-[#C94A4A]">Get in Touch</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4">
                    Request A Free
                    <br />
                    <span className="text-[#C94A4A]">Estimate.</span>
                  </h2>
                  <p className="text-[#9CA3AF] mb-4 font-body">
                    Tell us what you need—striping, sealcoating, ADA updates, or a full restripe.
                    We'll reply within one business day.
                  </p>
                  <div className="flex flex-col gap-1 mb-8">
                    <span className="font-mono-label text-xs text-[#C94A4A]">Owners</span>
                    <h3 className="font-display text-2xl text-white">Paarth Patel & Shivam Patel</h3>
                    <span className="text-[#9CA3AF] text-sm font-body">Contractors License #1142328</span>
                  </div>
                </div>

                <div className="contact-animate space-y-4 mb-8">
                  <a href="tel:+15597043141" className="flex items-center gap-4 text-[#9CA3AF] hover:text-white transition-colors group">
                    <div className="w-12 h-12 bg-[#C94A4A]/20 rounded-full flex items-center justify-center group-hover:bg-[#C94A4A]/30 transition-colors">
                      <Phone className="w-5 h-5 text-[#C94A4A]" />
                    </div>
                    <div>
                      <div className="font-mono-label text-xs mb-1">Call or Text</div>
                      <div className="font-semibold text-white">(559) 704-3141</div>
                    </div>
                  </a>

                  <a href="mailto:spstripingfresno@gmail.com" className="flex items-center gap-4 text-[#9CA3AF] hover:text-white transition-colors group">
                    <div className="w-12 h-12 bg-[#3B5998]/20 rounded-full flex items-center justify-center group-hover:bg-[#3B5998]/30 transition-colors">
                      <Mail className="w-5 h-5 text-[#3B5998]" />
                    </div>
                    <div>
                      <div className="font-mono-label text-xs mb-1">Email</div>
                      <div className="font-semibold text-white">spstripingfresno@gmail.com</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 text-[#9CA3AF]">
                    <div className="w-12 h-12 bg-[#F59E0B]/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#F59E0B]" />
                    </div>
                    <div>
                      <div className="font-mono-label text-xs mb-1">Service Area</div>
                      <div className="font-semibold text-white">Fresno, CA & Central Valley</div>
                    </div>
                  </div>

                  {/* Social Media Presence */}
                  <div className="mt-8">
                    <p className="font-mono-label text-xs text-[#C94A4A] mb-4">Follow us on Social Media</p>
                    <div className="flex gap-4">
                      <a href="https://www.tiktok.com/@spstriping" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#1E2A3B] rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#000000] transition-all">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.89 2.89 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                      </a>
                      <a href="https://www.youtube.com/@spstriping" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#1E2A3B] rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#FF0000] transition-all">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-animate w-full lg:w-1/2">
                <form onSubmit={handleEstimateSubmit} className="p-6 lg:p-8 bg-white border-2 border-[#E5E7EB] rounded-2xl mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-[#6B7280] text-sm mb-2 block font-body">Name</Label>
                      <Input placeholder="Your name" className="bg-[#FAF8F5] border-[#E5E7EB] text-[#1E2A3B] rounded-xl" required />
                    </div>
                    <div>
                      <Label className="text-[#6B7280] text-sm mb-2 block font-body">Phone</Label>
                      <Input placeholder="(555) 123-4567" className="bg-[#FAF8F5] border-[#E5E7EB] text-[#1E2A3B] rounded-xl" required />
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label className="text-[#6B7280] text-sm mb-2 block font-body">Email</Label>
                    <Input type="email" placeholder="you@company.com" className="bg-[#FAF8F5] border-[#E5E7EB] text-[#1E2A3B] rounded-xl" required />
                  </div>

                  <div className="mb-4">
                    <Label className="text-[#6B7280] text-sm mb-2 block font-body">Service Needed</Label>
                    <Select>
                      <SelectTrigger className="bg-[#FAF8F5] border-[#E5E7EB] text-[#1E2A3B] rounded-xl">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#E5E7EB]">
                        <SelectItem value="striping">Line Striping</SelectItem>
                        <SelectItem value="sealcoating">Sealcoating</SelectItem>
                        <SelectItem value="ada">ADA Compliance</SelectItem>
                        <SelectItem value="restripe">Restripe</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mb-6">
                    <Label className="text-[#6B7280] text-sm mb-2 block font-body">Message</Label>
                    <Textarea
                      placeholder="Tell us about your project..."
                      className="bg-[#FAF8F5] border-[#E5E7EB] text-[#1E2A3B] min-h-[100px] rounded-xl"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                    <Send size={18} />
                    Send Request
                  </button>
                </form>

                {/* Google Maps Iframe - Moved below form */}
                <div className="rounded-2xl overflow-hidden border-2 border-[#E5E7EB] shadow-2xl h-[300px] w-full bg-white">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6388.5498442522085!2d-119.700816!3d36.8119315!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80945d075507a6a3%3A0xc510b68fc9bbf152!2sS%26P%20-%20Line%20Striping%20and%20Sealcoating!5e0!3m2!1sen!2sus!4v1769767312762!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="S&P - Line Striping and Sealcoating Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F1621] border-t border-[#1E2A3B]">
        <div className="px-6 lg:px-12 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
              {/* Brand Column */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <img src="/logo.png" alt="S&P Striping Logo" className="h-10 w-auto" />
                  <span className="font-display text-xl text-white">
                    S&P <span className="text-[#C94A4A]">STRIPING</span>
                  </span>
                </div>
                <p className="text-[#9CA3AF] text-sm mb-6 font-body leading-relaxed">
                  Professional line striping and sealcoating services for the Central Valley since 2012. Quality work, honest pricing.
                </p>
                <div className="flex gap-3">
                  <a href="https://www.tiktok.com/@spstriping" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1E2A3B] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#000000] transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                  </a>
                  <a href="https://www.youtube.com/@spstriping" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1E2A3B] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#FF0000] transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                  </a>
                  <a href="https://maps.app.goo.gl/pYWJaN4FPzTqFEpj9" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1E2A3B] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#4285F4] transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  </a>
                </div>
                <p className="text-[#6B7280] text-xs mt-4">Follow us on Social Media</p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-display text-white text-lg mb-4">Quick Links</h4>
                <ul className="space-y-3">
                  <li><button onClick={() => scrollToSection(heroRef)} className="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body">Home</button></li>
                  <li><button onClick={() => scrollToSection(servicesRef)} className="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body">Services</button></li>
                  <li><button onClick={() => scrollToId('our-work')} className="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body">Our Work</button></li>
                  <li><button onClick={() => scrollToSection(processRef)} className="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body">Our Process</button></li>
                  <li><button onClick={() => scrollToSection(testimonialsRef)} className="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body">Reviews</button></li>
                  <li><button onClick={() => scrollToSection(contactRef)} className="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body">Contact</button></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-display text-white text-lg mb-4">Contact</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C94A4A] flex-shrink-0 mt-1" />
                    <span className="text-[#9CA3AF] text-sm font-body">Fresno, CA<br />Central Valley Service Area</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#C94A4A] flex-shrink-0" />
                    <a href="tel:+15597043141" className="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body">(559) 704-3141</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#C94A4A] flex-shrink-0" />
                    <a href="mailto:spstripingfresno@gmail.com" className="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body">spstripingfresno@gmail.com</a>
                  </li>
                  <li className="flex items-center gap-3 pt-2">
                    <span className="text-[#6B7280] text-xs font-body">License #1142328</span>
                  </li>
                </ul>
              </div>

              {/* Hours */}
              <div>
                <h4 className="font-display text-white text-lg mb-4">Hours</h4>
                <ul className="space-y-2 text-[#9CA3AF] text-sm font-body">
                  <li className="flex justify-between"><span>Mon - Fri:</span><span className="text-white">7AM - 6PM</span></li>
                  <li className="flex justify-between"><span>Saturday:</span><span className="text-white">8AM - 4PM</span></li>
                  <li className="flex justify-between"><span>Sunday:</span><span className="text-white">Closed</span></li>
                </ul>
                <div className="mt-6 p-4 bg-[#1E2A3B] rounded-xl">
                  <p className="text-[#F59E0B] text-xs font-mono-label mb-1">After-Hours Available</p>
                  <p className="text-[#9CA3AF] text-xs font-body">Weekend & overnight work available for businesses that need minimal disruption.</p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-[#1E2A3B] flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="text-[#6B7280] text-sm font-body">© 2026 S&P Line Striping & Asphalt Sealcoating. All rights reserved.</span>
              <div className="flex items-center gap-6">
                <a href="#" className="text-[#6B7280] hover:text-white text-sm transition-colors font-body">Privacy Policy</a>
                <a href="#" className="text-[#6B7280] hover:text-white text-sm transition-colors font-body">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Estimate Dialog */}
      <Dialog open={isEstimateOpen} onOpenChange={setIsEstimateOpen}>
        <DialogContent className="bg-white border-[#E5E7EB] text-[#1E2A3B] max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {estimateStep === 1 && 'Get Your Free Estimate'}
              {estimateStep === 2 && 'Project Details'}
              {estimateStep === 3 && 'Upload Photos'}
            </DialogTitle>
          </DialogHeader>

          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-8 h-1 rounded-full ${step <= estimateStep ? 'bg-[#C94A4A]' : 'bg-[#E5E7EB]'}`}
              />
            ))}
          </div>

          <form onSubmit={handleEstimateSubmit}>
            {estimateStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-[#6B7280] text-sm mb-2 block font-body">Full Name</Label>
                  <Input placeholder="John Smith" className="bg-[#FAF8F5] border-[#E5E7EB] text-[#1E2A3B] rounded-xl" required />
                </div>
                <div>
                  <Label className="text-[#6B7280] text-sm mb-2 block font-body">Phone Number</Label>
                  <Input placeholder="(559) 123-4567" className="bg-[#FAF8F5] border-[#E5E7EB] text-[#1E2A3B] rounded-xl" required />
                </div>
                <div>
                  <Label className="text-[#6B7280] text-sm mb-2 block font-body">Email</Label>
                  <Input type="email" placeholder="john@company.com" className="bg-[#FAF8F5] border-[#E5E7EB] text-[#1E2A3B] rounded-xl" required />
                </div>
                <div>
                  <Label className="text-[#6B7280] text-sm mb-2 block font-body">Property Address</Label>
                  <Input placeholder="123 Main St, Fresno, CA" className="bg-[#FAF8F5] border-[#E5E7EB] text-[#1E2A3B] rounded-xl" required />
                </div>
                <button
                  type="button"
                  onClick={() => setEstimateStep(2)}
                  className="btn-primary w-full mt-4 flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight size={18} />
                </button>
              </div>
            )}

            {estimateStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label className="text-[#6B7280] text-sm mb-2 block font-body">Service Type</Label>
                  <Select>
                    <SelectTrigger className="bg-[#FAF8F5] border-[#E5E7EB] text-[#1E2A3B] rounded-xl">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#E5E7EB]">
                      <SelectItem value="striping">Line Striping</SelectItem>
                      <SelectItem value="sealcoating">Sealcoating</SelectItem>
                      <SelectItem value="ada">ADA Compliance</SelectItem>
                      <SelectItem value="restripe">Restripe / Refresh</SelectItem>
                      <SelectItem value="full">Full Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-[#6B7280] text-sm mb-2 block font-body">Approximate Lot Size</Label>
                  <Select>
                    <SelectTrigger className="bg-[#FAF8F5] border-[#E5E7EB] text-[#1E2A3B] rounded-xl">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#E5E7EB]">
                      <SelectItem value="small">Small (Under 20 spaces)</SelectItem>
                      <SelectItem value="medium">Medium (20-50 spaces)</SelectItem>
                      <SelectItem value="large">Large (50-100 spaces)</SelectItem>
                      <SelectItem value="xlarge">Extra Large (100+ spaces)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-[#6B7280] text-sm mb-2 block font-body">Preferred Timeline</Label>
                  <Select>
                    <SelectTrigger className="bg-[#FAF8F5] border-[#E5E7EB] text-[#1E2A3B] rounded-xl">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#E5E7EB]">
                      <SelectItem value="asap">ASAP</SelectItem>
                      <SelectItem value="2weeks">Within 2 weeks</SelectItem>
                      <SelectItem value="month">Within a month</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-[#6B7280] text-sm mb-2 block font-body">Additional Details</Label>
                  <Textarea
                    placeholder="Any specific requirements or questions..."
                    className="bg-[#FAF8F5] border-[#E5E7EB] text-[#1E2A3B] rounded-xl"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEstimateStep(1)}
                    className="btn-ghost flex-1"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setEstimateStep(3)}
                    className="btn-primary flex-1"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {estimateStep === 3 && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-[#E5E7EB] rounded-2xl p-8 text-center hover:border-[#C94A4A]/50 transition-colors">
                  <Camera className="w-12 h-12 text-[#9CA3AF] mx-auto mb-4" />
                  <p className="text-[#1E2A3B] font-semibold mb-2 font-body">Upload Photos of Your Lot</p>
                  <p className="text-[#6B7280] text-sm mb-4 font-body">
                    Help us provide a more accurate estimate by sharing photos of your parking area.
                  </p>
                  <button type="button" className="btn-ghost text-sm">
                    <Upload size={16} className="inline mr-2" />
                    Choose Files
                  </button>
                </div>

                <div className="bg-[#FAF8F5] p-4 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <Map className="w-5 h-5 text-[#3B5998] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#1E2A3B] text-sm font-semibold mb-1 font-body">Drop a Pin</p>
                      <p className="text-[#6B7280] text-xs font-body">
                        You can also share your location or drop a pin on the map for easier navigation to your property.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEstimateStep(2)}
                    className="btn-ghost flex-1"
                  >
                    Back
                  </button>
                  <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                    <Send size={18} />
                    Submit Request
                  </button>
                </div>
              </div>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
