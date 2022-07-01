import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { DefaultEditor } from "react-simple-wysiwyg";
import AddBlockInput from "./AddBlockInput";
import { loadCollection } from "../../../actions/collectionActions";
import BlockComments from "./BlockComments";
import { AiOutlineCloseCircle, AiOutlineDelete } from "react-icons/ai";
import {
  deleteBlock,
  loadSubBlocks,
  loadBlock,
} from "../../../actions/blockActions";
import { useDispatch } from "react-redux";
import BlockActions from "./BlockActions";

const BlockModal = ({
  isOpen,
  closeModal,
  block,
  collection,
  saveIcon,
  newBlock,
  onChange,
  setNewBlock,
  user,
  subBlocks,
  openModal,
  blockState,
  updateLocalBlock,
}) => {
  const dispatch = useDispatch();

  const [newSub, setNewSub] = useState(null);
  return (
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
            onUpdateBlock={(block) => setNewBlock(block)}
          />
        </div>

        <AiOutlineCloseCircle onClick={closeModal} />
      </div>
      <div className="modal-container">
        <div className="modal-side">
          <input
            style={{ color: "black" }}
            className="block-title-input"
            onInput={(e) => onChange(e.target.value, "blockName")}
            value={newBlock.blockName}
          />

          <DefaultEditor
            value={newBlock.blockContent.description}
            onChange={(e) =>
              onChange(e.target.value, "blockContent.description")
            }
          />

          <BlockComments
            block={newBlock}
            user={user}
            collection={collection}
            onUpdateBlock={(block) => setNewBlock(block)}
          />
        </div>

        <div className="modal-blocks">
          <h2>Blocks</h2>
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
                  <div
                    className="block-name"
                    onClick={() => {
                      openModal();
                      dispatch(loadBlock(sub_block));
                      setNewBlock(sub_block);
                    }}
                  >
                    {sub_block?.blockName}
                  </div>

                  <div className="block-actions">
                    <BlockActions
                      newBlock={sub_block}
                      collection={collection}
                      onChange={onChange}
                      saveIcon={saveIcon}
                      // showStatusIcon
                      // showPriorityIcon
                      hideStatusIcon
                      block={sub_block}
                      onUpdateBlock={() => {
                        dispatch(loadSubBlocks(newBlock.blockContent.blocks));
                      }}

                      styles={{
                        pointerEvents: 'none',
                        opacity: '0.7',
                      }}
                    />
                  </div>
                </div>
              ))
            : ""}

          <AddBlockInput
            parentId={newBlock._id}
            userId={user._id}
            fullWidth
            isBlockParent={true}
            // block={newBlock}
            block={blockState?.block}
            updateLocalBlock={updateLocalBlock}
          />
        </div>
      </div>
    </Modal>
  );
};

export default BlockModal;
