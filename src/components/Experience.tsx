interface ExperienceItem {
  title: string
  company: string
  description: string
  tools: string
  period: string
}

const Experience = () => {
  const experiences: ExperienceItem[] = [
    {
      title: "Senior Software Engineer",
      company: "Mews",
      description: "I exclusively work on the design system at Mews and this entails tasks such as consolidating components, types, styles, usages, etc., testing new solutions in our applications, creating new components needed for quarterly goals, and the overall health and structure of our design system. The design system at Mews consists of components, design tokens exported and used as variables, themes that can be customized and used for specific product needs, storybook examples and playgrounds, and our documentaiton site powered by Supernova.",
      tools: "React, TypeScript, styled components, Recharts, Storybook, Supernova",
      period: "06/2022 - current"
    },
    {
      title: "Senior Front-End Engineer",
      company: "Bitvavo",
      description: "Rebuilt 3 consumer facing Vue.js apps using React, Gatsby, TypeScript, GraphQL, styled-components, and React Testing Library. These apps included an embedded widget that external wesbites can use to attract customers to the Bitvavo platform, our public facing marketing website where potential and current users can learn more about our products, and our internal trading platform to exchange Euros for multiple cryptocurrencies.",
      tools: "React, React Router, Vue.js, Gatsby, TypeScript, GraphQL, Axios, React Testing Library, Strapi, Lokalise",
      period: "02/2021 - 04/2022"
    },
    {
      title: "Senior Software Engineer, Front-End",
      company: "Aroundhome",
      description: "Creating a portal for customers to login and communicate with contractors that have made offers. Our team is creating an application that is lightweight and mobile focused which will be duplicated in the future for the many different areas of home renovation.",
      tools: "React, React Router, TypeScript, styled-components, axios, Cypress, Contentful",
      period: "03/2020 - 01/2021"
    },
    {
      title: "Senior Front-End Engineer",
      company: "Copper",
      description: "Staying at Copper, I was promoted to Senior Front-End Engineer. I worked with the Growth team to implement new features and test out new components for A/B testing. During this time, I continued to work on the design system to implemenet new compoents, features, and bug fixes.",
      tools: "Ember, Babel, SASS, Webpack, Mocha",
      period: "02/2019 - 06/2019"
    },
    {
      title: "Front-End Engineer",
      company: "Copper",
      description: "For my first project, I immediately jumped into a rebranding project. The company was changing its name, logo, and product colors. I and one other person, helped lead the developemnt efforts to change all of the old instances of the company name and logo. After this, I created a color variable system for a more cohesive color palette. Starting with over 60 colors, I reduced it down to 25.",
      tools: "Ember, Babel, SASS, Webpack, NPM publishing, Mocha, Commitzen, Sketch, Figma",
      period: "04/2018 - 02/2019"
    },
    {
      title: "Front-End Engineer",
      company: "SurveyMonkey",
      description: "My first project at SurveyMonkey was to work with the design team and the core engineering teams to create a npm styling library for the product rebranding. This was done by adding new classNames, color variables, and accessing html structures, attributes, and clever matching patterns to target current code. After this, I created a design system with React components and helped teams integrate it into their stack.",
      tools: "React, SASS, Webpack, Jest, Enzyme, NPM publishing, Commitzen",
      period: "11/2016 - 04/2018"
    },
    {
      title: "Front-End Developer",
      company: "Rafter",
      description: "While at Rafter, I worked on the Sourcery team, an internal tool that tracked the shipping, storage, and inventory logistics of our books. This allowed the sourcing team to track how many books they had in total, where the books are coming from and need to go, and how many they needed to order.",
      tools: "React, SCSS, Fluxxor, Jest, Ember.js, Webpack",
      period: "01/2015 - 10/2016"
    },
    {
      title: "Front-End Developer Intern",
      company: "Zappos",
      description: "This internship allowed me to grow my skills as a Developer and practice being on a team an in agile fashion. I also helped build an internal tool named Outfit Builder, an internal tool that streamlines communication and product acquistion by 56% between 7 different job functions.",
      tools: "JavaScript, jQuery, Handlebars, SCSS, Node.js",
      period: "06/2014 - 08/2014"
    },
    {
      title: "Web Developer",
      company: "University of Washington",
      description: "I worked on fixing many bugs and implementing small features on many pages of the UW-IT repo. I created an API so colleges could create a unquie UI for their calendars. I also helped build the UW-IT ticketing system which is a centralized system for UW-IT help desk inquiries and communication.",
      tools: "Javascript, jQuery, CSS, WordPress, Drupal",
      period: "09/2013 - 06/2014"
    }
  ]

  return (
    <section id="experience" className="section-padding flex justify-center min-h-screen">
      <div className="w-full">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 underline">
          Experience
        </h2>
        
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div key={index} className="resume-item">
              <div className="resume-content">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                  {experience.title}
                </h3>
                <div className="text-lg text-yale-blue font-semibold mb-3">
                  {experience.company}
                </div>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  {experience.description}
                </p>
                <p className="text-gray-600 font-medium">
                  <span className="font-bold">Tools:</span> {experience.tools}
                </p>
              </div>
              <div className="resume-date">
                <span className="text-yale-blue font-semibold">
                  {experience.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience 