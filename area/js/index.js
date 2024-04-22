 /*
document.querySelector('.my-button').addEventListener('click', function(){
    const pname = document.querySelector('.province').value
    const cname = document.querySelector('.city').value

    // serach for areas and render the data
    axios({
        url:'http://hmajax.itheima.net/api/area',
        params: {
            pname, cname
            // pname: pname,
            // cname: cname
        }
    }).then(res => {
        const list = res.data.list
        const htmlArr = list.map(v=>`<li class="list-group-item">${v}</li>`)
        document.querySelector('.list-group').innerHTML = htmlArr.join('')
        

    })
})
*/
document.querySelector('.my-button').addEventListener('click', ()=>{
    const pname = document.querySelector('.province').value
    const cname = document.querySelector('.city').value
    // get search query through URLsearchParams
    const params = new URLSearchParams({pname, cname})
    // Chinesisch wird kodiert, hat aber keinen Einfluss auf das Server-Parsing
    const query = params.toString()

    // call interface
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `http://hmajax.itheima.net/api/area?${query}`)
    xhr.addEventListener('loadend', ()=> {
        const data = JSON.parse(xhr.response)
        const html = data.list.map(v => `<li class="list-group-item">${v}</li>`).join('')
        document.querySelector('.list-group').innerHTML = html


    })
    // send request 
    xhr.send()
})

