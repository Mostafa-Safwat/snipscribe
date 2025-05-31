import { NavigationSection } from '@/components/drawer/types';
import { Home, History, TravelExplore, Favorite } from '@mui/icons-material';

export const navigationSections: NavigationSection[] = [
    {
        title: 'Main',
        items: [
            {
                text: 'Home',
                icon: Home,
                route: '/home',
            },
            {
                text: 'History',
                icon: History,
                route: '/history',
            },
            {
                text: 'Discover',
                icon: TravelExplore,
                route: '/discover',
            },
            {
                text: 'Favorites',
                icon: Favorite,
                route: '/favorites',
            },
        ],
    },
];
