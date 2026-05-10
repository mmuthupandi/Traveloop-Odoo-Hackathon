# Requirements Document

## Introduction

This feature enhances the Travelloop Dashboard/Home Screen with four improvements:

1. **HeroBanner dot indicators** — The banner already auto-rotates through `heroImages` every 5 seconds with smooth `AnimatePresence` transitions. This enhancement adds visible dot/indicator navigation so users can see which image is active and jump to any image manually.
2. **Quick Actions routing** — Each Quick Action card navigates to its corresponding page. The `quickActions` data already carries a `route` field and the cards already use `<a href={#/${action.route}}>`. This enhancement aligns those hrefs with the canonical `routeHashes` map from `src/lib/routes.ts` so routing is consistent across the app.
3. **Upcoming Trips routing** — Each trip card navigates to the My Trips page. The cards already use `<a href="#/my-trips">`. This enhancement verifies and formalises that behaviour using `routeHashes`.
4. **Discover Inspiration → Explore with pre-selected destination** — Clicking a destination card navigates to the Explore page and pre-populates the search query with the destination name. The `DiscoverInspiration` component already links to `#/explore?destination=${destination.country}`, but `getRouteFromHash` in `src/lib/routes.ts` performs exact-path matching and ignores query strings, so `/explore?destination=Switzerland` resolves to "home" instead of "explore". This enhancement fixes the routing function to strip query strings before matching.

## Glossary

- **HeroBanner**: The `HeroBanner` component (`src/components/HeroBanner.tsx`) that displays a full-width rotating image slideshow at the top of the Dashboard.
- **HeroBanner_Dots**: The dot indicator UI rendered inside the `HeroBanner` component, one dot per entry in `heroImages`.
- **QuickActions**: The `QuickActions` component (`src/components/QuickActions.tsx`) that renders a grid of action cards linking to app sections.
- **UpcomingTrips**: The `UpcomingTrips` component (`src/components/UpcomingTrips.tsx`) that renders a grid of upcoming trip cards.
- **DiscoverInspiration**: The `DiscoverInspiration` component (`src/components/DiscoverInspiration.tsx`) that renders a row of destination cards.
- **Router**: The hash-based routing system in `src/App.tsx` that calls `getRouteFromHash` to determine which page to render.
- **getRouteFromHash**: The function in `src/lib/routes.ts` that maps a URL hash string to an `AppRoute` value.
- **routeHashes**: The `Record<AppRoute, string>` constant in `src/lib/routes.ts` that maps each `AppRoute` to its canonical hash string (e.g. `explore → "#/explore"`).
- **ExplorePage**: The `ExplorePage` component (`src/pages/explore/ExplorePage.tsx`) that reads a `?destination=` query parameter from the hash and pre-populates the search field.
- **AppRoute**: The union type `"home" | "my-trips" | "itinerary-builder" | "explore" | "budget" | "packing" | "notes" | "profile" | "settings"` defined in `src/lib/routes.ts`.

---

## Requirements

### Requirement 1: HeroBanner Dot Indicators

**User Story:** As a traveller browsing the home screen, I want to see dot indicators below the hero image and be able to click them to jump to a specific image, so that I know how many images are in the slideshow and can navigate it at my own pace.

#### Acceptance Criteria

1. THE `HeroBanner` SHALL render one dot indicator per image in the `heroImages` array.
2. WHEN the active image changes (either by auto-rotation or by user click), THE `HeroBanner_Dots` SHALL visually distinguish the dot that corresponds to the active image from all other dots.
3. WHEN a user clicks a dot indicator, THE `HeroBanner` SHALL immediately display the image at the corresponding index and reset the 5-second auto-rotation timer.
4. WHILE the `HeroBanner` is mounted, THE `HeroBanner` SHALL continue to auto-rotate images every 5 seconds unless the user has clicked a dot, after which the timer SHALL restart from zero for the newly selected image.
5. THE `HeroBanner` SHALL apply a smooth cross-fade transition (using the existing `AnimatePresence` mechanism) when switching between images triggered by dot clicks, consistent with the auto-rotation transition.
6. THE `HeroBanner_Dots` SHALL be keyboard-accessible: each dot SHALL be a `<button>` element with an `aria-label` that identifies the image number (e.g. "Go to image 2 of 4") and the active dot SHALL carry `aria-pressed="true"`.

---

### Requirement 2: Quick Actions Navigation

**User Story:** As a traveller on the home screen, I want each Quick Action card to navigate me to the correct page when I click it, so that I can reach any section of the app in one tap.

#### Acceptance Criteria

1. WHEN a user clicks a Quick Action card, THE `QuickActions` component SHALL navigate the browser to the hash URL defined by `routeHashes[action.route]` for that card's `route` field.
2. THE `QuickActions` component SHALL derive every card's `href` from `routeHashes` rather than constructing the string `#/${action.route}` manually, so that routing remains consistent with the rest of the app.
3. IF a `quickActions` entry carries a `route` value that does not exist as a key in `routeHashes`, THEN THE `QuickActions` component SHALL fall back to `routeHashes.home` for that card's `href`.
4. THE `QuickActions` component SHALL preserve all existing visual styles, hover animations, and accessibility attributes when the href source is changed.

---

### Requirement 3: Upcoming Trips Navigation

**User Story:** As a traveller on the home screen, I want each upcoming trip card to navigate me to the My Trips page when I click it, so that I can view the full details of that trip.

#### Acceptance Criteria

1. WHEN a user clicks an Upcoming Trip card, THE `UpcomingTrips` component SHALL navigate the browser to `routeHashes["my-trips"]` (`#/my-trips`).
2. THE `UpcomingTrips` component SHALL derive the trip card `href` from `routeHashes["my-trips"]` rather than the hard-coded string `"#/my-trips"`, so that the value stays in sync with the canonical route definition.
3. THE `UpcomingTrips` component SHALL preserve all existing visual styles, hover animations, and accessibility attributes when the href source is changed.

---

### Requirement 4: Discover Inspiration → Explore Page with Pre-selected Destination

**User Story:** As a traveller browsing the home screen, I want clicking a destination card in "Discover Inspiration" to open the Explore page with that destination pre-searched, so that I can immediately see relevant results without typing.

#### Acceptance Criteria

1. WHEN a user clicks a destination card in `DiscoverInspiration`, THE `Router` SHALL resolve the resulting hash (e.g. `#/explore?destination=Switzerland`) to the `"explore"` route and render `ExplorePage`.
2. THE `getRouteFromHash` function SHALL strip any query string (everything from `?` onward) from the hash path before performing route matching, so that `/explore?destination=Switzerland` matches the same as `/explore`.
3. WHEN `ExplorePage` mounts or the hash changes to `#/explore?destination=<value>`, THE `ExplorePage` SHALL read the `destination` query parameter and set the search query field to that value.
4. WHEN the search query is set from the URL parameter, THE `ExplorePage` SHALL display a status message confirming the pre-selected destination (e.g. `Showing results for "Switzerland".`).
5. THE `DiscoverInspiration` component SHALL continue to construct destination links as `#/explore?destination=${destination.country}` without modification, as this format is already correct once `getRouteFromHash` is fixed.
6. IF the `destination` query parameter is absent or empty, THEN THE `ExplorePage` SHALL display the default unfiltered explore view with no pre-populated search query.
