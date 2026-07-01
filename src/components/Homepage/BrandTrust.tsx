const BRANDS = ["BMW", "Mercedes-Benz", "Toyota", "Hyundai", "Kia", "Peugeot", "Renault"];

export const BrandTrust = () => (
    <div className="flex flex-col items-center gap-6 px-4">
        <span className="text-on-surface-variant text-label-lg font-medium">مورد اعتماد رانندگان برترین برندها</span>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {BRANDS.map((brand) => (
                <span key={brand} className="text-on-surface-variant/70 text-title-lg font-bold tracking-tight hover:text-on-surface transition-colors cursor-default" dir="ltr">
                    {brand}
                </span>
            ))}
        </div>
    </div>
);