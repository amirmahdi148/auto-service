export const Header = () => (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-surface-variant px-10 py-3 bg-surface/80 backdrop-blur-md sticky top-0 z-50 rounded-full mb-6">
        <div className="flex items-center gap-4 text-primary">
            <div className="size-8">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"/>
                </svg>
            </div>
            <h2 className="text-primary text-title-lg font-bold leading-tight tracking-[-0.015em]">اتو پلاس</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
            <nav className="hidden lg:flex items-center gap-9">
                <a className="text-on-surface-variant hover:text-primary transition-colors text-label-lg font-medium leading-normal" href="#services">خدمات</a>
                <a className="text-on-surface-variant hover:text-primary transition-colors text-label-lg font-medium leading-normal" href="#centers">مراکز تخصصی</a>
                <a className="text-on-surface-variant hover:text-primary transition-colors text-label-lg font-medium leading-normal" href="#professionals">برای متخصصان</a>
            </nav>
            <button className="flex min-w-21 max-w-120 cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary text-on-primary text-label-lg font-bold leading-normal tracking-[0.015em] hover:bg-primary-container hover:text-on-primary-container transition-all shadow-lg hover:shadow-xl">
                <span className="truncate">ثبت‌نام متخصصین</span>
            </button>
        </div>
    </header>
)
