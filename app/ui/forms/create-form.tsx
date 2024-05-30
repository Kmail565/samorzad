import {createAccount} from "../../lib/registration";
import styles from "@/app/styles/create.module.css";

8
export default function CreateForm()
{
    return(

        <form action={createAccount}>
            <input className={styles.input_mail}

                name='email'
                type='email'
                placeholder='Enter your email address'
            />
            <select name='permission' defaultValue="">
                <option value='' disabled>Select permission</option>
                <option>MODERATOR</option>
                <option>twoja stara</option>
            </select>
            <button className = {styles.register_button + ' ' + styles.wpisywanie_maila}
            >
                Register</button>
        </form>
    )
}