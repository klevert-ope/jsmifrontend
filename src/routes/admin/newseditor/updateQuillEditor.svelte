<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { editorContent, form, QuillEditor, wordCountBody } from './store';
	import { get } from 'svelte/store';

	export let initialContent: string = '';

	let Quill;

	const updateWordCount = () => {
		const editor = get(QuillEditor);
		if (editor) {
			const text: string = editor.getText().trim();
			const words: string[] = text.split(/\s+/).filter((word: string) => word.trim() !== '');
			wordCountBody.set(words.length);
		}
	};

	const checkBodyEmpty = () => {
		const editor = get(QuillEditor);
		if (editor) {
			const text = editor.getText().trim();
			const isEmpty = text.length === 0 || !text.replace(/\s/g, '').length;
			if (isEmpty) {
				editorContent.set('');
			}
		}
	};

	onMount(async () => {
		if (typeof window !== 'undefined') {
			Quill = (await import('quill')).default;

			const editor = new Quill('#editorBody', {
				theme: 'snow',
				placeholder: 'Write your post...',
				modules: {
					toolbar: [
						[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
						['bold', 'italic', 'underline', 'strike'],
						['blockquote'],
						[{ 'list': 'ordered' }],
						[{ 'color': [] }, { 'background': [] }],
						['link', 'image'],
						['clean']
					]
				}
			});

			QuillEditor.set(editor);
			editor.setContents(JSON.parse(initialContent) || { ops: [] });

			updateWordCount();

			const initialDelta = editor.getContents();
			const initialDeltaJson = JSON.stringify(initialDelta, null, 4);
			editorContent.set(initialDeltaJson);
			form.data.body = initialDeltaJson;

			editor.on('text-change', () => {
				const delta = editor.getContents();
				const deltaJson = JSON.stringify(delta, null, 4);
				editorContent.set(deltaJson);
				updateWordCount();
				checkBodyEmpty();
			});

			editorContent.subscribe(content => {
				const textarea = document.querySelector('textarea[name="body"]') as HTMLTextAreaElement;
				if (textarea) {
					textarea.value = content;
				}
				form.data.body = content;
			});
		}
	});

	onDestroy(() => {
		const editor = get(QuillEditor);
		if (editor) {
			editor.off('text-change');
		}
	});
</script>

<textarea hidden id="body" name="body"></textarea>
<div id="editorBody"></div>
<p class="font-xs flex-end">{$wordCountBody}/10000 Words</p>


<style>
	#editorBody {
		min-height: 40svh;
		border: 1px solid rgba(20, 20, 20, 0.4);
		background: white;
		}

	.font-xs {
		font-size: var(--font-size-sm);
		}

	.flex-end {
		display: flex;
		justify-content: flex-end;
		}
</style>
