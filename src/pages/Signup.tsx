import { FormEvent, useState } from "react";
import useSignUp from "../hooks/useSignup";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { signUp, error, isLoading } = useSignUp();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(email, password, username);

    signUp(password, email, username);
  }

  return (
    <section>
      <div className="bg-white max-w-sm m-auto p-8 rounded shadow-lg">
        <h2 className="font-bold mb-8 text-xl">Create your Cookery account</h2>
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
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <button
            className="bg-indigo-600 py-2 w-full rounded text-white"
            disabled={!isLoading ? false : true}
          >
            Continue
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </section>
  );
}

export default Signup;
