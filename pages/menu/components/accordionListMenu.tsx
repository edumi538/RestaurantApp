import React, { useState, ReactNode } from "react";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

function AccordionListMenu({
  title,
  children,
}: AccordionProps) {
  const [isExpanded, setExpanded] = useState(true);

  const toggleAccordion = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div id="accordion-collapse">
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          className="flex shadow-sm items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 cursor-default  border-gray-200 gap-3"
          aria-expanded={isExpanded}
          onClick={toggleAccordion}
        >
          <span className="text-lg">{title}</span>
          <svg
            className={`w-3 h-3 shrink-0 ${
              isExpanded ? "transform rotate-180" : "rotate-360"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className={`transition-all duration-300 ${
          isExpanded ? "block" : "hidden"
        }`}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div
          className="accordion-list-children"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default AccordionListMenu;
