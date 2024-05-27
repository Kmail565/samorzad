'use server'
import {Resend} from "resend";
import {z} from "zod";
import {sql} from "@vercel/postgres";
import {User} from "./definitions";
import {redirect} from "next/navigation";

const defaultUser: {name:string, surname: string, password: string, image_url: string} = {
    name: "BRAK",
    surname: "BRAK",
    password: "BRAK",
    image_url: "/default.jpg"
}

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function sendEmail(email:string)
{
    const resend = new Resend(process.env.RESEND_API_KEY);
    const user = await getUser(email);
    console.log(email, user?.id);
    try {
        console.log("Sending email...");
        const { data } = await resend.emails.send({
            from: 'example@samorzad.vercel',
            to: email,
            subject: 'Account registration',
            text: 'http://localhost:3000/registration/'+user?.id
        })
    }catch (error)
    {
        console.log(error);
        console.error('Error:', error);
        throw new Error('Failed to send an email.');
    }
    console.log("Email send");
}

export async function createAccount(formData: FormData)
{
    const parsedEmail = z.string().email().safeParse(formData.get("email"));
    const parsedPermission = z.enum(['MODERATOR']).safeParse(formData.get("permission"));

    console.log(parsedEmail, parsedPermission);
    if(!parsedEmail || !parsedPermission)
    {
        return {message: 'Missing Fields. Failed to Create Invoice.',};
    }

    const email = parsedEmail.data as string;
    const permission = parsedPermission.data;
    const date = new Date().toISOString().split('T')[0];
    /*
    await sql`
                INSERT INTO users (name, surname, email, password, permission, image_url, date)
                VALUES (${defaultUser.name}, ${defaultUser.surname}, ${email}, ${defaultUser.password}, 
                ${permission}, ${defaultUser.image_url}, ${date});
    `;
     */
    sendEmail(email);
    redirect("/dashboard/users");
}
