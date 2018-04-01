var currTrack = 1;    // track bắt đầu
var scores = [];       // danh sách điểm
var timeStart = 0, duration = 0;       // thời gian bắt đầu, thời lượng
var numTrack = $('#numTrack').val();    // số track
var answer = '', title = '';            // tiêu đề và câu trả lời
var myAudio = document.getElementById('audio');        //lấy audio
var controller = 0;


$("#hideText").hide();
$("#btn-next2").hide();
$("#btn-score").hide();

getTrack($('h2#audioTitle').text() + "_track" + currTrack);    // lấy track hiện tại
//call play audio
$('#btn-play').click(function () {
    console.log($('h2#audioTitle').text() + "_track" + currTrack);
    getTrack($('h2#audioTitle').text() + "_track" + currTrack);
    console.log(duration + " " + timeStart + " " + answer);
    playAudio();        // chạy audio
    controller = setInterval(playAudio, (duration + 0.2) * 1000);       // lưu vị trí đang chạy của file audio
    console.log("Start");
    $(this).attr('disabled', 'disabled');    // ẩn nút play
});
//play audio in range  chạy audio theo giới hạn
function playAudio() {

    myAudio.currentTime = timeStart;        // bắt đầu chạy từ đoạn nào
    myAudio.play();
}
//Next track   track tiếp theo
$('.btn-next').click(function () {
    myAudio.pause();            // dừng phát
    clearInterval(controller);      // xóa dữ liệu
    if ((currTrack + '') < numTrack)
        currTrack++;
    getTrack($('h2#audioTitle').text() + "_track" + currTrack);   // lấy lại track hiện tại

    $('#currTrack').val(currTrack);
    $('#btn-prev:disabled').removeAttr('disabled');               // 
    $('#btn-play').removeAttr('disabled');                      // hiện nút play
    console.log(numTrack);
    if ((currTrack + '') >= numTrack)                              // ẩn nút next nếu hết track
        $(this).attr('disabled', 'disabled');
    $('textarea').val('');                                          // xóa hết câu trả lời
    $('div#answer').html('');                                       // xóa hết đáp án

    $("#btn-next2").hide();
});
//prev track
$('#btn-prev').click(function () {
    myAudio.pause();
    clearInterval(controller);
    if (currTrack > 1)
        currTrack--;
    getTrack($('h2#audioTitle').text() + "_track" + currTrack);
    $('#currTrack').val(currTrack);
    $('#btn-next:disabled').removeAttr('disabled');
    $('#btn-play').removeAttr('disabled');
    if (currTrack <= 0)
        $(this).attr('disabled', 'disabled');
    $('textarea').val('');
    $('div#answer').html('');

    $("#btn-next2").hide();
});
//call ajax to get current track   
function getTrack(trackTitle) {
    var url = 'http://localhost:54941/Track/GetTrack?trackTitle=' + trackTitle;
    // var url = '/Track/GetTrack';
    $.ajaxSetup({ cache: false });       //to prevent cache
    //$.getJSON(url, {
    //    trackTitle: trackTitle
    //}, function (data) {     // lấy dữ liệu từ CSDL
    //    timeStart = data.TimeStart;
    //    duration = data.Duration;
    //    title = data.AudioTitle;
    //    answer = data.Answer;
    //});
    $.getJSON(url, function (data) {     // lấy dữ liệu từ CSDL
        timeStart = data.TimeStart;
        duration = data.Duration;
        title = data.AudioTitle;
        answer = data.Answer;
    });
}