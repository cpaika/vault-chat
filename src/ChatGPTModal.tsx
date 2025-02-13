import {App, Modal} from "obsidian";
import SemanticSearch from "./main";
import * as React from "react";
import {createRoot, Root} from "react-dom/client";
import {ChatGPTModalComponent} from "./ChatGPTModalComponent";
import {OpenAIHandler} from "./OpenAIHandler";

export class ChatGPTModal extends Modal {
	plugin: SemanticSearch;
	myRoot: Root | undefined;

	openAIHandler: OpenAIHandler;
	getSearchResultsFiles: Function;

	isIndexingComplete: Promise<boolean>

	constructor(app: App, plugin: SemanticSearch, openAIHandler: OpenAIHandler, getSearchResultsFiles: Function, isIndexingComplete: Promise<boolean>) {
		super(app);
		this.plugin = plugin;
		this.openAIHandler = openAIHandler;
		this.getSearchResultsFiles = getSearchResultsFiles;
		this.isIndexingComplete = isIndexingComplete;
	}

	onOpen() {
		this.myRoot = createRoot(this.contentEl)
		this.myRoot.render(
			<ChatGPTModalComponent
				openAIHandler={this.openAIHandler}
				getSearchResultsFiles={this.getSearchResultsFiles}
				isIndexingComplete={this.isIndexingComplete}
			/>
		)
	}

	onClose() {
		const { contentEl } = this;
		if (this.myRoot) this.myRoot.unmount()
		contentEl.empty();
	}
}


