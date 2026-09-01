import { useState, useMemo, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Search,
    Filter,
    Star,
    Check,
    X,
    MessageSquare,
    MoreHorizontal,
    Loader2,
    Trash2,
    CornerDownLeft,
} from "lucide-react";
import { HttpService } from "../../utils/HttpService";
import { ModalWrapper } from "../../components/shared/ModalWrapper";
import type { Review } from "../../api/data/reviews";

export const ReviewsPage = () => {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");

    // Modal states
    const [replyingReview, setReplyingReview] = useState<Review | null>(null);
    const [replyText, setReplyText] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const { data: reviews = [] } = useQuery({
        queryKey: ["reviews"],
        queryFn: () => HttpService.get<Review[]>("/api/reviews"),
    });

    const filteredList = useMemo(() => {
        if (!search.trim()) return reviews;
        const q = search.trim();
        return reviews.filter((r) => r.customerName.includes(q) || r.comment.includes(q) || r.serviceName.includes(q));
    }, [reviews, search]);

    const statusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: "approved" | "rejected" }) =>
            HttpService.put(`/api/reviews/${id}/status`, { body: { status } }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
    });

    const replyMutation = useMutation({
        mutationFn: ({ id, reply }: { id: string; reply: string }) =>
            HttpService.post(`/api/reviews/${id}/reply`, { body: { reply } }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            setReplyingReview(null);
            setReplyText("");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => HttpService.delete(`/api/reviews/${id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
    });

    const handleOpenReply = (review: Review) => {
        setReplyingReview(review);
        setReplyText(review.reply || "");
        setActiveMenu(null);
    };

    const handleSaveReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (replyingReview && replyText.trim()) {
            replyMutation.mutate({ id: replyingReview.id, reply: replyText.trim() });
        }
    };

    const handleDelete = () => {
        if (deletingId) {
            deleteMutation.mutate(deletingId);
            setDeletingId(null);
            setActiveMenu(null);
        }
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-0.5" dir="ltr">
                {[...Array(5)].map((_, i) => (
                    <Star 
                        key={i} 
                        className={`size-4 ${i < rating ? "fill-primary text-primary" : "text-outline-variant"}`} 
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-6">
            {/* ===================== HEADER ===================== */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-on-surface text-headline-md font-black">نظرات</h1>
                        <span className="px-2 py-0.5 rounded-full bg-surface border border-outline-variant text-on-surface-variant text-label-sm font-bold tabular-nums">
                            {filteredList.length} مورد
                        </span>
                    </div>
                    <p className="text-on-surface-variant text-body-md">
                        مدیریت نظرات و بازخوردهای مشتریان
                    </p>
                </div>
            </div>

            {/* ===================== TOOLBAR ===================== */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute right-4 top-3.5 size-4 text-on-surface-variant" strokeWidth={1.5} />
                    <input 
                        type="text" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="جستجو در نظرات مشتریان..." 
                        className="w-full h-11 pl-4 pr-11 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-on-surface text-label-md"
                    />
                </div>
                <button className="flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-surface border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer shrink-0">
                    <Filter className="size-4 text-on-surface-variant" strokeWidth={1.5}/>
                    فیلترها
                </button>
            </div>

            {/* ===================== LIST / CARDS ===================== */}
            <div className="flex flex-col gap-4">
                {filteredList.map((review) => (
                    <div key={review.id} className="p-4 sm:p-5 rounded-2xl bg-surface border border-outline-variant flex flex-col gap-4">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-title-md font-bold shrink-0">
                                    {review.customerName.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-on-surface text-label-lg font-bold">{review.customerName}</span>
                                    <div className="flex items-center gap-2 text-on-surface-variant text-label-sm mt-0.5">
                                        <span>{review.serviceName}</span>
                                        <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                                        <span>{review.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                {review.status === "pending" && (
                                    <span className="inline-flex px-2.5 py-1 rounded-full text-label-sm font-bold bg-tertiary-fixed text-on-tertiary-fixed">
                                        در انتظار تایید
                                    </span>
                                )}
                                {review.status === "approved" && (
                                    <span className="inline-flex px-2.5 py-1 rounded-full text-label-sm font-bold bg-primary/10 text-primary">
                                        تایید شده
                                    </span>
                                )}
                                {review.status === "rejected" && (
                                    <span className="inline-flex px-2.5 py-1 rounded-full text-label-sm font-bold bg-secondary/10 text-secondary">
                                        رد شده
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            {renderStars(review.rating)}
                            <p className="text-on-surface text-body-md leading-relaxed">
                                {review.comment}
                            </p>
                        </div>

                        {/* Specialist Response Display */}
                        {review.reply && (
                            <div className="p-3.5 rounded-xl bg-surface-container-low border border-primary/20 flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-1">
                                <div className="flex items-center gap-1.5 text-primary text-label-sm font-bold">
                                    <CornerDownLeft className="size-4" strokeWidth={2}/>
                                    پاسخ شما (مدیریت مرکز):
                                </div>
                                <p className="text-on-surface-variant text-label-md pr-5">
                                    {review.reply}
                                </p>
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
                            <div className="flex items-center gap-2">
                                {review.status === "pending" && (
                                    <>
                                        <button 
                                            onClick={() => statusMutation.mutate({ id: review.id, status: "approved" })} 
                                            disabled={statusMutation.isPending} 
                                            className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-primary text-on-primary font-bold text-label-sm cursor-pointer hover:bg-primary-container disabled:opacity-50 transition-colors"
                                        >
                                            {statusMutation.isPending ? <Loader2 className="size-4 animate-spin" strokeWidth={2}/> : <Check className="size-4" strokeWidth={2}/>}
                                            تایید
                                        </button>
                                        <button 
                                            onClick={() => statusMutation.mutate({ id: review.id, status: "rejected" })} 
                                            disabled={statusMutation.isPending} 
                                            className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-surface border border-outline-variant text-secondary font-bold text-label-sm cursor-pointer hover:bg-secondary/10 hover:border-secondary/30 disabled:opacity-50 transition-colors"
                                        >
                                            {statusMutation.isPending ? <Loader2 className="size-4 animate-spin" strokeWidth={2}/> : <X className="size-4" strokeWidth={2}/>}
                                            رد کردن
                                        </button>
                                    </>
                                )}
                                <button 
                                    onClick={() => handleOpenReply(review)}
                                    className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-surface border border-outline-variant text-on-surface font-bold text-label-sm cursor-pointer hover:bg-surface-container-high transition-colors"
                                >
                                    <MessageSquare className="size-4" strokeWidth={2}/>
                                    {review.reply ? "ویرایش پاسخ" : "پاسخ دادن"}
                                </button>
                            </div>
                            
                            <div className="relative">
                                <button 
                                    onClick={() => setActiveMenu(activeMenu === review.id ? null : review.id)}
                                    aria-label="گزینه‌ها" 
                                    className="inline-flex items-center justify-center w-9 h-9 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface cursor-pointer transition-colors"
                                >
                                    <MoreHorizontal className="size-5" strokeWidth={1.5}/>
                                </button>

                                {activeMenu === review.id && (
                                    <div ref={menuRef} className="absolute left-0 top-full mt-1 z-20 min-w-36 bg-surface border border-outline-variant rounded-xl shadow-lg py-1 animate-in fade-in slide-in-from-top-2 duration-150">
                                        <button onClick={() => handleOpenReply(review)} className="w-full text-right px-4 py-2.5 mx-1 rounded-lg text-label-md font-bold text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer flex items-center gap-2">
                                            <MessageSquare className="size-4"/> پاسخ
                                        </button>
                                        <div className="h-px bg-outline-variant/50 my-1 mx-1" />
                                        <button onClick={() => { setDeletingId(review.id); setActiveMenu(null); }} className="w-full text-right px-4 py-2.5 mx-1 rounded-lg text-label-md font-bold text-error hover:bg-error/5 transition-colors cursor-pointer flex items-center gap-2">
                                            <Trash2 className="size-4"/> حذف
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ===================== REPLY MODAL ===================== */}
            <ModalWrapper isOpen={replyingReview !== null} close={() => setReplyingReview(null)}>
                {replyingReview && (
                    <form onSubmit={handleSaveReply} className="p-6 pt-5 flex flex-col gap-5">
                        <div className="flex items-center gap-3 border-b border-outline-variant/50 pb-4 pl-8">
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <MessageSquare className="size-5" strokeWidth={1.5}/>
                            </div>
                            <h2 className="text-title-lg font-bold text-on-surface">
                                پاسخ به نظر {replyingReview.customerName}
                            </h2>
                        </div>

                        <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant flex flex-col gap-1">
                            <span className="text-label-xs font-bold text-on-surface-variant">متن نظر کاربر:</span>
                            <p className="text-label-md text-on-surface italic">"{replyingReview.comment}"</p>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-label-sm font-bold text-on-surface-variant">متن پاسخ شما</label>
                            <textarea 
                                required
                                rows={4}
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="پاسخ خود را بنویسید..." 
                                className="p-4 rounded-xl bg-surface border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-label-md text-on-surface resize-none" 
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-2 border-t border-outline-variant/50">
                            <button type="button" onClick={() => setReplyingReview(null)} className="h-11 px-6 rounded-xl text-on-surface-variant font-bold hover:bg-surface-container-high transition-colors cursor-pointer text-label-md">
                                انصراف
                            </button>
                            <button type="submit" disabled={replyMutation.isPending} className="flex items-center gap-2 h-11 px-8 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary/90 disabled:opacity-50 transition-colors cursor-pointer text-label-md shadow-sm">
                                {replyMutation.isPending && <Loader2 className="size-4 animate-spin" strokeWidth={2}/>}
                                ارسال پاسخ
                            </button>
                        </div>
                    </form>
                )}
            </ModalWrapper>

            {/* ===================== DELETE CONFIRMATION ===================== */}
            <ModalWrapper isOpen={!!deletingId} close={() => setDeletingId(null)}>
                <div className="p-6 pt-8 flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-error/10 text-error flex items-center justify-center shrink-0 mb-2">
                        <Trash2 className="size-8" strokeWidth={1.5}/>
                    </div>
                    <h3 className="text-title-lg font-bold text-on-surface">حذف نظر</h3>
                    <p className="text-on-surface-variant text-label-md max-w-[260px]">
                        آیا از حذف این نظر اطمینان دارید؟ این عمل غیرقابل بازگشت است.
                    </p>
                    <div className="flex items-center w-full gap-3 mt-4">
                        <button onClick={() => setDeletingId(null)} className="flex-1 h-11 rounded-xl bg-surface border border-outline-variant text-on-surface font-bold hover:bg-surface-container-low transition-colors cursor-pointer text-label-md">
                            انصراف
                        </button>
                        <button onClick={handleDelete} disabled={deleteMutation.isPending} className="flex-1 h-11 rounded-xl bg-error text-on-error font-bold hover:bg-error/90 disabled:opacity-50 transition-colors cursor-pointer text-label-md shadow-sm">
                            {deleteMutation.isPending ? <Loader2 className="size-4 animate-spin inline" strokeWidth={2}/> : null}
                            بله، حذف شود
                        </button>
                    </div>
                </div>
            </ModalWrapper>
        </div>
    );
};
