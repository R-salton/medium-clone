import { useEditor, EditorBubbleItem, EditorBubble } from 'novel'
import { removeAIHighlight } from 'novel'
import  { type ReactNode , useEffect} from 'react'


interface BubbleMenuProps {
    children: ReactNode
    open: boolean
    onOpenChange: (open: boolean) => void
}


export const EditorMenu = ({ children, open, onOpenChange }: BubbleMenuProps) => {
    const { editor } = useEditor()

    useEffect(() => {
        if (!editor) return

      if (!open) removeAIHighlight(editor)
    }, [open])

    return (
        <EditorBubble
         tippyOptions={
            {
                placement: open ? 'bottom-start' : 'top',
                duration: 0,
                delay: [0, 0],
                animation: false,
                arrow: false,
                offset: [0, 0],
                onShow: () => {
                    editor?.commands.focus()
                },
            }
         }
            
         >
            {children}
         </EditorBubble>
            

         
    )
}