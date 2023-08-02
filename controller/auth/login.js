import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleLogin = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  // checks if the field is empty or not
  //
  if (!usernameOrEmail || !password) {
    return res.status(401).json({ message: "username and password required" });
  }

  try {
    const user = await login(usernameOrEmail, password);

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "ok", token });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: "username or password is wrong" });
  }
};

const login = async (usernameOrEmail, password) => {
  const user = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });

  if (user) {
    //? when dealing with real user data
    // const auth = await bcrypt.compare(password, user.password)
    // if(!auth) throw Error("username or password is wrong")

    if (user.password !== password) {
      throw Error("username or password is wrong");
    }
    return true;
  } else {
    throw Error("username or password is wrong");
  }
};
