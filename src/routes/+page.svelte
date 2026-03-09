<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

    import Navigation from "$lib/components/Navigation.svelte";
    import Hero from "$lib/components/Hero.svelte";
    import Services from "$lib/components/Services.svelte";
    import Testimonials from "$lib/components/Testimonials.svelte";
    import Gallery from "$lib/components/Gallery.svelte";
    import Process from "$lib/components/Process.svelte";
    import Coverage from "$lib/components/Coverage.svelte";
    import Contact from "$lib/components/Contact.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import Lightbox from "$lib/components/Lightbox.svelte";
    import EstimateDialog from "$lib/components/EstimateDialog.svelte";

    let isMenuOpen = false;
    let isEstimateOpen = false;
    let lightboxImage: string | null = null;
    let scrolledPastHero = false;

    let heroSection: HTMLElement;
    let servicesSection: HTMLElement;
    let testimonialsSection: HTMLElement;
    let processSection: HTMLElement;
    let coverageSection: HTMLElement;
    let contactSection: HTMLElement;

    function scrollToSection(section: HTMLElement | undefined) {
        section?.scrollIntoView({ behavior: "smooth" });
        isMenuOpen = false;
    }

    function scrollToId(id: string) {
        const element = document.getElementById(id);
        if (element) {
            const navHeight = 88;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - navHeight;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
        isMenuOpen = false;
    }

    function openLightbox(image: string) {
        lightboxImage = image;
    }

    function closeLightbox() {
        lightboxImage = null;
    }

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Scroll detection for navbar
        const handleScroll = () => {
            if (heroSection) {
                const heroHeight = heroSection.offsetHeight;
                scrolledPastHero = window.scrollY > heroHeight - 88;
            }
        };

        window.addEventListener("scroll", handleScroll);

        // GSAP scroll animations
        const animateClasses = [
            ".services-animate",
            ".process-animate",
            ".coverage-animate",
            ".testimonials-animate",
            ".contact-animate",
        ];

        animateClasses.forEach((className) => {
            gsap.fromTo(
                className,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: className,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                },
            );
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    });
</script>

<div class="min-h-screen bg-[#FAF8F5]">
    <header>
        <Navigation
            {scrolledPastHero}
            {isMenuOpen}
            on:toggleMenu={() => (isMenuOpen = !isMenuOpen)}
            on:closeMenu={() => (isMenuOpen = false)}
            on:scrollToHero={() => scrollToSection(heroSection)}
            on:scrollToServices={() => scrollToSection(servicesSection)}
            on:scrollToTestimonials={() => scrollToSection(testimonialsSection)}
            on:scrollToContact={() => scrollToSection(contactSection)}
            on:scrollToId={(e) => scrollToId(e.detail)}
            on:openEstimate={() => (isEstimateOpen = true)}
        />
    </header>

    <main>
        <Hero
            bind:section={heroSection}
            on:openEstimate={() => (isEstimateOpen = true)}
            on:scrollToWork={() => scrollToId("our-work")}
        />

        <Services
            bind:section={servicesSection}
            on:scrollToContact={() => scrollToSection(contactSection)}
            on:scrollToWork={() => scrollToId("our-work")}
            on:scrollToId={(e) => scrollToId(e.detail)}
        />

        <Testimonials bind:section={testimonialsSection} />

        <Gallery on:openLightbox={(e) => openLightbox(e.detail)} />

        <Process
            bind:section={processSection}
            on:openEstimate={() => (isEstimateOpen = true)}
        />

        <Coverage bind:section={coverageSection} />

        <Contact bind:section={contactSection} />
    </main>

    <footer>
        <Footer
            on:scrollToHero={() => scrollToSection(heroSection)}
            on:scrollToServices={() => scrollToSection(servicesSection)}
            on:scrollToProcess={() => scrollToSection(processSection)}
            on:scrollToTestimonials={() => scrollToSection(testimonialsSection)}
            on:scrollToContact={() => scrollToSection(contactSection)}
            on:scrollToWork={() => scrollToId("our-work")}
        />
    </footer>

    <div aria-hidden="true">
        <Lightbox image={lightboxImage} on:close={closeLightbox} />
    </div>

    <div aria-hidden="true">
        <EstimateDialog
            isOpen={isEstimateOpen}
            on:close={() => (isEstimateOpen = false)}
        />
    </div>
</div>
