import React from 'react';

const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ course }) => <p>Number of exercises { course.parts.reduce((totalExercises, part) => totalExercises + part.exercises, 0) }</p>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({ course }) => 
  <div>
    { course.parts.map((part) => <Part key={part.id} part={part} />) }
  </div>

const Course = ({course}) => 
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>

export default Course