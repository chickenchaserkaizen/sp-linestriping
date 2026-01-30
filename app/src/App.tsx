import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Phone, Mail, MapPin, ArrowRight,
  Star, Menu, X,
  ParkingSquare, PaintBucket, Accessibility,
  Camera, Map, Upload, Send, Scissors, Calendar
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);
  const [estimateStep, setEstimateStep] = useState(1);
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const coverageRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll animations for sections
    const sections = [
      { ref: servicesRef, class: '.services-animate' },
      { ref: projectsRef, class: '.projects-animate' },
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
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
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

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4 bg-[#FAF8F5]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="S&P Striping Logo" className="h-10 w-auto" />
              <span className="font-display text-xl text-[#1E2A3B]">
                S&P <span className="text-[#C94A4A]">STRIPING</span>
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => scrollToSection(heroRef)} className="btn-pill-active">Home</button>
            <button onClick={() => scrollToSection(servicesRef)} className="btn-pill">Services</button>
            <button onClick={() => scrollToSection(testimonialsRef)} className="btn-pill">Reviews</button>
            <button onClick={() => scrollToSection(projectsRef)} className="btn-pill">Projects</button>
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
        <div className="fixed inset-0 z-40 bg-[#FAF8F5] pt-20 px-6 lg:hidden">
          <div className="flex flex-col gap-4">
            <button onClick={() => scrollToSection(heroRef)} className="btn-pill-active w-full">Home</button>
            <button onClick={() => scrollToSection(servicesRef)} className="btn-pill w-full">Services</button>
            <button onClick={() => scrollToSection(testimonialsRef)} className="btn-pill w-full">Reviews</button>
            <button onClick={() => scrollToSection(projectsRef)} className="btn-pill w-full">Projects</button>
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

      {/* Hero Section - Split layout with overlapping images */}
      <section ref={heroRef} className="relative min-h-screen pt-24 pb-16 overflow-hidden bg-pattern">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 pt-8 lg:pt-16">
              {/* Tag line badge */}
              <div className="inline-flex items-center gap-2 mb-6 animate-fade-in-up">
                <span className="font-mono-label text-[#C94A4A] tracking-wider">
                  PRECISION PAVEMENT MARKING
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1E2A3B] leading-[1.1] mb-6 animate-fade-in-up animation-delay-100">
                FRESNO'S
                <br />
                <span className="text-[#C94A4A]">STRIPING</span>
                <br />
                EXPERTS
              </h1>

              {/* Decorative dashed line */}
              <div className="w-48 dashed-line mb-6 animate-fade-in-up animation-delay-200"></div>

              {/* Subtitle */}
              <p className="text-[#6B7280] text-lg max-w-md mb-8 animate-fade-in-up animation-delay-300 font-body">
                Where precision meets durability. Professional line striping,
                sealcoating, and ADA-compliant markings for the Central Valley.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up animation-delay-400">
                <button
                  onClick={() => setIsEstimateOpen(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Calendar size={18} />
                  Book Appointment
                </button>
                <button onClick={() => scrollToSection(servicesRef)} className="btn-ghost">
                  View Services
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 lg:gap-12 animate-fade-in-up animation-delay-500">
                <div>
                  <div className="font-display text-3xl lg:text-4xl text-[#C94A4A]">12+</div>
                  <div className="font-mono-label text-[#6B7280] text-xs">Years Experience</div>
                </div>
                <div>
                  <div className="font-display text-3xl lg:text-4xl text-[#C94A4A]">2.4K+</div>
                  <div className="font-mono-label text-[#6B7280] text-xs">Projects Complete</div>
                </div>
                <div>
                  <div className="font-display text-3xl lg:text-4xl text-[#C94A4A]">4.9</div>
                  <div className="font-mono-label text-[#6B7280] text-xs">Rating Score</div>
                </div>
              </div>
            </div>

            {/* Right Content - Overlapping Images */}
            <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
              {/* Main Video */}
              <div className="hero-image-main w-[85%] aspect-[4/5] ml-auto animate-slide-in-right">
                <video
                  src="/Dolly_tracking_shot slomo 9x16.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Secondary overlapping image */}
              <div className="hero-image-secondary w-[55%] aspect-[4/3] -left-4 lg:left-0 bottom-12 animate-slide-in-right animation-delay-200">
                <img
                  src="/ss1.png"
                  alt="Striping work in progress"
                  className="w-full h-full object-cover"
                />
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
                <Scissors className="w-4 h-4 text-[#C94A4A]" />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: ParkingSquare,
                  title: 'Parking Lot Striping',
                  desc: 'Fresh, crisp lines that define your space and direct traffic flow with precision.',
                  image: '/ss3.png'
                },
                {
                  icon: PaintBucket,
                  title: 'Sealcoating',
                  desc: 'Protective coating that extends pavement life and restores that like-new black finish.',
                  image: '/ss4.png'
                },
                {
                  icon: Accessibility,
                  title: 'ADA Markings',
                  desc: 'Full compliance with current ADA standards for accessible parking and pathways.',
                  image: '/ss5.png'
                },
              ].map((service, i) => (
                <div key={i} className="services-animate group card-hover bg-[#FAF8F5] border border-[#E5E7EB] rounded-2xl overflow-hidden">
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
                      <h3 className="font-display text-lg text-[#1E2A3B]">{service.title}</h3>
                    </div>
                    <p className="text-[#6B7280] text-sm font-body">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="services-animate flex flex-wrap justify-center gap-4 mt-12">
              <button onClick={() => scrollToSection(contactRef)} className="btn-primary">Get a Quote</button>
              <button onClick={() => scrollToSection(projectsRef)} className="btn-ghost">See Our Work</button>
            </div>
          </div>
        </div>
      </section>




      {/* Before/After Section */}
      <section className="section-flowing bg-[#1E2A3B] relative">
        <div className="relative z-10 px-6 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Scissors className="w-4 h-4 text-[#C94A4A]" />
                <span className="font-mono-label text-[#C94A4A]">Before & After</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4">
                See The <span className="text-[#C94A4A]">Transformation</span>
              </h2>
              <p className="text-[#9CA3AF] max-w-2xl mx-auto font-body">
                Drag to see the difference professional sealcoating and striping makes.
              </p>
            </div>

            <BeforeAfterSlider
              beforeImage="/before-sealcoat.jpg"
              afterImage="/after-sealcoat.jpg"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="section-flowing bg-[#FAF8F5] relative">
        <div className="relative z-10 px-6 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="testimonials-animate text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-[#C94A4A] fill-[#C94A4A]" />
                <span className="font-mono-label text-[#C94A4A]">Testimonials</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#1E2A3B] mb-4">
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
                <div key={i} className="testimonials-animate p-6 bg-white border-2 border-[#E5E7EB] rounded-2xl card-hover">
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

      {/* Process Section */}
      <section ref={processRef} className="section-flowing bg-white relative">
        <div className="relative z-10 px-6 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="process-animate text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-4">
                <Scissors className="w-4 h-4 text-[#C94A4A]" />
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
                { step: '01', title: 'Measure & Layout', desc: 'We survey, chalk, and confirm compliance before paint hits pavement.', image: '/ss1.png' },
                { step: '02', title: 'Prep & Paint', desc: 'Clean surface, crisp lines, high-visibility paint or thermoplastic.', image: '/ss2.png' },
                { step: '03', title: 'Walkthrough', desc: 'Inspect, touch up, and sign off—no invoice until you\'re satisfied.', image: '/ss6.png' },
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

      {/* Projects Section */}
      <section ref={projectsRef} className="section-flowing bg-white relative">
        <div className="relative z-10 px-6 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="projects-animate flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <Scissors className="w-4 h-4 text-[#C94A4A]" />
                  <span className="font-mono-label text-[#C94A4A]">Our Work</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#1E2A3B] mb-4">
                  Work That Holds
                  <br />
                  <span className="text-[#C94A4A]">The Line.</span>
                </h2>
                <p className="text-[#6B7280] max-w-xl font-body">
                  From retail centers to industrial complexes, see our precision work across Fresno and the Central Valley.
                </p>
              </div>
              <button onClick={() => scrollToSection(contactRef)} className="btn-ghost self-start lg:self-auto">
                View All Projects
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="projects-animate group relative overflow-hidden rounded-2xl aspect-video card-hover">
                <img
                  src="/project-retail.jpg"
                  alt="Retail center project"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A3B] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="font-mono-label text-[#C94A4A] mb-2">Fresno, CA</div>
                  <h3 className="font-display text-xl text-white mb-1">Fresno Retail Center Restripe</h3>
                  <p className="text-[#9CA3AF] text-sm font-body">Restripe • ADA Markings • Sealcoating</p>
                </div>
              </div>

              <div className="projects-animate group relative overflow-hidden rounded-2xl aspect-video card-hover">
                <img
                  src="/process-paint.jpg"
                  alt="Line striping in action"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A3B] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="font-mono-label text-[#C94A4A] mb-2">Clovis, CA</div>
                  <h3 className="font-display text-xl text-white mb-1">Industrial Park Redesign</h3>
                  <p className="text-[#9CA3AF] text-sm font-body">Full Layout • Traffic Flow • Safety Markings</p>
                </div>
              </div>
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
                    <Scissors className="w-4 h-4 text-[#C94A4A]" />
                    <span className="font-mono-label text-[#C94A4A]">Get in Touch</span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4">
                    Request A Free
                    <br />
                    <span className="text-[#C94A4A]">Estimate.</span>
                  </h2>
                  <p className="text-[#9CA3AF] mb-8 font-body">
                    Tell us what you need—striping, sealcoating, ADA updates, or a full restripe.
                    We'll reply within one business day.
                  </p>
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

                  <a href="mailto:hello@spstriping.com" className="flex items-center gap-4 text-[#9CA3AF] hover:text-white transition-colors group">
                    <div className="w-12 h-12 bg-[#3B5998]/20 rounded-full flex items-center justify-center group-hover:bg-[#3B5998]/30 transition-colors">
                      <Mail className="w-5 h-5 text-[#3B5998]" />
                    </div>
                    <div>
                      <div className="font-mono-label text-xs mb-1">Email</div>
                      <div className="font-semibold text-white">hello@spstriping.com</div>
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
                </div>
              </div>

              <div className="contact-animate w-full lg:w-1/2">
                <form onSubmit={handleEstimateSubmit} className="p-6 lg:p-8 bg-white border-2 border-[#E5E7EB] rounded-2xl">
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
                  <a href="https://www.facebook.com/profile.php?id=100087929498270" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1E2A3B] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#3B5998] transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  </a>
                  <a href="https://www.instagram.com/sandpstriping/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1E2A3B] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" /></svg>
                  </a>
                  <a href="https://maps.app.goo.gl/pYWJaN4FPzTqFEpj9" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1E2A3B] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#4285F4] transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-display text-white text-lg mb-4">Quick Links</h4>
                <ul className="space-y-3">
                  <li><button onClick={() => scrollToSection(heroRef)} className="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body">Home</button></li>
                  <li><button onClick={() => scrollToSection(servicesRef)} className="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body">Services</button></li>
                  <li><button onClick={() => scrollToSection(projectsRef)} className="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body">Our Work</button></li>
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
                    <a href="mailto:hello@spstriping.com" className="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body">hello@spstriping.com</a>
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
              <span className="text-[#6B7280] text-sm font-body">© 2026 S&P Line Striping & Asphalt Sealcoating. All rights reserved. Designed by Polanco Advertising.</span>
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

// Before/After Slider Component
function BeforeAfterSlider({ beforeImage, afterImage }: { beforeImage: string; afterImage: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After image (full) */}
      <img
        src={afterImage}
        alt="After sealcoating"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt="Before sealcoating"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 left-4 bg-[#1E2A3B]/80 text-white px-4 py-2 rounded-full font-mono-label text-xs">
          Before
        </div>
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#C94A4A] rounded-full flex items-center justify-center shadow-lg">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-white" />
            <div className="w-0.5 h-4 bg-white" />
          </div>
        </div>
      </div>

      {/* After label */}
      <div className="absolute top-4 right-4 bg-[#C94A4A]/90 text-white px-4 py-2 rounded-full font-mono-label text-xs">
        After
      </div>
    </div>
  );
}

export default App;
