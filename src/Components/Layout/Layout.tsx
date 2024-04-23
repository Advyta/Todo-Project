import React from 'react'
import Heading from '../Heading/Heading'
import TodoLayout from '../Todo/TodoLayout'

const Layout: React.FC = () => {
  return (
    <div className='flex flex-col w-full max-w-[580px] pt-12 md:pt-3'>
      <Heading />
      <TodoLayout/>
    </div>
  )
}

export default Layout
