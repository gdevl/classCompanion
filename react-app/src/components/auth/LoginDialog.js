import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import LoginForm from "../auth/LoginForm/LoginForm.js";

const LoginDialog = ({ open, setOpen, authenticated, setAuthenticated }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <LoginForm
                        authenticated={authenticated}
                        setAuthenticated={setAuthenticated}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};
export default LoginDialog;
