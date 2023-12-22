var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.4.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

script.onload = function () {
    $("#file").on('change', function () {
        var fileName = $("#file").val().split('\\').pop();
        $(".upload-name").val(fileName);
    });
}
