
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      } 
    ]
  } 
  


  const Header = () => {
    return(
      <h1>{course.name}</h1>
    )
  }

  const Part = (props) => {
    return(
      <p>
        {props.part} {props.exercises}
      </p>
    )
  }

  const Content = () => {
    return(
      course.parts.map((i) => {
        return (<Part key={i.name + i.exercises} part={i.name} exercises={i.exercises} />)
      })
    )
    
  }

  const Total = () => {
    return(
      <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
    )
  }

  return(
    <div>
      <Header />
      <Content />
      <Total />
    </div>
  )
}

export default App;
