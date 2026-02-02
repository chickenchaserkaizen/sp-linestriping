<script lang="ts">
    import { ChevronLeft, ChevronRight } from "lucide-svelte";

    export let title: string;
    export let images: string[];
    export let onImageClick: (image: string) => void;

    let currentIndex = 0;
    let touchStart = 0;
    let touchEnd = 0;
    let innerWidth = 0;

    // Configuration matching CSS breakpoints in app.css
    // Stride = Item Width + Gap (16px)
    $: config = getCarouselConfig(innerWidth);

    function getCarouselConfig(width: number) {
        if (width <= 480) {
            // CSS: width: 85%
            return { visible: 1, stridePct: 85, stridePx: 16 };
        }
        if (width <= 768) {
            // CSS: width: calc(50% - 8px)
            return { visible: 2, stridePct: 50, stridePx: 8 };
        }
        if (width <= 1024) {
            // CSS: width: calc(33.333% - 11px)
            return { visible: 3, stridePct: 33.333, stridePx: 5 };
        }
        if (width <= 1280) {
            // CSS: width: calc(25% - 12px)
            return { visible: 4, stridePct: 25, stridePx: 4 };
        }
        // CSS: width: calc(20% - 13px)
        return { visible: 5, stridePct: 20, stridePx: 3.2 };
    }

    $: maxIndex = Math.max(0, images.length - config.visible);

    // Reset index if out of bounds on resize
    $: if (currentIndex > maxIndex) currentIndex = maxIndex;

    function handlePrev() {
        currentIndex = Math.max(0, currentIndex - 1);
    }

    function handleNext() {
        currentIndex = Math.min(maxIndex, currentIndex + 1);
    }

    function handleTouchStart(e: TouchEvent) {
        touchStart = e.targetTouches[0].clientX;
    }

    function handleTouchMove(e: TouchEvent) {
        touchEnd = e.targetTouches[0].clientX;
    }

    function handleTouchEnd() {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;

        if (distance > minSwipeDistance) {
            handleNext();
        } else if (distance < -minSwipeDistance) {
            handlePrev();
        }
        touchStart = 0;
        touchEnd = 0;
    }

    function getDotClass(index: number): string {
        if (index === currentIndex) return "carousel-dot active";
        if (Math.abs(index - currentIndex) === 1)
            return "carousel-dot adjacent";
        return "carousel-dot";
    }
</script>

<svelte:window bind:innerWidth />

<div class="mb-12">
    <div class="flex items-center justify-between mb-4">
        <h3 class="font-display text-xl text-[#1E2A3B]">{title}</h3>
        <div class="flex gap-2">
            <button
                on:click={handlePrev}
                disabled={currentIndex === 0}
                class="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#1E2A3B] hover:bg-[#FAF8F5] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Previous slide"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                on:click={handleNext}
                disabled={currentIndex >= maxIndex}
                class="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#1E2A3B] hover:bg-[#FAF8F5] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Next slide"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    </div>

    <div
        class="gallery-carousel"
        on:touchstart={handleTouchStart}
        on:touchmove={handleTouchMove}
        on:touchend={handleTouchEnd}
        role="region"
        aria-label="{title} gallery"
    >
        <div
            class="gallery-track"
            style="transform: translateX(calc(-{currentIndex} * ({config.stridePct}% + {config.stridePx}px)))"
        >
            {#each images as image, i}
                <button
                    class="gallery-slide cursor-pointer"
                    on:click={() => onImageClick(image)}
                    type="button"
                    aria-label="View {title} project {i + 1}"
                >
                    <img
                        src={image}
                        alt="{title} project {i + 1}"
                        loading="lazy"
                        decoding="async"
                    />
                </button>
            {/each}
        </div>
    </div>

    <!-- Dot Pagination -->
    <div class="carousel-dots">
        {#each Array(Math.min(images.length, maxIndex + 1)) as _, i}
            <button
                class={getDotClass(i)}
                on:click={() => (currentIndex = i)}
                aria-label="Go to slide {i + 1}"
            ></button>
        {/each}
    </div>
</div>
