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