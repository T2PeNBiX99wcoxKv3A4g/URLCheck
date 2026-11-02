/** Links to the generated static pages in a build, and to the SPA routes in dev. */
export const docsHref = (slug: string) =>
    import.meta.env.DEV ? `#/docs/${slug}` : `docs/${slug}/`;

export const scriptsHref = () => import.meta.env.DEV ? "#/scripts" : "scripts/";

export const homeHref = () => import.meta.env.DEV ? "#/" : "./";
