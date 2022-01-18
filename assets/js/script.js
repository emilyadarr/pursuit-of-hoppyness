
$(document).ready(function() {

//     function createCookie(name, value, days) {
//         var expires = "";
//         if (days) {
//              var date = new Date();
//              date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
//              console.log(date);
//              expires = "; expires=" + date.toUTCString();
//         }
//         document.cookie = name + "=" + value + expires + "; path=/"; // affects all site pages
//    }
   
//     function readCookie(name) {
//         var nameEQ = name + "=";
//         var ca = document.cookie.split(';');
//         for (var i = 0; i < ca.length; i++) {
//              var c = ca[i];
//              while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//              if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//              }
//         return null;
//    }

//     if (readCookie('pursuit_age_check') === 'true') {
//     } else {
//         $('#ageModal').show();
//     }
//     $('.close-age-popup').click(function() {
//         createCookie('pursuit_age_check', 'true', 1);
//         $('.pursuit-age-bg').hide();
//     });
    
    function ageVerify() {
        $('#ageModal').show();
        $('html body').css('overflow','hidden');
    };

    ageVerify();

    function oldEnough() {
        $('.age-yes-btn').click(function() {
            $('#ageModal').hide();
        })
    };

    oldEnough();

    var catUrl = "https://www.funnycatpix.com/"

    function tooYoung() {
        $('.age-no-btn').click(function() {
            $(location).attr('href', catUrl);
        })
    };

    tooYoung();


    
});

