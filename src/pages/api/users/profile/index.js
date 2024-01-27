import Users from "@/src/models/Users";
import dbConnect from "@/src/config/dbConnect";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "GET":
      try {
        // Parse the cookies from the request headers
        const cookies = parse(req.headers.cookie || "");

        // Access the specific cookie by name
        const token = cookies["accesstoken"]; // Replace 'yourCookieName' with the actual name of your cookie

        if (!token) {
          res.json({
            success: false,
            message: "Access token not found!",
          });
          return;
        }

        // Verify Token
        try {
          var payload = jwt.verify(token, "dhe239783918");
          var user =await Users.findById(payload.id);
          res.json({
            success: true,
            message: user,
          });
        } catch (error) {
          res.json({
            success: false,
            message: "Invalid Access Token!",
          });
          return
        }


      } catch (error) {
        res.json({
          success: false,
          message: "Something Went Wrong!",
        });
      }

      break;

    // Add other cases for different HTTP methods if needed

    // default:
    //   res.status(405).end(); // Method Not Allowed
  }
}
