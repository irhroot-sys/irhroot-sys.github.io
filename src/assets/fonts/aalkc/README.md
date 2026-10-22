# AALKC office typefaces

Built from AALKC's office font source package (`AALKC_Font_Source_v3.zip`,
type system v0.3), using that package's own `builder.js` and `fontmerge.js`.

| File | Family | What it is |
| --- | --- | --- |
| `AALKC-Regular.woff2`, `AALKC-Bold.woff2` | AALKC | AALKC's Latin face: capitals only (lowercase maps to capitals), digits, punctuation and the Saudi Riyal sign (U+20C1). Built offline from `glyphs.json`; every table decompiled and recompiled by fontTools when converting to WOFF2 (passing the builder's raw `glyf` straight through produced WOFF2 files FreeType rejects). Outlines, advances, cmap and kerning are unchanged. |
| `AALKCKufi-Regular.woff2`, `AALKCKufi-Bold.woff2` | AALKC Kufi | Noto Kufi Arabic 2.110 (static, hinted) merged with the AALKC Latin and Riyal sign. Subset for the web to Basic Latin, the Arabic block used on the site, common punctuation and U+20C1. |

Licence: AALKC Kufi is a derivative of Noto Kufi Arabic under the SIL Open
Font License 1.1 (`OFL.txt`, which must travel with these files). The AALKC
Latin outlines are the package's reference reconstruction; its own notes say
the underlying design rights were not assessed.

To rebuild: run the package's builder (see its README) or the same two
functions under Node, then convert/subset with fontTools.
