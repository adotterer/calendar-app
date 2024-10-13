import { useState } from "react";
import { clientSupabase } from "@/lib/supabase";
import { FaRegUser } from "react-icons/fa";
import AuthForm from ".";
import Logout from "../Logout";
import Loading from "../Loading";
import Modal from "../Modal";

const loginMessage = "Login";

export default function LoginButton() {
  const [loggedIn, setLoggedIn] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const getSession = async () => {
    const {
      data: { session },
    } = await clientSupabase.auth.getSession();
    if (session?.user.email) {
      setLoggedIn(session.user.email);
    } else {
      setLoggedIn(loginMessage);
    }
  };

  getSession();

  if (!loggedIn) return <Loading />;
  return (
    <>
      <button
        onClick={() => setLoginModalOpen(true)}
        className="flex items-center user-button"
      >
        <FaRegUser />
        {loggedIn === loginMessage ? loginMessage : loggedIn}
      </button>
      <Modal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
        {loggedIn === loginMessage ? (
          <AuthForm closeModal={() => setLoginModalOpen(false)} />
        ) : (
          <Logout closeModal={() => setLoginModalOpen(false)} />
        )}
      </Modal>
    </>
  );
}
