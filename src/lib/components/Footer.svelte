<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { Phone, Mail, MapPin } from "lucide-svelte";

    const dispatch = createEventDispatcher();
</script>

<footer class="bg-[#0F1621] border-t border-[#1E2A3B]">
    <div class="px-6 lg:px-12 py-12 lg:py-16">
        <div class="max-w-7xl mx-auto">
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12"
            >
                <!-- Brand Column -->
                <div class="lg:col-span-1">
                    <div class="flex items-center gap-2 mb-4">
                        <img
                            src="/logo.png"
                            alt="S&P Striping Logo"
                            class="h-10 w-auto"
                        />
                        <span class="font-display text-xl text-white">
                            S&P <span class="text-[#C94A4A]"
                                >LINE STRIPING & SEALCOATING</span
                            >
                        </span>
                    </div>
                    <p
                        class="text-[#9CA3AF] text-sm mb-6 font-body leading-relaxed"
                    >
                        Professional line striping and sealcoating services for
                        the Central Valley since 2012. Quality service for your
                        quality business.
                    </p>
                    <div class="flex gap-3">
                        <a
                            href="https://www.tiktok.com/@spstripingfresno?_r=1&_t=ZP-93cWbq7hxkt"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-10 h-10 rounded-full bg-[#1E2A3B] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#000000] transition-all"
                            aria-label="Follow us on TikTok"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                ><path
                                    d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                                /></svg
                            >
                        </a>
                        <a
                            href="https://youtube.com/@spstriping?si=zhp-eNQhVeFdM7-j"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-10 h-10 rounded-full bg-[#1E2A3B] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#FF0000] transition-all"
                            aria-label="Follow us on YouTube"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                ><path
                                    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                                /></svg
                            >
                        </a>
                        <a
                            href="https://maps.app.goo.gl/pYWJaN4FPzTqFEpj9"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-10 h-10 rounded-full bg-[#1E2A3B] flex items-center justify-center text-[#9CA3AF] hover:text-white hover:bg-[#4285F4] transition-all"
                            aria-label="Find us on Google Maps"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                ><path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                /><path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                /><path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                /><path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                /></svg
                            >
                        </a>
                    </div>
                    <p class="text-[#6B7280] text-xs mt-4">
                        Follow us on Social Media
                    </p>
                </div>

                <!-- Quick Links -->
                <div>
                    <h4 class="font-display text-white text-lg mb-4">
                        Quick Links
                    </h4>
                    <ul class="space-y-3">
                        <li>
                            <button
                                on:click={() => dispatch("scrollToHero")}
                                class="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body"
                                >Home</button
                            >
                        </li>
                        <li>
                            <button
                                on:click={() => dispatch("scrollToServices")}
                                class="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body"
                                >Services</button
                            >
                        </li>
                        <li>
                            <button
                                on:click={() => dispatch("scrollToWork")}
                                class="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body"
                                >Our Work</button
                            >
                        </li>
                        <li>
                            <button
                                on:click={() => dispatch("scrollToProcess")}
                                class="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body"
                                >Our Process</button
                            >
                        </li>
                        <li>
                            <button
                                on:click={() =>
                                    dispatch("scrollToTestimonials")}
                                class="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body"
                                >Reviews</button
                            >
                        </li>
                        <li>
                            <button
                                on:click={() => dispatch("scrollToContact")}
                                class="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body"
                                >Contact</button
                            >
                        </li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div>
                    <h4 class="font-display text-white text-lg mb-4">
                        Contact
                    </h4>
                    <ul class="space-y-3">
                        <li class="flex items-start gap-3">
                            <MapPin
                                class="w-4 h-4 text-[#C94A4A] flex-shrink-0 mt-1"
                            />
                            <span class="text-[#9CA3AF] text-sm font-body"
                                >Fresno, CA serving the entire San Joaquin
                                Valley</span
                            >
                        </li>
                        <li class="flex items-center gap-3">
                            <Phone
                                class="w-4 h-4 text-[#C94A4A] flex-shrink-0"
                            />
                            <a
                                href="tel:+15597043141"
                                class="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body"
                                >(559) 704-3141</a
                            >
                        </li>
                        <li class="flex items-center gap-3">
                            <Mail
                                class="w-4 h-4 text-[#C94A4A] flex-shrink-0"
                            />
                            <a
                                href="mailto:spstripingfresno@gmail.com"
                                class="text-[#9CA3AF] hover:text-white text-sm transition-colors font-body"
                                >spstripingfresno@gmail.com</a
                            >
                        </li>
                        <li class="flex items-center gap-3 pt-2">
                            <span class="text-[#6B7280] text-xs font-body"
                                >License #1142328</span
                            >
                        </li>
                    </ul>
                </div>

                <!-- Hours -->
                <div>
                    <h4 class="font-display text-white text-lg mb-4">Hours</h4>
                    <ul class="space-y-2 text-[#9CA3AF] text-sm font-body">
                        <li class="flex flex-col gap-1">
                            <span class="text-white text-base font-semibold"
                                >Monday-Friday 24 Hours</span
                            >
                            <span>We stripe anytime</span>
                        </li>
                    </ul>
                    <div class="mt-6 p-4 bg-[#1E2A3B] rounded-xl">
                        <p class="text-[#F59E0B] text-xs font-mono-label mb-1">
                            After-Hours Available
                        </p>
                        <p class="text-[#9CA3AF] text-xs font-body">
                            Weekend & overnight work available for businesses
                            that need minimal disruption.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div
                class="pt-8 border-t border-[#1E2A3B] flex flex-col md:flex-row items-center justify-between gap-4"
            >
                <span class="text-[#6B7280] text-sm font-body"
                    >© 2026 S&P Line Striping & Asphalt Sealcoating. All rights
                    reserved.</span
                >
                <div class="flex items-center gap-6">
                    <a
                        href="/privacy-policy"
                        class="text-[#6B7280] hover:text-white text-sm transition-colors font-body"
                        >Privacy Policy</a
                    >
                    <a
                        href="/terms-of-service"
                        class="text-[#6B7280] hover:text-white text-sm transition-colors font-body"
                        >Terms of Service</a
                    >
                    <button
                        on:click={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })}
                        class="text-[#6B7280] hover:text-white text-sm transition-colors font-body"
                        >Back to Top</button
                    >
                </div>
            </div>
        </div>
    </div>
</footer>
