---
trigger: always_on
---

TeamStorage Implementation Plan (Nuxt 4 + Tailwind)
Goal Description
Build "TeamStorage", a premium file storage application frontend using Nuxt 4 and Tailwind CSS. The app will feature user authentication and file management capabilities (upload, creation, move, share). Design Note: The UI will be modern, vibrant, and distinct, drawing inspiration from high-end SaaS products rather than being a direct visual clone of Google Drive.

User Review Required
NOTE

All backend logic is mocked in the frontend using Pinia stores. Nuxt 4 is currently being used as requested.
Also dont call npm run dev ( me doing alone for review )

Proposed Changes
Project Structure
layouts/: Auth (simple centered layout) and Dashboard (Sidebar + Header + Content).
pages/: Setup routing for Login, Register, Dashboard, and Folder views.
components/: Reusable UI components (Input, Button, FileCard, FolderCard, Modal).
stores/:
auth.ts: Handle login/register logic and user session.
drive.ts: Manage file system state (files, folders, current directory).
Dependencies
nuxt: version 4 (or latest compatible)
@nuxtjs/tailwindcss: Styling
pinia: State management
@pinia/nuxt: Nuxt module for Pinia
phosphor-icons-vue or @heroicons/vue: Icon library.
@vueuse/core: Utility functions.
key Features Implementation
Authentication: Simple form validation with dummy check against hardcoded users or local storage.
File System:
Flat structure or hierarchical structure stored in Pinia.
Each item (file/folder) has: id, name, type, parentId, size, createdAt, owner, sharedLink.
Move: Change parentId of the item.
Upload: Add item to the store with the current folder as parentId.
Share: Generate a temporary link (mocked logic with timestamp).
Verification Plan
Automated Tests
None planned for this stage (MVP/Prototype).
Manual Verification
Auth Flow:
Try logging in with valid/invalid credentials.
Register a new user and verify redirection to dashboard.
File Operations:
Create a new folder -> Verify it appears in the list.
Upload a file -> Verify it appears.
Navigate into a folder -> Verify breadcrumbs and content update.
Move a file -> Verify it disappears from current view and appears in target folder.
Share link -> Verify a link is generated and copied (toast notification).