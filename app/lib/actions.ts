import {getIronSession} from "iron-session";
import {defaultSession, SessionData, sessionOptions, User} from "@/app/lib/definitions";
import {cookies} from "next/headers";
import {sql} from "@vercel/postgres";

export async function getSession() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }
    return session;
}

async function getUser(id: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE id=${id}`;
        return user.rows[0];
    } catch (error) {
        throw new Error('Failed to fetch user.');
    }
}