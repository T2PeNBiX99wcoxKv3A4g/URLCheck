import {useEffect, useState} from "react";
import {VERSION_FILE} from "./constants";

/** A plain `x.y.z` (or `x.y`); anything else in the file is not a version worth showing. */
const PATTERN = /^\d+\.\d+/;

/**
 * The latest release, read from the repository's `.version` at runtime, so a bump there shows up
 * without waiting for the site to be rebuilt. Null until it arrives, or when GitHub cannot be read.
 */
export function useVersion(): string | null {
    const [version, setVersion] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        fetch(VERSION_FILE, {cache: "no-store", signal: controller.signal})
            .then((response) => (response.ok ? response.text() : ""))
            .then((text) => {
                const value = text.trim();
                if (PATTERN.test(value)) setVersion(value);
            })
            .catch(() => {
                // Offline or blocked: the badge simply stays hidden.
            });

        return () => controller.abort();
    }, []);

    return version;
}
