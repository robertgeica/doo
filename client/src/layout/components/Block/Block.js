import React, { useState, useEffect } from "react";
import { FaRegComments } from "react-icons/fa";
import { TbRotateClockwise2 } from "react-icons/tb";
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

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Block = (props) => {
  const { block, collection, user, subBlocks } = props;
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [newBlock, setNewBlock] = useState(block);

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
        ...block,
        blockContent: newBlockContent,
      });
      return;
    }

    if (key.split(".")[0] === "blockContent") {
      setNewBlock({
        ...block,
        blockContent: { ...block.blockContent, [key.split(".")[1]]: value },
      });
      return;
    }

    setNewBlock({ ...block, [key]: value });
  };

  const isDifferentBlockName = block.blockName !== newBlock.blockName;
  const isDifferentBlockContent =
    JSON.stringify(block.blockContent) !==
    JSON.stringify(newBlock.blockContent);

  const onUpdateBlock = () => {
    dispatch(updateBlock(newBlock, newBlock._id));
    setNewBlock(block);
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
    isOpen && dispatch(loadSubBlocks(block.blockContent.blocks));
  }, [isOpen]);

  return (
    <div className="block-container">
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="modal-header">
          <div className="modal-header-actions">
            <div className="action-item">
              <AiOutlineDelete
                onClick={() => dispatch(deleteBlock(block._id))}
              />
            </div>
            <div className="action-item">{saveIcon()}</div>

            <Status
              block={newBlock}
              collection={collection}
              onChange={onChange}
              saveIcon={saveIcon}
              showIcon
            />
            <Priority
              block={newBlock}
              onChange={onChange}
              saveIcon={saveIcon}
              showIcon
            />
            <Estimation
              block={newBlock}
              onChange={onChange}
              saveIcon={saveIcon}
            />
            <DateTimePicker block={block} onChange={onChange} />

            <Recurrent
              block={newBlock}
              onChange={onChange}
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
              {newBlock.blockName}
            </h1>

            <DefaultEditor
              value={newBlock.blockContent.description}
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
                              ...newBlock,
                              comments: [
                                ...newBlock.comments,
                                {
                                  content: newComment,
                                  accountId: user._id,
                                  accountName: user.username,
                                },
                              ],
                            },
                            newBlock._id
                          )
                        );
                      }}
                    >
                      comment
                    </button>
                  )}
                </div>
              </div>

              {newBlock.comments.map((comment) => (
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
                            ...newBlock,
                            comments: newBlock.comments.filter(
                              (com) => com.content !== comment.content
                            ),
                          },
                          newBlock._id
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
                      {sub_block.blockName}
                    </div>

                    <div className="block-actions">
                      <div className="block-item">
                        <Priority
                          block={sub_block}
                          onChange={onChange}
                          saveIcon={saveIcon}
                        />
                      </div>
                      <div className="block-item">
                        <Estimation
                          block={sub_block}
                          onChange={onChange}
                          saveIcon={saveIcon}
                        />
                        {/* estimation */}
                      </div>
                      <div className="block-item">
                        <DateTimePicker
                          block={sub_block}
                          onChange={onChange}
                          saveIcon={saveIcon}
                        />
                        {/* deadline */}
                      </div>
                      <div className="block-item" type="button">
                        <Recurrent
                          block={sub_block}
                          onChange={onChange}
                          saveIcon={saveIcon}
                        />
                        {/* isRecurrent */}
                      </div>
                    </div>
                  </div>

                  // <div className={`sub-block ${block.blockContent.priority}`}>
                  //   <div>
                  //     <div className="sub-block-header">
                  //       {/* {subtask.icon ? <i>subtask.icon</i> : ''} */}
                  //       <p
                  //       // onClick={e => setNewBlock(sub_block)}
                  //       >
                  //         {sub_block.blockName}
                  //       </p>
                  //       <div className="additional-details">
                  //         <Priority
                  //           block={sub_block}
                  //           onChange={onChange}
                  //           saveIcon={saveIcon}
                  //         />
                  //         <Estimation
                  //           block={sub_block}
                  //           onChange={onChange}
                  //           saveIcon={saveIcon}
                  //         />
                  //         {/* estimation */}
                  //         <DateTimePicker
                  //           block={sub_block}
                  //           onChange={onChange}
                  //           saveIcon={saveIcon}
                  //         />
                  //         {/* deadline */}
                  //         <Recurrent
                  //           block={sub_block}
                  //           onChange={onChange}
                  //           saveIcon={saveIcon}
                  //         />
                  //         {/* isRecurrent */}
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div>
                ))
              : ""}
          </div>
        </div>
      </Modal>

      <div className="block-row">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "30%",
          }}
        >
          <div className="block-name" onClick={openModal}>
            {block.blockName}
          </div>

          <Status
            block={newBlock}
            collection={collection}
            onChange={onChange}
            saveIcon={saveIcon}
            showIcon={false}
          />
        </div>

        <div className="block-actions">
          <div className="block-item">
            <Priority
              block={newBlock}
              onChange={onChange}
              saveIcon={saveIcon}
            />
          </div>
          <div className="block-item">
            <Estimation
              block={newBlock}
              onChange={onChange}
              saveIcon={saveIcon}
            />
            {/* estimation */}
          </div>
          <div className="block-item">
            <DateTimePicker
              block={block}
              onChange={onChange}
              saveIcon={saveIcon}
            />
            {/* deadline */}
          </div>
          <div className="block-item" type="button">
            <Recurrent block={block} onChange={onChange} saveIcon={saveIcon} />
            {/* isRecurrent */}
          </div>
          <div className="block-item">
            {block.comments.length} <FaRegComments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Block;
