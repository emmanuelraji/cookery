import { FormEvent, useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(email, password, username);
  }

  return (
    <section>
      <div className="bg-white max-w-sm m-auto p-8 rounded">
        <h1 className="font-bold mb-8">Create your Cookery account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-2 py-1 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border px-2 py-1 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">
              <span className="block mb-1">Password</span>
            </label>
            <input
              id="password"
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-2 py-1 w-full rounded"
            />
          </div>
          <button className="bg-blue-500 w-full rounded text-white">
            Continue
          </button>
        </form>
      </div>
    </section>
  );
}

export default Signup;
