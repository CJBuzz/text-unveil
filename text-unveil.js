const displayNextLetter = (text, containerEl, resolvePromise, letterDelay) => {
  if (text === "") {
    resolvePromise("Promise Resolved");
    return;
  }

  containerEl.innerHTML += text.charAt(0);
  setTimeout(
    displayNextLetter,
    letterDelay,
    text.slice(1),
    containerEl,
    resolvePromise,
    letterDelay
  );
};

const traverse = (elementNode, containerEl, letterDelay) => {
  const promiseArr = [];
  elementNode.childNodes.forEach((childNode) => {
    //Create a promise a variable that stores the function to resolve it
    let resolvePromise;
    const newPromise = new Promise((res) => {
      resolvePromise = res;
    });

    if (childNode.nodeType === Node.TEXT_NODE) {
      //Wait for sibling promises to resolve
      Promise.all(promiseArr).then(() =>
        displayNextLetter(
          childNode.data,
          containerEl,
          resolvePromise,
          letterDelay
        )
      );
    } else if (childNode.nodeType === Node.ELEMENT_NODE) {
      //Wait for sibling promises to resolve
      Promise.all(promiseArr).then(() => {
        //Create a new element of same type as what is parsed
        let newEl = document.createElement(childNode.tagName.toLowerCase());

        //Copy attributes
        Array.from(childNode.attributes).forEach((attr) => {
          newEl.setAttribute(attr.name, attr.value);
        });

        //Append to parent element
        let appendedNode = containerEl.appendChild(newEl);

        //Traverse children (returns array of promises from children)
        const childPromises = traverse(childNode, appendedNode, letterDelay);

        //Wait for child promises to resolve before resolving node promise
        Promise.all(childPromises).then(() => resolvePromise());
      });
    }
    promiseArr.push(newPromise);
  });
  return promiseArr;
};

const unveil = (input, containerEl, letterDelay = 30, callback = () => {}) => {
  let element

  if (typeof input === 'string') {
    const doc = new DOMParser().parseFromString(
      htmlString.trim().replace(/>\s+</g, "><"),
      "text/html"
    );
    element = doc.body
  }
  
  else if (input instanceof Node && input.nodeType === Node.ELEMENT_NODE) element = input

  else console.error("Argument 'input' requires a html string or an Element Node object!")

  const traversePromise = traverse(element, containerEl, letterDelay)
  Promise.all(traversePromise).then(()=> {
    if (typeof callback === 'function') callback()
    else console.warn("Argument 'callback' requires a function!")
  }
  );
};
