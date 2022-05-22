const sidebar = document.querySelector('.sidebar')
fetch('../sidebar/sidebar.html')
.then(res=>res.text())
.then(data=>{
    sidebar.innerHTML=data
})
/*sidebar included*/