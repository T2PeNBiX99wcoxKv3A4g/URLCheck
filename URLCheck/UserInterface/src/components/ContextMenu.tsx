import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {addAutoRedirect} from "../api/settings";
import {readClipboard} from "../api/system";
import {useTranslation} from "@photino-net-utils/bridge";

/** Inputs where pasting text makes no sense. */
const NON_TEXT_INPUTS = new Set([
    "button", "checkbox", "color", "file", "hidden", "image", "radio", "range", "reset", "submit",
]);

interface MenuState {
    x: number;
    y: number;
    selection: string;
    url: string | null;
    editable: HTMLElement | null;
}

const Menu = styled.div`
    position: fixed;
    z-index: 2000;
    min-width: 200px;
    padding: 4px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(15, 23, 42, 0.98);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(12px);
`;

const Item = styled.button`
    display: block;
    width: 100%;
    padding: 8px 10px;
    border: none;
    border-radius: 7px;
    background: none;
    color: #e2e8f0;
    font-size: 0.85rem;
    text-align: left;
    cursor: pointer;
    font-family: inherit;

    &:hover {
        background: rgba(59, 130, 246, 0.18);
        color: #f9fafb;
    }
`;

const Toast = styled.div`
    position: fixed;
    left: 50%;
    bottom: 24px;
    z-index: 2001;
    transform: translateX(-50%);
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid rgba(16, 185, 129, 0.3);
    background: rgba(6, 78, 59, 0.95);
    color: #6ee7b7;
    font-size: 0.8rem;
    pointer-events: none;
`;

function isTextControl(element: Element | null): element is HTMLElement {
    if (!element) return false;
    if (element instanceof HTMLTextAreaElement) return true;
    if (element instanceof HTMLInputElement) return !NON_TEXT_INPUTS.has(element.type);
    return element instanceof HTMLElement && element.isContentEditable;
}

function findEditable(element: Element | null): HTMLElement | null {
    for (let node: Element | null = element; node; node = node.parentElement)
        if (isTextControl(node)) return node;

    return null;
}

/** Writes the whole value through the native setter, so React sees it as a real change. */
function setValue(control: HTMLInputElement | HTMLTextAreaElement, value: string) {
    const prototype = control instanceof HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;

    Object.getOwnPropertyDescriptor(prototype, "value")?.set?.call(control, value);
}

/** Inserts text at the caret of an input, textarea or contenteditable element. */
function insertText(control: HTMLElement, text: string) {
    control.focus();

    if (control.isContentEditable) {
        document.execCommand("insertText", false, text);
        return;
    }

    const input = control as HTMLInputElement | HTMLTextAreaElement;
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;

    setValue(input, input.value.slice(0, start) + text + input.value.slice(end));
    input.dispatchEvent(new Event("input", {bubbles: true}));
    input.setSelectionRange(start + text.length, start + text.length);
}

/**
 * The app's own right-click menu. The web view's built-in one is disabled, so this is the only one;
 * it only appears when there is something it can offer.
 */
export const ContextMenu: React.FC = () => {
    const t = useTranslation();
    const [menu, setMenu] = useState<MenuState | null>(null);
    const [toast, setToast] = useState<string | null>(null);
    const toastTimer = useRef<number | undefined>(undefined);

    const flash = (message: string) => {
        setToast(message);
        window.clearTimeout(toastTimer.current);
        toastTimer.current = window.setTimeout(() => setToast(null), 1800);
    };

    useEffect(() => {
        const onContextMenu = (event: MouseEvent) => {
            const target = event.target instanceof Element ? event.target : null;
            const selection = window.getSelection()?.toString().trim() ?? "";
            const url = target?.closest<HTMLElement>("[data-history-url]")?.dataset.historyUrl ?? null;
            const editable =
                findEditable(target) ??
                findEditable(document.activeElement instanceof Element ? document.activeElement : null);

            // Nothing to offer means no menu at all.
            if (!selection && !url && !editable) {
                setMenu(null);
                return;
            }

            event.preventDefault();
            setMenu({
                x: Math.max(8, Math.min(event.clientX, window.innerWidth - 220)),
                y: Math.max(8, Math.min(event.clientY, window.innerHeight - 240)),
                selection,
                url,
                editable,
            });
        };

        document.addEventListener("contextmenu", onContextMenu);
        return () => document.removeEventListener("contextmenu", onContextMenu);
    }, []);

    useEffect(() => {
        if (!menu) return;

        const close = () => setMenu(null);
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenu(null);
        };

        window.addEventListener("click", close);
        window.addEventListener("scroll", close, true);
        window.addEventListener("resize", close);
        window.addEventListener("keydown", onKey);

        return () => {
            window.removeEventListener("click", close);
            window.removeEventListener("scroll", close, true);
            window.removeEventListener("resize", close);
            window.removeEventListener("keydown", onKey);
        };
    }, [menu]);

    useEffect(() => () => window.clearTimeout(toastTimer.current), []);

    const copy = async (value: string) => {
        setMenu(null);
        try {
            await navigator.clipboard.writeText(value);
            flash(t("popup.copied"));
        } catch {
            // The clipboard was refused; nothing sensible to show.
        }
    };

    const paste = async (editable: HTMLElement) => {
        setMenu(null);
        try {
            const text = await readClipboard();
            if (text) insertText(editable, text);
        } catch {
            // The clipboard was unavailable; leave the field untouched.
        }
    };

    const addRedirect = async (url: string) => {
        setMenu(null);
        try {
            await addAutoRedirect(url);
            flash(t("history.autoRedirectAdded"));
        } catch {
            // The settings page can still add the host by hand.
        }
    };

    return (
        <>
            {menu && (
                <Menu style={{left: menu.x, top: menu.y}}>
                    {menu.selection && (
                        <Item type="button" onClick={() => copy(menu.selection)}>
                            {t("popup.copy")}
                        </Item>
                    )}
                    {menu.url && (
                        <Item type="button" onClick={() => copy(menu.url!)}>
                            {t("context.copyUrl")}
                        </Item>
                    )}
                    {menu.editable && (
                        <Item type="button" onClick={() => paste(menu.editable!)}>
                            {t("context.paste")}
                        </Item>
                    )}
                    {menu.url && (
                        <Item type="button" onClick={() => addRedirect(menu.url!)}>
                            {t("history.addAutoRedirect")}
                        </Item>
                    )}
                </Menu>
            )}
            {toast && <Toast>{toast}</Toast>}
        </>
    );
};
