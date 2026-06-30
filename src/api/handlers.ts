import { http, HttpResponse } from "msw"
import type {Partner} from "../types/handler.ts";
const partners: Partner[] = [
    {
        id: 1,
        title: "مدرن اتو سرویس",
        rating: 4.8,
        description: "متخصص در خودروهای وارداتی و آلمانی.",
        tags: ["مکانیک", "دیاگ"],
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCedPDehRGHTmXIwuMVdOu7RwdSyF46eBRmeo1ueka_dswJfAUfYiwmznqqV1FcQ0xSg9xNwCLpSHhRHoQsQdyDIW6uZBvrhAdwmXF7yHPvsy8xZ_2fnTqniuBwg-MaDeLL5ZS9UdJabCcu_gcv3Ac1s1FJd74O-Nt-K9noazHJVI0HCERmiQAZmbmBTJyx63NjxbVSv732A4FMjcVxVW3CoJ5c1m6o_i12xJOGterVg0GGqPJ4dBeOCJwuqSQMmlabGNYE4cSQtzu7",
    },
    {
        id: 2,
        title: "کلینیک تخصصی درخشش",
        rating: 4.9,
        description: "برترین مرکز نانو سرامیک و کاور بدنه.",
        tags: ["دیتیلینگ", "سرامیک"],
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFaNMo12CiwB02Fvc1BROSCjIok9kP9NmUz3AzWfk_pgCBua-MOlAlFs_GFi7pwE5UM6mHp0jvO5itwthMbIXlGkSXWRtN6tGGgjy0UWV0av28z0aylSiDxJ77aA32-z6odJ_y7dKdVXntqW6A5OkSV4cZPa7jB0QRlMoKizYe7hEzPMOrm6-RFS9IzqxMthtxFFwibYka3AjOqiTcLG69s-4CwQrVIeK3NVf1gw7IK6HwE0m6cH4leU92tlZRHaerw-yLpWqZ6Dhk",
    },
    {
        id: 3,
        title: "لاستیک و جلوبندی پارس",
        rating: 4.7,
        description: "خدمات سریع لاستیک، بالانس و تنظیم فرمان 3D.",
        tags: ["تایر", "جلوبندی"],
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz6jfxXicNbEUvmW6wSmAOMcVsSOFrqSReBZa4WgfPNFWCZrJ9kM3mpX9SWnaaPKzLwvWOEXBsmdvwMkKWJYbWW5oitml63JbvPhFGS3HOh0pn5ILm15cEmNd-8v_xkXYw7n4T2yt5gw00deoi-XfwFRJOl34hWaC4bss6FFH-Xv6sFnd70_VqAZ_rkRLMEG70Zeb_vsnN1A-fNsNgl3394Pbj3fOr-PBQi3hGMm16revDoJlmpSxyFDzozdB8rdd6rZW4FlmnI9_i",
    },
]



export const handlers = [
    http.get("/api/health", () => {
        return HttpResponse.json({ status: "ok", timestamp: Date.now() })
    }),

    http.get("/api/partners" , () => {
        return HttpResponse.json(partners)
    })

]
