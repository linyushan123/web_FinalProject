//畫布畫筆
var chess = document.getElementById("chess");
var context = chess.getContext("2d"); //context可以看作畫筆
context.strokeStyle="#bfbfbf";              //畫筆的顏色

//載入棋盤
window.onload = function(){               //頁面載入完成事件
    for(var i=0;i<15;i++){
    
    context.moveTo(15,15+30*i);          //橫線（x，y）起始點
    context.lineTo(435,15+30*i);           //橫線（x，y）終止點
    context.stroke();                              //畫一條線
    
    context.moveTo(15+30*i,15);           //豎線
    context.lineTo(15+30*i,435);
    context.stroke();
    }
    
}

chess.onclick=function(e){
			
    var i =(e.offsetX/30)|0;   //得到點選的x座標
    var j = (e.offsetY/30)|0;  //得到點選的y座標
    
    var x=i;
    var y=j;
   
    oneStep(x,y,true); 
}
  //這裡player true為玩家   false為電腦（下面會寫）
function oneStep(x,y,player){
    var color;
    context.beginPath();                              //開始畫圓
    context.arc(15+30*x,15+30*y,13,0,2*Math.PI)       //（x,y,半徑，起始點，終止點2*PI即360度）
    context.closePath();                              //結束畫圓
    
    if(player){
        color="black";                                //玩家是黑色
    }else{
        color="red";                                  //電腦是紅色
    }
    
    context.fillStyle=color;                         //設定填充色
    context.fill();                                  //填充顏色
}

//贏法陣列
var wins = [];
for(var i=0;i<15;i++){                   //定義三維陣列
    wins[i]=[];
    for(var j=0;j<15;j++){
        wins[i][j]=[];
    }
}
var count = 0;                          //（x，y）在的贏法種類
//橫線能贏情況      
for(var x=0;x<11;x++){                            
    for(var y=0;y<15;y++){
        for(var z=0;z<5;z++){           //z代表向後5個字
            wins[x+z][y][count]=true;   //true代表是一種贏法，用count記錄下來
        }
        count++;                        //(x,y)在另一個贏法中
    }
}
//豎線能贏情況
for(var x=0;x<15;x++){                  
    for(var y=0;y<11;y++){
        for(var z=0;z<5;z++){           
            wins[x][y+z][count]=true;   
        }
        count++;                        
    }
}
//正斜線能贏情況
for(var x=0;x<11;x++){
    for(var y=0;y<11;y++){
        for(var z=0;z<5;z++){           
            wins[x+z][y+z][count]=true;   
        }
        count++;                        
    }
}
//反斜線能贏情況
for(var x=0;x<11;x++){
    for(var y=4;y<15;y++){
        for(var z=0;z<5;z++){           
            wins[x+z][y-z][count]=true;   
        }
        count++;                        
    }
}

//遍歷棋盤，是否有棋子，預設為0沒有
var isChess = []
for(var i=0;i<15;i++){
    isChess[i]=[];
    for(var j=0;j<15;j++){
        isChess[i][j]=0;
    }
}

//人和電腦贏的子佔贏法的情況
var manWin=[];
var computerWin=[];
for(var i=0;i<count;i++){
    manWin[i]=0;
    computerWin[i]=0;
}

//玩家點選下棋
chess.onclick=function(e){
			
    var i =(e.offsetX/30)|0;
    var j = (e.offsetY/30)|0;
    
    var x=i;
    var y=j;
    if(isChess[x][y]==0){      //是否有棋子，沒有下子
        isChess[x][y]=1;         //值變一，代表有棋子
        oneStep(x,y,true);      //玩家顏色
        for(var i=0;i<count;i++){        //遍歷贏法
            
            if(wins[x][y][i]){                //（x，y）在贏法i上 該贏法將贏數加一
                manWin[i]++;
            }
            if(manWin[i]==5){          //為五，贏了
                alert("你贏了");
            }	
        }	
        computerPlayerAction();   //玩家下過棋後該電腦下
    } 
    
}

function computerPlayerAction(){
    var max=0;
    var u=0;                      //電腦棋x座標
    var v=0;                   //電腦棋y座標
    
    var manOfValue=[];            //玩家贏的權值
    var computerOfValue=[];     //電腦贏的權值
    
    for(var x=0;x<15;x++){
        manOfValue[x]=[];
        computerOfValue[x]=[];
        for(var y=0;y<15;y++){
            manOfValue[x][y]=0;
            computerOfValue[x][y]=0;
        }
    }
    
    for(var x=0;x<15;x++){
        for(var y=0;y<15;y++){
            if(isChess[x][y]==0){     //查詢空白棋
            
                for(var i=0;i<count;i++){    //遍歷count
                    if(wins[x][y][i]){
                        if(manWin[i]==1)
                        {manOfValue[x][y]+=200;}    //給予權值
                        else if(manWin[i]==2)
                        {manOfValue[x][y]+=400;}
                        else if(manWin[i]==3)
                        {manOfValue[x][y]+=2000;}
                        else if(manWin[i]==4)
                        {manOfValue[x][y]+=10000;}
                        
                        if(computerWin[i]==1)
                        {computerOfValue[x][y]+=220;}    //電腦相同條件權值要比玩家高，主要還是自己贏
                        else if(computerWin[i]==2)
                        {computerOfValue[x][y]+=420;}
                        else if(computerWin[i]==3)
                        {computerOfValue[x][y]+=2200;}
                        else if(computerWin[i]==4)
                        {computerOfValue[x][y]+=20000;}
                    }	
                }
                
                
                if(manOfValue[x][y]>max){          //迴圈判斷最大權值
                    max=manOfValue[x][y];
                    u=x;
                    v=y;
                }
                if(computerOfValue[x][y]>max){
                    max=computerOfValue[x][y];
                    u=x;
                    v=y;
                }
                
                
            }	
        }
    }
    
    oneStep(u,v,false);   //電腦判斷完成，下棋
    
    isChess[u][v]=1;      //標記已下
    
    for(var i=0;i<count;i++){     //（x，y）在贏法i上 該贏法將贏數加一
        if(wins[u][v][i]){
            computerWin[i]++;
        }
        if(computerWin[i]==5){
            alert("電腦贏了");
        }
    }
    
}