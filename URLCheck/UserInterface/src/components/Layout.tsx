import styled from "styled-components";

/** Shared page shell used by every full-page view. */
export const PageContainer = styled.div<{ $maxWidth?: number }>`
    display: flex;
    flex-direction: column;
    gap: 24px;
    ${(props) => (props.$maxWidth ? `max-width: ${props.$maxWidth}px;` : "")}
`;

/** Shared card surface. */
export const Card = styled.div`
    background: rgba(17, 24, 39, 0.75);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
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
    color: #f9fafb;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 12px;
    margin-bottom: 4px;
`;
