import { useState, FormEvent } from "react";

import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

interface LogoutProps {
  closeModal: React.Dispatch<React.SetStateAction<void>>;
}

export default function AuthForm({ closeModal }: LogoutProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const url = isSignUp ? "/auth/signup" : "/auth/login"; // Switch between signup and login route
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      }).then((res) => {
        console.log(res, "res");
        return res.json();
      });

      if (isSignUp && response.ok) {
        setSignUpMessage(response.message);
      } else if (response.ok) {
        closeModal();
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col max-w-xs mx-auto">
      <div className="text-red-600">{errorMessage}</div>

      {!signUpMessage ? (
        <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
          <label className="flex items-center gap-4" htmlFor="email">
            <MdOutlineEmail />
            Email
          </label>
          <input name="email" type="email" required />

          <label className="flex items-center gap-4" htmlFor="password">
            <RiLockPasswordLine />
            Password
          </label>
          <input type="password" name="password" autoComplete="on" required />

          <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
        </form>
      ) : (
        <div className="text-green-600">{signUpMessage}</div>
      )}

      <button
        className="my-4"
        onClick={() => {
          setIsSignUp((prev) => !prev);
          setSignUpMessage("");
        }}
      >
        {isSignUp ? "Already have an account? Sign In" : "Sign Up"}
      </button>
    </div>
  );
}
