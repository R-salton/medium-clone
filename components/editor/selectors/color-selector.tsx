 import  { Check, ChevronDown } from 'lucide-react'
 import  { EditorBubbleItem, useEditor } from 'novel'

 import { Button } from '@/components/ui/button'
 import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from '@/components/ui/popover'

 
  export interface BubbleColorMenuItem{
    name: string,
    color: string
  }

  const TEXT_COLORS: BubbleColorMenuItem[] = [
    {name: 'Default', color: 'var(--novel-black)'},

  ]

  export const ColorSelector = () => {
    const { editor } = useEditor()

    if (!editor) return null
    return (
        <Button
         variant='ghost'
         className="w-12 rounded-none"
         onClick={(evt) => {

            if(editor.isActive('color')){
                 editor.chain().focus().unsetColor().run()
            }
            else {
                editor.chain().focus().setColor('var(--novel-black)').run()
            }
            evt.preventDefault()
           
         }}
         />
    )
}