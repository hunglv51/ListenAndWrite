var currTrack = 1;    // track bắt đầu
var scores = [];       // danh sách điểm
var timeStart = 0, duration = 0;       // thời gian bắt đầu, thời lượng
var numTrack = $('#numTrack').val();    // số track
var answer = '', title = '';            // tiêu đề và câu trả lời
var myAudio = document.getElementById('audio');        //lấy audio
var controller = 0;


var res = answer.toLowerCase().split("");	// thành mảng các kí tự tính cả cách dùng kiểm tra đầu vào
var res2 = answer.toLowerCase().split("");	// thành mảng các kí tự tính cả cách dùng cho gợi ý
var last;								// lưu kí tự vừa nhập vào
var dele;								// lưu kí tự nhập vào ở lượt trước
var s = '';								// chuỗi kết quả in ra màn hình
var index = res.indexOf(' '); 			// vị trí dấu cách đầu tiên của res để gợi ý
//	console.log(index);
var count = 0;							// đếm số lần bấm nút gợi ý
var str = GoiY(index);					// chuyển chuỗi gợi ý thành ? theo đúng từ tiếp theo
var id = '';							// id của ký tự bị ẩn khi  gõ sai
var score = 0;  //tính điểm. mỗi kí tự có 10 điểm. gõ sai thì trừ dần
//	console.log(score);
var faile = 0;
var loi = 0;

var flag = true;        // chỉ gọi hàm getTrack khi bấm play 1 lần

$("#hideText").hide();
$("#btn-next2").hide();
$("#btn-score").hide();
$('#xemgoiy').attr('disabled', 'disabled');
$('#stop').attr('disabled', 'disabled');
$('#chartContainer').hide();

getTrack($('h2#audioTitle').text() + "_track" + currTrack);    // lấy track hiện tại
//call play audio
$('#btn-play').click(function () {
    $('#xemgoiy').removeAttr('disabled');
    console.log($('h2#audioTitle').text() + "_track" + currTrack);
    if (flag) {
        getTrack($('h2#audioTitle').text() + "_track" + currTrack);
        flag = false;
    }
    console.log(duration + " " + timeStart + " " + answer);
    playAudio();        // chạy audio
    controller = setInterval(playAudio, (duration + 0.2) * 1000);       // lưu vị trí đang chạy của file audio
    console.log("Start");
    $(this).attr('disabled', 'disabled');    // ẩn nút play
    $('#stop').removeAttr('disabled');
});

$('#stop').click(function () {
    myAudio.pause();
    clearInterval(controller);
    $('#btn-play').removeAttr('disabled');
    $(this).attr('disabled', 'disabled');
    $('#xemgoiy').attr('disabled', 'disabled');
    $('#goiy').html('');
});
//play audio in range  chạy audio theo giới hạn
function playAudio() {

    myAudio.currentTime = timeStart;        // bắt đầu chạy từ đoạn nào
    myAudio.play();
}
//Next track   track tiếp theo
$('.btn-next').click(function () {
    $('#chartContainer').hide();
    flag = true;
    $('#xemgoiy').attr('disabled', 'disabled');
    $('#goiy').html('');
    $('#stop').attr('disabled', 'disabled');
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
    $('#chartContainer').hide();
    flag = true
    $('#xemgoiy').attr('disabled', 'disabled');
    $('#goiy').html('');
    $('#stop').attr('disabled', 'disabled');
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
    $.ajaxSetup({ cache: false });       //to prevent cache
    $.getJSON(url, function (data) {     // lấy dữ liệu từ CSDL
        timeStart = data.TimeStart;
        duration = data.Duration;
        title = data.AudioTitle;
        answer = data.Answer;
    });

    res = answer.toLowerCase().split("");
    console.log(res);
    res2 = answer.toLowerCase().split("");
    console.log(res2);
    s = '';
    index = res.indexOf(' ');
    count = 0;
    str = GoiY(index);
    id = '';
    faile = 0;
    loi = 0;
    score = res.length - answer.split(" ").length + 1;
}

// Bắt sự kiện nhập đáp án
$("#input").keyup(function keyChecking(event) {
    var input = $(this).val();
    last = input.charAt(input.length - 1);
    if (event.keyCode != 8) {
        if (event.key.length == 1) {
            if (res[0] == last) {
                res.shift();
                dele = last;
                $('#keylock').hide();
                for (var i = 65; i <= 90; i++) {// A-65, Z-90
                    id = "#" + String.fromCharCode(i).toLowerCase();
                    $(id).css("color", "black");
                }
                if (res[0] == ' ' || res[0] == null) {
                    if (loi > 15) {
                        s += '<span style="color:blue;font-weight:bold">' + input + ' </span>';
                        console.log(loi);
                        loi = 0;
                    }
                    else
                        s += input + ' ';
                    $('#answer').html(s);
                    res.shift();
                    res2 = res.slice(0);
                    $('#goiy').html('');
                    count = 0;
                    this.value = '';
                    index = res.indexOf(' ');
                    str = GoiY(index);
                    console.log(faile);
                }
            }
            else {
                if (loi <= 15) {
                    faile++;
                }
                loi++;
                this.value = input.slice(0, -1);
                $('#keylock').show();
                id = "#" + last;
                $(id).css("color", "rgb(221, 221, 221)");
            }
        }
    }
    else {
        if (dele != '') {
            res.unshift(dele);
            dele = input.charAt(input.length - 1);
        }
    }
    console.log("dele sau " + dele);
    if (res[0] == null) {
        myAudio.pause();            // dừng phát
        clearInterval(controller);
        if (currTrack == numTrack)          // nếu làm đến câu cuối thì hiện nút xem điểm
            $('#btn-score').show();
        if ((currTrack + '') < numTrack)
            $("#btn-next2").show();
        $('#goiy').html('');
        flag = true;
        $('#stop').attr('disabled', 'disabled');

        // điểm
        let a = (score * 10 - faile) / score;
        if (a < 0)
            a = 0;
        scores[currTrack - 1] = a;
        console.log(scores[currTrack - 1]);
    }
});


//Gợi ý
$("#xemgoiy").click(function () { 			// gợi ý    
    count++;							// mỗi lần bấm tăng thêm 1			
    var n = str.lastIndexOf('?');		// tìm vị trí ? cuối cùng trong chuỗi gợi ý
    str = str.slice(0, n) + str.slice(n).replace('?', res2[index - count]); // thay thế đáp án từ dưới lên theo số  lượt bấm
    $('#goiy').html(str);				// in gợi ý
    faile += 2;
    //		console.log(count);					
    if (count == index) {					// nếu count = index thì 
        faile += count * 10;
        count = 0;						// reset count về 0
        console.log(faile);
        s += '<span style="color:blue;font-weight:bold">' + str + ' </span>';					// thêm chuỗi vào đáp án
        $('#answer').html(s);			// in đáp án ra màn hình
        $('#goiy').html('');			// reset gợi ý
        $('#input').val('');			// reset giá trị nhập vào
        for (var i = 0; i <= index; i++) {
            res2.shift();   			// xóa các kí tự vừa gợi ý quá
            res = res2.slice(0);   		// cho mảng gợi ý và mảng đáp án bằng nhau. Do khi nhập và gợi ý 2 mảng sẽ khác nhau. Cần đồng bộ nếu ko sai.
        }
        //			console.log(res2);
        //			console.log(res);
        index = res2.indexOf(' ');		// cập nhật lại index
        if (index > 0)					// nếu tồn tại index
            str = GoiY(index);			// cập nhật lại chuỗi gợi ý
        else {								// nếu không tồn tại index 
            str = GoiY(res2.length);  	// cập nhật chuỗi theo 
            //		console.log(res2.length);
            index = res2.length;
        }
    }
    if (res[0] == null) {
        myAudio.pause();            // dừng phát
        clearInterval(controller);
        if (currTrack == numTrack)          // nếu làm đến câu cuối thì hiện nút xem điểm
            $('#btn-score').show();
        $(this).attr('disabled', 'disabled');

        if ((currTrack + '') < numTrack)
            $("#btn-next2").show();
        flag = true;
        $('#stop').attr('disabled', 'disabled');

        //điểm
        let a = (score * 10 - faile) / score;
        if (a < 0)
            a = 0;
        scores[currTrack - 1] = a;
        console.log(scores[currTrack - 1]);
    }
});

function GoiY(index) {
    var s1 = '';
    for (var i = 0; i < index; i++)
        s1 += '?';
    return s1;
}

$('#btn-score').click(function () {
    $('#chartContainer').show();
    var sum = 0;
    for (let i in scores)
        sum += scores[i];
    console.log("Score: " + Math.round((sum / numTrack)*10));
    var scoreObj = {
        "CreateDate": new Date(),
        "AudioScore": Math.round((sum / numTrack)*10),
        "Mode": false,
        "AudioID": $('#id').text(),
    };
    console.log(scoreObj);
    $.ajax({
        url: "http://localhost:54941/Audio/AddScore/",
        type: "POST",
        data: JSON.stringify(scoreObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (respone) {
            console.log(respone);
        },
        success: function (respone) {
            console.log(respone);
        }
    });

    $.ajax({
        url: "/Audio/GetLastScores/",
        data: JSON.stringify(scoreObj),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data[0].CreateDate);
            var dataPoints = [];

            for (var i = 0; i < data.length; i++) {

                var dateString = data[i].CreateDate.substr(6);
                var currentTime = new Date(parseInt(dateString));
                var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
                var day = ("0" + currentTime.getDate()).slice(-2);
                var year = currentTime.getFullYear();
                var date = day + '/' + month + '/' + year;

                dataPoints.push({
                    label: date,
                    y: data[i].AudioScore
                });
            }

            dataPoints.push({
                label: scoreObj.CreateDate.getDate() + "/" + scoreObj.CreateDate.getMonth() + "/" + scoreObj.CreateDate.getFullYear(),
                y: scoreObj.AudioScore,
                indexLabel: "NEW",
                markerColor: "red",
                markerType: "triangle"
            });
            console.log(dataPoints);

            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "light2",
                title: {
                    text: "Score History"
                },
                axisX: {
                    valueFormatString: "",
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: true
                    }
                },
                axisY: {
                    includeZero: false
                },
                data: [{
                    type: "line",
                    color: "#33cc33",
                    dataPoints: dataPoints
                }]
            });

            chart.render();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr, ajaxOptions, thrownError);
        }
    })
});