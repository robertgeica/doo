import React, { useState } from "react";
import { addBlock } from "../../../actions/blockActions";
import { useDispatch } from "react-redux";
import { loadCollection } from "../../../actions/collectionActions";
import { Link, useParams } from "react-router-dom";
import { loadSubBlocks } from "../../../actions/blockActions";

export default function AddBlockInput(props) {
  const dispatch = useDispatch();
  const params = useParams();

  const { parentId, userId, fullWidth, isBlockParent, collectionId, block } = props;
  const [blockType, setBlockType] = useState("task");
  return (
    <div className={fullWidth ? "full-add-block" : "add-block"}>
      <select
        name="block-type"
        id="block-type"
        className="collections block-type"
        onChange={(e) => setBlockType(e.target.value)}
      >
        <option value="task">Task</option>
        <option value="complex">Table</option>
      </select>

      <input
        type="text"
        name="name"
        id="add-block-input"
        className="collections"
        placeholder="Add new block"
        onKeyDown={(e) => {
          e.key === "Enter" &&
            dispatch(
              addBlock({
                parentId,
                userId,
                blockName: e.target.value,
                blockType,
                parentType: isBlockParent ? "block" : "collection",
              })
            )
              .then(() => dispatch(loadCollection(params.id)))
              // .then((res) => dispatch(loadSubBlocks(block.blockContent.blocks)));
        }}
      />
    </div>
  );
}
