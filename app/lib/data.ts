import {unstable_noStore as noStore} from "next/dist/server/web/spec-extension/unstable-no-store";
import {sql} from "@vercel/postgres";
import {User} from "./definitions";

export async function fetchUsers() {
    noStore()
    try {
        const users = await sql<User>`SELECT * FROM users ORDER BY users.date DESC LIMIT 10`;
        return users.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch users.');
    }
}