import React, {useState} from "react";
import styled from "styled-components";
import {scripts} from "../scripts.generated";
import {useCopy} from "../language";
import {fill} from "../text";

const Header = styled.header`
    margin-bottom: 28px;
`;

const Title = styled.h1`
    margin: 0 0 8px;
    font-size: 1.9rem;
    letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
    margin: 0;
    max-width: 640px;
    color: #9ca3af;
    font-size: 0.92rem;
`;

const Grid = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
`;

const Card = styled.article`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.75);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        border-color: rgba(99, 102, 241, 0.4);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    }
`;

const Name = styled.h2`
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.9rem;
    font-weight: 600;
    overflow-wrap: anywhere;
`;

const Description = styled.p`
    flex: 1;
    margin: 0;
    color: #9ca3af;
    font-size: 0.85rem;
`;

const Source = styled.a`
    display: block;
    color: #6b7280;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    text-decoration: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        color: #93c5fd;
    }
`;

const Actions = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 4px;
`;

const Install = styled.a`
    flex: 1;
    padding: 9px 14px;
    border-radius: 8px;
    border: 1px solid rgba(99, 102, 241, 0.45);
    background: rgba(59, 130, 246, 0.18);
    color: #bfdbfe;
    font-size: 0.85rem;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    transition: background 0.15s ease;

    &:hover {
        background: rgba(59, 130, 246, 0.3);
    }
`;

const Copy = styled.button`
    padding: 9px 12px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: transparent;
    color: #9ca3af;
    font: inherit;
    font-size: 0.8rem;
    cursor: pointer;

    &:hover {
        color: #f9fafb;
        border-color: rgba(255, 255, 255, 0.25);
    }
`;

export const ScriptsPage: React.FC = () => {
    const copy = useCopy().scripts;
    const [copied, setCopied] = useState<string | null>(null);

    const remember = (name: string, link: string) => {
        void navigator.clipboard.writeText(link).then(() => {
            setCopied(name);
            window.setTimeout(() => setCopied((current) => (current === name ? null : current)), 1500);
        });
    };

    return (
        <>
            <Header>
                <Title>{copy.title}</Title>
                <Subtitle>{fill(copy.subtitle, "{scheme}", <code>checkurl://</code>)}</Subtitle>
            </Header>

            <Grid>
                {scripts.map((script) => (
                    <Card key={script.name}>
                        <Name>{script.name}</Name>
                        <Description>{script.description}</Description>
                        <Source href={script.source} title={script.source}>
                            {script.source}
                        </Source>
                        <Actions>
                            <Install href={script.install}>{copy.install}</Install>
                            <Copy onClick={() => remember(script.name, script.source)} type="button">
                                {copied === script.name ? copy.copied : copy.copy}
                            </Copy>
                        </Actions>
                    </Card>
                ))}
            </Grid>
        </>
    );
};
