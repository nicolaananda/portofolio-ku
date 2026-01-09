import { Editor } from '@tiptap/react';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Link as LinkIcon,
    Image as ImageIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Minus,
    FileCode,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface EditorToolbarProps {
    editor: Editor | null;
    isHtmlMode: boolean;
    onToggleHtmlMode: () => void;
}

export const EditorToolbar = ({ editor, isHtmlMode, onToggleHtmlMode }: EditorToolbarProps) => {
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');

    if (!editor && !isHtmlMode) {
        return null;
    }

    const addImage = () => {
        if (!editor) return;
        const url = window.prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        if (!editor) return;
        if (linkUrl) {
            editor.chain().focus().setLink({ href: linkUrl }).run();
            setLinkUrl('');
            setShowLinkInput(false);
        }
    };

    const removeLink = () => {
        if (!editor) return;
        editor.chain().focus().unsetLink().run();
    };

    const ToolbarButton = ({
        onClick,
        isActive = false,
        children,
        title,
    }: {
        onClick: () => void;
        isActive?: boolean;
        children: React.ReactNode;
        title: string;
    }) => (
        <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClick}
            className={`h-8 w-8 p-0 ${isActive ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
            title={title}
        >
            {children}
        </Button>
    );

    return (
        <div className="border-b border-gray-300 dark:border-gray-700 p-2 flex flex-wrap gap-1 bg-gray-50 dark:bg-gray-800">
            {/* Source Code Toggle */}
            <div className="flex gap-1 border-r border-gray-300 dark:border-gray-700 pr-2 mr-2">
                <ToolbarButton
                    onClick={onToggleHtmlMode}
                    isActive={isHtmlMode}
                    title={isHtmlMode ? "Switch to Visual Editor" : "View Source Code"}
                >
                    <FileCode className="h-4 w-4" />
                </ToolbarButton>
            </div>

            {/* Text Formatting - Only show if NOT in HTML mode */}
            {!isHtmlMode && editor && (
                <>
                    <div className="flex gap-1 border-r border-gray-300 dark:border-gray-700 pr-2">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            isActive={editor.isActive('bold')}
                            title="Bold (Ctrl+B)"
                        >
                            <Bold className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            isActive={editor.isActive('italic')}
                            title="Italic (Ctrl+I)"
                        >
                            <Italic className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            isActive={editor.isActive('underline')}
                            title="Underline (Ctrl+U)"
                        >
                            <UnderlineIcon className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            isActive={editor.isActive('strike')}
                            title="Strikethrough"
                        >
                            <Strikethrough className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            isActive={editor.isActive('code')}
                            title="Inline Code"
                        >
                            <Code className="h-4 w-4" />
                        </ToolbarButton>
                    </div>

                    {/* Headings */}
                    <div className="flex gap-1 border-r border-gray-300 dark:border-gray-700 pr-2">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            isActive={editor.isActive('heading', { level: 1 })}
                            title="Heading 1"
                        >
                            <Heading1 className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            isActive={editor.isActive('heading', { level: 2 })}
                            title="Heading 2"
                        >
                            <Heading2 className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            isActive={editor.isActive('heading', { level: 3 })}
                            title="Heading 3"
                        >
                            <Heading3 className="h-4 w-4" />
                        </ToolbarButton>
                    </div>

                    {/* Lists */}
                    <div className="flex gap-1 border-r border-gray-300 dark:border-gray-700 pr-2">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            isActive={editor.isActive('bulletList')}
                            title="Bullet List"
                        >
                            <List className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            isActive={editor.isActive('orderedList')}
                            title="Numbered List"
                        >
                            <ListOrdered className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            isActive={editor.isActive('blockquote')}
                            title="Quote"
                        >
                            <Quote className="h-4 w-4" />
                        </ToolbarButton>
                    </div>

                    {/* Alignment */}
                    <div className="flex gap-1 border-r border-gray-300 dark:border-gray-700 pr-2">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            isActive={editor.isActive({ textAlign: 'left' })}
                            title="Align Left"
                        >
                            <AlignLeft className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            isActive={editor.isActive({ textAlign: 'center' })}
                            title="Align Center"
                        >
                            <AlignCenter className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            isActive={editor.isActive({ textAlign: 'right' })}
                            title="Align Right"
                        >
                            <AlignRight className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                            isActive={editor.isActive({ textAlign: 'justify' })}
                            title="Justify"
                        >
                            <AlignJustify className="h-4 w-4" />
                        </ToolbarButton>
                    </div>

                    {/* Links & Images */}
                    <div className="flex gap-1 border-r border-gray-300 dark:border-gray-700 pr-2">
                        <ToolbarButton
                            onClick={() => setShowLinkInput(!showLinkInput)}
                            isActive={editor.isActive('link')}
                            title="Insert Link"
                        >
                            <LinkIcon className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton onClick={addImage} title="Insert Image">
                            <ImageIcon className="h-4 w-4" />
                        </ToolbarButton>
                    </div>

                    {/* Other */}
                    <div className="flex gap-1 border-r border-gray-300 dark:border-gray-700 pr-2">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                            title="Horizontal Rule"
                        >
                            <Minus className="h-4 w-4" />
                        </ToolbarButton>
                    </div>

                    {/* Undo/Redo */}
                    <div className="flex gap-1">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().undo().run()}
                            title="Undo (Ctrl+Z)"
                        >
                            <Undo className="h-4 w-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().redo().run()}
                            title="Redo (Ctrl+Y)"
                        >
                            <Redo className="h-4 w-4" />
                        </ToolbarButton>
                    </div>

                    {/* Link Input */}
                    {showLinkInput && (
                        <div className="w-full mt-2 flex gap-2">
                            <input
                                type="url"
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                                placeholder="Enter URL..."
                                className="flex-1 px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setLink();
                                    }
                                }}
                            />
                            <Button type="button" size="sm" onClick={setLink}>
                                Add Link
                            </Button>
                            <Button type="button" size="sm" variant="outline" onClick={removeLink}>
                                Remove Link
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => setShowLinkInput(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
