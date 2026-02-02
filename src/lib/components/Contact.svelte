<script lang="ts">
    import { Phone, Mail, MapPin, Send } from "lucide-svelte";
    import { toast } from "svelte-sonner";

    export let section: HTMLElement;

    let formData = {
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
    };

    function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        toast.success(
            "Estimate request submitted! We'll contact you within 24 hours.",
        );
        formData = { name: "", phone: "", email: "", service: "", message: "" };
    }
</script>

<section
    bind:this={section}
    class="section-flowing bg-[#1E2A3B] relative overflow-hidden"
>
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
        <img
            src="/line striping/sp-67.jpeg"
            alt=""
            class="w-full h-full object-cover"
            loading="lazy"
        />
        <div class="absolute inset-0 bg-black/85"></div>
    </div>

    <div class="relative z-10 px-6 lg:px-12 py-12">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col lg:flex-row gap-12 lg:gap-20">
                <div class="w-full lg:w-1/2">
                    <div class="contact-animate">
                        <div class="inline-flex items-center gap-2 mb-4">
                            <span class="font-mono-label text-[#C94A4A]"
                                >Get in Touch</span
                            >
                        </div>
                        <h2
                            class="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4"
                        >
                            REQUEST A FREE
                            <br />
                            <span class="text-[#C94A4A]">ESTIMATE.</span>
                        </h2>
                        <p class="text-[#9CA3AF] mb-4 font-body">
                            Tell us what you need—striping, sealcoating, ADA
                            updates, or a full restripe. We'll reply within one
                            business day.
                        </p>
                        <div class="flex flex-col gap-1 mb-8">
                            <span class="font-mono-label text-xs text-[#C94A4A]"
                                >Owners</span
                            >
                            <h3 class="font-display text-2xl text-white">
                                Paarth Patel & Shivam Patel
                            </h3>
                            <span class="text-[#9CA3AF] text-sm font-body"
                                >Contractors License #1142328</span
                            >
                        </div>
                    </div>

                    <div class="contact-animate space-y-4 mb-8">
                        <a
                            href="tel:+15597043141"
                            class="flex items-center gap-4 text-[#9CA3AF] hover:text-white transition-colors group"
                        >
                            <div
                                class="w-12 h-12 bg-[#C94A4A]/20 rounded-full flex items-center justify-center group-hover:bg-[#C94A4A]/30 transition-colors"
                            >
                                <Phone class="w-5 h-5 text-[#C94A4A]" />
                            </div>
                            <div>
                                <div class="font-mono-label text-xs mb-1">
                                    Call or Text
                                </div>
                                <div class="font-semibold text-white">
                                    (559) 704-3141
                                </div>
                            </div>
                        </a>

                        <a
                            href="mailto:spstripingfresno@gmail.com"
                            class="flex items-center gap-4 text-[#9CA3AF] hover:text-white transition-colors group"
                        >
                            <div
                                class="w-12 h-12 bg-[#3B5998]/20 rounded-full flex items-center justify-center group-hover:bg-[#3B5998]/30 transition-colors"
                            >
                                <Mail class="w-5 h-5 text-[#3B5998]" />
                            </div>
                            <div>
                                <div class="font-mono-label text-xs mb-1">
                                    Email
                                </div>
                                <div class="font-semibold text-white">
                                    spstripingfresno@gmail.com
                                </div>
                            </div>
                        </a>

                        <div class="flex items-center gap-4 text-[#9CA3AF]">
                            <div
                                class="w-12 h-12 bg-[#F59E0B]/20 rounded-full flex items-center justify-center"
                            >
                                <MapPin class="w-5 h-5 text-[#F59E0B]" />
                            </div>
                            <div>
                                <div class="font-mono-label text-xs mb-1">
                                    Service Area
                                </div>
                                <div class="font-semibold text-white">
                                    Fresno, CA & Central Valley
                                </div>
                            </div>
                        </div>

                        <!-- Social Media -->
                        <div class="mt-8">
                            <p
                                class="font-mono-label text-xs text-[#C94A4A] mb-4"
                            >
                                Follow us on Social Media
                            </p>
                            <div class="flex gap-4">
                                <a
                                    href="https://www.tiktok.com/@spstriping"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="w-12 h-12 bg-[#1E2A3B] rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#000000] transition-all"
                                    aria-label="Follow us on TikTok"
                                >
                                    <svg
                                        class="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        ><path
                                            d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.89 2.89 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                                        /></svg
                                    >
                                </a>
                                <a
                                    href="https://www.youtube.com/@spstriping"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="w-12 h-12 bg-[#1E2A3B] rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#FF0000] transition-all"
                                    aria-label="Follow us on YouTube"
                                >
                                    <svg
                                        class="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        ><path
                                            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                                        /></svg
                                    >
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="contact-animate w-full lg:w-1/2">
                    <form
                        on:submit={handleSubmit}
                        class="p-6 lg:p-8 bg-white border-2 border-[#E5E7EB] rounded-2xl mb-8"
                    >
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label
                                    for="name"
                                    class="text-[#6B7280] text-sm mb-2 block font-body"
                                    >Name</label
                                >
                                <input
                                    id="name"
                                    bind:value={formData.name}
                                    placeholder="Your name"
                                    class="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E5E7EB] text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    for="phone"
                                    class="text-[#6B7280] text-sm mb-2 block font-body"
                                    >Phone</label
                                >
                                <input
                                    id="phone"
                                    bind:value={formData.phone}
                                    placeholder="(555) 123-4567"
                                    class="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E5E7EB] text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                                    required
                                />
                            </div>
                        </div>

                        <div class="mb-4">
                            <label
                                for="email"
                                class="text-[#6B7280] text-sm mb-2 block font-body"
                                >Email</label
                            >
                            <input
                                id="email"
                                bind:value={formData.email}
                                type="email"
                                placeholder="you@company.com"
                                class="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E5E7EB] text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                                required
                            />
                        </div>

                        <div class="mb-4">
                            <label
                                for="service"
                                class="text-[#6B7280] text-sm mb-2 block font-body"
                                >Service Needed</label
                            >
                            <select
                                id="service"
                                bind:value={formData.service}
                                class="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E5E7EB] text-[#1E2A3B] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                            >
                                <option value="">Select a service</option>
                                <option value="striping">Line Striping</option>
                                <option value="sealcoating">Sealcoating</option>
                                <option value="ada">ADA Compliance</option>
                                <option value="restripe">Restripe</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div class="mb-6">
                            <label
                                for="message"
                                class="text-[#6B7280] text-sm mb-2 block font-body"
                                >Message</label
                            >
                            <textarea
                                id="message"
                                bind:value={formData.message}
                                placeholder="Tell us about your project..."
                                class="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E5E7EB] text-[#1E2A3B] min-h-[100px] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C94A4A]"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            class="btn-primary w-full flex items-center justify-center gap-2"
                        >
                            <Send size={18} />
                            Send Request
                        </button>
                    </form>

                    <!-- Google Maps Iframe -->
                    <div
                        class="rounded-2xl overflow-hidden border-2 border-[#E5E7EB] shadow-2xl h-[300px] w-full bg-white"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6388.5498442522085!2d-119.700816!3d36.8119315!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80945d075507a6a3%3A0xc510b68fc9bbf152!2sS%26P%20-%20Line%20Striping%20and%20Sealcoating!5e0!3m2!1sen!2sus!4v1769767312762!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style="border: 0;"
                            allowfullscreen
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            title="S&P - Line Striping and Sealcoating Location"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
