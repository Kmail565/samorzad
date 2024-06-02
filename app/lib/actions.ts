import {getIronSession} from "iron-session";
import {defaultSession, SessionData, sessionOptions, User} from "@/app/lib/definitions";
import {cookies} from "next/headers";
import {sql} from "@vercel/postgres";
import {unstable_noStore} from "next/cache";

export async function getSession() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }
    return session;
}

export async function updateSessions() {
    const session = await  getSession();
    if (session.isLoggedIn)
    {
        // @ts-ignore
        const user = await getUser(session.user.id);
        session.user = user;
    }
    console.log(session);
    await session.save();
}

async function getUser(id: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE id=${id}`;
        return user.rows[0];
    } catch (error) {
        throw new Error('Failed to fetch user.');
    }
}