import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MapPin, Star, Heart, Phone, Search, Info } from "lucide-react";
import { ModalWrapper } from "../../components/shared/ModalWrapper.tsx";
import { HttpService } from "../../utils/HttpService.ts";
import type { FavoriteCenter } from "../../api/data/favorites.ts";

export const FavoritesPage = () => {
    const queryClient = useQueryClient();
    const [selectedCenter, setSelectedCenter] = useState<FavoriteCenter | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const { data: centers = [] } = useQuery({
        queryKey: ["favorites"],
        queryFn: () => HttpService.get<FavoriteCenter[]>("/api/favorites"),
    });

    const removeMutation = useMutation({
        mutationFn: (id: number) => HttpService.delete(`/api/favorites/${id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["favorites"] }),
        onSettled: () => setSelectedCenter(null),
    });

    const filteredCenters = useMemo(() => {
        if (!searchQuery.trim()) return centers;
        const q = searchQuery.trim();
        return centers.filter((c) => c.name.includes(q) || c.address.includes(q));
    }, [centers, searchQuery]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-on-surface text-headline-md font-bold">مراکز مورد علاقه</h1>
                    <span className="text-on-surface-variant text-label-md">دسترسی سریع به مراکز خدماتی نشان‌شده</span>
                </div>
                <div className="relative w-full sm:w-72">
                    <Search className="absolute right-3.5 top-3 size-5 text-on-surface-variant" strokeWidth={1.5} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="جستجوی مرکز..."
                        className="w-full h-11 pl-4 pr-11 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface text-label-md"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCenters.map((center) => (
                    <div key={center.id} className="flex flex-col bg-surface border border-outline-variant rounded-2xl p-5 hover:-translate-y-1 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-on-surface text-title-lg font-bold group-hover:text-primary transition-colors">{center.name}</span>
                                <div className="flex items-center gap-1.5 text-on-surface-variant text-label-sm">
                                    <MapPin className="size-3.5" strokeWidth={2}/>
                                    <span className="truncate max-w-[200px]">{center.address}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => removeMutation.mutate(center.id)}
                                className="text-secondary hover:bg-secondary/10 w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0"
                                title="حذف از علاقه‌مندی‌ها"
                            >
                                <Heart className="size-5 fill-secondary" strokeWidth={1.5}/>
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mb-5">
                            <div className="flex items-center gap-1 text-label-md font-bold text-on-surface">
                                <Star className="size-4 text-tertiary-container fill-tertiary-container" />
                                {center.rating} <span className="text-on-surface-variant font-normal">({center.reviews})</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-outline-variant"></div>
                            <span className={`text-label-sm font-bold ${center.isOpen ? "text-primary" : "text-error"}`}>
                                {center.isOpen ? "باز است" : "بسته"}
                            </span>
                        </div>

                        <div className="mt-auto flex items-center gap-3">
                            <button onClick={() => setSelectedCenter(center)} className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 transition-colors cursor-pointer text-label-md">
                                <Info className="size-4" strokeWidth={2}/>
                                جزئیات
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer">
                                <Phone className="size-4" strokeWidth={2}/>
                            </button>
                        </div>
                    </div>
                ))}
                {filteredCenters.length === 0 && (
                    <div className="col-span-full text-center py-12 text-on-surface-variant text-label-md">
                        مرکزی یافت نشد.
                    </div>
                )}
            </div>

            <ModalWrapper isOpen={!!selectedCenter} close={() => setSelectedCenter(null)}>
                {selectedCenter && (
                    <div className="p-6 flex flex-col gap-5">
                        <div className="flex items-start justify-between border-b border-outline-variant/50 pb-4 pl-10">
                            <div className="flex flex-col gap-1">
                                <h3 className="text-title-lg font-bold text-on-surface">{selectedCenter.name}</h3>
                                <span className="text-label-md text-on-surface-variant flex items-center gap-1.5"><MapPin className="size-4 shrink-0"/> {selectedCenter.address}</span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-label-sm font-bold shrink-0 ${selectedCenter.isOpen ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'}`}>
                                {selectedCenter.isOpen ? 'باز است' : 'بسته'}
                            </span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-label-md text-on-surface-variant">امتیاز کاربران</span>
                                <span className="text-label-md font-bold text-on-surface flex items-center gap-1"><Star className="size-4 text-tertiary-container fill-tertiary-container"/> {selectedCenter.rating} از ۵</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-label-md text-on-surface-variant">شماره تماس</span>
                                <span className="text-label-md font-bold text-on-surface flex items-center gap-1.5" dir="ltr"><Phone className="size-4"/> {selectedCenter.phone}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                                <button className="w-full h-11 bg-primary text-on-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors cursor-pointer">
                                    <Phone className="size-5" strokeWidth={1.5}/>
                                    تماس با مرکز
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </ModalWrapper>
        </div>
    );
};
