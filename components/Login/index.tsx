export default function Login() {
  return (
    <form
      action="/auth/login"
      method="post"
      className="flex flex-col space-y-4 max-w-xs mx-auto"
    >
      <label htmlFor="email">Email</label>
      <input name="email" />
      <br />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" />
      <button>Sign In</button>
    </form>
  );
}
