(function(exports) {
  var GithubIssueParser = function() {
    var deferred = $.Deferred();
    var repo = 'evanxd/marionette-reporter';
    var state = 'closed';
    var SOLVED_ISSUES_LINK = 'https://api.github.com/repos/' + repo + '/issues?state=' + state +'&callback=?';
    var users = {};
  
    $.getJSON(SOLVED_ISSUES_LINK, function(issues) {
      var issuesData = issues.data;
      console.log(issues);
  
      // we only collect issues which were really solved by someone
      $.each(issuesData, function(index, issue) {
        var userName = issue.assignee && issue.assignee.login;
        if (userName) {
          if (!users[userName]) {
            users[userName] = [];
          }
          users[userName].push(issue);
        }
      });

      deferred.resolve(users);
    });

    return deferred;
  };

  exports.GithubIssueParser = GithubIssueParser;
}(window));
