# Text Unveil

Text Unveil is a simple javascript module to display text letter by letter, mimicking a typing effect.

## Usage

#### Add to HTML File

```html
<!--Include the line below in your html file-->
<script src="https://cjbuzz.github.io/text-unveil/text-unveil.js"></script>
```

#### Usage on a HTML string

Use the `unveil` function

```js
unveil(htmlString, containerElement, delay, callback);
//htmlString is the string in html syntax
//containerElement is a html element object
//delay is the time (in milliseconds) between each successive letter being revealed
//callback is a function to be executed after the html elements finished loading
```

Example:

```js
//If you have a HTML String
const htmlString = `<div>
                        <h1>This is the title</h1>
                        <p>This is a paragraph</p>
                    </div>`;

//Make a container element
const unveilContainer = document.createElement("div");
unveil(htmlString, unveilContainer, 50, () => console.log('Finished Loading!'));
```

You can refer to `showcase.html` for another example. The page looks like [this](https://cjbuzz.github.io/text-unveil/showcase.html).

#### Adding to a HTML Element

Alternatively, if you a HTML element with children nodes that was created using `document.createElement` or other means (not yet displayed in DOM) and you wish to directly apply text unveil, simply change the first argument to the element object instead.

```js
unveil(element, containerElement, delay, callback);
//element is a HTML element object
```
