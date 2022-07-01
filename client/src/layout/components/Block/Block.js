import React, { useState, useEffect } from "react";
import { FaRegComments } from "react-icons/fa";
import { connect } from "react-redux";
import {
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlineSave,
} from "react-icons/ai";
import {
  deleteBlock,
  updateBlock,
  loadBlocks,
  loadSubBlocks,
  loadBlock,
} from "../../../actions/blockActions";
import { useDispatch } from "react-redux";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import BlockModal from "./BlockModal";

import BlockRow from "./BlockRow";

const Block = (props) => {
  const { block, collection, user, subBlocks, blockState } = props;
  const dispatch = useDispatch();

  const [newBlock, setNewBlock] = useState(block);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setNewBlock(block);
  };

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
        ...newBlock,
        blockContent: newBlockContent,
      });
      return;
    }

    if (key.split(".")[0] === "blockContent") {
      setNewBlock({
        ...newBlock,
        blockContent: { ...newBlock.blockContent, [key.split(".")[1]]: value },
      });
      return;
    }

    setNewBlock({ ...newBlock, [key]: value });
  };

  const onUpdateBlock = () => {
    dispatch(updateBlock(newBlock, newBlock._id)).then(() =>
      dispatch(loadBlocks(collection?.blocks))
    );
    dispatch(loadBlock(newBlock));
  };

  const saveIcon = () => {
    const activeBlock =
      blockState.block === null || newBlock.parentType === "collection"
        ? block
        : blockState.block;

    const isDifferentBlockName = newBlock.blockName !== activeBlock.blockName;

    const isDifferentBlockContent =
      JSON.stringify(activeBlock.blockContent) !==
      JSON.stringify(newBlock.blockContent);

    return (
      <div className="action-item">
        {(isDifferentBlockName || isDifferentBlockContent) && (
          <AiOutlineSave onClick={() => onUpdateBlock()} />
        )}
      </div>
    );
  };

  const onIconUpdate = (emoji) => {
    dispatch(updateBlock({ ...newBlock, icon: emoji }, newBlock._id));
    setNewBlock({ ...newBlock, icon: emoji });
  };

  return (
    <div className="block-container">
      <BlockModal
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        block={block}
        newBlock={newBlock}
        collection={collection}
        saveIcon={saveIcon}
        onChange={onChange}
        setNewBlock={setNewBlock}
        subBlocks={subBlocks}
        blockState={blockState}
        user={user}
        updateLocalBlock={() => setNewBlock(block)}
      />

      <BlockRow
        openModal={openModal}
        block={block}
        newBlock={newBlock}
        collection={collection}
        onIconUpdate={onIconUpdate}
        saveIcon={saveIcon}
        onChange={onChange}
        setNewBlock={setNewBlock}
      />
    </div>
  );
};
const mapStateToProps = (state) => ({
  blockState: state.blockReducer,
});
export default connect(mapStateToProps)(Block);
