<script lang="ts">
    import { ChevronLeft, ChevronRight } from "lucide-svelte";

    export let title: string;
    export let images: string[];
    export let onImageClick: (image: string) => void;

    let currentIndex = 0;
    let touchStart = 0;
    let touchEnd = 0;

    let innerWidth = 0;

    $: itemsVisible =
        innerWidth < 480
            ? 1
            : innerWidth < 768
              ? 2
              : innerWidth < 1024
                ? 3
                : innerWidth < 1280
                  ? 4
                  : 5;

    $: maxIndex = Math.max(0, images.length - itemsVisible);

    $: slideTransform = (() => {
        let percentage, pixelOffset;
        if (innerWidth < 480) {
            percentage = 85;
            pixelOffset = 16;
        } else if (innerWidth < 768) {
            percentage = 50;
            pixelOffset = 8;
        } else if (innerWidth < 1024) {
            percentage = 33.333;
            pixelOffset = 5;
        } else if (innerWidth < 1280) {
            percentage = 25;
            pixelOffset = 4;
        } else {
            percentage = 20;
            pixelOffset = 3.2;
        }

        return `transform: translateX(calc(-${currentIndex} * (${percentage}% + ${pixelOffset}px)))`;
    })();

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
            >
                <ChevronLeft size={20} />
            </button>
            <button
                on:click={handleNext}
                disabled={currentIndex >= maxIndex}
                class="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#1E2A3B] hover:bg-[#FAF8F5] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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
        <div class="gallery-track" style={slideTransform}>
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
