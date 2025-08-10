import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Trash } from 'lucide-react'
import { useEditor } from 'novel'
import { Button } from '@/components/ui/button'
import  { cn } from '@/lib/utils'
import { Popover,  PopoverTrigger } from '@radix-ui/react-popover'
import { PopoverContent } from '@/components/ui/popover'
import { is } from 'zod/v4/locales'
import { int } from 'zod'


export function isValidUrl(url: string){
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }


  export function getUrlFromsString(str: string){
    if(isValidUrl(str)){
      return str
    }

    try{
if (str.includes( '.') && str.includes(' ')){
    return new URL(`https://${str}`).toString()
}
    } catch (e) {
      return null
    }
  }


  interface LinkSelectorProps{
    open: boolean,
    onOpenChange: (open: boolean) => void
  }

  export const LinkSelector = ({open, onOpenChange}: LinkSelectorProps) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const { editor } = useEditor()

    // Auto focus input by default
    useEffect(() => {
      if (open) {
        inputRef.current?.focus()
      }
    }, [open])

    const [url, setUrl] = useState('')
    const [isValid, setIsValid] = useState(false)

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const url = e.target.value
      setUrl(url)
      setIsValid(isValidUrl(url))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!isValid) {
        return
      }
      const url = getUrlFromsString(inputRef.current?.value ?? '')
      if (!url) {
        return
      }
      editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
      onOpenChange(false)
    }

    return (
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button variant='ghost' className='flex items-center gap-2'>
            <span>Link</span>
            <ChevronDown className='h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[300px] p-0'>
          <form onSubmit={handleSubmit}>
            <div className='flex items-center gap-2'>
              <input
                ref={inputRef}
                type='text'
                placeholder='https://example.com'
                className='w-full'
                value={url}
                onChange={handleUrlChange}
              />
              <Button type='submit' disabled={!isValid} className='w-full'>
                {isValid ? 'Add Link' : 'Invalid URL'}
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    )

  }