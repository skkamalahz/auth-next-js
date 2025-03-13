import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { CustomError } from "@/types/error";
//import { log } from "console";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        console.log(reqBody);

        // Check if user already exists
        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json({message: "User already exists"}, {status: 400});
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save user
        const savedUser = await newUser.save();
        console.log(savedUser);

        // Send verification email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id.toString()});

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });
        
    } catch (error: unknown) {
        const customError = error as CustomError;
        return NextResponse.json(
            { error: customError.message || "An error occurred" },
            { status: customError.status || 500 }
        );
    }
}