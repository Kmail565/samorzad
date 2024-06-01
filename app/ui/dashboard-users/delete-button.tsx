'use client'
import {User} from "@/app/lib/definitions";
import {useFormState} from "react-dom";
import {deleteUser} from "@/app/lib/edit";
import styles from "@/app/styles/edit-user-form.module.css";

export default function DeleteButton({user}: { user: User })
{
    const [state, formAction] = useFormState<any, FormData>(deleteUser, undefined);

    return(
        <form action={formAction}>
            <input
                type="hidden"
                name="id"
                value={user.id}
            />
            <button className={styles.button2}>
                Usuń konto
            </button>
            {state?.error &&
                <p>
                    {state.error}
                </p>
            }
        </form>
    )
}