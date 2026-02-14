# Specification

## Summary
**Goal:** Let the site owner set and update their contact email and WhatsApp number once, and have those details reflected across the site.

**Planned changes:**
- Add a frontend utility as a single source of truth for owner contact details (email + WhatsApp), stored in localStorage with safe defaults and wa.me-safe number derivation.
- Add an Owner Dashboard section (gated by existing Owner Mode) to view/edit/save the contact email and WhatsApp number with basic validation and success feedback.
- Update header, footer, and Home page Contact section to use the stored contact details (including mailto email when set) instead of hardcoded WhatsApp placeholders.

**User-visible outcome:** The owner can enter their email and WhatsApp number in Owner Mode, and the site’s header/footer/Home contact links automatically use the saved details (and persist after refresh).
