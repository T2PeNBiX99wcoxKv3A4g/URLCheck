import React from "react";
import styled from "styled-components";
import {Eraser, FileCode2, History, MousePointerClick, ScanSearch, Send, type LucideIcon} from "lucide-react";
import {siArchlinux, siFedora, siUbuntu} from "simple-icons";
import {ICON, POPUP, REPOSITORY, RELEASES, SCREENSHOT} from "../constants";

const Hero = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 24px 0 8px;
    text-align: center;
`;

const AppIcon = styled.img`
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

/** The popup screenshot sits beside its explanation on wide screens. */
const Popup = styled.section`
    display: grid;
    gap: 28px;
    align-items: center;

    @media (min-width: 880px) {
        grid-template-columns: 560px minmax(0, 1fr);
    }
`;

const PopupShot = styled.figure`
    margin: 0;
    max-width: 560px;
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

const FeatureIcon = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
    border-radius: 8px;
    background: rgba(59, 130, 246, 0.14);
    color: #93c5fd;
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
    display: flex;
    align-items: center;
    gap: 8px;
    color: #f9fafb;
    font-size: 0.95rem;
    font-weight: 600;
`;

const BrandIcon = styled.svg`
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    fill: #93c5fd;
`;

const PlatformNote = styled.span`
    color: #9ca3af;
    font-size: 0.8rem;
`;

const features: [LucideIcon, string, string][] = [
    [
        MousePointerClick,
        "Intercept links",
        "Installed as the default handler for http/https, so every clicked link passes through the popup. Stays in the tray."
    ],
    [
        ScanSearch,
        "Inspect before opening",
        "A borderless popup shows the URL broken into scheme, host, parameters and fragment."
    ],
    [
        Eraser,
        "Clean the URL",
        "Edit or remove any query parameter, clear the fragment, or strip tracking parameters in one click."
    ],
    [
        FileCode2,
        "Script it",
        "Lua scripts can rewrite every URL before it opens; install them from the scripts page."
    ],
    [
        Send,
        "Forward to another device",
        "Send a URL to another URLCheck on the local network, end-to-end encrypted."
    ],
    [History, "History", "Every intercepted URL is recorded locally in SQLite and can be searched."]
];

/** simple-icons dropped the Windows mark, so the four squares are drawn here. */
const windowsLogo = {path: "M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z"};

const platforms: [{path: string}, string, string][] = [
    [windowsLogo, "Windows", "x64 installer (.msi)"],
    [siFedora, "Fedora", "x86_64 (.rpm)"],
    [siUbuntu, "Debian / Ubuntu", "amd64 (.deb)"],
    [siArchlinux, "Arch Linux", "x86_64 (.pkg.tar.zst)"]
];

export const HomePage: React.FC = () => (
    <>
        <Hero>
            <AppIcon src={ICON} alt=""/>
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
            <Popup>
                <PopupShot>
                    <img alt="The URLCheck popup for an insecure link" src={POPUP}/>
                    <figcaption>Inspecting http://www.google.com/?foo=bar#tag</figcaption>
                </PopupShot>
                <div>
                    <Heading>The popup</Heading>
                    <Lead>
                        Every clicked link opens this before anything reaches the browser. The URL
                        is split into domain, parameters and fragment; insecure links and known
                        tracking parameters are flagged, and the button at the bottom picks which
                        browser finally opens it.
                    </Lead>
                </div>
            </Popup>
        </Section>

        <Section>
            <Heading>Features</Heading>
            <Grid>
                {features.map(([Glyph, name, text]) => (
                    <Feature key={name}>
                        <FeatureIcon>
                            <Glyph size={18}/>
                        </FeatureIcon>
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
                {platforms.map(([icon, name, note]) => (
                    <Platform href={RELEASES} key={name}>
                        <PlatformName>
                            <BrandIcon viewBox="0 0 24 24" aria-hidden="true">
                                <path d={icon.path}/>
                            </BrandIcon>
                            {name}
                        </PlatformName>
                        <PlatformNote>{note}</PlatformNote>
                    </Platform>
                ))}
            </PlatformGrid>
        </Section>
    </>
);
