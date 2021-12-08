let lib = [];

const localStorageBooks = {
    get getMyBooks() {
        return JSON.parse(localStorage.getItem('myBooks'));
    },

    setMyBooks(books) {
        localStorage.setItem('myBooks', JSON.stringify(books));
    }
};

const setError = (element, message) => {
    document.getElementById(`${element.id}Msg`).innerText = message;
    document.getElementById(`${element.id}Msg`).classList.remove('d-none');
    element.classList.add('error');
    element.classList.remove('success');
}

const setSuccess = element => {
    element.classList.add('success');
    element.classList.remove('error');
    document.getElementById(`${element.id}Msg`).classList.add('d-none');
}

const validate = (title, author, priority, category) => {
    let isValid = true;
    document.getElementById('titleMsg').innerText = "sss"
    if (title.value.trim().length < 1) {
        setError(title, 'Title too short');
        isValid = false;
    } else {
        setSuccess(title);
    }
    if (author.value.trim().length < 3) {
        setError(author, 'Author too short');
        isValid = false;
    } else {
        setSuccess(author);
    }
    if (priority.value < 1 || priority.value > 5) {
        setError(priority, 'Value not in range 1-5');
        isValid = false;
    } else {
        setSuccess(priority);
    }
    if (category.value === "Select category") {
        setError(category,'Select category')
        isValid = false;
    } else {
        setSuccess(category);
    }
    if (isValid) {
        title.classList.remove('success');
        author.classList.remove('success');
        priority.classList.remove('success');
        category.classList.remove('success');
    }

    return isValid;
}

function handleSubmit() {
    event.preventDefault();
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const priority = document.getElementById("priority");
    const category = document.getElementById("category");
    if (validate(title, author, priority, category)) {
        const book = {
            title: title.value,
            author: author.value,
            priority: priority.value,
            category: category.value,
        }
        console.log(book);
        lib.push(book);
        localStorageBooks.setMyBooks(lib);
        document.getElementById("myForm").reset();
        render();
    } else {
        render();
    }

}

function render() {
    let main = document.getElementById("books");
    main.innerHTML = '';
    if (localStorageBooks.getMyBooks) {
        lib = localStorageBooks.getMyBooks;
    }
    console.log(lib);
    lib.map(book => {
        main.innerHTML += `<div class="col-12 col-lg-6 col-xl-4 p-1">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title text-center mx-auto">"${book.title}"</h2>
                                        <h6 class="card-subtitle mb-2 mt-1 text-muted text-right">~${book.author}</h6>
                                        <p class="card-text m-0 p-0">Priority: <b>${book.priority}</b></p>
                                        <p class="card-text m-0 p-0">Category: <b>${book.category}</b></p>
                                    </div>
                                </div>
                           </div>`
    })
}

render();



