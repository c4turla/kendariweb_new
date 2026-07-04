"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, AlertCircle } from "lucide-react";
import { deletePortfolio } from "@/app/actions/portfolio";
import { toast } from "sonner";

export default function DeletePortfolioButton({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Auto-reset confirmation state after 4 seconds
  useEffect(() => {
    if (showConfirm) {
      const timer = setTimeout(() => setShowConfirm(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showConfirm]);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }
    
    setIsDeleting(true);
    try {
      const res = await deletePortfolio(id);
      if (res.success) {
        toast.success("Proyek portfolio berhasil dihapus!");
        router.refresh();
      } else {
        toast.error(res.error || "Gagal menghapus proyek.");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <Button 
      variant="ghost" 
      size={showConfirm ? "default" : "icon"} 
      onClick={handleDelete}
      disabled={isDeleting}
      className={`h-8 border border-[#1f1f23] transition-all duration-300 disabled:opacity-50 text-xs px-2.5 rounded-xl ${
        showConfirm 
          ? "bg-red-600 hover:bg-red-500 text-white border-red-500 hover:border-red-400 font-semibold" 
          : "text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
      }`}
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : showConfirm ? (
        <span className="flex items-center gap-1 animate-pulse">
          <AlertCircle className="w-3.5 h-3.5" />
          Hapus?
        </span>
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
