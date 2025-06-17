# Segment Terraform Docs Playground

This project is a local, interactive documentation site based on the official Segment Terraform provider documentation:

📚 Official Registry: https://registry.terraform.io/providers/segmentio/segment/latest/docs

---

## What This Project Is

This is a documentation and developer experience enhancement tool designed to replicate the layout and structure of the Segment Terraform Provider documentation—while adding interactive, testable code blocks for internal use.

Each documentation page represents a resource or data source defined in the Segment Terraform provider, and contains code snippets that can be:

- **Copied** to the clipboard
- **Edited** directly in the browser
- **Validated** for HCL syntax and completeness
- **Corrected** via optional integration with OpenAI Codex

The goal is to allow developers and internal users to test, verify, and better understand Terraform examples before applying them in infrastructure code.

---

## What the Pages Should Do

Each example block within a documentation page must support the following user actions:

### Copy

- Clicking this button copies the entire code snippet to the clipboard without modification.

### Try

- Clicking this button replaces the static snippet with an editable code editor.
- Users can freely modify the snippet inline.

### Use

- Clicking this button validates the current contents of the editor.
- Validation checks include:
  - Correct use of quotation marks
  - Closed brackets, braces, and proper nesting
  - Other HCL structural requirements
- If validation passes, a success message is shown.
- If validation fails, an error message is shown clearly and accessibly.

### Fix (optional)

- Clicking this button sends the current snippet to OpenAI Codex.
- Codex attempts to correct the snippet and return valid HCL.
- The returned output replaces the contents of the editor for further use or editing.

---

## Content and Structure

- Documentation content should be stored in `.mdx` files to allow embedded interactive components.
- The layout and navigation should closely mirror the official Segment registry site, with a clear hierarchy for:
  - Resources (e.g., `segment_destination_filter`)
  - Data Sources (e.g., `segment_source`)

---

## Intended Users

This is intended for internal engineers, solution architects, or documentation maintainers who:
- Want to test Terraform examples before using them
- Need a faster, interactive alternative to copying from the static registry8. Clean Up Local Terraform Artifacts

To remove everything generated locally (including state and lock files):

For Bash / macOS / Linux:

bash

CopyEdit

rm -rf .terraform terraform.tfstate terraform.tfstate.backup .terraform.lock.hcl 

For PowerShell:

powershell

CopyEdit

Remove-Item -Recurse -Force .terraform, terraform.tfstate, terraform.tfstate.backup, .terraform.lock.hcl 
- Prefer in-browser validation and optional AI-driven fixes

---

## Notes

- This project runs locally and does not interact with live infrastructure.
- The Codex integration (Fix button) is optional and should only be enabled if an OpenAI key is configured securely.


## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open <http://localhost:3000> in your browser.
4. To check code style with ESLint:
   ```bash
   npm run lint
   ```

To enable the optional **Fix** button you must set an OpenAI API key:
```bash
export NEXT_PUBLIC_OPENAI_KEY="sk-..."
```
