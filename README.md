# Save and Restore Editors

[![Marketplace Version](https://vsmarketplacebadge.apphb.com/version/iulian-radu-at.save-restore-editors.svg)](https://marketplace.visualstudio.com/items?itemName=iulian-radu-at.save-restore-editors)
[![Installs](https://vsmarketplacebadge.apphb.com/installs/iulian-radu-at.save-restore-editors.svg)](https://marketplace.visualstudio.com/items?itemName=iulian-radu-at.save-restore-editors)
[![Rating](https://vsmarketplacebadge.apphb.com/rating/iulian-radu-at.save-restore-editors.svg)](https://marketplace.visualstudio.com/items?itemName=iulian-radu-at.save-restore-editors)
<a href="http://opensource.org/licenses/GPL-3.0" target="_blank" rel="noreferrer noopener"><img src="https://img.shields.io/badge/license-GPL-orange.svg?color=blue&amp;style=flat-square" alt="The GPL-3.0 License"></a>

Sometimes we need to stop on what we work and do something else.
And for this we need to close all or some of the currently opened text editors.
But later we want to work again on currently opened text editors.

This extension allows you to save sets of all opened text editors.
Then you can restore (reopen) them and also remove one of them from the saved sets.

The list of saved sets is stored in the first workspace folder in .vscode/save-restore-editors.json file.
If you make changes in this file and you corupt its structure, the extension will create instead a new empty file.

In the future is planned to be added a panel to Visual Code where you can see and manage all these
saved sets and also which files will be open.

## Features

- Save all open text editors
- Restore a set of open text editors
- Delete a set of open text editors

## Usage

This extension make available the following commands:

- Save and restore editors: Save all open text editors
- Save and restore editors: Restore a saved set of editors
- Save and restore editors: Delete a saved set of editors

## Requirements

There are no special requirements.

## Extension Settings

There are not any custom settings.

## Known Issues

The vscode.workspace.textDocuments does not return the URI for the tabs which were not made visible (open) by the user.
This happens when you start Visual Code and the previous set of opened editors are loaded by Visual Code.

## Change Log

See Change Log [here](CHANGELOG.md)

## Issues

Submit an [issue](https://github.com/iulian-radu-at/save-restore-editors/issues) if you find any bug or have any request.

## Contribution

Fork the [repo](https://github.com/iulian-radu-at/save-restore-editors) and submit pull requests.
