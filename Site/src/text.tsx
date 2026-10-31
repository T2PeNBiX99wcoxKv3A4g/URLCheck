import React from "react";

/**
 * Puts `node` where `placeholder` appears in `text`. Used for the few strings that carry a link or a
 * code element, so translators only see plain text.
 */
export function fill(text: string, placeholder: string, node: React.ReactNode): React.ReactNode {
    const [before, ...rest] = text.split(placeholder);
    if (rest.length === 0) return text;

    return (
        <>
            {before}
            {node}
            {rest.join(placeholder)}
        </>
    );
}
