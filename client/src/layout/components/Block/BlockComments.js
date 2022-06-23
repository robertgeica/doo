import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { updateBlock, loadBlocks } from "../../../actions/blockActions";

export default function BlockComments({
  block,
  user,
  collection,
  onUpdateBlock,
}) {
  const dispatch = useDispatch();

  const [newComment, setNewComment] = useState("");
  return (
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
                      ...block,
                      comments: [
                        ...block.comments,
                        {
                          content: newComment,
                          accountId: user._id,
                          accountName: user.username,
                        },
                      ],
                    },
                    block._id
                  )
                );
                onUpdateBlock({
                  ...block,
                  comments: [
                    ...block.comments,
                    {
                      content: newComment,
                      accountId: user._id,
                      accountName: user.username,
                    },
                  ],
                });
              }}
            >
              comment
            </button>
          )}
        </div>
      </div>
      {block.comments.map((comment) => (
        <div className="comment-container">
          <div style={{ width: "95%" }}>
            <span>{comment.accountName}</span>
            <p>{comment.content}</p>
          </div>
          <MdDeleteOutline
            style={{ fontSize: "1.2em", cursor: "pointer" }}
            onClick={(e) => {
              dispatch(
                updateBlock(
                  {
                    ...block,
                    comments: block.comments.filter(
                      (com) => com.content !== comment.content
                    ),
                  },
                  block._id
                )
              );
              onUpdateBlock({
                ...block,
                comments: block.comments.filter(
                  (com) => com.content !== comment.content
                ),
              });
            }}
          />
        </div>
      ))}
    </div>
  );
}
