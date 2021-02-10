export interface BottomNavItem {
    /**
     * The icon which is shown on this button.
     */
    icon: string;

    /**
     * The label which is shown on this button.
     */
    label: string;

    /**
     * The route where this button navigates to.
     */
    routerLink: string;

    
    routerLinkParams: string[];

    /**
     * Whether the route should match exactly for this item to be active.
     */
    exact?: boolean;
}