import React from "react";
import { Dialog, DialogContent, Box } from "@mui/material";
import Logo from '../../assets/images/loading-gif-purple.gif';

const Loading = ({ open }) => {
  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      maxWidth="true"
      open={open}
    >
      <DialogContent dividers>
        <Box
          component="img"
          sx={{
            height: 200,
            width: 200,
            maxHeight: { xs: 200, md: 167 },
            maxWidth: { xs: 200, md: 250 },
          }}
          src={Logo}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Loading;
