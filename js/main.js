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
	
	//******static data button******** 
	$("#sData").click(function() {
  		alert("Yey Static Data!");
	});
	
	
});//end 

//******
//Pull in static data 
//Load remote data
//******

//static data paginit---------------------------------------------

$("#staticdata").on("pageinit",function(){
 	//code for page
 	
//LOAD DATA FROM OUTSIDE APP


//JSON--------------------------------------------------

$('#jsondata').on('click', function(){
	$('#lyricdata').empty();
	$('<p>').html('JSON IMPORT').appendTo('#lyricdata');
	$.ajax({
		url: 'xhr/data.json',
		type: 'GET',
		dataType: 'json',
		success: function(response){
        for (var i=0, j=response.lyricList.length; i<j; i++){
						var jdata = response.lyricList[i];
							$(''+
								'<div class="lyrictitle">'+
								'<p>'+ jdata.lname +'</p>'+
								'<p>'+ jdata.ldate +'</p>'+
								'<p>'+ jdata.menu +'</p>'+
								'<p>'+ jdata.explicit +'</p>'+
								'<p>'+ jdata.rate +'</p>'+
								'<p>'+ jdata.notes +'</p>'
							).appendTo('#lyricdata');
							console.log(response);
							}
						}
					});
			return false;
	});	
//XML Data--------------------------------------------------

$('#xmldata').on('click', function(){
	$('#lyricdata').empty();
	$('<p>').html('XML IMPORT').appendTo('#lyricdata');
	$.ajax({
		url: 'xhr/data.xml',
		type: 'GET',
		dataType: 'xml',
		success: function(xml){
			$(xml).find("lyricBlock").each(function(){
   				var lname = $(this).find('lname').text();
   				var ldate = $(this).find('ldate').text();
   				var menu = $(this).find('menu').text();
   				var explicit = $(this).find('explicit').text();
   				var rate = $(this).find('rate').text();
   				var notes = $(this).find('notes').text();
    			$(''+
					'<div class="lyrictitle">'+
						'<h3>'+ lname +'</h3>'+
						'<p>Date Entered: '+ ldate +'</p>'+
						'<p>Category: '+ menu +'</p>'+
						'<p>Explicit: '+ explicit +'</p>'+
						'<p>Rate: '+ rate +'</p>'+
						'<p>Notes: '+ notes +'</p>'+
					'</div>'
				).appendTo('#lyricdata');
				console.log(xml);
			});
		}
	});
	return false;
});//end

//CSV Data--------------------------------------------------

$('#csvdata').on('click', function(){
	$('#lyricdata').empty();
	$('<p>').html('CSV IMPORT').appendTo('#lyricdata');
	 $.ajax({
        type: "GET",
        url: "xhr/data.csv",
        dataType: "text",
        success: function(data) {
        	var allTextLines = data.split(/\r\n|\n/);
    		var headers = allTextLines[0].split(',');
    		var lines = []; // main array 

			for (var i=1; i<allTextLines.length; i++) {
				var data = allTextLines[i].split(',');
				if (data.length == headers.length) {
					var lyricList = []; // blank array 

					for (var j=0; j<headers.length; j++) {
						lyricList.push(data[j]); 
					}
					lines.push(lyricList); 
				}

			}

			for (var m=0; m<lines.length; m++){
				var alyric = lines[m];
			$(''+
					'<div class="lyrictitle">'+
						'<h3>'+ alyric[0] +'</h3>'+
						'<p>'+'Date Entered: '+ alyric[1] +'</p>'+
						'<p>'+'Category: '+ alyric[2] +'</p>'+
						'<p>' +'Explicit: '+ alyric[3] +'</p>'+
						'<p>' + 'Rate: '+ alyric[4] +'</p>'+
						'<p>' + 'Notes:'+ alyric[5] +'</p>'+
					'</div>'
				).appendTo('#lyricdata');
			console.log(lines);	
			}
        }
	});
	return false;
});//end    

});


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


// GET MY DATA

$('#displayLink').live('click', function getData() {
    toggleControls("on");
    var getListdiv = $('#list')[0];
    for (var i = 0, j = localStorage.length; i < j; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        value = value.split(',');

        $('<div>').attr({'class': 'listDiv'}).appendTo('#list');
        $('<h3>').html(value[0]).appendTo('.listDiv');
        $('<p>').html('Date Entered: ' + value[1]).appendTo('.listDiv');
        $('<p>').html('Category: ' + value[2]).appendTo('.listDiv');
        $('<p>').html('Explicit Lyrics: ' + value[3]).appendTo('.listDiv');
        $('<p>').html('Rate: ' + value[4]).appendTo('.listDiv');
        $('<p>').html('Notes: ' + value[5]).appendTo('.listDiv');
        $('<p>').html($('<a>').attr({'href': '#','onclick': 'deleteItem(' + key + ');'}).html('Delete Lyrics')).appendTo('.listDiv');
        $('<p>').html($('<a>').attr({'href': '#','onclick': 'editItem(' + key + ');'}).html('Edit Lyrics')).appendTo('.listDiv');

    }
});


// EDIT MY DATA

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


// DELETE AN ITEM

function deleteItem(id) {
    var ask = confirm("Are you sure you want to delete your lyrics?");
    if (ask) {
        localStorage.removeItem(id);
        window.location.reload();
    } else {
        alert("Your lyrics were not removed.");
    }
}


// CLEAR MY DATA!

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

  	
});

 $("#about").on("pageinit",function(){
 	//code for page
 });
