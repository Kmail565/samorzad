'use client'
import {User} from "next-auth";

export default function EditButton({user}: { user: User })
{
    return(
        <button>
            Edit user
        </button>
    )
}