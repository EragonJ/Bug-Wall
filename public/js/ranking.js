$(document).ready(function() {
  $.when(GithubIssueParser())
    .then(function(users) {
      GithubIssueRenderer(users);
    });
});
