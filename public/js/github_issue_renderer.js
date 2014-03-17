(function(exports) {

  var Helpers = {
    createUsername: function(userInfo) {
      var $username = $('<a href="#" target="_blank"></a>');
      $username.attr('href', userInfo.html_url);
      $username.text(userInfo.login);
      return $username;
    },
    createAvatar: function(userInfo) {
      var $avatar = $('<img class="avatar" src="">');
      $avatar.attr('src', userInfo.avatar_url);
      return $avatar;
    },
    createIssue: function(issue) {
      var $issue = $('<a href="#" class="issue badge" target="_blank"></a>');
      var issuePrefix = 'Issue ';
      $issue.text(issuePrefix + issue.number);
      $issue.data('labels', issue.labels);
      $issue.attr('href', issue.html_url);
      $issue.attr('title', issue.body);
      return $issue;
    }
  };

  var GithubIssueRenderer = function(users) {
    var $container = $('.container > .users');
    var $userTemplate = $('.user').remove().clone();

    $.each(users, function(userIndex, user) {
      var userInfo;
      var $eachUserHTML = $userTemplate.clone();
      var issuesHTML = [];

      $.each(user, function(issueIndex, issue) {
        if (!userInfo) {
          userInfo = issue.assignee;
        }

        // store issueHTML
        issuesHTML.push(Helpers.createIssue(issue));
      });

      $eachUserHTML.find('.account').append(Helpers.createUsername(userInfo));
      $eachUserHTML.find('.avatar-wrapper').append(Helpers.createAvatar(userInfo));
      $eachUserHTML.find('.issues').append(issuesHTML);

      $container.append($eachUserHTML.get(0));
    });
  };

  exports.GithubIssueRenderer = GithubIssueRenderer;
}(window));
