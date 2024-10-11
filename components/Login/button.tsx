import { useState } from "react";
import { clientSupabase } from "@/lib/supabase";
import { FaRegUser } from "react-icons/fa";
import Login from "./";
import Loading from "../Loading";
import Modal from "../Modal";

export default function LoginButton() {
  const [loggedIn, setLoggedIn] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const getSession = async () => {
    const {
      data: { session },
    } = await clientSupabase.auth.getSession();
    if (session?.user.email) {
      setLoggedIn(session.user.email);
    }
    return session;
  };

  const onClickEvent = () => {
    setLoginModalOpen(true);
  };

  getSession();

  if (!loggedIn) return <Loading />;
  return (
    <>
      <button
        onClick={loggedIn ? () => null : () => onClickEvent()}
        className="flex items-center user-button"
      >
        <FaRegUser />
        {loggedIn}
      </button>
      <Modal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
        <Login />
      </Modal>
    </>
  );
}
