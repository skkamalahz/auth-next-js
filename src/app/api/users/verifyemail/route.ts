import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


connect();


export async function GET(request: NextRequest) {
    try {
        const token = request.nextUrl.searchParams.get("token");
        console.log(token);

        if (!token) {
            return NextResponse.json({error: "Token is missing"}, {status: 400});
        }

        const user = await User.findOne({verifyToken: token,
        verifyTokenExpiry: {$gt: Date.now()}});

        if(!user) {
            return NextResponse.json({error: "Invalid token"}, 
            {status: 400})
        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        }, {status: 200})

    } catch (error:any) {
        return NextResponse.json({error: error.message}, 
        {status: 500})
    }
}
