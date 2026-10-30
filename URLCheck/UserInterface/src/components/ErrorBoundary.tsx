import React from "react";
import styled from "styled-components";
import {useTranslation} from "@photino-net-utils/bridge";
import {AlertTriangleIcon} from "./Icons";

const Fallback = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 48px 24px;
    border: 1px solid rgba(239, 68, 68, 0.25);
    border-radius: 12px;
    background: rgba(239, 68, 68, 0.08);
    color: #f87171;
    font-size: 0.9rem;
`;

const Crash: React.FC = () => {
    const t = useTranslation();

    return (
        <Fallback>
            <AlertTriangleIcon size={28}/>
            <span>{t("error.unknown")}</span>
        </Fallback>
    );
};

/** Keeps one page's crash from taking the sidebar and the whole window down with it. */
export class ErrorBoundary extends React.Component<React.PropsWithChildren, { failed: boolean }> {
    state = {failed: false};

    static getDerivedStateFromError() {
        return {failed: true};
    }

    componentDidCatch(error: unknown) {
        console.error("Page crashed", error);
    }

    render() {
        return this.state.failed ? <Crash/> : this.props.children;
    }
}
