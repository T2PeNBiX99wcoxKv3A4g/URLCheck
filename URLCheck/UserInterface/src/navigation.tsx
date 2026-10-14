import {createContext, useContext} from "react";
import type {TabType} from "./tabs";

/** Lets any page ask the shell to switch tabs. */
export const NavigationContext = createContext<(tab: TabType) => void>(() => {
    // no-op outside the shell
});

export function useNavigate(): (tab: TabType) => void {
    return useContext(NavigationContext);
}
