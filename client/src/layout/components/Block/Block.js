import React, { useState, useEffect } from "react";
import { FaRegComments } from "react-icons/fa";
import {
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
import { useDispatch } from "react-redux";
import { DefaultEditor } from "react-simple-wysiwyg";
import Status from "./Status";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import SubBlock from "./SubBlock";
import AddBlockInput from "./AddBlockInput";
import { loadCollection } from "../../../actions/collectionActions";
import BlockActions from "./BlockActions";
import BlockComments from "./BlockComments";
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

  useEffect(() => {
    setNewBlock(block);
  }, [block]);

  const isDifferentBlockName = block.blockName !== newBlock.blockName;
  const isDifferentBlockContent =
    JSON.stringify(block.blockContent) !==
    JSON.stringify(newBlock.blockContent);

  const onUpdateBlock = () => {
    dispatch(updateBlock(newBlock, newBlock._id)).then(() =>
      dispatch(loadBlocks(collection?.blocks))
    );
    setNewBlock(block);
  };

  const saveIcon = () => (
    <div className="action-item">
      {(isDifferentBlockName || isDifferentBlockContent) && (
        <AiOutlineSave onClick={() => onUpdateBlock()} />
      )}
    </div>
  );

  useEffect(() => {
    if (isOpen && block.blockContent.blocks.length !== 0) {
      dispatch(loadSubBlocks(block.blockContent.blocks));
    }
  }, [isOpen]);

  return (
    <div className="block-container">
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
                onClick={() =>
                  dispatch(deleteBlock(block._id)).then(() =>
                    dispatch(loadCollection(collection._id))
                  )
                }
              />
            </div>
            <div className="action-item">{saveIcon()}</div>
            <BlockActions
              newBlock={newBlock}
              collection={collection}
              onChange={onChange}
              saveIcon={saveIcon}
              showIcon
              block={block}
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

            <BlockComments block={newBlock} user={user} />
          </div>

          <div className="modal-blocks">
            <h2>subtasks</h2>
            {typeof subBlocks !== "undefined" &&
            subBlocks?.length !== 0 &&
            subBlocks !== null
              ? subBlocks.map((sub_block) => (
                  <SubBlock
                    parentId={block._id}
                    sub_block={sub_block}
                    user={user}
                    collection={collection}
                  />
                ))
              : ""}

            <AddBlockInput
              parentId={block._id}
              userId={user._id}
              fullWidth
              isBlockParent
            />
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
          <BlockActions
            newBlock={newBlock}
            collection={collection}
            onChange={onChange}
            saveIcon={saveIcon}
            hideStatusIcon={false}
            block={block}
            onUpdateBlock={onUpdateBlock}
          />

          <div className="block-item">
            {block.comments.length} <FaRegComments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Block;
