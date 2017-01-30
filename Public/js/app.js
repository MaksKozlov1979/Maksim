'use strict';

$(".ignore-search").select2({
    ajax: {
        url: "/dropdown/templates.json",
        processResults: function (data) {
            return { results: data }
        },
        cache: true
    },
    placeholder: "Search Operating Systems, IDEs, or Programming Languages",
    minimumInputLength: 1,
    theme: "bootstrap",
    multiple: true
});

// Delete selecitons by tag instead of individual letter
$(".ignore-search").on("select2:unselect", () => {
    $(".ignore-search").on("select2:open", () => {
        $(".select2-search__field").val("");
    });
});

// Highlight input on site load
setTimeout(function () {
    $(".select2-search__field").focus();
}, 100);

// All users to press ctrl+enter to create template
$(".ignore-search").on("select2:selecting", function(e) {
    setTimeout(function() {
        $(".select2-search__field").keydown(function(e) {
            if (e.keyCode == 13 && (e.metaKey || e.ctrlKey)) {
                generateGitIgnore();
            }
        });
    }, 100);
});

// Generate gitignore template
function generateGitIgnore() {
    var searchString = $(".ignore-search").map(function() {return $(this).val();}).get().join(',');
    var searchLength = searchString.length;
    if (searchLength > 0) {
        var files = searchString.replace(/^,/, '');
        var uriEncodedFiles = encodeURIComponent(files);
        window.location = "/api/" + uriEncodedFiles;
        $(".ignore-search").val("");
    }
}

// Generate gitignore file template
function generateGitIgnoreFile() {
    var searchString = $(".ignore-search").map(function() {return $(this).val();}).get().join(',');
    var searchLength = searchString.length;
    if (searchLength > 0) {
        var files = searchString.replace(/^,/, '');
        var uriEncodedFiles = encodeURIComponent(files);
        window.location = "/api/f/" + uriEncodedFiles;
    }
}
