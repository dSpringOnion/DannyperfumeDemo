# Update Documentation Command

## Purpose
Maintain and update project documentation in the `.agent/` folder to ensure all implementation details, SOPs, and architecture docs stay in sync with the codebase.

---

## Documentation Structure

```
.agent/
├── README.md           # Index of all docs (ALWAYS update this)
├── tasks/              # PRDs and implementation plans
│   └── PRD.md         # Main product requirements
├── system/             # Architecture and technical specs
│   ├── SYSTEM_DESIGN.md      # Complete system architecture
│   ├── VISUAL_BUILDER.md     # Visual builder specs
│   └── RESEARCH_FINDINGS.md  # Best practices analysis
└── sops/               # Standard Operating Procedures
    └── (SOPs created during development)
```

---

## When to Use This Command

### 1. **Initialize Documentation** (First Time Setup)
```
/update-doc initialize
```
- Creates `.agent/` folder structure
- Generates initial project architecture doc
- Creates README.md index
- Sets up folder organization

### 2. **After Implementing Features**
```
/update-doc feature <feature-name>
```
- Update task docs with actual implementation details
- Note any deviations from original plan
- Document learnings and decisions made

### 3. **Create New SOP**
```
/update-doc sop <sop-name>
```
- Generate step-by-step procedure
- Include related documentation references
- Update README.md with new SOP entry

### 4. **After Fixing Bugs/Mistakes**
```
/update-doc fix <description>
```
- Document the mistake and solution
- Create SOP to prevent recurrence
- Update relevant system docs if needed

### 5. **Update System Architecture**
```
/update-doc system
```
- Refresh project structure documentation
- Update database schema if changed
- Document new architectural decisions

---

## What to Do When Updating Docs

### Step 1: Determine What to Update
- Did we implement a new feature? → Update task docs
- Did we establish a new process? → Create SOP
- Did we fix a recurring issue? → Create prevention SOP
- Did architecture change? → Update system docs

### Step 2: Update Relevant Files
Create or update docs in appropriate folders:

**For Features/Implementations:**
- Location: `.agent/tasks/`
- Include: implementation details, code examples, lessons learned

**For Architectural Changes:**
- Location: `.agent/system/`
- Include: diagrams, schema updates, integration points

**For Processes/Procedures:**
- Location: `.agent/sops/`
- Include: step-by-step instructions, examples, related docs

### Step 3: Update README.md Index
**CRITICAL:** Always update `.agent/README.md` to include:
- New doc file paths
- When to read each doc
- Quick reference to key information
- Related documentation links

---

## SOP Creation Guidelines

When creating a new SOP, include:

### 1. **Title and Purpose**
Clear, descriptive name of what this SOP covers

### 2. **When to Use**
Scenarios where this procedure applies

### 3. **Prerequisites**
What needs to be in place before starting

### 4. **Step-by-Step Process**
```markdown
1. **Step Name**
   - Action to take
   - Expected outcome
   - Example: `command or code`

2. **Next Step**
   - ...
```

### 5. **Related Documentation**
Links to relevant docs in `.agent/` folder:
- System architecture docs
- Related task implementations
- Other SOPs

### 6. **Common Pitfalls**
What mistakes to avoid (learned from experience)

### 7. **Examples**
Real code examples from the codebase

---

## Rules for Documentation

### Content Quality
1. **Be Specific:** Include actual file paths, function names, code examples
2. **Be Concise:** Only relevant information, no fluff
3. **Be Actionable:** Clear next steps and decisions
4. **Reference Related Docs:** Always link to relevant `.agent/` docs

### File Naming
- Use kebab-case: `add-new-model.md`
- Be descriptive: `integrating-stripe-webhooks.md` not `webhooks.md`
- Include category prefix for SOPs: `db-migration-process.md`, `api-endpoint-creation.md`

### README.md Maintenance
- Update index after every doc change
- Keep "When to Read" sections updated
- Maintain quick reference accuracy
- Add new docs to appropriate section

### Version Control
- Commit docs with related code changes
- Use conventional commits: `docs: add Stripe integration SOP`
- Keep docs in sync with codebase state

---

## Examples

### Example 1: Creating Replicate Integration SOP

**Command:**
```
/update-doc sop integrating-replicate-model
```

**What to Include:**
```markdown
# SOP: Integrating Replicate Models

## Purpose
Step-by-step process for integrating AI models from Replicate

## Prerequisites
- Replicate API key in `.env.local`
- Model URL from Replicate

## Process
1. **Install Replicate SDK**
   \`\`\`bash
   pnpm add replicate
   \`\`\`

2. **Create Model Service**
   File: `src/services/replicate.service.ts`
   \`\`\`typescript
   import Replicate from 'replicate'
   // ... implementation
   \`\`\`

3. **Create API Route**
   File: `src/app/api/generate/route.ts`
   // ... implementation

4. **Handle Webhooks**
   // ... steps

## Related Documentation
- `.agent/system/SYSTEM_DESIGN.md` - API design patterns
- `.agent/tasks/PRD.md` - Feature specifications

## Common Pitfalls
- Don't forget to handle webhook signature verification
- Always validate input before sending to Replicate

## Example
[Link to actual implementation file]
```

### Example 2: After Feature Implementation

**Command:**
```
/update-doc feature visual-builder-foundation
```

**Actions:**
1. Create `.agent/tasks/visual-builder-implementation.md`
2. Document actual vs planned approach
3. Note any technical decisions made
4. Update `.agent/README.md` with new doc

---

## Quick Commands Summary

```bash
# Initialize (first time)
/update-doc initialize

# After implementing feature
/update-doc feature <name>

# Create new SOP
/update-doc sop <name>

# After bug fix
/update-doc fix <description>

# Update architecture
/update-doc system

# General update
/update-doc
```

---

## Remember

- **Documentation is context** - Better docs = better Claude Code performance
- **Keep it current** - Stale docs are worse than no docs
- **Update README** - Always update the index
- **Link related docs** - Help Claude find relevant information
- **Be specific** - Include actual code examples and file paths

---

**Last Updated:** October 10, 2025
