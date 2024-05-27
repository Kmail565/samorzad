import {createAccount} from "../../lib/registration";

export default function CreateForm()
{
    return(
        <form action={createAccount}>
            <input
                name='email'
                type='email'
                placeholder='Enter your email address'
            />
            <select name='permission' defaultValue="">
                <option value='' disabled>Select permission</option>
                <option>MODERATOR</option>
            </select>
            <button>Register</button>
        </form>
    )
}