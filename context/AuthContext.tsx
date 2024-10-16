"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { clientSupabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { LocalEvent } from "@/lib/Event";

interface EventRow {
  created_at: string;
  end_time: number;
  guests: string[];
  id: number;
  name: string;
  start_time: number;
  user_id: string;
}
type EventsRows = EventRow[];

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
  userEvents: LocalEvent[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [email, setEmail] = useState<string | null>(null);
  // const [eventRows, setEventRows] = useState<EventRow[] | null>([]);
  const [userEvents, setUserEvents] = useState<LocalEvent[]>([]);

  // const userEvents = useMemo(() => {
  //   const events: LocalEvent[] = [];

  //   return events;
  // }, [eventRows]);

  const getSession = async () => {
    const {
      data: { session },
    } = await clientSupabase.auth.getSession();
    setSession(session || null);
    setEmail(session?.user.email || null);
    setLoading(false);
    let { data: events, error } = (await clientSupabase
      .from("events")
      .select("*")
      .eq("user_id", session?.user.id)) as {
      data: EventsRows | null;
      error: any;
    };
    // setEventRows(events || null);
    if (events) {
      const es: LocalEvent[] = [];
      events?.forEach(({ name, start_time, end_time }) => {
        es.push(new LocalEvent(name, start_time, end_time));
      });
      // console.log(es, "es");
      setUserEvents(es);
    }
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
        userEvents,
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
