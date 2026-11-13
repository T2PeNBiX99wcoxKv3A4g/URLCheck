import styled from "styled-components";

/**
 * Shared page shell used by every full-page view. It fades in whenever a page mounts, which is
 * exactly when the tab changes, so switching tabs gets a transition for free.
 */
export const PageContainer = styled.div<{ $maxWidth?: number }>`
    display: flex;
    flex-direction: column;
    gap: 24px;
    animation: pageEnter 0.32s cubic-bezier(0.22, 1, 0.36, 1);

    @keyframes pageEnter {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    ${(props) => (props.$maxWidth ? `max-width: ${props.$maxWidth}px;` : "")}
`;

/** Shared card surface. Hover only lifts the border and shadow, never the layout. */
export const Card = styled.div`
    background: var(--panel);
    backdrop-filter: blur(16px);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px var(--shadow);
    transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;

    &:hover {
        border-color: var(--border-hover);
        box-shadow: 0 8px 24px var(--shadow);
    }
`;

/** A card that stacks its children vertically. */
export const StackCard = styled(Card)`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

/** Card section heading. */
export const SectionTitle = styled.h3`
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-primary);
    border-bottom: 1px solid var(--border);
    padding-bottom: 12px;
    margin-bottom: 4px;
`;
