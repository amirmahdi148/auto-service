import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router";
import {ServicesHeader} from "../components/Services/ServicesHeader";
import {ServicesGrid} from "../components/Services/ServicesGrid";
import {Faq} from "../components/Homepage/Faq";
import {CtaSection} from "../components/Homepage/CtaSection";
import {HttpService} from "../utils/HttpService.ts";
import type {ServiceItem} from "../api/data/services";
import {SERVICE_CATEGORIES} from "../api/data/services";

interface ServicesResponse {
    data: ServiceItem[];
    meta: { total: number };
}

const VALID_CATEGORIES = new Set(SERVICE_CATEGORIES.map((c) => c.label));

export const ServicesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const urlCategory = searchParams.get("category") ?? "";
    const activeCategory = VALID_CATEGORIES.has(urlCategory) ? urlCategory : "همه";
    const search = searchParams.get("search") ?? "";

    const { data, isFetching } = useQuery({
        queryKey: ["services", { category: activeCategory, search }],
        queryFn: () => {
            const params: Record<string, string> = {};
            if (activeCategory !== "همه") params.category = activeCategory;
            if (search.trim()) params.search = search.trim();
            return HttpService.get<ServicesResponse>("/api/services", { params });
        },
        placeholderData: (prev) => prev,
    });

    const services = data?.data ?? [];
    const total = data?.meta.total ?? 0;

    const handleCategoryChange = (label: string) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (label !== "همه") next.set("category", label);
            else next.delete("category");
            next.delete("search");
            return next;
        }, { replace: true });
    };
    const handleSearchChange = (value: string) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (value.trim()) next.set("search", value);
            else next.delete("search");
            return next;
        }, { replace: true });
    };
    const handleReset = () => setSearchParams(new URLSearchParams(), { replace: true });

    return (
        <div className="flex flex-col gap-16 pt-4">
            <ServicesHeader
                search={search}
                onSearchChange={handleSearchChange}
                total={total}
            />
            <ServicesGrid
                categories={SERVICE_CATEGORIES}
                services={services}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                search={search}
                onReset={handleReset}
                isFetching={isFetching}
            />
            <Faq/>
            <CtaSection/>
        </div>
    );
};
