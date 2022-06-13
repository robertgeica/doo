import React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdLowPriority } from "react-icons/md";
import { TbRotateClockwise2 } from "react-icons/tb";
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from "react-icons/fc";

import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { AiOutlineSave } from "react-icons/ai";

import { updateBlock } from "../../../actions/blockActions";
import { useDispatch, connect } from "react-redux";

const Priority = ({ block, onChange, onUpdateBlock }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const [newDays, setNewDays] = React.useState({
    ...block.blockContent.isRecurrent.days,
  });
  const onChangee = (e) => {
    setNewDays({ ...newDays, [e.target.id]: !newDays[e.target.id] });
  };

  const hasChanges =
    JSON.stringify(newDays) !==
    JSON.stringify(block.blockContent.isRecurrent.days);

  return (
    <div className="action-item">
      <TbRotateClockwise2 aria-describedby={id} onClick={handleClick} />
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
          onChange={(e) => onChangee(e)}
        >
          <div className="checkbox">
            <label for="monday">Monday</label>
            <input
              type="checkbox"
              id="monday"
              name="monday"
              value="monday"
              checked={newDays.monday}
            />
          </div>

          <div className="checkbox">
            <label for="tuesday">Tuesday</label>
            <input
              type="checkbox"
              id="tuesday"
              name="tuesday"
              value="tuesday"
              checked={newDays.tuesday}
            />
          </div>

          <div className="checkbox">
            <label for="wednesday">Wednesday</label>
            <input
              type="checkbox"
              id="wednesday"
              name="wednesday"
              value="wednesday"
              checked={newDays.wednesday}
            />
          </div>

          <div className="checkbox">
            <label for="thursday">Thursday</label>
            <input
              type="checkbox"
              id="thursday"
              name="thursday"
              value="thursday"
              checked={newDays.thursday}
            />
          </div>

          <div className="checkbox">
            <label for="friday">Friday</label>
            <input
              type="checkbox"
              id="friday"
              name="friday"
              value="friday"
              checked={newDays.friday}
            />
          </div>

          <div className="checkbox">
            <label for="saturday">Saturday</label>
            <input
              type="checkbox"
              id="saturday"
              name="saturday"
              value="saturday"
              checked={newDays.saturday}
            />
          </div>

          <div className="checkbox">
            <label for="sunday">Sunday</label>
            <input
              type="checkbox"
              id="sunday"
              name="sunday"
              value="sunday"
              checked={newDays.sunday}
            />
          </div>
          <Box sx={{ alignSelf: "center", marginTop: "1em" }}>
            {hasChanges && (
              <AiOutlineSave
                onClick={() =>
                  dispatch(updateBlock(
                    {
                      ...block,
                      blockContent: {
                        ...block.blockContent,
                        isRecurrent: {
                          ...block.blockContent.isRecurrent,
                          days: newDays,
                        },
                      },
                    },
                    block._id
                  ))
                }
              />
            )}
          </Box>
        </Box>
      </Popper>
    </div>
  );
};

export default Priority;
