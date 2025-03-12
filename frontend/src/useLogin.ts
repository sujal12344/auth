import toast from "react-hot-toast";


const useLogin = () => {

  const login = async ({ username, password }: { username: string, password: string }) => {
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return false;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/login`,
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
        }
      );

      let data = await res.json();
      const { message, loggedInUser } = data;
      console.log(`from the backend data: `, data);
      if (res.status === 200) {
        toast.success(message);
        localStorage.setItem("chat-user", JSON.stringify(loggedInUser));
        return true;
      } else {
        toast.error(message);
        return false;
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message, { style: { width: "100%" } });
      return false;
    }
  };
  return { login };
};

export default useLogin;