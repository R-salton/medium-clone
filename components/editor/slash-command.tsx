
import {
    CheckSquare,
    Code,
    Heading1,
    Heading2,
    Heading3,
    ImageIcon,
    List,
    ListOrdered,
    Text,
    TextQuote,
    Twitter,
    Youtube,
} from 'lucide-react'
import  { createSuggestionItems } from 'novel'
import { Command ,renderItems} from 'novel'
import  { uploadFn } from  '../../components/editor/image-upload'

export const suggestionItems = createSuggestionItems(
    [
        {
        title: 'Text',
        description: 'Just start typing with plain text.',
        searchTerms: ['p','paragraph'],
        icon: <Text size={18} />,
        command: ({editor,range}) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .toggleNode( 'paragraph','paragraph')
                .run()
        }
    },
    {
        title: 'To-do List',
        description: 'Track your tasks with a to-do list.',
        searchTerms : ['todo', 'task', 'list','check', 'checkbox'],
        icon: <List size={18} />,
        command: ({editor,range}) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .toggleTaskList()
                .run()
        }
    },
    {
        title: 'Heading 1',
        description : 'Big section heading',
        searchTerms: ['title', 'big','large'],
        icon: <Heading1 size={18} />,
        command: ({editor,range}) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode('heading',{level: 1})
                .run()
        }
    },

    {
        title: 'Heading 2',
        description : 'Medium section heading',
        searchTerms: ['sub-title', 'medium'],
        icon: <Heading2 size={18} />,
        command: ({editor,range}) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode('heading',{level: 2})
                .run()
        }
    }
    
    ]
)