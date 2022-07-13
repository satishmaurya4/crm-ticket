import React from "react";

function Toast({ info }) {
  const { status, title, message } = info;
  // const style = {
  //   background
  // }
  return (
    <div
      style={{
        width: "max-content",
        padding: "5px",
        backgroundColor: "tomato",
        borderRadius: "10px",
        position: "fixed",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        borderBottom: '4px solid red',
        zIndex: 999,
      }}
    >
      <h4 style={{ margin: 0, color: 'red', textTransform: 'uppercase' }}>{title}</h4>
      <hr style={{margin: 0,}}/>
      <p style={{margin: 0, color: '#fff'}}>{message}</p>
    </div>
  );
}

export default Toast;
