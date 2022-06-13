import React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { BsCalendar2Date } from "react-icons/bs";

const DateTimePicker = ({block, onChange, saveIcon}) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    console.log(event.currentTarget)
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <div className="action-item">
      <BsCalendar2Date aria-describedby={id} onClick={handleClick} />
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: 1,
            p: 1,
            bgcolor: "background.paper",
          }}
        >
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={(e) => onChange(e.target, "blockContent.isRecurrent")}
            defaultValue={block?.blockContent?.isRecurrent.date}
          />
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            onChange={(e) => onChange(e.target, "blockContent.isRecurrent")}
            defaultValue={block?.blockContent?.isRecurrent.time}
          />
        {typeof saveIcon !== 'undefined' && saveIcon()}
        </Box>

      </Popper>
    </div>
  );
};

export default DateTimePicker;