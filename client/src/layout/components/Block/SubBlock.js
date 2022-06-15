import React, { useState, useEffect } from "react";
import { FaRegComments } from "react-icons/fa";
import { TbRadiusBottomLeft, TbRotateClockwise2 } from "react-icons/tb";
import { BsCalendar2Date } from "react-icons/bs";
import {
  AiOutlineClockCircle,
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlineSave,
} from "react-icons/ai";
import Modal from "react-modal";
import {
  deleteBlock,
  updateBlock,
  loadBlocks,
  loadSubBlocks,
} from "../../../actions/blockActions";
import { useDispatch, connect } from "react-redux";
import { DefaultEditor } from "react-simple-wysiwyg";

import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";

import DateTimePicker from "./DateTimePicker";
import Estimation from "./Estimation";
import Priority from "./Priority";
import Status from "./Status";
import Recurrent from "./Recurrent";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { MdDeleteOutline, MdEdit, MdAddCircleOutline } from "react-icons/md";
import AddBlockInput from "./AddBlockInput";
import BlockActions from "./BlockActions";
import Block from './Block';


const SubBlock = (props) => {
  const { sub_block, parentId, user, collection, subBlocks } = props;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [newBlock, setNewBlock] = useState(sub_block);

  const onChange = (value, key) => {
    if (key.split(".")[1] === "isRecurrent") {
      const newIsRecurrent = {
        ...newBlock.blockContent.isRecurrent,
        [value.id]: value.value,
      };
      const newBlockContent = {
        ...newBlock.blockContent,
        isRecurrent: newIsRecurrent,
      };
      setNewBlock({
        ...sub_block,
        blockContent: newBlockContent,
      });
      return;
    }

    if (key.split(".")[0] === "blockContent") {
      setNewBlock({
        ...sub_block,
        blockContent: { ...sub_block.blockContent, [key.split(".")[1]]: value },
      });
      return;
    }

    setNewBlock({ ...sub_block, [key]: value });
  };

  const isDifferentBlockName = sub_block.blockName !== newBlock.blockName;
  const isDifferentBlockContent =
    JSON.stringify(sub_block.blockContent) !==
    JSON.stringify(newBlock.blockContent);

  const onUpdateBlock = () => {
    dispatch(updateBlock(newBlock, newBlock._id));
    setNewBlock(sub_block);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const saveIcon = () => (
    <div className="action-item">
      {(isDifferentBlockName || isDifferentBlockContent) && (
        <AiOutlineSave onClick={() => onUpdateBlock()} />
      )}
    </div>
  );

  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (isOpen && sub_block.blockContent.blocks.length !== 0) {
      dispatch(loadSubBlocks(sub_block.blockContent.blocks));
    }
  }, [isOpen]);
  
  return (
    <div className="sub-block-container">
      <div key={sub_block?._id}>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Block modal"
          ariaHideApp={false}
        >
          <div className="modal-header">
            <div className="modal-header-actions">
              <div className="action-item">
                <AiOutlineDelete
                  onClick={() => dispatch(deleteBlock(sub_block?._id))}
                />
              </div>
              <div className="action-item">{saveIcon()}</div>
              <BlockActions
                newBlock={newBlock}
                collection={collection}
                onChange={onChange}
                saveIcon={saveIcon}
                showStatusIcon
                showPriorityIcon
                hideStatusIcon={false}
                block={sub_block}
                onUpdateBlock={onUpdateBlock}
              />
            </div>

            <AiOutlineCloseCircle onClick={closeModal} />
          </div>
          <div className="modal-container">
            <div className="modal-side">
              <h1
                style={{ color: "black" }}
                contentEditable
                suppressContentEditableWarning={true}
                onInput={(e) => onChange(e.target.textContent, "blockName")}
              >
                {sub_block?.blockName}
              </h1>

              <DefaultEditor
                value={newBlock?.blockContent?.description}
                onChange={(e) =>
                  onChange(e.target.value, "blockContent.description")
                }
              />

              <div className="comments-container">
                <p>Comments</p>
                <div className="comment-input-container">
                  <textarea
                    onChange={(e) => setNewComment(e.target.value)}
                    className="input comment-input"
                    style={{
                      width: "100%",
                      height: "4em",
                      resize: "vertical",
                      padding: "10px 7px",
                    }}
                    placeholder="Add a comment..."
                  />
                  <div className="grey-bar">
                    {newComment.length !== 0 && (
                      <button
                        className="button"
                        onClick={(e) => {
                          dispatch(
                            updateBlock(
                              {
                                ...sub_block,
                                comments: [
                                  ...sub_block?.comments,
                                  {
                                    content: newComment,
                                    accountId: user._id,
                                    accountName: user.username,
                                  },
                                ],
                              },
                              sub_block?._id
                            )
                          );
                        }}
                      >
                        comment
                      </button>
                    )}
                  </div>
                </div>

                {sub_block?.comments.map((comment) => (
                  <div className="comment-container">
                    <div style={{ width: "95%" }}>
                      <span>{comment.accountName}</span>
                      <p>{comment.content}</p>
                    </div>
                    <MdDeleteOutline
                      style={{ fontSize: "1.2em", cursor: "pointer" }}
                      onClick={(e) =>
                        dispatch(
                          updateBlock(
                            {
                              ...sub_block,
                              comments: sub_block?.comments.filter(
                                (com) => com.content !== comment.content
                              ),
                            },
                            sub_block?._id
                          )
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-blocks">
              <h2>subtasks</h2>
              {typeof subBlocks !== "undefined" &&
              subBlocks?.length !== 0 &&
              subBlocks !== null
                ? subBlocks.map((sub_block) => (
                    <SubBlock
                      parentId={sub_block._id}
                      sub_block={sub_block}
                      user={user}
                      collection={collection}
                    />
                  ))
                : ""}

              <AddBlockInput
                parentId={sub_block._id}
                userId={user._id}
                fullWidth
                isBlockParent
              />
            </div>
          </div>
        </Modal>

        <div
          className="block-row"
          style={{
            flexDirection: "column",
            margin: "0 0 1em 0",
            border: "1px solid grey",
            padding: "0.5em",
          }}
        >
          <div className="block-name" onClick={openModal}>
            {sub_block?.blockName}
          </div>

          <div className="block-actions">
            <BlockActions
              newBlock={newBlock}
              collection={collection}
              onChange={onChange}
              saveIcon={saveIcon}
              // showStatusIcon
              // showPriorityIcon
              hideStatusIcon
              block={sub_block}
              onUpdateBlock={onUpdateBlock}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubBlock;
