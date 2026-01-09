import { useEditor, EditorContent } from '@tiptap/react';
import { useState, useEffect } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorToolbar } from './EditorToolbar';
import './RichTextEditor.css';

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    minHeight?: string;
}

export const RichTextEditor = ({
    value,
    onChange,
    placeholder = 'Start writing...',
    minHeight = '400px',
}: RichTextEditorProps) => {
    const [isHtmlMode, setIsHtmlMode] = useState(false);
    const [internalValue, setInternalValue] = useState(value);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
            Image.configure({ HTMLAttributes: { class: 'editor-image' } }),
            Link.configure({ openOnClick: false, HTMLAttributes: { class: 'editor-link' } }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Underline,
            Placeholder.configure({ placeholder }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            if (!isHtmlMode) onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none max-w-none',
                style: `min-height: ${minHeight}`,
            },
        },
    });

    useEffect(() => {
        if (editor && !isHtmlMode && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor, isHtmlMode]);

    const toggleHtmlMode = () => {
        const newMode = !isHtmlMode;
        setIsHtmlMode(newMode);
        if (newMode && editor) setInternalValue(editor.getHTML());
        else if (editor) editor.commands.setContent(internalValue);
    };

    const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newVal = e.target.value;
        setInternalValue(newVal);
        onChange(newVal);
    };

    return (
        <div className="rich-text-editor border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900">
            <EditorToolbar editor={editor} isHtmlMode={isHtmlMode} onToggleHtmlMode={toggleHtmlMode} />
            <div className="p-4">
                {isHtmlMode ? (
                    <textarea
                        value={internalValue}
                        onChange={handleHtmlChange}
                        className="w-full font-mono text-sm p-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ minHeight, height: minHeight }}
                        spellCheck={false}
                    />
                ) : (
                    <EditorContent editor={editor} />
                )}
            </div>
        </div>
    );
};
