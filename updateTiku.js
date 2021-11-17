//题库网址来源：https://www.sohu.com/a/485240258_120964075 （百度搜索"学习强国 四人赛 题库 2021年8月23日"）
//下列词形正确的是 。来源:《现代汉语词典》 (商务印书馆2016年第7版)
// 加载jsoup.jar
runtime.loadJar("./jsoup-1.12.1.jar");
// 使用jsoup解析html
importClass(org.jsoup.Jsoup);
importClass(org.jsoup.nodes.Document);
//importClass(org.jsoup.nodes.Element);
importClass(org.jsoup.select.Elements);

importClass(android.database.sqlite.SQLiteDatabase);
console.setGlobalLogConfig({ "file": "/sdcard/脚本/AiQiangGuo运行日志.txt" });

var k_num=0;
var webhttps =["https://www.163.com/dy/article/GDBHTAGF05523STV.html","https://baijiahao.baidu.com/s?id=1710068146897326509&wfr=spider&for=pc","https://baijiahao.baidu.com/s?id=1709511821451827651","https://www.sohu.com/a/485240258_120964075","https://www.sohu.com/a/485194502_120535546?scm=1002.44003c.3e8040b.PC_ARTICLE_REC&spm=smpc.content.fd-d.1.1629929058416VDlVf3V&_f=index_pagerecom_1","https://baijiahao.baidu.com/s?id=1694640305288746385&wfr=spider&for=pc","https://baijiahao.baidu.com/s?id=1698991910892712773&wfr=spider&for=pc","https://www.sohu.com/a/480410230_120535546?scm=1007.70.0.0.0&spm=smpc.content.fd-link.1.1630148813434Yz40YEn","https://baijiahao.baidu.com/s?id=1696389906286664990&wfr=spider&for=pc&searchword=%E6%8C%91%E6%88%98%E7%AD%94%E9%A2%98%E7%A5%9E%E5%99%A82021%E6%9C%80%E6%96%B0%E9%A2%98%E5%BA%93","https://m.sohu.com/a/487034326_120992086/?pvid=000115_3w_a","https://baijiahao.baidu.com/s?id=1710144058832503132&wfr=spider&for=pc","https://baijiahao.baidu.com/s?id=1700962508517889041&wfr=spider&for=pc","https://3g.163.com/dy/article/GK1FK5DA0552ES0E.html","https://baijiahao.baidu.com/s?id=1699965568226281781&wfr=spider&for=pc&searchword=%E5%BC%BA%E5%9B%BD%E9%A2%98%E5%BA%93%20%E5%9B%9B%E4%BA%BA%E8%B5%9B2021%E5%B9%B49%E6%9C%8819%E6%97%A5%E6%9B%B4%E6%96%B0","https://baijiahao.baidu.com/s?id=1711673496978271795&wfr=spider&for=pc","https://baijiahao.baidu.com/s?id=1711953501117428315","https://baijiahao.baidu.com/s?id=1704154666589496715","https://baijiahao.baidu.com/s?id=1712048336088442418&wfr=spider&for=pc","https://www.sohu.com/a/496146193_120964075","https://3g.163.com/dy/article/GOSHMDP10537MGX9.html","https://baijiahao.baidu.com/s?id=1716603883995424757","https://baijiahao.baidu.com/s?id=1716547851907014702"];
//var webhttps =["https://baijiahao.baidu.com/s?id=1709904030242711471","https://baijiahao.baidu.com/s?id=1710423157419071645","https://baijiahao.baidu.com/s?id=1711804437513287744","https://baijiahao.baidu.com/s?id=1711969756730191549","https://baijiahao.baidu.com/s?id=1712059275920560797"];
//var webhttps =["https://3g.163.com/dy/article/GOSHMDP10537MGX9.html"];
var flag = 0;
var ZiXingTiArray = ["选择词语的正确词形。","下列词形正确的是。","下列读音正确的是。","下列词形正确的是","选择词语的正确词形（）。","选择正确的读音。","选择正确的读音","下列不属于二十四史的是。","下列不属于“十三经”的是。","下列说法正确的是。"];
var chutiIndexArray = ["（出题：","(出题：","（来源","来源:《现代汉语词典》","（推荐","推荐单位：","出题：","（来源《","推荐：","来源:《"];//去除题目中尾巴（非题目内容）
var webtype;
/*var dbName = "tiku.db";
    var path = files.path(dbName);
    if (!files.exists(path)) {
        //files.createWithDirs(path);
        console.error("未找到题库!请将题库放置与js同一目录下");
    }
var db = SQLiteDatabase.openOrCreateDatabase(path, null);*/
//var db ;
var daAn ="";
var answer="";
var tiMu ="";
/**
 * @description: 将Unicode解码
 * @param: str 含有
 * @return: null
 */
 
 
  function decodeUnicode(str) {
            //先把十六进制unicode编码/u替换为%u
            str = str.replace(/\\u003c/gi,'<');
            str = str.replace(/\\u003e/gi,'>');
            //再把页面中反斜杠替换为空
            //str = str.replace(/\\/gi,'');
            return unescape(str);
        }
        
        
        //检测某个字符是否在此数组中
function isInArray(arr, str) {
    var testStr = ',' + arr.join(",") + ",";
    return testStr.indexOf("," + str + ",") != -1 ;
}
/**
 * @description: 检查答案是否正确，并更新数据库
 * @param: question, ansTiku, answer
 * @return: null
 */
function checkAndUpdate(question, ansTiku, answer) {
     console.warn("对比本地题库与网络信息是否更新或调整：");
     console.info("'"+ansTiku+"'：本地<-#->网络：'"+answer+"'");
     //console.info("题目：'"+question+"'");
	try{
    
        if (ansTiku == undefined && answer != "") { //正确进入下一题，且题库答案为空              
          var sql = "INSERT INTO tiku VALUES ('" + question + "','" + answer + "','')";console.log("网页中有题目可更新！");}
          else if (ansTiku != answer){var sql = "UPDATE tiku SET answer='" + answer + "' WHERE question LIKE '" + question + "'";console.log("网页中有题目可进行调整！");}
            else if (ansTiku == answer){console.log("题库中答案与网络答案相同！");return false;}
            	else if (answer ==""){console.log("未能获取答案！");return false;}
            insertOrUpdate(sql);
            console.log("插入/调整  题库中答案...");
           return true;
        
   }catch(error){
	   console.info(error);
        }

    }
    
/**
 * @description: 增加或更新数据库
 * @param: sql
 * @return: null
 */
function insertOrUpdate222(sql,insert) {
    var dbName = "tiku.db";
    var path = files.path(dbName);
    if (!files.exists(path)) {
        //files.createWithDirs(path);
        console.error("未找到题库!请将题库放置与js同一目录下");
    }
       var db = SQLiteDatabase.openOrCreateDatabase(path, null);
        db.beginTransaction();
    var  stmt = db.compileStatement(sql); 
     
     if(insert == 1){
     	stmt.bindString(1, tiMu);
     stmt.bindString(2, daAn);
     	stmt.executeInsert(); } //stmt.executeUpdate(stupdate); 
     if(insert == 0){stmt.executeUpdate(); }
     stmt.clearBindings();
    //db.execSQL(sql);
    //db.close();
}  


/**
 * @description: 增加或更新数据库
 * @param: sql
 * @return: null
 */
function insertOrUpdate(sql) {
    var dbName = "tiku.db";
    var path = files.path(dbName);
    if (!files.exists(path)) {
        //files.createWithDirs(path);
        console.error("未找到题库!请将题库放置与js同一目录下");
    }
    var db = SQLiteDatabase.openOrCreateDatabase(path, null);
    db.execSQL(sql);
    db.close();
}  
    
/**
 * @description: 从数据库中搜索答案
 * @param: question 问题
 * @return: answer 答案
 */
function getAnswer(question, table_name) {
    var dbName = "tiku.db";//题库文件名
    var path = files.path(dbName);
    
    var db = SQLiteDatabase.openOrCreateDatabase(path, null);
   //db.execSQL(dbName,"PRAGMA?synchronous?=?OFF",0,0,0);
   //console.info("题目结果：'"+question+"'");
   //sql = "SELECT answer FROM " + table_name + " WHERE question LIKE '" +"%"+question + "%'";
   sql="SELECT answer FROM " + table_name + " WHERE question ='" + question + "'";
    
    var cursor = db.rawQuery(sql, null);
    if (cursor.moveToFirst()) {
        var answer = cursor.getString(0);
        cursor.close();
        return answer;
    }
    else {
        //console.error("题库中未找到答案");
        cursor.close();
        return ;
    }
}


/**
 * 插入tiku表
 * @param  {} liArray li列表，包含题目和答案
 */
function CreateAndInsert(liArray){
    
    let dbName = "tiku.db";
    //文件路径
    let path = files.path(dbName);
    //确保文件存在
    if (!files.exists(path)) {
        files.createWithDirs(path);
    }
    //创建或打开数据库
    // db = SQLiteDatabase.openOrCreateDatabase(path, null);
   /* let createTable = "\
    CREATE TABLE IF NOt EXISTS tiku(\
    question CHAR(253),\
    answer CHAR(100)\
    );";*/
   // let cleanTable = "DELETE FROM tiku";
  // db.execSQL(createTable);
    //db.execSQL(cleanTable);
    log("打开表tiku!");
    let timu_line ;
    var DaAan_Dictionary = new Array;
    //var sql = "INSERT INTO tiku (question, answer) VALUES (?, ?)";
    //db.beginTransaction();
    //let stmt = db.compileStatement(sql);
	var liText,answerClass;
	
    
    for (let li = 0, len = liArray.size(); li < len; li++) {
        //log("题目："+li.text());
        //var liText = liArray.get(li).text();
        if(webtype =='pc'){
           if(flag == 0) {liText = liArray.get(li).select("p:has(span)").text();
      	             answerClass = liArray.get(li).select("p:has(span)");}

             else{liText = liArray.get(li).select("div:has(p)").text();}
        
        
        }
		    else if(webtype =='51'){liText = liArray.get(li).select("p").text();}
        else{liText = liArray.get(li).select("p").text();}
      if(liText !='') {
         liText = liText.replace(/^[　]+/g, ""); 
        // console.info("网页行#："+liText);}
         if (/^[A-D]{1}[\.、．：]{1}/.test(liText)) {
         	let char_key,char_answer;
         let reg2 = /^([A-D]{1})[\.、．：]{1}(.*)$/;
         	    reg2.test(liText);
         	char_key = RegExp.$1;
         	char_answer = RegExp.$2;
         	//console.log("ttt"+split_char+"rrr");
         	//let char_key,char_answer;
         	
       /*  	let temp = liText.split(/[\.|、．]/,2);//let temp = liText.split(/[\.]/,2);
         	char_key = temp[0] ;char_answer = temp[1];*/
          char_answer =char_answer.replace(/^\s+/g,'');
      	//console.log(char_key+"分开字符和文字:"+char_answer);
         	DaAan_Dictionary[char_key] = char_answer ;
         	//RegExp.$1 = '';
         	//RegExp.$2 ='';
        }
        //console.info("题目2#："+answerClass);
     if (/^[0-9]+\s?[\.、．]{1}/.test(liText)) {
		//liText = liText.substring(2);
		 var timuTitle = liText.replace(/^\"?[0-9]+\s?[\.|、|．]+/g, "");
         k_num+=1;
		     //timuTitle = liText.replace(/[ _]+/g, "");
		     //chutiIndex = question.lastIndexOf("出题");
		     //timuTitle = timuTitle.replace(/【 】/g, "");
			   timu_line = li;
			   DaAan_Dictionary = {};
		daAn="";
	 }
        
        //var timuPos = liText.indexOf("】") + 1;
       // var timuPos1 = liText.indexOf("（") + 1; 
       // var timuPos2 = liText.indexOf("）"); 
       // var timuPos3 = liText.indexOf("．")-1;
       // var daAn = liText.substring(timuPos1,timuPos2).replace(/ /g, "");
       /* if(webtype !='pc'){var reg = /^【?正确答案[：】]{1}\s?([A-D]{1})\s?/;
        	
        	 reg.test(answerClass);
           
                daAn = RegExp.$1;
        	}*/
		if (/class\=\"bjh\-strong\"\>([A-D]{1})[\.、．]{1}/.test(answerClass)){
            var reg = /\-strong\"\>([A-D]{1})[\.、．]{1}([^<]+)<\/span>/;
          let ttrue =  reg.test(answerClass);
                
         if(ttrue)     {  daAn = RegExp.$1;}
                
		            //console.log("###"+daAn);
		            console.warn("网络答案为:"+DaAan_Dictionary[daAn]);
		}
		else{
			 
			 /*if(webtype =='51'){
				//var reg = /^【答案：\s?([A-D]{1})\s?】/;                  //【答案：A】正确答案：C
				  var reg = /^【?正确答案[：】]{1}\s?([A-D]{1})\s?/;
				 }
			 else{
	
          var reg = /^【?正确答案[：】]{1}\s?([A-D]{1})\s?/;
          }*/
         //RegExp =[];
        var reg = /【?[正确]?答案[:：】]{1}\s?([A-D]{1})\s?/;
       
			let    succesful =  reg.test(liText);
	if(succesful)		 {daAn = RegExp.$1;}
//console.log("+++"+succesful);
		//console.log("###"+daAn);
			 /*if(webtype =='51'){
				 //daAn = DaAan_Dictionary[daAn] ;
				 
				 } //多了“选项：”这一网页行+2
			 else{
			  var index_char_unicode = daAn.charCodeAt(0) - "A".charCodeAt(0)+1;
			  }*/
		}
        try{
        //var tiMu = liArray.get(li).select("p:has(span)").text();
		    
		      	    tiMu = timuTitle;
		      	
        
            //console.info("###"+index_char_unicode);
       
        if( daAn != ''){
        
          daAn = DaAan_Dictionary[daAn] ;
          //console.log("***"+daAn);
          tiMu = tiMu.replace(/[【 】—-]/g, "");
         tiMu = tiMu.replace(/[_＿]+/g, "");
		      tiMu = tiMu.replace(/\[单选题\]/g,"");

tiMu = tiMu.replace(/（）/g,"");
tiMu = tiMu.replace(/\(\s*\)/g,"");
tiMu = tiMu.replace(/\s+/g,'');
/*chutiIndexArray.forEach(item => {//数组循环
        let chutiIndex = tiMu.lastIndexOf(item);
        if (chutiIndex != -1) { //如果是带后缀的题目     
            tiMu = tiMu.substring(0, chutiIndex); //将题目中后缀去除
           }
       });*/
tiMu = tiMu.replace(/（?(?:出题|推荐|来源)[^）]+）$/g,"");//（出题单位：中国电影资料馆）
tiMu = tiMu.replace(/\(?(?:出题|推荐|来源)[^\)]+\)$/g,"");
//tiMu = tiMu.replace(/来源：《?[现代汉语词典|十万个为什么]?.*$/g,"");//来源：《十万个为什么》
		      var timu_zixing =  liArray.get(timu_line + 1).select("p:has(span)").text();
                     timu_zixing = timu_zixing.substring(2);
		      
	        ZiXingTiArray.forEach(item=>{
           	 if (tiMu == item.replace(/\s/g, "")) { //如果是特殊题目     
                    tiMu = tiMu + DaAan_Dictionary['A']; //字形题在题目后面添加第一选项
                   }
            });
     //   console.info(timu_zixing) ;
 console.warn("获取网络信息如下：");
daAn = daAn.replace(/^\s+/g,'');
tiMu = tiMu.replace(/\s+/g,'');
        console.log(util.format("%s题目:%s\n答案:%s"),k_num, tiMu, daAn);
        
    //let table_name = "tiku";
     tiMu = tiMu.replace(/\s+/g,'');
		 answer = getAnswer(tiMu, "tiku");
		if (answer == undefined){ checkAndUpdate(tiMu, answer, daAn);}
else if(answer != '')
{console.warn("答案已在题库中，无需更新！")}
     daAn="";
       }
      
      
      
      }catch(e){//console.warn(e);
      	}
 //}
    }
 
    //db.setTransactionSuccessful();
    //db.endTransaction();
    //db.close();  
    return true;  
}

/**
 * @description: 判断题库是否存在
 * @param: null
 * @return: null
 */
function judge_tiku_existence() {
    var dbName = "tiku.db";//题库文件名
    var path = files.path(dbName);
    if (!files.exists(path)) {
        //files.createWithDirs(path);
        console.error("未找到题库！请将题库文件放置与js文件同一目录下再运行！");
        return false;
    }
     db = SQLiteDatabase.openOrCreateDatabase(path, null);
    var createTable = "\
    CREATE TABLE IF NOT EXISTS tiku(\
    question CHAR(253),\
    answer CHAR(100)\
    );";
    db.execSQL(createTable);
    return true;
}



/**
 */
function updatetiku(website) {
	
	
	
	  console.setPosition(0, device.height / 1.5);
	  console.show();
    log("开始更新数据库...");
    //let filename = "./485240258_120964075.htm";
    //let html = files.path(filename);
    //let htmlString = files.read(filename);//读取本地网页文件
	
	
   //htmlString.forEach(item=>{console.info(item);});
    //console.info(htmlString);
    //let htmlString = Jsoup.connect("https://www.sohu.com/a/485240258_120964075").maxBodySize(0).timeout(10000).get();
//let htmlString = Jsoup.connect("https://www.sohu.com/a/485194502_120535546?scm=1002.44003c.3e8040b.PC_ARTICLE_REC&spm=smpc.content.fd-d.1.1629929058416VDlVf3V&_f=index_pagerecom_1").maxBodySize(0).timeout(10000).get();
/**
https://baijiahao.baidu.com/s?id=1694640305288746385&wfr=spider&for=pc

*/
let liArray;
 webtype = website.substr(-2,2);
console.info(webtype);
//webtype ='51';
//sleep(1000);
let htmlString = Jsoup.connect(website).maxBodySize(0).timeout(10000).get();//获取网络网页文件
if(webtype =='51'){
	//htmlString = decodeUnicode(htmlString);
	//htmlString = System.out.println(new String(htmlString.getBytes(),“utf-8”));
	//htmlString = htmlString.replace(/<p><\/p>/g,'');
  //htmlString = htmlString.replace(/\\u003e/g,'>');
	//console.log(htmlString);
	}
//console.log(htmlString);//获取整个网页源代码
//https://www.sohu.com/a/484164264_120964075
    //let htmlString = Jsoup.parse(pathhtml);
    let htmlArray = Jsoup.parse(htmlString);
      
    //let liArray = htmlArray.select("li:has(b)");
    //let liArray = htmlArray.select("p:has(span)");  //has(seletor): 查找匹配选择器包含元素的元素，比如：p表示哪些div包含了p元素 
    //<div><p>A.张三 </p> <p>B.李四</p>  </div>        <p> <span>A.fdfdf</span></p>   
  if(webtype =='pc'){
       
       liArray = htmlArray.select("p:has(span)");
       let number_array = liArray.size();
       if(number_array == 0)
      {liArray = htmlArray.select("div:has(p)");
      	flag =1;
      	}
      	else{flag =0;}
}
	else if(webtype =='51'){
		liArray = htmlArray.select("p");
	   }
    else{
	     liArray = htmlArray.select("p");
     }
     //console.log(liArray);//取所有的含<p>.....</p>之间数据
    log(util.format("网页行数数目%s\n"), liArray.size());    
    //执行更新
    if(CreateAndInsert(liArray))
    {
        return liArray.size();
    }else{
        return -1;
    }
}

webhttps.forEach(item=>{
	           console.log("提取网络题库网址："+item);
	           //sleep(1000);
           	 updatetiku(item);
            });
console.log("总计网络获取题目数:"+k_num);
//updatetiku(webhttps);
//module.exports = updatetiku;
