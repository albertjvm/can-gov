import React, { useState } from "react";
import './Avatar.scss';

export const Avatar = ({ url, alt }) => {
    const [ isError, setIsError ] = useState(false);

    return (
        (!url || isError)
            ? 
                <div className="Avatar Avatar-error" />
            : 
                <img 
                    className="Avatar" 
                    src={url} 
                    alt={alt} 
                    onError={() => setIsError(true)} 
                />
    );
};