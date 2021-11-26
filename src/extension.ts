import * as vscode from 'vscode';
import { deleteSavedEditors, popSavedEditors, restoreEditors, saveEditors } from './commands';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('saveRestoreEditors.saveEditors', saveEditors);
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand('saveRestoreEditors.restoreEditors', restoreEditors);
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand('saveRestoreEditors.deleteSavedEditors', deleteSavedEditors);
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand('saveRestoreEditors.popSavedEditors', popSavedEditors);
  context.subscriptions.push(disposable);
}

export function deactivate() {}
