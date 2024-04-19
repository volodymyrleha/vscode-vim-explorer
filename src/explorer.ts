import * as vscode from 'vscode';
import { EDITOR_FOCUS, IState } from './State';

export const closeExplorer = (state: IState) => {
	if (state.focus === EDITOR_FOCUS.explorer) {
		vscode.commands.executeCommand("workbench.action.toggleSidebarVisibility");
	}
};

export const openExplorerIfNoTextEditors = (state: IState) => {
	if (!vscode.workspace.textDocuments.some(doc => !doc.isClosed)) {
		state.changeFocus(EDITOR_FOCUS.explorer);
		vscode.commands.executeCommand('workbench.view.explorer');
	}
};

export const toggleExplorer = (state: IState, cb: () => void) => {
	return vscode.commands.registerCommand("extension.toggleExplorer", () => {
		cb();

		if (state.focus !== EDITOR_FOCUS.explorer) {
			vscode.commands.executeCommand('workbench.view.explorer');
			state.changeFocus(EDITOR_FOCUS.explorer);
		} else {
			vscode.commands.executeCommand("workbench.action.toggleSidebarVisibility");
			state.changeFocus(EDITOR_FOCUS.editor);
		}
	});
};
