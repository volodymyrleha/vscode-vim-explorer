import * as vscode from 'vscode';
import { EDITOR_FOCUS, IState } from './State';

export const closeTerminal = (state: IState) => {
	if (state.focus === EDITOR_FOCUS.terminal) {
		vscode.commands.executeCommand("workbench.action.togglePanel");
	}
};

export const handleTerminalClose = (state: IState) => {
	if (!vscode.window.terminals.length) {
		state.changeFocus(EDITOR_FOCUS.editor);
	}
};

export const closeAllTerminals = () => {
	vscode.window.terminals.forEach(terminal => terminal.dispose());
};

// TODO: create manipulation as vim motion for terminal (prev, next command, horizontal cursor movement)
export const toggleTerminal = (state: IState, cb: () => void) => {
	return vscode.commands.registerCommand("extension.toggleTerminal", () => {
		cb();
		vscode.commands.executeCommand("workbench.action.togglePanel");
		const newState = state.focus === EDITOR_FOCUS.terminal ? EDITOR_FOCUS.editor : EDITOR_FOCUS.terminal; 
		state.changeFocus(newState);
	});
}
