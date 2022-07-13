import React from "react";
import "../../styles/Card.css"

const Card = ({ className,CommonStyles,admin,children }) => {
  return <div className={`card ${className} ${admin && 'cardHover'}`} style={CommonStyles}>{children}</div>;
};

export default Card;