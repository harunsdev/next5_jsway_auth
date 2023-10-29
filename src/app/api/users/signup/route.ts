import connectToMongoDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectToMongoDB();

//POST route (Create user)
export async function POST(request: NextRequest) {
  try {
    // Grab data from body:
    const reqBody = await request.json();

    //Destructure incoming variables.
    const { username, email, password } = reqBody;

    // Remove in production
    console.log(reqBody);

    const user = await User.findOne({ email });

    //Validate user:
    if (user) {
      return NextResponse.json({}, { status: 400 });
    }

    // Hashing password:
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //Create new user:
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save it to DB
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User Created.",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
