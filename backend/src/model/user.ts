import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

interface IUser {
  name: string;
  email: string;
  password: string;
  phoneNumber?: number;
  addresses: {
    country?: string;
    city?: string;
    address1?: string;
    address2?: string;
    zipCode?: number;
    addressType?: string;
  }[];
  role: string;
  avatar: { public_id: string; url: string };
  createdAt: Date;
  resetPasswordToken?: string;
  resetPasswordTime?: Date;
}

interface IUserMethods {
  getJwtToken(): string;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<
  IUser,
  mongoose.Model<IUser>,
  IUserMethods
>({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  phoneNumber: {
    type: Number,
  },
  addresses: [
    {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      zipCode: {
        type: Number,
      },
      addressType: {
        type: String,
      },
    },
  ],
  role: {
    type: String,
    default: "user",
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

//  Hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function () {
  const secret = process.env.JWT_SECRET_KEY;
  const expiresIn = process.env.JWT_EXPIRES;
  if (!secret || !expiresIn) {
    throw new Error("JWT_SECRET_KEY and JWT_EXPIRES must be set");
  }
  return jwt.sign({ id: this._id }, secret, {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser>("User", userSchema);
