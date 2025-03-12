import { useState } from "react";
import useLogin from "./useLogin";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useLogin();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`from frontend:`, { username, password });
    const loginOrNot = await login({ username, password });
    console.log(`loginOrNOt: `, loginOrNot);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300 selection:text-blue-700 selection:bg-none">
          {"Login "}
          <span className="text-blue-500 selection:text-white selection:bg-blue-700 ">
            ChatApp
          </span>
        </h1>

        <form onSubmit={handleOnSubmit} method="POST">
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
       
        </form>
      </div>
    </div>
  );
};

export default Login;