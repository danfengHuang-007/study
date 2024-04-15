// Wrapping Cue Box Functions
function myAlert(msg, flag){
    // get alert element
    const alertDom = document.querySelector('.my-alert')
    // show alert, add 'show' class
    alertDom.classList.add('show')
    // change content of alert
    alertDom.innerText = msg
    // use flag to control appearance, if success -> true - alert-success / failure false-alert-danger
    alertDom.classList.add(flag ? 'alert-success': 'alert-danger')
    setTimeout(()=> {
        alertDom.classList.remove('show')
        // remove added class
        alertDom.classList.remove(flag ? 'alert-success': 'alert-danger')
    }, 1000);

}


document.querySelector('.btn-login').addEventListener('click', ()=>{
    const username = document.querySelector('.username').value
    const password = document.querySelector('.password').value

    if (username.length < 8){
        console.log('The username length should be more than 8')
        myAlert('The username length should be more than 8', false)
        return
    }

    if(password.length <6){
        console.log('The password length should be more than 6')
        myAlert('The password length should be more than 6', false)
        return
    }

    axios({
        url: 'http://hmajax.itheima.net/api/login',
        method: 'POST',
        data:{
            username,
            password
        }
    }).then(res => {
        console.log(res.data.message)
        myAlert(res.data.message,true)
    }).catch(err => {
        console.log(err.response.data.message)
        myAlert(err.response.data.message, false)
    })
})