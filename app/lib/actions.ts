'use server';
import {sessionOptions, SessionData, defaultSession, User} from "./definitions";
import {getIronSession} from "iron-session";
import {cookies} from "next/headers";
import {sql} from "@vercel/postgres";
import {z} from "zod";
import bcrypt from 'bcrypt';
import {redirect} from "next/navigation";

export async function getSession()
{
    const session = await getIronSession<SessionData>(cookies(),sessionOptions);

    if(!session.isLoggedIn){
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    return session;
}

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        throw new Error('Failed to fetch user.');
    }
}

export async function login(prevState: {error: undefined | string}, formData: FormData)
{
    const session = await getSession();

    const parsedEmail = z.string().email().safeParse(formData.get("email"));
    const parsedPassword = z.string().min(6).safeParse(formData.get("password"));

    if(parsedEmail.success && parsedPassword.success)
    {
        const email = parsedEmail.data as string;
        const password = parsedPassword.data as string;
        const user = await getUser(email);
        if (!user) return {error: "Invalid email or password"};
        if (!user.registered) return {error: "First complete registration"};

        const passwordsMatch = await bcrypt.compare(password,user.password);
        if (passwordsMatch)
        {
            session.user = user;
            session.isLoggedIn = true;
            await session.save();
            redirect("/dashboard");
        }
    }
    return {error: "Invalid email or password"};
}

export async function logout()
{
    const session = await getSession();
    session.destroy();
    redirect("/login");
}

