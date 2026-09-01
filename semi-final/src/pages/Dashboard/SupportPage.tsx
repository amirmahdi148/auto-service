import { useState, useRef, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Filter, MessageSquare, Clock, CheckCircle2, Send, Edit3, Save, X, User, Headset } from "lucide-react";
import { ModalWrapper } from "../../components/shared/ModalWrapper";
import { HttpService } from "../../utils/HttpService";
import type { Ticket, TicketMessage } from "../../api/data/tickets";

export const SupportPage = () => {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    const [openTicketId, setOpenTicketId] = useState<string | null>(null);
    const [showNewTicketModal, setShowNewTicketModal] = useState(false);
    const [newTicketTitle, setNewTicketTitle] = useState("");
    const [newTicketMsg, setNewTicketMsg] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState<"all" | "open" | "closed">("all");
    const filterRef = useRef<HTMLDivElement>(null);

    const { data: tickets = [] } = useQuery({
        queryKey: ["support-tickets"],
        queryFn: () => HttpService.get<Ticket[]>("/api/support/tickets"),
    });

    // Fetch single ticket detail separately when opening
    const { data: detailTicket } = useQuery({
        queryKey: ["support-ticket", openTicketId],
        queryFn: () => HttpService.get<Ticket>(`/api/support/tickets/${openTicketId}`),
        enabled: openTicketId !== null,
    });
    const openTicket = detailTicket ?? tickets.find((t) => t.id === openTicketId) ?? null;

    const createMutation = useMutation({
        mutationFn: (body: { title: string; message: string }) =>
            HttpService.post<Ticket>("/api/support/tickets", { data: body }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["support-tickets"] }),
    });

    const updateTitleMutation = useMutation({
        mutationFn: ({ id, title }: { id: string; title: string }) =>
            HttpService.put(`/api/support/tickets/${id}`, { data: { title } }),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["support-tickets"] }); queryClient.invalidateQueries({ queryKey: ["support-ticket"] }); },
    });

    const sendMessageMutation = useMutation({
        mutationFn: ({ id, text }: { id: string; text: string }) =>
            HttpService.post<TicketMessage>(`/api/support/tickets/${id}/messages`, { data: { text } }),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["support-tickets"] }); queryClient.invalidateQueries({ queryKey: ["support-ticket"] }); },
    });

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setFilterOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleTicketUpdate = (updated: Ticket) => {
        updateTitleMutation.mutate({ id: updated.id, title: updated.title });
    };

    const handleNewTicket = () => {
        if (!newTicketTitle.trim()) return;
        createMutation.mutate({ title: newTicketTitle.trim(), message: newTicketMsg.trim() });
        setNewTicketTitle("");
        setNewTicketMsg("");
        setShowNewTicketModal(false);
    };

    const filteredTickets = useMemo(() => {
        let result = tickets;
        if (search.trim()) {
            const q = search.trim();
            result = result.filter((t) => t.title.includes(q) || t.id.includes(q) || t.lastMessage.includes(q));
        }
        if (statusFilter !== "all") {
            result = result.filter((t) => t.status === statusFilter);
        }
        return result;
    }, [tickets, search, statusFilter]);

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
                <button
                    onClick={() => setShowNewTicketModal(true)}
                    className="flex items-center gap-2 h-11 px-5 rounded-full bg-primary text-on-primary font-bold text-label-lg cursor-pointer hover:bg-primary-container transition-colors"
                >
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
                <div className="relative" ref={filterRef}>
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className={`flex items-center justify-center gap-2 h-11 px-6 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                            statusFilter !== "all"
                                ? "bg-primary-container text-on-primary-container border-transparent"
                                : "bg-surface border-outline-variant text-on-surface hover:bg-surface-container-low"
                        }`}
                    >
                        <Filter className="size-4 text-on-surface-variant" strokeWidth={1.5}/>
                        فیلترها
                    </button>
                    {filterOpen && (
                        <div className="absolute left-0 top-full mt-2 w-44 bg-surface border border-outline-variant rounded-2xl shadow-lg z-10 animate-in fade-in slide-in-from-top-2 duration-200 p-2">
                            {[
                                { id: "all" as const, label: "همه" },
                                { id: "open" as const, label: "باز" },
                                { id: "closed" as const, label: "بسته" },
                            ].map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => { setStatusFilter(opt.id); setFilterOpen(false); }}
                                    className={`w-full text-right px-3 py-2.5 rounded-lg text-label-md font-bold transition-colors cursor-pointer ${
                                        statusFilter === opt.id ? 'bg-primary/10 text-primary' : 'text-on-surface hover:bg-surface-container-low'
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ===================== TICKET LIST ===================== */}
            <div className="flex flex-col gap-4">
                {filteredTickets.map((ticket) => (
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

            {/* ===================== NEW TICKET MODAL ===================== */}
            <ModalWrapper isOpen={showNewTicketModal} close={() => { setShowNewTicketModal(false); setNewTicketTitle(""); setNewTicketMsg(""); }} maxWidth="max-w-md">
                <div className="p-6 flex flex-col gap-5">
                    <h3 className="text-title-lg font-bold text-on-surface border-b border-outline-variant/50 pb-3">تیکت جدید</h3>
                    <div className="flex flex-col gap-2">
                        <label className="text-label-sm font-bold text-on-surface-variant">عنوان تیکت</label>
                        <input
                            autoFocus
                            value={newTicketTitle}
                            onChange={(e) => setNewTicketTitle(e.target.value)}
                            placeholder="موضوع خود را بنویسید..."
                            className="h-11 px-4 rounded-xl bg-surface border border-outline-variant focus:border-primary outline-none text-on-surface text-label-md"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-label-sm font-bold text-on-surface-variant">پیام (اختیاری)</label>
                        <textarea
                            value={newTicketMsg}
                            onChange={(e) => setNewTicketMsg(e.target.value)}
                            placeholder="توضیحات تکمیلی..."
                            rows={4}
                            className="px-4 py-3 rounded-xl bg-surface border border-outline-variant focus:border-primary outline-none text-on-surface text-label-md resize-none"
                        />
                    </div>
                    <div className="flex gap-3 mt-2">
                        <button onClick={() => { setShowNewTicketModal(false); setNewTicketTitle(""); setNewTicketMsg(""); }} className="flex-1 h-11 rounded-xl border border-outline-variant text-on-surface font-bold text-label-lg cursor-pointer hover:bg-surface-container-low transition-colors">
                            انصراف
                        </button>
                        <button onClick={handleNewTicket} disabled={!newTicketTitle.trim()} className="flex-1 h-11 rounded-xl bg-primary text-on-primary font-bold text-label-lg cursor-pointer hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none transition-colors">
                            ثبت تیکت
                        </button>
                    </div>
                </div>
            </ModalWrapper>

            {/* ===================== TICKET MODAL ===================== */}
            <ModalWrapper isOpen={openTicket !== null} close={() => setOpenTicketId(null)} maxWidth="max-w-lg">
                {openTicket && (
                    <TicketDetail
                        ticket={openTicket}
                        onUpdate={handleTicketUpdate}
                        onSendMessage={(id, text) => sendMessageMutation.mutate({ id, text })}
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
    onSendMessage: (id: string, text: string) => void;
}

const TicketDetail = ({ ticket, onUpdate, onSendMessage }: TicketDetailProps) => {
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

    const handleSendMessage = () => {
        const trimmed = draft.trim();
        if (!trimmed || !isOpen) return;
        onSendMessage(ticket.id, trimmed);
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
