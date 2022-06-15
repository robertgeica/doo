import React, { useState, useEffect } from "react";

import {
  AiOutlineDelete,
} from "react-icons/ai";
import {
  deleteBlock,
} from "../../../actions/blockActions";
import { useDispatch } from "react-redux";

import DateTimePicker from "./DateTimePicker";
import Estimation from "./Estimation";
import Priority from "./Priority";
import Recurrent from "./Recurrent";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AddBlockInput from "./AddBlockInput";

const SubBlock = (props) => {
  const { subBlocks, parentId, userId } = props;
  const dispatch = useDispatch();

  return (
    <div className="sub-block-container">
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
              <div className="block-name">
                {sub_block.blockName}
              </div>

              <div className="block-actions">
                <div className="block-item">
                <AiOutlineDelete
                onClick={() => dispatch(deleteBlock(sub_block._id))}
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
          ))
        : ""}

      <AddBlockInput
        parentId={parentId}
        userId={userId}
        fullWidth
        isBlockParent
      />
    </div>
  );
};

export default SubBlock;
