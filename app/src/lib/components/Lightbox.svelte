<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { X } from "lucide-svelte";
    import { fade, scale } from "svelte/transition";

    export let image: string | null = null;

    const dispatch = createEventDispatcher();

    function close() {
        dispatch("close");
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Escape") close();
    }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if image}
    <div
        class="fixed inset-0 z-[100] flex items-center justify-center"
        transition:fade={{ duration: 200 }}
        role="dialog"
        aria-modal="true"
    >
        <!-- Backdrop -->
        <button
            class="absolute inset-0 bg-black/90 cursor-default"
            on:click={close}
            aria-label="Close lightbox"
        ></button>

        <!-- Image Container -->
        <div
            class="relative z-10 max-w-[95vw] max-h-[90vh]"
            transition:scale={{ duration: 200, start: 0.9 }}
        >
            <img
                src={image}
                alt="Gallery Preview"
                class="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <button
                on:click={close}
                class="absolute -top-12 right-0 p-2 text-white hover:text-[#C94A4A] transition-colors"
                aria-label="Close"
            >
                <X size={32} />
            </button>
        </div>
    </div>
{/if}
