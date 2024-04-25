import * as vscode from 'vscode';
import { EDITOR_FOCUS, IState } from './State';

export const closeGitDiffTabs = () => {
	vscode.commands.executeCommand('git.closeAllDiffEditors');	
}

export const closeGit = (state: IState) => {
	if (state.focus === EDITOR_FOCUS.git) {
		vscode.commands.executeCommand("workbench.action.toggleSidebarVisibility");
	}
};

// TODO: add files manipulation in the source control tree view
// FIXME: ctrl+n return to previous selected item in the tree view (not the last one)
export const toggleGit = (state: IState, cb: () => void) => {
	return vscode.commands.registerCommand("extension.toggleGit", () => {
		cb();
		if (state.focus === EDITOR_FOCUS.git) {
			vscode.commands.executeCommand('git.closeAllDiffEditors');	
			vscode.commands.executeCommand('workbench.action.toggleSidebarVisibility');	
			state.changeFocus(EDITOR_FOCUS.editor);
		} else {
			vscode.commands.executeCommand('workbench.view.scm');
			state.changeFocus(EDITOR_FOCUS.git);
		}
	});
}
