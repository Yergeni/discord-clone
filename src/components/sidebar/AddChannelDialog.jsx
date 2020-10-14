import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const AddChannelDialog = ({
	open,
	handleClose,
	handleChannelOnChange,
	handleAddChannel,
}) => {
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				maxWidth="xs"
				fullWidth={true}
			>
				<DialogTitle id="form-dialog-title">Add a new channel</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Channel Name"
						type="text"
						fullWidth
						onChange={handleChannelOnChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleAddChannel} color="primary">
						Add Channel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AddChannelDialog;
