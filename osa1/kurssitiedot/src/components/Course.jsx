function Course({ courses }) {
  const totalExercises = (courseID) => {
    const sum = courses
      .find((course) => course.id === courseID)
      .parts.reduce((sum, part) => sum + part.exercises, 0);
    return sum;
  };

  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          <div>
            {course.parts.map((part) => (
              <p key={part.id}>
                {part.name} : {part.exercises} exercises
              </p>
            ))}
          </div>
          <h4>total of {totalExercises(course.id)} exercises</h4>
        </div>
      ))}
    </div>
  );
}

export default Course;
