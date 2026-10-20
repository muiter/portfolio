export interface Experience {
  title: string
  company: string
  location: string
  period: string
  highlights: string[]
  technologies: string
}

export const experience: Experience[] = [
  {
    title: "Senior Software Engineer",
    company: "Mews",
    location: "Amsterdam, NL (Remote)",
    period: "06/2022 – Present",
    highlights: [
      "Led the design system redesign across 3 applications and a team of 5 engineers, running planning, estimates, and code reviews to ship on time in 6 months",
      "Built a themeable token system that lets hotel chains brand Mews booking flows with their own colors, overriding default design tokens across 4 applications and 10 teams",
      "Built Claude Code skills, hooks, and agent rules that automate PR creation (screenshots, dev links, descriptions, reviewers), saving 20 minutes per PR",
      "Replaced the legacy Matrix table with a TanStack-based Table, now used by 15 teams on 40 pages, with sorting, search, and pagination synced to the URL"
    ],
    technologies: "React, TypeScript, monorepo, Vitest, Storybook, GitHub Actions, Figma, Sentry, Claude Code, Cursor"
  },
  {
    title: "Senior Front-End Engineer",
    company: "Bitvavo",
    location: "Amsterdam, NL",
    period: "02/2021 – 04/2022",
    highlights: [
      "Migrated Bitvavo's account panel from Vue.js to React and TypeScript for 1M+ users, adding 2FA login and Onfido identity verification in 6 languages.",
      "Integrated real-time balances and market prices over WebSockets, so users saw live updates without refreshing",
      "Delivered a greenfield rewrite of embeddable partner widgets (trade, price chart, chart + trade) that let affiliates drive signups from their own sites and are still live in production"
    ],
    technologies: "React, TypeScript, Vue.js, Redux, Gatsby, Strapi, GraphQL, WebSockets, Highcharts, React Testing Library"
  },
  {
    title: "Senior Front-End Engineer",
    company: "Aroundhome",
    location: "Berlin, DE",
    period: "01/2020 – 01/2021",
    highlights: [
      "Built the partner results page for 100,000+ monthly users, with upfront price estimates, contractor ratings, and multiple contractor options, increasing customer signups",
      "Moved all hard-coded copy into Contentful so product and design could edit content without engineering support",
      "Added analytics event tracking so the team could see where users dropped off in the questionnaire"
    ],
    technologies: "React, TypeScript, React Router, Contentful, i18next, Google Tag Manager, Sentry, Storybook, Cypress"
  },
  {
    title: "Senior Design Engineer",
    company: "Copper",
    location: "San Francisco, US",
    period: "04/2018 – 06/2019",
    highlights: [
      "Published Copper's design system as a public npm package with semantic versioning, changelogs, and Commitizen, so teams could see each change and test upgrades before rolling them out",
      "Consolidated the main app's color variables from 160 to 96, then rolled out the product rebrand by switching components to a new design system palette"
    ],
    technologies: "Ember.js, SCSS, Webpack, npm publishing, Mocha, Commitizen"
  },
  {
    title: "Front-End Engineer",
    company: "SurveyMonkey",
    location: "Palo Alto, US",
    period: "11/2016 – 04/2018",
    highlights: [
      "Built SurveyMonkey's first React design system, adopted by 15+ teams, and upgraded it to Webpack 2 to enable tree-shaking so apps only shipped the components they used",
      "Developed a SCSS framework that let every product team apply the company-wide rebrand to existing markup"
    ],
    technologies: "React, Redux, Webpack, Jest, Enzyme, SCSS, Gatsby, npm publishing, Commitizen"
  },
  {
    title: "Front-End Developer",
    company: "Rafter",
    location: "San Mateo, US",
    period: "01/2015 – 10/2016",
    highlights: [
      "Achieved WCAG 2.0 AA compliance for the student dashboard after an external audit, adding keyboard navigation, focus management, and ARIA support for partner universities' accessibility requirements",
      "Built purchase-order, shipping/receiving, and textbook-list features for Sourcery, Rafter's internal textbook sourcing and order-tracking tool, plus barcode-scan feedback for warehouse receiving"
    ],
    technologies: "React, Flux (Fluxxor, Reflux), React Router, SCSS, Foundation, Webpack, Karma, Mocha"
  }
]
