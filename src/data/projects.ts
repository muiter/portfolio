export interface ProjectImage {
  /** File name in src/assets/img/<project slug>/. A .webm file plays as a looping video. */
  src: string
  alt: string
}

export interface Project {
  /** Used in the project's URL (/projects/<slug>/) and as its media folder (src/assets/img/<slug>/) */
  slug: string
  title: string
  task: string
  problem: string
  solution: string
  context?: string
  /**
   * Links to the live website(s), e.g. ["https://example.com"]. Add as many as
   * needed, or leave the list empty if there isn't one.
   */
  urls?: string[]
  /** File name in the project's media folder shown in its circle. Defaults to the first image (not video). */
  cover?: string
  images: ProjectImage[]
}

export const projects: Project[] = [
  {
    slug: "mews-design-system",
    title: "Mews Design System",
    task: "Build and maintain the Mews design system as part of the team that owns it. It's an ongoing cycle, not a one-time project: creating new components and updating existing ones, integrating them into Mews products, and working closely with the engineering and design teams who use them, our customers, to build what they need.",
    problem: "",
    solution: "",
    urls: ["https://www.mews.design", "https://storybook.mews.design"],
    cover: "design-system-docs.png",
    images: [
      { src: "design-system-docs.png", alt: "Mews design system documentation" },
      { src: "component-docs.png", alt: "Mews design system component docs" },
      { src: "button-docs.png", alt: "Mews design system button docs" },
      { src: "storybook.webm", alt: "Mews design system component Storybook" }
    ]
  },
  {
    slug: "mews-booking-system",
    title: "Mews Booking System",
    task: "Support the team building the Mews booking system, an application built entirely from design system components. Work closely with their engineers and expand the design system to fit their needs, including a themeable token system that lets hotel chains brand their booking flows with their own colors.",
    problem: "",
    solution: "",
    urls: [],
    images: [
      { src: "details.png", alt: "Contact and payment details step" },
      { src: "summary.png", alt: "Booking summary step" }
    ]
  },
  {
    slug: "bitvavo-trading-widgets",
    title: "Bitvavo Trading Widgets",
    task: "Rewrite Bitvavo's embeddable partner widgets (trade, price chart, and chart + trade) from scratch so affiliates can drive signups from their own websites.",
    problem: "",
    solution: "",
    urls: ["https://bitvavo.com/assets/static/widget"],
    cover: "extended-chart-screenshot.png",
    images: [
      { src: "chart-recording.webm", alt: "Using the price chart widget" },
      { src: "extended-chart-screenshot.png", alt: "Price chart widget with buy form" },
      { src: "trade-screenshot.png", alt: "Buy and sell widget" },
      { src: "trade-recording.webm", alt: "Using the buy and sell widget" },
      { src: "price-trend-light-screenshot.png", alt: "Today's top gainers widget, light theme" },
      { src: "price-trend-dark-screenshot.png", alt: "Today's top losers widget, dark theme" }
    ]
  },
  {
    slug: "bitvavo-live-market-prices",
    title: "Bitvavo Live Market Prices",
    task: "Show users their balances and market prices in real time over WebSockets, so they see live updates without refreshing the page.",
    problem: "",
    solution: "",
    urls: ["https://bitvavo.com/en/markets"],
    cover: "assets-charts.png",
    images: [
      { src: "assets-charts.png", alt: "Price chart updating in real time" },
      { src: "price-chart.webm", alt: "Price chart updating in real time" },
      { src: "assets-homepage.png", alt: "Price chart updating in real time" },
      { src: "assets.webm", alt: "Asset balances and prices updating in real time" },
    ]
  },
  {
    slug: "aroundhome-project-request",
    title: "Aroundhome Project Request",
    task: "Help homeowners request offers for their home project: build the partner results page with upfront price estimates, contractor ratings, and multiple contractor options, and track where users drop off in the questionnaire.",
    problem: "",
    solution: "",
    urls: ["https://www.aroundhome.de"],
    cover: "questionnaire.png",
    images: [
      { src: "search-suggestions.png", alt: "Popular project suggestions" },
      { src: "questionnaire.png", alt: "First step of the solar panel questionnaire" }
    ]
  },
  {
    slug: "copper-design-system",
    title: "Copper Design System",
    task: "Create components and utilities for engineers to use throughout our codebase. Figure out how to engage engineers and have them use the design system.",
    problem: "What do we add or leave out? To what degree should we allow control in a components structure?",
    solution: "We took a hybrid approach to development. After going through our developemnt cycle of creating a componet, we would then work with engineers to swap out old code for our newly built componets. We would also create merge requests so we knew what we could improve from making the components.",
    urls: [],
    images: [
      { src: "alloy_site.png", alt: "Alloy documentation site" },
      { src: "alloy_button_states.png", alt: "Sketch of all button states" },
      { src: "yellow.png", alt: "consolidation of yellow/orange colors" },
      { src: "green.png", alt: "consolidation of green colors" },
      { src: "cyan.png", alt: "consolidation of cyan colors" },
      { src: "teal.png", alt: "consolidation of teal colors" },
      { src: "blue.png", alt: "consolidation of blue colors" },
      { src: "indigo.png", alt: "consolidation of indigo colors" },
      { src: "purple.png", alt: "consolidation of purple colors" },
      { src: "red.png", alt: "consolidation of red colors" },
      { src: "grey1.png", alt: "consolidation of light grey colors" },
      { src: "grey2.png", alt: "consolidation of dark grey colors" },
      { src: "slate.png", alt: "consolidation of slate colors" },
      { src: "DS_colors.png", alt: "new product color palette; held in the design system" }
    ]
  },
  {
    slug: "copper-rebrand",
    title: "Copper Product Rebrand",
    task: "Update our product UI with the new color palette.",
    problem: "Colors in our codebase are outdated and inconsistently defined/used.",
    solution: "Consolidate and organize the current color variables. Once organized, create color variables for components to easily change the color giving our product a refreshed UI.",
    urls: [],
    context: "There's multiple files of different color variables. Some values of those variables are identical. Some are almost identical in saturation and hue. Some color variables are not used at all. Consolidating all variables into one color file was first one the list. After that, I deleted variables that are not used anywhere in the code base. Next, I searched for css color names that are used as values (e.g. white, black, etc.) and replaced them with a variable. Now that the easy part is out of the way, I moved on to consolidating the total color variable list. We rounded up similar colors in a sketch file (see image below) and decided which colors can be deleted for the \"true\" color of that hue. Afterwards I took the list of colors to be deleted and searched for that color variable to replace it with the \"true\" color variable that would take its place. By this time, the new product colors have been added to our design system npm package and they can be imported into our main codebase. Once imported, I created color variables for the list of components we decided to change the color of in our product. I can now easily swap out the old for new color variables and our product has a new look and feel (see images below).",
    cover: "people_Copper.png",
    images: [
      { src: "people_PW.png", alt: "old UI People page" },
      { src: "people_Copper.png", alt: "new UI People page" },
      { src: "pref_PW.png", alt: "old UI Preferences page" },
      { src: "pref_Copper.png", alt: "new UI Preferences page" }
    ]
  },
  {
    slug: "surveymonkey-design-system",
    title: "SurveyMonkey Design System",
    task: "Create a new React design system with the newly update product rebranding.",
    problem: "The past few months were all about rebranding the product and getting individual teams to update their applications UI. Having those same teams integrate a new library needed research, time, and patience to work together to create something valuable.",
    solution: "Create small essential pieces that many teams can use and help them integrate the design system into their current applications.",
    urls: [],
    context: "We started off by creating a button component. This allowed us to create something crucial to all applications, while initially setting up our application, coding stadards, tests, etc. Starting small also allowed us to tests all of the various scenarios this component would face. This one component seems simple and straightforward but can be complex which also allowed us to see the complexity in the API as well as the many additions needed to create an essential and valuable system.",
    images: []
  },
  {
    slug: "surveymonkey-rebrand",
    title: "SurveyMonkey Product Rebranding",
    task: "Help other teams rebrand their application. Styling came in an older jQuery library or a new React component and SASS class based library.",
    problem: "Teams have different HTML structure because this was before the desisn system was created and they had to make their own HTML/components. When you make classnames based off of a specific HTML strucutre and multiple teams do this different, you have to create multiple solutions.",
    solution: "We created a temporary soltuion that would partially be ported over into the new React based component library.",
    urls: [],
    context: "Our team had multiple libraries to update. These consisted of header and footer, which is on every page but may show different content based on logged in, logged out, user privileges, etc. Component library which consisted of reusable compoents such as buttons, modals, radio buttons, inputs, etc.",
    cover: "sm_login_new.png",
    images: [
      { src: "sm_login_old.png", alt: "old login" },
      { src: "sm_login_new.png", alt: "rebranded login" },
      { src: "sm_my_surveys_old.png", alt: "old my surveys page" },
      { src: "sm_my_surveys_new.png", alt: "rebranded my surveys page" },
      { src: "sm_collect_old.png", alt: "old collect page" },
      { src: "sm_collect_new.png", alt: "rebranded collect page" }
    ]
  }
]
