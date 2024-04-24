// get data
async function getProvince(){
    const res = await axios({
        url:'http://hmajax.itheima.net/api/province'
    })
    // render page
    const html = res.data.list.map(v => {
        return`<option value="${v}">${v}</option>`
    }).join('')
    // keep default value
    document.querySelector('.province').innerHTML = `<option value="">Province</option>${html}`

}
getProvince()

// register incident 
document.querySelector('.province').addEventListener('change', async function(){
    // get city data 
    const res = await axios({
        url:'http://hmajax.itheima.net/api/city',
        params: {
            pname: this.value
        }
    })
   // render the data
   const htm = res.data.list.map(v => {
    return `<option value="${v}">${v}</option>`
   }).join('')

   document.querySelector('.city').innerHTML = `<option value="">City</option>${htm}`

   // Empty the region list
   document.querySelector('.area').innerHTML = `<option value="">Area</option>`

})

document.querySelector('.city').addEventListener('change', async function(){
    // get city data 
    const res = await axios({
        url:'http://hmajax.itheima.net/api/area',
        params: {
            cname: this.value,
            pname: document.querySelector('.province').value
        }
    })
   // render the data
   const htm = res.data.list.map(v => {
    return `<option value="${v}">${v}</option>`
   }).join('')

   document.querySelector('.area').innerHTML = `<option value="">Area</option>${htm}`

})

document.querySelector('.submit').addEventListener('click', async ()=>{
    const form = document.querySelector('.info-form')
    serialize(form, {hash:true, empty:true})
    try {
        const res = await axios({
            url:'http://hmajax.itheima.net/api/feedback',
            method: 'post',
            data
        })
        alert(res.data.message)
        
    } catch (error) {
        alert(error.response.data.message)
    }
    
})