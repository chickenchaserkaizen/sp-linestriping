<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { services } from "$lib/data/services";

    export let section: HTMLElement;

    const dispatch = createEventDispatcher();
</script>

<section bind:this={section} class="section-flowing bg-white relative">
    <div class="relative z-10 px-6 lg:px-12 py-12">
        <div class="max-w-7xl mx-auto">
            <div class="services-animate text-center mb-16">
                <div class="inline-flex items-center gap-2 mb-4">
                    <span class="font-mono-label text-[#C94A4A]"
                        >Our Services</span
                    >
                </div>
                <h2
                    class="font-display text-3xl sm:text-4xl md:text-5xl text-[#1E2A3B] mb-6"
                >
                    STRIPING. SEALCOATING.
                    <br />
                    <span class="text-[#C94A4A]">COMPLIANCE.</span>
                </h2>
                <p class="text-[#6B7280] max-w-2xl mx-auto font-body">
                    We layout, paint, and protect asphalt surfaces—so your lot
                    looks sharp and stays compliant.
                </p>
            </div>

            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
                {#each services as service, i}
                    <button
                        class="services-animate group card-hover bg-[#FAF8F5] border border-[#E5E7EB] rounded-2xl overflow-hidden cursor-pointer text-left"
                        on:click={() => dispatch("scrollToId", service.id)}
                    >
                        <div class="aspect-video overflow-hidden">
                            <img
                                src={service.image}
                                alt={service.title}
                                loading="lazy"
                                decoding="async"
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div class="p-6">
                            <div class="flex items-center gap-3 mb-3">
                                <div
                                    class="w-10 h-10 rounded-full bg-[#C94A4A]/10 flex items-center justify-center"
                                >
                                    <svelte:component
                                        this={service.icon}
                                        class="w-5 h-5 text-[#C94A4A]"
                                    />
                                </div>
                                <h3
                                    class="font-display text-lg text-[#1E2A3B] group-hover:text-[#C94A4A] transition-colors"
                                >
                                    {service.title}
                                </h3>
                            </div>
                            <p class="text-[#6B7280] text-sm font-body">
                                {service.desc}
                            </p>
                        </div>
                    </button>
                {/each}
            </div>

            <div
                class="services-animate flex flex-wrap justify-center gap-4 mt-12"
            >
                <button
                    on:click={() => dispatch("scrollToContact")}
                    class="btn-primary">Get a Quote</button
                >
                <button
                    on:click={() => dispatch("scrollToWork")}
                    class="btn-ghost">See Our Work</button
                >
            </div>
        </div>
    </div>
</section>
