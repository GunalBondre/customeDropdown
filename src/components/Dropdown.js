import React, { useState, useRef, useEffect } from "react";
import "./dropdown.scss";
const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const options = ["options1", "options2", "options3", "options4"];
  const [state, setState] = useState({
    cursor: 0,
  });

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const menuRef = useRef();
  const handleClick = (e) => {
    e.preventDefault();
    setOpen(!open);
  };
  const handleKeyDown = (e) => {
    e.preventDefault();
    if (e.keyCode === 38 && state.cursor > 0) {
      setState({ ...state, cursor: state.cursor - 1 });
    } else if (e.keyCode === 40 && state.cursor < options.length - 1) {
      setState({ ...state, cursor: state.cursor + 1 });
    } else if (e.keyCode === 13) {
      const optionValue = options[state.cursor];
      setSelected(optionValue);
      setOpen(false);
    }
  };
  return (
    <div>
      <div className="dropdown">
        <div className="dropdown-wrapper" ref={menuRef}>
          <div className="dropdown-container">
            <div
              className="dropdown-header"
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              tabIndex="0"
            >
              <div className="dropdown-title">
                {selected ? selected : "default dropdown"}
              </div>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
          {open && (
            <ul className="list">
              {options.map((option, i) => (
                <li
                  onClick={() => {
                    setSelected(option);
                    setOpen(false);
                  }}
                  className={state.cursor === i ? "activeList" : "list-item"}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
