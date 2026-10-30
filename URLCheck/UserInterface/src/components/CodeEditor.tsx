import React, {useMemo, useRef} from "react";
import styled, {css} from "styled-components";
import Prism from "prismjs";
import "prismjs/components/prism-lua";

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const Frame = styled.div`
    position: relative;
    flex: 1;
    min-height: 0;
    overflow: hidden;
`;

/** The two layers must agree on every metric, or the caret drifts away from the text. */
const layer = css`
    position: absolute;
    inset: 0;
    margin: 0;
    padding: 16px;
    border: 0;
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.55;
    letter-spacing: normal;
    tab-size: 4;
    white-space: pre;
    word-break: normal;
    overflow-wrap: normal;
`;

const Highlight = styled.pre`
    ${layer};
    overflow: hidden;
    pointer-events: none;
    color: #e2e8f0;

    .token.comment {
        color: #6b7280;
        font-style: italic;
    }

    .token.keyword {
        color: #c792ea;
    }

    .token.string {
        color: #a5d6a7;
    }

    .token.number {
        color: #f9a825;
    }

    .token.boolean {
        color: #f9a825;
    }

    .token.function {
        color: #82aaff;
    }

    .token.operator {
        color: #89ddff;
    }

    .token.punctuation {
        color: #9ca3af;
    }

    .token.property {
        color: #93c5fd;
    }
`;

const Input = styled.textarea`
    ${layer};
    resize: none;
    overflow: auto;
    background: transparent;
    color: transparent;
    caret-color: #93c5fd;
    outline: none;

    &::selection {
        background: rgba(96, 165, 250, 0.3);
    }
`;

/**
 * A small Lua editor: a transparent textarea over a Prism-highlighted copy of the same text.
 * `react-simple-code-editor` did this too, but it is CommonJS and the bundler hands back the module
 * object instead of the component, which made the whole window blank the first time it rendered.
 */
export const CodeEditor: React.FC<CodeEditorProps> = ({value, onChange}) => {
    const highlightRef = useRef<HTMLPreElement | null>(null);

    const html = useMemo(
        () => `${Prism.highlight(value, Prism.languages.lua, "lua")}\n`,
        [value]
    );

    /* The textarea owns the scrollbars; the highlighted copy follows it. */
    const syncScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
        const layer = highlightRef.current;
        if (!layer) return;

        layer.scrollTop = event.currentTarget.scrollTop;
        layer.scrollLeft = event.currentTarget.scrollLeft;
    };

    const insertTab = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key !== "Tab") return;

        event.preventDefault();

        const input = event.currentTarget;
        const start = input.selectionStart;
        const end = input.selectionEnd;

        onChange(`${value.slice(0, start)}    ${value.slice(end)}`);
        requestAnimationFrame(() => input.setSelectionRange(start + 4, start + 4));
    };

    return (
        <Frame>
            <Highlight aria-hidden dangerouslySetInnerHTML={{__html: html}} ref={highlightRef}/>
            <Input
                autoComplete="off"
                autoCorrect="off"
                onChange={(event) => onChange(event.target.value)}
                onKeyDown={insertTab}
                onScroll={syncScroll}
                spellCheck={false}
                value={value}
                wrap="off"
            />
        </Frame>
    );
};
