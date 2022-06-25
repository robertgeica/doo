import React, { useState, useEffect } from "react";
import { FaRegComments } from "react-icons/fa";
import { connect } from "react-redux";
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
  loadBlock,
} from "../../../actions/blockActions";
import { useDispatch } from "react-redux";
import { DefaultEditor } from "react-simple-wysiwyg";
import Status from "./Status";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AddBlockInput from "./AddBlockInput";
import { loadCollection } from "../../../actions/collectionActions";
import BlockActions from "./BlockActions";
import BlockComments from "./BlockComments";
import Emoji from "../Emoji";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const Block = (props) => {
  const { block, collection, user, subBlocks, blockState } = props;
  const dispatch = useDispatch();
  
  const [newBlock, setNewBlock] = useState(block);
  console.log('block ', block, 'new block', newBlock, 'block state', blockState?.block);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setNewBlock(block);
  };


  const onChange = (value, key) => {
    if (key.split(".")[1] === "isRecurrent") {
      console.log('isRecurrent')
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

  const isDifferentBlockName = newBlock.blockName !== blockState?.block?.blockName;
  
  const isDifferentBlockContent =
    JSON.stringify(blockState?.block?.blockContent) !==
    JSON.stringify(newBlock.blockContent);

  const onUpdateBlock = () => {
    dispatch(updateBlock(newBlock, newBlock._id)).then(() =>
      dispatch(loadBlocks(collection?.blocks))
    );
    dispatch(loadBlock(newBlock));

  };

  const saveIcon = () => (
    <div className="action-item">
      {(isDifferentBlockName || isDifferentBlockContent) && (
        <AiOutlineSave onClick={() => onUpdateBlock()} />
      )}
    </div>
  );

  const onIconUpdate = (emoji) => {
    dispatch(updateBlock({ ...newBlock, icon: emoji }, newBlock._id));
    setNewBlock({...newBlock, icon: emoji});
  };

  const updateLocalBlock = (block) => {
    setNewBlock(block);
  }



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
                        onUpdateBlock={onUpdateBlock}
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
    </div>
  );
};
const mapStateToProps = (state) => ({
  blockState: state.blockReducer,
});
export default connect(mapStateToProps)(Block);
