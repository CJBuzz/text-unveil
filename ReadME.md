# Text Unveil

Text Unveil is a simple javascript module to display text letter by letter, mimicking a typing effect.

## Usage

#### Add to HTML File

```html
<!--Include the line below in your html file-->
<script src="text-unveil.js"></script>
```

#### Adding to a HTML string

Use the `unveil` function

```js
unveil(htmlString, containerElement, delay);
//htmlString is the string in html syntax
//containerElement is a html element object
//delay is the time between each successive letter being revealed
```

Example:

```js
//If you have a HTML String
const htmlString = `<div>
    <h1>This is the title</h1>
    <p>This is a paragraph</p>
</div>
`;

//Make a container element
const unveilContainer = document.createElement("div");
unveil(htmlString, unveilContainer, 50);
```
