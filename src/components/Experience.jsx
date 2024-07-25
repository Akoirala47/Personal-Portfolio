import { EXPERIENCES } from "../constants";

const Experience = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
      <h2 className="my-20 text-4xl text-center">Experience</h2>
      <div>
        {EXPERIENCES.map((experience, index) => (
          <div 
            key={index} 
            className="mb-8 flex flex-wrap lg:justify-center"
          >
            <div className="w-full lg:w-1/4">
              <p>{experience.year}</p>
            </div>
            <div className="w-full lg:w-3/4">
              <h3 className="font-semibold">{experience.role}</h3>
              <p className="italic">{experience.company}</p>
              <p>{experience.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {experience.technologies.map((tech, index) => (
                  <span key={index} className="rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-800">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
