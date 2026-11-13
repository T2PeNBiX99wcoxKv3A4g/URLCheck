import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {ATTRIBUTIONS} from "../data/attributions";
import {useTranslation} from "../api/i18n";

/**
 * The open-source notices, shown as a floating panel from the settings: the projects are listed on
 * the left and the selected licence fills the right, because the texts are long.
 */
const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    z-index: 70;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(2, 6, 23, 0.65);
    backdrop-filter: blur(3px);
    animation: attributionFade 0.16s ease;

    @keyframes attributionFade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const Panel = styled.div`
    display: flex;
    flex-direction: column;
    width: min(920px, 100%);
    max-height: min(680px, 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    background: #0f172a;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55);
    overflow: hidden;
    animation: attributionIn 0.18s ease;

    @keyframes attributionIn {
        from {
            opacity: 0;
            transform: translateY(8px);
        }
        to {
            opacity: 1;
            transform: none;
        }
    }
`;

const Header = styled.header`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    flex-shrink: 0;
    padding: 18px 22px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const Title = styled.h2`
    margin: 0;
    font-size: 1.05rem;
    font-weight: 700;
    color: #f9fafb;
`;

const Intro = styled.p`
    margin: 6px 0 0;
    max-width: 620px;
    font-size: 0.8rem;
    line-height: 1.5;
    color: #9ca3af;
`;

const CloseButton = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    color: #d1d5db;
    font-size: 0.85rem;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

    &:hover {
        background: rgba(239, 68, 68, 0.15);
        border-color: rgba(239, 68, 68, 0.35);
        color: #f87171;
    }
`;

const Body = styled.div`
    display: flex;
    flex: 1;
    min-height: 0;

    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

const Sidebar = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 260px;
    flex-shrink: 0;
    padding: 10px;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    overflow-y: auto;

    @media (max-width: 700px) {
        width: 100%;
        max-height: 150px;
        border-right: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
`;

const Item = styled.button<{ $active: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
    padding: 8px 10px;
    border: none;
    border-radius: 8px;
    background: ${(props) => (props.$active ? "rgba(59, 130, 246, 0.16)" : "transparent")};
    color: ${(props) => (props.$active ? "#f9fafb" : "#cbd5e1")};
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;

    &:hover {
        background: ${(props) => (props.$active ? "rgba(59, 130, 246, 0.2)" : "rgba(255, 255, 255, 0.05)")};
        color: #f9fafb;
    }
`;

const ItemName = styled.span`
    font-size: 0.85rem;
    font-weight: 600;
    word-break: break-word;
`;

const Meta = styled.span`
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: #6b7280;
`;

const Article = styled.article`
    flex: 1;
    min-width: 0;
    padding: 18px 22px 22px;
    overflow-y: auto;
`;

const ArticleHead = styled.div`
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 4px 10px;
    margin-bottom: 12px;
`;

const ArticleName = styled.h3`
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #f9fafb;
`;

const Licence = styled.pre`
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    line-height: 1.6;
    color: #9ca3af;
    white-space: pre-wrap;
    word-break: break-word;
`;

const meta = (entry: { version: string; license: string }) =>
    [entry.version, entry.license].filter(Boolean).join(" · ");

export const AttributionPage: React.FC<{ onClose: () => void }> = ({onClose}) => {
    const t = useTranslation();
    const [selected, setSelected] = useState(0);
    const entry = ATTRIBUTIONS[selected] ?? ATTRIBUTIONS[0];

    // Escape closes the panel, like the other overlays.
    useEffect(() => {
        const close = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        window.addEventListener("keydown", close);
        return () => window.removeEventListener("keydown", close);
    }, [onClose]);

    return (
        <Backdrop onClick={onClose}>
            <Panel onClick={(event) => event.stopPropagation()}>
                <Header>
                    <div>
                        <Title>{t("attribution.title")}</Title>
                        <Intro>{t("attribution.description", {count: ATTRIBUTIONS.length})}</Intro>
                    </div>
                    <CloseButton type="button" onClick={onClose} title={t("attribution.close")}>
                        ✕
                    </CloseButton>
                </Header>

                <Body>
                    <Sidebar>
                        {ATTRIBUTIONS.map((item, position) => (
                            <Item
                                $active={position === selected}
                                key={`${item.name}@${item.version}`}
                                onClick={() => setSelected(position)}
                                type="button"
                            >
                                <ItemName>{item.name}</ItemName>
                                <Meta>{meta(item)}</Meta>
                            </Item>
                        ))}
                    </Sidebar>

                    <Article>
                        <ArticleHead>
                            <ArticleName>{entry.name}</ArticleName>
                            <Meta>{meta(entry)}</Meta>
                        </ArticleHead>
                        <Licence>{entry.text}</Licence>
                    </Article>
                </Body>
            </Panel>
        </Backdrop>
    );
};
