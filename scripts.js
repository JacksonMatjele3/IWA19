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

const dataListButton = document.querySelector('[data-list-button]');
const dataListItems = document.querySelector('[data-list-items]')
//maximum of 36 books
const fragment = document.createDocumentFragment()
let startIndex = range[0];
let endIndex = startIndex + BOOKS_PER_PAGE;
//To handle the loading Books
function loadBooks(){
    if (endIndex >= books.lengths){
        dataListButton.style.display = 'none'
    }
    const extractedBooks = books.slice(startIndex, endIndex)
    

    for (let i = 0; i < extractedBooks.length; i++){
        const { author, image, title, id} = extractedBooks[i]
        const preview = createPreview({author, id, image, title})
        fragment.appendChild(preview)
    }
    dataListItems.appendChild(fragment)

    startIndex = endIndex
    endIndex += BOOKS_PER_PAGE

}
//calculate the remaining count of books
function updateRemaining(){
    const remainingBooks = matches.length - (page * BOOKS_PER_PAGE);
    const remainingCount = remainingBooks > 0 ? remainingBooks : 0;
    dataListButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining">
      (${remainingCount})
    </span>
  `;
  dataListButton.disabled = !(remainingBooks > 0);

  if (remainingBooks > 0) {
    dataListButton.addEventListener('click', handleShowMore);
  } else {
    dataListButton.disabled
  }
}



function handleShowMore(){
    page++
    updateRemaining()
    loadBooks();
}

dataListButton.addEventListener('click' , handleShowMore);
loadBooks();

//display
function createPreview({ author, id, image, title }) {
    const preview = document.createElement("div");
    preview.classList.add("book-preview");
    //UUIDs for author
    const authorName = authors[author];

    preview.innerHTML = `
      <a href="#" class="book-link" data-id="${id}">
        <img src="${image}" alt="${title}" class="book-image">
        <h2 class="book-title">${title}</h2>
        <p class="book-author">${authorName}</p>
      </a>
    `;
    return preview;
  } 

  

//for the overlay search
const dataSearchGenres = document.querySelector('[data-search-genres]')

//all genre option
const genreElement = document.createElement('option')
genreElement.value = 'any'
genreElement.textContent = 'All Genres'
dataSearchGenres.appendChild(genreElement)

for (const [id, name] of Object.entries(genres)) {
    const genreOption = document.createElement('option');
    genreOption.value = id;
    genreOption.textContent = name;
    dataSearchGenres.appendChild(genreOption);
  }

//dataSearchGenres.appendChild(genresCopy)

//list for authors option
const dataSearchAuthors = document.querySelector('[data-search-authors]')
const element = document.createElement('option')
element.value = 'any'
element.textContent = 'All Authors'
dataSearchAuthors.appendChild(element)

for (const [id, name] of Object.entries(authors)) {
    const authorOption = document.createElement('option');
    authorOption.value = id;
    authorOption.textContent = name;
    dataSearchAuthors.appendChild(authorOption);
  }

//user's preferred color scheme
const dataSettingTheme = document.querySelector('[data-settings-theme]')
dataSettingTheme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
//check whether window.matchMedia exists
const v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
//Css custom properties
document.documentElement.style.setProperty('--color-dark', css[v].dark);
document.documentElement.style.setProperty('--color-light', css[v].light);
//datalistbutton element in the DOM
//
const actions = {

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

//data header settings button
const dataHeaderSettings = document.querySelector('[data-header-settings')
//opening the data settings overlay
dataHeaderSettings.addEventListener('click', () =>{ dataSettingsOverlay.open = true})

//search button
dataSearchCancel.addEventListener('click',() => { dataSearchOverlay.open = false })
//data settings cancel
dataSettingsCancel.addEventListener('click',() => { dataSettingsOverlay.open = false })

dataSettingsForm.addEventListener('submit',(event) => { actions.settings.submit(event); })
dataListClose.addEventListener('click',() => { dataListActive.open = false })


//opening the search button
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
    const result = searchBooks(filters);

    updateList(result);

//search for the title



        //update the list
    
           
    })

    function searchBooks(filters) {
        const {title, author, genre} = filters

        const results =[];

    for (let i = 0; i < matches.length; i++) {
        const book = matches[i]
        const titleMatch = filters.title.trim() === '' && book.title.toLowerCase().includes(filters.title.toLowerCase())
        const authorMatch = filters.author === 'any' || book.author === filters.author

        let genreMatch = filters.genre === 'any'
        if (!genreMatch) {
            for (let j = 0; j < book.genres.length; i++) { 
                const singleGenre = book.genres[j]
                if (singleGenre === genre) { 
                    genreMatch = true
                break  }// when the match is found break the loop
            }
        }
            if (titleMatch && authorMatch && genreMatch) {
            results.push(book) //add the book to the results
        }
        }
        return results

    }
    
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
    const extracted = books.slice(startIndex, endIndex)


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
    


    window.scrollTo({ top: 0, behavior: 'smooth' });
    dataSearchOverlay.open = false

//for the backdrop button for the theme
dataSettingsOverlay.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = Object.fromEntries(formData);
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    dataSettingsOverlay.open = false;
});

dataListItems.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active;
  
    for (const node of pathArray) {
      if (active) break;
      const previewId = node?.dataset?.preview;
  
      for (const singleBook of books) {
        if (singleBook.id === previewId) {
          active = singleBook;
          break;
        }
      }
    }
  
    const dataListImage = document.querySelector('[data-list-image]')
    const dataListActive = document.querySelector('[data-list-active]');
    const dataListBlur = document.querySelector('[data-list-blur]');
    const dataListTitle = document.querySelector('[data-list-title]');
    const dataListSubtitle = document.querySelector('[data-list-subtitle]');
    const dataListDescription = document.querySelector('[data-list-description]');
  
    if (!active) return;
  
    dataListActive.open = true;
    dataListBlur.src = active.image;
    dataListImage.src = active.image;
    dataListTitle.innerText = active.title;
    dataListSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
    dataListDescription.innerText = active.description;
  });
  