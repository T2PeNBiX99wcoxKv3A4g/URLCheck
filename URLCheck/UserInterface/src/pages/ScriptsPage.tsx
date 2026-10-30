import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Native, useTranslation} from "@photino-net-utils/bridge";
import {PageContainer} from "../components/Layout";
import {CodeEditor} from "../components/CodeEditor";
import {
    AlertTriangleIcon,
    CodeIcon,
    EditIcon,
    ExternalLinkIcon,
    PlayIcon,
    PlusIcon,
    TrashIcon
} from "../components/Icons";
import {
    clearScriptLogs,
    createScript,
    deleteScript,
    downloadScript,
    importScripts,
    listScripts,
    openScript,
    readScript,
    renameScript,
    saveScript,
    type ScriptEntry,
    type ScriptLogEntry,
    scriptLogs,
    type ScriptTestResult,
    testScript,
} from "../api/scripts";

type Mode = "idle" | "new" | "download";

/** Adds the extension the backend expects; the backend drops any folder part the same way. */
const luaName = (name: string) => {
    const file = name.split(/[\\/]/).pop() ?? name;

    return /\.lua$/i.test(file) ? file : `${file}.lua`;
};

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
    const [testUrl, setTestUrl] = useState("");
    const [test, setTest] = useState<ScriptTestResult | null>(null);
    const [testing, setTesting] = useState(false);
    const [renaming, setRenaming] = useState(false);
    const [renameDraft, setRenameDraft] = useState("");
    const logBody = useRef<HTMLDivElement | null>(null);
    const saveRef = useRef<() => Promise<void>>(async () => undefined);
    /** The open script and its dirty flag, for the callbacks registered once. */
    const openRef = useRef({name: null as string | null, dirty: false});

    const dirty = content !== saved;
    const gone = selected !== null && !scripts.some((script) => script.name === selected);

    useEffect(() => {
        openRef.current = {name: selected, dirty};
    });

    const close = () => {
        setSelected(null);
        setContent("");
        setSaved("");
        setArmed(false);
        setTest(null);
        setRenaming(false);
    };

    const select = async (name: string) => {
        setError(null);
        setArmed(false);
        setTest(null);
        setRenaming(false);

        try {
            const source = await readScript(name);
            setSelected(name);
            setContent(source);
            setSaved(source);
        } catch (problem) {
            setError(problem instanceof Error ? problem.message : String(problem));
        }
    };

    /**
     * Reloads the list; `preferred` wins, then the current selection, then the first script. A
     * script that disappeared from disk while it had unsaved edits stays open, so the edits can
     * still be saved (which writes the file again).
     */
    const refresh = async (preferred?: string) => {
        const list = await listScripts();
        setScripts(list.scripts);
        setDirectory(list.directory);

        const current = openRef.current.name;
        const wanted = preferred ?? current;
        const next = list.scripts.find((script) => script.name === wanted)?.name;

        if (next) {
            // Re-reading the script that is already open would throw away unsaved edits.
            if (next !== current) await select(next);
            return;
        }

        if (current !== null && openRef.current.dirty) return;

        const first = list.scripts[0];
        if (first) {
            await select(first.name);
            return;
        }

        close();
    };

    useEffect(() => {
        void refresh();
        void scriptLogs().then(setLogs).catch(() => setLogs([]));

        return Native.on((message) => {
            if (message.type === "scripts.log") {
                const entry = message.data as ScriptLogEntry | undefined;
                if (entry) setLogs((current) => [...current.slice(-199), entry]);
                return;
            }

            if (message.type === "scripts.changed") void refresh();
        });
    }, []);

    useEffect(() => {
        const body = logBody.current;
        if (body) body.scrollTop = body.scrollHeight;
    }, [logs.length]);

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
        const draftName = draft.trim();
        if (draftName.length === 0) return;

        const name = luaName(draftName);

        setBusy(true);
        setError(null);

        const problem = await createScript(name);
        setBusy(false);

        if (problem) {
            setError(problem);
            return;
        }

        setMode("idle");
        setDraft("");
        await refresh(name);
    };

    const download = async () => {
        const url = draft.trim();
        if (url.length === 0) return;

        setBusy(true);
        setError(null);

        const problem = await downloadScript(url);
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

        if (problem) {
            setError(problem);
            return;
        }

        close();
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

    const startRename = () => {
        if (!selected) return;

        setRenaming(true);
        setRenameDraft(selected);
    };

    const commitRename = async () => {
        if (!selected) return;

        const draftName = renameDraft.trim();
        const name = draftName.length === 0 ? "" : luaName(draftName);

        if (name.length === 0 || name === selected) {
            setRenaming(false);
            return;
        }

        setBusy(true);
        setError(null);

        const problem = await renameScript(selected, name);
        setBusy(false);

        if (problem) {
            setError(problem);
            return;
        }

        // The file moved, not its contents: keep the buffer (and any unsaved edits) as it is.
        setRenaming(false);
        setSelected(name);
        openRef.current = {name, dirty: openRef.current.dirty};
        await refresh(name);
    };

    const submit = () => void (mode === "new" ? create() : download());

    const open = async () => {
        if (!selected) return;

        const problem = await openScript(selected);
        if (problem) setError(problem);
    };

    const runTest = async () => {
        if (!selected) return;

        const url = testUrl.trim();
        if (url.length === 0) return;

        setTesting(true);
        setError(null);

        try {
            setTest(await testScript(selected, url, content));
        } catch (problem) {
            setError(problem instanceof Error ? problem.message : String(problem));
        } finally {
            setTesting(false);
        }
    };

    // The save handler changes with every keystroke; the shortcut is registered once and reads it here.
    useEffect(() => {
        saveRef.current = save;
    });

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "s") return;

            event.preventDefault();
            void saveRef.current();
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return (
        <Page $maxWidth={1180}>
            {error && (
                <Banner>
                    <AlertTriangleIcon size={16}/>
                    <span>{t(error)}</span>
                </Banner>
            )}

            <Workspace>
                <ListPane>
                    <ListHeader>
                        <span>{t("tabs.scripts.label")}</span>
                        <Count>{scripts.length}</Count>
                        <Spacer/>
                        <Folder title={directory}>{directory.split(/[\\/]/).pop()}</Folder>
                    </ListHeader>

                    <List>
                        {scripts.length === 0 && <Empty>{t("scripts.empty")}</Empty>}

                        {scripts.map((script) => (
                            <ListItem
                                $active={script.name === selected}
                                key={script.name}
                                onClick={() => void select(script.name)}
                                title={script.name}
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

                    {/* Creation floats over the bottom of the list, out of the way until it is needed. */}
                    <Dock>
                        {mode === "idle" ? (
                            <DockStack>
                                <PrimaryButton
                                    disabled={busy}
                                    onClick={() => {
                                        setMode("new");
                                        setDraft("");
                                        setError(null);
                                    }}
                                    type="button"
                                >
                                    <PlusIcon size={16}/>
                                    {t("scripts.new")}
                                </PrimaryButton>
                                <DockRow>
                                    <DockGhostButton disabled={busy} onClick={() => void importFiles()} type="button">
                                        {t("scripts.import")}
                                    </DockGhostButton>
                                    <DockGhostButton
                                        disabled={busy}
                                        onClick={() => {
                                            setMode("download");
                                            setDraft("");
                                            setError(null);
                                        }}
                                        type="button"
                                    >
                                        {t("scripts.download")}
                                    </DockGhostButton>
                                </DockRow>
                            </DockStack>
                        ) : (
                            <DockStack>
                                <DraftInput
                                    autoFocus
                                    onChange={(event) => setDraft(event.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") submit();
                                        if (event.key === "Escape") setMode("idle");
                                    }}
                                    placeholder={mode === "new" ? t("scripts.namePlaceholder") : t("scripts.downloadPlaceholder")}
                                    value={draft}
                                />
                                <DockRow>
                                    <PrimaryButton
                                        disabled={busy || draft.trim().length === 0}
                                        onClick={submit}
                                        type="button"
                                    >
                                        {mode === "new" ? t("scripts.create") : t("scripts.download")}
                                    </PrimaryButton>
                                    <GhostButton onClick={() => setMode("idle")} type="button">
                                        {t("scripts.cancel")}
                                    </GhostButton>
                                </DockRow>
                            </DockStack>
                        )}
                    </Dock>
                </ListPane>

                <Main>
                    <EditorCard>
                        {selected ? (
                            <>
                                <EditorHeader>
                                    <CodeIcon size={16}/>
                                    {renaming ? (
                                        <RenameInput
                                            autoFocus
                                            onBlur={() => setRenaming(false)}
                                            onChange={(event) => setRenameDraft(event.target.value)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter") void commitRename();
                                                if (event.key === "Escape") setRenaming(false);
                                            }}
                                            spellCheck={false}
                                            value={renameDraft}
                                        />
                                    ) : (
                                        <Name>{selected}</Name>
                                    )}
                                    {gone && (
                                        <Gone title={t("scripts.fileGone")}>
                                            <AlertTriangleIcon size={14}/>
                                        </Gone>
                                    )}
                                    {dirty && <Dirty title={t("settings.unsaved")}/>}
                                    <GhostButton
                                        disabled={busy}
                                        onClick={startRename}
                                        title={t("scripts.rename")}
                                        type="button"
                                    >
                                        <EditIcon size={15}/>
                                    </GhostButton>
                                    <GhostButton
                                        disabled={busy}
                                        onClick={() => void open()}
                                        title={t("scripts.openExternal")}
                                        type="button"
                                    >
                                        <ExternalLinkIcon size={15}/>
                                    </GhostButton>
                                    <GhostButton
                                        disabled={!dirty || busy}
                                        onClick={() => void save()}
                                        title="Ctrl+S"
                                        type="button"
                                    >
                                        {dirty ? t("scripts.save") : t("scripts.saved")}
                                    </GhostButton>
                                    <DangerButton $armed={armed} disabled={busy} onClick={() => void remove()}
                                                  type="button">
                                        {armed ? t("scripts.deleteConfirm") : <TrashIcon size={15}/>}
                                    </DangerButton>
                                </EditorHeader>

                                <TestBar>
                                    <TestInput
                                        onChange={(event) => setTestUrl(event.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") void runTest();
                                        }}
                                        placeholder={t("scripts.testPlaceholder")}
                                        spellCheck={false}
                                        value={testUrl}
                                    />
                                    <PrimaryButton
                                        disabled={testing || busy || testUrl.trim().length === 0}
                                        onClick={() => void runTest()}
                                        type="button"
                                    >
                                        <PlayIcon size={14}/>
                                        {t("scripts.test")}
                                    </PrimaryButton>
                                </TestBar>

                                {test && (
                                    <TestOutput $error={test.error !== null}>
                                        {test.error === null ? (
                                            <ResultRow>
                                                <ResultLabel>{t("scripts.testFinalUrl")}</ResultLabel>
                                                <ResultUrl>{test.url}</ResultUrl>
                                            </ResultRow>
                                        ) : (
                                            <ResultUrl $error>{test.error}</ResultUrl>
                                        )}
                                    </TestOutput>
                                )}

                                <CodeEditor onChange={setContent} value={content}/>
                            </>
                        ) : (
                            <Placeholder>
                                <CodeIcon size={30}/>
                                <span>{t("scripts.noScript")}</span>
                            </Placeholder>
                        )}
                    </EditorCard>

                    <Logs>
                        <LogHeader>
                            <span>{t("scripts.logs")}</span>
                            <GhostButton onClick={() => void clearScriptLogs().then(() => setLogs([]))} type="button">
                                {t("scripts.clearLogs")}
                            </GhostButton>
                        </LogHeader>

                        <LogBody ref={logBody}>
                            {logs.length === 0 && <Empty>{t("scripts.logsEmpty")}</Empty>}
                            {logs.map((entry, index) => (
                                <LogLine $error={entry.level === "error"} key={`${entry.time}-${index}`}>
                                    <time>{entry.time}</time>
                                    <ScriptName>{entry.script}</ScriptName>
                                    <span>{entry.message}</span>
                                </LogLine>
                            ))}
                        </LogBody>
                    </Logs>
                </Main>
            </Workspace>
        </Page>
    );
};

const Page = styled(PageContainer)`
    height: 100%;
    min-height: 420px;
    gap: 16px;
`;

const Workspace = styled.div`
    display: flex;
    flex: 1;
    gap: 16px;
    min-height: 0;
`;

const ListPane = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 280px;
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.75);
    overflow: hidden;
`;

const ListHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: #9ca3af;
    flex-shrink: 0;
`;

const Count = styled.span`
    padding: 1px 7px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    font-size: 0.7rem;
    color: #9ca3af;
`;

const Spacer = styled.div`
    flex: 1;
`;

const Folder = styled.span`
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 0;
    color: #6b7280;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 110px;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    min-height: 0;
    padding: 10px 10px 118px;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.28) transparent;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.28);
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.45);
    }
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

const Dock = styled.div`
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.94);
    backdrop-filter: blur(14px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
`;

const DockStack = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const DockRow = styled.div`
    display: flex;
    gap: 8px;
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 12px;
    min-width: 0;
    min-height: 0;
`;

const EditorCard = styled.section`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.75);
    overflow: hidden;
`;

const EditorHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    color: #9ca3af;
    flex-shrink: 0;
`;

const Name = styled.strong`
    flex: 1;
    font-size: 0.85rem;
    color: #f9fafb;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const RenameInput = styled.input`
    flex: 1;
    min-width: 0;
    padding: 4px 8px;
    border-radius: 6px;
    border: 1px solid rgba(99, 102, 241, 0.6);
    background: rgba(15, 23, 42, 0.9);
    color: #f9fafb;
    font-family: var(--font-mono);
    font-size: 0.82rem;

    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
`;

const Gone = styled.span`
    display: grid;
    place-items: center;
    color: #fbbf24;
    flex-shrink: 0;
`;

const Dirty = styled.span`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #fbbf24;
    flex-shrink: 0;
`;

const TestBar = styled.div`
    display: flex;
    gap: 8px;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    flex-shrink: 0;
`;

const TestInput = styled.input`
    flex: 1;
    min-width: 0;
    padding: 7px 10px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(15, 23, 42, 0.9);
    color: #f9fafb;
    font-family: var(--font-mono);
    font-size: 0.78rem;

    &:focus {
        outline: none;
        border-color: rgba(99, 102, 241, 0.6);
    }

    &::placeholder {
        color: #6b7280;
    }
`;

const TestOutput = styled.div<{ $error: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 8px 14px;
    max-height: 120px;
    overflow-y: auto;
    flex-shrink: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: ${(props) => (props.$error ? "rgba(239, 68, 68, 0.1)" : "rgba(15, 23, 42, 0.55)")};
    font-family: var(--font-mono);
    font-size: 0.75rem;
`;

const ResultRow = styled.div`
    display: flex;
    gap: 8px;
    align-items: baseline;
`;

const ResultLabel = styled.span`
    color: #6b7280;
    flex-shrink: 0;
`;

const ResultUrl = styled.span<{ $error?: boolean }>`
    color: ${(props) => (props.$error ? "#f87171" : "#93c5fd")};
    overflow-wrap: anywhere;
`;

const Placeholder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    flex: 1;
    padding: 32px;
    color: #6b7280;
    font-size: 0.85rem;
    text-align: center;
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
    flex-shrink: 0;
`;

const DraftInput = styled.input`
    width: 100%;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(15, 23, 42, 0.9);
    color: #f9fafb;
    font-family: var(--font-mono);
    font-size: 0.8rem;

    &:focus {
        outline: none;
        border-color: rgba(99, 102, 241, 0.6);
    }

    &::placeholder {
        color: #6b7280;
    }
`;

const Logs = styled.section`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.75);
    overflow: hidden;
`;

const LogHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 0.8rem;
    font-weight: 600;
    color: #f9fafb;
`;

const LogBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 8px 0;
    height: 132px;
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

const PrimaryButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
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
    display: inline-flex;
    align-items: center;
    justify-content: center;
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

/** The two secondary actions in the dock share the row evenly. */
const DockGhostButton = styled(GhostButton)`
    flex: 1;
`;

const DangerButton = styled(GhostButton)<{ $armed: boolean }>`
    display: grid;
    place-items: center;
    min-width: 34px;
    color: ${(props) => (props.$armed ? "#fecaca" : "#9ca3af")};
    border-color: ${(props) => (props.$armed ? "rgba(239, 68, 68, 0.6)" : "rgba(255, 255, 255, 0.12)")};
    background: ${(props) => (props.$armed ? "rgba(239, 68, 68, 0.18)" : "transparent")};
`;
