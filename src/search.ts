import * as vscode from 'vscode';
import { EDITOR_FOCUS, IState, SEARCH_SIDEBAR_FOCUS } from './State';

export const closeSearch = (state: IState) => {
	if (state.focus === EDITOR_FOCUS.search) {
		vscode.commands.executeCommand("workbench.action.toggleSidebarVisibility");
	}
};

export const openSearch = (state: IState) => {
	state.changeFocus(EDITOR_FOCUS.search);

	if (state.searchFocus === SEARCH_SIDEBAR_FOCUS.input) {
		vscode.commands.executeCommand('workbench.action.findInFiles');
	} else {
		vscode.commands.executeCommand('search.action.focusSearchList');
	}
};

export const toggleSearch = (state: IState, cb: () => void) => {
	return vscode.commands.registerCommand("extension.toggleSearch", () => {
		cb();
		if (state.focus === EDITOR_FOCUS.search) {
			vscode.commands.executeCommand('workbench.action.toggleSidebarVisibility');	
			state.changeFocus(EDITOR_FOCUS.editor);
		} else {
			openSearch(state);
		}
	});
};

// FIXME: go back to list from editor focus
export const toggleSearchResultsAndInput = (state: IState) => {
	return vscode.commands.registerCommand("extension.toggleSearchResultsAndInput", () => {
		if (state.searchFocus === SEARCH_SIDEBAR_FOCUS.input) {
			vscode.commands.executeCommand('search.action.focusSearchList');
			state.changeSearchFocus(SEARCH_SIDEBAR_FOCUS.list);
		} else {
			vscode.commands.executeCommand('workbench.action.findInFiles');
			state.changeSearchFocus(SEARCH_SIDEBAR_FOCUS.input);
		}
	});
} 