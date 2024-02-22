import React, { useState } from "react";

interface CardModalProps {
  setIndexItemSelected: React.Dispatch<React.SetStateAction<number | null>>;
  index: number;
  IndexItemSelected: number | null;
}

function cardModalRadio({
  setIndexItemSelected,
  index,
  IndexItemSelected,
}: CardModalProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPrice = parseInt(e.target.value);
    setIndexItemSelected(selectedPrice);
  };

  return (
    <div>
      <label className="flex items-center space-x-2">
        <input
          id="default-radio-1"
          type="radio"
          value={index}
          name="default-radio"
          className="w-6 h-6 appearance-none border-4 rounded-full border-defaultBrow cursor-pointer checked:bg-defaultBrow dark:hover:bg-defaultBrow checked:border-transparent"
          onChange={handleChange}
          checked={IndexItemSelected == index}
        />
      </label>
    </div>
  );
}

export default cardModalRadio;
