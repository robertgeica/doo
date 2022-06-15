import React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineLabel } from "react-icons/md";
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from "react-icons/fc";

import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import EditableDropdown from "../Dropdown/EditableDropdown";
import Chip from "@mui/material/Chip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import {
  loadCollection,
  updateCollection,
} from "../../../actions/collectionActions";
import { updateBlock } from "../../../actions/blockActions";

import { AiOutlineSave } from "react-icons/ai";
import { useDispatch, connect } from "react-redux";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Priority = ({ collection, block, onChange, saveIcon, showIcon, hideStatusIcon }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const [newLabel, setNewLabel] = React.useState({ color: "", label: "" });
  
  return (
    <div className="action-item" style={{display: hideStatusIcon ? 'none' : 'block'}}>
      {showIcon ? (
        <MdOutlineLabel aria-describedby={id} onClick={handleClick} />
      ) : (
        <div
          aria-describedby={id}
          onClick={handleClick}
          style={{ backgroundColor: block.blockContent.status?.color, cursor: 'pointer' }}
          className="label"
        >
          {block.blockContent.status.label}
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
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tab}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Collection" />
              <Tab label="Block" />
            </Tabs>

            <TabPanel value={tab} index={0}>
              <div className="action-item">
                {collection?.labels.map((label) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: 'pointer'
                    }}
                  >
                    <div
                    className="label"
                      style={{
                        backgroundColor: `${label.color}`,
                        fontWeight: `${
                          block.blockContent.status.label === label.label &&
                          block.blockContent.status.color === label.color
                            ? "600"
                            : "400"
                        }`,
                        width: "100%",
                      }}
                      onClick={() => onChange(label, "blockContent.status")}
                    >
                      {label.label}
                    </div>
                    <AiOutlineDelete
                      onClick={() =>
                        dispatch(
                          updateCollection(
                            {
                              ...collection,
                              labels: collection.labels.filter(
                                (val) => val._id !== label._id
                              ),
                            },
                            collection._id
                          )
                        )
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="label-input-container">
                <div>
                  <input
                    onChange={(e) =>
                      setNewLabel({ ...newLabel, label: e.target.value })
                    }
                    className="input"
                    id="label"
                    name="label"
                    style={{ width: "8em" }}
                  />
                  <input
                    onChange={(e) =>
                      setNewLabel({ ...newLabel, color: e.target.value })
                    }
                    type="color"
                    id="color"
                    name="color"
                  ></input>
                </div>

                {
                  newLabel.color.length !== 0 && newLabel.label.length !== 0 && (
                    <div className="action-item">
                      <AiOutlineSave
                        onClick={() => {
                          dispatch(
                            updateCollection(
                              {
                                ...collection,
                                labels: [...collection?.labels, newLabel],
                              },
                              collection._id
                            )
                          );

                          setNewLabel({ color: "", label: "" });
                        }}
                      />
                    </div>
                  )
                  //
                }
              </div>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <div className="action-item">
                {block.blockContent.labels.map((label) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      className="label"
                      style={{
                        backgroundColor: `${label.color}`,
                        fontWeight: `${
                          block.blockContent.status.label === label.label &&
                          block.blockContent.status.color === label.color
                            ? "600"
                            : "400"
                        }`,
                        width: "100%",
                      }}
                      onClick={() => onChange(label, "blockContent.status")}
                    >
                      {label.label}
                    </div>
                    <AiOutlineDelete
                      onClick={() =>
                        dispatch(
                          updateBlock(
                            {
                              ...block,
                              blockContent: {
                                ...block.blockContent,
                                labels: block.blockContent.labels.filter(
                                  (val) => val.label !== label.label
                                ),
                              },
                            },
                            block._id
                          )
                        )
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="label-input-container">
                <div>
                  <input
                    onChange={(e) =>
                      setNewLabel({ ...newLabel, label: e.target.value })
                    }
                    className="input"
                    id="label"
                    name="label"
                    style={{ width: "8em" }}
                  />
                  <input
                    onChange={(e) =>
                      setNewLabel({ ...newLabel, color: e.target.value })
                    }
                    type="color"
                    id="color"
                    name="color"
                  ></input>
                </div>

                {
                  newLabel.color.length !== 0 && newLabel.label.length !== 0 && (
                    <div className="action-item">
                      <AiOutlineSave
                        onClick={() => {
                          onChange(
                            [...block.blockContent.labels, newLabel],
                            "blockContent.labels"
                          );
                          dispatch(
                            updateBlock(
                              {
                                ...block,
                                blockContent: {
                                  ...block.blockContent,
                                  labels: [
                                    ...block.blockContent.labels,
                                    newLabel,
                                  ],
                                },
                              },
                              block._id
                            )
                          );

                          setNewLabel({ color: "", label: "" });
                        }}
                      />
                    </div>
                  )
                  //
                }
              </div>
            </TabPanel>
          </Box>

          <Box sx={{ alignSelf: "center", marginTop: "1em" }}>
            {typeof saveIcon !== "undefined" && !showIcon && saveIcon()}
          </Box>
        </Box>
      </Popper>
    </div>
  );
};

export default Priority;
