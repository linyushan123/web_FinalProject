$(function(){
    //儲存目前作答到第幾題
    var currentQuiz = null;
    //按按鈕後要做的事
    var flag = 1;
    var answers;
    $("#startButton").on("click", function(){
        //如果還沒開始作答就從這裡開始
        if(currentQuiz==null){
            //設定目前作答從第0題開始
            currentQuiz=0;
            //顯示題目
            $("#question").text(questions[0].question);
            //將選項區清空
            $("#options").empty();
            //將選項逐項加入
            questions[0].answers.forEach(function(element,index,aray){
                $("#options").append(`<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`);
            });
            //將按鈕上的文字換成next
            $("#startButton").attr("value","Next");
        }else{//已經開始作答從這繼續
            //巡訪哪個選項有被選取
            $.each($(":radio"),function(i,val) {
                if(val.checked){
                    
                    //是否已走到最後要產生結果(A~D)
                    if(isNaN(questions[currentQuiz].answers[i][1])){
                        //通往最終結果
                        var finalResult = questions[currentQuiz].answers[i][1];
                        //顯示最終結果的標題
                        $("question").text(finalAnswers[finalResult][0]);
                        //將選項區域清空
                        $("#options").empty();
                        //顯示最終結果內容
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        currentQuiz=null;
                        $("#startButton").attr("value","重新開始");
                    }
                    else{
                        answers[flag] = questions[currentQuiz].answers[i][0];
                        //指定下一題，原始資料從1開始，所以要-1
                        currentQuiz = questions[currentQuiz].answers[i][1]-1;
                        //顯示新的題目
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element,index,array){
                            $("#options").append(`<input name='options' type='radio' value='${index}'><label>${element[0]}</label><br><br>`);
                        });
                    }
                    return false;
                }
            });
        }  
    });
    var scoreForTiger = answers[4]+answers[9]+answers[13]+answers[17]+answers[23]+answers[29];
    var scoreForPeacock = answers[2]+answers[5]+answers[12]+answers[19]+answers[21]+answers[28];
    var scoreForKoala = answers[1]+answers[7]+answers[14]+answers[16]+answers[24]+answers[27];
    var scoreForOwl = answers[0]+answers[6]+answers[10]+answers[15]+answers[20]+answers[25];
    var scoreForChameleon = answers[3]+answers[8]+answers[11]+answers[18]+answers[22]+answers[26]; 

    var allScores = {
        "老虎": scoreForTiger,
        "孔雀": scoreForPeacock,
        "無尾熊": scoreForKoala,
        "貓頭鷹": scoreForOwl,
        "變色龍": scoreForChameleon
    }
});