import React from "react";
import Status from "./Status";
import Priority from "./Priority";
import Estimation from "./Estimation";
import DateTimePicker from "./DateTimePicker";
import Recurrent from "./Recurrent";

export default function BlockActions({
  newBlock,
  collection,
  onChange,
  saveIcon,
  showStatusIcon,
  showPriorityIcon,
  hideStatusIcon,
  block,
  onUpdateBlock,
}) {
  return (
    <div className="block-actions">
      <div className="block-item">
        <Status
          block={newBlock}
          collection={collection}
          onChange={onChange}
          saveIcon={saveIcon}
          showIcon={showStatusIcon}
          hideStatusIcon
        />
      </div>
      <div className="block-item">
        <Priority
          block={newBlock}
          onChange={onChange}
          saveIcon={saveIcon}
          showIcon={showPriorityIcon}
        />
      </div>
      <div className="block-item">
        <Estimation block={newBlock} onChange={onChange} saveIcon={saveIcon} />
      </div>
      <div className="block-item">
        <DateTimePicker block={block} onChange={onChange} />
      </div>

      <div className="block-item">
        <Recurrent
          block={newBlock}
          onChange={onChange}
          onUpdateBlock={onUpdateBlock}
        />
      </div>
    </div>
  );
}
