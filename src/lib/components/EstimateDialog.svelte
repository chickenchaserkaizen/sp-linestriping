<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { X, ArrowRight, Camera, Map, Upload, Send } from "lucide-svelte";
    import { fade, scale } from "svelte/transition";
    import { toast } from "svelte-sonner";

    export let isOpen = false;

    const dispatch = createEventDispatcher();

    let step = 1;

    function close() {
        dispatch("close");
        step = 1;
    }

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        toast.success(
            "Estimate request submitted! We'll contact you within 24 hours.",
        );
        close();
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
            class="relative z-10 bg-white border border-[#E5E7EB] text-[#1E2A3B] max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl"
            transition:scale={{ duration: 200, start: 0.95 }}
        >
            <!-- Header -->
            <div
                class="flex items-center justify-between p-6 border-b border-[#E5E7EB]"
            >
                <h2 class="font-display text-2xl">
                    {#if step === 1}Get Your Free Estimate{/if}
                    {#if step === 2}Project Details{/if}
                    {#if step === 3}Upload Photos{/if}
                </h2>
                <button
                    on:click={close}
                    class="text-[#6B7280] hover:text-[#1E2A3B] transition-colors"
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
                            : 'bg-[#E5E7EB]'}"
                    ></div>
                {/each}
            </div>

            <!-- Content -->
            <form on:submit={handleSubmit} class="p-6">
                {#if step === 1}
                    <div class="space-y-4">
                        <div>
                            <label
                                class="text-[#6B7280] text-sm mb-2 block font-body"
                                >Full Name</label
                            >
                            <input
                                placeholder="John Smith"
                                class="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E5E7EB] text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                                required
                            />
                        </div>
                        <div>
                            <label
                                class="text-[#6B7280] text-sm mb-2 block font-body"
                                >Phone Number</label
                            >
                            <input
                                placeholder="(559) 123-4567"
                                class="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E5E7EB] text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                                required
                            />
                        </div>
                        <div>
                            <label
                                class="text-[#6B7280] text-sm mb-2 block font-body"
                                >Email</label
                            >
                            <input
                                type="email"
                                placeholder="john@company.com"
                                class="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E5E7EB] text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                                required
                            />
                        </div>
                        <div>
                            <label
                                class="text-[#6B7280] text-sm mb-2 block font-body"
                                >Property Address</label
                            >
                            <input
                                placeholder="123 Main St, Fresno, CA"
                                class="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E5E7EB] text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
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
                                class="text-[#6B7280] text-sm mb-2 block font-body"
                                >Service Type</label
                            >
                            <select
                                class="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E5E7EB] text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                            >
                                <option value="">Select service</option>
                                <option value="striping">Line Striping</option>
                                <option value="sealcoating">Sealcoating</option>
                                <option value="ada">ADA Compliance</option>
                                <option value="restripe"
                                    >Restripe / Refresh</option
                                >
                                <option value="full">Full Package</option>
                            </select>
                        </div>
                        <div>
                            <label
                                class="text-[#6B7280] text-sm mb-2 block font-body"
                                >Approximate Lot Size</label
                            >
                            <select
                                class="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E5E7EB] text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
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
                                class="text-[#6B7280] text-sm mb-2 block font-body"
                                >Preferred Timeline</label
                            >
                            <select
                                class="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E5E7EB] text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                            >
                                <option value="">Select timeline</option>
                                <option value="asap">ASAP</option>
                                <option value="2weeks">Within 2 weeks</option>
                                <option value="month">Within a month</option>
                                <option value="flexible">Flexible</option>
                            </select>
                        </div>
                        <div>
                            <label
                                class="text-[#6B7280] text-sm mb-2 block font-body"
                                >Additional Details</label
                            >
                            <textarea
                                placeholder="Any specific requirements or questions..."
                                class="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E5E7EB] text-[#1E2A3B] rounded-xl min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                            ></textarea>
                        </div>
                        <div class="flex gap-3">
                            <button
                                type="button"
                                on:click={() => (step = 1)}
                                class="btn-ghost flex-1">Back</button
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
                            class="border-2 border-dashed border-[#E5E7EB] rounded-2xl p-8 text-center hover:border-[#C94A4A]/50 transition-colors"
                        >
                            <Camera
                                class="w-12 h-12 text-[#9CA3AF] mx-auto mb-4"
                            />
                            <p
                                class="text-[#1E2A3B] font-semibold mb-2 font-body"
                            >
                                Upload Photos of Your Lot
                            </p>
                            <p class="text-[#6B7280] text-sm mb-4 font-body">
                                Help us provide a more accurate estimate by
                                sharing photos of your parking area.
                            </p>
                            <button type="button" class="btn-ghost text-sm">
                                <Upload size={16} class="inline mr-2" />
                                Choose Files
                            </button>
                        </div>

                        <div class="bg-[#FAF8F5] p-4 rounded-2xl">
                            <div class="flex items-start gap-3">
                                <Map
                                    class="w-5 h-5 text-[#3B5998] flex-shrink-0 mt-0.5"
                                />
                                <div>
                                    <p
                                        class="text-[#1E2A3B] text-sm font-semibold mb-1 font-body"
                                    >
                                        Drop a Pin
                                    </p>
                                    <p class="text-[#6B7280] text-xs font-body">
                                        You can also share your location or drop
                                        a pin on the map for easier navigation
                                        to your property.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-3 pt-4">
                            <button
                                type="button"
                                on:click={() => (step = 2)}
                                class="btn-ghost flex-1">Back</button
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
{/if}
