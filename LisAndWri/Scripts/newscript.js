// for play audio
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

// for check end display result   hiện nút check khi bấm vào ô nhập kết quả
$('textarea#input').click(function () {
    $('#btn-check').removeAttr('disabled');
});
//check and answer    kiểm tra và đáp án
$('#btn-check').click(function () {
    myAudio.pause();                        // dừng phát
    clearInterval(controller);                 // xóa "bộ nhớ"
    var textAnswer = answer;                    // đấp án
    var textInput = $('textarea#input').val();  // dữ liệu nhập
    if (textInput !== "") {
        textInput = textInput.replace(/[^a-z A-Z]/g, "");       // xóa các kí tự thừa
        var arrAnswer = textAnswer.split(' ');          // tách chuỗi thành các mảng nhỏ
        var arrInput = textInput.split(' ');            // tách chuỗi thành các mảng nhỏ
        var myArr = [];
        for (let i = 0; i <= arrInput.length; i++) {    // so sánh 2 mảng với nhau
            myArr[i] = [];
            for (let j = 0; j <= arrAnswer.length; j++) {
                if ((j == 0) || (i == 0)) {
                    myArr[i][j] = 0;
                    continue;
                }
                if ((arrInput[i - 1]).toUpperCase() === (arrAnswer[j - 1]).toUpperCase()) {
                    myArr[i][j] = myArr[i - 1][j - 1] + 1;

                }
                else
                    myArr[i][j] = (myArr[i - 1][j] > myArr[i][j - 1]) ? myArr[i - 1][j] : myArr[i][j - 1];

            }
        }

        var fixText = [];                   // mảng chữ sửa lỗi
        var k = 0;
        var i = arrInput.length, j = arrAnswer.length;
        //scores[currTrack - 1] = (arrAnswer.length > arrInput.length) ? (myArr[i][j] * 100 / arrAnswer.length) : (myArr[i][j] * 100 / arrInput.length);
        //console.log(scores[currTrack - 1]);
        while ((i >= 0) && (j >= 0)) {
            if (j == 0 && i == 0) {
                k--;
                break;
            }
            if (j == 0) {
                fixText[k] = "<sup class='wrong'>" + arrInput[i - 1] + "</sup>";
                k++;
                i--;
                continue;
            }
            if (i == 0) {
                fixText[k] = "<span class='correct'>" + arrAnswer[j - 1] + "</span>";
                k++;
                j--;
                continue;
            }
            if (myArr[i][j] == myArr[i][j - 1]) {
                fixText[k] = "<span class='correct'>" + arrAnswer[j - 1] + "</span>";
                k++;
                j--;
                continue;
            }
            if (myArr[i][j] == myArr[i - 1][j]) {
                fixText[k] = "<sup class='wrong'>" + arrInput[i - 1] + "</sup>";
                k++;
                i--;
                continue;
            }

            fixText[k] = "<span class='common'>" + arrAnswer[j - 1] + "</span>";
            k++;
            i--;
            j--;
        }

        var fixResult = "";                 // kết quả
        for (let i = k; i >= 0; i--)
            fixResult += " " + fixText[i];
        $('#answer').append(fixResult);     // hiển thị kết quả  

        if (currTrack == numTrack)          // nếu làm đến câu cuối thì hiện nút xem điểm
            $('#btn-score').show();
        $(this).attr('disabled', 'disabled');

        if ((currTrack + '') < numTrack)
            $("#btn-next2").show();
    }
    else
        $('#hideText').show().delay(1000).fadeOut();
});
//get score and update database             // cập nhật điểm vào CSDL
//$('#btn-score').click(function () {
//    var sum = 0;
//    for (let i in scores)
//        sum += scores[i];
//    console.log("Score: " + sum / numTrack);
//    var scoreObj = {
//        "DateCreate": new Date(),
//        "Level": $('span#level').text(),
//        "AudioScore": sum / numTrack
//    };
//    $.ajax({
//        url: "http://localhost:2376/scores/addscore/",
//        type: "POST",
//        data: JSON.stringify(scoreObj),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        error: function (respone) {
//            console.log(respone);
//        },
//        success: function (respone) {
//            console.log(respone);
//        }
//    });
//    window.location = "http://localhost:2376/scores/getlastscores/" + $('span#level').text();
//});
