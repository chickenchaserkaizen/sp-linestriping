<script lang="ts">
    import { MapPin } from "lucide-svelte";

    export let section: HTMLElement;

    const cities = [
        "Fresno",
        "Clovis",
        "Madera",
        "Visalia",
        "Hanford",
        "Selma",
        "Sanger",
    ];
</script>

<section bind:this={section} class="section-flowing bg-[#FAF8F5] relative">
    <div class="relative z-10 px-6 lg:px-12 py-12">
        <div class="max-w-7xl mx-auto text-center">
            <div class="coverage-animate mb-12">
                <div class="inline-flex items-center gap-2 mb-4">
                    <MapPin class="w-4 h-4 text-[#C94A4A]" />
                    <span class="font-mono-label text-[#C94A4A]"
                        >Service Area</span
                    >
                </div>
                <h2
                    class="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1E2A3B] mb-4"
                >
                    FRESNO &
                    <br />
                    <span class="text-[#C94A4A]">CENTRAL VALLEY.</span>
                </h2>
                <p class="text-[#6B7280] max-w-2xl mx-auto font-body">
                    From downtown lots to warehouse campuses—if it's asphalt, we
                    stripe it.
                </p>
            </div>

            <div
                class="coverage-animate flex flex-wrap justify-center gap-3 lg:gap-4 mb-12"
            >
                {#each cities as city}
                    <span class="btn-pill">{city}</span>
                {/each}
            </div>

            <div
                class="coverage-animate bg-white rounded-2xl p-6 lg:p-8 max-w-3xl mx-auto border-2 border-[#E5E7EB]"
            >
                <div
                    class="flex items-center justify-center gap-2 text-[#C94A4A] mb-4"
                >
                    <MapPin size={20} />
                    <span class="font-mono-label">Service Area</span>
                </div>
                <p class="text-[#6B7280] text-sm font-body">
                    We serve Fresno County and surrounding areas within a
                    75-mile radius. Not sure if we cover your location? Give us
                    a call—we're always expanding our reach.
                </p>
            </div>
        </div>
    </div>
</section>
