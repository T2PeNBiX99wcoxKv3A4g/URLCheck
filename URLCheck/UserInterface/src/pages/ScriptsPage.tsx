import React, {useEffect, useMemo, useRef, useState} from "react";
import styled from "styled-components";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-lua";
import {Native, useTranslation} from "@photino-net-utils/bridge";
import {PageContainer} from "../components/Layout";
import {AlertTriangleIcon, TrashIcon} from "../components/Icons";
import {
    clearScriptLogs,
    createScript,
    deleteScript,
    downloadScript,
    importScripts,
    listScripts,
    readScript,
    saveScript,
    scriptLogs,
    type ScriptEntry,
    type ScriptLogEntry,
} from "../api/scripts";

type Mode = "idle" | "new" | "download";

export const ScriptsPage: React.FC = () => {
    const t = useTranslation();
    const [scripts, setScripts] = useState<ScriptEntry[]>([]);
    const [directory, setDirectory] = useState("");
    const [selected, setSelected] = useState<string | null>(null);
    const [content, setContent] = useState("");
    const [saved, setSaved] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const [mode, setMode] = useState<Mode>("idle");
    const [draft, setDraft] = useState("");
    const [armed, setArmed] = useState(false);
    const [logs, setLogs] = useState<ScriptLogEntry[]>([]);
    const logEnd = useRef<HTMLDivElement | null>(null);

    const dirty = content !== saved;

    const refresh = async () => {
        const list = await listScripts();
        setScripts(list.scripts);
        setDirectory(list.directory);

        // A script that vanished (deleted elsewhere) must not stay selected, and the first one is a
        // better landing place than an empty editor.
        if (selected && list.scripts.some((script) => script.name === selected))
            return;

        const first = list.scripts[0];
        if (first) {
            await select(first.name);
        } else {
            setSelected(null);
            setContent("");
            setSaved("");
        }
    };

    useEffect(() => {
        void refresh();
        void scriptLogs().then(setLogs).catch(() => setLogs([]));

        return Native.on((message) => {
            if (message.type !== "scripts.log") return;

            const entry = message.data as ScriptLogEntry | undefined;
            if (entry) setLogs((current) => [...current.slice(-199), entry]);
        });
    }, []);

    useEffect(() => {
        logEnd.current?.scrollIntoView({block: "nearest"});
    }, [logs.length]);

    const select = async (name: string) => {
        setError(null);
        setArmed(false);

        try {
            const source = await readScript(name);
            setSelected(name);
            setContent(source);
            setSaved(source);
        } catch (problem) {
            setError(problem instanceof Error ? problem.message : String(problem));
        }
    };

    const save = async () => {
        if (!selected) return;

        setBusy(true);
        setError(null);

        const problem = await saveScript(selected, content);
        setBusy(false);

        if (problem) {
            setError(problem);
            return;
        }

        setSaved(content);
        await refresh();
    };

    const create = async () => {
        setBusy(true);
        setError(null);

        const problem = await createScript(draft);
        setBusy(false);

        if (problem) {
            setError(problem);
            return;
        }

        setMode("idle");
        setDraft("");
        await refresh();
        await select(draft.endsWith(".lua") ? draft : `${draft}.lua`);
    };

    const download = async () => {
        setBusy(true);
        setError(null);

        const problem = await downloadScript(draft);
        setBusy(false);

        if (problem) {
            setError(problem);
            return;
        }

        setMode("idle");
        setDraft("");
        await refresh();
    };

    const remove = async () => {
        if (!selected) return;

        if (!armed) {
            setArmed(true);
            return;
        }

        setBusy(true);
        const problem = await deleteScript(selected);
        setBusy(false);
        setArmed(false);

        if (problem) {
            setError(problem);
            return;
        }

        setSelected(null);
        setContent("");
        setSaved("");
        await refresh();
    };

    const importFiles = async () => {
        setBusy(true);
        setError(null);

        const problem = await importScripts();
        setBusy(false);

        if (problem) setError(problem);
        await refresh();
    };

    const highlight = useMemo(
        () => (code: string) => Prism.highlight(code, Prism.languages.lua, "lua"),
        []
    );

    return (
        <PageContainer $maxWidth={1100}>
            <Toolbar>
                <ActionButton disabled={busy} onClick={() => { setMode("new"); setDraft(""); setError(null); }} type="button">
                    {t("scripts.new")}
                </ActionButton>
                <ActionButton disabled={busy} onClick={() => void importFiles()} type="button">
                    {t("scripts.import")}
                </ActionButton>
                <ActionButton disabled={busy} onClick={() => { setMode("download"); setDraft(""); setError(null); }} type="button">
                    {t("scripts.download")}
                </ActionButton>
                <Spacer/>
                <Hint title={directory}>{directory}</Hint>
            </Toolbar>

            {mode !== "idle" && (
                <DraftRow>
                    <DraftInput
                        autoFocus
                        onChange={(event) => setDraft(event.target.value)}
                        placeholder={mode === "new" ? t("scripts.namePlaceholder") : t("scripts.downloadPlaceholder")}
                        value={draft}
                    />
                    <ActionButton
                        disabled={busy || draft.trim().length === 0}
                        onClick={() => void (mode === "new" ? create() : download())}
                        type="button"
                    >
                        {mode === "new" ? t("scripts.create") : t("scripts.download")}
                    </ActionButton>
                    <GhostButton onClick={() => setMode("idle")} type="button">{t("scripts.cancel")}</GhostButton>
                </DraftRow>
            )}

            {error && (
                <Banner>
                    <AlertTriangleIcon size={16}/>
                    <span>{t(error)}</span>
                </Banner>
            )}

            <Body>
                <List>
                    {scripts.length === 0 && <Empty>{t("scripts.empty")}</Empty>}

                    {scripts.map((script) => (
                        <ListItem
                            $active={script.name === selected}
                            key={script.name}
                            onClick={() => void select(script.name)}
                            type="button"
                        >
                            <span>{script.name}</span>
                            {script.error && (
                                <Problem title={t(script.error)}>
                                    <AlertTriangleIcon size={14}/>
                                </Problem>
                            )}
                        </ListItem>
                    ))}
                </List>

                <EditorPane>
                    {selected ? (
                        <>
                            <EditorHeader>
                                <Name>{selected}</Name>
                                <GhostButton disabled={!dirty || busy} onClick={() => void save()} type="button">
                                    {dirty ? t("scripts.save") : t("scripts.saved")}
                                </GhostButton>
                                <DangerButton $armed={armed} disabled={busy} onClick={() => void remove()} type="button">
                                    {armed ? t("scripts.deleteConfirm") : <TrashIcon size={15}/>}
                                </DangerButton>
                            </EditorHeader>

                            <Editor
                                highlight={highlight}
                                onValueChange={setContent}
                                padding={16}
                                style={{
                                    fontFamily: "var(--font-mono)",
                                    fontSize: 13,
                                    lineHeight: 1.55,
                                    minHeight: 320,
                                }}
                                textareaClassName="script-editor-area"
                                value={content}
                            />
                        </>
                    ) : (
                        <Empty>{t("scripts.noScript")}</Empty>
                    )}
                </EditorPane>
            </Body>

            <Logs>
                <LogHeader>
                    <span>{t("scripts.logs")}</span>
                    <GhostButton onClick={() => void clearScriptLogs().then(() => setLogs([]))} type="button">
                        {t("scripts.clearLogs")}
                    </GhostButton>
                </LogHeader>

                <LogBody>
                    {logs.length === 0 && <Empty>{t("scripts.logsEmpty")}</Empty>}
                    {logs.map((entry, index) => (
                        <LogLine $error={entry.level === "error"} key={`${entry.time}-${index}`}>
                            <time>{entry.time}</time>
                            <ScriptName>{entry.script}</ScriptName>
                            <span>{entry.message}</span>
                        </LogLine>
                    ))}
                    <div ref={logEnd}/>
                </LogBody>
            </Logs>
        </PageContainer>
    );
};

const Toolbar = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
`;

const Spacer = styled.div`
    flex: 1;
`;

const Hint = styled.span`
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: #6b7280;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 420px;
`;

const DraftRow = styled.div`
    display: flex;
    gap: 10px;
`;

const DraftInput = styled.input`
    flex: 1;
    padding: 9px 12px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(17, 24, 39, 0.8);
    color: #f9fafb;
    font-family: var(--font-mono);
    font-size: 0.85rem;

    &:focus {
        outline: none;
        border-color: rgba(99, 102, 241, 0.6);
    }
`;

const Banner = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 8px;
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #f87171;
    font-size: 0.85rem;
`;

const Body = styled.div`
    display: flex;
    gap: 16px;
    min-height: 360px;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 220px;
    flex-shrink: 0;
    overflow-y: auto;
    max-height: 520px;
`;

const ListItem = styled.button<{ $active: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 9px 12px;
    border: 1px solid ${(props) => (props.$active ? "rgba(99, 102, 241, 0.35)" : "transparent")};
    border-radius: 8px;
    background: ${(props) => (props.$active ? "rgba(59, 130, 246, 0.15)" : "transparent")};
    color: ${(props) => (props.$active ? "#93c5fd" : "#9ca3af")};
    font: inherit;
    font-size: 0.85rem;
    text-align: left;
    cursor: pointer;
    overflow: hidden;

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.06);
        color: #f9fafb;
    }
`;

const Problem = styled.span`
    display: grid;
    place-items: center;
    color: #fbbf24;
    flex-shrink: 0;
`;

const EditorPane = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.75);
    overflow: hidden;

    .script-editor-area {
        outline: none;
        caret-color: #93c5fd;
    }

    .token.comment { color: #6b7280; font-style: italic; }
    .token.keyword { color: #c792ea; }
    .token.string { color: #a5d6a7; }
    .token.number { color: #f9a825; }
    .token.boolean { color: #f9a825; }
    .token.function { color: #82aaff; }
    .token.operator { color: #89ddff; }
    .token.punctuation { color: #9ca3af; }
    .token.property { color: #93c5fd; }
`;

const EditorHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const Name = styled.strong`
    flex: 1;
    font-size: 0.85rem;
    color: #f9fafb;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Logs = styled.section`
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.75);
    overflow: hidden;
`;

const LogHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 0.85rem;
    font-weight: 600;
    color: #f9fafb;
`;

const LogBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px 0;
    max-height: 180px;
    overflow-y: auto;
    font-family: var(--font-mono);
    font-size: 0.76rem;
`;

const ScriptName = styled.span``;

const LogLine = styled.div<{ $error: boolean }>`
    display: flex;
    gap: 10px;
    padding: 2px 14px;
    color: ${(props) => (props.$error ? "#f87171" : "#9ca3af")};

    time {
        color: #6b7280;
        flex-shrink: 0;
    }

    ${ScriptName} {
        color: #93c5fd;
        flex-shrink: 0;
    }

    span {
        overflow-wrap: anywhere;
    }
`;

const Empty = styled.p`
    padding: 16px;
    color: #6b7280;
    font-size: 0.82rem;
`;

const ActionButton = styled.button`
    padding: 9px 14px;
    border-radius: 8px;
    border: 1px solid rgba(99, 102, 241, 0.45);
    background: rgba(59, 130, 246, 0.18);
    color: #bfdbfe;
    font: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;

    &:hover:not(:disabled) {
        background: rgba(59, 130, 246, 0.3);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const GhostButton = styled.button`
    padding: 7px 12px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: transparent;
    color: #9ca3af;
    font: inherit;
    font-size: 0.8rem;
    cursor: pointer;

    &:hover:not(:disabled) {
        color: #f9fafb;
        border-color: rgba(255, 255, 255, 0.25);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const DangerButton = styled(GhostButton)<{ $armed: boolean }>`
    display: grid;
    place-items: center;
    min-width: 34px;
    color: ${(props) => (props.$armed ? "#fecaca" : "#9ca3af")};
    border-color: ${(props) => (props.$armed ? "rgba(239, 68, 68, 0.6)" : "rgba(255, 255, 255, 0.12)")};
    background: ${(props) => (props.$armed ? "rgba(239, 68, 68, 0.18)" : "transparent")};
`;
