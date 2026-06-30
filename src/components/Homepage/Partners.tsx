import {HttpService} from "../../utils/HttpService";
import type {Partner} from "../../types/handler.ts";
import {useQuery} from "@tanstack/react-query";

export const Partners = () => {
    const {data: partners} = useQuery({
        queryKey: ["partners"],
        queryFn: () => HttpService.get<Partner[]>("/api/partners"),

    });

    return (
        <div className="flex flex-col gap-12 px-4 py-16 items-center mb-16" id="centers">
            <div className="flex flex-col items-center text-center gap-4 mb-8">
                <h2 className="text-on-surface text-headline-lg font-black leading-tight max-w-180">
                    مراکز معتبر، تایید شده توسط مشتریان
                </h2>
                <p className="text-on-surface-variant text-body-lg font-normal leading-normal max-w-180">ما بهترین مراکز خدمات خودرو را گرد هم آورده‌ایم تا با اطمینان کامل انتخاب کنید.</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 w-full">
                {partners?.map((partner) => (
                    <div key={partner.id} className="flex flex-col gap-4 bg-surface rounded-[2rem]  overflow-hidden shadow-md hover:shadow-xl transition-all border border-surface-variant">
                        <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${partner.imageUrl}')` }}></div>
                        <div className="p-6 flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <h3 className="text-on-surface text-title-lg font-bold">{partner.title}</h3>
                                <div className="flex items-center gap-1 text-tertiary-fixed-dim">
                                    <span className="material-symbols-outlined text-sm">star</span>
                                    <span className="text-label-lg font-bold text-on-surface">{partner.rating}</span>
                                </div>
                            </div>
                            <p className="text-on-surface-variant text-body-md">{partner.description}</p>
                            <div className="flex gap-2 mt-2">
                                {partner.tags.map((tag) => (
                                    <span key={tag} className="text-xs font-medium bg-surface-container-high px-2 py-1 rounded-md text-on-surface-variant">{tag}</span>
                                ))}
                            </div>
                            <button className="mt-4 cursor-pointer w-full h-10 rounded-full bg-primary/10 text-primary font-bold hover:bg-primary/20 transition-colors">مشاهده و رزرو</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
