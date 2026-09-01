export interface FavoriteCenter {
    id: number;
    name: string;
    address: string;
    rating: number;
    reviews: number;
    phone: string;
    isOpen: boolean;
}

export const FAVORITES: FavoriteCenter[] = [
    { id: 1, name: "مرکز خدمات آریا", address: "تهران، خیابان ولیعصر، نرسیده به تجریش", rating: 4.8, reviews: 124, phone: "۰۲۱-۸۸۸۸۸۸۸۸", isOpen: true },
    { id: 2, name: "اتو کلینیک البرز", address: "کرج، مهرشهر، بلوار ارم", rating: 4.6, reviews: 89, phone: "۰۲۶-۳۳۳۳۳۳۳۳", isOpen: true },
    { id: 3, name: "تعمیرگاه تخصصی نیاوران", address: "تهران، نیاوران، خیابان باهنر", rating: 4.9, reviews: 312, phone: "۰۲۱-۲۲۲۲۲۲۲۲", isOpen: false },
];
