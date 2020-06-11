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

//---- delay function (Promise), which will work with async await
const delay = ms => new Promise(resolve => setTimeout(() => resolve(), ms));


//---function to show a "key" field before submit a main page forms.
const showKeyF = (val) => {
    if (val == "edit") {
        $('#key').fadeIn('slow');
        if ($('#key').val().length === 0) {
            event.preventDefault();
            $('#key').val(getCookie());
        }
    } else if (val == "run") {
        $('#key2').fadeIn('slow');
        if ($('#key2').val().length === 0) {
            event.preventDefault();
            $('#key2').val(getCookie());
        }
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
            $('.reqF').slideDown('slow');
            $('#reqL').text('Enter a url');
            $('#reqF').focus();
            return;
        } else {
            let url = reqF;
            list.value += 'redirect' + '\n' + url + '\n';
            $('.reqF').slideUp('slow');
            $('#reqF').val("");
            $('#tasks').val("");
        }

    }

    //adding "show message" task.

    if (selected == "show message") {
        if (reqF.length === 0) {
            $('.reqF').slideDown('slow');
            $('#reqL').text('Enter a message');
            $('#reqF').focus();
            return;
        } else {
            let msg = reqF;
            list.value += 'msg' + '\n' + msg + '\n';
            $('.reqF').slideUp('slow');
            $('#reqF').val("");
            $('#tasks').val("");
        }

    }

    //adding "delay" task.

    if (selected == "delay") {
        if (reqF.length === 0) {
            $('.reqF').slideDown('slow');
            $('#reqL').text('Enter a delay in seconds');
            $('#reqF').focus();
            return;
        } else {
            let delay = reqF.replace(",", ".");
            list.value += 'delay' + '\n' + delay + '\n';
            $('.reqF').slideUp('slow');
            $('#reqF').val("");
            $('#tasks').val("");
        }

    }









}

const add = (key) => {
    if (key == "Enter") {
        addTasks();
    }
}



// function for runing tasks on a "run" page.

const runTasks = async (taskList) => {

    if (taskList.length > 0) { //if an array is not empty..


        for(let i = 0; i < taskList.length; i++) {
            let task = taskList[i];
            if (task.tName == 'redirect') {
                window.location.href = task.url;
            }

            //---"show message" task

            if (task.tName == 'msg') {
                try {
                    $('.msg').html('<p>' + task.msg + '</p>');
                    $('.msg').fadeIn(900);


                    await delay(5000);
                    $('.msg').fadeOut(700);
                    await delay(720);
                    $('.msg').html('');
                } catch (err) {
                    console.log(err);
                }
            }

            if (task.tName == 'delay') {
                try{
                await delay(task.delay * 1000);
            } catch (err) {
                console.log(err);
            }
            }







        };



    };



}