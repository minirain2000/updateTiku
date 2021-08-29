//题库网址来源：https://www.sohu.com/a/485240258_120964075 （百度搜索"学习强国 四人赛 题库 2021年8月23日"）

// 加载jsoup.jar
runtime.loadJar("./jsoup-1.12.1.jar");
// 使用jsoup解析html
importClass(org.jsoup.Jsoup);
importClass(org.jsoup.nodes.Document);
//importClass(org.jsoup.nodes.Element);
importClass(org.jsoup.select.Elements);

importClass(android.database.sqlite.SQLiteDatabase);
console.setGlobalLogConfig({ "file": "/sdcard/脚本/AiQiangGuo运行日志.txt" });


//var webhttps ="https://baijiahao.baidu.com/s?id=1698991910892712773&wfr=spider&for=pc";
var webhttps =["https://www.sohu.com/a/485240258_120964075","https://www.sohu.com/a/485194502_120535546?scm=1002.44003c.3e8040b.PC_ARTICLE_REC&spm=smpc.content.fd-d.1.1629929058416VDlVf3V&_f=index_pagerecom_1","https://baijiahao.baidu.com/s?id=1694640305288746385&wfr=spider&for=pc","https://baijiahao.baidu.com/s?id=1698991910892712773&wfr=spider&for=pc","https://www.sohu.com/a/480410230_120535546?scm=1007.70.0.0.0&spm=smpc.content.fd-link.1.1630148813434Yz40YEn"];
var ZiXingTiArray = ["选择词语的正确词形。",
"下列词形正确的是。",
    "下列词形正确的是",
"选择词语的正确词形（）。",
    "选择正确的读音。",
   "选择正确的读音",
    "下列不属于二十四史的是。",
    "下列不属于“十三经”的是。",
    "下列说法正确的是。"];　　　　//特殊题，特点：题目一样，答案不同 如 /下列不属于二十四史的是 /下列不属于“十三经”的是
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
 * @description: 检查答案是否正确，并更新数据库
 * @param: question, ansTiku, answer
 * @return: null
 */
/**
 * @description: 检查答案是否正确，并更新数据库
 * @param: question, ansTiku, answer
 * @return: null
 */
function checkAndUpdate(question, ansTiku, answer) {
     console.info(ansTiku+"：本地<-#->网络："+answer);
	try{
    
        if (ansTiku == "" && answer != "") { //正确进入下一题，且题库答案为空              
          var sql = "INSERT INTO tiku VALUES ('" + question + "','" + answer + "','')";console.log("网页中有题目可更新！");}
          else if (ansTiku != answer){var sql = "UPDATE tiku SET answer='" + answer + "' WHERE question LIKE '" + question + "'";console.log("网页中有题目可进行调整！");}
            else if (ansTiku == answer){console.log("题库中答案与网络答案相同！");return false;}
            	else if (answer ==""){console.log("未能获取答案！");return false;}
            insertOrUpdate(sql);
            console.log("插入题库答案...");
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
   //db.execSQL(dbName,"PRAGMA synchronous = OFF",0,0,0);
   
   sql = "SELECT answer FROM " + table_name + " WHERE question LIKE '" +"%"+question + "%'";
   // sql="SELECT answer FROM " + table_name + " WHERE question =" + 'question'
    
    var cursor = db.rawQuery(sql, null);
    if (cursor.moveToFirst()) {
        var answer = cursor.getString(0);
        cursor.close();
        return answer;
    }
    else {
        //console.error("题库中未找到答案");
        cursor.close();
        return '';
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
    //var sql = "INSERT INTO tiku (question, answer) VALUES (?, ?)";
    //db.beginTransaction();
    //let stmt = db.compileStatement(sql);
	var liText,answerClass;
	
    
    for (let li = 0, len = liArray.size(); li < len; li++) {
        //log("题目："+li.text());
        //var liText = liArray.get(li).text();
        if(webtype =='pc'){
        liText = liArray.get(li).select("p:has(span)").text();
        
        answerClass = liArray.get(li).select("p:has(span)");
        }
        else{liText = liArray.get(li).select("p").text();}
        console.info("网页行#："+liText);
        //console.info("题目2#："+answerClass);
     if (/^\"?[0-9]+\./.test(liText)) {
		//liText = liText.substring(2);
		 var timuTitle = liText.replace(/^\"?[0-9]+\./g, "");
		     //chutiIndex = question.lastIndexOf("出题");
		     //timuTitle = timuTitle.replace(/【 】/g, "");
			   timu_line = li;
		
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
		if (/class\=\"bjh\-strong\"\>([A-D]{1})\./.test(answerClass)){
            var reg = /\-strong\"\>[A-D]{1}\.([^<]+)<\/span>/;
                reg.test(answerClass);
           
                daAn = RegExp.$1;
		        //console.log("###"+daAn);
		}
		else{
			 var reg = /^【?正确答案[：】]{1}\s?([A-D]{1})\s?/;
			 reg.test(liText);
			 daAn = RegExp.$1;
		var index_char_unicode = daAn.charCodeAt(0) - "A".charCodeAt(0)+1;
		}
        try{
        //var tiMu = liArray.get(li).select("p:has(span)").text();
		    
		      	    tiMu = timuTitle;
		      	
        
            //console.info("###"+index_char_unicode);
       
        if(webtype =='pc'){
        	if( daAn != ''){
        //var daAn_zh_cn = liArray.get(li+index_char_unicode).select("span").first().text();
        //var daAn_zh_cn = liArray.get(timu_line + index_char_unicode).select("p:has(span)").text();
            //daAn = daAn_zh_cn.substring(2);
          ///^([0-9]{1,3}\．)/.test(tiMu);
          //var repl = RegExp.$1;
          //tiMu = tiMu.replace(/^[0-9]{1,3}\．/g, "");
      var timu_zixing =  liArray.get(timu_line + 1).select("p:has(span)").text();
          timu_zixing = timu_zixing.substring(2);
          
          tiMu = tiMu.replace(/【 】/g, "");
          tiMu = tiMu.replace(/____/g, "");
		      tiMu = tiMu.replace(/\[单选题\]/g,"");
		      ZiXingTiArray.forEach(item=>{
           	 if (tiMu == tiMu.replace(/\s/g, "")) { //如果是特殊题目     
                    tiMu = tiMu + timu_zixing; //字形题在题目后面添加第一选项
                   }
            });

        console.log(util.format("题目:%s\n答案:%s"), tiMu, daAn);
        
     let table_name = "tiku";
		 answer = getAnswer(tiMu, table_name);
		 checkAndUpdate(tiMu, answer, daAn);
       }
      }
      else {
      	if(index_char_unicode != NaN){
      		
      		var daAn_zh_cn = liArray.get(timu_line + index_char_unicode).select("p").text();
            daAn = daAn_zh_cn.substring(2);
          ///^([0-9]{1,3}\．)/.test(tiMu);
          //var repl = RegExp.$1;
          //tiMu = tiMu.replace(/^[0-9]{1,3}\．/g, "");
          var timu_zixing =  liArray.get(timu_line + 1).select("p:has(span)").text();
              timu_zixing = timu_zixing.substring(2);
          tiMu = tiMu.replace(/【 】/g, "");
           tiMu = tiMu.replace(/____/g, "");
           tiMu = tiMu.replace(/\[单选题\]/g,"");
           ZiXingTiArray.forEach(item=>{
           	 if (tiMu == tiMu.replace(/\s/g, "")) { //如果是特殊题目     
                    tiMu = tiMu + timu_zixing; //字形题在题目后面添加第一选项
                   }
            });
           console.log(util.format("题目:%s\n答案:%s"), tiMu, daAn);
      		
     //let table_name = "tiku";
		 answer = getAnswer(tiMu, "tiku");
		 checkAndUpdate(tiMu, answer, daAn);
      		
      		}
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
//sleep(1000);
let htmlString = Jsoup.connect(website).maxBodySize(0).timeout(10000).get();//获取网络网页文件

//console.log(htmlString);//获取整个网页源代码
//https://www.sohu.com/a/484164264_120964075
    //let htmlString = Jsoup.parse(pathhtml);
    let htmlArray = Jsoup.parse(htmlString);
    //let liArray = htmlArray.select("li:has(b)");
    //let liArray = htmlArray.select("p:has(span)");  //has(seletor): 查找匹配选择器包含元素的元素，比如：div:has(p)表示哪些div包含了p元素 
  if(webtype =='pc'){
       liArray = htmlArray.select("p:has(span)");}
    else{
	     liArray = htmlArray.select("p");
     }
     //console.log(liArray);//取所有的含<p>.....</p>之间数据
    log(util.format("题库数目%s\n"), liArray.size());    
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
	           sleep(500);
           	 updatetiku(item);
            });
//updatetiku(webhttps);
//module.exports = updatetiku;

