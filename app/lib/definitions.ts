import { SessionOptions } from "iron-session";

export type User = {
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    permission: string;
    image_url: string;
    date: string;
};

export type SessionData = {
    user?: User;
    isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
    isLoggedIn: false,
}

export const sessionOptions: SessionOptions ={
    password: process.env.SECRET_KEY!,
    cookieName: "user-session",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }
}