import React, { useState } from "react";
import Popper from "@mui/material/Popper";
import Picker from "emoji-picker-react";
import { useDispatch } from "react-redux";
import { updateCollection } from "../../actions/collectionActions";

const Emoji = ({ onUpdate, parent }) => {
  const dispatch = useDispatch();

  const [chosenEmoji, setChosenEmoji] = useState("😀");

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    onUpdate(emojiObject.emoji)
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    // console.log(event.currentTarget);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <>
      <span
        aria-describedby={id}
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          margin: "0 .2em",
          cursor: "pointer",
          fontSize: "1.3em",
        }}
      >
        {parent?.icon || chosenEmoji.emoji || '📁'}
      </span>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div>
          <Picker
            onEmojiClick={onEmojiClick}
            disableAutoFocus={true}
            native
          />
        </div>
      </Popper>
    </>
  );
};

export default Emoji;
