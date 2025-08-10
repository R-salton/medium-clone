
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import {
    BoldIcon,
    ItalicIcon,
    StrikethroughIcon,
    UnderlineIcon,
    CodeIcon,

} from 'lucide-react'

import { useEditor, EditorBubbleItem } from 'novel'
import type { SelectorItem    } from './node-selector'


export const TextButtons = () => {
    const { editor } = useEditor()

    if (!editor) return null
    const items: SelectorItem[] = [
        {
            name: 'Bold',
            icon: BoldIcon,
            command: (editor) => editor?.chain().focus().toggleBold().run(),
            isActive : (editor) => editor ? editor.isActive('bold') : false
        },
        {
            name: 'Italic',
            icon: ItalicIcon,
            command: (editor) => editor?.chain().focus().toggleItalic().run(),
            isActive : (editor) => editor ? editor.isActive('italic') : false
        },
        {
            name: 'Underline',
            icon: UnderlineIcon,
            command: (editor) => editor?.chain().focus().toggleUnderline().run(),
            isActive : (editor) => editor ? editor.isActive('underline') : false
        },
        {
            name: 'Strikethrough',
            icon: StrikethroughIcon,
            command: (editor) => editor?.chain().focus().toggleStrike().run(),
            isActive : (editor) => editor ? editor.isActive('strike') : false
        },
        {
            name: 'Code',
            icon: CodeIcon,
            command: (editor) => editor?.chain().focus().toggleCode().run(),
            isActive : (editor) => editor ? editor.isActive('code') : false
        },
    ]

    return (
        <div className='flex gap-2'>
            {items.map((item) => (
                <Button
                    key={item.name}
                    variant='ghost'
                    className={cn(
                        'flex items-center gap-2',
                        item.isActive(editor) ? 'text-primary' : 'text-gray-500'
                    )}
                    onClick={(evt) => {
                        item.command(editor)
                        evt.preventDefault()
                    }}
                >
                    <item.icon className='h-4 w-4' />
                    <span>{item.name}</span>
                </Button>
            ))}
        </div>
    )
}