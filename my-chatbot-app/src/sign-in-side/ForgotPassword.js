import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function ForgotPassword({ open, handleClose }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordResetOpen, setPasswordResetOpen] = useState(false);
  const [emailNotFoundOpen, setEmailNotFoundOpen] = useState(false);

  // Handle email verification and open password reset dialog
  const handleContinue = () => {
    if (email) {
      axios.post('http://localhost:8080/api/verify-email', { email })
        .then(response => {
          if (response.data.exists) {
            setPasswordResetOpen(true);
          } else {
            // Show popup when the email is not found
            setEmailNotFoundOpen(true);
          }
        })
        .catch(error => {
          console.error('Error verifying email:', error);
          // Handle error (optional)
        });
    } else {
      setEmailNotFoundOpen(true); // Show email not found dialog if the input is empty
    }
  };

  // Handle password reset
  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      // You can show another dialog here if needed
      setEmailNotFoundOpen(true); // For demonstration; change as per your requirement
      return;
    }

    axios.put('http://localhost:8080/api/update-password', { email, newPassword })
      .then(response => {
        // Optionally handle the response and show success message
        setPasswordResetOpen(false);
        handleClose(); // Close both dialogs after successful reset
      })
      .catch(error => {
        console.error('Error updating password:', error);
        // Handle error (optional)
      });
  };

  const handleCloseEmailNotFound = () => {
    setEmailNotFoundOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleContinue();
          },
          sx: { backgroundImage: 'none' },
        }}
      >
        <DialogTitle>Reset password</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
        >
          <DialogContentText>
            Enter your account&apos;s email address to reset your password.
          </DialogContentText>
          <OutlinedInput
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email address"
            placeholder="Email address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      {/* Password Reset Dialog */}
      <Dialog
        open={passwordResetOpen}
        onClose={() => setPasswordResetOpen(false)}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleResetPassword();
          },
          sx: { backgroundImage: 'none' },
        }}
      >
        <DialogTitle>Set a New Password</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
        >
          <DialogContentText>
            Please enter a new password for {email}.
          </DialogContentText>
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={() => setPasswordResetOpen(false)}>Cancel</Button>
          <Button variant="contained" type="submit">
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>

      {/* Email Not Found Dialog */}
      <Dialog
        open={emailNotFoundOpen}
        onClose={handleCloseEmailNotFound}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Error</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Email not found. Please try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEmailNotFound} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
