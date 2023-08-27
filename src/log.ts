import * as vscode from "vscode";

export function log(
  category: string,
  context?: any,
  ms1970Utc?: number
): number {
  const tsNow = Date.now();

  const msg =
    context !== undefined
      ? `${category}: ${JSON.stringify(context, null, 2)}`
      : category;
  logInVSCodeOutput(msg, ms1970Utc ? tsNow - ms1970Utc : undefined);
  return tsNow;
}

let ochannel: vscode.OutputChannel | undefined;

export function showOutputWindow() {
  ochannel?.show();
}

function logInVSCodeOutput(msg: string, durationMs?: number) {
  if (!ochannel) {
    ochannel = vscode.window.createOutputChannel("Save and restore editors");
  }

  const logMsg = durationMs !== undefined ? `${msg} (${durationMs}ms)` : msg;
  ochannel.appendLine(logMsg);
}
