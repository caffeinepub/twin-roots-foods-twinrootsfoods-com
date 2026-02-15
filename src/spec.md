# Specification

## Summary
**Goal:** Regenerate the Twin Roots Foods logo to be more detailed while staying visually similar to the provided reference, and add a noticeable bounce animation to the logo on page enter and internal navigation.

**Planned changes:**
- Add a new, more detailed circular Twin Roots Foods logo PNG (spice/ingredient line-art, earthy palette) with exact text “Twin Roots Foods” and curved tagline “Rooted in Purity”, stored under `frontend/public/assets/generated/`.
- Update the site header to use the new logo asset instead of `/assets/generated/logo-v4.dim_512x512.png`.
- Add the same logo image to the footer branding area near the existing “Twin Roots Foods” text.
- Implement a noticeable bounce animation on the header and footer logo images that plays on initial page load and on internal route changes.

**User-visible outcome:** The site shows an updated, more detailed Twin Roots Foods logo in both header and footer, and the logo visibly bounces when the site loads and when navigating between pages.
