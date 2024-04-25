import * as vscode from 'vscode';
import { closeTerminal, handleTerminalClose, closeAllTerminals, toggleTerminal } from './terminal';
import { EDITOR_FOCUS, State } from './State';
import { closeExplorer, openExplorerIfNoTextEditors, toggleExplorer } from './explorer';
import { closeGitDiffTabs, toggleGit } from './git';
import { toggleSearch, toggleSearchResultsAndInput } from './search';

const state = new State();

const handleSelectionChange = () => {
	closeExplorer(state);
	closeTerminal(state);
	if (state.focus === EDITOR_FOCUS.explorer || state.focus === EDITOR_FOCUS.terminal) {
		state.changeFocus(EDITOR_FOCUS.editor);
	}
}

const handleOpenDocument = (document: vscode.TextDocument) => {
	if (state.focus === EDITOR_FOCUS.editor) {
		state.changeLastOpenedFile(document.fileName);	
	}

	if (state.prevFocus === EDITOR_FOCUS.git) {
		return;
	}
	closeExplorer(state);
	closeTerminal(state);
	if (state.focus === EDITOR_FOCUS.explorer || state.focus === EDITOR_FOCUS.terminal) {
		state.changeFocus(EDITOR_FOCUS.editor);
	}
}

// TODO: Add keybindings to go down and up in files palette
// TODO: test windows keybindings (each that starts with ctrl)
export function activate(context: vscode.ExtensionContext) {
	openExplorerIfNoTextEditors(state);
	closeAllTerminals();

	context.subscriptions.push(toggleExplorer(state, () => {
		if (state.focus === EDITOR_FOCUS.terminal) {
			closeTerminal(state);
		}	
		closeGitDiffTabs();
	}));
	context.subscriptions.push(toggleTerminal(state, () => {
		if (state.isSidebarOpen) {
			vscode.commands.executeCommand("workbench.action.toggleSidebarVisibility");
		}
		closeGitDiffTabs();
	}));
	// FIXME: closing terminal after opening search with ctrl + n strange behavior
	context.subscriptions.push(toggleSearch(state, () => {
		if (state.focus === EDITOR_FOCUS.terminal) {
			closeTerminal(state);
		}	
		closeGitDiffTabs();
	}));
	context.subscriptions.push(toggleSearchResultsAndInput(state));
	context.subscriptions.push(toggleGit(state, () => {
		if (state.focus === EDITOR_FOCUS.terminal) {
			closeTerminal(state);
		}	
		closeGitDiffTabs();
	}));

	context.subscriptions.push(vscode.window.onDidChangeTextEditorSelection(handleSelectionChange));;
	context.subscriptions.push(vscode.window.onDidCloseTerminal(() => handleTerminalClose(state)));;
	context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(handleOpenDocument));;
}

// This method is called when your extension is deactivated
export function deactivate() {}
