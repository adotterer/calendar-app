// "use server";
import { clientSupabase } from "@/lib/supabase";
import { FiLogIn } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
// import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

// export const getServerSideProps = async () => {};

export default async function LoginButton() {
  const {
    data: { session },
  } = await clientSupabase.auth.getSession();

  return (
    <button className="flex items-center user-button">
      {session ? <FaRegUser /> : <FiLogIn />}
      {session ? session.user.email : "Login"}
    </button>
  );
}
