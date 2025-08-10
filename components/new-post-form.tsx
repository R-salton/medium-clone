
import React, { use } from 'react'
import { toast } from 'sonner'
import { set, z } from 'zod'
import { JSONContent} from 'novel'
import { useState, useEffect } from 'react'
import { useForm , SubmitHandler } from 'react-hook-form'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'
import { createSlugFromName } from '@/lib/utils'
import { Input} from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Editor from '@/components/editor/editor'
import ImageUploader from '@/components/image-uploader'
import { Dialog ,DialohContent, DialogTrigger } from '@/components/ui/dialog'
import { newPostSchema } from '@/libb/schemas'
import { Id } from '@/convex/_generated/dataModel'

type Inputs = z.infer<typeof newPostSchema>

export const NewPostForm = () => {
    const createPost = useMutation(api.posts.createPost)
    const router = useRouter();

    const [filePickerIsOpen, setFilePickerIsOpen] = useState(false);

    const {
        watch,
        register,
        setValue,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>({
        resolver: zodResolver(newPostSchema),
        defaultValues: {}
      });
    


      function setCoverImageId(url: string) {
        setValue('coverImageId', url)
        setFilePickerIsOpen(false)
      }


      function setContent(content: JSONContent) {
        setValue('content', content,{ shouldValidate: true })
      }

      const title = watch('title')

      useEffect(() => {
        if (title) {
          const slug = createSlugFromName(title)
          if (slug) {
            setValue('slug', slug, { shouldValidate: true })
          }
        }

        
      }, [title])


      const processForm: SubmitHandler<Inputs> = async (data) => {
        const contentJson = data.content
        const hasContent = contentJson?.content?.some(c => c.content && c.content.length > 0

        )
        if (!hasContent) {
          toast.error('Please enter some content')
          return
        }
        try{
          const postSlug = await createPost({
            ...data,
            coverImage: data.coverImageId as Id<'_storage'> | undefined,
            content: JSON.stringify(contentJson)
          })
          if(!postSlug) throw new Error('Failed to create post')
            router.push(`/posts/${postSlug}`)
          toast.success('Post created')
        } catch (error) {
          console.error(error)
          toast.error('Failed to create post')
        }
      };

  return (
    <form onSubmit={handleSubmit(processForm)} className='mt-6 max-w-2xl'>
      <div className='flex flex-col gap-4'>
        {/* Cover Image */}
        <div className='flex items-between gap-4'>
          <div className="w-full">
            <input
            disabled
              type="text"
              placeholder='Select a cover image'
              {...register('coverImageId')}
             className='w-full'
             />
             {
              errors.coverImageId?.message && (
                <p className='text-red-400 mt-1 px-2 text-xs'>{errors.coverImageId?.message}</p>
              )
             }
            
           
          </div>
        </div>
      </div>
    </form>
  )
}
