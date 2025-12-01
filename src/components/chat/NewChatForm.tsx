import {
  Box,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Autocomplete,
  Chip,
  Avatar,
  FormHelperText,
} from "@mui/material";
import { tss } from "tss-react/mui";
import { useNewChatForm } from "../../hooks/useNewChatForm";
import { getInitials } from "../../utils/userUtils";

const useStyles = tss.create(({ theme }) => ({
  container: {
    maxWidth: 600,
    margin: "0 auto",
    padding: theme.spacing(4),
  },
  header: {
    marginBottom: theme.spacing(4),
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: "#0088cc",
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    color: theme.palette.text.secondary,
  },
  toggleContainer: {
    marginBottom: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
  },
  toggleGroup: {
    backgroundColor: "#f0f2f5",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(0.5),
  },
  toggleButton: {
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(1, 3),
    textTransform: "none",
    fontWeight: 500,
    "&.Mui-selected": {
      backgroundColor: "#0088cc",
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#0077b3",
      },
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
  },
  field: {
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.spacing(2),
      backgroundColor: "#ffffff",
      "& fieldset": {
        borderColor: theme.palette.divider,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  errorField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.error.main,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.error.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.error.main,
      },
    },
  },
  autocomplete: {
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.spacing(2),
      backgroundColor: "#ffffff",
      "& fieldset": {
        borderColor: theme.palette.divider,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  errorAutocomplete: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.error.main,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.error.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.error.main,
      },
    },
  },
  userChip: {
    margin: theme.spacing(0.5),
  },
  selectedUsersContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  selectedUserDisplay: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: "#f0f2f5",
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  userAvatar: {
    backgroundColor: "#0088cc",
    width: 40,
    height: 40,
  },
  buttonContainer: {
    display: "flex",
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  cancelButton: {
    textTransform: "none",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1.5, 3),
  },
  submitButton: {
    backgroundColor: "#0088cc",
    color: "#ffffff",
    textTransform: "none",
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1.5, 3),
    "&:hover": {
      backgroundColor: "#0077b3",
    },
  },
  errorText: {
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(1.75),
  },
}));

export const NewChatForm = () => {
  const { classes } = useStyles();
  const {
    mode,
    messageFormData,
    groupFormData,
    messageErrors,
    groupErrors,
    availableUsers,
    handleModeChange,
    setMessageFormData,
    setGroupFormData,
    setSearchQuery,
    handleMessageSubmit,
    handleGroupSubmit,
    resetForm,
    clearMessageError,
    clearGroupError,
  } = useNewChatForm();

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography className={classes.title}>Start New Chat</Typography>
        <Typography className={classes.subtitle}>
          {mode === "message"
            ? "Start a conversation with a colleague"
            : "Create a group chat with multiple team members"}
        </Typography>
      </Box>

      <Box className={classes.toggleContainer}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          className={classes.toggleGroup}
        >
          <ToggleButton value="message" className={classes.toggleButton}>
            New Message
          </ToggleButton>
          <ToggleButton value="group" className={classes.toggleButton}>
            New Group
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box className={classes.form}>
        {mode === "message" ? (
          <>
            <Autocomplete
              options={availableUsers}
              getOptionLabel={(option) => option.name}
              value={messageFormData.selectedUser}
              onChange={(_event, newValue) => {
                setMessageFormData({ selectedUser: newValue });
                if (newValue) {
                  clearMessageError("selectedUser");
                }
              }}
              onInputChange={(_event, newInputValue) => {
                setSearchQuery(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for a user"
                  placeholder="Type name or email to search..."
                  className={`${classes.field} ${
                    messageErrors.selectedUser ? classes.errorField : ""
                  }`}
                  error={!!messageErrors.selectedUser}
                />
              )}
              renderOption={(props, option) => (
                <Box component="li" {...props} key={option.id}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <Avatar
                      sx={{
                        backgroundColor: "#0088cc",
                        width: 32,
                        height: 32,
                      }}
                    >
                      {option.avatar ? (
                        <img src={option.avatar} alt={option.name} />
                      ) : (
                        getInitials(option.name)
                      )}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1">{option.name}</Typography>
                      {option.email && (
                        <Typography variant="caption" color="text.secondary">
                          {option.email}
                        </Typography>
                      )}
                    </Box>
                    {option.isOnline && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "#4caf50",
                        }}
                      />
                    )}
                  </Box>
                </Box>
              )}
              className={`${classes.autocomplete} ${
                messageErrors.selectedUser ? classes.errorAutocomplete : ""
              }`}
            />
            {messageErrors.selectedUser && (
              <FormHelperText error className={classes.errorText}>
                {messageErrors.selectedUser}
              </FormHelperText>
            )}

            {messageFormData.selectedUser && (
              <Box className={classes.selectedUserDisplay}>
                <Avatar className={classes.userAvatar}>
                  {messageFormData.selectedUser.avatar ? (
                    <img
                      src={messageFormData.selectedUser.avatar}
                      alt={messageFormData.selectedUser.name}
                    />
                  ) : (
                    getInitials(messageFormData.selectedUser.name)
                  )}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {messageFormData.selectedUser.name}
                  </Typography>
                  {messageFormData.selectedUser.email && (
                    <Typography variant="caption" color="text.secondary">
                      {messageFormData.selectedUser.email}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </>
        ) : (
          <>
            <TextField
              label="Group Name"
              placeholder="Enter group name"
              value={groupFormData.name}
              onChange={(e) => {
                setGroupFormData({ ...groupFormData, name: e.target.value });
                if (groupErrors.name) {
                  clearGroupError("name");
                }
              }}
              className={`${classes.field} ${
                groupErrors.name ? classes.errorField : ""
              }`}
              error={!!groupErrors.name}
              helperText={groupErrors.name}
            />

            <TextField
              label="Description (Optional)"
              placeholder="Enter group description"
              value={groupFormData.description}
              onChange={(e) => {
                setGroupFormData({
                  ...groupFormData,
                  description: e.target.value,
                });
              }}
              multiline
              rows={3}
              className={classes.field}
            />

            <Autocomplete
              multiple
              options={availableUsers}
              getOptionLabel={(option) => option.name}
              value={groupFormData.selectedUsers}
              onChange={(_event, newValue) => {
                setGroupFormData({ ...groupFormData, selectedUsers: newValue });
                if (newValue.length > 0 && groupErrors.selectedUsers) {
                  clearGroupError("selectedUsers");
                }
              }}
              onInputChange={(_event, newInputValue) => {
                setSearchQuery(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search and invite users"
                  placeholder="Type name or email to search..."
                  className={`${classes.field} ${
                    groupErrors.selectedUsers ? classes.errorField : ""
                  }`}
                  error={!!groupErrors.selectedUsers}
                />
              )}
              renderOption={(props, option) => (
                <Box component="li" {...props} key={option.id}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <Avatar
                      sx={{
                        backgroundColor: "#0088cc",
                        width: 32,
                        height: 32,
                      }}
                    >
                      {option.avatar ? (
                        <img src={option.avatar} alt={option.name} />
                      ) : (
                        getInitials(option.name)
                      )}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1">{option.name}</Typography>
                      {option.email && (
                        <Typography variant="caption" color="text.secondary">
                          {option.email}
                        </Typography>
                      )}
                    </Box>
                    {option.isOnline && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: "#4caf50",
                        }}
                      />
                    )}
                  </Box>
                </Box>
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option.id}
                    label={option.name}
                    avatar={
                      <Avatar
                        sx={{
                          backgroundColor: "#0088cc",
                          width: 24,
                          height: 24,
                        }}
                      >
                        {option.avatar ? (
                          <img src={option.avatar} alt={option.name} />
                        ) : (
                          getInitials(option.name)
                        )}
                      </Avatar>
                    }
                    className={classes.userChip}
                  />
                ))
              }
              className={`${classes.autocomplete} ${
                groupErrors.selectedUsers ? classes.errorAutocomplete : ""
              }`}
            />
            {groupErrors.selectedUsers && (
              <FormHelperText error className={classes.errorText}>
                {groupErrors.selectedUsers}
              </FormHelperText>
            )}

            {groupFormData.selectedUsers.length > 0 && (
              <Box className={classes.selectedUsersContainer}>
                <Typography variant="caption" color="text.secondary">
                  Selected: {groupFormData.selectedUsers.length} user
                  {groupFormData.selectedUsers.length !== 1 ? "s" : ""}
                </Typography>
              </Box>
            )}
          </>
        )}

        <Box className={classes.buttonContainer}>
          <Button
            variant="outlined"
            onClick={resetForm}
            className={classes.cancelButton}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={
              mode === "message" ? handleMessageSubmit : handleGroupSubmit
            }
            className={classes.submitButton}
          >
            {mode === "message" ? "Start Conversation" : "Create Group"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
