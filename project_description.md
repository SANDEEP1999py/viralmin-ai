Search complete: Project structure and file purpose analysis

Searched for files matching `**/*`, 38 matches

Searched for text `purpose|function|description|usage|role|responsibility|main` (`**/README.md`), no results

Searched for text `purpose|function|description|usage|role|responsibility|main` (`**/project_documentation.html`), 4 results

Searched for text `purpose|function|description|usage|role|responsibility|main` (`**/*.ts`), 10 results

Searched for text `purpose|function|description|usage|role|responsibility|main` (`**/*.tsx`), 15 results

Searched for text `purpose|function|description|usage|role|responsibility|main` (`**/*.json`), 20 results

Searched for text `purpose|function|description|usage|role|responsibility|main` (`**/*.mjs`), no results

Read [](file:///c%3A/Sandy%20d%20drive%20data/viral_mind_v01/viralmind-ai/project_documentation.html#98-98), lines 98 to 120

Read [](file:///c%3A/Sandy%20d%20drive%20data/viral_mind_v01/viralmind-ai/project_documentation.html#121-121), lines 121 to 180

Read [](file:///c%3A/Sandy%20d%20drive%20data/viral_mind_v01/viralmind-ai/project_documentation.html#1-1), lines 1 to 97

Read [](file:///c%3A/Sandy%20d%20drive%20data/viral_mind_v01/viralmind-ai/project_documentation.html#181-181), lines 181 to 233

Searched for files matching `**/*`, 38 matches

Here is a detailed breakdown of your project structure, the language used in each file, and the function of every folder and file:

---

### Root-Level Files

- **package.json**: (JSON) Node.js/Next.js project manifest. Lists dependencies, scripts, and project metadata.
- **package-lock.json**: (JSON) Auto-generated lockfile for npm, ensures consistent installs.
- **tsconfig.json**: (JSON) TypeScript configuration for compiler options.
- **eslint.config.mjs**: (JavaScript/ESM) ESLint configuration for code linting.
- **postcss.config.mjs**: (JavaScript/ESM) PostCSS configuration for CSS processing.
- **next.config.ts**: (TypeScript) Next.js configuration file.
- **README.md**: (Markdown) Project overview and instructions.
- **project_documentation.html**: (HTML) Full documentation of the project, including architecture, folder structure, and code explanations.
- **.gitignore**: (Text) Specifies files/folders to ignore in git.

---

### app/ (Next.js App Router)

- **globals.css**: (CSS) Global Tailwind CSS styles.
- **layout.tsx**: (TypeScript/React) Root layout for all pages, sets up HTML shell and global styles.
- **page.tsx**: (TypeScript/React) Landing page with hero animation and CTA.
- **dashboard/page.tsx**: (TypeScript/React) Main dashboard, renders pipeline steps based on state.

#### app/api/ (Backend Route Handlers)

- **search/route.ts**: (TypeScript) POST endpoint. Calls Tavily API, fetches search results, formats context.
- **analyze/route.ts**: (TypeScript) Step 2. Merges meeting text and search context, outputs problems/solutions/trends using LLM.
- **tweets/route.ts**: (TypeScript) Step 3. Generates viral tweets from analysis.
- **topics/route.ts**: (TypeScript) Step 4. Suggests video topics based on tweets/problems.
- **scripts/route.ts**: (TypeScript) Step 5. Generates scripts for selected topics in different tones.

---

### components/

#### components/pipeline/ (UI Modular Views)

- **SummaryInput.tsx**: (TypeScript/React) Form for CEO name, audience, and meeting summary. Triggers search.
- **ProblemSolution.tsx**: (TypeScript/React) Displays problems, solutions, and trends.
- **TweetGenerator.tsx**: (TypeScript/React) Shows generated tweets with copy buttons.
- **TopicSelector.tsx**: (TypeScript/React) Grid for selecting video topics.
- **ScriptViewer.tsx**: (TypeScript/React) Dual-tab for viewing scripts in different tones.
- **StepIndicator.tsx**: (TypeScript/React) Progress bar for pipeline steps.

#### components/ui/

- **Loader.tsx**: (TypeScript/React) Loading spinner component.
- **CopyButton.tsx**: (TypeScript/React) Button to copy content to clipboard.

---

### lib/ (Core Logic)

- **firebase.ts**: (TypeScript) Firebase setup for database/auth.
- **groq.ts**: (TypeScript) Groq AI SDK wrapper for chat completions, enforces JSON output.
- **prompts.ts**: (TypeScript) Contains prompt templates and logic for LLM, ensures structured outputs.
- **tavily.ts**: (TypeScript) Tavily API integration for web search.

---

### store/

- **pipeline.ts**: (TypeScript) Zustand store for managing pipeline state (profile, analysis, tweets, topics, etc.).

---

### types/

- **index.ts**: (TypeScript) Custom TypeScript interfaces and types (e.g., CEOProfile, AnalysisOutput, Tweet).

---

### public/

- **next.svg, globe.svg, file.svg, vercel.svg, window.svg**: (SVG) Static assets/icons for UI.
- **favicon.ico**: (ICO) App favicon.

---

This project is a modern TypeScript/React (Next.js) application with a strong focus on AI-powered content generation, using modular UI components, API routes for backend logic, and strict type safety throughout. If you want a deeper dive into any specific file or logic, let me know!