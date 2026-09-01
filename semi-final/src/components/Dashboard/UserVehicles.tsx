import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { CarFront, MoreHorizontal, Plus, AlertTriangle, Pencil, History, Trash2, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ModalWrapper } from "../shared/ModalWrapper";
import { HttpService } from "../../utils/HttpService";

export const UserVehicles = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: vehicles = [], isLoading } = useQuery({
        queryKey: ["vehicles"],
        queryFn: () => HttpService.get<any[]>("/api/vehicles"),
    });

    const addMutation = useMutation({
        mutationFn: (body: { name: string; plate: string }) => HttpService.post("/api/vehicles", { body }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => HttpService.delete(`/api/vehicles/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        }
    });

    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newName, setNewName] = useState("");
    const [newPlate, setNewPlate] = useState("");
    const [showHistory, setShowHistory] = useState<any | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const { data: serviceHistory = [], isLoading: isHistoryLoading } = useQuery({
        queryKey: ["vehicle-history", showHistory?.id],
        queryFn: () => HttpService.get<any[]>(`/api/vehicles/${showHistory.id}/history`),
        enabled: showHistory !== null,
    });

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleAdd = () => {
        if (!newName.trim()) return;
        addMutation.mutate({
            name: newName.trim(),
            plate: newPlate.trim() || "---",
        }, {
            onSuccess: () => {
                setNewName("");
                setNewPlate("");
                setShowAddForm(false);
            }
        });
    };

    const handleDelete = (id: number) => {
        if (confirm("آیا از حذف این خودرو اطمینان دارید؟")) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <div className="rounded-2xl bg-surface border border-outline-variant p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-on-surface text-title-lg font-bold">خودروهای من</h2>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="text-primary text-label-sm font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                    افزودن <Plus className="size-4" strokeWidth={2}/>
                </button>
            </div>

            {showAddForm && (
                <div className="mb-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="نام خودرو" className="h-10 px-3 rounded-lg bg-surface border border-outline-variant focus:border-primary outline-none text-label-md text-on-surface" />
                    <input value={newPlate} onChange={(e) => setNewPlate(e.target.value)} placeholder="پلاک" className="h-10 px-3 rounded-lg bg-surface border border-outline-variant focus:border-primary outline-none text-label-md text-on-surface" />
                    <div className="flex gap-2">
                        <button onClick={handleAdd} disabled={addMutation.isPending} className="flex-1 h-9 rounded-lg bg-primary text-on-primary font-bold text-label-sm cursor-pointer hover:bg-primary/90 transition-colors disabled:opacity-50">
                            {addMutation.isPending ? "در حال ذخیره..." : "ذخیره"}
                        </button>
                        <button onClick={() => setShowAddForm(false)} className="flex-1 h-9 rounded-lg border border-outline-variant text-on-surface font-bold text-label-sm cursor-pointer hover:bg-surface-container-high transition-colors">انصراف</button>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-3">
                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="size-6 animate-spin text-primary" />
                    </div>
                ) : vehicles.length > 0 ? (
                    vehicles.map((v) => (
                        <div key={v.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low border border-transparent hover:border-outline-variant transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <CarFront className="size-6" strokeWidth={1.5}/>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-on-surface text-label-lg font-bold">{v.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-on-surface-variant text-label-sm px-2 py-0.5 rounded bg-surface-container border border-outline-variant">{v.plate}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                {v.status === "needs-service" ? (
                                    <span className="flex items-center gap-1 text-error text-label-sm font-bold bg-error/10 px-2 py-1 rounded-full">
                                        <AlertTriangle className="size-3.5"/> نیاز به سرویس
                                    </span>
                                ) : (
                                    <span className="text-primary text-label-sm font-bold bg-primary/10 px-2 py-1 rounded-full">
                                        وضعیت مطلوب
                                    </span>
                                )}
                                <div className="relative">
                                    <button
                                        onClick={() => setActiveMenu(activeMenu === v.id ? null : v.id)}
                                        className="text-on-surface-variant hover:text-on-surface p-1 cursor-pointer"
                                    >
                                        <MoreHorizontal className="size-5"/>
                                    </button>
                                    {activeMenu === v.id && (
                                        <div ref={menuRef} className="absolute left-0 top-full mt-1 z-20 min-w-40 bg-surface border border-outline-variant rounded-xl shadow-lg py-1 animate-in fade-in slide-in-from-top-2 duration-150">
                                            <button onClick={() => { setShowHistory(v); setActiveMenu(null); }} className="w-full text-right px-4 py-2.5 mx-1 rounded-lg text-label-md font-bold text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer flex items-center gap-2">
                                                <History className="size-4"/> تاریخچه سرویس
                                            </button>
                                            <button onClick={() => { navigate("/dashboard/vehicles"); setActiveMenu(null); }} className="w-full text-right px-4 py-2.5 mx-1 rounded-lg text-label-md font-bold text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer flex items-center gap-2">
                                                <Pencil className="size-4"/> ویرایش
                                            </button>
                                            <div className="h-px bg-outline-variant/50 my-1 mx-1" />
                                            <button onClick={() => { handleDelete(v.id); setActiveMenu(null); }} className="w-full text-right px-4 py-2.5 mx-1 rounded-lg text-label-md font-bold text-error hover:bg-error/5 transition-colors cursor-pointer flex items-center gap-2">
                                                <Trash2 className="size-4"/> حذف
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-on-surface-variant text-label-md">
                        خودرویی یافت نشد.
                    </div>
                )}
            </div>

            <ModalWrapper isOpen={showHistory !== null} close={() => setShowHistory(null)}>
                {showHistory && (
                    <div className="p-6 flex flex-col gap-4">
                        <h3 className="text-title-lg font-bold text-on-surface">تاریخچه سرویس - {showHistory.name}</h3>
                        <div className="flex flex-col gap-3">
                            {isHistoryLoading ? (
                                <div className="flex justify-center py-4">
                                    <Loader2 className="size-6 animate-spin text-primary" />
                                </div>
                            ) : serviceHistory.length > 0 ? (
                                serviceHistory.map((r: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant">
                                        <div className="flex flex-col">
                                            <span className="text-label-md font-bold text-on-surface">{r.service}</span>
                                            <span className="text-label-sm text-on-surface-variant">{r.date}</span>
                                        </div>
                                        <span className="text-label-sm font-bold text-primary">{r.cost} ت</span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-4 text-on-surface-variant text-label-md">
                                    تاریخچه سرویسی یافت نشد.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </ModalWrapper>
        </div>
    );
};
