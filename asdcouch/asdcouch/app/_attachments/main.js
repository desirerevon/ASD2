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

$("#lyric").on("pageinit",function(){
 	//code for page
 	
 	// SAVE MY DATA
$('#submit').live('click', function saveData(id) {
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
    var item = [lname, ldate, menu, explicit, rate, notes];
    
    localStorage.setItem(key, item);
    location.reload();
    alert("Lyrics Saved!");
    
}); 


//GET MY DATA-----------------------------------------------

$('#displayLink').live('click', function() {
    	$.ajax({
    	  "url": "_view/lyrics",
    	  "dataType": "json",
    	  "success": function(data){
    	  $.each(data.rows, function(index, value){
    	  	console.log(value);
    	});
       }
   });
});


//EDIT MY DATA-----------------------------------------------

function editItem(id) {
    var itemId = id;
    var value = localStorage.getItem(itemId);
    value = value.split(',');
    toggleControls("off");
    var lname = value[0];
    var ldate = value[1];
    var menu = value[2];
    var explicit;
    var rate = value[4];
    var notes = value[5];

    $('#lname').val(lname);
    $('#ldate').val(ldate);
    $('#menu').val(menu);
    if ($('#explicit').is(":checked")){
    explicit = "Yes";
    }else{
    explicit = "No";
    }
    $('#rate').val(rate);
    $('#notes').val(notes);

    // show edit item button, hide submit button
    var editButton = $('#edit-item-button').css('display', 'block');
    var subresButtons = $('#submit-reset-buttons').css('display', 'none');
    var itemList = $('#list').css('display', 'none');

    // when clicking editItem button
    $('#edit-item').live('click', function clickEdit() {
        var name = $('#lname').val();
        var date = $('#ldate').val();
        var menu = $('#menu').val();
        var explicit;
        if ($('#explicit').is(":checked")){
        explicit = "Yes";
        }else{
        explicit = "No";
        }
        var rate = $('#rate').val();
        var notes = $('#notes').val();
        var item = [
        lname, ldate, menu, explicit, rate, notes];
     
        localStorage.setItem(itemId, item);           
        location.reload();
        alert("Lyrics have been edited!");
        
    });

}


//DELETE AN ITEM-----------------------------------------------

function deleteItem(id) {
    var ask = confirm("Are you sure you want to delete your lyrics?");
    if (ask) {
        localStorage.removeItem(id);
        window.location.reload();
    } else {
        alert("Your lyrics were not removed.");
    }
}


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