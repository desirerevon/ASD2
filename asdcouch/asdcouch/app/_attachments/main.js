//******
//Use pageinit function because jquery uses ajax to load the page
//Pageinit = load this code after you run js via ajax
//******

//homepage pageinit---------------------------------------------

$("#home").on("pageinit",function(){
	 //code for page

	//******about button******** 	
	$("#aboutB").click(function() {
  		alert("What you should know!");
	});


	//******add lyrics button******** 
	$("#addButton").click(function() {
  		alert("You are being redirected to the Add lyrics Page!");
	});
	
});//end 


//******
//User fills out form data is saved to local 
//Page should refresh with data still saved 
//May create a changePage function if needed 
//******

//lyric form paginit---------------------------------------------

$("#lyricForm").validate({
    submitHandler: function(form) {
        console.log("Call Action");
    }
});


$("#lyric").on("pageinit",function(){
 	//code for page
 	
 // SAVE MY DATA
$('#submit').on('click', function saveData(id) {
    var l = new Date();
    var key = (l.getTime());
    var lname = $("#lname").val();
    var ldate = $("#ldate").val();
    var menu = $("#menu").val();
    var explicit;
    if ($('#explicit').is(":checked")){
    explicit = "Yes";
    }else{
    explicit = "No";
    }
    var rate = $("#rate").val();
    var notes = $("#notes").val();
    var item = {
    
    	_id: "lyric:" + menu + ":",   
    lname: lname, 
    ldate: ldate,
    menu : menu,
    explicit : explicit,
    rate : rate,
    notes: notes
    };
    
    console.log(item);
    $.couch.db("asdproject").saveDoc(item, {
    	success: function(data) {
    		console.log(data);
    		alert("You have just added new lyrics!");    		
    	},
    	
    	error: function(status){
    		console.log(status);
    		alert("Your lyrics were not added!");
    	}
     });
     return false;
     });

//GET MY DATA-----------------------------------------------

var urlVars = function(){
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for(var pair in urlPairs){
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	return urlValues;
};


$('#myLyrics').on('pageshow', function() {
    	$.couch.db("asdproject").view("asdproject/lyrics",{
    	  success: function(data){
    	  $('#lyricItems').empty();
    	  console.log(data);
    	  $.each(data.rows, function(index, lyric){
    	  		           $(''+
                                            '<li>'+
                                                    '<p>'+"Lyrics Title: "+ lyric.value.lname + '<br />' + '</p>'+
                                                    '<p>'+"Category: "+ lyric.value.menu + '<br />' + '</p>'+
                                                    '<p>'+"Date Entered: "+ lyric.value.ldate + '<br />' + '</p>'+
                                                    '<p>'+"Explicit Lyrics: "+ lyric.value.explicit + '<br />' + '</p>'+
                                                    '<p>'+"Rate This App: "+ lyric.value.rate + '<br />' + '</p>'+
                                                    '<p>'+"Lyrics: "+ lyric.value.notes + '<br />' + '</p>'+
                                                '</li>'
                                    
                                ).appendTo("#lyricItems");
                                
                            });
                            $('#lyricItems').listview('refresh');
            },              
                error: function(data) {}
    	  
    	  });
}


//DELETE ANd Edit ITEM-----------------------------------------------
$.couch.db("asdproject").openDoc(urlVar){

	var deleteLink = $("#delete");
	deleteLink.on("click", function(){
		editDoc(idValue,revValue)
		//would we add changePage function once item is deleted?
		});
	  
	  var editLink = $("#edit");
	  editLink.on("click", function(){
	  	editDoc(idValue,revValue)
	  	
	  	});
	  };
	
	function deleteDoc(idValue,revValue){
	
		console.log("These lyrics have been deleted: ", idValue, revValue);
 		
 		var lyric = {
 		   _id: idValue,
 		   _rev: revValue
 		   }
 		   
 		
		$.couch.db("asdproject").removeDoc(lyric){
		success: function(response){
		console.log("Deleted: ", lyric);
      }
     }
 };



//CLEAR MY DATA-----------------------------------------------

function clearLocal() {
    if (localStorage.length === 0) {
        alert("There are no lyrics to clear.");
    } else {
        localStorage.clear();
        alert("All lyrics have been removed from local storage!");
        window.location.reload();
        return false;
    }
}

});//end

$("#slams").on("pageinit",function(){
  	//code for page
  	
});//end