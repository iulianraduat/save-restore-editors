import * as vscode from 'vscode';
import { deleteSavedEditors, restoreEditors, saveEditors } from './commands';

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel(
    'save-restore-editors'
  );
  outputChannel.appendLine('activate');

  let disposable = vscode.commands.registerCommand(
    'saveRestoreEditors.saveEditors',
    saveEditors
  );
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand(
    'saveRestoreEditors.restoreEditors',
    restoreEditors
  );
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand(
    'saveRestoreEditors.deleteSavedEditors',
    deleteSavedEditors
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
