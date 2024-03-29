import User from "../models/User.js";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { name, username, email, password1, password2, location } = req.body;
  const pageTitle = "Join";

  if (password1 !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match",
    });
  }

  const exists = await User.exists({ $or: [{ username }, { email }] });

  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password1,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res
      .status(404)
      .render("join", { pageTitle, errorMessage: error._message });
  }
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.exists({ username, password });
  if (!exists) {
    return res
      .status(400)
      .render("login", {
        pageTitle: "Login",
        errorMessage: "An account with this username does not exists.",
      });
  }
  return res.render("/", { pageTitle: "Home" });
};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");

export const see = (req, res) => res.send("see user");
export const logout = (req, res) => res.send("logout");
