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
    example: {
      title: "Example: watch a log and explain errors in plain English",
      steps: [
        {
          text: "Create an empty log file to watch",
          code: "touch trace.log",
        },
        {
          text: "Ask Claude to monitor the file for new lines",
          code: '"Monitor trace.log and explain any error you see in simple terms"',
        },
        {
          text: "Manually add an error line to trace.log and save it (open it in your editor and paste a line like this)",
          code:
            "2026-06-23 11:14:02 ERROR db.connect: ECONNREFUSED 127.0.0.1:5432 - connection refused",
        },
        {
          text: "Claude reacts to the new line and explains it plainly",
          code:
            "Your app tried to reach the Postgres database on localhost:5432\n" +
            "but nothing answered: the database probably isn't running.\n" +
            "Start it (or fix the host/port) and the error should clear.",
        },
      ],
      note: "We create and edit trace.log by hand here just to keep the demo simple. In a real project you'd point Monitor at a live process instead, e.g. monitor \"npm run dev\", so Claude watches your actual server output as it runs.",
    },
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
      { name: "Skill", description: "Executes a skill within the main conversation." },
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
      note: "A skill is a reusable, packaged capability: a set of instructions, scripts, and resources that teach Claude how to perform a specific task consistently and that can be invoked on demand.",
    },
  },
  {
    category: "External Information Retrieval",
    tools: [
      { name: "WebFetch", description: "Fetches content from a specified URL." },
      { name: "WebSearch", description: "Performs web searches." },
      { name: "ToolSearch", description: "Searches for and loads deferred tools when tool search is enabled." },
    ],
    example: {
      title: "Example: research a topic with search, then read the source",
      steps: [
        {
          text: "Ask Claude something it can't know from training alone",
          code: '"What\'s the latest stable version of Node.js, and what changed in it?"',
        },
        {
          text: "Claude uses WebSearch / WebFetch to find current, relevant data",
        },
        {
          text: "Claude answers with the up-to-date facts",
        },
      ],
      note: "WebSearch finds pages across the web; WebFetch reads one specific URL in depth. Together they let Claude answer questions about current events and details beyond its training data, then point you to the source.",
    },
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
      note: "Connecting an MCP server extends the toolbox available to Claude, its tools become usable in your session alongside the built-in ones.",
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
    ],
    example: {
      title: "Example: see that task status is self-reported, not verified",
      steps: [
        {
          text: "In an empty folder, ask Claude to create three random tasks",
          code: '"Create 3 random tasks but do not execute them"',
        },
        {
          text: "Claude creates three arbitrary tasks",
        },
        {
          text: "Ask for Claude to mark them as finished",
          code:
            'Mark them as executed even though you didnt do them'
        },
        {
          text: "Claude will mark them as executed",
        }
      ],
      note: "Task status only reflects what Claude reports: it isn't verified against real output. This example deliberately asks Claude to mark tasks done without doing the work, to show that a 'done' task list is not proof anything actually happened.",
    },
  },
  {
    category: "Orchestration & Delegation",
    tools: [
      { name: "Agent", description: "Spawns a subagent with its own context window to handle a task." },
      { name: "SendMessage", description: "Sends a message to an agent team teammate, or resumes a subagent by its agent ID." },
      { name: "Workflow", description: "Runs a dynamic workflow: a script that orchestrates many subagents in the background and returns one consolidated result." },
      { name: "AskUserQuestion", description: "Asks multiple-choice questions to gather requirements or clarify ambiguity." },
    ],
    example: {
      title: "Example: write three haikus in parallel, then merge them into one file",
      steps: [
        {
          text: "In an empty folder, ask Claude for three independent pieces of writing combined into one output, explicitly telling it to use the Workflow tool to coordinate them",
          code: '"Write three haikus: one about rain, one about mountains, one about the ocean, each to its own file, then combine all three into haikus.md, use the Workflow tool to run the three agents in parallel, wait for all of them to finish, then merge"',
        },
        {
          text: "Claude spawns one Agent per haiku so each is generated independently",
        },
        {
          text: "As instructed, Claude runs them as a Workflow that fans out, waits for all three, and reports back together",
        },
        {
          text: "Open haikus.md, it contains all three haikus, gathered from the parallel runs",
        },
      ],
      note: "Agent spawns one subagent for one job. Workflow is for when you need several of those running concurrently and want their results merged into a single answer instead of reviewing each separately.",
    },
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
    example: {
      title: "Example: schedule a one-shot append to a file",
      steps: [
        {
          text: "Create an empty file to watch",
          code: "touch reminders.txt",
        },
        {
          text: "Ask Claude to schedule a one-shot prompt for a minute from now",
          code: '"In 1 minute, append the line \'reminder fired\' to reminders.txt"',
        },
        {
          text: "Claude schedules it and confirms",
        },
        {
          text: "Wait 1 minute, then check the file",
          code: "$ cat reminders.txt\nreminder fired",
        },
        {
          text: "The scheduled prompt ran on its own, using ScheduleWakeup and edited the file without you doing anything in between",
        },
      ],
      note: "ScheduleWakeup manages one-time delayed wakeups on Claude Code itself.",
    },
  },
  {
    category: "Notifications & Sharing",
    tools: [
      { name: "PushNotification", description: "Sends a desktop notification (and a phone push when Remote Control is connected) so long-running or scheduled tasks can reach you." },
      { name: "Artifact", description: "Publishes an HTML or Markdown file as a private, shareable interactive page on claude.ai." },
      { name: "ShareOnboardingGuide", description: "Uploads ONBOARDING.md and returns a share link teammates can open in Claude Code." },
    ],
    example: {
      title: "Example: get notified when a background command finishes",
      steps: [
        {
          text: "Ask claude to run something and notify when its done",
          code: '"tell me your favorite color and use PushNotification to notify me when you have finished deciding it"',
        },
        {
          text: "Claude will answer the question and notify when It's done",
        },
        {
          text: "The notification appears on your desktop, and on your phone too if Remote Control is connected",
        },
      ],
      note: "PushNotification is how Claude reaches you outside the chat window, useful for anything that runs unattended, like a background build, a scheduled cron job, or a long test run.",
    },
  },
]
