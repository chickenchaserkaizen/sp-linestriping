import {
    ParkingSquare,
    Flame,
    Signpost,
    Trophy,
    Droplet,
    Wrench
} from 'lucide-svelte';
import type { ComponentType } from 'svelte';

export interface Service {
    id: string;
    icon: ComponentType;
    title: string;
    desc: string;
    image: string;
}

export const services: Service[] = [
    {
        id: 'service-line-striping',
        icon: ParkingSquare,
        title: 'Line Striping',
        desc: 'Fresh, crisp lines that define your space and direct traffic flow with precision.',
        image: '/line striping/sp-17.jpeg'
    },
    {
        id: 'service-ada-fire-compliance',
        icon: Flame,
        title: 'ADA + Fire Compliance',
        desc: 'Full compliance with ADA and fire lane standards for accessible, safe parking.',
        image: '/ADA and fire compliance/sp-20.jpeg'
    },
    {
        id: 'service-signage',
        icon: Signpost,
        title: 'Signage',
        desc: 'Professional pavement markings, directional arrows, and custom stencils.',
        image: '/Signage/sp-45.jpeg'
    },
    {
        id: 'service-recreational-courts',
        icon: Trophy,
        title: 'Recreational Courts',
        desc: 'Basketball, tennis, pickleball—precision court striping for sports facilities.',
        image: '/recreational courts/sp-1.jpeg'
    },
    {
        id: 'service-seal-coating',
        icon: Droplet,
        title: 'Seal Coating',
        desc: 'Protective coating that extends pavement life and restores that like-new black finish.',
        image: '/Seal Coating/sp-31.jpeg'
    },
    {
        id: 'service-crack-filling',
        icon: Wrench,
        title: 'Crack Filling',
        desc: 'Stop cracks before they spread. Hot-pour crack sealing for lasting repairs.',
        image: '/Crack Filling/sp-16.jpeg'
    }
];
