
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
    type JSONContent

} from 'novel'

import { ImageResizer, handleCommandNavigation} from 'novel'
import { handleImageDrop, handleImagePaste } from 'novel'

import { slashCommands,suggestionItem } from '@/lib/slash-commands'
import EditorMenu from '../../components/editor/editor-menu'
import { uploadFn } from  '../../components/editor/image-upload'
import { defaultExtensions} from '../components/editor/extensions'
import { TextButtons } from '../../components/editor/selectors/text-buttons'
import { LinkSelector } from '../../components/editor/selectors/link-selector'
import { NodeSelector } from '../../components/editor/selectors/node-selector'
import { MathSelector } from '../../components/editor/selectors/math-selector'
import { ColorSelector } from '../../components/editor/selectors/color-selector'

import { Separator  } from '@/components/ui/separator'


const hljs = require('highlight.js')

const extensions = [ ...defaultExtensions, slashCommands]
