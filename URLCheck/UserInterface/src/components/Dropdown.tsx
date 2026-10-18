import React, {useEffect, useRef, useState} from "react";
import styled, {keyframes} from "styled-components";

export interface DropdownOption {
    value: string;
    label: string;
}

const menuUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(6px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`;

const menuDown = keyframes`
    from {
        opacity: 0;
        transform: translateY(-6px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`;

/**
 * The shared dropdown surface. Every menu in the app uses it, so they all match the popup's
 * "choose browser" list: same radius, same colours, same open animation. Callers position it by
 * placing it inside a `position: relative` element.
 */
export const DropdownMenu = styled.div<{ $up?: boolean; $stretch?: boolean }>`
    position: absolute;
    ${(props) => (props.$up ? "bottom: calc(100% + 6px);" : "top: calc(100% + 5px);")}
    left: 0;
    ${(props) => (props.$stretch ? "right: 0;" : "min-width: 200px;")}
    max-height: 260px;
    overflow-y: auto;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: #111827;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
    z-index: 30;
    transform-origin: ${(props) => (props.$up ? "bottom" : "top")};
    animation: ${(props) => (props.$up ? menuUp : menuDown)} 0.16s cubic-bezier(0.22, 1, 0.36, 1);
`;

export const DropdownItem = styled.button<{ $active?: boolean; $mono?: boolean }>`
    display: block;
    width: 100%;
    text-align: left;
    padding: 7px 9px;
    border: none;
    border-radius: 6px;
    background: ${(props) => (props.$active ? "rgba(59, 130, 246, 0.2)" : "transparent")};
    color: ${(props) => (props.$active ? "#ffffff" : "#e2e8f0")};
    font-size: ${(props) => (props.$mono ? "0.72rem" : "0.8rem")};
    font-family: ${(props) => (props.$mono ? "var(--font-mono)" : "inherit")};
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: background 0.15s ease, color 0.15s ease;

    &:hover {
        background: rgba(59, 130, 246, 0.18);
        color: #ffffff;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const Root = styled.div`
    position: relative;
    display: inline-flex;
`;

/**
 * Keeps an open menu inside the window. The popup is sized to its content and clips whatever leaves
 * it, and a menu is out of flow so it never makes the popup grow; capping its height to the space
 * the anchor really has turns an overflowing menu into a scrolling one instead.
 */
export function useMenuFit(
    open: boolean,
    up: boolean | undefined,
    anchor: React.RefObject<HTMLElement | null>
): React.CSSProperties {
    const [style, setStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        if (!open) return;

        const measure = () => {
            const rect = anchor.current?.getBoundingClientRect();
            if (!rect) return;

            // A small margin keeps the menu from touching the window edge.
            const space = up ? rect.top : window.innerHeight - rect.bottom;
            setStyle({maxHeight: Math.max(120, Math.floor(space - 10))});
        };

        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [open, up, anchor]);

    return style;
}

const Trigger = styled.button<{ $variant: "compact" | "form" }>`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    cursor: pointer;
    outline: none;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, box-shadow 0.2s ease;

    ${(props) =>
            props.$variant === "compact"
                    ? `
        height: 30px;
        max-width: 170px;
        padding: 0 8px;
        border-radius: 7px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
        color: #d1d5db;
        font-size: 0.76rem;
        line-height: 1;
    `
                    : `
        min-width: 200px;
        padding: 8px 12px;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(15, 23, 42, 0.75);
        color: #f9fafb;
        font-size: 0.875rem;
    `}
    &:hover:not(:disabled) {
        ${(props) =>
                props.$variant === "compact"
                        ? "background: rgba(255, 255, 255, 0.12); color: #f9fafb;"
                        : "border-color: rgba(255, 255, 255, 0.24);"}
    }

    &:focus-visible {
        border-color: #3b82f6;
        ${(props) => (props.$variant === "form" ? "box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);" : "")}
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const Label = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const Caret = styled.span<{ $open: boolean }>`
    flex-shrink: 0;
    font-size: 0.7em;
    opacity: 0.75;
    transition: transform 0.18s ease;
    transform: rotate(${(props) => (props.$open ? "180deg" : "0")});
`;

interface DropdownProps {
    value: string;
    options: DropdownOption[];
    onChange: (value: string) => void;
    /** `compact` for the popup toolbar, `form` for the settings rows. */
    variant?: "compact" | "form";
    /** Open above the trigger instead of below it. */
    up?: boolean;
    disabled?: boolean;
    title?: string;
}

/** A drop-in replacement for a `<select>`, sharing the app's menu styling and animation. */
export const Dropdown: React.FC<DropdownProps> = ({
                                                      value,
                                                      options,
                                                      onChange,
                                                      variant = "compact",
                                                      up,
                                                      disabled,
                                                      title,
                                                  }) => {
    const [open, setOpen] = useState(false);
    const root = useRef<HTMLDivElement>(null);
    const menuStyle = useMenuFit(open, up, root);

    /* Close on a click elsewhere or on Escape, the way a native select does. */
    useEffect(() => {
        if (!open) return;

        const onPointerDown = (event: MouseEvent) => {
            if (!root.current?.contains(event.target as Node)) setOpen(false);
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    const selected = options.find((option) => option.value === value)?.label ?? value;

    return (
        <Root ref={root}>
            <Trigger
                type="button"
                $variant={variant}
                disabled={disabled}
                title={title}
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((previous) => !previous)}
            >
                <Label>{selected}</Label>
                <Caret $open={open}>▾</Caret>
            </Trigger>

            {open && (
                <DropdownMenu $up={up} role="listbox" style={menuStyle}>
                    {options.map((option) => (
                        <DropdownItem
                            key={option.value}
                            type="button"
                            role="option"
                            aria-selected={option.value === value}
                            $active={option.value === value}
                            onClick={() => {
                                setOpen(false);
                                onChange(option.value);
                            }}
                        >
                            {option.label}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            )}
        </Root>
    );
};
