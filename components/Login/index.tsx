import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between Sign In and Sign Up

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object to collect form data
    const formData = new FormData(e.target);

    const url = isSignUp ? "/auth/signup" : "/auth/login"; // Switch between signup and login route
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      // Handle success or failure of the request
      if (response.ok) {
        console.log("Request successful!");
        // You can redirect the user or show a success message
      } else {
        console.log("Request failed.");
        // Show an error message
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col max-w-xs mx-auto">
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
        <input type="password" name="password" required />

        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>

      <button
        className="my-4"
        onClick={() => setIsSignUp((prev) => !prev)} // Toggle between Sign In and Sign Up
      >
        {isSignUp ? "Already have an account? Sign In" : "Sign Up"}
      </button>
    </div>
  );
}
