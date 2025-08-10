import {
    AIHighlight,
    CharacterCount,
    CodeBlockLowlight,
    Color,
    CustomKeymap,
    GlobalDragHandle,
    HighlightExtension,
    HorizontalRule,
    Placeholder,
    StarterKit,
    TaskItem,
    TaskList,
    TextStyle,
    TiptapImage,
    TiptapLink,
    TiptapUnderline,
    Twitter,
    UpdatedImage,
    Youtube,
    Mathematics,
    EditorContent,
   
    ImageResizer,
    
   
   
   
}
from 'novel'


import { UploadImagesPlugin } from 'novel'
import { common  , createLowlight } from 'lowlight'
import { cx } from 'class-variance-authority'

//TODO I am using cx here to get tailwind autocomplete working idk if someone else can write a regex to just

const aiHighlight  = AIHighlight
const placeholder = Placeholder
const tiptapLink = TiptapLink.configure({
    HTMLAttributes: {
        class: cx('text-blue-500 hover:underline'),
        target: '_blank',
        rel: 'noopener noreferrer',
    },
})
const highlight = HighlightExtension.configure({
    multicolor: true,
})

export const defaultExtensions = [
    placeholder,
    highlight,
   
    tiptapLink,
    aiHighlight,
]

export const extensions = [
    placeholder,
    highlight,
    
    tiptapLink,
]

export const extensionsWithAI = [
    placeholder,
    highlight,
    
    tiptapLink,
]

export const extensionsWithAIAndMath = [
    placeholder,
    highlight,

]
    