import Total from "./components/Total";
import Header from "./components/Header";
import Content from "./components/Content";
import Course from "./components/Course";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  // const initialValue = 0;
  // const sum = courses.parts.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue.exercises,
  //   initialValue
  // );

  return (
    <div>
      <h1>Web development curriculum</h1>
      <div>
        {courses.map((value, index) => {
          <h1 key={index}>{value.name}</h1>;
        })}
      </div>
      {/* <Content parts={courses} />
      <Total parts={courses} />
      <h4>total of {sum} exercises</h4> */}
    </div>
  );
};

export default App;
