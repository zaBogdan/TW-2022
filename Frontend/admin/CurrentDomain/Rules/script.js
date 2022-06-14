/** 
const sidebar = document.querySelector('.sidebar')
fetch('../sidebar/sidebar.html')
.then(res=>res.text())
.then(data=>{
    sidebar.innerHTML=data
})*/
/*sidebar included*/


function hideAll(){
    const fields = document.querySelectorAll('.dynamic');
    fields.forEach(f => {
        f.style.display = 'none';
    })
}

function show_appropriate(){
    let result = document.getElementById("select_reward_type").value;
    hideAll();
    if (result=="0"){
        hideAll();
    }
    else if (result == "1"){
        let fd = document.getElementById("reward_score");
        fd.style.display = "block";
    }
    else if (result=="2"){
        let fd = document.getElementById("reward_achievement");
        fd.style.display = "block";
    }
    else if (result=="3"){
        let fd = document.getElementById("reward_rank-up");
        fd.style.display = "block";
    }
    else if (result=="4"){
        let fd = document.getElementById("reward_rank-down");
        fd.style.display = "block";
    }   
}


/** Sidebar */