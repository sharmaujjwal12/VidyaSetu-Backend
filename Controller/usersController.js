const { check, validationResult } = require("express-validator");
const VidyaSetu = require("../model/user");
const bcrypt = require("bcryptjs");

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user
    const user = await VidyaSetu.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User doesn't exist",
        errors: ["Invalid Email or Password"],
        oldInput: { email },
        isLoggedIn: false,
      });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
        errors: ["Invalid Password"],
        oldInput: { email },
        isLoggedIn: false,
      });
    }

    // 3️⃣ Update session and login status
    user.isLoggedIn = true;
    await user.save();

    req.session.isLoggedIn = true;
    req.session.save(() => {
      const value = req.session;
      res.json({ value, email: user.email, role: user.role });
    });

    console.log("User logged in:", user);
  } catch (err) {
    console.error("LoginController error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.logoutController = async (req,res)=>{
  let {email} = req.body;
  console.log("Email At Backend : ",email);
  let user = await VidyaSetu.findOne({email:email});
  user.isLoggedIn = false;
  await user.save();
  req.session.destroy(()=>{
    res.json({message:user.isLoggedIn});
  })
}
exports.signUpController = [
   check("firstName")
    .trim()
    .notEmpty()
    .withMessage("First Name is Not Empty")
    .isLength({ min: 2 })
    .withMessage("First Name Must be Greater Than 2 Letter")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First Name Only Contain Letters"),

  check("lastName")
    .trim()
    .notEmpty()
    .withMessage("First Name is Not Empty")
    .isLength({ min: 2 })
    .withMessage("First Name Must be Greater Than 2 Letter")
    .matches(/^[a-zA-Z\s]*$/)
    .withMessage("First Name Only Contain Letters"),

  check("email").isEmail().withMessage("Enter a Valid Email").normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password Must Greater than 8 letter")
    .matches(/[a-z]/)
    .withMessage("Password Must Contain Atleast One LowerCase")
    .matches(/[A-Z]/)
    .withMessage("PassWord Must Contain Atleast One UpperCase")
    .matches(/[0-9]/)
    .withMessage("Password Must Contain Atleast One Number")
    .matches(/[!@#&]/)
    .withMessage("Password Must Contain Atleast One Special Character")
    .trim(),
  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password Do Not Matches");
      }
      return true;
    }),

  check("gender")
    .notEmpty()
    .withMessage("Please Select a Gender")
    .isIn(["male","female","other"])
    .withMessage("Invalid User Type"),
  check("role")
    .notEmpty()
    .withMessage("Please Select a Gender")
    .isIn(["user","host"])
    .withMessage("Invalid Role Type"),
  // check("term")
  //   .notEmpty()
  //   .withMessage("Please Accept a Terms")
  //   .custom((value, { res }) => {
  //     if (value !== "on") {
  //       throw new Error("Please Accept the terms and conditions");
  //     }
  //     return true;
  //   }),
  (req, res, next) => {
    const { firstName, lastName, password, confirmPassword, email, gender,role } =
      req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        isLoggedIn: false,
        errors: errors.array().map((err) => err.msg),
        oldInput: {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
         gender,
         role,
        },
      });
    }

    bcrypt.hash(password, 12).then((hashedPassword) => {
      let user = new VidyaSetu({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        gender,
        role,
      });
      user.save()
        .then(() => {
          res.json({message:"User SignedUp",isLoggedIn:false});
        })
        .catch((err) => {
          res.status(500).json({
            isLoggedIn:false,
            message:"User Already Exists"
          })
        });
    });
  },
]