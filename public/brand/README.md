# Brand asset slots

This folder always contains assets for the active prospect build.

Use fixed filenames so the template never needs client-specific folders:

- `logo.png` — active client logo
- `hero.jpg` — optional hero image
- `wide.jpg` — optional full-width CTA image
- `feature.jpg` — optional secondary/editorial image

The site config controls whether each slot is used. For the next prospect, replace these files rather than adding another client folder.

During the manual validation phase, brand assets are selected and replaced by a human. Later, n8n or a build script can populate these same slots before deploy.
