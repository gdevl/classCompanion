import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import SignUpForm from "./SignUpForm/SignUpForm.js";

const SignUpDialog = ({
    showSignUp,
    setShowSignUp,
    authenticated,
    setAuthenticated,
}) => {
    const handleClose = () => {
        setShowSignUp(false);
    };

    return (
        <div>
            <Dialog open={showSignUp} onClose={handleClose}>
                <DialogContent>
                    <SignUpForm
                        authenticated={authenticated}
                        setAuthenticated={setAuthenticated}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};
export default SignUpDialog;
