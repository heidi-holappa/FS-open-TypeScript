
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic"
}


interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartWithRequirements extends CoursePartWithDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartWithRequirements;


/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({part}: { part: CoursePart}) => {

  const basePart = <h3>{part.name} {part.exerciseCount}</h3>;
  
  const extensionPart = (() => {
    switch (part.kind) {
      case "basic":
        return (
          <div>
            <b>Course description:</b> <i>{part.description}</i>
          </div>
        );
      case "group":
        return (
          <div>
            <p><b>Project exercises: </b> {part.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <p><b>Course description:</b > <i>{part.description}</i></p>
            <p><b>Background material:</b> {part.backgroundMaterial}</p>
          </div>
        );
      case "special":
        return (
          <div>
            <p><b>Course description:</b > <i>{part.description}</i></p>
            <p><b>Required skills:</b > <i>{part.requirements.join(", ")}</i></p>

          </div>
        );

      default:
        return assertNever(part);
    }
  })(); // <-- IIEF

  return <div>{basePart}{extensionPart}</div>;
  
}




interface HeaderProps {
  title: string;
}


interface ContentProps {
  courseParts: CoursePart[];
}

interface TotalProps {
  total: number;
}


const Header = (props: HeaderProps) => {
  return <h1>{props.title}</h1>;
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>

  )
}

const Total = (props: TotalProps) => {
  return <div><b>Total number of exercises:</b> {props.total}</div>;
}

const App = () => {


  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);


  return (
    <div>
      <Header title={courseName} />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;