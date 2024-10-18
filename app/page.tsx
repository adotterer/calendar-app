import Views from "@/components/Calendar/Views";
import { AuthProvider } from "@/context/AuthContext";
import { ViewProvider } from "@/context/ViewContext";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-10">
      <AuthProvider>
        <ViewProvider>
          <Views />
        </ViewProvider>
      </AuthProvider>
    </main>
  );
}
