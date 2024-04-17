// upload picture and change background picture
document.querySelector('.skin-ipt').addEventListener('change', function (){
    // upload photos
    const data = new FormData()
    data.append('img', this.files[0])

    // Calling the image upload interface
    axios({
        url: 'http://hmajax.itheima.net/api/uploadimg',
        method: 'POST',
        data
    }).then(res => {
        const url = res.data.data.url
        // Setting the background image of the body
        document.body.style.backgroundImage = `url(${url})`
        // store picture url
        localStorage.setItem('img', url)
    })
})

// read picture url
const url = localStorage.getItem('img')
url && (document.body.style.backgroundImage = `url(${url})`)