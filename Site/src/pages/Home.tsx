import React from "react";
import styled from "styled-components";
import {ICON, REPOSITORY, RELEASES, SCREENSHOT, WIKI} from "../constants";

const Hero = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 24px 0 8px;
    text-align: center;
`;

const Icon = styled.img`
    width: 88px;
    height: 88px;
`;

const Title = styled.h1`
    margin: 0;
    font-size: 2.6rem;
    letter-spacing: -0.03em;
`;

const Tagline = styled.p`
    margin: 0;
    max-width: 560px;
    color: #9ca3af;
    font-size: 1.05rem;
`;

const Actions = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 12px;
`;

const Button = styled.a<{ $primary?: boolean }>`
    padding: 10px 18px;
    border-radius: 9px;
    border: 1px solid ${(props) => (props.$primary ? "rgba(99, 102, 241, 0.5)" : "rgba(255, 255, 255, 0.12)")};
    background: ${(props) => (props.$primary ? "rgba(59, 130, 246, 0.2)" : "transparent")};
    color: ${(props) => (props.$primary ? "#bfdbfe" : "#d1d5db")};
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.15s ease, border-color 0.15s ease;

    &:hover {
        background: ${(props) => (props.$primary ? "rgba(59, 130, 246, 0.32)" : "rgba(255, 255, 255, 0.06)")};
        border-color: rgba(255, 255, 255, 0.25);
    }
`;

const Shot = styled.figure`
    margin: 40px 0 0;

    img {
        width: 100%;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
    }

    figcaption {
        margin-top: 10px;
        color: #6b7280;
        font-size: 0.78rem;
    }
`;

const Section = styled.section`
    margin-top: 56px;
`;

const Heading = styled.h2`
    margin: 0 0 16px;
    font-size: 1.3rem;
    letter-spacing: -0.01em;
`;

const Lead = styled.p`
    margin: 0 0 18px;
    max-width: 720px;
    color: #9ca3af;
    font-size: 0.92rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 14px;
`;

const Feature = styled.article`
    padding: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.6);
`;

const FeatureName = styled.h3`
    margin: 0 0 6px;
    font-size: 0.92rem;
`;

const FeatureText = styled.p`
    margin: 0;
    color: #9ca3af;
    font-size: 0.84rem;
`;

const PlatformGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 12px;
`;

const Platform = styled.a`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 16px 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.6);
    text-decoration: none;
    transition: border-color 0.2s ease, background 0.2s ease;

    &:hover {
        border-color: rgba(99, 102, 241, 0.45);
        background: rgba(30, 41, 59, 0.7);
    }
`;

const PlatformName = styled.span`
    color: #f9fafb;
    font-size: 0.95rem;
    font-weight: 600;
`;

const PlatformNote = styled.span`
    color: #9ca3af;
    font-size: 0.8rem;
`;

const Links = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

const Link = styled.a`
    padding: 8px 14px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    color: #d1d5db;
    font-size: 0.85rem;
    text-decoration: none;
    transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;

    &:hover {
        color: #f9fafb;
        border-color: rgba(255, 255, 255, 0.25);
        background: rgba(255, 255, 255, 0.05);
    }
`;

const features: [string, string][] = [
    [
        "Intercept links",
        "Installed as the default handler for http/https, so every clicked link passes through the popup. Stays in the tray."
    ],
    [
        "Inspect before opening",
        "A borderless popup shows the URL broken into scheme, host, parameters and fragment."
    ],
    [
        "Clean the URL",
        "Edit or remove any query parameter, clear the fragment, or strip tracking parameters in one click."
    ],
    [
        "Script it",
        "Lua scripts can rewrite every URL before it opens; install them from the scripts page."
    ],
    [
        "Forward to another device",
        "Send a URL to another URLCheck on the local network, end-to-end encrypted."
    ],
    ["History", "Every intercepted URL is recorded locally in SQLite and can be searched."]
];

const platforms: [string, string][] = [
    ["Windows", "x64 installer (.msi)"],
    ["Fedora", "x86_64 (.rpm)"],
    ["Debian / Ubuntu", "amd64 (.deb)"],
    ["Arch Linux", "x86_64 (.pkg.tar.zst)"]
];

export const HomePage: React.FC = () => (
    <>
        <Hero>
            <Icon src={ICON} alt=""/>
            <Title>URLCheck</Title>
            <Tagline>Check the URL before it opens in your browser.</Tagline>
            <Actions>
                <Button $primary href={RELEASES}>
                    Download
                </Button>
                <Button href="#/scripts">Install a script</Button>
                <Button href="#/docs/Lua-Scripts">Documentation</Button>
            </Actions>
        </Hero>

        <Shot>
            <img alt="The URLCheck main window" src={SCREENSHOT}/>
            <figcaption>The main window</figcaption>
        </Shot>

        <Section>
            <Heading>What it does</Heading>
            <Lead>
                URLCheck registers itself as a link handler, so clicking an http/https link opens a
                small inspection popup instead of going straight to a browser. You get to see where
                the link really goes, strip the tracking junk, and only then hand it to the browser
                you want.
            </Lead>
        </Section>

        <Section>
            <Heading>Features</Heading>
            <Grid>
                {features.map(([name, text]) => (
                    <Feature key={name}>
                        <FeatureName>{name}</FeatureName>
                        <FeatureText>{text}</FeatureText>
                    </Feature>
                ))}
            </Grid>
        </Section>

        <Section>
            <Heading>Install</Heading>
            <Lead>
                Self-contained builds: the .NET runtime is bundled, so nothing else needs to be
                installed. Windows also needs the WebView2 runtime; Linux needs WebKitGTK and the
                AppIndicator library (see the <a href={REPOSITORY}>README</a>). Pick your system to
                open the latest release and download the matching file.
            </Lead>
            <PlatformGrid>
                {platforms.map(([name, note]) => (
                    <Platform href={RELEASES} key={name}>
                        <PlatformName>{name}</PlatformName>
                        <PlatformNote>{note}</PlatformNote>
                    </Platform>
                ))}
            </PlatformGrid>
        </Section>

        <Section>
            <Heading>Links</Heading>
            <Links>
                <Link href={REPOSITORY}>Source code</Link>
                <Link href={WIKI}>Wiki</Link>
                <Link href="#/scripts">Scripts</Link>
                <Link href={`${REPOSITORY}/releases`}>Releases</Link>
            </Links>
        </Section>
    </>
);
