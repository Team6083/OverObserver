function dynamicallyLoadScript(url) {
    var script = document.createElement("script"); // Make a script DOM node
    script.src = url; // Set it's src to the provided URL

    document.head.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}

var ffield = {};
$.getScript('js/teamform_config/2018.js', function() {
  ffield['2018'] = field_2018;
});
$("#tfc_drop").append('<a class="dropdown-item tfcdropdown" selectYear="'+2018+'">'+2018+'</a>');
