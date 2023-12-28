import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Box, Button, Divider } from '@mui/material';
import { createEditor, Editor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { LyricSpan } from './LyricSpan';
import { SavePopover } from './SavePopover';
import { ActionDialog } from './ActionDialog';

import { CustomType, footerHeight, headerHeight, Key } from '../Constants';

import type { ClipboardEvent, KeyboardEvent } from 'react';
import type { BaseEditor, Descendant } from 'slate';
import type { ReactEditor, RenderElementProps } from 'slate-react';
import type { Action } from './ActionDialog';

type CustomText = { text: string; customType?: CustomType };
type CustomElement = { type: string; children: CustomText[] };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const EDITOR_PLACEHOLDER = 'Type or paste lyrics here...';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
    customType: CustomType.INIT,
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
  const [savedDateTime, setSavedDateTime] = useState<number | null>(null);
  const [dialogAction, setDialogAction] = useState<Action | null>(null);

  const isEditorEmpty = useMemo(() => {
    for (let node of editorValue) {
      // @ts-ignore
      const children = node.children;
      for (let child of children) {
        if (!!child.text) {
          return false;
        }
      }
    }
    return true;
  }, [editorValue]);

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

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;

    const isBackspace = key === Key.BACKSPACE;
    const isDelete = key === Key.DELETE;
    const isSpace = key === Key.SPACE;
    const isEnter = key === Key.ENTER;

    const { selection } = editor;

    if (!selection) {
      return;
    }

    if (isBackspace || isDelete) {
      const { path } = selection.anchor;

      // @ts-ignore
      const selectionWord = editor.children[path[0]].children[path[1]];

      if (selectionWord.customType === CustomType.LYRIC) {
        // if deleting characters of a <LyricSpan /> turn it back into normal text
        Transforms.setNodes(editor, { customType: undefined }, { at: selection.anchor.path });
      }

      if (selectionWord.text === '\x00') {
        // if the selection is any empty node the default event will delete it but
        // won't move the cursor backwards, this additional delete then does so
        editor.deleteBackward('character');
      }
    }

    if (isSpace || isEnter) {
      event.preventDefault();

      Transforms.setNodes(editor, { customType: CustomType.LYRIC }, { at: selection.anchor.path });

      if (isSpace) {
        Transforms.insertNodes(editor, [
          { text: ' ', customType: CustomType.SPACE },
          { text: '\x00', customType: undefined },
        ]);
      } else {
        Transforms.insertNodes(editor, [{ type: 'paragraph', children: [{ text: '' }] }]);
      }
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
        nodes[lineIndex].children.push({ text: `\x00${word}`, customType: CustomType.LYRIC });

        if (wordIndex < words.length - 1) {
          nodes[lineIndex].children.push({ text: ' ', customType: CustomType.SPACE });
        }
      });
    });

    Transforms.removeNodes(editor, {
      match: (node: any) => node.customType === CustomType.INIT,
    });

    Transforms.insertNodes(editor, nodes);
  };

  const getSavedLyrics = () => {
    const json = localStorage.getItem('songs');

    if (json) {
      const song = JSON.parse(json)[0];
      const { saveDateTime, saveEditorValue } = song;

      Transforms.delete(editor, {
        at: {
          anchor: Editor.start(editor, []),
          focus: Editor.end(editor, []),
        },
      }); // clear out editor

      Transforms.insertNodes(editor, saveEditorValue);

      // for some reason the init node persists even after editor is cleared, delete it
      Transforms.delete(editor, { at: Editor.start(editor, [0, 0]) });

      setSavedDateTime(saveDateTime);
    }
  };

  const handleSave = () => {
    const now = Date.now();
    const songs = [
      {
        saveDateTime: now,
        saveEditorValue: editorValue,
      },
    ]; // use array so that multiple songs can be saved in future

    localStorage.setItem('songs', JSON.stringify(songs));
    setSavedDateTime(now);
  };

  const handleDelete = () => {
    localStorage.clear();

    setSavedDateTime(null);
  };

  const handleLoad = () => {
    getSavedLyrics();
  };

  const handleAction = () => {
    if (dialogAction === 'save') {
      handleSave();
    } else if (dialogAction === 'load') {
      handleLoad();
    } else if (dialogAction === 'delete') {
      handleDelete();
    }
    setDialogAction(null);
  };

  useEffect(() => {
    getSavedLyrics();
  }, []);

  return (
    <>
      <Box sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', pb: 2 }}>
          <Box pr={2}>
            <Button
              variant="contained"
              size="small"
              onClick={() => setDialogAction('save')}
              disabled={isEditorEmpty}
              sx={{ fontSize: '12px' }}
            >
              Save
            </Button>
          </Box>
          {!!savedDateTime && (
            <SavePopover savedDateTime={savedDateTime} setDialogAction={setDialogAction} />
          )}
        </Box>
        <Divider />
        <Box pt={1}>
          <Slate editor={editor} value={editorValue} onChange={(value) => setEditorValue(value)}>
            <Editable
              placeholder={EDITOR_PLACEHOLDER}
              renderElement={renderElement}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              style={editorStyle}
              spellCheck={false}
            />
          </Slate>
        </Box>
      </Box>
      <ActionDialog action={dialogAction} setAction={setDialogAction} handleAction={handleAction} />
    </>
  );
};
