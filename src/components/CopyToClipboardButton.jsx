import { useState } from "react";
import { IconButton, Tooltip, Box, Fab } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";

const CopyToClipboardButton = ({ text }) => {
  const [copySuccess, setCopySuccess] = useState(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      setCopySuccess("Failed to copy :(");
    }

    // Clear the "Copied!" message after a short delay
    setTimeout(() => {
      setCopySuccess(null);
    }, 2000);
  };

  return (
    <Box>
      <Tooltip title="click to copy">
        <ContentCopy
          onClick={copyToClipboard}
          sx={{
            fontSize: "15px",
            cursor: "pointer",
            color: "#1976D2",
            marginRight: "4px",
          }}
        />
      </Tooltip>
      {copySuccess && (
        <small
          style={{ color: "#1976D2", fontSize: "12px", marginRight: '1rem'}}
        >
          {copySuccess}
        </small>
      )}
    </Box>
  );
};

export default CopyToClipboardButton;
