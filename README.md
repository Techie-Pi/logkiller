![Log Killer](https://socialify.git.ci/Techie-Pi/logkiller/image?description=1&font=Raleway&logo=https%3A%2F%2Fgithub.com%2FTechie-Pi%2Flogkiller%2Fraw%2Fmain%2F.github%2Fimages%2Flogkiller-logo.png&pattern=Signal&theme=Dark)

## Setup
In order to use this you need to do the following steps:
- Clone the repository
- Run ``yarn install --production`` ([Do **not** use ``npm``](#why-not-npm))
- Create a ``.env`` file: check the [example](.env.example)
- Run ``yarn start``

## Development
In order to modify or contribute to this project, you may need extra steps for this to work:
- Run ``yarn install`` ([Do **not** use ``npm``](#why-not-npm))
- Set ``WATCHER_DEVELOPMENT_MODE`` to true on ``.env``
- Modify ``WATCHER_ABSOLUTE_PATH`` to where you have cloned the repo, adding [``/dev_test``](.gitignore)
  - Example: ``C:\Users\ms-server-2001\enterpisey-java\logkiller\dev_test``
- Run ``yarn dev``

## Contributing
Read [CONTRIBUTING.md](CONTRIBUTING.md)

## FAQ
### Why not ``npm``?
This project handles personal information and thus, **everything** should be installed from the lockfile.

Yarn provides some great options to enforce this, like the default [``--frozen-lockfile``](.yarnrc)!
