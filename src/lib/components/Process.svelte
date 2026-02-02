<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { ArrowRight } from "lucide-svelte";
    import { processSteps } from "$lib/data/gallery";

    export let section: HTMLElement;

    const dispatch = createEventDispatcher();
</script>

<section bind:this={section} class="section-flowing bg-[#1E2A3B] relative">
    <div class="relative z-10 px-6 lg:px-12 py-12">
        <div class="max-w-7xl mx-auto">
            <div class="process-animate text-center mb-16">
                <div class="inline-flex items-center gap-2 mb-4">
                    <span class="font-mono-label text-[#C94A4A]"
                        >Our Process</span
                    >
                </div>
                <h2
                    class="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4"
                >
                    FROM QUOTE TO
                    <br />
                    <span class="text-[#C94A4A]">FRESH PAINT.</span>
                </h2>
                <p class="text-[#9CA3AF] max-w-2xl mx-auto font-body">
                    Our proven three-step process ensures precision, compliance,
                    and complete satisfaction.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {#each processSteps as item, i}
                    <div
                        class="process-animate relative bg-[#FAF8F5] border-2 border-[#E5E7EB] rounded-2xl card-hover overflow-hidden"
                    >
                        <div class="aspect-[16/9] overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                loading="lazy"
                                decoding="async"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <div class="relative p-6 pt-8">
                            <div
                                class="absolute -top-5 left-6 bg-[#C94A4A] text-white px-4 py-2 rounded-full text-sm font-bold font-mono-label"
                            >
                                {item.step}
                            </div>
                            <h3
                                class="font-display text-xl text-[#1E2A3B] mb-3"
                            >
                                {item.title}
                            </h3>
                            <p class="text-[#6B7280] text-sm font-body">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                {/each}
            </div>

            <div class="process-animate text-center mt-12">
                <button
                    on:click={() => dispatch("openEstimate")}
                    class="btn-primary flex items-center gap-2 mx-auto"
                >
                    Start Your Quote
                    <ArrowRight size={18} />
                </button>
            </div>
        </div>
    </div>
</section>
