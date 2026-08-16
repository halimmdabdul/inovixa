import { buildMetadata } from "@/lib/seo/metadata";
import { Logo } from "@/components/navigation/logo";
import { AdminLoginForm } from "@/components/admin/login-form";

export const metadata = buildMetadata({
  title: "Admin Login",
  description: "Sign in to the Inovixa Digital admin dashboard.",
  path: "/admin/login",
  noIndex: true,
});

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-full flex-1 flex-col items-center justify-center bg-background px-4 py-16">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-navy">Admin Login</h1>
        <AdminLoginForm />
      </div>
    </main>
  );
}
