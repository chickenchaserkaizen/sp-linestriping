export interface GalleryCategory {
    id: string;
    title: string;
    images: string[];
}

export const galleryCategories: GalleryCategory[] = [
    {
        id: 'service-line-striping',
        title: 'Line Striping',
        images: [
            '/line striping/sp-17.jpeg',
            '/line striping/sp-18.jpeg',
            '/line striping/sp-19.jpeg',
            '/line striping/sp-22.jpeg',
            '/line striping/sp-23.jpeg',
            '/line striping/sp-24.jpeg',
            '/line striping/sp-30.jpeg',
            '/line striping/sp-33.jpeg',
            '/line striping/sp-37.jpeg',
            '/line striping/sp-65.jpeg'
        ]
    },
    {
        id: 'service-ada-fire-compliance',
        title: 'ADA + Fire Signage',
        images: [
            '/ADA and fire compliance/sp-20.jpeg',
            '/ADA and fire compliance/sp-21.jpeg',
            '/ADA and fire compliance/sp-25.jpeg',
            '/ADA and fire compliance/sp-26.jpeg',
            '/ADA and fire compliance/sp-27.jpeg',
            '/ADA and fire compliance/sp-28.jpeg',
            '/ADA and fire compliance/sp-29.jpeg',
            '/ADA and fire compliance/sp-36.jpeg',
            '/ADA and fire compliance/sp-38.jpeg',
            '/ADA and fire compliance/sp-39.jpeg'
        ]
    },
    {
        id: 'service-signage',
        title: 'Signage & Markings',
        images: [
            '/Signage/sp-45.jpeg',
            '/Signage/sp-46.jpeg',
            '/Signage/sp-47.jpeg',
            '/Signage/sp-68.jpeg',
            '/Signage/sp-95.jpg'
        ]
    },
    {
        id: 'service-recreational-courts',
        title: 'Recreational Courts',
        images: [
            '/recreational courts/sp-1.jpeg',
            '/recreational courts/sp-2.jpg',
            '/recreational courts/sp-3.jpg',
            '/recreational courts/sp-4.jpg',
            '/recreational courts/sp-5.jpg',
            '/recreational courts/sp-6.jpg',
            '/recreational courts/sp-7.JPG',
            '/recreational courts/sp-9.jpg',
            '/recreational courts/sp-10.jpg',
            '/recreational courts/sp-11.jpg'
        ]
    },
    {
        id: 'service-seal-coating',
        title: 'Seal Coating',
        images: [
            '/Seal Coating/sp-31.jpeg',
            '/Seal Coating/sp-44.jpeg',
            '/Seal Coating/sp-63.jpeg',

            '/Crack Filling/sp-16.jpeg',
            '/Crack Filling/sp-57.jpeg',
            '/Crack Filling/sp-62.jpeg'
        ]
    },
    {
        id: 'service-crack-filling',
        title: 'Crack Filling',
        images: [
            '/Crack Filling/sp-16.jpeg',
            '/Crack Filling/sp-57.jpeg',
            '/Crack Filling/sp-62.jpeg',
            '/Seal Coating/sp-31.jpeg',
            '/Seal Coating/sp-44.jpeg',
            '/Seal Coating/sp-63.jpeg',

        ]
    }
];

export interface ProcessStep {
    step: string;
    title: string;
    desc: string;
    image: string;
}

export const processSteps: ProcessStep[] = [
    {
        step: '01',
        title: 'Measure & Layout',
        desc: 'We survey, chalk, and confirm compliance before paint hits pavement.',
        image: '/line striping/sp-67.jpeg'
    },
    {
        step: '02',
        title: 'Prep & Paint',
        desc: 'Clean surface, crisp lines, high-visibility paint or thermoplastic.',
        image: '/Signage/sp-68.jpeg'
    },
    {
        step: '03',
        title: 'Walkthrough',
        desc: "Inspect, touch up, and sign off—no invoice until you're satisfied.",
        image: '/line striping/sp-65.jpeg'
    }
];
