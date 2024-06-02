'use client'
import {createAccount, register} from "../../lib/registration";
import {useFormState, useFormStatus} from "react-dom";
import styles from "@/app/styles/create-form.module.scss";

export default function CreateForm()
{
    const [state, formAction] = useFormState<any,FormData>(createAccount,undefined);
    const pending = useFormStatus().pending;
    return (
        <div>
            <div className={styles.parent}></div>
            <form action={formAction}>
                <div className={styles.child}>
                    <h1 className={styles.h1}> Utwórz nowe konto </h1>
                    <input className={styles.email}
                        name='email'
                        type='email'
                        placeholder='Podaj adres email'
                    />
                    <select name='permission' defaultValue="" className={styles.permission}>
                        <option value='' disabled>Wybierz uprawnienia</option>
                        <option>MODERATOR</option>
                    </select>
                    <button className={styles.button}>Zarejestruj</button>
                    {state?.error &&
                        <p>
                            {state.error}
                        </p>
                    }
                </div>
            </form>
        </div>
    )
}