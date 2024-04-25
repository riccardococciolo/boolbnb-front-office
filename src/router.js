import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import AboutUs from "./pages/AboutUs.vue";
import ResearchPage from "./pages/ResearchPage.vue";

import ContactPage from "./pages/ContactPage.vue"
import NotFoundPage from "./pages/NotFoundPage.vue"
import ApartmentDetails from "./pages/ApartmentDetails.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path      : '/',
            name      : 'home',
            component : HomePage,
        },
        {
            path      : '/about',
            name      : 'about-us',
            component : AboutUs,
        },
        {
            path      : '/research',
            name      : 'research',
            component : ResearchPage
        },
        {
            path      : '/contact',
            name      : 'contact',
            component : ContactPage
        },        
        {
            path      : '/research/:slug',
            name      : 'apartment-details',
            component : ApartmentDetails,
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: NotFoundPage
        },
    ],
});

export { router };