# Design System Document: The Organic Sanctuary

## 1. Overview & Creative North Star: "The Digital Greenhouse"
This design system moves away from the clinical, "app-like" aesthetic common in pet care and instead adopts the role of **The Digital Greenhouse**. Our North Star is to create a space that feels as breathable, organic, and nurturing as a premium botanical garden, now evolved with a high-contrast, airy clinical-modern aesthetic.

To break the "template" look, we employ **Intentional Asymmetry**. We do not align everything to a rigid center; instead, we use "weighted" layouts where large-scale editorial typography (Plus Jakarta Sans) sits offset against soft, overlapping organic containers. While we maintain a **Normal** spacing density (Level 2) to ensure functional utility, we prioritize visual clarity and structured hierarchy to ensure every interaction feels like a calm, guided experience.

---

### 2. Colors: Tonal Depth & The "No-Line" Rule
The palette has shifted toward a luminous, high-clarity spectrum, using a crisp white base balanced by technological blues and deep slate neutrals.

*   **Primary (`#ffffff`):** "Pure Light"—The primary driver of the interface, providing a clean, high-contrast canvas for navigation and core branding.
*   **Secondary (`#00d5fd`):** "Electric Mist"—A vibrant, cyan-leaning blue used for interactive UI elements, chips, and secondary actions to provide a modern, digital glow.
*   **Tertiary (`#2578d1`):** "Deep Azure"—An accent color used for high-contrast highlights, badges, and professional decorative elements.
*   **Neutral (`#4b7e8e`):** "Slate Horizon"—A muted, teal-grey base color for backgrounds, surfaces, and non-chromatic structural elements.

**The "No-Line" Rule:** 
Strictly prohibit 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. 
*   *Implementation:* A card (`surface_container_lowest`) sitting on a section (`surface_container_low`) creates a natural, soft boundary.

**The "Glass & Gradient" Rule:** 
For hero sections and floating navigation, use **Glassmorphism**. Combine `surface` colors at 70% opacity with a `backdrop-blur` of 20px. 
*   *Signature Texture:* Use a linear gradient from `secondary` to `tertiary` (at 15% opacity) as a subtle overlay on hero images to add a professional "editorial" sheen.

---

### 3. Typography: Editorial Authority
We use a dual-typeface system to balance modern personality with high readability.

*   **Display & Headlines (Plus Jakarta Sans):** Used for "Brand Moments." These should be set with tighter letter-spacing (-0.02em) to feel premium and custom.
    *   *Display-LG (`3.5rem`):* For main marketing claims.
    *   *Headline-SM (`1.5rem`):* For section titles.
*   **Body & Titles (Be Vietnam Pro):** A clean, humanist sans-serif for functional reading.
    *   *Body-LG (`1rem`):* Our standard for all descriptions.
    *   *Label-MD (`0.75rem`):* Used for metadata, always in Medium or Semi-Bold weight.

---

### 4. Elevation & Depth: Tonal Layering
We reject drop shadows as a primary means of hierarchy. Instead, we use **Tonal Layering**.

*   **The Layering Principle:** 
    *   Level 0 (Base): `surface`
    *   Level 1 (Sections): `surface_container_low`
    *   Level 2 (Cards/Interaction): `surface_container_lowest` (#ffffff)
*   **Ambient Shadows:** If a floating element (like a Modal or Floating Action Button) requires a shadow, it must be tinted. Use `on_surface` at 5% opacity with a 40px blur and 10px Y-offset. Never use pure black shadows.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility in forms, use `outline_variant` at 20% opacity. It should feel like a suggestion of a line, not a hard barrier.

---

### 5. Components: Soft & Intentional

**Buttons**
*   **Primary:** Background `primary`, text `on_primary`. Corner radius: `full` (pill-shaped) to emphasize friendliness and organic flow (Level 3 roundedness).
*   **Secondary:** Background `secondary_container`, text `on_secondary_container`.
*   **States:** On hover, shift the background color to the `_dim` variant (e.g., `primary_dim`) rather than adding a shadow.

**Input Fields**
*   Background: `surface_container`. 
*   Border: None (use the "Ghost Border" at 20% opacity only).
*   Corner Radius: `full` (roundedness Level 3).
*   Helper Text: Always use `label-sm` in `on_surface_variant`.

**Cards & Content Buckets**
*   **Forbid Dividers:** Do not use horizontal lines to separate content. Use Standard Spacing (Level 2) to create clear "islands" of information through rhythmic whitespace.
*   **The Overlap:** To create a custom feel, allow images of pets to "break" the container, overlapping the edge of a card or section by `spacing-4`.

**Pet-Specific Components**
*   **Health Status Chips:** Use `secondary_container` for "Neutral/Healthy" and `error_container` for "Needs Attention," ensuring high-contrast `on_` tokens are applied.
*   **Activity Timeline:** Instead of a line, use a series of `surface_container_highest` vertical blocks to connect events.

---

### 6. Do’s and Don’ts

**Do:**
*   Use **large-scale imagery** with soft-focus backgrounds to maintain the "Greenhouse" feel.
*   Use **intentional spacing**. While keeping a standard density, allow for enough white space to avoid visual clutter.
*   Apply the maximum corner radius (Level 3) to large image containers to mimic organic shapes.

**Don’t:**
*   **Don’t use 100% black text.** Always use `on_surface` for a softer look.
*   **Don’t use sharp 90-degree corners.** Every element must have a maximum rounded radius (Level 3).
*   **Don’t use standard "Grey" for disabled states.** Use `surface_dim` to keep the interface within the tinted ecosystem, even when using the neutral palette.

**Director's Note:** "Trust in pet care is built through transparency and softness. We have moved toward a more luminous, 'Pure Light' aesthetic to represent clarity and modern health. Every time you are tempted to draw a line, let the background colors define the space. Balance the pure whites with the new Electric Mist and Slate Horizon tones to keep the sanctuary feeling fresh and modern."