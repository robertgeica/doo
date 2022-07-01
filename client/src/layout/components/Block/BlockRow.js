import React, { useState, useEffect } from "react";
import { FaRegComments } from "react-icons/fa";
import { loadBlock } from "../../../actions/blockActions";
import Status from "./Status";
import BlockActions from "./BlockActions";
import Emoji from "../Emoji";
import { useDispatch } from "react-redux";

const BlockRow = ({newBlock, onIconUpdate, openModal, collection, onChange, saveIcon, block, setNewBlock}) => {
  const dispatch = useDispatch();
  return (
    <div className="block-row">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "30%",
        }}
      >
        <div style={{ display: "flex" }}>
          <Emoji parent={newBlock} onUpdate={onIconUpdate} />
          <div
            className="block-name"
            onClick={() => {
              openModal();
              dispatch(loadBlock(newBlock));
            }}
          >
            {newBlock.blockName}
          </div>
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
        <BlockActions
          newBlock={newBlock}
          collection={collection}
          onChange={onChange}
          saveIcon={saveIcon}
          hideStatusIcon={false}
          block={block}
          onUpdateBlock={(block) => setNewBlock(block)}
        />

        <div className="block-item">
          {newBlock.comments.length} <FaRegComments />
        </div>
      </div>
    </div>
  );
};

export default BlockRow;
