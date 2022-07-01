import React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { AiOutlineClockCircle } from "react-icons/ai";
import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";

const Estimation = ({ block, onChange, saveIcon }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <div className="action-item">
      <AiOutlineClockCircle aria-describedby={id} onClick={handleClick} />
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
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box>
              <Button
                onClick={(e) =>
                  onChange('15m', "blockContent.estimation")
                }
                size="small"
              >
                15m
              </Button>
              <Button
                onClick={(e) =>
                  onChange('30m', "blockContent.estimation")
                }
                size="small"
              >
                30m
              </Button>
              <Button
                onClick={(e) =>
                  onChange('1h', "blockContent.estimation")
                }
                size="small"
              >
                1h
              </Button>
            </Box>
            <Box>
              <Button
                onClick={(e) =>
                  onChange('2h', "blockContent.estimation")
                }
                size="small"
              >
                2h
              </Button>
              <Button
                onClick={(e) =>
                  onChange('3h', "blockContent.estimation")
                }
                size="small"
              >
                3h
              </Button>
              <Button
                onClick={(e) =>
                  onChange('5h', "blockContent.estimation")
                }
                size="small"
              >
                5h
              </Button>
            </Box>
            <Box>
              <Button size="small">10h</Button>
              <input
                onChange={(e) =>
                  onChange(`${e.target.value}`, "blockContent.estimation")
                }
                value={block.blockContent.estimation}
                className="input"
                style={{ width: "8em" }}
              />
            </Box>
          </Box>
          <Box sx={{ alignSelf: "center", marginTop: "1em" }}>
            {typeof saveIcon !== "undefined" && saveIcon()}
          </Box>
        </Box>
      </Popper>
    </div>
  );
};

export default Estimation;
