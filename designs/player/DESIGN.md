# Design System Document

## 1. Overview & Creative North Star: "The Stadium Pulse"
This design system is engineered to capture the electrifying tension of a match day and translate it into a high-performance, data-rich analytical environment. We are moving away from the static, corporate "spreadsheet" look of traditional fantasy sites. Our Creative North Star is **"The Stadium Pulse"**: a high-contrast, editorial aesthetic that treats player data with the same reverence as a sports magazine cover.

By utilizing aggressive typography (Space Grotesk), a sophisticated dark-mode foundation, and "glassmorphism" depth, we create a UI that feels fast and premium. We break the rigid grid through intentional overlapping elements, such as player action-shots bleeding out of card boundaries, and asymmetric data layouts that guide the eye toward the most critical stats.

---

## 2. Colors: Tonal Depth & Vibrant Energy
The palette is a sophisticated evolution of the Premier League's vibrant identity, set against a deep, technical background.

### The Palette
- **Primary (`#fdb4f8` / `#ce89ca`):** The "Neon Pink" energy. Used for critical CTAs and high-priority trends.
- **Secondary (`#00fd84` / `#006d35`):** The "Pitch Green." Reserved for positive growth metrics, "in-form" statuses, and secondary actions.
- **Tertiary (`#ff6e85` / `#fe215f`):** The "Aggressive Red." Used for warnings, injury status, or negative trends.
- **Surface (`#0e0e0e`):** A true-black foundation that allows neon accents to pop with high-end intensity.

### Strategic Application
- **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. To define layout boundaries, use background shifts. For example, a `surface-container-low` (`#131313`) card should sit on a `surface` (`#0e0e0e`) background. Contrast, not lines, defines the structure.
- **Surface Hierarchy & Nesting:** Use the `surface-container` tiers to create "nested" importance. A global navigation bar might use `surface-bright`, while a player stats table uses `surface-container-lowest` to feel "recessed" into the pitch.
- **The "Glass & Gradient" Rule:** Main action buttons and "Player of the Week" cards must use a subtle linear gradient (e.g., `primary` to `primary_container`). Use a `backdrop-blur` of 12px for overlays to maintain a sense of environmental depth.

---

## 3. Typography: The Athletic Editorial
The pairing of **Space Grotesk** and **Inter** creates a balance between aggressive sport-brand energy and data legibility.

- **Display & Headline (Space Grotesk):** These are your "shout" levels. Use `display-lg` (3.5rem) for big scorelines or rank updates. The wide, geometric nature of Space Grotesk provides an "athletic tech" feel.
- **Title & Body (Inter):** Inter is our workhorse for stats. Its high x-height ensures that player names and numerical data remain legible even at smaller scales (`body-sm`).
- **Data Labels:** Always use `label-md` or `label-sm` in uppercase with a slight letter-spacing increase (+5%) to distinguish metadata from live values.

---

## 4. Elevation & Depth: Tonal Layering
In "The Stadium Pulse," depth is not a shadow; it is a shift in light.

- **The Layering Principle:** Stack tiers to communicate hierarchy. A `surface-container-highest` (`#252626`) element is visually "closest" to the user and should contain the most critical interactive elements (e.g., a "Transfer" modal).
- **Ambient Shadows:** Shadows should only be used on "floating" elements like Tooltips or Floating Action Buttons. Use a 24px blur with 6% opacity, tinted with your `primary` color to mimic the glow of stadium floodlights.
- **The "Ghost Border" Fallback:** If a border is required for accessibility in data tables, use the `outline_variant` token at **15% opacity**. It should be felt, not seen.
- **Glassmorphism:** Navigation headers and player comparison drawers should use a semi-transparent `surface_container` with a `backdrop-blur`. This ensures the high-energy background colors bleed through, keeping the UI integrated.

---

## 5. Components

### Buttons
- **Primary:** High-energy `primary` gradient. Bold Space Grotesk text. 0.375rem (`md`) corner radius.
- **Secondary:** `secondary_container` background with `on_secondary_container` text. For "Add to Watchlist" or "View History."
- **Tertiary (Ghost):** No background. `primary` text with a subtle `primary` glow on hover.

### Player Stats Cards
- **Structure:** Forbid divider lines. Use `spacing-6` (1.5rem) to separate the player image from the stat grid.
- **Background:** Use `surface_container_low`. On hover, shift to `surface_container_high`.
- **Trends:** Use the `secondary` (green) and `tertiary` (red) tokens for Sparklines. Data visualizations should have a 2px stroke width—never 1px.

### Search & Filters
- **Input Fields:** `surface_container_lowest` backgrounds. When focused, the `ghost border` becomes a 2px `primary` border.
- **Chips:** For filtering by position (GK, DEF, MID, FWD). Use `full` roundedness. Selected state: `primary_container` with `on_primary_container` text.

### Data Lists (The Leaderboard)
- **Styling:** Vertical spacing is the divider. Use `surface_container_low` for even rows and `surface` for odd rows to create a "Zebra" effect that doesn't rely on harsh lines.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetric layouts. Allow player cut-out images to overlap the header and the content area.
- **Do** use `primary_fixed` for active states in navigation to create a "permanent glow" effect.
- **Do** lean into high-contrast typography. If a stat is important, make it `headline-lg`.
- **Do** use `spacing-8` and `spacing-10` to give data room to breathe.

### Don't
- **Don't** use 1px solid borders. It breaks the premium, "Stadium" feel.
- **Don't** use pure white (`#FFFFFF`) for large blocks of body text; use `on_surface_variant` (`#acabaa`) to reduce eye strain in dark mode.
- **Don't** use standard "drop shadows" (Black/Grey). Always tint shadows with the surface or primary hue.
- **Don't** cram data. If a card feels full, increase the spacing scale rather than shrinking the font.