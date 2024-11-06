import React from 'react'
import HomePage from './(components)/HomePage/homePage'
import About from './(components)/About/about'
import Projects from './(components)/Projects/projects'
import TechStacks from './(components)/TechStacks/techStacks'
import Contact from './(components)/Contact/contact'

function Main() {
  return (
    <div>
      <HomePage />
      <About />
      <Projects />
      <TechStacks />
      <Contact />
    </div>
  )
}

export default Main
