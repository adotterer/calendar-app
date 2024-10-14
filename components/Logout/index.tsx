import { useAuth } from "@/context/AuthContext";

interface LogoutProps {
  closeModal: React.Dispatch<React.SetStateAction<void>>;
}

export default function Logout({ closeModal }: LogoutProps) {
  const { dispatchLogout } = useAuth();
  const signOut = async function signOut() {
    await dispatchLogout();
    closeModal();
  };

  return (
    <button
      className="flex flex-col space-y-4 max-w-xs mx-auto"
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
}
