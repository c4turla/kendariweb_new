"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        fetchOptions: {
          onSuccess: () => {
             toast.success("Login berhasil");
             router.push("/dashboard");
             router.refresh();
          }
        }
      });

      if (error) {
        setError(error.message || "Email atau password salah");
        toast.error(error.message || "Email atau password salah");
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] h-[70vw] w-[70vw] rounded-full bg-gradient-to-br from-blue-600/10 to-transparent blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-500 mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin KendariWeb</h1>
          <p className="text-sm text-zinc-500 mt-2 text-center">
            Login untuk mengelola konten website
          </p>
        </div>

        <div className="border border-[#1f1f23] bg-[#0f0f11] rounded-3xl p-8 shadow-2xl shadow-black/50">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2">
                <span className="text-xs text-red-400 font-medium">{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-zinc-400">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  type="email"
                  required
                  placeholder="admin@kendariweb.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-[#161619] border-[#1f1f23] text-white focus-visible:border-blue-500 focus-visible:ring-blue-500/20 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-zinc-400">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 bg-[#161619] border-[#1f1f23] text-white focus-visible:border-blue-500 focus-visible:ring-blue-500/20 rounded-xl"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl mt-4 transition-all"
            >
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sedang Masuk...</>
              ) : (
                "Masuk ke Dashboard"
              )}
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-xs text-zinc-500 hover:text-white transition-colors">
            &larr; Kembali ke halaman utama
          </Link>
        </div>
      </div>
    </div>
  );
}
