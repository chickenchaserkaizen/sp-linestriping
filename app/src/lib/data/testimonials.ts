export interface Testimonial {
    quote: string;
    name: string;
    role: string;
    rating: number;
}

export const testimonials: Testimonial[] = [
    {
        quote: "S&P - Line Striping and Sealcoating did an excellent job for our gym. Their team was both professional and courteous. They paid great attention to detail, ensuring that all lines were accurately drawn—from beneath the basketball hoop to the free throw lines, and the volleyball court was perfectly centered. Shivam and his brother truly did an outstanding job! I highly recommend them for any indoor or outdoor court striping needs!",
        name: "Mitesh Gajjar",
        role: "Google Review",
        rating: 5
    },
    {
        quote: "I highly recommend S&P line striping. They are very responsive and easy to work with. They didn't sell us anything we didn't need, were honest and straight to the point. They resealed our entire parking lot, repaired all lines, arrows, accessible parking, curbs and even custom wording. Very happy with the results!",
        name: "Eric Stoner",
        role: "Google Review",
        rating: 5
    },
    {
        quote: "First and foremost I would like to state how professional this company is when it came to communication and planning. Pricing for striping was extremely reasonable compared to other companies who quoted almost double. The team at S&P Line Striping works fast and does an amazing job. If you're looking for striping for your business this is the company to reach out to!",
        name: "Max Lor",
        role: "Google Review",
        rating: 5
    }
];
