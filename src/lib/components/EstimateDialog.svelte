<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { X, ArrowRight, Camera, Map, Upload, Send } from "lucide-svelte";
    import { fade, scale } from "svelte/transition";
    import { toast } from "svelte-sonner";

    export let isOpen = false;

    const dispatch = createEventDispatcher();

    let step = 1;

    let formData = {
        name: "",
        phone: "",
        email: "",
        address: "",
        service: "",
        lotSize: "",
        timeline: "",
        details: "",
    };

    function close() {
        dispatch("close");
        step = 1;
    }

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        try {
            const response = await fetch(
                "https://formsubmit.co/ajax/spstripingfresno@gmail.com",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(formData),
                },
            );

            if (response.ok) {
                toast.success(
                    "thank you! we'll update your request as soon as possible.",
                );
                close();
                // Reset form
                formData = {
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                    service: "",
                    lotSize: "",
                    timeline: "",
                    details: "",
                };
                step = 1;
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error("Form submission error:", error);
        }
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Escape") close();
    }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
    <div
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        transition:fade={{ duration: 200 }}
        role="dialog"
        aria-modal="true"
    >
        <!-- Backdrop -->
        <button
            class="absolute inset-0 bg-black/50 cursor-default"
            on:click={close}
            aria-label="Close dialog"
        ></button>

        <!-- Dialog -->
        <div
            class="relative z-10 bg-[#1E2A3B] border border-[#374151] text-white max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl overflow-hidden"
            transition:scale={{ duration: 200, start: 0.95 }}
        >
            <!-- Background Video with Overlay -->
            <div class="absolute inset-0 z-0">
                <video
                    src="/bg_estimates.mp4"
                    autoplay
                    loop
                    muted
                    playsinline
                    class="w-full h-full object-cover"
                ></video>
                <div class="hero-video-overlay"></div>
            </div>

            <!-- Content Container -->
            <div class="relative z-10">
                <!-- Header -->
                <div
                    class="flex items-center justify-between p-6 border-b border-white/10"
                >
                    <h2 class="font-display text-2xl text-white">
                        {#if step === 1}Get Your Free Estimate{/if}
                        {#if step === 2}Project Details{/if}
                        {#if step === 3}Upload Photos{/if}
                    </h2>
                    <button
                        on:click={close}
                        class="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <!-- Progress -->
                <div class="flex justify-center gap-2 p-4">
                    {#each [1, 2, 3] as s}
                        <div
                            class="w-8 h-1 rounded-full {s <= step
                                ? 'bg-[#C94A4A]'
                                : 'bg-gray-700'}"
                        ></div>
                    {/each}
                </div>

                <!-- Content -->
                <form on:submit={handleSubmit} class="p-6">
                    {#if step === 1}
                        <div class="space-y-4">
                            <div>
                                <label
                                    class="text-gray-300 text-sm mb-2 block font-body"
                                    for="dialog-name">Full Name</label
                                >
                                <input
                                    id="dialog-name"
                                    name="name"
                                    bind:value={formData.name}
                                    placeholder="John Smith"
                                    class="w-full px-4 py-3 bg-[#FAF8F5] border border-transparent text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    class="text-gray-300 text-sm mb-2 block font-body"
                                    for="dialog-phone">Phone Number</label
                                >
                                <input
                                    id="dialog-phone"
                                    name="phone"
                                    bind:value={formData.phone}
                                    placeholder="(559) 123-4567"
                                    class="w-full px-4 py-3 bg-[#FAF8F5] border border-transparent text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    class="text-gray-300 text-sm mb-2 block font-body"
                                    for="dialog-email">Email</label
                                >
                                <input
                                    id="dialog-email"
                                    name="email"
                                    bind:value={formData.email}
                                    type="email"
                                    placeholder="john@company.com"
                                    class="w-full px-4 py-3 bg-[#FAF8F5] border border-transparent text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    class="text-gray-300 text-sm mb-2 block font-body"
                                    for="dialog-address">Property Address</label
                                >
                                <input
                                    id="dialog-address"
                                    name="address"
                                    bind:value={formData.address}
                                    placeholder="123 Main St, Fresno, CA"
                                    class="w-full px-4 py-3 bg-[#FAF8F5] border border-transparent text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                on:click={() => (step = 2)}
                                class="btn-primary w-full mt-4 flex items-center justify-center gap-2"
                            >
                                Continue
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    {/if}

                    {#if step === 2}
                        <div class="space-y-4">
                            <div>
                                <label
                                    class="text-gray-300 text-sm mb-2 block font-body"
                                    for="dialog-service">Service Type</label
                                >
                                <select
                                    id="dialog-service"
                                    name="service"
                                    bind:value={formData.service}
                                    class="w-full px-4 py-3 bg-[#FAF8F5] border border-transparent text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                                >
                                    <option value="">Select service</option>
                                    <option value="striping"
                                        >Line Striping</option
                                    >
                                    <option value="sealcoating"
                                        >Sealcoating</option
                                    >
                                    <option value="ada">ADA Compliance</option>
                                    <option value="restripe"
                                        >Restripe / Refresh</option
                                    >
                                    <option value="full">Full Package</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    class="text-gray-300 text-sm mb-2 block font-body"
                                    for="dialog-size"
                                    >Approximate Lot Size</label
                                >
                                <select
                                    id="dialog-size"
                                    name="lotSize"
                                    bind:value={formData.lotSize}
                                    class="w-full px-4 py-3 bg-[#FAF8F5] border border-transparent text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                                >
                                    <option value="">Select size</option>
                                    <option value="small"
                                        >Small (Under 20 spaces)</option
                                    >
                                    <option value="medium"
                                        >Medium (20-50 spaces)</option
                                    >
                                    <option value="large"
                                        >Large (50-100 spaces)</option
                                    >
                                    <option value="xlarge"
                                        >Extra Large (100+ spaces)</option
                                    >
                                </select>
                            </div>
                            <div>
                                <label
                                    class="text-gray-300 text-sm mb-2 block font-body"
                                    for="dialog-timeline"
                                    >Preferred Timeline</label
                                >
                                <select
                                    id="dialog-timeline"
                                    name="timeline"
                                    bind:value={formData.timeline}
                                    class="w-full px-4 py-3 bg-[#FAF8F5] border border-transparent text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                                >
                                    <option value="">Select timeline</option>
                                    <option value="asap">ASAP</option>
                                    <option value="2weeks"
                                        >Within 2 weeks</option
                                    >
                                    <option value="month">Within a month</option
                                    >
                                    <option value="flexible">Flexible</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    class="text-gray-300 text-sm mb-2 block font-body"
                                    for="dialog-details"
                                    >Additional Details</label
                                >
                                <textarea
                                    id="dialog-details"
                                    name="details"
                                    bind:value={formData.details}
                                    placeholder="Any specific requirements or questions..."
                                    class="w-full px-4 py-3 bg-[#FAF8F5] border border-transparent text-[#1E2A3B] rounded-xl min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                                ></textarea>
                            </div>
                            <div class="flex gap-3">
                                <button
                                    type="button"
                                    on:click={() => (step = 1)}
                                    class="btn-ghost text-white flex-1 hover:bg-white/10 hover:text-white inset-0 before:hidden"
                                    >Back</button
                                >
                                <button
                                    type="button"
                                    on:click={() => (step = 3)}
                                    class="btn-primary flex-1">Continue</button
                                >
                            </div>
                        </div>
                    {/if}

                    {#if step === 3}
                        <div class="space-y-4">
                            <div
                                class="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-[#C94A4A]/50 transition-colors bg-white/5"
                            >
                                <Camera
                                    class="w-12 h-12 text-gray-400 mx-auto mb-4"
                                />
                                <p
                                    class="text-white font-semibold mb-2 font-body"
                                >
                                    Upload Photos of Your Lot
                                </p>
                                <p class="text-gray-400 text-sm mb-4 font-body">
                                    Help us provide a more accurate estimate by
                                    sharing photos of your parking area.
                                </p>
                                <button
                                    type="button"
                                    class="btn-ghost text-white text-sm hover:bg-white/10 hover:text-white inset-0 before:hidden"
                                >
                                    <Upload size={16} class="inline mr-2" />
                                    Choose Files
                                </button>
                            </div>

                            <div class="bg-white/10 p-4 rounded-2xl">
                                <div class="flex items-start gap-3">
                                    <Map
                                        class="w-5 h-5 text-[#3B5998] flex-shrink-0 mt-0.5"
                                    />
                                    <div>
                                        <p
                                            class="text-white text-sm font-semibold mb-1 font-body"
                                        >
                                            Drop a Pin
                                        </p>
                                        <p
                                            class="text-gray-400 text-xs font-body"
                                        >
                                            You can also share your location or
                                            drop a pin on the map for easier
                                            navigation to your property.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    on:click={() => (step = 2)}
                                    class="btn-ghost text-white flex-1 hover:bg-white/10 hover:text-white inset-0 before:hidden"
                                    >Back</button
                                >
                                <button
                                    type="submit"
                                    class="btn-primary flex-1 flex items-center justify-center gap-2"
                                >
                                    <Send size={18} />
                                    Submit Request
                                </button>
                            </div>
                        </div>
                    {/if}
                </form>
            </div>
        </div>
    </div>
{/if}
