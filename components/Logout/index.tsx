import { useCallback } from "react";

interface LogoutProps {
  closeModal: React.Dispatch<React.SetStateAction<void>>;
}

export default function Logout({ closeModal }: LogoutProps) {
  const signOut = useCallback(
    function signOut() {
      fetch("/auth/logout")
        .then((res) => res.json())
        .then(({ logout }) => {
          if (logout) closeModal();
        });
    },
    [closeModal]
  );

  return (
    <button
      className="flex flex-col space-y-4 max-w-xs mx-auto"
      onClick={() => signOut()}
    >
      Logout
    </button>
  );
}
