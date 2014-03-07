(function(exports) {
    var GithubIssueParser = function() {
        var deferred = $.Deferred();
        var repo = 'evanxd/open-source-group';
        var state = 'all';
        var SOLVED_ISSUES_LINK = 'https://api.github.com/repos/' + repo + '/issues?state=' + state +'&callback=?';
        var users = {};
    
        $.getJSON(SOLVED_ISSUES_LINK, function(issues) {
            var issuesData = issues.data;

            console.log(issues);
    
            // we only collect issues which were really solved by someone
            $.each(issuesData, function(index, issue) {
                var userName = issue.user && issue.user.login;
                if (userName) {
                    if (!users[userName]) {
                        users[userName] = [];
                    }
                    users[userName].push(issue);
                }
            });

            console.log(users);

            deferred.resolve(users);
        });

        return deferred;
    };

    exports.GithubIssueParser = GithubIssueParser;
}(window));
