<script lang="ts">
    import { Star } from "lucide-svelte";
    import { testimonials } from "$lib/data/testimonials";

    export let section: HTMLElement;
</script>

<section bind:this={section} class="section-flowing bg-[#1E2A3B] relative">
    <div class="relative z-10 px-6 lg:px-12 py-12">
        <div class="max-w-7xl mx-auto">
            <div class="testimonials-animate text-center mb-12">
                <div class="inline-flex items-center gap-2 mb-4">
                    <Star class="w-4 h-4 text-[#C94A4A] fill-[#C94A4A]" />
                    <span class="font-mono-label text-[#C94A4A]"
                        >Testimonials</span
                    >
                </div>
                <h2
                    class="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4"
                >
                    THEY NOTICE THE <span class="text-[#C94A4A]">DETAILS.</span>
                </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                {#each testimonials as testimonial, i}
                    <div
                        class="testimonials-animate p-6 bg-white border-2 border-[#1E2A3B] rounded-2xl card-hover"
                    >
                        <div class="flex gap-1 mb-4">
                            {#each Array(testimonial.rating) as _}
                                <Star
                                    class="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]"
                                />
                            {/each}
                        </div>
                        <p
                            class="text-[#6B7280] mb-6 text-sm leading-relaxed font-body line-clamp-5"
                        >
                            "{testimonial.quote}"
                        </p>
                        <div class="flex items-center gap-3">
                            <div
                                class="w-10 h-10 rounded-full bg-[#C94A4A]/10 flex items-center justify-center"
                            >
                                <span
                                    class="font-display text-[#C94A4A] text-sm"
                                    >{testimonial.name.charAt(0)}</span
                                >
                            </div>
                            <div>
                                <div
                                    class="font-display text-lg text-[#1E2A3B]"
                                >
                                    {testimonial.name}
                                </div>
                                <div
                                    class="text-[#9CA3AF] text-xs font-body flex items-center gap-1"
                                >
                                    <svg
                                        class="w-3 h-3"
                                        viewBox="0 0 24 24"
                                        fill="#4285F4"
                                    >
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                    {testimonial.role}
                                </div>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>
