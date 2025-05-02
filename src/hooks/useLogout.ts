import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

export function useLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await axios.get("/api/auth/logout");

      router.replace("/auth/login");
      router.refresh();
    } catch (e) {
      const isAxiosError = axios.isAxiosError(e);
      const message = isAxiosError ? e.response?.data?.message : "Something went wrong, try again later";

      toast.error(message);
      setLoading(false);
    }
  }, [router]);

  return { loading, logout };
}
