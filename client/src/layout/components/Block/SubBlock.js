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

const SubBlock = (props) => {
  const { sub_block, parentId, userId } = props;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="sub-block-container">
      <div key={sub_block?._id}>
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
                  onClick={() => dispatch(deleteBlock(sub_block?._id))}
                />
              </div>
              {/* <div className="action-item">{saveIcon()}</div> */}

              <Status
                block={sub_block}
                // collection={collection}
                // onChange={onChange}
                // saveIcon={saveIcon}
                showIcon
              />
              {/* <Priority
                block={sub_block}
                // onChange={onChange}
                // saveIcon={saveIcon}
                showIcon
              /> */}
              {/* <Estimation
                block={sub_block}
                // onChange={onChange}
                // saveIcon={saveIcon}
              /> */}
              <DateTimePicker
                block={sub_block}
                // onChange={onChange}
              />

              <Recurrent
                block={sub_block}
                // onChange={onChange}
                // onUpdateBlock={onUpdateBlock}
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
                // onInput={(e) =>
                // onChange(e.target.textContent, "blockName")
                // }
              >
                {sub_block?.blockName}
              </h1>

              <DefaultEditor
                value={sub_block?.blockContent.description}
                // onChange={(e) =>
                // onChange(e.target.value, "blockContent.description")
                // }
              />

              <div className="comments-container">
                <p>Comments</p>
                <div className="comment-input-container">
                  <textarea
                    // onChange={(e) => setNewComment(e.target.value)}
                    className="input comment-input"
                    style={{
                      width: "100%",
                      height: "4em",
                      resize: "vertical",
                      padding: "10px 7px",
                    }}
                    placeholder="Add a comment..."
                  />
                  {/* <div className="grey-bar">
                          {newComment.length !== 0 && (
                            <button
                              className="button"
                              onClick={(e) => {
                                dispatch(
                                  updateBlock(
                                    {
                                      ...sub_block?,
                                      comments: [
                                        ...sub_block?.comments,
                                        {
                                          content: newComment,
                                          // accountId: user._id,
                                          // accountName: user.username,
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
                        </div> */}
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
              {/* <SubBlock
                      parentId={sub_block?._id}
                      subBlocks={sub_block}
                      // userId={user._id}
                    /> */}
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
            <div className="block-item">
              <AiOutlineDelete
                onClick={() => dispatch(deleteBlock(sub_block?._id))}
              />
              <Priority
                block={sub_block}
                // onChange={onChange}
                // saveIcon={saveIcon}
              />
            </div>
            <div className="block-item">
              <Estimation
                block={sub_block}
                // onChange={onChange}
                // saveIcon={saveIcon}
              />
              {/* estimation */}
            </div>
            <div className="block-item">
              <DateTimePicker
                block={sub_block}
                // onChange={onChange}
                // saveIcon={saveIcon}
              />
              {/* deadline */}
            </div>
            <div className="block-item" type="button">
              <Recurrent
                block={sub_block}
                // onChange={onChange}
                // saveIcon={saveIcon}
              />
              {/* isRecurrent */}
            </div>
          </div>
        </div>
      </div>

      {/* <AddBlockInput
        parentId={parentId}
        userId={userId}
        fullWidth
        isBlockParent
      /> */}
    </div>
  );
};

export default SubBlock;
