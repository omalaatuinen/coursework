//---------working with cookies------------
const setCookie = (value) => {
    if (value.length > 6) {
        Cookies.set("key", value, { expires: 365, path: '/' });

    }
};

const getCookie = () => {
    return Cookies.get("key", { path: '/' });
};




//----other functions------
const showKeyF = () => {
    if ($('#key').css('display') == "none") {
        $('#key').css('display', 'inline-block');
        event.preventDefault();

        $('.hidden').val(getCookie());
    }
}

// ---- Reading taskList array, and put it's content into a "selected tasks" textarea
const readTasks = (taskList) => {
    if (taskList.length > 0) { //if an array is not empty..
        const list = document.querySelector('#taskList');

        taskList.forEach(task => {
            if (task.tName == 'redirect') {
                list.value += 'redirect\n' + task.url + '\n';
            }

            if (task.tName == 'msg') {
                list.value += 'msg\n' + task.msg + '\n';
            }

            if (task.tName == 'delay') {
                list.value += 'delay\n' + task.delay + '\n';
            }


        });


    };
}

const addTasks = () => {
    
    const selected = $('#tasks').val();
    const list = document.querySelector('#taskList');
    let reqF = $('#reqF').val(); //for a field with some prompts for url, messages, etc.
    

    // adding redirect task

    if (selected == "redirect") {
        if (reqF.length === 0) {
            $('.reqF').show();
            $('#reqL').text('Enter a url');
            $('#reqF').focus();
            return;
        } else {
            let url = reqF;
            list.value += 'redirect' + '\n' + url + '\n';
            $('.reqF').hide();
            $('#reqF').val("");
            $('#tasks').val("");
        }

    }

    //adding "show message" task.

    if (selected == "show message") {
        if (reqF.length === 0) {
            $('.reqF').show();
            $('#reqL').text('Enter a message');
            $('#reqF').focus();
            return;
        } else {
            let msg = reqF;
            list.value += 'msg' + '\n' + msg + '\n';
            $('.reqF').hide();
            $('#reqF').val("");
            $('#tasks').val("");
        }

    }

 //adding "delay" task.

 if (selected == "delay") {
    if (reqF.length === 0) {
        $('.reqF').show();
        $('#reqL').text('Enter a delay in seconds');
        $('#reqF').focus();
        return;
    } else {
        let delay = reqF.replace(",", ".");
        list.value += 'delay' + '\n' + delay + '\n';
        $('.reqF').hide();
        $('#reqF').val("");
        $('#tasks').val("");
    }

}









}

const add = (key)=>{
    if(key =="Enter"){
        addTasks();
    }
}