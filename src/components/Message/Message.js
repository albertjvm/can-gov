import React from "react";
import './Message.scss';

export const Message = ({ sender, time, content }) => {
    return (
        <div className="Message">
            <span className="Message--sender">{sender}</span>
            &nbsp;&nbsp;
            <span className="Message--timestamp">{time}</span>
            <div className="Message--content">{content}</div>
        </div>
    );
}