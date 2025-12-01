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
    backgroundColor: theme.palette.background.paper,
  },
  iconButton: {
    color: theme.palette.text.secondary,
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.spacing(2),
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    "&.Mui-disabled": {
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300],
      color: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[500],
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
