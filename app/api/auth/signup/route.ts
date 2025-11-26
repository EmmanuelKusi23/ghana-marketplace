import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/mongodb';
import UserModel from '@/models/User';
import { hashPassword } from '@/lib/auth/password';
import { generateToken } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password, location, role } = await request.json();

    if (!name || !email || !phone || !password || !location) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await UserModel.create({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      location,
      role: role || 'buyer',
    });

    const token = generateToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      role: newUser.role,
    });

    const userResponse = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      location: newUser.location,
      profileImage: newUser.profileImage,
      role: newUser.role,
      verified: newUser.verified,
      joinDate: newUser.joinDate,
    };

    return NextResponse.json({
      success: true,
      user: userResponse,
      token,
      message: 'Account created successfully',
    }, { status: 201 });
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An error occurred during signup' },
      { status: 500 }
    );
  }
}
