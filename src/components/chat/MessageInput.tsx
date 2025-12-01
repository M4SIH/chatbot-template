import { Box, TextField, IconButton } from "@mui/material";
import { tss } from "tss-react/mui";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useMessageInput } from "../../hooks/useMessageInput";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const useStyles = tss.create(({ theme }) => ({
  container: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#ffffff",
  },
  iconButton: {
    color: theme.palette.text.secondary,
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.spacing(2),
      backgroundColor: "#f0f2f5",
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  sendButton: {
    backgroundColor: "#0088cc",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#0077b3",
    },
    "&.Mui-disabled": {
      backgroundColor: "#e4e6eb",
      color: "#bcc0c4",
    },
  },
}));

export const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const { classes } = useStyles();
  const { inputValue, setInputValue, handleSend, handleKeyPress } =
    useMessageInput(onSendMessage);

  return (
    <Box className={classes.container}>
      <IconButton size="small" className={classes.iconButton}>
        <EmojiEmotionsIcon />
      </IconButton>
      <IconButton size="small" className={classes.iconButton}>
        <AttachFileIcon />
      </IconButton>
      <TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder="Type a message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        variant="outlined"
        size="small"
        className={classes.textField}
      />
      <IconButton
        color="primary"
        onClick={handleSend}
        disabled={!inputValue.trim()}
        className={classes.sendButton}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};
