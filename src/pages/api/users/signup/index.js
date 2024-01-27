import Users from "@/src/models/Users";
import dbConnect from "@/src/config/dbConnect";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "POST":
      try {
        var hashedpassword = await bcrypt.hash(req.body.password, 10);
        var register = await Users.create({
          ...req.body,
          password: hashedpassword,
        });
        res.json({
          success: true,
          message: "You have been registered successfully!",
        });
      } catch (error) {
        if (error.code == 11000) {
          if (error.keyPattern.username) {
            res.json({
              success: false,
              message: "Usename already Taken!",
            });
          }
          if (error.keyPattern.email) {
            res.json({
              success: false,
              message: "Email already exist!",
            });
          }

          return;
        }

        res.json({
          success: false,
          message: "Something went wrong!",
        });
      }
      break;
  }
}
