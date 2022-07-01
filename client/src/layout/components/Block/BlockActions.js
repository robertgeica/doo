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
  styles
}) {
  return (
    <div className="block-actions" style={{...styles}}>
      <div className="block-item">
        <Status
          block={newBlock}
          collection={collection}
          onChange={onChange}
          saveIcon={saveIcon}
          showIcon={showStatusIcon || true}
          hideStatusIcon={hideStatusIcon}
          onUpdateBlock={onUpdateBlock}
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
          onUpdateBlock={onUpdateBlock}
        />
      </div>
    </div>
  );
}
