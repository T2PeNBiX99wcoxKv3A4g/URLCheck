import type {RemoveParamRule} from "../api/filters";

/**
 * The filter rules compiled once into lookups, so a URL can be cleaned without re-parsing every
 * pattern. Global rules are split into literals and regular expressions; host-scoped rules keep
 * their matchers pre-built.
 */
export interface CompiledRules {
    globalLiterals: Set<string>;
    globalRegex: RegExp[];
    scopes: CompiledScope[];
}

interface CompiledScope {
    include: RegExp;
    exclude: RegExp[] | null;
    literals: Set<string>;
    regex: RegExp[];
}

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Matches `host` against a rule host pattern: the host itself or a subdomain, with `*` wildcards. */
function hostPattern(pattern: string): RegExp {
    const source = escapeRegExp(pattern.toLowerCase()).replace(/\\\*/g, ".*");
    return new RegExp(`(^|\\.)${source}$`);
}

/** Turns the backend's rule list into lookups the popup can query per URL. */
export function compileRules(rules: RemoveParamRule[]): CompiledRules {
    const compiled: CompiledRules = {globalLiterals: new Set(), globalRegex: [], scopes: []};

    for (const rule of rules) {
        const patterns = rule.include;
        if (!patterns || patterns.length === 0) {
            if (rule.regex) compiled.globalRegex.push(new RegExp(rule.pattern, "i"));
            else compiled.globalLiterals.add(rule.pattern.toLowerCase());
            continue;
        }

        // A rule with several hosts becomes one scope per host, all sharing the exclusions.
        for (const host of patterns) {
            const scope: CompiledScope = {
                include: hostPattern(host),
                exclude: rule.exclude?.map(hostPattern) ?? null,
                literals: new Set(),
                regex: [],
            };

            if (rule.regex) scope.regex.push(new RegExp(rule.pattern, "i"));
            else scope.literals.add(rule.pattern.toLowerCase());

            compiled.scopes.push(scope);
        }
    }

    return compiled;
}

function isTracked(key: string, rules: CompiledRules, host: string): boolean {
    if (rules.globalLiterals.has(key.toLowerCase())) return true;
    if (rules.globalRegex.some((expression) => expression.test(key))) return true;

    for (const scope of rules.scopes) {
        if (!scope.include.test(host)) continue;
        if (scope.exclude?.some((expression) => expression.test(host))) continue;
        if (scope.literals.has(key.toLowerCase())) return true;
        if (scope.regex.some((expression) => expression.test(key))) return true;
    }

    return false;
}

function parse(url: string): URL | null {
    try {
        return new URL(url);
    } catch {
        return null;
    }
}

/** Returns the tracking parameter keys currently present in the URL. */
export function trackingParamKeys(url: string, rules: CompiledRules): string[] {
    const parsed = parse(url);
    if (!parsed) return [];

    return [...parsed.searchParams.keys()].filter((key) => isTracked(key, rules, parsed.hostname));
}

/** Removes every tracking parameter from the URL. */
export function stripTrackingParams(url: string, rules: CompiledRules): string {
    const parsed = parse(url);
    if (!parsed) return url;

    for (const key of [...parsed.searchParams.keys()]) {
        if (isTracked(key, rules, parsed.hostname)) parsed.searchParams.delete(key);
    }

    return parsed.toString();
}
