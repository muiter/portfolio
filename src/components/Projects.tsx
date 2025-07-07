import { PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'

interface ProjectImage {
  src: string
  alt: string
  subHtml: string
}

interface Project {
  id: string
  title: string
  task: string
  problem: string
  solution: string
  context?: string
  images: ProjectImage[]
}

const Projects = () => {

  const projects: Project[] = [
    {
      id: "CopperDesignSystem",
      title: "Copper Design System",
      task: "Create components and utilities for engineers to use throughout our codebase. Figure out how to engage engineers and have them use the design system.",
      problem: "What do we add or leave out? To what degree should we allow control in a components structure?",
      solution: "We took a hybrid approach to development. After going through our developemnt cycle of creating a componet, we would then work with engineers to swap out old code for our newly built componets. We would also create merge requests so we knew what we could improve from making the components.",
      images: [
        { src: "/img/alloy_site.png", alt: "Alloy documentation site", subHtml: "Alloy documentation site" },
        { src: "/img/alloy_button_states.png", alt: "Sketch of all button states", subHtml: "Sketch of all button states" }
      ]
    },
    {
      id: "CopperRebrand",
      title: "Copper Product Rebrand",
      task: "Update our product UI with the new color palette.",
      problem: "Colors in our codebase are outdated and inconsistently defined/used.",
      solution: "Consolidate and organize the current color variables. Once organized, create color variables for components to easily change the color giving our product a refreshed UI.",
      context: "There's multiple files of different color variables. Some values of those variables are identical. Some are almost identical in saturation and hue. Some color variables are not used at all. Consolidating all variables into one color file was first one the list. After that, I deleted variables that are not used anywhere in the code base. Next, I searched for css color names that are used as values (e.g. white, black, etc.) and replaced them with a variable. Now that the easy part is out of the way, I moved on to consolidating the total color variable list. We rounded up similar colors in a sketch file (see image below) and decided which colors can be deleted for the \"true\" color of that hue. Afterwards I took the list of colors to be deleted and searched for that color variable to replace it with the \"true\" color variable that would take its place. By this time, the new product colors have been added to our design system npm package and they can be imported into our main codebase. Once imported, I created color variables for the list of components we decided to change the color of in our product. I can now easily swap out the old for new color variables and our product has a new look and feel (see images below).",
      images: [
        { src: "/img/yellow.png", alt: "consolidation of yellow/orange colors", subHtml: "consolidation of yellow/orange colors" },
        { src: "/img/green.png", alt: "consolidation of green colors", subHtml: "consolidation of green colors" },
        { src: "/img/cyan.png", alt: "consolidation of cyan colors", subHtml: "consolidation of cyan colors" },
        { src: "/img/teal.png", alt: "consolidation of teal colors", subHtml: "consolidation of teal colors" },
        { src: "/img/blue.png", alt: "consolidation of blue colors", subHtml: "consolidation of blue colors" },
        { src: "/img/indigo.png", alt: "consolidation of indigo colors", subHtml: "consolidation of indigo colors" },
        { src: "/img/purple.png", alt: "consolidation of purple colors", subHtml: "consolidation of purple colors" },
        { src: "/img/red.png", alt: "consolidation of red colors", subHtml: "consolidation of red colors" },
        { src: "/img/grey1.png", alt: "consolidation of light grey colors", subHtml: "consolidation of light grey colors" },
        { src: "/img/grey2.png", alt: "consolidation of dark grey colors", subHtml: "consolidation of dark grey colors" },
        { src: "/img/slate.png", alt: "consolidation of slate colors", subHtml: "consolidation of slate colors" },
        { src: "/img/DS_colors.png", alt: "new product color palette; held in the design system", subHtml: "new product color palette; held in the design system" },
        { src: "/img/PW_leads.png", alt: "old UI People page", subHtml: "old UI People page" },
        { src: "/img/Copper_people.png", alt: "new UI People page", subHtml: "new UI People page" },
        { src: "/img/PW_pref.png", alt: "old UI Preferences page", subHtml: "old UI Preferences page" },
        { src: "/img/Copper_pref.png", alt: "new UI Preferences page", subHtml: "new UI Preferences page" }
      ]
    },
    {
      id: "SMDS",
      title: "SurveyMonkey Design System",
      task: "Create a new React design system with the newly update product rebranding.",
      problem: "The past few months were all about rebranding the product and getting individual teams to update their applications UI. Having those same teams integrate a new library needed research, time, and patience to work together to create something valuable.",
      solution: "Create small essential pieces that many teams can use and help them integrate the design system into their current applications.",
      context: "We started off by creating a button component. This allowed us to create something crucial to all applications, while initially setting up our application, coding stadards, tests, etc. Starting small also allowed us to tests all of the various scenarios this component would face. This one component seems simple and straightforward but can be complex which also allowed us to see the complexity in the API as well as the many additions needed to create an essential and valuable system.",
      images: []
    },
    {
      id: "SMrebrand",
      title: "SurveyMonkey Product Rebranding",
      task: "Help other teams rebrand their application. Styling came in an older jQuery library or a new React component and SASS class based library.",
      problem: "Teams have different HTML structure because this was before the desisn system was created and they had to make their own HTML/components. When you make classnames based off of a specific HTML strucutre and multiple teams do this different, you have to create multiple solutions.",
      solution: "We created a temporary soltuion that would partially be ported over into the new React based component library.",
      context: "Our team had multiple libraries to update. These consisted of header and footer, which is on every page but may show different content based on logged in, logged out, user privileges, etc. Component library which consisted of reusable compoents such as buttons, modals, radio buttons, inputs, etc.",
      images: [
        { src: "/img/sm_login_old.png", alt: "old login", subHtml: "old login" },
        { src: "/img/sm_login_new.png", alt: "rebranded login", subHtml: "rebranded login" },
        { src: "/img/sm_my_surveys_old.png", alt: "old my surveys page", subHtml: "old my surveys page" },
        { src: "/img/sm_my_surveys_new.png", alt: "rebranded my surveys page", subHtml: "rebranded my surveys page" },
        { src: "/img/sm_collect_old.png", alt: "old collect page", subHtml: "old collect page" },
        { src: "/img/sm_collect_new.png", alt: "rebranded collect page", subHtml: "rebranded collect page" }
      ]
    }
  ]

  return (
    <section id="projects" className="section-padding flex items-center min-h-screen">
      <div className="w-full">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 underline">
          Projects
        </h2>
        
        <div className="space-y-12">
          {projects.map((project) => (
            <div key={project.id} className="project-item">
              <div className="project-content">
                <h3 id={project.id} className="text-xl font-bold mb-4 text-yale-blue">
                  <a href={`#${project.id}`}>{project.title}</a>
                </h3>
              </div>
              
              <div className="mb-4">
                <span className="project-header">Task:</span>
                <span className="project-description ml-3">{project.task}</span>
              </div>
              
              <div className="mb-4">
                <span className="project-header">Issue(s):</span>
                <span className="project-description ml-3">{project.problem}</span>
              </div>
              
              <div className="mb-4">
                <span className="project-header">Solution:</span>
                <span className="project-description ml-3">{project.solution}</span>
              </div>
              
              {project.context && (
                <div className="mb-4">
                  <span className="project-header">More Context:</span>
                  <div className="project-description ml-3 mt-2 space-y-2">
                    {project.context.split('. ').map((sentence, index) => (
                      <p key={index}>{sentence}.</p>
                    ))}
                  </div>
                </div>
              )}
              
              {project.images.length > 0 && (
                <div className="mt-6">
                  <span className="project-header">Images:</span>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.images.map((image, index) => (
                      <PhotoView key={index} src={image.src}>
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="project-img"
                        />
                      </PhotoView>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects 