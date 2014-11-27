# Contributing

1.  Fork the project and clone your fork.

2.  Create a local feature branch:

        $ git checkout -b <branch>

3.  Make one or more atomic commits. Each commit should have a descriptive
    commit message, wrapped at 72 characters. Include unit tests if adding
    a function or fixing a bug. Update __dist/ramda.js__ with each commit:
    on Unix-based platforms, run `make`; on Windows, write the output of
    `scripts/build --complete` to a temporary file, then rename the file.

4.  Run `make test lint`, and address any errors. Preferably, fix commits
    in place using `git rebase` or `git commit --amend` to make the changes
    easier to review and to keep the history tidy.

5.  Push to your fork:

        $ git push origin <branch>

6.  Open a pull request.
