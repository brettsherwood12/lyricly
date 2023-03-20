import { isEmpty } from 'lodash';
import React, { useState, useMemo, useCallback } from 'react';
import { Box } from '@mui/material';
import { createEditor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { LyricSpan } from './LyricSpan';

import { CustomType, footerHeight, headerHeight, Key } from '../Constants';

import type { ClipboardEvent, KeyboardEvent } from 'react';
import type { BaseEditor, Descendant, BaseRange } from 'slate';
import type { ReactEditor, RenderElementProps } from 'slate-react';

type CustomText = { text: string; customType?: CustomType };
type CustomElement = { type: string; children: CustomText[] };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const PLACEHOLDER_TEXT = 'Type or paste lyrics here...';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const paddingHeight = 32;
const heightDiff = headerHeight + footerHeight + paddingHeight;
const editorStyle = {
  height: '100%',
  maxHeight: `calc(100vh - ${heightDiff}px)`,
};

export const Lyrics = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [editorValue, setEditorValue] = useState(initialValue);

  const renderElement = useCallback((props: RenderElementProps) => {
    const { children, element } = props;

    return (
      <>
        <span>
          {children.map((child: any, index: number) => {
            const { customType } = element.children[index];

            if (customType === CustomType.LYRIC) {
              return <LyricSpan child={child} key={`element-${index}`} />;
            } else if (customType === CustomType.SPACE) {
              return (
                <span data-custom-type="space" key={`element-${index}`}>
                  {child}
                </span>
              );
            }

            return <span key={`element-${index}`}>{child}</span>;
          })}
        </span>
        <br />
      </>
    );
  }, []);

  const handleWhitespaceKeydown = (selection: BaseRange, isSpace: boolean) => {
    Transforms.setNodes(editor, { customType: CustomType.LYRIC }, { at: selection.anchor.path });

    if (isSpace) {
      Transforms.insertNodes(editor, [
        { text: ' ', customType: CustomType.SPACE },
        { text: '\u0000', customType: CustomType.INIT },
      ]);
    } else {
      Transforms.insertNodes(editor, [{ type: 'paragraph', children: [{ text: '' }] }]);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;

    const isSpace = key === Key.SPACE;
    const isEnter = key === Key.ENTER;

    const { selection } = editor;

    if (!selection) {
      return;
    }

    if (isSpace || isEnter) {
      event.preventDefault();
      handleWhitespaceKeydown(selection, isSpace);
    }
  };

  const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault();

    const pasteText = event.clipboardData.getData('text/plain');
    const lines = pasteText.split('\n');

    let nodes: any = [];

    lines.forEach((line, lineIndex) => {
      nodes.push({ type: 'paragraph', children: [] });

      const words = line.split(' ');

      words.forEach((word, wordIndex) => {
        nodes[lineIndex].children.push({ text: word, customType: CustomType.LYRIC });

        if (wordIndex < words.length - 1) {
          nodes[lineIndex].children.push({ text: ' ', customType: CustomType.SPACE });
        }
      });
    });

    Transforms.insertNodes(editor, nodes);
  };

  return (
    <Box sx={{ height: '100%' }}>
      <Slate editor={editor} value={editorValue} onChange={(value) => setEditorValue(value)}>
        <Editable
          placeholder={PLACEHOLDER_TEXT}
          renderElement={renderElement}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          style={editorStyle}
          spellCheck={false}
        />
      </Slate>
    </Box>
  );
};
