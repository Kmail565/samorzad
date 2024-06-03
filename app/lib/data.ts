import {unstable_noStore as noStore} from "next/dist/server/web/spec-extension/unstable-no-store";
import {sql} from "@vercel/postgres";
import {News, User} from "./definitions";

export const formatDateToLocal = (
    dateStr: string,
    locale: string = 'pl',
) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
};


export async function fetchUsers() {
    noStore()
    try {
        const users = await sql<User>`SELECT * FROM users ORDER BY users.date DESC`;
        return users.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch users.');
    }
}

export async function fetchNews() {
    noStore()
    try {
        const news = await sql<News>`SELECT * FROM news ORDER BY id DESC`;
        return news.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch users.');
    }
}

export async function fetchLatestNews(){
    noStore()
    try {
        const news = await sql<News>`SELECT * FROM news ORDER BY id DESC LIMIT 1`;
        return news.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch users.');
    }
}