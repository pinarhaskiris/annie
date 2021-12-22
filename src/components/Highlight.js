import React from "react";

function textNodesUnder(node) {
  var all = [];
  for (node = node.firstChild; node; node = node.nextSibling) {
    if (node.nodeType == 3) all.push(node);
    else all = all.concat(textNodesUnder(node));
  }
  return all;
}

const Mark = ({ id, children, removeRange, colorClass }) => {
  const handleClick = event => {
    event.stopPropagation();
    removeRange(id);
  };
  return (
    <mark className={colorClass} onClick={handleClick}>
      {children}
    </mark>
  );
};

const Highlightable = ({ ranges, text, handleHighlight, deleteMark, colorClass }) => {
  const onMouseUp = event => {
    if (event.target !== myRef.current) return;
    event.stopPropagation();

    const range = window.getSelection().getRangeAt(0);

    const commonParent = range.commonAncestorContainer;

    if (range.startContainer !== commonParent) {
      console.log("There is another element in here");
      return;
    }

    if (range.startContainer.nodeType !== Node.TEXT_NODE) {
      console.log("Not a TEXT NODE");
      return;
    }

    if (range.startOffset === range.endOffset) {
      console.log("Same offset");
      return;
    }

    console.log(range.startOffset, range.endOffset);

    // Get Index of the Highlighted Container
    const thisIdx = Array.prototype.indexOf.call(
      myRef.current.childNodes,
      range.startContainer
    );

    // Collect all Text Nodes from start until this node
    const allTextNodes = [];
    for (let i = 0; i < thisIdx; i++) {
      const node = myRef.current.childNodes[i];

      if (node.nodeType == Node.TEXT_NODE) {
        allTextNodes.push(node);
      } else {
        allTextNodes.push(textNodesUnder(node));
      }
    }

    // Get total length of all those Text Nodes combined
    const lenPrev = allTextNodes.flat().reduce((t, x) => t + x.length, 0);
    const startIndex = lenPrev + range.startOffset;
    const endIndex = lenPrev + range.endOffset;

    handleHighlight({
      id: Math.random()
        .toString(16)
        .slice(2),
      offset: startIndex,
      length: endIndex - startIndex
    });
  };

  const removeRange = range => {
    deleteMark(range);
  };

  const processText = () => {
    ranges.sort((a, b) => a.offset - b.offset);

    if (ranges.length === 0) return text;

    const out = [text.slice(0, ranges[0].offset)];

    for (let i = 0; i < ranges.length - 1; i++) {
      const range = ranges[i];
      const nextRange = ranges[i + 1];
      out.push(
        <Mark key={range.id} id={range.id} removeRange={removeRange} colorClass={colorClass}>
          {text.slice(range.offset, range.offset + range.length + 1)}
        </Mark>
      );
      out.push(text.slice(range.offset + range.length + 1, nextRange.offset));
    }

    const lastRange = ranges[ranges.length - 1];
    out.push(
      <Mark key={lastRange.id} id={lastRange.id} removeRange={removeRange}>
        {text.slice(lastRange.offset, lastRange.offset + lastRange.length + 1)}
      </Mark>
    );
    out.push(text.slice(lastRange.offset + lastRange.length + 1, text.length));

    return out;
  };

  const newText = processText();

  const myRef = React.createRef();

  return (
    <div ref={myRef} onMouseUp={onMouseUp}>
      {newText}
    </div>
  );
};

export default Highlightable;
