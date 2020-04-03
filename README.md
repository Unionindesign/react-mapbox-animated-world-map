# react-lzbh3m

Here's a sample app built on stackblitz with ReactJS- how to create a map with animated map markers using React-Map-GL (A react component library built by Uber that uses Mpabox GL JS) along with GSAP (Greensock animation platform). This simple example was used as a codepen when I was having trouble figuring out onClick tooltips for my production maps...while a tooltip typically works while hovering, this can get confusing with thousands of map markers, and React's virtual DOM adds another layer of complexity when attempting to manipulate DOM elements that have not been rendered yet - you also need to create references to these DOM nodes using React's createRef API.

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/react-lzbh3m)
