import React, { useState } from "react";

const Dropdown = (props) => {
  const { options, value, onChange, placeholder, itemActions } = props;

  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  const [defaultValue, setDefaultValue] = useState(value ? value.label : placeholder);

  return (
    <div className="main">
      <div className="dropdown-container">
        {itemActions ? itemActions?.addItem() : null}
        <div className="dropdown-header" onClick={toggling}>
          {defaultValue}
        </div>
        {isOpen && (
          <div className="dropdown-list-container">
            <ul className="dropdown-list" onClick={toggling}>
              {options.map((option) => (
                <div className="dropdown-list-item-container">
                  <li
                    className="dropdown-list-item"
                    onClick={(e) => {
                      onChange(e);
                      setDefaultValue(option.label);
                    }}
                    id={option.value}
                  >
                    {option.label}
                  </li>
                  {itemActions ? (
                    <span className="item-actions">
                      {itemActions?.deleteItem(option.value)}
                      {itemActions?.updateItem()}
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

export default Dropdown;
