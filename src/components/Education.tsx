const Education = () => {
  return (
    <section id="education" className="section-padding flex items-center min-h-screen">
      <div className="w-full">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 underline">
          Education
        </h2>
        
        <div className="resume-item">
          <div className="resume-content">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
              University of Washington
            </h3>
            <div className="text-lg text-yale-blue font-semibold mb-3">
              Bachelor of Arts & Sciences
            </div>
            <div className="text-gray-700">
              Communication - Technical Communications
            </div>
          </div>
          <div className="resume-date">
            <span className="text-yale-blue font-semibold">
              09/2010 - 06/2014
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education 