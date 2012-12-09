include("fileio.js");

makeDir("quizzard");
makeDir("quizzard\\images");



function Answer(question, answer, str_input)
{
  this.question = question;  
  this.answer = answer;
  this.str_input = str_input;

}

function doQuiz(name, link){
go(link);
wait();
//alert("a");
var fname = "quizzard\\"+name + ".xml";

write(fname, "");
//alert("b");

append(fname,"<data>");

//alert(name + link);


var questions = Array();
var answers = Array();
var str_answer_arr = Array();
var str_two_dim_arr = Array();
var flagdeb = 0;
for(var i=0;i<document.getElementsByTagName('*').length;i++)
{

//here, this flagdeb is preventing the script to include any other inputs like "remember me" in the page

  if(document.getElementsByTagName('*')[i].tagName == 'BUTTON')
  { 
  	//alert("yo, button!");
  	flagdeb = 0;
  }
  if(document.getElementsByTagName('*')[i].tagName == 'H3')
  {
    var str_question = String(document.getElementsByTagName('*')[i].innerHTML);
    if(str_question.search("Success")!=-1)
    {
      continue;
    }
    questions.push(str_question);flagdeb = 1;
  }
  if(document.getElementsByTagName('*')[i].tagName == 'LABEL' && flagdeb == 1)
  {
    var str_answer = String(document.getElementsByTagName('*')[i].innerHTML);
    //append(fname, "adib"+str_answer+"\r\n");



    if(str_answer.search("input")!=-1)
    {
      str_answer_arr = str_answer.split(">");
      var str_answer_value = String(str_answer_arr[1].trim(" "));
      //append(fname, "adib"+str_answer_value+"\r\n");

//alert (str_answer_value);
      answers.push(new Answer(str_question, str_answer_value,str_answer));
    }
  }  
}


//calculating answers

var two_dim_arr = Array();
var two_dim_arr_input = Array();
//alert(questions.length);


for(var i=0;i<questions.length;i++)
{
  two_dim_arr[i] = new Array();
  two_dim_arr[i].push(questions[i]);
  
  two_dim_arr_input[i] = new Array();
  two_dim_arr_input.push(questions[i]);
 for(var j=0;j<answers.length;j++)
  {
      if(answers[j].question == questions[i])
      {
        two_dim_arr[i].push(answers[j].answer);
		two_dim_arr_input[i].push(answers[j].str_input);
      }
  }
}
//print the entire question and answer set

append(fname, "<set>");
for(var i=0;i<two_dim_arr.length;i++)
{
	append(fname, "<q_ans>");	
	append(fname,"<question>");
	append(fname, two_dim_arr[i][0]);
	append(fname, "</question>");
	for(var j=1;j<two_dim_arr[i].length;j++)
	{
		append(fname, "<answer>");
		append(fname, two_dim_arr[i][j]);
		append(fname, "</answer>");
	}
	append(fname, "</q_ans>");
}


//this thingy writes authorname + date etc from the quiz page itself. 

for(var i=0;i<document.getElementsByTagName('*').length;i++)
{
  if(document.getElementsByTagName('*')[i].className == "metadata quidget")
  {
    var node_result = document.getElementsByTagName('*')[i];
 
    child_node = node_result.getElementsByTagName('dl')[0];
    rslt_node = child_node.getElementsByTagName('dd');
    for(var j=0;j<rslt_node.length;j++)
    {
      if(j==0)
      {
        var profile = String(rslt_node.item(j).innerHTML).split("\"")[1];
        append(fname,"<created_by>");
        append(fname,profile);
        append(fname,"</created_by>");
        //alert(profile);
      }
      if(j==1)
      {
        var date = rslt_node.item(j).innerHTML;
        //alert("date = "+date);
        
        append(fname,"<date>");
        append(fname,date);
        append(fname,"</date>");      
      }

      if(j==2)
      {
        var users = rslt_node.item(j).innerHTML;
        
        append(fname,"<no_of_user>");
        append(fname,profile);
        append(fname,"</no_of_user>");        //alert("users = "+users);
      }
    }
    //alert(.item(0).innerHTML);
    //result_node= node_result.getElementsByTagName('h3');
  }
  
}



//this thingy writes the tags

append(fname,"<tags>");

for(var i=0;i<document.getElementsByTagName('a').length;i++)
{
   if(document.getElementsByTagName('a')[i].className == "tag")
   {
    append(fname,"<tag>")
    append(fname,document.getElementsByTagName('a')[i].innerHTML);
    append(fname, "</tag>");
  }
}

append(fname, "</tags>");

append(fname, "</set>");


 
/*
//calculating ans length . we don't need this

var answer_length = Array();

var answer_length_order = Array();
for(var i=0;i<questions.length;i++)
{
    answer_length[i]=two_dim_arr[i].length-1;
    answer_length_order[i]=i;
    //alert(answer_length);


}
//bubble sort !

for(var i=0;i<answer_length.length-1;i++)
{
  for(var j = i+1;j<answer_length.length;j++)
  {
    if(answer_length[i]>answer_length[j])
    {

       var temp = answer_length[i];
       answer_length[i]=answer_length[j];
       answer_length[j] = temp; 
       var temp = answer_length_order[i];
       answer_length_order[i]=answer_length_order[j];
       answer_length_order[j] = temp; 
        
    }
  }
}
*/
//alert(answer_length);

//alert(answer_length_order);

//alert(answer_length[answer_length_order.length-1]);



//this portion of actually clicking the attempts has been thoroughly redesigned and simplified.

var p;

	append(fname, "<attempt>");

	var main = document.getElementsByClassName("checkradiowrap");
	for (var i = 0; i<main.length-1;i++)
	{
		p=Math.ceil(Math.random()*(two_dim_arr[i].length-2));
		append(fname, "<q_ans>");
        append(fname,"<question>");
		append(fname,questions[i]);
		append(fname,"</question>");
		append(fname,"<answer>");
		append(fname,two_dim_arr[i][p]);
		append(fname,"</answer>");
		append(fname, "</q_ans>");
                               
		   		//alert(str_innerHTML +" answer "+two_dim_arr[j][p]+" j= "+j);
		var p_ansr = main[i].getElementsByTagName("label");
//alert(p_ansr[p].innerHTML);
//	alert("i="+i+"p="+p);
//alert(two_dim_arr[i][p]);
   		click(p_ansr[p]);
	}

//random choice and clicking ends.. time to submit.

 
	click("SUBMIT");

    wait();
	for(var i=0;i<document.getElementsByTagName('div').length;i++)
	{
	   	if(document.getElementsByTagName('div')[i].className =="quizdisplay themestylename theme_db_primarykey")
		{
			var node_result = document.getElementsByTagName('div')[i];
			child_node = node_result.getElementsByTagName('p');
			result_node= node_result.getElementsByTagName('h3');
			append(fname,"<result>");
			append(fname, "<result_header>");
			append(fname,result_node.item(0).innerHTML);
			append(fname,"</result_header>");
			
			//alert(child_node.item(2).innerHTML);

//the img node comes before the child_node.item(2) .. so this probably won't work
/*			var str_rslt= String(child_node.item(2).innerHTML);
			if(str_rslt.search("<img")!=-1)
			{
				var str_rslt_arr = str_rslt.split("<br>");
				append(fname,str_rslt_arr[0].trim("<>"));
				append(fname,"</img>");
				append(fname,"<result_details>");
				append(fname,str_rslt_arr[1]);
				append(fname,"</result_details>");
			}

*/
			var str_rslt= String(node_result.innerHTML);
//			if(str_rslt.search("<img")!=-1)
if (node_result.getElementsByTagName('img'))
			{
var images = document.images;
  var asd = images[0].src;
}
if (asd.search("comscore.gif")==-1) //the default image
			{

//saves the image in a seperate images folder			
				var saveFileTo = "/quizzard/images/"+name+".jpg";
				writeBytes( saveFileTo, read(asd) );
//writing 
//alert("img"); 
  				var str_rslt_arr = str_rslt.split("<br>");
				append(fname,"<img>");
				append(fname,asd);
				append(fname,"</img>");
/*				append(fname,"<result_details>");
				append(fname,str_rslt_arr[1]);
				append(fname,"</result_details>");
*/
				append(fname,"<result_details>");
				append(fname,child_node.item(2).innerHTML);
				append(fname,"</result_details>");

//alert(xpath);	
	}

			else

			{
				append(fname,"<result_details>");
				append(fname,child_node.item(2).innerHTML);
				append(fname,"</result_details>");
			}
			append(fname, "</result>");
			append(fname,"</attempt>");
		}
	}	
//    back();


append(fname,"</data>");

//alert("complete"); 


} //doQuiz ends !

//doQuiz("jedi", "http://quizilla.teennick.com/quizzes/23959396/what-jedi-are-you-for-girls");

//the below portion rus on the main page and selects all the available uizes there
//doquiz function does the quizes and store results in seperate files named by theat quiz
//images are downloaded in the corresponding folders. as asked.. :)



function recur_doQuiz(arr){
	for (var i = 0; i<arr.length; i++){
//	alert(arr[i][0].split('?')[0].trim(" "));

//here, we can also use the original quizname as the filename. works all the same.. but the split by ? and the trim is very necessary to avoid file io exception !

		doQuiz(arr[i][0].split('?')[0].trim(" "), arr[i][1]);

//for test purposes i'm passing only the quiz number..
//		doQuiz(i, arr[i][1]);
	}
}

var fname = "quizzard\\list.xml";
write(fname, "");
append(fname,"<data>");

if(document.getElementById("ultimate"))
{
	var maincontent = document.getElementById("ultimate");
	var tbody = maincontent.getElementsByTagName("tbody");
	var quiz= tbody[0].getElementsByTagName("tr");
	var quizcount = quiz.length;
	append(fname,"<quizcount>");
	append(fname,quizcount);
	append(fname,"</quizcount>");

	var d_arr = Array();

	for (var i =0; i<quizcount;i++){


		var asd = quiz[i].getElementsByClassName("title_cell")[0].innerHTML;
		var link = asd.split('"')[1];
		link = "http://quizilla.teennick.com"+link;
		 asd = asd.split('>')[1];
		asd = asd.split('<')[0];
		append(fname,"<quizname>");
		append(fname,asd);
		append(fname,"</quizname>");
		append(fname,"<link>");
		append(fname,link);
		append(fname,"</link>");

//this is making a 2d array to store the quizzes to exeute later
//from this point, some performance upgradation of the script can be made

		d_arr[i] = new Array();
		d_arr[i].push(asd);
		d_arr[i].push(link);




		}
	//alert(asd);
}

append(fname,"</data>");

//finally calling each quiz links 
recur_doQuiz(d_arr);


