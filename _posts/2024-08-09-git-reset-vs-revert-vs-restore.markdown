---
layout: post
title:  "git reset vs revert vs restore"
date:   2024-05-19 11:45 -0600
excerpt_separator: <!--more-->
---
I forgot the git command to restore a single file to a specific commit, modifying the working directory. It's `git restore`. But I need to remember the difference between `git restore`, `git reset`, and `git revert`....
<!--more-->

# The Github Documentation Page
The github /`git` [documentation page says this](https://git-scm.com/docs/git#_reset_restore_and_revert):

 > - `git-revert` is about making a new commit that reverts the changes made by other commits.
 > - `git-restore` is about restoring files in the working tree from either the index or another commit. This command does not update your branch. The command can also be used to restore files in the index from another commit.
 > - `git-reset` is about updating your branch, moving the tip in order to add or remove commits from the branch. This operation changes the commit history.

Nate should revisit this post to clarify:
 - `revert` vs `restore` specifically
   - the [documentation for `git revert` says](https://git-scm.com/docs/git-revert#_description) (emphasis added):
   - > If you want to **extract specific files** as they were in another commit, you should see git-restore[1], specifically the --source option.
 - and use a single  hypothetical developer/codebase that demonstrates all three commands with three different scenarios

