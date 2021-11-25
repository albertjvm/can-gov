import React from "react";
import './Message.scss';

export const Message = ({ sender, time, content, className }) => {
    return (
        <div className={["Message", className].join(' ')}>
            <span className="Message--sender">{sender}</span>
            &nbsp;&nbsp;
            <span className="Message--timestamp">{time}</span>
            <div className="Message--content">{content}</div>
        </div>
    );
}