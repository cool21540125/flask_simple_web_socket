$(function() {
    so = io.connect('http://' + document.domain + ':' + location.port);
    $('#txt').focus();

    $('#txt').keypress(function(evt) {
        
        if (evt.which === 13) {
            evt.preventDefault();   // 防止預設的 form post頁面刷新
            submit_to_server();
        }
    });

    $('#clk').click(function() {
        submit_to_server();
    });

    so.on('echoback_message', function(msg) {
        $('ul#chat').prepend('<li>' + msg + '</li>');
    });
});

function submit_to_server() {
    var msg = $('#txt').val();
    so.emit('json', msg);
    $('#txt').val('');
    $('#txt').focus();
}