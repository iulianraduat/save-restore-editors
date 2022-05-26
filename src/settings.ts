import * as vscode from 'vscode';

export function isAllowedOverwriting(): boolean {
  return vscode.workspace
    .getConfiguration()
    .get('saveRestoreEditors.allowOverwrite', false);
}

export function isAskingForConfirmation(): boolean {
  return vscode.workspace
    .getConfiguration()
    .get('saveRestoreEditors.confirmAction', true);
}
