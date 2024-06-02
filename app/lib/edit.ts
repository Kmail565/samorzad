'use server'
import {z} from "zod";
import {sql} from "@vercel/postgres";
import {getSession, updateSessions} from "@/app/lib/actions";
import {unstable_noStore} from "next/cache";
import {User} from "@/app/lib/definitions";
import {redirect} from "next/navigation";
import bcrypt from "bcrypt";

const defaultUser: User = {
    name: "",
    surname: "",
    password: "",
    date: "",
    email: "",
    id: "",
    permission: "",
    image_url: "/default.jpg"
}

async function idGetUser(id: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE id=${id}`;
        return user.rows[0];
    } catch (error) {
        // console.error('Database Error:', error);
        // throw new Error('Failed to fetch user.');
    }
}

async function emailGetUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function getUser(id: string): Promise<User>
{
    unstable_noStore();
    const user = await idGetUser(id);
    if(!user) return defaultUser;
    return user;
}

export async function checkId(id:string): Promise<Boolean>
{
    unstable_noStore();
    const parsedId = z.string().safeParse(id);
    if(!parsedId.success) return false;
    const user = await idGetUser(parsedId.data);
    if(!user) return false;
    const session = await getSession();
    // @ts-ignore
    if(session.user.id == parsedId.data) return false;
    return true;
}

export async function editButton(id: string)
{
    redirect("/dashboard/users/edit/" + id);
}

export async function editUser(prevState: {error: undefined | string}, formData: FormData)
{
    const parsedId = z.string().safeParse(formData.get("id"));
    const parsedName = z.string().min(1).safeParse(formData.get("name"));
    const parsedSurname = z.string().min(1).safeParse(formData.get("surname"));
    const parsedEmail = z.string().safeParse(formData.get("email"));
    const parsedPermission = z.enum(['MODERATOR']).safeParse(formData.get("permission"));

    if(parsedName.success && parsedSurname.success && parsedEmail.success && parsedPermission.success)
    {
        const id = parsedId.data as string;
        const name = parsedName.data as string;
        const surname = parsedSurname.data as string;
        const email = parsedEmail.data as string;
        const permission = parsedPermission.data as string;

        const user = await idGetUser(id);
        if(!user) return { error: 'Database Error: Failed to Update User' };

        const emailInUse = await emailGetUser(email);
        if(email != user.email && emailInUse) return {error: 'Email already in use'};

        try {
            await sql`
              UPDATE users
              SET name = ${name}, surname = ${surname}, email = ${email}, permission = ${permission}
              WHERE id = ${user.id}
            `;
        } catch (error) {
            return { error: 'Database Error: Failed to Update User' };
        }

        redirect("/dashboard/users");

    }else{
        return {error: "Invalid data"};
    }
}

export async function deleteUser(formData: FormData)
{
    const parsedId = z.string().safeParse(formData.get("id"));
    const id = parsedId.data as string;

    const user = await idGetUser(id);
    if(!user) return { error: 'Database Error: Failed to delete User' };

    try {
        await sql`
              DELETE FROM users
              WHERE id = ${user.id}
            `;
    } catch (error) {
        return { error: 'Database Error: Failed to delete User' };
    }

    redirect("/dashboard/users");
}

export async function resetPassword(id:string, password: string)
{
    const parsedId = z.string().safeParse(id);
    const parsedPassword = z.string().safeParse(password);

    if(!parsedPassword.success || !parsedPassword.success) throw new Error('Internal Server Error: Failed to reset Password');

    id = parsedId.data as string;
    password = parsedPassword.data as string;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await sql`
              UPDATE users
              SET password = ${hashedPassword}
              WHERE id = ${id}
        `;
    }catch (error) {
        throw new Error('Database Error: Failed to reset Password');
    }
}

export async function formEditNames(prevState: {error: undefined | string}, formData: FormData)
{
    const parsedName = z.string().min(1).safeParse(formData.get("name"));
    const parsedSurname = z.string().min(1).safeParse(formData.get("surname"));
    const parsedEmail = z.string().email().safeParse(formData.get("email"));

    if(parsedName.success && parsedSurname.success && parsedEmail.success)
    {
        const session = await getSession();
        if(!session.user) return { error: 'Internal Server Error: Failed to Update User' }

        const name = parsedName.data as string;
        const surname = parsedSurname.data as string;
        const email = parsedEmail.data as string;

        const emailInUse = await emailGetUser(email);
        if(email != session.user.email && emailInUse) return {error: 'Email jest już zajęty'};

        try {
            await sql`
              UPDATE users
              SET name = ${name}, surname = ${surname}, email = ${email}
              WHERE id = ${session.user.id}
            `;
        } catch (error) {
            return { error: 'Database Error: Failed to Update User' };
        }

        session.user.name = name;
        session.user.surname = surname;
        session.user.email = email;
        await session.save();


    }else{
        return {error: "Błędne dane"};
    }
}

export async function formEditPasswords(prevState: {error: undefined | string}, formData: FormData)
{
    const parsedNewPassword = z.string().min(6).safeParse(formData.get("new_password"));
    const parsedRepeatedNewPassword = z.string().min(6).safeParse(formData.get("repeated_new_password"));
    const parsedPassword = z.string().min(6).safeParse(formData.get("password"));

    if(parsedNewPassword.success && parsedRepeatedNewPassword.success && parsedPassword.success)
    {
        const session = await getSession();
        if(!session.user) return { error: 'Internal Server Error: Failed to Update User' }

        const newPassword = parsedNewPassword.data as string;
        const repeatedNewPassword = parsedRepeatedNewPassword.data as string;
        const password = parsedPassword.data as string;

        const passwordsMatch = await bcrypt.compare(password,session.user.password);
        if(!passwordsMatch) return {error: 'Błędne hasło'};

        if(newPassword != repeatedNewPassword) return {error: 'Hasła nie są takie same'};

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        try {
            await sql`
              UPDATE users
              SET password = ${hashedPassword}
              WHERE id = ${session.user.id}
            `;
        } catch (error) {
            return { error: 'Database Error: Failed to Update User' };
        }

        session.user.password = hashedPassword;
        await session.save();

    }else{
        return {error: "Błędne dane"};
    }
}