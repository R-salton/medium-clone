
import { Button } from "@/components/ui/button"; 
import { cn } from "@/lib/utils";
import { useEditor } from "novel";
import  { SigmaIcon } from  'lucide-react'


export const MathSelector = () => {
    const { editor } = useEditor()

    if (!editor) return null
    return (
        <Button
         variant='ghost'
         className="w-12 rounded-none"
         onClick={(evt) => {

            if(editor.isActive('math')){
                 editor.chain().focus().unsetLatex().run()
            }
            else {
                editor.chain().focus().setLatex({ latex: "" }).run()
            }
            evt.preventDefault()
           
         }}
         />
    )
}