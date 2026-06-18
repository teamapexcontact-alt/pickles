"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="text-center py-12"><p className="text-neutral-500">Loading...</p></div>}>
      <SignupForm />
    </Suspense>
  );
}

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      showToast({ type: "error", title: "Password too short", message: "Password must be at least 6 characters" });
      return;
    }
    setIsLoading(true);
    try {
      await signUpWithEmail(email, password, name);
      showToast({ type: "success", title: "Account created!", message: "Welcome to APEX Pickles" });
      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
    } catch (error: any) {
      showToast({ type: "error", title: "Registration failed", message: error.message || "Please try again" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
    } catch (error: any) {
      showToast({ type: "error", title: "Google sign-up failed", message: error.message || "Please try again" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-accent transition-colors mb-6 block">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <span className="text-2xl font-heading font-bold text-accent">APEX</span>
          <span className="text-lg font-heading font-medium text-neutral-700">Pickles</span>
        </Link>
        <h1 className="heading-3 mb-2">Create Account</h1>
        <p className="text-neutral-500">Join us and start ordering authentic homemade pickles</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+91 9XXXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Choose a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          rightIcon={
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
        />

        <Button type="submit" variant="primary" size="xl" fullWidth isLoading={isLoading} rightIcon={<ArrowRight className="w-4 h-4" />}>
          Create Account
        </Button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-neutral-400">Or sign up with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" size="lg" fullWidth onClick={handleGoogleSignUp} disabled={isLoading}>
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Google
        </Button>
        <Button variant="outline" size="lg" fullWidth disabled>
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-1.758-.867a.517.517 0 0 1-.255-.486c0-.203.124-.376.27-.46 0 0 1.117-.632 1.357-.894.196-.212.245-.511.147-.738-.147-.355-.598-.47-1.049-.47h-2.84c-.387 0-.747.161-.995.378-.153.132-.308.349-.38.601-.068.246-.019.53.143.709.193.213.52.378.832.472.256.076.514.13.647.258.148.143.182.383.069.586-.111.193-.37.308-.577.308-.367 0-1.193-.13-1.636-.328-.26-.117-.49-.255-.571-.369-.17-.242-.078-.65.296-.916.188-.133.332-.278.332-.544 0-.26-.157-.432-.364-.534-.15-.075-.326-.132-.522-.183-.284-.075-.62-.164-.822-.278-.331-.19-.49-.372-.58-.597-.094-.238-.164-.537-.164-.876 0-.586.225-1.192.57-1.604.385-.46.888-.735 1.467-.735h2.072c.892 0 1.442-.416 1.442-1.1 0-.552-.444-.958-1.01-.958-.51 0-1.077.31-1.512.31-.486 0-1.12-.315-1.12-1.053 0-.755.666-1.242 1.472-1.242 1.652 0 2.828 1.13 2.828 2.912 0 1.933-1.552 2.78-2.6 3.362-.322.179-.507.295-.507.514 0 .192.144.325.41.464.105.055.485.193.755.305.457.19.978.448 1.227.744.27.322.393.746.315 1.206-.114.674-.79 1.046-1.848 1.046-1.064 0-2.907-.58-2.907-1.868 0-.648.363-1.06.363-1.06s.477-.25.718-.368l.017-.009a.35.35 0 0 0 .163-.337.305.305 0 0 0-.16-.269c-.146-.078-.62-.254-1.14-.424-.57-.187-1.324-.54-1.457-1.256-.06-.33.012-.64.178-.896.135-.207.454-.313.748-.36.173-.028.313-.034.313-.034s.243-.024.542-.08c.37-.07.847-.203 1.06-.492.23-.313.208-.72-.057-1.05-.299-.37-.93-.539-1.532-.539h-1.38c-.726 0-1.407.35-1.87.97-.42.56-.655 1.25-.655 1.96 0 .997.38 1.86.98 2.42.37.346.795.557 1.227.65.267.057.373.082.293.278-.088.217-.124.326-.124.326s-.13.314-.08.723c.054.44.4.83.897 1.013.638.236 1.549.332 2.367.332.56 0 1.115-.058 1.605-.215 1.998-.644 2.55-2.578 2.55-3.818 0-.59-.064-1.032-.262-1.435z"/></svg>
          Apple
        </Button>
      </div>

      <p className="text-center text-sm text-neutral-500 mt-6">
        By signing up, you agree to our{" "}
        <Link href="/terms" className="text-accent hover:underline">Terms</Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
      </p>

      <p className="text-center text-sm text-neutral-500 mt-6">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-accent font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
