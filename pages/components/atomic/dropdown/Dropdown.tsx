import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export interface DropdownProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children?: React.ReactNode;
  menu?: Array<React.ReactNode>;
}

export default function Dropdown({ children, menu }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [enter, setEnter] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const menuItemHolder = (index, item) => {
    return (
      <div
        key={index}
        className={clsx({
          'bg-white': index !== enter,
          'bg-gray-100': index === enter,
        })}
        onMouseEnter={() => setEnter(index)}
        onMouseLeave={() => setEnter(null)}
      >
        {item}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div
        className="relative inline-block text-left"
        onClick={() => setOpen(!open)}
        ref={wrapperRef}
      >
        <div style={{ cursor: 'pointer' }}>{children}</div>
        {open && (
          <div
            className="origin-top-right transition ease-out duration-100 transform opacity-100 scale-100 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="py-1" role="none">
              {menu.map((menuItem, index) => menuItemHolder(index, menuItem))}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
