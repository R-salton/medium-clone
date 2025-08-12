
'use client'

import React, { useState, useEffect } from 'react'
import  { cn } from '@/lib/utils'
import  {Post } from '@/lib/types'

import {
    EditorCommand,
    EditorCommandEmpty,
    EditorContent,
    EditorCommandItem,
    EditorCommandList,
    type EditorInstance,
    EditorRoot,
    type JSONContent,
    EditorBubble,
    EditorBubbleItem,
    useEditor
    

} from 'novel'

import { ImageResizer, handleCommandNavigation} from 'novel'
import { handleImageDrop, handleImagePaste } from 'novel'

import { slashCommands,suggestionItem } from '@/lib/slash-commands/slash-commands'
import { EditorMenu } from './editor-menu'
import { uploadFn } from  '../../components/editor/image-upload'
import { defaultExtensions } from './extensions'
import { TextButtons } from '../../components/editor/selectors/text-buttons'
import { LinkSelector } from '../../components/editor/selectors/link-selector'
import { NodeSelector } from '../../components/editor/selectors/node-selector'
import { MathSelector } from '../../components/editor/selectors/math-selector'
import { ColorSelector } from '../../components/editor/selectors/color-selector'

import { Separator  } from '@/components/ui/separator'
import { init } from 'next/dist/compiled/webpack/webpack'
import { set } from 'zod'


const hljs = require('highlight.js')

const extensions = [ ...defaultExtensions, slashCommands]
interface EditorProps {
  editable: boolean;
  setContent: (content: JSONContent) => void;
}

export const Editor = ({ editable, setContent }: EditorProps) => {
    const { editor } = useEditor()

    if (!editor) return null
    return (
        <div className="relative w-full max-w-screen-lg">
            <EditorRoot>

                <EditorContent 
               immediatelyRender= {false}
               initialContent={initialContent}
               extensions={extensions}
               className={cn(
                 'relative w-full max-w-screen-lg bg-[#000319]',
                 editable
                   ? 'h[450px] overflow-scroll rounded-md border border-input shadow-sm'
                   : 'min-h-[500px]'
               )}
               editorProps={
                {
                    handleDOMEvents: {
                        keydown: (view, event) => handleCommandNavigation(event)
                    },
                    handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
                    handleDrop: (view, event,_slice, moved) => handleImageDrop(view, event, moved, uploadFn),
                    attributes: {
                        class: `prose dark prose-headings:font-title font-default`
                    }

                }}
                onUpdate = {({editor}) => {
                    if (!editable) setContent(editor.getJSON())
                }}
            onCreate={({editor}) => {
                if (!editable) setContent(editor.getJSON())
            }}
            slotAfter= {<ImageResizer />}
        >
            <EditorCommand className='z-50 h-auto max-h-[330px] overflow-y-auto rounded-md'>
                <EditorCommandEmpty>
                    No Resultss
                </EditorCommandEmpty>
                <EditorCommandList>
                    {suggestionItems.map((item) => (
                        <EditorCommandItem
                            key={item.title}
                            value={item.title}
                            onSelect={({editor, range}) => {
                                editor.chain().focus().deleteRange(range).insertContent(item.command?.({editor, range})).run()
                            }}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </EditorCommandItem>
                    ))}
                </EditorCommandList>

            </EditorCommand>


                </EditorContent>
            </EditorRoot>
        </div>
    )
}