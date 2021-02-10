import { transition, trigger, style, query, group, animateChild, animate } from "@angular/animations";

export const flyInOutAnimation =
    trigger('routeAnimations', [
        transition('MainPage => *', [
            style({ position: 'relative', maxWidth: '100%' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 1,
                    width: '100%'
                })
            ]),
            query(':enter', [
                style({ left: '100%' })
            ]),
            query(':leave', animateChild(), { optional: true }),
            group([
                query(':leave', [
                    animate('300ms ease-out', style({ opacity: 0.7 }))
                ], { optional: true }),
                query(':enter', [
                    animate('400ms ease-in', style({ left: 0 }))
                ])
            ]),
            query(':enter', animateChild(), { optional: true }),
        ]),
        transition('* => MainPage', [
            style({ position: 'relative', maxWidth: '100%' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: 1,
                    width: '100%'
                })
            ]),
            query(':leave', animateChild(), { optional: true }),
            group([
                query(':leave', [
                    animate('400ms ease-out', style({
                        opacity: 0.7, left: '100%',
                    }))
                ], { optional: true })
            ]),
        ]),

    ]);

 