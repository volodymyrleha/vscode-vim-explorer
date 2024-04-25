export enum EDITOR_FOCUS {
	editor = 'editor',
	terminal = 'terminal',
	explorer = 'explorer',
	search = 'search',
	git = 'git',
}

const sidebarFocus = [
	EDITOR_FOCUS.explorer,
	EDITOR_FOCUS.git,
	EDITOR_FOCUS.search
];

export enum SEARCH_SIDEBAR_FOCUS {
	input = 'input',
	list = 'list',
}

export interface IState {
	focus: EDITOR_FOCUS;
	prevFocus: EDITOR_FOCUS;
	searchFocus: SEARCH_SIDEBAR_FOCUS,
	isSidebarOpen: boolean;
	lastOpenedFile: string | null;
	changeFocus: (focus: EDITOR_FOCUS) => void,
	changeSearchFocus: (focus: SEARCH_SIDEBAR_FOCUS) => void,
	changeLastOpenedFile: (fileName: string) => void,
}

export class State implements IState {
	focus: EDITOR_FOCUS;
	prevFocus: EDITOR_FOCUS;
	searchFocus: SEARCH_SIDEBAR_FOCUS;
	lastOpenedFile: string | null;

	constructor() {
		this.focus = EDITOR_FOCUS.editor;
		this.prevFocus = EDITOR_FOCUS.editor;
		this.searchFocus = SEARCH_SIDEBAR_FOCUS.input;
		this.lastOpenedFile = null;
	}

	get isSidebarOpen() {
		return sidebarFocus.includes(this.focus); 
	}

	changeFocus(focus: EDITOR_FOCUS) {
		this.prevFocus = this.focus;
		this.focus = focus;
	}	

	changeSearchFocus(focus: SEARCH_SIDEBAR_FOCUS) {
		this.searchFocus = focus;
	}

	changeLastOpenedFile(fileName: string) {
		if (fileName.split('.').pop() === 'git') {
			return;
		}

		this.lastOpenedFile = fileName;
	}
}