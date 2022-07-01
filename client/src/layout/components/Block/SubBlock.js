import React, { useState, useEffect } from "react";
import { FaRegComments } from "react-icons/fa";
import { TbRadiusBottomLeft, TbRotateClockwise2 } from "react-icons/tb";
import { BsCalendar2Date } from "react-icons/bs";
import {
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlineSave,
} from "react-icons/ai";
import Modal from "react-modal";
import {
  deleteBlock,
  updateBlock,
  loadSubBlocks,
  loadBlock,
  loadBlocks,
} from "../../../actions/blockActions";
import { useDispatch, connect } from "react-redux";
import { DefaultEditor } from "react-simple-wysiwyg";

import BlockComments from "./BlockComments";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { MdDeleteOutline, MdEdit, MdAddCircleOutline } from "react-icons/md";
import AddBlockInput from "./AddBlockInput";
import BlockActions from "./BlockActions";
import Block from "./Block";

const SubBlock = (props) => {
  const { parentId, user, collection, subBlocks, sub_block, triggerUpdate } = props;
  // const sub_block = props.block;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [newBlock, setNewBlock] = useState(sub_block);

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
        ...sub_block,
        blockContent: newBlockContent,
      });
      return;
    }

    if (key.split(".")[0] === "blockContent") {
      setNewBlock({
        ...sub_block,
        blockContent: { ...sub_block.blockContent, [key.split(".")[1]]: value },
      });
      return;
    }

    setNewBlock({ ...sub_block, [key]: value });
  };

  const isDifferentBlockName = sub_block.blockName !== newBlock.blockName;
  const isDifferentBlockContent =
    JSON.stringify(sub_block.blockContent) !==
    JSON.stringify(newBlock.blockContent);

  const onUpdateBlock = () => {
    dispatch(updateBlock(newBlock, newBlock._id));
    setNewBlock(sub_block);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const saveIcon = () => (
    <div className="action-item">
      {(isDifferentBlockName || isDifferentBlockContent) && (
        <AiOutlineSave onClick={() => onUpdateBlock()} />
      )}
    </div>
  );



  return (
    <div className="sub-block-container">
      <div key={sub_block?._id}>
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
                  onClick={() => dispatch(deleteBlock(sub_block?._id, "block"))}
                />
              </div>
              <div className="action-item">{saveIcon()}</div>
              <BlockActions
                newBlock={newBlock}
                collection={collection}
                onChange={onChange}
                saveIcon={saveIcon}
                showStatusIcon
                showPriorityIcon
                hideStatusIcon={false}
                block={sub_block}
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
                {sub_block?.blockName}
              </h1>

              <DefaultEditor
                value={newBlock?.blockContent?.description}
                onChange={(e) =>
                  onChange(e.target.value, "blockContent.description")
                }
              />

              <BlockComments
                block={newBlock}
                user={user}
                collection={collection}
              />
            </div>

            <div className="modal-blocks">
              <h2>Blocks</h2>
              {typeof subBlocks !== "undefined" &&
              subBlocks?.length !== 0 &&
              subBlocks !== null
                ? subBlocks.map((sub_blockk) => (
                    // <SubBlock
                    //   parentId={sub_blockk._id}
                    //   sub_block={sub_blockk}
                    //   user={user}
                    //   collection={collection}
                    // />
                    <></>

                    // <Block
                    //   collection={collection}
                    //   block={sub_block}
                    //   user={user}
                    //   subBlocks={subBlocks}
                    //   key={sub_block._id}
                    // />
                  ))
                : ""}

              <AddBlockInput
                parentId={sub_block._id}
                userId={user._id}
                fullWidth
                isBlockParent={true}
                block={sub_block}
              />
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
          <div
            className="block-name"
            onClick={() => {
              openModal();
              // dispatch(loadSubBlocks(sub_block.blockContent.blocks));
              // triggerUpdate(sub_block)
              dispatch(loadBlock(sub_block));
            }}
          >
            {newBlock?.blockName}
          </div>

          <div className="block-actions">
            <BlockActions
              newBlock={newBlock}
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
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  block: state.blockReducer.block,
});

export default connect(mapStateToProps)(SubBlock);
