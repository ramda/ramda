# Contributing

1.  Fork the project and clone your fork.

2.  Create a local feature branch:

        $ git checkout -b <branch>

3.  If adding a function `R.foo`, define it in `source/foo.js`, export it from
    `source/index.js`, and include unit tests in `test/foo.js`. It is not necessary
    to include the `@since` annotation for new functions as it will be set
    during the release process of the following release. If adding an internal
    function `_foo`, define it in `source/internal/_foo.js`.

4.  Make one or more atomic commits. Each commit should have a descriptive
    commit message, wrapped at 72 characters. Do not commit changes to
    `dist/ramda.js`.

5.  Run `npm test` (or `make test lint`) and address any errors. It will install
    needed dependencies locally.  Preferably, fix commits in place using `git
    rebase` or `git commit --amend` to make the changes easier to review and to
    keep the history tidy.

6.  Push to your fork:

        $ git push origin <branch>

7.  Open a pull request.
