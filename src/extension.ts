import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand('extension.combineOpenFiles', async () => {
    const openTabs = vscode.workspace.textDocuments;

    if (openTabs.length === 0) {
      vscode.window.showInformationMessage('No open files to combine.');
      return;
    }

    let combinedText = '';

    for (const doc of openTabs) {
      // Optional: skip untitled or unsaved documents

      combinedText += `\n\n// ===== ${doc.fileName} =====\n`;
      combinedText += doc.getText();
    }

    const newDoc = await vscode.workspace.openTextDocument({
      content: combinedText,
      language: 'plaintext'
    });

    await vscode.window.showTextDocument(newDoc);
  });

  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  statusBarItem.command = 'extension.combineOpenFiles';
  statusBarItem.text = '🧩 Combine Files';
  statusBarItem.tooltip = 'Combine all open file contents into one';
  statusBarItem.show();

  context.subscriptions.push(command, statusBarItem);
}

export function deactivate() {}
