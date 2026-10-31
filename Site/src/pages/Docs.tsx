import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
import {docs} from "../docs.generated";
import {useCopy, useLanguage} from "../language";

const Layout = styled.div`
    display: flex;
    gap: 32px;
    align-items: flex-start;

    @media (max-width: 760px) {
        flex-direction: column;
        gap: 20px;
    }
`;

const Sidebar = styled.aside`
    position: sticky;
    top: 24px;
    width: 210px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;

    @media (max-width: 760px) {
        position: static;
        width: 100%;
    }
`;

const Group = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const GroupTitle = styled.span`
    padding: 0 10px 6px;
    color: #6b7280;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

const SideLink = styled.a<{ $active: boolean }>`
    padding: 7px 10px;
    border-radius: 7px;
    color: ${(props) => (props.$active ? "#93c5fd" : "#9ca3af")};
    background: ${(props) => (props.$active ? "rgba(59, 130, 246, 0.14)" : "transparent")};
    font-size: 0.85rem;
    text-decoration: none;

    &:hover {
        color: #f9fafb;
        background: rgba(255, 255, 255, 0.05);
    }
`;

const Article = styled.article`
    flex: 1;
    min-width: 0;
    padding: 28px 32px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.6);
`;

const Body = styled.div`
    font-size: 0.92rem;
    color: #d1d5db;
    line-height: 1.65;

    h1 {
        margin: 0 0 16px;
        font-size: 1.8rem;
        color: #f9fafb;
        letter-spacing: -0.02em;
    }

    h2 {
        margin: 32px 0 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        font-size: 1.25rem;
        color: #f9fafb;
    }

    h3 {
        margin: 24px 0 8px;
        font-size: 1.02rem;
        color: #f9fafb;
    }

    p {
        margin: 0 0 12px;
    }

    ul,
    ol {
        margin: 0 0 12px;
        padding-left: 22px;
    }

    li {
        margin: 4px 0;
    }

    a {
        color: #60a5fa;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    code {
        padding: 1px 5px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.08);
        color: #93c5fd;
        font-family: var(--font-mono);
        font-size: 0.85em;
    }

    pre {
        margin: 0 0 16px;
        padding: 14px 16px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 10px;
        background: rgba(2, 6, 23, 0.85);
        overflow-x: auto;
    }

    pre code {
        padding: 0;
        background: none;
        color: #e2e8f0;
        font-size: 0.82rem;
    }

    table {
        width: 100%;
        margin: 0 0 16px;
        border-collapse: collapse;
        font-size: 0.85rem;
    }

    th,
    td {
        padding: 8px 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        text-align: left;
        vertical-align: top;
    }

    th {
        color: #9ca3af;
        font-weight: 600;
    }

    blockquote {
        margin: 0 0 16px;
        padding: 8px 14px;
        border-left: 3px solid rgba(99, 102, 241, 0.5);
        background: rgba(99, 102, 241, 0.06);
        color: #9ca3af;
    }

    hr {
        margin: 24px 0;
        border: 0;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
`;

const GROUPS = ["scripting", "libraries"] as const;

interface DocsPageProps {
    page: string;
}

export const DocsPage: React.FC<DocsPageProps> = ({page}) => {
    const {language} = useLanguage();
    const copy = useCopy();

    // A language without its own pages falls back to the English ones the generator always emits.
    const pages = docs[language] ?? docs.en;
    const current = pages.find((doc) => doc.slug === page) ?? pages[0];

    return (
        <Layout>
            <Sidebar>
                {GROUPS.map((group) => (
                    <Group key={group}>
                        <GroupTitle>{copy.docs[group]}</GroupTitle>
                        {pages
                            .filter((doc) => doc.group === group)
                            .map((doc) => (
                                <SideLink
                                    $active={doc.slug === current.slug}
                                    href={`#/docs/${doc.slug}`}
                                    key={doc.slug}
                                >
                                    {doc.title}
                                </SideLink>
                            ))}
                    </Group>
                ))}
            </Sidebar>

            <Article>
                <Body>
                    <Markdown remarkPlugins={[remarkGfm]}>{current.body}</Markdown>
                </Body>
            </Article>
        </Layout>
    );
};
