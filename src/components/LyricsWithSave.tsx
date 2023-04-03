import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { createEditor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { LyricSpan } from './LyricSpan';
import { SavePopover } from './SavePopover';
import { DeleteDialog } from './DeleteDialog';
import { LoadDialog } from './LoadDialog';

import { CustomType, footerHeight, headerHeight, Key } from '../Constants';

import type { ClipboardEvent, KeyboardEvent } from 'react';
import type { BaseEditor, Descendant } from 'slate';
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

const EDITOR_PLACEHOLDER = 'Type or paste lyrics here...';

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '\x00' }],
    customType: CustomType.INIT,
  },
];

const paddingHeight = 32;
const heightDiff = headerHeight + footerHeight + paddingHeight;
const editorStyle = {
  height: '100%',
  maxHeight: `calc(100vh - ${heightDiff}px)`,
};

export const LyricsWithSave = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [editorValue, setEditorValue] = useState(initialValue);
  const [savedDateTime, setSavedDateTime] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState<boolean>(false);

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

  const handleSaveButtonClick = () => {
    const now = Date.now();
    // use array so that multiple songs can be saved in future
    const songs = [
      {
        saveDateTime: now,
        saveEditorValue: editorValue,
      },
    ];

    localStorage.setItem('songs', JSON.stringify(songs));
    setSavedDateTime(now);
  };

  const getSavedLyricsAndSetToState = () => {
    const json = localStorage.getItem('songs');

    if (json) {
      const song = JSON.parse(json)[0];
      const { saveDateTime, saveEditorValue } = song;

      Transforms.removeNodes(editor, {
        match: (node: any) => (node.customType === CustomType.INIT ? true : false),
      });

      Transforms.insertNodes(editor, saveEditorValue);

      setSavedDateTime(saveDateTime);
    }
  };

  const handleDelete = () => {
    localStorage.clear();

    setSavedDateTime(null);
    setIsDeleteDialogOpen(false);
  };

  const handleLoad = () => {
    getSavedLyricsAndSetToState();
    setIsLoadDialogOpen(false);
  };

  useEffect(() => {
    getSavedLyricsAndSetToState();
  }, []);

  return (
    <>
      <Box sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', minHeight: '60px', pb: 2 }}>
          <Box pr={2}>
            <Button
              variant="contained"
              size="small"
              onClick={handleSaveButtonClick}
              sx={{ fontSize: '12px' }}
            >
              Save
            </Button>
          </Box>
          {!!savedDateTime && (
            <SavePopover
              savedDateTime={savedDateTime}
              setIsLoadDialogOpen={setIsLoadDialogOpen}
              setIsDeleteDialogOpen={setIsDeleteDialogOpen}
            />
          )}
        </Box>
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
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        handleDelete={handleDelete}
      />
      <LoadDialog
        isOpen={isLoadDialogOpen}
        setIsOpen={setIsLoadDialogOpen}
        handleLoad={handleLoad}
      />
    </>
  );
};