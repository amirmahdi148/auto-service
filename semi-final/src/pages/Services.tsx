import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
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

export const ServicesPage = () => {
    const [activeCategory, setActiveCategory] = useState("همه");
    const [search, setSearch] = useState("");

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
        setActiveCategory(label);
        setSearch("");
    };
    const handleSearchChange = (value: string) => setSearch(value);
    const handleReset = () => {
        setActiveCategory("همه");
        setSearch("");
    };

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
