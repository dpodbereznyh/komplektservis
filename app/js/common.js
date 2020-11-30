$(document).ready(function () {    
// SmartMenus mobile menu toggle button
    $(function() {
        var $mainMenuState = $('#main-menu-state');
        if ($mainMenuState.length) {
            // animate mobile menu
            $mainMenuState.change(function(e) {
                var $menu = $('#main-menu');
                if (this.checked) {
                    $menu.hide().slideDown(250, function() { $menu.css('display', ''); });
                } else {
                    $menu.show().slideUp(250, function() { $menu.css('display', ''); });
                }
            });
            // hide mobile menu beforeunload
            $(window).bind('beforeunload unload', function() {
                if ($mainMenuState[0].checked) {
                    $mainMenuState[0].click();
                }
            });
        }
    });



    // для плавного перехода по якорям
    $(".yakor").on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top -10;
        $('body,html').animate({scrollTop: top}, 500);
    });

    

    $(".main-screen__form, .footer-form__form").submit(function(){
        $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize()
        }).done(function() {
            $.fancybox.open({
                src: '#fancyalert',
            });
            $(".main-screen__form, .footer-form__form").trigger("reset");
        });
        return false;
    });
});
const accordion = (triggersSelector) => {
    const accordionBtn = document.querySelectorAll(triggersSelector);
    accordionBtn.forEach(btn => {
        btn.addEventListener('click', function() {
            if(!this.classList.contains('answers-active')) {
                accordionBtn.forEach(btn => {
                    btn.classList.remove('answers-active');
                });
                this.classList.add('answers-active');
            } else {
                this.classList.remove('answers-active');
            }
        });
    });
     
};
const accordionClose = (triggerSelector) => {
    const accordionBtnHide = document.querySelectorAll(triggerSelector); 
    const accordionBtnActive = document.querySelectorAll('.answers__accordion_btn');   
    accordionBtnHide.forEach(item => {
        item.addEventListener('click', function() {
            accordionBtnActive.forEach(btn => {
                if(btn.classList.contains('answers-active')) {
                    btn.classList.remove('answers-active');
                }
            });
            
        });
    });
};
accordionClose('.answers__accordion_btn_hide');
accordion('.answers__accordion_btn');

//Metrica
var ymID = 69913831;

$(function() {
    $('.js-callback').on("click", function() {
        var sendPopup = $(this).attr('data-send');
        // $(modal).find('input[name=target]').val(parent);
        $(".popup-form__btn").attr("data-goal", sendPopup);
        console.log(sendPopup);
    });

});

var metrikaGoals = function () {


    $('.js-onClickGoal').click(function () {

        var goal = this.dataset.goal;
        // var gtagGoal = this.dataset.gtagGoal;
        // var thisGoal = getCookie(goal);
        if (typeof thisGoal == "undefined") {
            if ((typeof goal !== 'undefined' || goal != '') && typeof ym !== 'undefined') {
                ym(ymID, 'reachGoal', goal);
            }

            var date = new Date(new Date().getTime() + 720 * 3600 * 1000);
            document.cookie = goal + "=1; path=/; expires=" + date.toUTCString();
        }


    });

    $('.js-validate-form').click(function () {
        var form = $(this).closest('.js-form-default');
        var validated = 1;

        $(form).find('input[required]').each(function (indexInArray, valueOfElement) {
            if ($(valueOfElement).val() == "") {
                validated = 0;
            }
        });

        if (validated == 0) {


            var goal = this.dataset.goal;
            // var gtagGoal = this.dataset.gtagGoal;

            if ((typeof goal !== 'undefined' || goal != '') && typeof ym !== 'undefined') {
                ym(ymID, 'reachGoal', goal);
            }
        }
        console.log(form);
    });
};

$(document).ready(function () {
    metrikaGoals();
});