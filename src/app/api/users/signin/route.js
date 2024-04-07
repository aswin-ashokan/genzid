import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
/**
 * @param {import('next/server').NextRequest} request
 */
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("from reqBody",reqBody);
    const user = await User.findOne({ email })
    console.log(user)
    if(!user) {
      return NextResponse.json(
        { error: "user does not exists" },
        { status: 400 }
      );
    }
    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    console.log(validPassword);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }
    //Data for Token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    console.log(tokenData);
    //create token
    const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN, {
      expiresIn: "1d",
    });
    console.log(token);
    const response = NextResponse.json({
      message: "Signedin Successfully",
      success: true,
    })
    response.cookies.set("token", token, {
      httpOnly:true,
    })
    return response;
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

