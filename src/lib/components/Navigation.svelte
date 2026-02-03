<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { Menu, X, Calendar, ChevronDown } from "lucide-svelte";
    import { slide } from "svelte/transition";

    export let scrolledPastHero = false;
    export let isMenuOpen = false;

    const dispatch = createEventDispatcher();

    let isServicesOpen = false;
    let isMobileServicesOpen = false;

    const serviceItems = [
        { id: "service-line-striping", label: "Line Striping" },
        { id: "service-ada-fire-compliance", label: "ADA + Fire Compliance" },
        { id: "service-signage", label: "Signage" },
        { id: "service-recreational-courts", label: "Recreational Courts" },
        { id: "service-seal-coating", label: "Seal Coating" },
        { id: "service-crack-filling", label: "Crack Filling" },
    ];
</script>

<nav
    class="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4 transition-all duration-500 {scrolledPastHero
        ? 'bg-transparent backdrop-blur-0'
        : 'bg-[#FAF8F5]/95 backdrop-blur-sm'}"
>
    <div class="max-w-7xl mx-auto flex items-center justify-between">
        <!-- Logo with Slogan and License -->
        <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
                <img
                    src="/logo.png"
                    alt="S&P Striping Logo"
                    class="h-10 w-auto"
                />
                <div class="flex flex-col">
                    <span class="font-display text-xl text-[#1E2A3B]">
                        S&P <span class="text-[#C94A4A]"
                            >LINE STRIPING & SEALCOATING</span
                        >
                    </span>
                    <span class="text-[10px] text-[#6B7280]"
                        >License #1142328</span
                    >
                </div>
            </div>
        </div>

        <!-- Desktop Nav Links -->
        <div class="hidden lg:flex items-center gap-3">
            <button
                on:click={() => dispatch("scrollToHero")}
                class="btn-pill-active">Home</button
            >
            <div
                class="relative"
                on:mouseenter={() => (isServicesOpen = true)}
                on:mouseleave={() => (isServicesOpen = false)}
                role="menu"
                tabindex="-1"
            >
                <button
                    on:click={() => dispatch("scrollToServices")}
                    class="btn-pill">Services</button
                >
                <div class="services-dropdown {isServicesOpen ? 'show' : ''}">
                    {#each serviceItems as item}
                        <button
                            class="services-dropdown-item"
                            on:click={() => dispatch("scrollToId", item.id)}
                        >
                            {item.label}
                        </button>
                    {/each}
                </div>
            </div>
            <button
                on:click={() => dispatch("scrollToTestimonials")}
                class="btn-pill">Reviews</button
            >
            <button
                on:click={() => dispatch("scrollToId", "our-work")}
                class="btn-pill">Our Work</button
            >
            <button
                on:click={() => dispatch("scrollToContact")}
                class="btn-pill">Contact</button
            >
        </div>

        <!-- CTA Button -->
        <div class="flex items-center gap-3">
            <button
                on:click={() => dispatch("openEstimate")}
                class="btn-primary hidden sm:flex items-center gap-2"
            >
                <Calendar size={16} />
                Book Now
            </button>
            <button
                on:click={() => dispatch("toggleMenu")}
                class="lg:hidden p-2 text-[#1E2A3B]"
            >
                {#if isMenuOpen}
                    <X size={24} />
                {:else}
                    <Menu size={24} />
                {/if}
            </button>
        </div>
    </div>
</nav>

<!-- Mobile Menu -->
{#if isMenuOpen}
    <div
        class="fixed inset-0 z-40 bg-[#FAF8F5] pt-20 px-6 lg:hidden overflow-y-auto"
        transition:slide={{ duration: 300 }}
    >
        <div class="flex flex-col gap-4 pb-8">
            <button
                on:click={() => dispatch("scrollToHero")}
                class="btn-pill-active w-full">Home</button
            >
            <button
                on:click={() => (isMobileServicesOpen = !isMobileServicesOpen)}
                class="btn-pill w-full flex items-center justify-between"
            >
                Services
                <ChevronDown
                    size={20}
                    class="transition-transform duration-300 {isMobileServicesOpen
                        ? 'rotate-180'
                        : ''}"
                />
            </button>
            {#if isMobileServicesOpen}
                <div
                    class="pl-4 flex flex-col gap-2"
                    transition:slide={{ duration: 200 }}
                >
                    {#each serviceItems as item}
                        <button
                            on:click={() => {
                                dispatch("scrollToId", item.id);
                                dispatch("closeMenu");
                            }}
                            class="text-left text-sm text-[#6B7280] hover:text-[#C94A4A] py-2"
                        >
                            {item.label}
                        </button>
                    {/each}
                </div>
            {/if}
            <button
                on:click={() => dispatch("scrollToTestimonials")}
                class="btn-pill w-full">Reviews</button
            >
            <button
                on:click={() => dispatch("scrollToId", "our-work")}
                class="btn-pill w-full">Our Work</button
            >
            <button
                on:click={() => dispatch("scrollToContact")}
                class="btn-pill w-full">Contact</button
            >
            <button
                on:click={() => {
                    dispatch("openEstimate");
                    dispatch("closeMenu");
                }}
                class="btn-primary text-center mt-4"
            >
                Book Now
            </button>
            <a
                href="tel:+15597043141"
                class="text-center text-lg font-bold text-[#1E2A3B] mt-2 block hover:text-[#C94A4A] transition-colors"
            >
                +1 (559) 704-3141
            </a>
        </div>
    </div>
{/if}
