import db from "@/utils/db";
import User from "@/models/User";
let bcrypt = require('bcryptjs');
import Env from "@/config/env";
import Cryptr from "cryptr";
import cryptoRandomString from "crypto-random-string";
import ForgotPasswordEmail from "@/emails/ForgotPasswordEmail";
import { sendEmail } from "@/config/mail";
import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";

db.connect()
 
export async function POST(request: NextRequest) {
  const payload: ForgotPasswordPayload = await request.json();

  // * Check user email firsr
  const user = await User.findOne({ email: payload.email });
  if (user == null) {
    return NextResponse.json({
      status: 400,
      errors: {
        email: "No user found with this email.",
      },
    });
  }

  //   * Generate random string
  const randomStr = cryptoRandomString({
    length: 64,
    type: "alphanumeric",
  });

  user.password_reset_token = randomStr;
  await user.save();

  // * Encrypt user email
  const crypt = new Cryptr(Env.SECRET_KEY);
  const encryptedEmail = crypt.encrypt(user.email);

  const url = `${Env.APP_URL}/reset-password/${encryptedEmail}?signature=${randomStr}`;

  try {
    const html = render(
      ForgotPasswordEmail({
        params: {
          name: user.name,
          url: url,
        },
      })
    );

    // * Send email to user
    await sendEmail(payload.email, "Reset Password", html);
    return NextResponse.json({
      status: 200,
      message: "Email sent successfully.please check your email.",
    });
  } catch (error) {
    console.log("the error is", error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong.please try again!",
    });
  }
}