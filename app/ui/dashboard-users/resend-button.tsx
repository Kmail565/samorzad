'use client'
import {User} from "next-auth";
import {sendEmail} from "../../lib/registration";

export default function ResendButton({user}: { user: User })
{
    return(
        <button onClick={()=>sendEmail(user.email as string)}>
            Resend Button
        </button>
    )
}