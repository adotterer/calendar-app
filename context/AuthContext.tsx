"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { clientSupabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

interface LoginSuccessResponse {
  ok: boolean;
  status: 200;
  message: string;
}

interface LoginErrorResponse {
  ok: boolean;
  status: number;
  message: string;
}

type LoginResponse = LoginSuccessResponse | LoginErrorResponse;

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  dispatchLogin: (url: string, formData: FormData) => Promise<LoginResponse>;
  dispatchLogout: () => Promise<boolean>;
  email: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string | null>(null);

  const getSession = async () => {
    const {
      data: { session },
    } = await clientSupabase.auth.getSession();
    setSession(session || null);
    setEmail(session?.user.email || null);
    setLoading(false);
  };

  const dispatchLogin = async (
    url: string,
    formData: FormData
  ): Promise<LoginResponse> => {
    const response: LoginResponse = await fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res: Response) => {
        return res.json();
      })
      .then((res: LoginResponse) => {
        getSession();
        return res;
      });

    return response;
  };

  const dispatchLogout = async (): Promise<boolean> => {
    return fetch("/auth/logout")
      .then((res) => res.json())
      .then(({ logout }) => {
        setEmail(null);
        setSession(null);
        return logout;
      });
  };

  useEffect(() => {
    getSession();

    const {
      data: { subscription },
    } = clientSupabase.auth.onAuthStateChange(() => {
      getSession();
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        email,
        dispatchLogin,
        dispatchLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
