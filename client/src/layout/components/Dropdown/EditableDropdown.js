import React, { useState } from "react";

const EditableDropdown = (props) => {
  const { options, value, onChange, placeholder, itemActions } = props;

  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  const [defaultValue, setDefaultValue] = useState(
    value ? value.label : placeholder
  );

  const [content, setContent] = useState(defaultValue);
  const onChangeContent = (e) => {
    setContent(e.target.textContent);
  };

  return (
    <div className="main">
      <div className="dropdown-container">
        <div className="dropdown-input">
          <div
            className="dropdown-header"
            onClick={toggling}
            contentEditable="true"
            suppressContentEditableWarning={true}
            onInput={(e) => onChangeContent(e)}
          >
            {defaultValue}
          </div>

          <div className="actions">
            {itemActions && defaultValue !== content ? (
              <>
                {itemActions?.updateItem(content, value.value || value[0].value)}
                {itemActions?.addItem(content)}
              </>
            ) : null}
          </div>
        </div>

        {isOpen && (
          <div className="dropdown-list-container">
            <ul className="dropdown-list" onClick={toggling}>
              {options.map((option) => (
                <div
                  className="dropdown-list-item-container"
                  key={option.value}
                  onClick={(e) => {
                    onChange(e);
                    itemActions?.selectItem(option.value)
                    setDefaultValue(option.label);
                    setContent(option.label);
                  }}
                >
                  <li className="dropdown-list-item" id={option.value}>
                    {option.label}
                  </li>
                  {itemActions ? (
                    <span className="item-actions">
                      {itemActions?.deleteItem(option.value)}
                      {/* { */}
                    </span>
                  ) : null}
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableDropdown;
