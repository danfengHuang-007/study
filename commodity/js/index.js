async function func(){
    // Get first-level product categories
    const res1 = await axios({
        url: 'http://hmajax.itheima.net/api/category/top'
    })
    // Get second-level product categories
    const pArray= res1.data.data.map(v => {
        const {id} = v
        return axios({
            url:'http://hmajax.itheima.net/api/category/sub',
            params: {
                id
            }
        })
    })
    const result = await Promise.all(pArray)
    // render the page
     const html = result.map(v => {
        const {name, children} = v.data.data
        return `
        <div class="item"> 
                <h3>${name}</h3>
                <ul>
                    ${children.map(c=>{
                        return `
                        <li>
                        <a href="javascript:;">
                            <img src="${c.picture}" >
                            <p>${c.name}</p>
                        </a>
                         </li>
                        `
                    }).join('')}
                    
                </ul>
            </div>
        `
    }).join('')
    document.querySelector('.sub-list').innerHTML = html

}

func()