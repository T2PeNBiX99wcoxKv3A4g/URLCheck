import type {RemoveParamRule} from "../api/filters";

/**
 * The filter rules compiled once into lookups, so a URL can be cleaned without re-parsing every
 * pattern. Rules with no restriction at all are split into literals and regular expressions;
 * restricted rules keep their matchers pre-built.
 */
export interface CompiledRules {
    globalLiterals: Set<string>;
    globalRegex: RegExp[];
    scopes: CompiledScope[];
}

interface CompiledScope {
    /** Host matcher, or null when the rule is not limited to a host. */
    host: RegExp | null;
    /** Full-URL matcher (ClearURLs providers), or null when the rule is not limited to one. */
    url: RegExp | null;
    exclude: RegExp[] | null;
    urlExceptions: RegExp[] | null;
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
        // A rule with no restriction at all applies to every URL.
        const unrestricted =
            !rule.urlPattern && !rule.include?.length && !rule.exclude?.length && !rule.urlExceptions?.length;
        if (unrestricted) {
            if (rule.regex) compiled.globalRegex.push(new RegExp(rule.pattern, "i"));
            else compiled.globalLiterals.add(rule.pattern.toLowerCase());
            continue;
        }

        // A rule limited to several hosts becomes one scope per host, sharing the other limits.
        for (const host of rule.include?.length ? rule.include : [null]) {
            compiled.scopes.push({
                host: host ? hostPattern(host) : null,
                url: rule.urlPattern ? new RegExp(rule.urlPattern, "i") : null,
                exclude: rule.exclude?.map(hostPattern) ?? null,
                urlExceptions: rule.urlExceptions?.map((pattern) => new RegExp(pattern, "i")) ?? null,
                literals: rule.regex ? new Set() : new Set([rule.pattern.toLowerCase()]),
                regex: rule.regex ? [new RegExp(rule.pattern, "i")] : [],
            });
        }
    }

    return compiled;
}

function isTracked(key: string, rules: CompiledRules, host: string, url: string): boolean {
    const name = key.toLowerCase();
    if (rules.globalLiterals.has(name)) return true;
    if (rules.globalRegex.some((expression) => expression.test(key))) return true;

    for (const scope of rules.scopes) {
        if (scope.host && !scope.host.test(host)) continue;
        if (scope.url && !scope.url.test(url)) continue;
        if (scope.exclude?.some((expression) => expression.test(host))) continue;
        if (scope.urlExceptions?.some((expression) => expression.test(url))) continue;
        if (scope.literals.has(name)) return true;
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

    return [...parsed.searchParams.keys()].filter((key) => isTracked(key, rules, parsed.hostname, url));
}

/** Removes every tracking parameter from the URL. */
export function stripTrackingParams(url: string, rules: CompiledRules): string {
    const parsed = parse(url);
    if (!parsed) return url;

    for (const key of [...parsed.searchParams.keys()]) {
        if (isTracked(key, rules, parsed.hostname, url)) parsed.searchParams.delete(key);
    }

    return parsed.toString();
}
