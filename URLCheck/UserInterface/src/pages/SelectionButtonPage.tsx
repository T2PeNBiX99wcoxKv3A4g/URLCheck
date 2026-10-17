import React, {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {hideSelectionButton, showPopup} from "../api/system";
import {useTranslation} from "../i18n";
import {Native} from "../Native";
import {LogoIcon} from "../components/Icons";

const popIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.85);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

/**
 * Fills the whole (chromeless, transparent) window: an icon-only pill keeps the overlay out of the
 * way, and the app's own mark is what makes clear where a click leads.
 */
const Button = styled.button`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid rgba(99, 102, 241, 0.5);
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
    cursor: pointer;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45), 0 0 16px rgba(99, 102, 241, 0.4);
    animation: ${popIn} 0.16s cubic-bezier(0.22, 1, 0.36, 1);
    transition: filter 0.15s ease;

    &:hover {
        filter: brightness(1.15);
    }
`;

/* The first showing carries the URL in the fragment; later ones push it through an event. */
function readFragmentUrl(): string {
    const queryIndex = window.location.hash.indexOf("?");
    if (queryIndex < 0) return "";

    return new URLSearchParams(window.location.hash.slice(queryIndex + 1)).get("url") ?? "";
}

/**
 * The floating button itself, hosted in its own tiny window. The backend pushes the copied URL with a
 * `selection.show` event and reuses the window, so this page never navigates.
 */
export const SelectionButtonPage: React.FC = () => {
    const t = useTranslation();
    const [url, setUrl] = useState<string | null>(() => readFragmentUrl() || null);

    useEffect(
        () =>
            Native.on((message) => {
                const event = message as { type?: string; data?: { url?: string } };
                const copied = event.data?.url;
                if (event.type === "selection.show" && copied) setUrl(copied);
            }),
        []
    );

    /* The transparent page background is what lets the pill's rounded corners show through. */
    useEffect(() => {
        document.documentElement.classList.add("selection-transparent");
        return () => document.documentElement.classList.remove("selection-transparent");
    }, []);

    if (!url) return null;

    const open = () => {
        void showPopup(url);
        hideSelectionButton();
        setUrl(null);
    };

    /* On mouse-down, so the click still counts when the backend hides the window as it opens. */
    return (
        <Button type="button" title={t("selection.open")} onMouseDown={open}>
            <LogoIcon size={26}/>
        </Button>
    );
};
