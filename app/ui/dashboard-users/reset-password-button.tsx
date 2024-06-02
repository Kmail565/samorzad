'use client'
import {User} from "@/app/lib/definitions";
import {useState} from "react";
import {Modal} from "react-bootstrap";
import {resetPassword} from "@/app/lib/edit";

export default function ResetPasswordButton({user}: { user: User })
{
    const [show,setShow] = useState(false);
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const generatePassword = () =>
    {
        let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        let newPassword = "";

        for (let i = 0; i < 12; i++)
        {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(newPassword);
    }

    const copyToClipboard = () =>
    {
        const copiedPassword = document.createElement("textarea");
        copiedPassword.value = password;
        document.body.appendChild(copiedPassword);
        copiedPassword.select();
        document.execCommand("copy");
        document.body.removeChild(copiedPassword);
        setSuccessMessage("Password copied to clipboard!");
    };

    const resetPasswordAction = () =>
    {
        resetPassword(user.id, password);
        setShow(false);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>
            <button onClick={handleShow}>
                Reset Password
            </button>
            <Modal show={show} onHide={handleShow}>
                <div>
                    <button onClick={handleClose}>Close</button>
                    <div>
                        <button onClick={generatePassword}>
                            Generate Password
                        </button>
                        {password &&
                            <>
                                <div>
                                    <label>Generated Password:</label>
                                    <input type="text" value={password} readOnly/>
                                    <button onClick={copyToClipboard}>
                                        Copy
                                    </button>
                                    {successMessage && (
                                        <p>{successMessage}</p>
                                    )}
                                </div>
                                <button onClick={resetPasswordAction}>
                                    Confirm Password
                                </button>
                            </>
                        }
                    </div>
                </div>
            </Modal>
        </>
    )
}