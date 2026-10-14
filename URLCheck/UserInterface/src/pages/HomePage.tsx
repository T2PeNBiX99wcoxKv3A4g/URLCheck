import React, {useState} from "react";
import styled from "styled-components";
import {showPopup} from "../api/system";
import {LinkIcon, SearchIcon, ShieldCheckIcon} from "../components/Icons";
import {PageContainer, StackCard} from "../components/Layout";

const Title = styled.h3`
    font-size: 1.05rem;
    font-weight: 700;
    color: #f9fafb;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Description = styled.p`
    font-size: 0.85rem;
    color: #9ca3af;
    line-height: 1.6;
`;

const InputForm = styled.form`
    display: flex;
    gap: 12px;
`;

const InputWrapper = styled.div`
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;

    svg {
        position: absolute;
        left: 16px;
        stroke: #9ca3af;
    }
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 14px 16px 14px 48px;
    font-size: 0.95rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    background: rgba(15, 23, 42, 0.75);
    color: #f9fafb;
    outline: none;
    font-family: inherit;
    transition: all 0.2s ease;

    &:focus {
        background: rgba(15, 23, 42, 0.95);
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    }

    &::placeholder {
        color: #6b7280;
    }
`;

const PrimaryButton = styled.button`
    padding: 0 24px;
    height: 50px;
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    transition: all 0.2s ease;
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.35);

    &:hover:not(:disabled) {
        background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%);
    }

    &:disabled {
        opacity: 0.55;
        cursor: not-allowed;
        box-shadow: none;
    }
`;

const Presets = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
`;

const PresetLabel = styled.span`
    font-size: 0.8rem;
    color: #9ca3af;
    font-weight: 500;
`;

const PresetChip = styled.button`
    background: rgba(15, 23, 42, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    padding: 4px 10px;
    font-size: 0.75rem;
    color: #9ca3af;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
        background: rgba(31, 41, 55, 0.85);
        color: #f9fafb;
        border-color: rgba(99, 102, 241, 0.35);
    }
`;

const SAMPLE_URL = "https://www.google.com/search?q=photino+net&hl=en&utm_source=test";

export const HomePage: React.FC = () => {
    const [url, setUrl] = useState(SAMPLE_URL);
    const [busy, setBusy] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const target = url.trim();
        if (!target) return;

        setBusy(true);
        try {
            await showPopup(target);
        } finally {
            setBusy(false);
        }
    };

    return (
        <PageContainer $maxWidth={820}>
            <StackCard>
                <Title>
                    <LinkIcon size={18}/>
                    <span>Open a URL</span>
                </Title>
                <Description>
                    Simulate clicking a link. URLCheck intercepts the URL, opens the inspection popup, and lets you
                    strip query parameters before opening it in a browser.
                </Description>

                <InputForm onSubmit={handleSubmit}>
                    <InputWrapper>
                        <SearchIcon size={20}/>
                        <StyledInput
                            type="text"
                            placeholder="https://example.com/path?key=value"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </InputWrapper>
                    <PrimaryButton type="submit" disabled={busy}>
                        <ShieldCheckIcon size={18}/>
                        <span>Open</span>
                    </PrimaryButton>
                </InputForm>

                <Presets>
                    <PresetLabel>Sample URL:</PresetLabel>
                    <PresetChip type="button" onClick={() => setUrl(SAMPLE_URL)}>
                        {SAMPLE_URL}
                    </PresetChip>
                </Presets>
            </StackCard>
        </PageContainer>
    );
};
