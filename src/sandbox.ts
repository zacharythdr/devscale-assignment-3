// REGISTER USER
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // input validation

  // hash password
  const hashedPassword = await bcrypt.hash(password, 13);

  // payload
  const newUser = {
    name,
    email,
    password: hashedPassword,
  };

  // insert to db
  const createUser = new User(newUser);
  const data = await createUser.save();

  return res.status(201).json({ message: "User register success", data });
});
