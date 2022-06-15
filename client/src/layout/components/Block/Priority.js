import React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdLowPriority } from "react-icons/md";
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from "react-icons/fc";

import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";

const Priority = ({ block, onChange, saveIcon, showIcon }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const blockPriority = {
    low: <FcLowPriority />,
    medium: <FcMediumPriority />,
    high: <FcHighPriority />,
  };

  return (
    <div className="action-item">
      {showIcon ? (
        <MdLowPriority aria-describedby={id} onClick={handleClick} />
      ) : (
        <div aria-describedby={id} onClick={handleClick}>
          {blockPriority[block.blockContent.priority]}
        </div>
      )}

      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: 1,
            p: 1,
            bgcolor: "background.paper",
          }}
        >
          <FcLowPriority
            onClick={(e) => onChange("low", "blockContent.priority")}
            className="icon"
            style={{
              fontSize: `${
                block.blockContent.priority === "low" ? "2em" : "1.7em"
              }`,
            }}
          />
          <FcMediumPriority
            onClick={(e) => onChange("medium", "blockContent.priority")}
            className="icon"
            style={{
              fontSize: `${
                block.blockContent.priority === "medium" ? "2em" : "1.7em"
              }`,
            }}
          />
          <FcHighPriority
            onClick={(e) => onChange("high", "blockContent.priority")}
            className="icon"
            style={{
              fontSize: `${
                block.blockContent.priority === "high" ? "2em" : "1.7em"
              }`,
            }}
          />
          <Box sx={{ alignSelf: "center", marginTop: "1em" }}>
            {typeof saveIcon !== "undefined" && saveIcon()}
          </Box>
        </Box>
      </Popper>
    </div>
  );
};

export default Priority;
