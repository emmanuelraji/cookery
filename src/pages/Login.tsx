import { FormEvent, useState } from "react";
import useLogin from "../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, login, error } = useLogin();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    login(password, email);
  }

  return (
    <section>
      <div className="bg-white max-w-sm m-auto p-8 rounded shadow-lg">
        <h2 className="font-bold mb-8 text-xl">Sign in to your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-3 py-1 w-full rounded"
            />
          </div>
          <div className="mb-12">
            <label htmlFor="password" className="block mb-1">
              <span className="block mb-1">Password</span>
            </label>
            <input
              id="password"
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-3 py-1 w-full rounded"
            />
          </div>
          {!isLoading && (
            <button className="bg-indigo-600 py-2 w-full rounded text-white">
              Continue
            </button>
          )}
          {isLoading && (
            <button
              className="bg-indigo-600 py-2 w-full rounded text-white"
              disabled
            >
              loading
            </button>
          )}
          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
    </section>
  );
}

export default Login;
