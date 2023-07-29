import React, { useState } from "react";

interface CheckboxProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLLabelElement>) => void;
  checked?: boolean;
}

const Checkbox = ({ value, onChange, checked, onClick }: CheckboxProps) => {
  return (
    <div
      style={{
        width: "75%",
        display: "flex",
        alignItems: "center",
        border: "1px solid #ccc",
        padding: "2vh",
        borderRadius: "15px",
        backgroundColor: "#f9f9f9",
        color: "#000000",
        textAlign: "justify",
        fontWeight: "500",
        fontSize: "1.2em",
        boxShadow: "rgba(13, 26, 38, 0.25) 0px 4px 4px 0px",
        minWidth: "600px",
      }}
    >
      <input
        name="vote"
        type="checkbox"
        id="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ width: "20px", height: "20px", marginRight: "10px" }}
        value={value}
      />
      <label
        onClick={onClick}
        style={{ paddingLeft: "3vh", cursor: "pointer" }}
      >
        {value}
      </label>
    </div>
  );
};

export default Checkbox;
