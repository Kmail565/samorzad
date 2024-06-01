'use client'
import {edit, getUser} from "@/app/lib/edit";
import {useFormState} from "react-dom";
import {User} from "@/app/lib/definitions";

type Props = {
    user: User
}

export default function EditForm({user} : Props)
{
    const [state, formAction] = useFormState<any, FormData>(edit, undefined);
    return (
        <form action={formAction}>
            <input
                type="hidden"
                name="id"
                value={user.id}
            />
            {user.registered &&
                <>
                    <input
                        type="name"
                        name="name"
                        minLength={1}
                        defaultValue={user?.name}
                        placeholder="Enter your name"
                    />
                    <input
                        type="text"
                        name="surname"
                        minLength={1}
                        defaultValue={user?.surname}
                        placeholder="Enter your surname"
                    />
                </>
            }
            <input
                type="email"
                name="email"
                defaultValue={user?.email}
                placeholder="Enter your email"
            />
            <select name='permission' defaultValue={user?.permission}>
                <option value='' disabled>Select permission</option>
                <option>MODERATOR</option>
            </select>
            <button>
                Save changes
            </button>
            {state?.error &&
                <p>
                    {state.error}
                </p>
            }
        </form>
    );
}