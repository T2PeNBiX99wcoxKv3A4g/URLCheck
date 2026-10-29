import React from "react";
import styled from "styled-components";
import {useTranslation, useWindowControls, useWindowDrag} from "@photino-net-utils/bridge";
import {LogoIcon} from "./Icons";

/**
 * The window's title bar. The host has no native one, so the interface draws it: the brand, the
 * strip that moves the window, and the window buttons.
 */
export const TitleBar: React.FC = () => {
    const t = useTranslation();
    const controls = useWindowControls();
    const drag = useWindowDrag();

    return (
        <Bar>
            <Brand {...drag}>
                <Mark>
                    <LogoIcon size={17}/>
                </Mark>
                <Name>URLCheck</Name>
                <Tagline>{t("app.tagline")}</Tagline>
            </Brand>

            <DragArea {...drag}/>

            <Controls>
                <ControlButton onClick={controls.minimize} title={t("window.minimize")} type="button">
                    <svg aria-hidden="true" viewBox="0 0 10 10">
                        <path d="M2 5h6"/>
                    </svg>
                </ControlButton>

                <ControlButton
                    onClick={controls.toggleMaximize}
                    title={t(controls.maximized ? "window.restore" : "window.maximize")}
                    type="button"
                >
                    {controls.maximized
                        ? <svg aria-hidden="true" viewBox="0 0 10 10">
                            <rect height="6" width="6" x="3" y="1"/>
                            <rect height="6" width="6" x="1" y="3"/>
                        </svg>
                        : <svg aria-hidden="true" viewBox="0 0 10 10">
                            <rect height="6" width="6" x="2" y="2"/>
                        </svg>}
                </ControlButton>

                <CloseButton onClick={controls.close} title={t("window.close")} type="button">
                    <svg aria-hidden="true" viewBox="0 0 10 10">
                        <path d="m2 2 6 6M8 2 2 8"/>
                    </svg>
                </CloseButton>
            </Controls>
        </Bar>
    );
};

const Bar = styled.header`
    display: flex;
    align-items: stretch;
    height: 40px;
    flex-shrink: 0;
    background: rgba(17, 24, 39, 0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    user-select: none;
    -webkit-user-select: none;
`;

const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 0 14px 0 12px;
    flex-shrink: 0;
`;

const Mark = styled.span`
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    border-radius: 7px;
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
    color: #ffffff;
    box-shadow: 0 0 12px rgba(99, 102, 241, 0.35);
`;

const Name = styled.strong`
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #f9fafb;
`;

const Tagline = styled.span`
    font-size: 0.7rem;
    color: #6b7280;

    /* The first thing to go when the window gets narrow. */
    @media (max-width: 640px) {
        display: none;
    }
`;

const DragArea = styled.div`
    flex: 1;
    min-width: 24px;
`;

const Controls = styled.div`
    display: flex;
    flex-shrink: 0;
`;

const ControlButton = styled.button`
    display: grid;
    place-items: center;
    width: 46px;
    height: 100%;
    border: 0;
    background: transparent;
    color: #9ca3af;
    cursor: pointer;
    transition: background 120ms ease, color 120ms ease;

    svg {
        width: 10px;
        height: 10px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.2;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.08);
        color: #f9fafb;
    }

    &:focus-visible {
        outline: 2px solid rgba(59, 130, 246, 0.6);
        outline-offset: -2px;
    }
`;

const CloseButton = styled(ControlButton)`
    &:hover {
        background: #e81123;
        color: #ffffff;
    }
`;
