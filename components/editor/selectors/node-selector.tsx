import {
    Check,
    ChevronDown,
    Code,
    CheckSquare,
    Heading1,
    Heading2,
    Heading3,
    ListOrdered,
    type LucideIcon,
    TextIcon,
    TextQuote,

} from 'lucide-react'

import { useEditor , EditorBubbleItem } from 'novel'
import { Button } from '@/components/ui/button'
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Popover } from '@radix-ui/react-popover'


export type SelectorItem = {
    name: string,
    icon: LucideIcon,
    command: (editor: ReturnType<typeof useEditor>['editor']) => void
    isActive: (editor: ReturnType<typeof useEditor>['editor']) => boolean
}

const items: SelectorItem[] = [
    {
        name : 'Text',
        icon: TextIcon,
        command: (editor) => editor?.chain().focus().clearNodes().run(),
        isActive: editor =>
            editor 
            ? editor.isActive('paragraph') && 
            !editor.isActive('bulletList') &&
            !editor.isActive('orderedList') 
            : false
    },
    {
        name : 'Heading 1',
        icon: Heading1,
        command: editor =>
            editor?.chain().focus().clearNodes().toggleHeading({ level: 1 }).run(),
        isActive: editor =>
            editor ? editor.isActive('heading', { level: 1 }) : false
    },
    {
        name : 'Heading 2',
        icon: Heading2,
        command: editor =>
            editor?.chain().focus().clearNodes().toggleHeading({ level: 2 }).run(),
        isActive: editor =>
            editor ? editor.isActive('heading', { level: 2 }) : false
    },
    {
        name : 'Heading 3',
        icon: Heading3,
        command: editor =>
            editor?.chain().focus().clearNodes().toggleHeading({ level: 3 }).run(),
        isActive: editor =>
            editor ? editor.isActive('heading', { level: 3 }) : false
    },
    
]