import React, { useState, useMemo, useCallback } from 'react';
import { Box } from '@mui/material';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { Lyrics } from './Lyrics';

import type { BaseEditor, Descendant } from 'slate';
import type { ReactEditor, RenderElementProps } from 'slate-react';

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const boxSx = {
  height: '100%',
  border: '1px solid darkgray',
  borderRadius: '8px',
  padding: '8px',
};

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

export const TextEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [editorValue, setEditorValue] = useState(initialValue);

  const renderElement = useCallback((props: RenderElementProps) => {
    return <Lyrics {...props} />;
  }, []);

  // const renderLeaf = useCallback(({ attributes, children, leaf }: any) => {
  //   console.log(children);
  //   return (
  //     <span
  //       {...attributes}
  //       style={{
  //         color: 'red',
  //       }}
  //     >
  //       {children}
  //     </span>
  //   );
  // }, []);

  return (
    <Box sx={boxSx}>
      <Slate editor={editor} value={editorValue} onChange={(value) => setEditorValue(value)}>
        <Editable
          renderElement={renderElement}
          // renderLeaf={renderLeaf}
        />
      </Slate>
    </Box>
  );
};
