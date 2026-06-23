export const toolCategories = [
  {
    category: "System Operations",
    tools: [
      { name: "Bash", description: "Executes shell commands in your environment." },
      { name: "PowerShell", description: "Executes PowerShell commands natively." },
      { name: "Read", description: "Reads the contents of files." },
      { name: "Write", description: "Creates or overwrites files." },
      { name: "Edit", description: "Makes targeted edits to specific files." },
      { name: "NotebookEdit", description: "Modifies Jupyter notebook cells." },
      { name: "Glob", description: "Finds files based on pattern matching." },
      { name: "Monitor", description: "Runs a command in the background and feeds each output line back to Claude, so it can react to logs, file changes, or polled status mid-conversation." },
    ],
  },
  {
    category: "Code & Environment Intelligence",
    tools: [
      { name: "LSP", description: "Code intelligence via language servers: jump to definitions, find references, report type errors and warnings." },
      { name: "Grep", description: "Searches for patterns in file contents." },
      { name: "EnterPlanMode", description: "Switches to plan mode to design an approach before coding." },
      { name: "ExitPlanMode", description: "Presents a plan for approval and exits plan mode." },
      { name: "EnterWorktree", description: "Creates an isolated git worktree and switches into it (or switches into an existing one)." },
      { name: "ExitWorktree", description: "Exits a worktree session and returns to the original directory." },
      { name: "Skill", description: "Executes a skill within the main conversation. A skill is a reusable, packaged capability: a set of instructions, scripts, and resources that teach Claude how to perform a specific task consistently and that can be invoked on demand." },
    ],
    example: {
      title: "Example: build a skill that queries an API",
      steps: [
        {
          text: "Create a folder for the skill in your project",
          code: "mkdir -p .claude/skills/weather-lookup",
        },
        {
          text: "Add a SKILL.md describing what it does and how to query the API",
          code:
            "---\n" +
            "name: weather-lookup\n" +
            "description: Look up the current weather for a city using the Open-Meteo API. Use when the user asks about weather conditions.\n" +
            "---\n\n" +
            "# Weather Lookup\n\n" +
            "When the user asks about the weather for a city:\n\n" +
            "1. Geocode the city:\n" +
            '   curl "https://geocoding-api.open-meteo.com/v1/search?name=CITY&count=1"\n' +
            "2. Use the returned latitude/longitude to fetch current conditions:\n" +
            '   curl "https://api.open-meteo.com/v1/forecast?latitude=LAT&longitude=LON&current=temperature_2m,weather_code"\n' +
            "3. Report the temperature and conditions back to the user.",
        },
        {
          text: "On Claude code, Ask for it to use the skill",
          code: '"Use the weather-lookup skill to tell me the weather in Tokyo"',
        },
        {
          text: "Claude invokes the skill, calls the API, and replies with the live weather",
        },
      ],
      note: "A skill is a reusable instruction set Claude can invoke on demand: defining one teaches Claude to perform a task (like calling this API) the same way every time, without re-explaining the steps.",
    },
  },
  {
    category: "External Information Retrieval",
    tools: [
      { name: "WebFetch", description: "Fetches content from a specified URL." },
      { name: "WebSearch", description: "Performs web searches." },
      { name: "ToolSearch", description: "Searches for and loads deferred tools when tool search is enabled." },
    ],
  },
  {
    category: "MCP tooling",
    tools: [
      { name: "ListMcpResourcesTool", description: "Lists resources exposed by connected MCP servers." },
      { name: "ReadMcpResourceTool", description: "Reads a specific MCP resource by URI." },
      { name: "WaitForMcpServers", description: "Waits for MCP servers still connecting in the background so a request can use their tools without restarting the session." },
    ],
    example: {
      title: "Example: connect the GitHub MCP server",
      steps: [
        {
          text: "Create a fine-grained personal access token",
          link: "https://github.com/settings/personal-access-tokens/new",
        },
        { text: 'Grant the permission "administration: read and write"' },
        {
          text: "Add the GitHub MCP server",
          code: 'claude mcp add --transport http github https://api.githubcopilot.com/mcp --header "Authorization: Bearer YOUR_TOKEN"',
        },
        {
          text: "Verify the connection is live",
          code: "$ claude mcp list\ngithub: https://api.githubcopilot.com/mcp (HTTP) - ✔ Connected",
        },
        {
          text: "On Claude code, ask for it to use it",
          code: '"Create a test repository on github"',
        },
        { text: "You should have a new repository created on your GitHub account" },
      ],
      note: "Connecting an MCP server extends the toolbox available to Claude — its tools become usable in your session alongside the built-in ones.",
    },
  },
  {
    category: "Task Management (within session)",
    tools: [
      { name: "TaskCreate", description: "Creates a new task in the task list." },
      { name: "TaskGet", description: "Retrieves full details for a specific task." },
      { name: "TaskList", description: "Lists all tasks with their current status." },
      { name: "TaskUpdate", description: "Updates task status, dependencies, details, or deletes tasks." },
      { name: "TaskStop", description: "Kills a running background task by ID." },
      { name: "TaskOutput", description: "(Deprecated) Retrieves output from a background task. Prefer Read on the task's output file path." },
      { name: "TodoWrite", description: "(Disabled by default since v2.1.142) Manages the session task checklist, superseded by the Task* tools." },
    ],
  },
  {
    category: "Orchestration & Delegation",
    tools: [
      { name: "Agent", description: "Spawns a subagent with its own context window to handle a task." },
      { name: "SendMessage", description: "Sends a message to an agent team teammate, or resumes a subagent by its agent ID." },
      { name: "Workflow", description: "Runs a dynamic workflow: a script that orchestrates many subagents in the background and returns one consolidated result." },
      { name: "AskUserQuestion", description: "Asks multiple-choice questions to gather requirements or clarify ambiguity." },
    ],
  },
  {
    category: "Scheduling & Automation",
    tools: [
      { name: "CronCreate", description: "Schedules a recurring or one-shot prompt within the current session." },
      { name: "CronDelete", description: "Cancels a scheduled task by ID." },
      { name: "CronList", description: "Lists all scheduled tasks in the session." },
      { name: "ScheduleWakeup", description: "Reschedules the next iteration of a self-paced /loop." },
      { name: "RemoteTrigger", description: "Creates, updates, runs, and lists Routines on claude.ai (backs the /schedule command)." },
    ],
  },
  {
    category: "Notifications & Sharing",
    tools: [
      { name: "PushNotification", description: "Sends a desktop notification (and a phone push when Remote Control is connected) so long-running or scheduled tasks can reach you." },
      { name: "Artifact", description: "Publishes an HTML or Markdown file as a private, shareable interactive page on claude.ai." },
      { name: "ShareOnboardingGuide", description: "Uploads ONBOARDING.md and returns a share link teammates can open in Claude Code." },
    ],
  },
]
