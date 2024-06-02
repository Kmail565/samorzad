'use client'
import {User} from "@/app/lib/definitions";
import {useFormState} from "react-dom";
import {useEffect, useState} from "react";
import {formEditPasswords} from "@/app/lib/edit";
import styles from "@/app/styles/dashboard/profile/edit-forms.module.scss"
import {ClipboardDocumentCheckIcon, PencilIcon} from "@heroicons/react/24/outline";

type Props = {
    user: User
}

export default function EditPasswordsForm({user} : Props)
{
    const [state, editPasswordsAction] = useFormState<any, FormData>(formEditPasswords, undefined);
    const [editPasswords, setEditPasswords] = useState(true);

    const enableEditPasswords = () => setEditPasswords(false);
    const disableEditPasswords = () => {
        if (state?.error) {
            setEditPasswords(false)
        } else {
            setEditPasswords(true)
        }
    }

    useEffect(() => {
        if (state?.error) {
            setEditPasswords(false)
        } else {
            setEditPasswords(true)
        }
    }, [state?.error]);

    return(
        <form onSubmit={disableEditPasswords} action={editPasswordsAction}>
            <div className={styles.form}>
                <div className={styles.inputs}>
                    <div>
                        <p>Nowe hasło</p>
                        <input
                            name="new_password"
                            type="password"
                            disabled={editPasswords}
                            placeholder="Twoje nowe hasło"
                        />
                    </div>
                    <div>
                        <p>Powtórzone hasło</p>
                        <input
                            name="repeated_new_password"
                            type="password"
                            disabled={editPasswords}
                            placeholder="Powtórz nowe hasło"
                        />
                    </div>
                    <div>
                        <p>Stare hasło</p>
                        <input
                            name="password"
                            type="password"
                            disabled={editPasswords}
                            placeholder="Twoje stare hasło"
                        />
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button id={styles.edit_button_active} className={styles.edit_button} type="button" onClick={enableEditPasswords} disabled={!editPasswords}>
                        <PencilIcon className={styles.icon}/>
                        <p>Edytuj</p>
                    </button>
                    <button id={styles.save_button_active} className={styles.save_button} type="submit" disabled={editPasswords}>
                        <ClipboardDocumentCheckIcon className={styles.icon}/>
                        <p>Zapisz</p>
                    </button>
                </div>
                {state?.error &&
                    <p className={styles.error}>
                        {state.error}
                    </p>
                }
            </div>
        </form>
    )
}