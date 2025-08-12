

import NewPostForm from '@/components/new-post-form'
import React from 'react'

const Write = () => {
  return (
    <section className='pb-24 pt-23 sm:pt-40'>
        <div className='container mx-auto px-4'>
            <h1 className='text-center text-4xl font-bold text-primary'>New Post</h1>
            <NewPostForm />
            </div>

    </section>
  )
}

export default Write