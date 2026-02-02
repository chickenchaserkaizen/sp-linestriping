<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";
    import { Calendar } from "lucide-svelte";

    export let section: HTMLElement;

    const dispatch = createEventDispatcher();
    let videoElement: HTMLVideoElement;
    let hasPlayed = false;
    let observer: IntersectionObserver | null = null;

    // Aggressive play attempt function
    function attemptPlay() {
        if (!videoElement || hasPlayed) return;

        // Ensure video is muted (required for autoplay)
        videoElement.muted = true;

        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    hasPlayed = true;
                    removeInteractionListeners();
                })
                .catch((error) => {
                    console.log("Video autoplay attempt:", error.message);
                });
        }
    }

    // Play on any user interaction (for strict mobile browsers)
    function handleInteraction() {
        attemptPlay();
    }

    function removeInteractionListeners() {
        if (browser) {
            document.removeEventListener("touchstart", handleInteraction);
            document.removeEventListener("click", handleInteraction);
            document.removeEventListener("scroll", handleInteraction);
        }
    }

    onMount(() => {
        if (!browser || !videoElement) return;

        // Set attributes programmatically for maximum compatibility
        videoElement.setAttribute("muted", "");
        videoElement.setAttribute("playsinline", "");
        videoElement.muted = true;
        (videoElement as any).playsInline = true;
        (videoElement as any).webkitPlaysInline = true;

        // Attempt immediate play
        attemptPlay();

        // Retry after a short delay (helps with some mobile browsers)
        setTimeout(attemptPlay, 100);
        setTimeout(attemptPlay, 500);
        setTimeout(attemptPlay, 1000);

        // Use IntersectionObserver to play when video is visible
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        attemptPlay();
                    }
                });
            },
            { threshold: 0.1 },
        );
        observer.observe(videoElement);

        // Listen for any user interaction to trigger play
        document.addEventListener("touchstart", handleInteraction, {
            passive: true,
            once: true,
        });
        document.addEventListener("click", handleInteraction, { once: true });
        document.addEventListener("scroll", handleInteraction, {
            passive: true,
            once: true,
        });

        // Also try on video events
        videoElement.addEventListener("canplay", attemptPlay);
        videoElement.addEventListener("loadeddata", attemptPlay);
        videoElement.addEventListener("loadedmetadata", attemptPlay);
    });

    onDestroy(() => {
        if (observer) {
            observer.disconnect();
        }
        removeInteractionListeners();
    });
</script>

<section
    bind:this={section}
    class="relative min-h-screen flex items-center overflow-hidden picket-lines"
>
    <!-- Background Video -->
    <video
        bind:this={videoElement}
        src="/sp striping hero background video 1_5.mp4"
        autoplay
        loop
        muted
        playsinline
        disablepictureinpicture
        preload="auto"
        class="hero-video-bg"
    ></video>
    <div class="hero-video-overlay"></div>

    <!-- Hero Content -->
    <div
        class="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:pt-48 lg:pb-32"
    >
        <div class="max-w-2xl">
            <!-- Main Heading -->
            <h1
                class="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6 animate-fade-in-up"
            >
                FRESNO'S
                <br />
                <span
                    class="inline-block overflow-hidden h-[1.1em] align-bottom"
                >
                    <span class="flex flex-col animate-revolve-up">
                        <span class="text-[#C94A4A]">STRIPING</span>
                        <span class="text-[#C94A4A]">SEALCOATING</span>
                        <span class="text-[#C94A4A]">STRIPING</span>
                    </span>
                </span>
                <br />
                EXPERTS
            </h1>

            <!-- Slogan -->
            <div class="mb-8 animate-fade-in-up animation-delay-100">
                <span class="font-mono-label text-white tracking-wider">
                    QUALITY SERVICE FOR YOUR QUALITY BUSINESS
                </span>
            </div>

            <!-- Subtitle -->
            <p
                class="text-[#9CA3AF] text-lg max-w-md mb-8 animate-fade-in-up animation-delay-200 font-body"
            >
                Where precision meets durability. Professional line striping,
                sealcoating, and ADA-compliant markings for the Central Valley.
            </p>

            <!-- CTA Buttons -->
            <div
                class="flex flex-wrap gap-4 mb-12 animate-fade-in-up animation-delay-300"
            >
                <button
                    on:click={() => dispatch("openEstimate")}
                    class="btn-primary flex items-center gap-2"
                >
                    <Calendar size={18} />
                    Book Appointment
                </button>
                <button
                    on:click={() => dispatch("scrollToWork")}
                    class="px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold relative transition-all duration-300 hover:bg-white/20 active:scale-95 rounded-lg border border-white/20"
                >
                    See Our Work
                </button>
            </div>

            <!-- Stats -->
            <div
                class="flex gap-8 lg:gap-12 animate-fade-in-up animation-delay-500"
            >
                <div>
                    <div
                        class="font-display text-3xl lg:text-4xl text-[#C94A4A]"
                    >
                        12+
                    </div>
                    <div class="font-mono-label text-[#9CA3AF] text-xs">
                        Years Experience
                    </div>
                </div>
                <div>
                    <div
                        class="font-display text-3xl lg:text-4xl text-[#C94A4A]"
                    >
                        2.4K+
                    </div>
                    <div class="font-mono-label text-[#9CA3AF] text-xs">
                        Projects Complete
                    </div>
                </div>
                <div>
                    <div
                        class="font-display text-3xl lg:text-4xl text-[#C94A4A]"
                    >
                        5.0
                    </div>
                    <div class="font-mono-label text-[#9CA3AF] text-xs">
                        Rating Score
                    </div>
                </div>
            </div>

            <!-- Phone Number -->
            <div
                class="mt-6 text-center animate-fade-in-up animation-delay-600"
            >
                <a
                    href="tel:+15597043141"
                    class="font-display text-2xl text-white hover:text-[#C94A4A] transition-colors tracking-wide"
                >
                    +1 (559) 704-3141
                </a>
            </div>
        </div>
    </div>
</section>
