import React, { useState } from "react";
import { addBlock, loadBlock, loadBlocks } from "../../../actions/blockActions";
import { useDispatch } from "react-redux";
import { loadCollection } from "../../../actions/collectionActions";
import { Link, useParams } from "react-router-dom";
import { loadSubBlocks } from "../../../actions/blockActions";

export default function AddBlockInput(props) {
  const dispatch = useDispatch();
  const params = useParams();

  const { parentId, userId, fullWidth, isBlockParent, collectionId, block, updateLocalBlock } =
    props;

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
          if (e.key === "Enter") {
            dispatch(
              addBlock(
                {
                  parentId,
                  userId,
                  blockName: e.target.value,
                  blockType,
                  parentType: isBlockParent ? "block" : "collection",
                },
                block
              )
            ).then((newBlockId) => {
              if (isBlockParent) {
                loadSubBlocks([...block?.blockContent?.blocks, newBlockId]);
                updateLocalBlock({
                  ...block,
                  blockContent: {
                    ...block.blockContent,
                    blocks: [...block.blockContent.blocks, newBlockId],
                  },
                });
              } else {
                dispatch(loadCollection(params.id));
              }
            });

            e.target.value = "";
          }
        }}
      />
    </div>
  );
}
