'use client'
import {formEditNames} from "@/app/lib/edit";
import {useFormState} from "react-dom";
import {useState, useEffect} from "react";
import {User} from "@/app/lib/definitions";
import styles from "@/app/styles/dashboard/profile/edit-forms.module.scss"
import {ClipboardDocumentCheckIcon, PencilIcon} from "@heroicons/react/24/outline";

type Props = {
    user: User
}

export default function EditNamesForm({user} : Props)
{
    const [state, editNamesAction] = useFormState<any, FormData>(formEditNames, undefined);
    const [editNames, setEditNames] = useState(true);

    const enableEditNames = () => setEditNames(false);
    const disableEditNames = () => {
        if (state?.error) {
            setEditNames(false)
        } else {
            setEditNames(true)
        }
    }

    useEffect(() => {
        if (state?.error) {
            setEditNames(false)
        } else {
            setEditNames(true)
        }
    }, [state?.error]);

    return (
        <form onSubmit={disableEditNames} action={editNamesAction}>
            <div className={styles.form}>
                <div id={styles.inputs_focus} className={styles.inputs}>
                    <div>
                        <p>Imię</p>
                        <input
                            name="name"
                            type="text"
                            minLength={1}
                            defaultValue={user.name}
                            disabled={editNames}
                            placeholder="Twoje imię"
                        />
                    </div>
                    <div>
                        <p>Nazwisko</p>
                        <input
                            name="surname"
                            type="text"
                            minLength={1}
                            defaultValue={user.surname}
                            disabled={editNames}
                            placeholder="Twoje nazwisko"
                        />
                    </div>
                    <div>
                        <p>Email</p>
                        <input
                            name="email"
                            type="email"
                            defaultValue={user.email}
                            disabled={editNames}
                            placeholder="Twój email"
                        />
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button id={styles.edit_button_active} className={styles.edit_button} type="button" onClick={enableEditNames} disabled={!editNames}>
                        <PencilIcon className={styles.icon}/>
                        <p>Edytuj</p>
                    </button>
                    <button id={styles.save_button_active} className={styles.save_button} type="submit" disabled={editNames}>
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