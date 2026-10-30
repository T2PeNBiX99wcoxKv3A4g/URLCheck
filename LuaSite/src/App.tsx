import React, {useState} from "react";
import styled, {createGlobalStyle} from "styled-components";
import {scripts} from "./scripts.generated";

const GlobalStyle = createGlobalStyle`
    :root {
        color-scheme: dark;
        --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", Arial, sans-serif;
        --font-mono: "JetBrains Mono", ui-monospace, "Cascadia Mono", Consolas, "SFMono-Regular", Menlo, monospace;
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        min-height: 100vh;
        background-color: #0b0f19;
        background-image: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.14), transparent 70%);
        color: #f9fafb;
        font-family: var(--font-sans);
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
    }

    code {
        font-family: var(--font-mono);
        font-size: 0.85em;
        color: #93c5fd;
    }
`;

const Page = styled.main`
    max-width: 1000px;
    margin: 0 auto;
    padding: 64px 24px 48px;
`;

const Header = styled.header`
    margin-bottom: 36px;
`;

const Title = styled.h1`
    margin: 0 0 8px;
    font-size: 2rem;
    letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
    margin: 0;
    max-width: 640px;
    color: #9ca3af;
    font-size: 0.95rem;
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

const Footer = styled.footer`
    margin-top: 40px;
    color: #6b7280;
    font-size: 0.78rem;
    text-align: center;
`;

export const App: React.FC = () => {
    const [copied, setCopied] = useState<string | null>(null);

    const copy = (name: string, link: string) => {
        void navigator.clipboard.writeText(link).then(() => {
            setCopied(name);
            window.setTimeout(() => setCopied((current) => (current === name ? null : current)), 1500);
        });
    };

    return (
        <>
            <GlobalStyle/>
            <Page>
                <Header>
                    <Title>URLCheck scripts</Title>
                    <Subtitle>
                        Click <strong>Install</strong> to hand the script to URLCheck. The app must be
                        running and registered for <code>urlcheck://</code>; if nothing happens, use{" "}
                        <strong>Copy link</strong> and open it manually.
                    </Subtitle>
                </Header>

                <Grid>
                    {scripts.map((script) => (
                        <Card key={script.name}>
                            <Name>{script.name}</Name>
                            <Description>{script.description}</Description>
                            <Actions>
                                <Install href={script.install}>Install</Install>
                                <Copy onClick={() => copy(script.name, script.install)} type="button">
                                    {copied === script.name ? "Copied" : "Copy link"}
                                </Copy>
                            </Actions>
                        </Card>
                    ))}
                </Grid>

                <Footer>
                    The list comes from the <code>Lua</code> folder of the URLCheck repository.
                </Footer>
            </Page>
        </>
    );
};
