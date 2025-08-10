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