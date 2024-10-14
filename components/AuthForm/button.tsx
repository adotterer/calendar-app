import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import AuthForm from ".";
import Logout from "../Logout";
import Loading from "../Loading";
import Modal from "../Modal";

const loginMessage = "Login";

export default function LoginButton() {
  const { session, loading, email } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  if (loading) return <Loading />;

  return (
    <>
      <button
        onClick={() => setLoginModalOpen(true)}
        className="flex items-center user-button"
      >
        <FaRegUser />
        {email ? email : loginMessage}
      </button>
      <Modal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
        {!session ? (
          <AuthForm closeModal={() => setLoginModalOpen(false)} />
        ) : (
          <Logout closeModal={() => setLoginModalOpen(false)} />
        )}
      </Modal>
    </>
  );
}
