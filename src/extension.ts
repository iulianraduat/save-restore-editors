import * as vscode from 'vscode';
import {
  cleanPopSavedEditors,
  cleanRestoreEditors,
  deleteSavedEditors,
  popSavedEditors,
  resaveEditors,
  restoreEditors,
  saveEditors,
} from './commands';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'saveRestoreEditors.saveEditors',
    saveEditors
  );
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand(
    'saveRestoreEditors.resaveEditors',
    resaveEditors
  );
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand(
    'saveRestoreEditors.restoreEditors',
    restoreEditors
  );
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand(
    'saveRestoreEditors.cleanRestoreEditors',
    cleanRestoreEditors
  );
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand(
    'saveRestoreEditors.deleteSavedEditors',
    deleteSavedEditors
  );
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand(
    'saveRestoreEditors.popSavedEditors',
    popSavedEditors
  );
  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand(
    'saveRestoreEditors.cleanPopSavedEditors',
    cleanPopSavedEditors
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
