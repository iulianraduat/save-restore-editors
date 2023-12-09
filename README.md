# Save and Restore Editors

[![Marketplace Version](https://img.shields.io/vscode-marketplace/v/iulian-radu-at.save-restore-editors)](https://marketplace.visualstudio.com/items?itemName=iulian-radu-at.save-restore-editors)
[![Installs](https://img.shields.io/vscode-marketplace/i/iulian-radu-at.save-restore-editors)](https://marketplace.visualstudio.com/items?itemName=iulian-radu-at.save-restore-editors)
[![Rating](https://img.shields.io/vscode-marketplace/r/iulian-radu-at.save-restore-editors)](https://marketplace.visualstudio.com/items?itemName=iulian-radu-at.save-restore-editors)
<a href="http://opensource.org/licenses/GPL-3.0" target="_blank" rel="noreferrer noopener"><img src="https://img.shields.io/badge/license-GPL-orange.svg?color=blue&amp;style=flat-square" alt="The GPL-3.0 License"></a>

Sometimes we need to stop on what we work and do something else.
And for this we need to close all or some of the currently opened text editors.
But later we want to work again on currently opened text editors.

This extension allows you to save sets of all opened text editors.
Then you can restore (reopen) them and also remove one of them from the saved sets.
When restoring tabs, the tab groups will be (partially) preserved but not their arrangement in window.
Also the active editor in restored tab groups will not refect the one at the time of save.
The preservation can be only partially as only text files will be restored.

The list of saved sets is stored in the first workspace folder in .vscode/save-restore-editors.json file.
If you make changes in this file and you corupt its structure, the extension will create instead a new empty file.

In the future is planned to be added a panel to Visual Code where you can see and manage all these
saved sets and also which files will be open.

## Features

- Save all open text editors
- Restore a set of open text editors
- Delete a set of open text editors

## Commands

This extension makes available the following commands:

- Save and restore editors: Save all open text editors
- Save and restore editors: Re-save all open text editors
- Save and restore editors: Restore a saved set of editors
- Save and restore editors: Close all and Restore a saved set of editors
- Save and restore editors: Delete a saved set of editors
- Save and restore editors: Pop (Restore+Delete) a saved set of editors
- Save and restore editors: Close all and Pop (Restore+Delete) a saved set of editors

## Keyboard shortcuts for commands

You can define keyboard shortcuts for the often used above commands.

In `Command pallet` (F1 or Ctrl + Shift + P) run the command `Preferences: Open Keyboard Shortcuts`.
In `Type to search in keybindings` type `Save and restore editors`. You can, with double click on an entry, define keyboard shortcuts for any command.

An example of keyboard shortcuts can be:

* `Ctrl + Alt + S` for `Save and restore editors: Save all open text editors`
* `Ctrl + Alt + D` for `Save and restore editors: Close all and Pop (Restore+Delete) a saved set of editors`

For more details check [Advanced customization](https://code.visualstudio.com/docs/getstarted/keybindings#_advanced-customization) on Visual Studio Code documentation.

## Usage - examples

### Save the list of all currently open editor views

* From `Command pallet` (F1 or Ctrl + Shift + P) run the command `Save and restore editors: Save all open text editors`
* Provide a name (for example: Ticket-1234) and press enter
* The list of currently open editors is saved in `.vscode\save-restore-editors.json`
* Commit or stash your changes
* Checkout a different branch

### Re-open a set of saved editors

* Checkout a branch in which you want to continue your work
* From `Command pallet` (F1 or Ctrl + Shift + P) run the command `Save and restore editors: Restore a saved set of editors`
* Pick from the list the name of the saved set correspondign to this branch
* In addition to already open editors will be opened the files specified in choosed saved set

### Replace the list of all currently open editor views

* When you need to switch again to a different branch you can replace the old set of opened editors for when you will come back
* From `Command pallet` (F1 or Ctrl + Shift + P) run the command `Save and restore editors: Re-save all open text editors`
* Pick the name of an already saved set from the list
* The list of currently open editors is saved in `.vscode\save-restore-editors.json` overwriting the old one
* Commit or stash your changes
* Checkout a different branch

### Replace currently open editor views and delete the saved set

* From `Command pallet` (F1 or Ctrl + Shift + P) run the command `Save and restore editors: Close all and Pop (Restore+Delete) a saved set of editors`
* All currently open editors are closed and all files specified in the saved set are open
* The saved set is removed from `.vscode\save-restore-editors.json`

## Requirements

There are no special requirements.

## Extension Settings

- saveRestoreEditors.allowOverwrite:

  - Save and restore tabs: allows overwriting of exiting saved group with the same name
  - default false
  - Relevant only for 'Save and restore editors: Save all open text editors'

- saveRestoreEditors.confirmAction:

  - Save and restore tabs: ask for confirmation of overwriting or deleting saved groups
  - default true
  - Relevant only for save, re-save and delete actions

## Known Issues

The vscode.workspace.textDocuments does not return the URI for the tabs which were not made visible (open) by the user.
This happens when you start Visual Code and the previous set of opened editors are loaded by Visual Code.

The preview of images open at save time is not happening after restore.

## Change Log

See Change Log [here](CHANGELOG.md)

## Issues

Submit an [issue](https://github.com/iulian-radu-at/save-restore-editors/issues) if you find any bug or have any request.

## Contribution

Fork the [repo](https://github.com/iulian-radu-at/save-restore-editors) and submit pull requests.
