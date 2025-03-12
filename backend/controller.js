const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const testCredentials = {
      username: "test-user",
      password: "test@1234",
    };

    if (username !== testCredentials.username || password !== testCredentials.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const loggedInUser = {
      username,
      password,
    };

    return res.status(200).json({
      message: `'${username}' logged in successfully`,
      loggedInUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error in login: ${error.message}` });
  }
};

export { login };