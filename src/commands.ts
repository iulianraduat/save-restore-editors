import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

interface TConfig {
  tabs: {
    name: string;
    files: string[];
  }[];
}
const emptyConfig: TConfig = {
  tabs: [],
};

export async function saveEditors() {
  const allTextEditors = getAllTextEditors();
  if (allTextEditors.length === 0) {
    vscode.window.showInformationMessage('Save and restore editors: no text editors were found.');
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

  const files = allTextEditors.map((te) => te.uri.toString());
  config.tabs.push({
    name,
    files,
  });
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  vscode.window.showInformationMessage(
    `Save and restore editors: saved all open text editors as "${name}" in "${configPath}".`
  );
}

function getAllTextEditors(): vscode.TextDocument[] {
  const allDocuments = vscode.workspace.textDocuments;
  const allTextEditors = allDocuments.filter((doc) => doc.uri.scheme === 'file');
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
  const name = await vscode.window.showInputBox({
    placeHolder: 'Name of this new group of saved editors',
    validateInput: (value: string) => getValidateInput(value, existingNames),
  });
  return name;
}

function getValidateInput(
  value: string,
  existingNames: string[]
): string | undefined | null | Thenable<string | undefined | null> {
  return existingNames.includes(value) ? 'This name is already used' : null;
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
  tab?.files.forEach(async (file) => {
    const uri = vscode.Uri.parse(file);
    const doc = await vscode.workspace.openTextDocument(uri);
    vscode.window.showTextDocument(doc, { preview: false });
  });
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
