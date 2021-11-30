import React from "react";
import './Message.scss';
import { Avatar } from "../Avatar";

export const Message = ({ avatarUrl = null, sender, time, content, className }) => {
    return (
        <div className={["Message", className].join(' ')}>
            <div className="Message--left">
                <Avatar 
                    url={avatarUrl}
                    alt="avatar"
                />
            </div>
            <div className="Message--right">
                <span className="Message--sender">{sender}</span>
                &nbsp;&nbsp;
                <span className="Message--timestamp">{time}</span>
                <div className="Message--content">{content}</div>
            </div>
        </div>
    );
}