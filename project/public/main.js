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
        jQuery('#key').fadeIn('slow');
        if (jQuery('#key').val().length === 0) {
            event.preventDefault();
            jQuery('#key').val(getCookie());
        }
    } else if (val == "run") {
        jQuery('#key2').fadeIn('slow');
        if (jQuery('#key2').val().length === 0) {
            event.preventDefault();
            jQuery('#key2').val(getCookie());
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
                list.value += 'msg\n' + task.msg + '\n' + task.dur + '\n';
            }

            if (task.tName == 'delay') {
                list.value += 'delay\n' + task.delay + '\n';
            }

            if (task.tName == 'set background image') {
                list.value += 'set background image\n' + task.url + '\n';
            }

            if (task.tName == 'Astronomy Picture of the Day on background') {
                list.value += 'Astronomy Picture of the Day on background\n' + task.option + '\n';
            }


            if (task.tName == 'remove background image') {
                list.value += 'remove background image\n';
            }


            if (task.tName == 'wait for click') {
                list.value += 'wait for click\n';
            }



            if (task.tName == 'clear the page') {
                list.value += 'clear the page\n';
            }


            if (task.tName == 'weather in certain city') {
                list.value += 'weather in certain city\n' + task.city + '\n';
            }

            if (task.tName == 'news in certain country') {
                list.value += 'news in certain country\n' + task.country + '\n';
            }

            if (task.tName == 'show currency rates') {
                list.value += 'show currency rates\n' + task.from + '\n' + task.to + '\n';
            }












        });


    };
}

//--------------Function for adding tasks to a tasklist.

const addTasks = () => {

    const selected = $('#tasks').val();
    const list = document.querySelector('#taskList');
    let reqF = $('#reqF').val(); //for a field with some prompts for url, messages, etc.


    // adding "redirect" task

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
            return;
        }

    }

    //adding "show message" task.

    if (selected == "show message") {
        if (reqF.length === 0 && $('#optionList').val().length === 0) {
            $('.reqF').slideDown('slow');
            $('#reqL').text('Enter a message');
            $('#reqF').focus();
            return;
        } else if (reqF.length > 0) {
            let msg = reqF;
            list.value += 'msg' + '\n' + msg + '\n';
            $('.reqF').slideUp('slow');
            $('#reqF').val("");
            optionList(['1', '2', '3', '5', '10', '20', '30', '60', '120', 'wait for click'], "Message's duration in seconds");
            return;
        } else if ($('#optionList').val().length > 0) {
            if ($('#optionList').val() == "wait for click") {
                list.value += '0' + '\n';
            } else {
                list.value += $('#optionList').val() + '\n';
            }
            optionList();
            $('#tasks').val("");
            return;
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
            return;
        }

    }

    // adding "set background image" task

    if (selected == "set background image") {
        if (reqF.length === 0) {
            $('.reqF').slideDown('slow');
            $('#reqL').text('Enter a url to an image');
            $('#reqF').focus();
            return;
        } else {
            let url = reqF;
            list.value += 'set background image' + '\n' + url + '\n';
            $('.reqF').slideUp('slow');
            $('#reqF').val("");
            $('#tasks').val("");
            return;
        }

    }


    // adding "Astronomy Picture of the Day on background" task

    if (selected == "Astronomy Picture of the Day on background") {
        if ($('#optionList').val().length === 0) {
            optionList(['normal', 'HD'], 'Select image resolution');
            return;
        } else {
            let option = $('#optionList').val();
            list.value += 'Astronomy Picture of the Day on background' + '\n' + option + '\n';
            optionList();
            return;
        }

    }


    // adding "remove background image" task

    if (selected == "remove background image") {
        list.value += 'remove background image\n';
        $('#tasks').val("");
        return;
    }


    // adding "clear the page" task

    if (selected == "clear the page") {
        list.value += 'clear the page\n';
        $('#tasks').val("");
        return;
    }


    // adding "wait for click" task

    if (selected == "wait for click") {
        list.value += 'wait for click\n';
        $('#tasks').val("");
        return;
    }



    // adding "weather in certain city" task

    if (selected == "weather in certain city") {
        if (reqF.length === 0) {
            $('.reqF').slideDown('slow');
            $('#reqL').text('Enter a name of the city');
            $('#reqF').focus();
            return;
        } else {
            let city = reqF;
            list.value += 'weather in certain city' + '\n' + city + '\n';
            $('.reqF').slideUp('slow');
            $('#reqF').val("");
            $('#tasks').val("");
            return;
        }

    }


    // adding "news in certain country" task

    if (selected == "news in certain country") {
        if (jQuery('#optionList').val().length === 0) {
            let countryArr = ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"];
            optionList(countryArr, 'Select the country');
            return;
        } else {
            let country = jQuery('#optionList').val();
            list.value += 'news in certain country' + '\n' + country + '\n';
            optionList();
            return;
        }

    }

    // adding "show currency rates" task

    if (selected == "show currency rates") {
        let arr = ["EUR", "USD", "RUB", "GBP", "CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "RON", "SEK", "IDR", "INR", "BRL", "HRK", "JPY", "THB", "CHF", "MYR", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "MXN", "SGD", "AUD", "ILS", "KRW", "PLN"];
        if ($('#optionL').html().length === 0) {
            optionList(arr, "From");
            return;
        } else if ($('#optionL').html() == "From") {
            let currFrom = $('#optionList').val();
            list.value += 'show currency rates' + '\n' + currFrom + '\n';
            optionList(arr, "To");
            return;
        } else if ($('#optionL').html() == "To") {
            let currTo = $('#optionList').val();
            list.value += currTo + '\n';
            optionList();
            return;
        }

    }















}





// -------------function for runing tasks on a "run" page.

const runTasks = async (taskList) => {

    if (taskList.length > 0) { //if an array is not empty..
        let newsArticleIndex = 0;

        for (let i = 0; i < taskList.length; i++) {
            let task = taskList[i];

            //----run the "redirect" task

            if (task.tName == 'redirect') {
                window.location.href = task.url;
            }

            //---Run the "show message" task

            if (task.tName == 'msg') {
                try {
                    jQuery('.msg').html('<p>' + task.msg + '</p>');
                    jQuery('.msg').fadeIn(900);
                    await delay(task.dur * 1000);
                    if (task.dur == 0) {
                     let isClicked = false;
                        jQuery(document).click(function (e) {
                            isClicked = true;
                        });
                        do {
                            await delay(250);
                        } while (!isClicked);
                    }

                    jQuery('.msg').fadeOut(400);
                    await delay(420);
                    jQuery('.msg').html('');

                } catch (err) {
                    console.log(err);
                }
            }
            // ----run the "delay" task-----

            if (task.tName == 'delay') {
                try {
                    await delay(task.delay * 1000);
                } catch (err) {
                    console.log(err);
                }
            }

            //----run the "set background image" task

            if (task.tName == 'set background image') {
                jQuery('body').css({
                    'background-image': 'url(' + task.url + ')',
                    'background-repeat': 'no-repeat',
                    'background-attachment': 'fixed',
                    'background-position': 'center 56px',
                    'background-size': 'contain'
                });

            }



            //----run the "Astronomy Picture of the Day on background" task

            if (task.tName == 'Astronomy Picture of the Day on background') {

                const endPoint = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&hd=true';
                const response = await fetch(endPoint);
                if (response.ok) {
                    let result = await response.json();
                    let url = "";
                    if (task.option == "HD") {
                        url = result.hdurl;
                    } else {
                        url = result.url;
                    }
                    jQuery('body').css({
                        'background-image': 'url(' + url + ')',
                        'background-repeat': 'no-repeat',
                        'background-attachment': 'fixed',
                        'background-position': 'center 56px',
                        'background-size': 'contain'
                    });
                }

            }



            //----run the "remove background image" task

            if (task.tName == 'remove background image') {
                jQuery('body').css({
                    'background-image': ''
                });

            }


            //----run the "clear the page" task

            if (task.tName == 'clear the page') {
                jQuery('.row').html('');
            }


            //----run the "wait for click" task

            if (task.tName == 'wait for click') {
                let isClicked = false;
                jQuery(document).click(function (e) {
                    isClicked = true;
                });
                do {
                    await delay(250);
                } while (!isClicked);
            }


            //----run the "weather in certain city" task

            if (task.tName == 'weather in certain city') {

                const endPoint = '/weather/' + task.city;
                const response = await fetch(endPoint);
                if (response.ok) {
                    let jsonResponse = await response.json();

                    jQuery('.row').append("<div class='col col-auto weather'><p>" + jsonResponse.result + "</p></div>");
                    jQuery('.weather').fadeIn('slow');
                    await delay(300);

                }


            }



            //----run the "show currency rates" task

            if (task.tName == 'show currency rates') {

                const endPoint = 'https://api.exchangeratesapi.io/latest?base=' + task.from;
                const response = await fetch(endPoint);
                if (response.ok) {
                    let result = await response.json();
                    let finalRate = result.rates[task.to];
                    finalRate = finalRate.toFixed(4);
                    jQuery('.row').append("<div class='col col-auto currency'><h3>One " + task.from + " =</h3><p class='currResult'>" + finalRate + " <span class='currTo'>" + task.to + "</span></p></div>");
                    jQuery('.currency').fadeIn('slow');
                    await delay(300);
                }


            }



            //----run the "news in certain country" task

            if (task.tName == 'news in certain country') {

                const endPoint = '/news/' + task.country;
                try {
                    const response = await fetch(endPoint);

                    if (response.ok) {
                        let jsonResponse = await response.json();
                        for (let i = 0; i < jsonResponse.length; i++) {
                            const article = jsonResponse[i];
                            let content;
                            if (!article.content) {
                                article.content = "For more information, go to the source link.";
                            }
                            if (article.description.length > article.content.length) {
                                content = article.description;
                            } else {
                                content = article.content;
                                if (content.length > 200) {
                                    content = content.slice(0, 200);
                                }

                            }
                            content = '<p>' + content + '</p>';
                            jQuery('.row').append("<div onclick='readMore(" + newsArticleIndex + ");' class='col col-auto news news" + newsArticleIndex + "'><p>" + article.title + "<br> <span class='readmore readmore" + newsArticleIndex + "'>Read more...</span></p> <span class='newsC newsC" + newsArticleIndex + "'>" + content + "<a href='" + article.url + "' target='_blank'>Go to source...</a></span> </div><br>");
                            jQuery('.news').fadeIn();

                            await delay(200);
                            newsArticleIndex++;
                        }


                    }
                    jQuery('.row').append("<div class='col col-auto separator'></div>");


                } catch (err) {
                    console.log(err);
                }



            }












        };



    };



}
// function for a news "read more"

const readMore = (i) => {
    $('.readmore' + i).slideToggle();
    $('.newsC' + i).slideToggle();
}


// Function to build an optionList multiselect

const optionList = (arr, title) => {

    if (title) {
        $('#optionL').html(title);
    } else {
        $('#optionL').html('');
    }
    if (arr) {
        $('#optionList').html('');
        $('.optionDiv').slideUp('slow');
        $('#optionList').append('<option></option>');
        arr.forEach(option => {
            $('#optionList').append('<option>' + option + '</option>');
        });
        $('#optionList').prop('size', arr.length + 1);
        $('.optionDiv').slideDown('slow');
        $('#optionList').val("");
        $('#optionList').focus();
        return;
    } else {
        $('#optionList').html('');
        $('.optionDiv').slideUp('slow');
        $('#tasks').val("");
        $('#optionList').append('<option></option>');
        $('#optionList').val('');
    }

}

const add = (key) => {
    if (key == "Enter") {
        addTasks();
    }
}

