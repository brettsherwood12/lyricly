import React, { useState, useMemo, useCallback } from 'react';
import { Box } from '@mui/material';
import { createEditor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { Lyric } from './Lyric';

import type { KeyboardEvent, ClipboardEvent } from 'react';
import type { BaseEditor, Descendant, Element } from 'slate';
import type { ReactEditor, RenderElementProps } from 'slate-react';

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string };

type RenderElementPropsWithCustomProperty = RenderElementProps & {
  element: Element & {
    isLyric?: boolean;
  };
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const boxSx = {
  height: '100%',
  // backgroundColor: 'lightgray',
  pt: 2,
};

const PLACEHOLDER_TEXT = 'Type or paste lyrics here...';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export const TextEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [editorValue, setEditorValue] = useState(initialValue);

  const renderElement = useCallback((props: RenderElementPropsWithCustomProperty) => {
    if (props.element.isLyric) {
      return <Lyric {...props} />;
    } else {
      return <span {...props.attributes}>{props.children}</span>;
    }
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    const isSpaceKey = event.key === ' ';
    const isEnterKey = event.key === 'Enter';
    if (isSpaceKey || isEnterKey) {
      event.preventDefault();
      //@ts-ignore
      Transforms.setNodes(editor, { isLyric: true });
      const whitespace = isEnterKey ? '\n' : ' ';
      const whitespaceNode = { type: 'span', children: [{ text: whitespace }] };
      const nextLyricNode = { type: 'span', children: [{ text: '' }] };
      const nodes = [whitespaceNode, nextLyricNode];
      //@ts-ignore
      Transforms.insertNodes(editor, nodes);
    }
  };

  const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const pasteText = event.clipboardData.getData('text/plain');
    console.log(pasteText);
  };

  return (
    <Box sx={boxSx}>
      <Slate editor={editor} value={editorValue} onChange={(value) => setEditorValue(value)}>
        <Editable
          placeholder={PLACEHOLDER_TEXT}
          renderElement={renderElement}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />
      </Slate>
    </Box>
  );
};
