# Delta Lab - Profile Builder
> combine user input, local JSON, and external API into one single object stored in sessionStorage

## gathers data from 3 sources
1. **User input** – name, favorite, and comment from a form  
2. **Local JSON** – options loaded from `data/options.json` into a dropdown  
3. **External API** – a random dog image from [Dog CEO API](https://dog.ceo/dog-api/)

## how to run
1. open with github pages or live server
2. fill out name, favorite, and commit and click create profile
3. check devtools to see that it is saved
4. refresh; profile will still be there
5. click clear session to reset

## project tree

``` 
├── index.html
├── assets/
│   ├── script.js
│   └── style.css
└── data/
└── options.json

```

## tech 
- HTML
- CSS
- JavaScript
- [Dog CEO API](https://dog.ceo/dog-api/)