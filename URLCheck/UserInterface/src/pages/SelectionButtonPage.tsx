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
 * Centres the button in the window. A pixel of slack is left around it so the window's round region
 * — which is clipped without antialiasing — trims that empty ring rather than the button's own
 * smooth edge.
 */
const Root = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: transparent;
`;

/**
 * The button itself: an icon-only circle carrying the app's own mark, so what a click leads to is
 * obvious without a label.
 */
const Button = styled.button`
    display: flex;
    box-sizing: border-box;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
    cursor: pointer;
    /* Inset, because anything drawn outside the circle is clipped away by the window's region. */
    box-shadow: inset 0 -2px 6px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.3);
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
        <Root>
            <Button type="button" title={t("selection.open")} onMouseDown={open}>
                <LogoIcon size={26}/>
            </Button>
        </Root>
    );
};
