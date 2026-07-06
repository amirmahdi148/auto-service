import { useState, useRef, useEffect } from "react";
import { Plus, Search, Filter, MessageSquare, Clock, CheckCircle2, Send, Edit3, Save, X, User, Headset } from "lucide-react";
import { ModalWrapper } from "../../components/shared/ModalWrapper";

interface TicketMessage {
    id: string;
    from: "user" | "support";
    text: string;
    time: string;
}

interface Ticket {
    id: string;
    title: string;
    status: "open" | "closed";
    date: string;
    lastMessage: string;
    messages: TicketMessage[];
}

const INITIAL_TICKETS: Ticket[] = [
    {
        id: "T-1001",
        title: "مشکل در ثبت نوبت",
        status: "open",
        date: "امروز، ۱۰:۳۰",
        lastMessage: "متاسفانه هنگام پرداخت با خطا مواجه شدم.",
        messages: [
            { id: "m1", from: "user", text: "سلام، هنگام ثبت نوبت با خطای پرداخت مواجه شدم.", time: "۱۰:۳۰" },
            { id: "m2", from: "support", text: "سلام کاربر گرامی، لطفاً شماره پیگیری پرداخت را ارسال کنید تا بررسی کنیم.", time: "۱۰:۴۵" },
            { id: "m3", from: "user", text: "متاسفانه هنگام پرداخت با خطا مواجه شدم.", time: "۱۰:۳۰" },
        ],
    },
    {
        id: "T-1002",
        title: "سوال درباره سرویس دوره‌ای",
        status: "closed",
        date: "۲ روز پیش",
        lastMessage: "بله، فیلتر هوا نیز شامل سرویس می‌شود.",
        messages: [
            { id: "m1", from: "user", text: "سرویس دوره‌ای شامل تعویض فیلتر هوا هست؟", time: "۰۹:۱۲" },
            { id: "m2", from: "support", text: "بله، فیلتر هوا نیز شامل سرویس می‌شود.", time: "۰۹:۲۰" },
        ],
    },
    {
        id: "T-1003",
        title: "لغو نوبت",
        status: "closed",
        date: "۱ هفته پیش",
        lastMessage: "نوبت شما با موفقیت لغو شد.",
        messages: [
            { id: "m1", from: "user", text: "می‌خواهم نوبت فردا را لغو کنم.", time: "۱۴:۰۰" },
            { id: "m2", from: "support", text: "نوبت شما با موفقیت لغو شد.", time: "۱۴:۱۰" },
        ],
    },
];

export const SupportPage = () => {
    const [search, setSearch] = useState("");
    const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
    const [openTicketId, setOpenTicketId] = useState<string | null>(null);

    const openTicket = tickets.find((t) => t.id === openTicketId) ?? null;

    const handleTicketUpdate = (updated: Ticket) => {
        setTickets((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    };

    return (
        <div className="flex flex-col gap-6">
            {/* ===================== HEADER ===================== */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-on-surface text-headline-md font-black">پشتیبانی</h1>
                    <p className="text-on-surface-variant text-body-md">
                        پیگیری تیکت‌ها و ارتباط با تیم پشتیبانی
                    </p>
                </div>
                <button className="flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-on-primary font-bold text-label-lg cursor-pointer hover:bg-primary-container transition-colors">
                    <Plus className="size-4" strokeWidth={2}/>
                    <span>تیکت جدید</span>
                </button>
            </div>

            {/* ===================== TOOLBAR ===================== */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute right-4 top-3.5 size-4 text-on-surface-variant" strokeWidth={1.5} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="جستجو در تیکت‌ها..."
                        className="w-full h-11 pl-4 pr-11 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface text-label-md"
                    />
                </div>
                <button className="flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-surface border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer shrink-0">
                    <Filter className="size-4 text-on-surface-variant" strokeWidth={1.5}/>
                    فیلترها
                </button>
            </div>

            {/* ===================== TICKET LIST ===================== */}
            <div className="flex flex-col gap-4">
                {tickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        onClick={() => setOpenTicketId(ticket.id)}
                        className="p-5 rounded-2xl bg-surface border border-outline-variant flex flex-col gap-4 hover:border-primary/30 transition-colors cursor-pointer group"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                    ticket.status === 'open'
                                        ? 'bg-primary-container text-on-primary-container'
                                        : 'bg-surface-container-high text-on-surface-variant'
                                }`}>
                                    <MessageSquare className="size-5" strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-on-surface text-label-lg font-bold group-hover:text-primary transition-colors">
                                        {ticket.title}
                                    </span>
                                    <div className="flex items-center gap-2 text-on-surface-variant text-label-sm mt-1">
                                        <span className="font-mono text-xs">{ticket.id}</span>
                                        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="size-3" />
                                            {ticket.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="shrink-0">
                                {ticket.status === "open" ? (
                                    <span className="inline-flex px-2.5 py-1 rounded-full text-label-sm font-bold bg-primary/10 text-primary">
                                        در حال بررسی
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-bold bg-surface-container-highest text-on-surface-variant">
                                        <CheckCircle2 className="size-3" />
                                        بسته شده
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="text-on-surface-variant text-body-md line-clamp-1 border-t border-outline-variant/50 pt-3 mt-1">
                            {ticket.lastMessage}
                        </p>
                    </div>
                ))}
            </div>

            {/* ===================== TICKET MODAL ===================== */}
            <ModalWrapper isOpen={openTicket !== null} close={() => setOpenTicketId(null)} maxWidth="max-w-lg">
                {openTicket && (
                    <TicketDetail
                        ticket={openTicket}
                        onUpdate={handleTicketUpdate}
                    />
                )}
            </ModalWrapper>
        </div>
    );
};

/* ===================== TICKET DETAIL (MODAL CONTENT) ===================== */

interface TicketDetailProps {
    ticket: Ticket;
    onUpdate: (ticket: Ticket) => void;
}

const TicketDetail = ({ ticket, onUpdate }: TicketDetailProps) => {
    const [editingTitle, setEditingTitle] = useState(false);
    const [titleDraft, setTitleDraft] = useState(ticket.title);
    const [draft, setDraft] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const isOpen = ticket.status === "open";

    // Scroll to bottom when messages change or modal opens
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [ticket.messages.length]);

    const handleSaveTitle = () => {
        const trimmed = titleDraft.trim();
        if (!trimmed) {
            setTitleDraft(ticket.title);
            setEditingTitle(false);
            return;
        }
        onUpdate({ ...ticket, title: trimmed });
        setEditingTitle(false);
    };

    const handleCancelTitle = () => {
        setTitleDraft(ticket.title);
        setEditingTitle(false);
    };

    const msgIdCounterRef = useRef(0);
    const handleSendMessage = () => {
        const trimmed = draft.trim();
        if (!trimmed || !isOpen) return;
        const newMessage: TicketMessage = {
            id: `m-${Date.now()}-${msgIdCounterRef.current++}`,
            from: "user",
            text: trimmed,
            time: "اکنون",
        };
        const updated: Ticket = {
            ...ticket,
            messages: [...ticket.messages, newMessage],
            lastMessage: trimmed,
            date: "اکنون",
        };
        onUpdate(updated);
        setDraft("");
    };

    return (
        <div className="flex flex-col max-h-[85vh]">
            {/* HEADER */}
            <div className="px-6 pt-6 pb-4 border-b border-outline-variant shrink-0">
                <div className="flex items-center gap-2 text-on-surface-variant text-label-sm mb-3">
                    <span className="font-mono text-xs">{ticket.id}</span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {ticket.date}
                    </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                    {editingTitle ? (
                        <div className="flex items-center gap-2 flex-1">
                            <input
                                autoFocus
                                value={titleDraft}
                                onChange={(e) => setTitleDraft(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSaveTitle();
                                    if (e.key === "Escape") handleCancelTitle();
                                }}
                                className="flex-1 h-10 px-3 rounded-lg bg-surface border border-primary focus:ring-1 focus:ring-primary outline-none text-on-surface text-title-sm font-bold"
                            />
                            <button
                                onClick={handleSaveTitle}
                                aria-label="ذخیره"
                                className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-primary text-on-primary hover:bg-primary-container transition-colors cursor-pointer"
                            >
                                <Save className="size-4" />
                            </button>
                            <button
                                onClick={handleCancelTitle}
                                aria-label="لغو"
                                className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                            >
                                <X className="size-4" />
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-title-lg font-bold text-on-surface">{ticket.title}</h2>
                            {isOpen && (
                                <button
                                    onClick={() => setEditingTitle(true)}
                                    aria-label="ویرایش عنوان"
                                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors cursor-pointer"
                                >
                                    <Edit3 className="size-4" />
                                </button>
                            )}
                        </>
                    )}
                </div>

                <div className="mt-3">
                    {isOpen ? (
                        <span className="inline-flex px-2.5 py-1 rounded-full text-label-sm font-bold bg-primary/10 text-primary">
                            در حال بررسی
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm font-bold bg-surface-container-highest text-on-surface-variant">
                            <CheckCircle2 className="size-3" />
                            بسته شده
                        </span>
                    )}
                </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4">
                {ticket.messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex items-end gap-2 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            msg.from === "user"
                                ? "bg-primary-container text-on-primary-container"
                                : 'bg-surface-container-high text-on-surface-variant'
                        }`}>
                            {msg.from === "user" ? <User className="size-4" /> : <Headset className="size-4" />}
                        </div>
                        <div className={`flex flex-col gap-1 max-w-[75%] ${msg.from === "user" ? "items-end" : "items-start"}`}>
                            <div className={`px-4 py-2.5 rounded-2xl text-body-md ${
                                msg.from === "user"
                                    ? "bg-primary text-on-primary rounded-bl-md"
                                    : 'bg-surface-container-high text-on-surface rounded-br-md'
                            }`}>
                                {msg.text}
                            </div>
                            <span className="text-label-xs text-on-surface-variant px-1">{msg.time}</span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* COMPOSE */}
            <div className="px-6 py-4 border-t border-outline-variant shrink-0">
                {isOpen ? (
                    <div className="flex items-center gap-2">
                        <input
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSendMessage();
                            }}
                            placeholder="پیام بنویسید..."
                            className="flex-1 h-11 px-4 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface text-label-md"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!draft.trim()}
                            aria-label="ارسال"
                            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-primary text-on-primary hover:bg-primary-container disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                        >
                            <Send className="size-5" />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-2 text-on-surface-variant text-label-md py-2">
                        <CheckCircle2 className="size-4" />
                        این تیکت بسته شده است. برای ادامه، تیکت جدید ثبت کنید.
                    </div>
                )}
            </div>
        </div>
    );
};
