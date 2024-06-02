import {SessionOptions} from "iron-session";

export type User = {
    id: string,
    name: string,
    surname: string,
    email: string,
    password: string,
    permission: string,
    image_url: string,
    date: string,
    registered?: boolean,
};

export type News = {
    id: string,
    user_id: string,
    title: string,
    text: string,
    date: string,
    modification_date: string,
    modified?: boolean,
}

export type SessionData = {
    user?: User;
    isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
    isLoggedIn: false,
}

export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_KEY!,
    cookieName: "user-session",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }
}