const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PROGRAMS = [
    {
        id: "food-water",
        title: "Food & Water",
        short_description: "Providing healthy food and clean drinking water to those in need.",
        icon: "Utensils",
        cover_image: "/assets/4c9b73c1-6d96-44aa-9abc-9a52cb4a6aaa.jpg",
        goal: 10000,
        raised: 4500,
    },
    {
        id: "education",
        title: "Education for All",
        short_description: "Quality education and tools to empower children for a better future.",
        icon: "BookOpen",
        cover_image: "/assets/50ea6add-857a-41e9-bfe4-e386c89c1174.jpg",
        goal: 7000,
        raised: 3200,
    },
    {
        id: "shelter",
        title: "Home & Shelter",
        short_description: "Building safe housing and providing basic necessities for families.",
        icon: "Home",
        cover_image: "/assets/a95f1953-d291-4044-bc85-0be1d414581e.jpg",
        goal: 25000,
        raised: 12000,
    },
];

const EVENTS = [
    {
        id: "healthy-india",
        title: "Healthy India Campaign",
        date: "2026-12-15",
        location: "Mumbai, Maharashtra",
        is_upcoming: true,
        description: "Nutrition awareness and health checkup camp for underprivileged communities.",
    },
    {
        id: "food-camp",
        title: "Senior Citizen Food Camp",
        date: "2026-12-20",
        location: "Mumbai, Maharashtra",
        is_upcoming: true,
        description: "Special distribution drive focused on providing nutritious meals to senior citizens.",
    },
    {
        id: "stop-violence",
        title: "Stop Violence Against Women",
        date: "2026-11-25",
        location: "Mumbai, Maharashtra",
        is_upcoming: false,
        description: "Advocacy and awareness workshop on women's rights and safety.",
    },
];

const PROJECTS = [
    {
        id: "p1",
        title: "School Kit Distribution",
        program: "Education",
        date: "2025-06-12",
        thumbnail: "/assets/3af1fa51-2586-4b2f-80de-f8d549a15094.jpg",
    },
    {
        id: "p2",
        title: "Clean Water Initiative",
        program: "Food & Water",
        date: "2025-08-05",
        thumbnail: "/assets/7dae08d9-696a-4a7b-badd-88611cea6d80.jpg",
    },
    {
        id: "p3",
        title: "Winter Relief Drive",
        program: "Home & Shelter",
        date: "2025-11-20",
        thumbnail: "/assets/86b0333e-99d5-4d90-8b01-e07595cc170d.jpg",
    },
];

export const api = {
    getPrograms: async () => {
        await delay(500);
        return { success: true, data: PROGRAMS };
    },
    getEvents: async () => {
        await delay(500);
        return { success: true, data: EVENTS };
    },
    getProjects: async () => {
        await delay(500);
        return { success: true, data: PROJECTS };
    },
    submitVolunteer: async (data) => {
        await delay(800);
        console.log("Volunteer submission:", data);
        return { success: true, message: "Volunteer registered successfully" };
    },
    submitContact: async (data) => {
        await delay(800);
        console.log("Contact submission:", data);
        return { success: true, message: "Message received" };
    },
};
