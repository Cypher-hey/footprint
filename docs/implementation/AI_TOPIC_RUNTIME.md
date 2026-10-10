# AI topic adapter: implementation and verification

Source baseline: `c5916fcc00bf34566097b440cdcc73e980bb068c`, branch `docs/ai-topic-modes`.

## Build and runtime

`npm run build` copies tracked visible documentation to `build/`, compiles the author package and writes `version.json`. Implementation records remain nonpublic; the author-linked integration contract is explicitly included. Generated modes live under `asset/ai-topics/<content-hash>/<topic>/<mode>.md`; the hash includes author inputs and compiler configuration. A clean rebuild with the same source produces the same mode resources. Mermaid SVG is rendered in Chrome at runtime; no cross-platform SVG byte identity is claimed.

The compiler validates version, IDs, defaults, renderer, constrained paths, registered figure references/anchors, HTML anchor allowlist, local links, fence balance and historical heading coverage. Symlink escape and source-size limits are rejected. A shared Mermaid source is expanded at each registered reference; an existing figure heading is retained without inserting a duplicate. Code examples and table rows are checked for preservation.

The adapter uses Docute 3.4.9's existing parser/store/TOC via a Vue mixin. Each load has an immutable route/source facade and an epoch guard; stale ordinary-page and mode responses cannot update the current page. The cache key includes the manifest version and resource path; errors are evicted and can be explicitly retried. Only the selected mode is mounted. Tabs follow the manifest order, default to explanation, support arrows/Home/End, and preserve the fixed title/summary. Native TOC headings belong to the mounted mode.

Old numbered routes, source README/mode routes, oral/written/diagram aliases, 274 historical heading slugs, 20 H1 IDs and the four Agent Loop figure IDs are retained. Two renamed legacy footer headings map to the final diagram boundary section. Author Markdown links become Docute routes, with mode and anchor information. URL state controls back/forward and refresh; explicit anchors take precedence over remembered scroll. Manual tab selection returns to the top; a history traversal restores scroll after diagram layout.

`view=all` is a full-content view for browser find and printing. It renders all three author modes, prefixes explicit anchors and builds a combined TOC. This is not a new global search service. Printed content follows the selected view; choose the complete-content link before printing all modes.

Mermaid 11.17.2 is the same existing renderer, now fixed as a local static resource to avoid observed CDN failures. Upstream distribution and MIT license are preserved. SHA-256: `581ed7d74bd9048d0e3a91363927d72ef22942d7722546b27f7cc29e35390eb8`. Strict security, text/edge limits, and source retention remain enabled. Missing engine and invalid diagram states display readable fallback text/source; sibling diagrams continue.

The one current display formula (scaled dot-product attention) compiles to native MathML with its original TeX source and plain-text explanation retained. This is a narrowly defined deterministic transform, not a general TeX engine. Future unrecognized formulas remain visible text source.

## Actual checks

- `npm test`: 482 content/compilation/negative assertions, plus JavaScript syntax checks.
- `node scripts/build-site.mjs`: 20 topics, 60 modes, 57 unique figure sources; deterministic compiler comparison included in tests.
- `FOOTPRINT_PLAYWRIGHT=<existing installation> npm run test:browser`: real local Google Chrome, 60 mode loads, 114 successful Mermaid instances, current TOCs, summary/title, keyboard/refresh, old aliases, anchors, relative links/back/forward, MathML/code, state/sequence diagrams, full-content PDF, normal Markdown/Mermaid, HTTP retry, slow-response race, cache hits, blocked-engine fallback.
- Additional real Chrome checks: baseline Docute heading/H1 inventory, five fresh 375px touch contexts, history scroll after Mermaid layout, manual switch to top, changed-version cache fetch, one invalid diagram with surviving sibling, formula screenshot.

Real evidence is retained under the ignored `evidence/` directory (logs, JSON, screenshots and print PDF). Initial failures are retained separately: SVG icon IDs were initially counted as content anchors; invalid-mode normalization initially reloaded away its notice; Docute initially reinterpreted generated hash routes as anchor IDs; one narrow-screen test hit a transient CDN engine failure. The route and notice defects, duplicate caption headings discovered in visual QA, and CDN dependency failure were corrected and rerun. Test scroll probes were corrected to use `.content-wrap` and avoid the click helper scrolling an offscreen tab before recording history.

## Boundaries

Chrome on the Mini is the tested browser. Native screen-reader speech, physical phone hardware, Safari/Firefox, and exhaustive external-link availability have not been tested. Formula fallback and diagram source are preserved, but no general math renderer or complete sitewide search was added. Historical explicit/generated anchors are covered for the 20 AI topics; unrelated historical articles were not comprehensively audited. No model API, database, content scripts, XState runtime or new global software was introduced. Publication evidence and exact rollback details are recorded separately after deploying the fixed commit.
