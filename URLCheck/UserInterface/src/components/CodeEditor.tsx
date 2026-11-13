import {useEffect, useRef} from "react";
import styled from "styled-components";
import {EditorState} from "@codemirror/state";
import {
    drawSelection,
    EditorView,
    highlightActiveLine,
    highlightActiveLineGutter,
    highlightSpecialChars,
    keymap,
    lineNumbers,
    rectangularSelection,
} from "@codemirror/view";
import {defaultKeymap, history, historyKeymap, indentWithTab} from "@codemirror/commands";
import {highlightSelectionMatches, search, searchKeymap} from "@codemirror/search";
import {
    bracketMatching,
    foldGutter,
    HighlightStyle,
    indentOnInput,
    StreamLanguage,
    syntaxHighlighting,
} from "@codemirror/language";
import {lua} from "@codemirror/legacy-modes/mode/lua";
import {tags} from "@lezer/highlight";
import {useLocale} from "@photino-net-utils/bridge";

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
}

/** Search-panel strings, which CodeMirror would otherwise leave in English. */
const SEARCH_PHRASES: Record<string, Record<string, string>> = {
    en: {},
    ja: {
        close: "閉じる",
        Find: "検索",
        Replace: "置換",
        next: "次へ",
        previous: "前へ",
        replace: "置換",
        "replace all": "すべて置換",
        all: "すべて選択",
        "match case": "大文字と小文字を区別",
        regexp: "正規表現",
        "by word": "単語単位",
        "Go to line": "行へ移動",
        "current match": "現在の一致",
        "on line": "行",
        go: "移動",
    },
    "zh-CN": {
        close: "关闭",
        Find: "查找",
        Replace: "替换",
        next: "下一个",
        previous: "上一个",
        replace: "替换",
        "replace all": "全部替换",
        all: "全选",
        "match case": "区分大小写",
        regexp: "正则表达式",
        "by word": "全字匹配",
        "Go to line": "跳转到行",
        "current match": "当前匹配",
        "on line": "行",
        go: "跳转",
    },
    "zh-TW": {
        close: "關閉",
        Find: "尋找",
        Replace: "取代",
        next: "下一個",
        previous: "上一個",
        replace: "取代",
        "replace all": "全部取代",
        all: "全選",
        "match case": "區分大小寫",
        regexp: "正規表示式",
        "by word": "全字拼寫",
        "Go to line": "跳至行",
        "current match": "目前相符",
        "on line": "行",
        go: "跳至",
    },
};

const phrasesFor = (locale: string) =>
    SEARCH_PHRASES[locale] ?? SEARCH_PHRASES[locale.split("-")[0]] ?? SEARCH_PHRASES.en;

const luaLanguage = StreamLanguage.define(lua);

/** The palette the app already used for Lua, so the editor keeps its look. */
const luaHighlight = HighlightStyle.define([
    {tag: tags.comment, color: "var(--text-muted)", fontStyle: "italic"},
    {tag: tags.keyword, color: "var(--syntax-keyword)"},
    {tag: tags.string, color: "var(--success)"},
    {tag: tags.number, color: "var(--warning-strong)"},
    {tag: tags.bool, color: "var(--warning-strong)"},
    {tag: tags.null, color: "var(--warning-strong)"},
    {tag: tags.operator, color: "var(--syntax-operator)"},
    {tag: tags.punctuation, color: "var(--text-secondary)"},
    {tag: tags.propertyName, color: "var(--accent-soft)"},
    {tag: [tags.function(tags.variableName), tags.function(tags.propertyName)], color: "var(--syntax-function)"},
    {tag: tags.variableName, color: "var(--text-strong)"},
]);

/** Dark theme with the app's colours, including the search panel the editor opens with Ctrl+F. */
const theme = EditorView.theme({
    "&": {
        height: "100%",
        backgroundColor: "transparent",
        color: "var(--text-strong)",
        fontSize: "13px",
    },
    "&.cm-focused": {outline: "none"},
    ".cm-scroller": {fontFamily: "var(--font-mono)", lineHeight: "1.55"},
    ".cm-content": {padding: "16px 0", caretColor: "var(--accent-soft)"},
    ".cm-line": {padding: "0 16px 0 4px"},
    ".cm-gutters": {
        backgroundColor: "transparent",
        color: "var(--text-muted)",
        border: "none",
        paddingLeft: "8px",
    },
    ".cm-activeLineGutter": {backgroundColor: "transparent", color: "var(--text-secondary)"},
    ".cm-activeLine": {backgroundColor: "var(--border-faint)"},
    ".cm-cursor, .cm-dropCursor": {borderLeftColor: "var(--accent-soft)"},
    ".cm-selectionBackground, .cm-content ::selection": {
        backgroundColor: "rgba(96, 165, 250, 0.3)",
    },
    ".cm-searchMatch": {
        backgroundColor: "rgba(250, 204, 21, 0.25)",
        outline: "1px solid rgba(250, 204, 21, 0.4)",
    },
    ".cm-searchMatch.cm-searchMatch-selected": {backgroundColor: "rgba(250, 204, 21, 0.5)"},
    ".cm-selectionMatch": {backgroundColor: "rgba(96, 165, 250, 0.18)"},
    ".cm-matchingBracket, .cm-nonmatchingBracket": {
        backgroundColor: "rgba(148, 163, 184, 0.25)",
        outline: "none",
    },
    ".cm-foldGutter": {color: "var(--text-muted)"},
    ".cm-panels": {backgroundColor: "var(--bg-secondary)", color: "var(--text-primary)"},
    ".cm-panels.cm-panels-top": {borderBottom: "1px solid var(--border)"},
    ".cm-panel.cm-search": {padding: "6px 8px", fontFamily: "var(--font-sans)"},
    ".cm-panel.cm-search input, .cm-panel.cm-search button, .cm-panel.cm-search label": {fontSize: "12px"},
    ".cm-panel.cm-search input": {
        backgroundColor: "var(--surface)",
        color: "var(--text-primary)",
        border: "1px solid var(--border-hover)",
        borderRadius: "6px",
        padding: "3px 6px",
    },
    ".cm-panel.cm-search button": {
        backgroundColor: "var(--border)",
        color: "var(--text-primary)",
        border: "1px solid var(--border-strong)",
        borderRadius: "6px",
        padding: "2px 8px",
        cursor: "pointer",
    },
    ".cm-panel.cm-search button:hover": {backgroundColor: "var(--border-hover)"},
    ".cm-panel.cm-search [name=close]": {color: "var(--text-secondary)"},
}, {dark: true});

const Host = styled.div`
    flex: 1;
    min-height: 0;
    overflow: hidden;
`;

/**
 * The Scripts page editor. CodeMirror supplies what a textarea does not: line numbers, folding,
 * bracket matching, undo history and a search panel (Ctrl/Cmd+F), so the app does not carry its own
 * half-implemented version of each.
 */
export const CodeEditor: React.FC<CodeEditorProps> = ({value, onChange}) => {
    const locale = useLocale();
    const hostRef = useRef<HTMLDivElement | null>(null);
    const viewRef = useRef<EditorView | null>(null);
    const valueRef = useRef(value);
    const changeRef = useRef(onChange);
    /** Builds a fresh state, so switching scripts also starts a fresh undo history. */
    const stateRef = useRef<(doc: string) => EditorState>(() => EditorState.create({doc: ""}));

    valueRef.current = value;
    changeRef.current = onChange;

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return;

        const extensions = [
            lineNumbers(),
            highlightActiveLineGutter(),
            highlightSpecialChars(),
            foldGutter(),
            history(),
            drawSelection(),
            indentOnInput(),
            syntaxHighlighting(luaHighlight),
            bracketMatching(),
            highlightActiveLine(),
            highlightSelectionMatches(),
            rectangularSelection(),
            search({top: true}),
            EditorState.phrases.of(phrasesFor(locale)),
            luaLanguage,
            EditorState.tabSize.of(4),
            keymap.of([...defaultKeymap, ...searchKeymap, ...historyKeymap, indentWithTab]),
            EditorView.contentAttributes.of({
                spellcheck: "false",
                autocorrect: "off",
                autocomplete: "off",
            }),
            EditorView.updateListener.of((update) => {
                if (update.docChanged) changeRef.current(update.state.doc.toString());
            }),
            theme,
        ];

        const create = (doc: string) => EditorState.create({doc, extensions});
        stateRef.current = create;

        const view = new EditorView({parent: host, state: create(valueRef.current)});

        viewRef.current = view;
        return () => {
            view.destroy();
            viewRef.current = null;
        };
    }, [locale]);

    /* Selecting another script replaces the document; typing already matches, so it is left alone. */
    useEffect(() => {
        const view = viewRef.current;
        if (!view || view.state.doc.toString() === value) return;

        view.setState(stateRef.current(value));
    }, [value]);

    return <Host ref={hostRef}/>;
};
