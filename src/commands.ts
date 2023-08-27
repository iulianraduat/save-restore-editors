import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { isAllowedOverwriting, isAskingForConfirmation } from './settings';
import { EditorLayout } from './types';

interface TConfig {
  tabs: {
    files?: string[];
    layout?: EditorLayout;
    name: string;
    tabGroups?: TConfigTabGroup[];
  }[];
}

interface TConfigTabGroup {
  files: string[];
  viewColumn: vscode.ViewColumn;
}

const emptyConfig: TConfig = {
  tabs: [],
};

export async function saveEditors() {
  const allTextEditors = getAllTextEditors();
  if (allTextEditors.length === 0) {
    vscode.window.showInformationMessage(
      'Save and restore editors: no text editors were found.'
    );
    return;
  }

  const configPath = getConfigPath();
  if (configPath === undefined) {
    return;
  }

  const config: TConfig = getConfig(configPath);
  const existingNames = getExistingNames(config);

  const name = await getInputName(existingNames);
  if (name === undefined) {
    return;
  }

  const tabGroups = getTabGroups();
  config.tabs = config.tabs.filter((t) => t.name !== name);
  const layout = await getEditorLayout();
  config.tabs.push({ name, tabGroups, layout });
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  vscode.window.showInformationMessage(
    `Save and restore editors: saved all open text editors as "${name}" in "${configPath}".`
  );
}

async function getEditorLayout(): Promise<EditorLayout> {
  const layout = await vscode.commands.executeCommand('vscode.getEditorLayout');
  return layout as EditorLayout;
}

function getAllTextEditors(): vscode.TextDocument[] {
  const allDocuments = vscode.workspace.textDocuments;
  const allTextEditors = allDocuments.filter(
    (doc) => doc.uri.scheme === 'file'
  );
  return allTextEditors;
}

function getConfigPath(): string | undefined {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders === undefined || workspaceFolders.length === 0) {
    return;
  }

  const rootPath = workspaceFolders[0].uri.fsPath;
  const vscodePath = `${rootPath}${path.sep}.vscode`;
  if (fs.existsSync(vscodePath) === false) {
    fs.mkdirSync(vscodePath);
  }
  return `${vscodePath}${path.sep}save-restore-editors.json`;
}

function getConfig(configPath: string): TConfig {
  try {
    const content = fs.readFileSync(configPath, 'utf8');
    const config: TConfig = JSON.parse(content);
    if (Array.isArray(config.tabs) === false) {
      throw new Error();
    }
    return config;
  } catch (err) {
    fs.writeFileSync(configPath, JSON.stringify(emptyConfig, null, 2));
    return { ...emptyConfig };
  }
}

function getExistingNames(config: TConfig) {
  return config.tabs.map((t) => t.name);
}

async function getInputName(existingNames: string[]) {
  const allowOverwrite = isAllowedOverwriting();
  const name = await vscode.window.showInputBox({
    placeHolder: 'Name of this new group of saved editors',
    validateInput: allowOverwrite
      ? undefined
      : (value: string) => getValidateInput(value, existingNames),
  });
  if (!name) {
    return;
  }

  if (allowOverwrite && isAskingForConfirmation()) {
    const answer = await vscode.window.showInformationMessage(
      'Do you want to overwrite the existing saved group?',
      'Yes',
      'No'
    );
    if (answer !== 'Yes') {
      return;
    }
  }

  return name;
}

function getValidateInput(
  value: string,
  existingNames: string[]
): string | undefined | null | Thenable<string | undefined | null> {
  return existingNames.includes(value) ? 'This name is already used' : null;
}

function getTabGroups(): TConfigTabGroup[] {
  const tabGroups = vscode.window.tabGroups.all.map((tabGroup) => {
    const { tabs, viewColumn } = tabGroup;

    const files = tabs.reduce<string[]>((acc, tab) => {
      const { input } = tab;
      if (!(input instanceof vscode.TabInputText)) {
        return acc;
      }

      const scheme = input.uri.scheme;
      if (scheme === 'file') {
        const fsPath = input.uri.toString();
        acc.push(fsPath);
      }
      return acc;
    }, []);

    return {
      files,
      viewColumn,
    };
  });

  /* We sort by view column index */
  tabGroups.sort((a, b) => a.viewColumn - b.viewColumn);

  return tabGroups;
}

export async function restoreEditors() {
  const configPath = getConfigPath();
  if (configPath === undefined) {
    return;
  }

  const config: TConfig = getConfig(configPath);
  const existingNames = getExistingNames(config);

  if (existingNames.length === 0) {
    vscode.window.showInformationMessage(
      `Save and restore editors: no saved groups of text editors in "${configPath}".`
    );
    return;
  }

  const name = await getSelectedName(existingNames);
  if (name === undefined) {
    return;
  }

  const tab = config.tabs.find((t) => t.name === name);
  if (tab === undefined) {
    return;
  }

  if (tab.tabGroups) {
    openTabGroups(tab.tabGroups);
  } else {
    openFiles(tab.files);
  }

  if (tab.layout) {
    setEditorLayout(tab.layout);
  }
}

async function setEditorLayout(layout: EditorLayout) {
  await vscode.commands.executeCommand('vscode.setEditorLayout', layout);
}

async function getSelectedName(existingNames: string[]) {
  const name = await vscode.window.showQuickPick(existingNames, {
    placeHolder: 'Name of an existing group of saved editors',
    canPickMany: false,
  });
  return name;
}

export async function deleteSavedEditors() {
  const configPath = getConfigPath();
  if (configPath === undefined) {
    return;
  }

  const config: TConfig = getConfig(configPath);
  const existingNames = getExistingNames(config);

  if (existingNames.length === 0) {
    vscode.window.showInformationMessage(
      `Save and restore editors: no saved groups of text editors in "${configPath}".`
    );
    return;
  }

  const name = await getSelectedName(existingNames);
  if (name === undefined) {
    return;
  }

  const tabs = config.tabs.filter((t) => t.name !== name);
  config.tabs = tabs;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

export async function popSavedEditors() {
  const configPath = getConfigPath();
  if (configPath === undefined) {
    return;
  }

  const config: TConfig = getConfig(configPath);
  const existingNames = getExistingNames(config);

  if (existingNames.length === 0) {
    vscode.window.showInformationMessage(
      `Save and restore editors: no saved groups of text editors in "${configPath}".`
    );
    return;
  }

  const name = await getSelectedName(existingNames);
  if (name === undefined) {
    return;
  }

  const tab = config.tabs.find((t) => t.name === name);
  if (tab === undefined) {
    return;
  }

  if (tab.tabGroups) {
    openTabGroups(tab.tabGroups);
  } else {
    openFiles(tab.files);
  }

  const tabs = config.tabs.filter((t) => t.name !== name);
  config.tabs = tabs;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

function openTabGroups(tabGroups: TConfigTabGroup[]) {
  tabGroups.map((tabGroup) => {
    const { files, viewColumn } = tabGroup;
    const options: vscode.TextDocumentShowOptions = {
      preview: false,
      viewColumn,
    };

    files.forEach(async (file) => {
      const uri = vscode.Uri.parse(file);
      const doc = await vscode.workspace.openTextDocument(uri);
      vscode.window.showTextDocument(doc, options);
    });
  });
}

function openFiles(files?: string[]) {
  files?.forEach(async (file) => {
    const uri = vscode.Uri.parse(file);
    const doc = await vscode.workspace.openTextDocument(uri);
    vscode.window.showTextDocument(doc, { preview: false });
  });
}
