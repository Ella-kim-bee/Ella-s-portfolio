/*!
* Start Bootstrap - Stylish Portfolio v6.0.4 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-times');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-times');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-times');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};
// Modal JS
// ====== function { click video => play } =======
let $thum = document.getElementsByClassName('thum');
        
function playerController(event) {
    let el = event.target;

    if (el.paused) {
        el.play();
     for(let i = 0; i < $thum.length; i++){
        $thum[i].addEventListener('click', function(e){
            let e2 = e ? e : window.event;
            $thum[i].classList.remove('playButton');
        });
    }
    }
    else {
        el.pause();
     for(let i = 0; i < $thum.length; i++){
        $thum[i].addEventListener('click', function(e){
            let e2 = e ? e : window.event;
            $thum[i].classList.add('playButton');
           
        });
    }
    }
  
}

for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 3; j++) {
        document.getElementById("exampleModal_" + i).addEventListener("hidden.bs.modal", function (e) {
        document.getElementById("video_" + i + "_" + j).currentTime = 0;
            document.getElementById("video_" + i + "_" + j).pause();
        for (let k = 0; k < $thum.length; k++){
            $thum[k].classList.add('playButton');
        }
        });
        document.getElementById("video_" + i + "_" + j).onclick = playerController; // 함수자체를 넣음
    }
}


// ====== function { scroll => p.title p.desc animation } =======
let modals = document.getElementsByClassName("modal");
let modalNumber;
let paras = [document.getElementsByClassName('para_1'), document.getElementsByClassName('para_2'), document.getElementsByClassName('para_3'), document.getElementsByClassName('para_4') ];
let targets = [];
let value;
let portfolioItems = document.getElementsByClassName("portfolio-item");

function scrolling_Up(event) {
    for(let i = 0; i < modals.length; i++){
     paras[0][i].style.animation = "fade_in_up 1.5s forwards";
     paras[1][i].style.animation = "fade_in_up 1.5s forwards";
    }
}

function scrolling(event) {
    modalNumber = -1;

    for(let i = 0; i <= modals.length - 1; i++){
        if(modals[i].style.display == 'block')
        {
            modalNumber = i;
        }
    }
    if(modalNumber == -1){
        return;
    }

    let st_h = modals[modalNumber].scrollTop + window.innerHeight;

    for(let i = 0; i < paras.length; i++){
        targets[i] = paras[i][modalNumber].offsetTop + 50;
        value = targets[i] + paras[i][modalNumber].clientHeight + window.innerHeight; 
       
        if(st_h >= targets[i] && st_h <= value){
            paras[i][modalNumber].style.animation = "fade_in_up 1.5s forwards";
        }
        else{
            paras[i][modalNumber].style.animation = "disapear 1.5s forwards";
        }
    }
}


for(let i = 0; i <= modals.length - 1; i++)
{
    portfolioItems[i].addEventListener("click", scrolling_Up);
}

for(let i = 0; i <= modals.length - 1; i++)
{
    modals[i].addEventListener("scroll", scrolling);
}
// ====== contact send email =======
(function() {
    emailjs.init("user_jrn1GqWCFOyNRJAvzdzL1");
})();
let enabled = true;
$('#submitButton').click(function(){
    if(!enabled) return
    var templateParams = {
        name: $('#name').val(),
        email : $('#email').val(),
        phone : $('#phone').val(),
        message : $('#message').val()
    };

    // validation
    var emailValidation = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/; // email validation(알파벳+숫자@알파벳+숫자.알파벳+숫자 형식)
    if(!templateParams.name){
        alert('Please input name.')
        $('#name').focus()
    } else if(!templateParams.email){
        alert('Please input email.')
        $('#email').focus()
    } else if(!emailValidation.test(templateParams.email)){ 
        alert("Please input email again.");
        $('#email').focus()
        return
    } else if(!templateParams.phone){
        alert('Please input phone number.')
        $('#phone').focus()
    } else if(!templateParams.message){
        alert('Please input message.')
        $('#message').focus()
    }
    else{
        enabled = false
        emailjs.send('service_m99uaf9', 'template_3ztxiy4', templateParams)
        .then(function(response) {
            alert('Thank you for contacting!')
            window.location.reload();
        }, function(error) {
            alert('Please try again!')
        }).finally(function(){
            enabled = true;
        });
    }

});


