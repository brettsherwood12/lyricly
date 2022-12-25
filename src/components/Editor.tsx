import React, { useState, useMemo, useCallback } from 'react';
import { Box } from '@mui/material';
import { createEditor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { LyricSpan } from './LyricSpan';

import { Key } from '../Constants';

import type { KeyboardEvent, ClipboardEvent } from 'react';
import type { BaseEditor, Descendant, Element } from 'slate';
import type { ReactEditor, RenderElementProps } from 'slate-react';

type CustomText = { text: string };
type CustomElement = { type: string; children: CustomText[] };

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
  pt: 2,
};

const PLACEHOLDER_TEXT = 'Type or paste lyrics here...';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export const Editor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [editorValue, setEditorValue] = useState(initialValue);

  const renderElement = useCallback((props: RenderElementPropsWithCustomProperty) => {
    if (props.element.isLyric) {
      return <LyricSpan {...props} />;
    } else {
      return <span {...props.attributes}>{props.children}</span>;
    }
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;

    const isSpaceKey = key === Key.SPACE;
    const isEnterKey = key === Key.ENTER;
    const isDeleteKey = key === Key.DELETE;
    const isBackspaceKey = key === Key.BACKSPACE;

    if (isSpaceKey || isEnterKey) {
      event.preventDefault();
      //@ts-ignore
      Transforms.setNodes(editor, { isLyric: true });

      const whitespace = isEnterKey ? '\n' : ' ';

      const whitespaceNode = { type: 'span', children: [{ text: whitespace }] };
      const nextLyricNode = { type: 'span', children: [{ text: '' }] };
      const nodes = [whitespaceNode, nextLyricNode];

      Transforms.insertNodes(editor, nodes);
    } else if (isDeleteKey || isBackspaceKey) {
      console.log(event);
    }
  };

  const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault();

    const pasteText = event.clipboardData.getData('text/plain');
    const lines = pasteText.split('\n');

    let nodes: Descendant[] = [];

    lines.forEach((line) => {
      const lyrics = line.split(' ');
      lyrics.forEach((lyric) => {
        const whitespaceNode = { type: 'span', children: [{ text: ' ' }] };
        const lyricNode = { type: 'span', children: [{ text: lyric }], isLyric: true };

        nodes.push(lyricNode);
        nodes.push(whitespaceNode);
      });
    });

    Transforms.insertNodes(editor, nodes);
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
