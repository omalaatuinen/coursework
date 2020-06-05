//---------working with cookies------------
const setCookie = (value)=>{
    if (value.length > 6){
        Cookies.set("key", value, { expires: 365, path: '/' });

    }
};

const getCookie = ()=>{
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



