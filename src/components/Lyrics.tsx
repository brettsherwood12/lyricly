import React from 'react';

import type { RenderElementProps } from 'slate-react';

export const Lyrics = (props: RenderElementProps) => {
  console.log(props);
  return (
    <div {...props.attributes}>
      <span>{props.children}</span>
    </div>
  );
};
