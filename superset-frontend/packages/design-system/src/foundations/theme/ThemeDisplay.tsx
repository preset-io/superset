import React from 'react';
import { styled, useTheme } from '.';

const CodeBlock = styled.pre`
  ${({ theme }) => `
  font-family: ${theme.typography.families.monospace};
  font-size: 0.85em;

  .string {
    color: #008000;
  }

  .number {
    color: #ff8c00;
  }

  .boolean {
    color: #0000ff;
  }

  .null {
    color: #ff00ff;
  }

  .key {
    color: #ff0000;
  }
  `}
`;

const syntaxHighlight = (json: string) => {
  const styledJson = json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return styledJson.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return `<span class="${cls}">${match}</span>`;
    },
  );
};

const ThemeDisplay = () => {
  const currentTheme = useTheme();
  let themeString = 'Unable to parse theme...';
  try {
    themeString = syntaxHighlight(JSON.stringify(currentTheme, null, 4));
  } catch (e) {
    themeString = 'Unable to parse theme...';
    console.error(e);
  }

  return <CodeBlock dangerouslySetInnerHTML={{ __html: themeString }} />;
};

export default ThemeDisplay;
