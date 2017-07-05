// check off specific todos by clicking

var $ = require('jQuery');
var jsdom = require('jsdom').jsdom
  , myWindow = jsdom().createWindow()
  , jq = require('jQuery').create()
  , jQuery = require('jQuery').create(myWindow)
  ;
  
$("ul").on("click","li", function(){
	$(this).toggleClass("completed");

});

$("input[type='text']").on("keypress", function(event){
	if(event.which === 13){
		var data = $(this).val();
		var todo = "<li><span><i class='fa fa-trash'></i></span> "+ data + "</li>";
		$(this).val("");
		$("ul").append(todo);
		

	}
});

$("ul").on("click","span", function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
});

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
});

