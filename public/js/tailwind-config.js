/**
 * Ceylonspizee Global - Tailwind CSS Configuration
 * Centralized theme configuration for consistent styling across all pages
 */

tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "on-secondary": "#ffffff",
                "on-surface-variant": "#52443b",
                "surface-dim": "#dcd9d9",
                "on-tertiary": "#ffffff",
                "on-primary-fixed-variant": "#6a3b10",
                "inverse-surface": "#313030",
                "on-secondary-fixed": "#1d1c17",
                "background": "#fcf9f8",
                "surface-container-high": "#eae7e7",
                "primary-container": "#7c4a1e",
                "on-tertiary-container": "#9bdab8",
                "surface-container-low": "#f6f3f2",
                "on-error-container": "#93000a",
                "tertiary-fixed-dim": "#95d4b3",
                "primary": "#603308",
                "error-container": "#ffdad6",
                "surface-container-lowest": "#ffffff",
                "inverse-on-surface": "#f3f0ef",
                "on-primary-container": "#ffbe8c",
                "secondary-fixed": "#e7e2da",
                "on-error": "#ffffff",
                "tertiary-fixed": "#b1f0ce",
                "surface-container": "#f0eded",
                "secondary-container": "#e7e2da",
                "on-primary-fixed": "#2f1500",
                "tertiary": "#004930",
                "surface-bright": "#fcf9f8",
                "primary-fixed-dim": "#fdb882",
                "outline-variant": "#d6c3b6",
                "error": "#ba1a1a",
                "on-primary": "#ffffff",
                "on-secondary-fixed-variant": "#494741",
                "on-background": "#1b1b1b",
                "surface-container-highest": "#e5e2e1",
                "on-tertiary-fixed-variant": "#0e5138",
                "tertiary-container": "#236147",
                "surface-variant": "#e5e2e1",
                "on-secondary-container": "#67645e",
                "surface": "#fcf9f8",
                "surface-tint": "#865225",
                "primary-fixed": "#ffdcc3",
                "outline": "#847469",
                "secondary-fixed-dim": "#cac6be",
                "on-tertiary-fixed": "#002114",
                "on-surface": "#1b1b1b",
                "inverse-primary": "#fdb882",
                "secondary": "#615e58"
            },
            "borderRadius": {
                "DEFAULT": "0.125rem",
                "lg": "0.25rem",
                "xl": "0.5rem",
                "full": "0.75rem"
            },
            "spacing": {
                "unit": "8px",
                "section-gap": "120px",
                "margin-desktop": "80px",
                "gutter": "24px",
                "margin-mobile": "20px"
            },
            "fontFamily": {
                "label-bold": ["Be Vietnam Pro"],
                "hero-display": ["Newsreader"],
                "body-main": ["Be Vietnam Pro"],
                "section-heading": ["Newsreader"],
                "meta-data": ["Be Vietnam Pro"]
            },
            "fontSize": {
                "label-bold": ["12px", {"lineHeight": "1.2", "fontWeight": "700"}],
                "label-bold-md": ["14px", {"lineHeight": "1.2", "fontWeight": "700"}],
                "hero-display": ["32px", {"lineHeight": "1.15", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                "hero-display-sm": ["40px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                "hero-display-md": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                "hero-display-lg": ["56px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                "body-main": ["14px", {"lineHeight": "1.6", "fontWeight": "400"}],
                "body-main-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                "section-heading": ["22px", {"lineHeight": "1.3", "fontWeight": "600"}],
                "section-heading-md": ["28px", {"lineHeight": "1.3", "fontWeight": "600"}],
                "meta-data": ["11px", {"lineHeight": "1.4", "letterSpacing": "0.05em", "fontWeight": "400"}],
                "meta-data-md": ["12px", {"lineHeight": "1.4", "letterSpacing": "0.05em", "fontWeight": "400"}]
            }
        }
    }
};
