<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import GalleryCarousel from "./GalleryCarousel.svelte";
    import { galleryCategories } from "$lib/data/gallery";

    const dispatch = createEventDispatcher();

    function handleImageClick(image: string) {
        dispatch("openLightbox", image);
    }
</script>

<section
    id="our-work"
    class="section-flowing bg-[#FAF8F5] relative scroll-mt-24"
>
    <div class="relative z-10 px-6 lg:px-12 py-12">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-12">
                <h2
                    class="font-display text-3xl sm:text-4xl md:text-5xl text-[#1E2A3B] mb-4"
                >
                    OUR <span class="text-[#C94A4A]">WORK</span>
                </h2>
                <p class="text-[#6B7280] max-w-2xl mx-auto font-body">
                    Browse our recent projects across different service
                    categories.
                </p>
            </div>

            <!-- Gallery Rows -->
            {#each galleryCategories as category}
                <div id={category.id} class="scroll-mt-24">
                    <GalleryCarousel
                        title={category.title}
                        images={category.images}
                        onImageClick={handleImageClick}
                    />
                </div>
            {/each}
        </div>
    </div>
</section>
