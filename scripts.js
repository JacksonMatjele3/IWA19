import {BOOKS_PER_PAGE, authors, books, genres} from "./data.js"


//filter the books
let matches = [];
let page = 1;
const range = [0, 10];

if (!books || !Array.isArray(books)){

 throw new Error('Source required')};
if (!range || range.length < 2) {
    throw new Error('Range must be an array with two numbers')}

matches = books;

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

const css = {
    day,
    night,
}

function createPreviewsFragment(books, startIndex, endIndex) {
    const fragment = document.createDocumentFragment();
  
    for (let i = startIndex; i < endIndex && i < books.length; i++) {
      const { author, image, title, id } = books[i];
      const preview = createPreview({ author, id, image, title });
      fragment.appendChild(preview);
    }
  
    return fragment;
  }
  

const fragment = document.createDocumentFragment()
let extractedBooks = books.slice(0, 36)

function createPreview({ author, id, image, title }) {
    const preview = document.createElement("div");
    preview.classList.add("book-preview");
    preview.innerHTML = `
      <a href="#" class="book-link" data-id="${id}">
        <img src="${image}" alt="${title}" class="book-image">
        <h2 class="book-title">${title}</h2>
        <p class="book-author">${author}</p>
      </a>
    `;
    return preview;
  }
  

for (let i = 0; i < extractedBooks.length; i++) {
    const { author, image, title, id } = extractedBooks[i]
    const preview = createPreview({
        author,
        id,
        image,
        title
    })

    fragment.appendChild(preview)
}

const dataListItems = document.querySelector('[data-list-items]')
dataListItems.appendChild(fragment)

let genresCopy = [...Object.values(genres)];
genresCopy = document.createDocumentFragment()
let element = document.createElement('option')
element.value = 'any'
//assigning a string to the element
element.appendChild(document.createTextNode('All Genres'))
genresCopy.appendChild(element)

//destructing assignment error
for (const [id, name] of Object.entries(genresCopy)) {
    document.createElement('option')
    element.value = id
    element.innerText = text
    genresCopy.appendChild(element)
}
const dataSearchGenres = document.querySelector('[data-search-genres]')
dataSearchGenres.appendChild(genresCopy)


let authorsCopy = [ ...Object.values(authors)];
authorsCopy = document.createDocumentFragment()
element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Authors'
authorsCopy.appendChild(element)
//destructing assignment error
for (const [id, name]of Object.entries(authorsCopy)) {
    document.createElement('option')
    //value not defined
    element.value = id
    element = text
    authorsCopy.appendChild(element)
}
const dataSearchAuthors = document.querySelector('[data-search-authors]')
dataSearchAuthors.appendChild(authorsCopy)

const dataSettingTheme = document.querySelector('[data-settings-theme]')
dataSettingTheme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
//syntax error :
const v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
//document element
document.documentElement.style.setProperty('--color-dark', css[v].dark);
document.documentElement.style.setProperty('--color-light', css[v].light);
//datalistbutton element in the DOM
const dataListButton = document.querySelector('[data-list-button]');

const actions = {
    list: {
        updateRemaining() {
            dataListButton.innerHTML = `
            <span>Show more</span>
            <span class="list__remaining">
              (${matches.length - (page * BOOKS_PER_PAGE) > 0 ? matches.length - (page * BOOKS_PER_PAGE) : 0})
            </span>
          `;
          dataListButton.disabled = !(matches.length - page * BOOKS_PER_PAGE > 0);
      
        },
    },
    settings: {
        submit(event) {
            event.preventDefault();
            const data = new FormData(dataSettingsForm)
            const theme = data.get("theme")
            if (theme === "day" || theme === "night") {
            document.documentElement.style.setProperty("--color-dark", css[theme].dark);
            document.documentElement.style.setProperty("--color-light", css[theme].light);
            dataSettingsOverlay.open = false;
            }
        },
    },
}

//define event listner
const dataSearchOverlay = document.querySelector('[data-search-overlay]')
const dataSettingsOverlay = document.querySelector('[data-settings-overlay]')
const dataListActive = document.querySelector('[data-list-active]')
const dataSearchCancel = document.querySelector('[data-search-cancel]')
const dataSettingsCancel = document.querySelector('[data-settings-cancel]')
const dataSettingsForm = document.querySelector('[data-settings-form]')
const dataListClose = document.querySelector('[data-list-close]')




dataSearchCancel.addEventListener('click',() => { dataSearchOverlay.open = false })
dataSettingsCancel.addEventListener('click',() => { dataSettingsOverlay.open = false })
dataSettingsForm.addEventListener('submit',(event) => { actions.settings.submit(event); })
dataListClose.addEventListener('click',() => { dataListActive.open = false })

dataListButton.addEventListener('click', () => {
    document.querySelector('[data-list-items]').appendChild(createPreviewsFragment(matches, page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE))
    actions.list.updateRemaining()
    page = page + 1
})
const dataHeaderSearch = document.querySelector('[data-header-search]')
const dataSearchTitle = document.querySelector('[data-search-title]')

dataHeaderSearch.addEventListener('click', () => {
    dataSearchOverlay.open = true ;
    dataSearchTitle.focus();
})
const dataSearchForm = document.querySelector('[data-search-form]')

dataSearchForm.addEventListener('submit', (event) => { // event listner for submit event
    event.preventDefault() //default form submission behavior
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (let i = 0; i < booksList.Length; i++) {
        const book = booksList[i]
        const titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
        const authorMatch = filters.author === 'any' || book.author === filters.author

        let genreMatch = filters.genre === 'any'
        if (!genreMatch) {
            for (let j = 0; j < book.genres.length; i++) { 
                const singleGenre = book.genres[j]
                if (singleGenre === filters.genre) { 
                    genreMatch = true
                break  }// when the match is found break the loop
            }
        }
            if (titleMatch && authorMatch && genreMatch) {
            result.push(book) //add the book to the results
        }
        }


        //update the list
    
           
    })
    //problem when suppose to display
    
    
    const dataListMessage = document.querySelector('[data-list-message]') 
    const dataListItem = document.querySelector('[data-list-items]')
    if (dataListItem) {
        const display = dataListItem.children
        if(display.length < 1){
            dataListMessage.classList.add('list__message_show')
        }
        
    }
    
    else {
        dataListMessage.classList.remove('list__message_show')
    }
    
    

    dataListItem.innerHTML = ''
    const extracted = source.slice(range[0], range[1])

    for (let i = 0; i < extracted.length; i++) {
        const { author: authorId, id, image, title } = extracted[i]

        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)

        element.innerHTML = /* html */ `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[authorId]}</div>
            </div>
        `

        dataListItem.appendChild(element)
    }
    
    
    data-list-items.appendChild(fragment)
    initial = matches.length - (page * BOOKS_PER_PAGE)
    remaining = hasRemaining ? initial : 0
    dataListButton.disabled = initial <= 0

    dataListButton.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

    window.scrollTo({ top: 0, behavior: 'smooth' });
    dataSearchOverlay.open = false

//for the backdrop button for the theme
data-settings-overlay.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = Object.fromEntries(formData);
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    dataSettingsOverlay.open = false;
});

data-list-items.addEventListener('click'),(event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active;

    for (const node of pathArray) {
        if (active) break;
        const previewId = node?.dataset?.preview
    
        for (const singleBook of books) {
            if (singleBook.id === previewId) {
                active = singleBook
                break;
            }
        } 
    }
    const dataListBlur = document.querySelector('[data-list-blur]')
    const dataListTitle = document.querySelector('[data-list-title]')
    const dataListSubtitle = document.querySelector('[data-list-subtitle]')
    const dataListDescription = document.querySelector('[data-list-description]')


    if (!active) return
    dataListActive.open = true
    dataListBlur.src = active.image
    dataListTitle.innerText = active.title

    
    dataListSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
    dataListDescription.innerText = active.description
}
