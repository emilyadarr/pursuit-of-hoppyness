
$(document).ready(function() {

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

