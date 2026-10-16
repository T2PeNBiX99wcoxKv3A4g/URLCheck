import React, {useState} from "react";
import styled from "styled-components";
import {ATTRIBUTIONS} from "../data/attributions";
import {useTranslation} from "../i18n";

/**
 * The open-source notices, shown as a full-page overlay from the settings. Each project is its own
 * collapsible entry because the licence texts are long.
 */
const Page = styled.div`
    position: fixed;
    inset: 0;
    z-index: 70;
    display: flex;
    flex-direction: column;
    background: #0b0f19;
    animation: attributionIn 0.22s ease;

    @keyframes attributionIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-shrink: 0;
    padding: 20px 32px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(17, 24, 39, 0.75);
    backdrop-filter: blur(16px);
`;

const Title = styled.h2`
    font-size: 1.15rem;
    font-weight: 700;
    color: #f9fafb;
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

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 24px 32px 40px;
    overflow-y: auto;
`;

const Intro = styled.p`
    font-size: 0.85rem;
    line-height: 1.6;
    color: #9ca3af;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const Section = styled.div`
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 10px;
    background: rgba(17, 24, 39, 0.6);
    overflow: hidden;
    transition: border-color 0.2s ease;

    &:hover {
        border-color: rgba(255, 255, 255, 0.16);
    }
`;

const SectionHeader = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 12px 14px;
    border: none;
    background: none;
    color: #f9fafb;
    font-size: 0.9rem;
    text-align: left;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.04);
    }
`;

const Chevron = styled.span<{ $open: boolean }>`
    flex-shrink: 0;
    font-size: 0.7rem;
    color: #60a5fa;
    transition: transform 0.18s ease;
    transform: rotate(${(props) => (props.$open ? "90deg" : "0")});
`;

const Name = styled.span`
    font-weight: 600;
    word-break: break-word;
`;

const Meta = styled.span`
    margin-left: auto;
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: #6b7280;
`;

const Body = styled.pre`
    margin: 0;
    padding: 12px 14px 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    line-height: 1.6;
    color: #9ca3af;
    white-space: pre-wrap;
    word-break: break-word;
`;

export const AttributionPage: React.FC<{ onClose: () => void }> = ({onClose}) => {
    const t = useTranslation();
    const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set());

    const toggle = (name: string) =>
        setExpanded((previous) => {
            const next = new Set(previous);
            if (!next.delete(name)) next.add(name);
            return next;
        });

    return (
        <Page>
            <Header>
                <Title>{t("attribution.title")}</Title>
                <CloseButton type="button" onClick={onClose} title={t("attribution.close")}>
                    ✕
                </CloseButton>
            </Header>

            <Content>
                <Intro>{t("attribution.description", {count: ATTRIBUTIONS.length})}</Intro>

                <List>
                    {ATTRIBUTIONS.map((entry) => {
                        const open = expanded.has(entry.name);

                        return (
                            <Section key={`${entry.name}@${entry.version}`}>
                                <SectionHeader type="button" aria-expanded={open} onClick={() => toggle(entry.name)}>
                                    <Chevron $open={open}>▶</Chevron>
                                    <Name>{entry.name}</Name>
                                    <Meta>
                                        {entry.version ? `${entry.version} · ` : ""}
                                        {entry.license}
                                    </Meta>
                                </SectionHeader>

                                {open && <Body>{entry.text}</Body>}
                            </Section>
                        );
                    })}
                </List>
            </Content>
        </Page>
    );
};
