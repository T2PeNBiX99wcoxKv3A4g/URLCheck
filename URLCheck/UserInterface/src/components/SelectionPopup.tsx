import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {showPopup} from "../api/system";
import {useTranslation} from "../i18n";
import {LinkIcon} from "./Icons";

/** Longer than any sane URL; a selection this big is never one. */
const MAX_URL_LENGTH = 2048;

/**
 * The first whitespace-delimited token of a selection, when it really is an http(s) URL. Anything
 * else — a sentence, a word, a fragment — is rejected, so the button only appears for links.
 */
function urlFromSelection(selection: string): string | null {
    const token = selection.trim().split(/\s+/)[0];
    if (!token || token.length > MAX_URL_LENGTH) return null;

    try {
        const url = new URL(token);
        return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
    } catch {
        return null;
    }
}

const Button = styled.button`
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 90;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border: 1px solid rgba(99, 102, 241, 0.45);
    border-radius: 999px;
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
    color: #ffffff;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45), 0 0 20px rgba(99, 102, 241, 0.35);
    transition: box-shadow 0.2s ease, transform 0.15s ease;
    animation: selectionIn 0.18s cubic-bezier(0.22, 1, 0.36, 1);

    @keyframes selectionIn {
        from {
            opacity: 0;
            transform: translateY(8px) scale(0.96);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    &:hover {
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.5), 0 0 28px rgba(99, 102, 241, 0.5);
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
`;

/**
 * A floating button that appears whenever the user selects a URL anywhere in the app, so the
 * inspection popup can be opened straight from the selected text. Mounted once, outside the pages.
 */
export const SelectionPopup: React.FC = () => {
    const t = useTranslation();
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        const update = () => setUrl(urlFromSelection(window.getSelection()?.toString() ?? ""));

        // `selectionchange` fires while the selection is still being dragged; the pointer and key
        // events catch the moment it settles.
        document.addEventListener("selectionchange", update);
        document.addEventListener("mouseup", update);
        document.addEventListener("keyup", update);

        return () => {
            document.removeEventListener("selectionchange", update);
            document.removeEventListener("mouseup", update);
            document.removeEventListener("keyup", update);
        };
    }, []);

    if (!url) return null;

    return (
        <Button
            type="button"
            title={t("selection.open")}
            /* Keep the selection alive so the click is not swallowed by the browser clearing it. */
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
                void showPopup(url);
                setUrl(null);
            }}
        >
            <LinkIcon size={16}/>
            <span>{t("selection.open")}</span>
        </Button>
    );
};
