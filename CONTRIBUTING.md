# Contributing

1.  Fork the project and clone your fork.

2.  Create a local feature branch:

        $ git checkout -b <branch>

3.  Add new functions as separate source files in src/. If the function is
    used by ramda functions elsewhere in uncurried form, then place the
    implementation in src/internal (see src/internal/_map.js as an example).

    NOTE: The file `dist/ramda.js` is **generated**.  Any changes to it will
    be overridden.

4.  Make one or more atomic commits. Each commit should have a descriptive
    commit message, wrapped at 72 characters. Include unit tests if adding
    a function or fixing a bug. Update __dist/ramda.js__ with each commit:
    on Unix-based platforms, run `make`; on Windows, write the output of
    `scripts/build --complete` to a temporary file, then rename the file.

5.  Run `make test lint`, (or `grunt test`) and address any errors. Preferably,
    fix commits in place using `git rebase` or `git commit --amend` to make the 
    changes easier to review and to keep the history tidy.

6.  Push to your fork:

        $ git push origin <branch>

7.  Open a pull request.
