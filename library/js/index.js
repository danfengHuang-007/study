// define an avaiable for future use
const creator = 'flower'
function getBooks(){
    axios({
        url: 'http://hmajax.itheima.net/api/books',
        params: {
            // get a name ane tell server to get books
            creator
        }

    }).then(res => {
        // 2. render the page
        const list = res.data.data
        console.log(list)
        const htmlArr = list.map((v, index) => {
            return `
            <tr>
                <td>${index + 1} </td>
                <td> ${v.bookname}</td>
                <td>${v.author}</td>
                <td>${v.publisher}</td>
                <td data-id="${v.id}">
                    <span class="del">Del</span>
                    <span class="edit">Edit</span>
                </td>
            </tr>
            `
        })
        const htmlStr = htmlArr.join('')
        document.querySelector('.list').innerHTML =  htmlStr

    })
}
getBooks()
// add new books
const addModal = new bootstrap.Modal(document.querySelector('.add-modal'))
// js box
document.querySelector('.btn-show').addEventListener('click', ()=>{
    addModal.show()
})

document.querySelector('.add-btn').addEventListener('click', ()=>{
    // collect user information and upload to server
    const addForm = document.querySelector('.add-form')
    const data = serialize(addForm, {hash: true, empty: true})
    console.log(data)
    // upload data to server
    axios({
        url:'http://hmajax.itheima.net/api/books',
        method: 'post',
        data: {
            creator,
            ...data
        }
    }).then(res => {
        getBooks()
        // clear form
        addForm.reset()
        addModal.hide()
    })
   // addModal.hide()
})

// delete books 
document.querySelector('.list').addEventListener('click', (e)=>{
    if(!e.target.classList.contains('del')){
        return
    }
    const {id} = e.target.parentNode.dataset
    axios({
        url: `http://hmajax.itheima.net/api/books/${id}`,
        method:'DELETE'
    }).then(res => {
        getBooks()
    })

})

// edit books 
const editModal = new bootstrap.Modal(document.querySelector('.edit-modal'))
document.querySelector('.list').addEventListener('click', (e)=>{
    if(!e.target.classList.contains('edit')){
        return
    }
    const {id} = e.target.parentNode.dataset
    axios({
        url: `http://hmajax.itheima.net/api/books/${id}`,
        // method:'DELETE'
    }).then(res => {
        const book = res.data.data 
        // Setting the acquired book data
        document.querySelector('edit-modal .id').value = book.id
        Object.keys(book).forEach(key => {
            document.querySelector(`.edit-modal .${key}`).value = book[key]
        })
        editModal.show()
        // getBooks()
    })
})
 document.querySelector('.edit-btn').addEventListener('click', ()=>{
    // get form contents
    const {author, bookname, id, publisher} = serialize(document.querySelector('.edit-form'), {hash:true, empty: true} )
    // Invoke the Modify interface
    axios({
        url:`http://hmajax.itheima.net/api/books/${id}`,
        method:'PUT',
        data: {
            bookname,
            author,
            publisher,
            creator
        }
    }).then(res => {
        getBooks()
        editModal.hide()
    })
 })

