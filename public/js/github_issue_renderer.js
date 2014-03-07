(function(exports) {

    var GithubIssueRenderer = function(users) {
        var $container = $('.container > .users');
        var $userTemplate = $('.user').remove().clone();

        $.each(users, function(userIndex, user) {
            var userInfo;
            var $eachUserHTML = $userTemplate.clone();
            var issuesHTML = [];

            $.each(user, function(issueIndex, issue) {
                if (!userInfo) {
                    userInfo = issue.user; 
                }

                var $issue = $('<a href="#" class="issue badge" target="_blank"></a>');
                $issue.text(issue.number);
                $issue.data('labels', issue.labels);
                $issue.attr('href', issue.html_url);
                $issue.attr('title', issue.body);

                // store issueHTML
                issuesHTML.push($issue.get(0));
            });

            $eachUserHTML.find('.avatar').attr('src', userInfo.avatar_url);
            $eachUserHTML.find('.issues').append(issuesHTML);
            $eachUserHTML.removeClass('hide');

            $container.append($eachUserHTML.get(0));
        });
    };

    exports.GithubIssueRenderer = GithubIssueRenderer;
}(window));
