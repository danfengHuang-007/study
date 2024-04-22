// get data 
const creator = '西蓝花'
axios({
    url:'http://hmajax.itheima.net/api/settings',
    params: {
        creator
    }
}).then(res => {
    const userInfo = res.data.data

    // display data 
    Object.keys(userInfo).forEach(key => {
        // portrait src attribute
        if(key === 'avatar'){
            document.querySelector(`.${key}`).src = userInfo[key] 
        }
        // gender checked attribute
        else if (key === 'gender') {
            // get all gender labels
            const genderRadios = document.querySelectorAll(`.${key}`)
            // get the gender resuly return from the service
            const gender = userInfo[key]
            // find the corresponding label and use gender as index 
            genderRadios[gender].checked = true 
        }

        else {
            document.querySelector(`.${key}`).value = userInfo[key]
        }
    })
})

// change portrait 
// get portrait
document.querySelector('#upload').addEventListener('change', function(){
    // call interface
    const data = new FormData()
    // new  portrait
    data.append('avatar', this.files[0])
    // tell service to change the data
    data.append('creator', creator)
    axios({
        url: 'http://hmajax.itheima.net/api/avatar',
        method: 'PUT', 
        data
    }).then(res => {
        const avatar = res.data.data.avatar
        document.querySelector('.avatar').src = avatar 
    })
})

// amend form
document.querySelector('.submit').addEventListener('click', ()=> {
    const form = document.querySelector('.user-form')
    const formData = serialize(form, {hash: true, empty:true})
    // call interface
    // transform gender into integer 
    formData.gender =+formData.gender
    const data = { 
        ...formData, 
        creator
    }
    axios({
        url:'http://hmajax.itheima.net/api/settings', 
        method:'PUT', 
        data
    }).then(res => {
        // if succeed, alert users 
        const toastDom = document.querySelector('.my-toast')
        const toast = new bootstrap.Toast(toastDom)
        toast.show()
    })
})