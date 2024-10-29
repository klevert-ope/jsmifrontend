<script lang="ts">
	import { editorContent, form, QuillEditor, wordCountBody } from './store';
	import { get } from 'svelte/store';

	let Quill;

	$effect(() => {
		form.data.body = $editorContent;
	});

	const updateWordCount = () => {
		const editor = get(QuillEditor);
		if (editor) {
			const text: string = editor.getText().trim();
			const words: string[] = text.split(/\s+/).filter(word => word.trim() !== '');
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

	let editor: any;

	$effect(() => {
		const initializeEditor = async () => {
			if (typeof window !== 'undefined') {
				Quill = (await import('quill')).default;

				editor = new Quill('#editorBody', {
					theme: 'snow',
					placeholder: 'Write your post...',
					modules: {
						toolbar: [
							[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
							['bold', 'italic', 'underline', 'strike'],
							['blockquote'],
							[{ 'list': 'ordered' }],
							[{ 'color': [] }, { 'background': [] }],
							['link'],
							['clean']
						]
					}
				});
				QuillEditor.set(editor);

				editor.on('text-change', () => {
					const delta = editor.getContents();
					const deltaJson = JSON.stringify(delta, null, 4);
					editorContent.set(deltaJson);
					updateWordCount();
					checkBodyEmpty();
				});
			}
		};

		initializeEditor();

		return () => {
			if (editor) {
				editor.off('text-change');
			}
		};
	});

	$effect(() => {
		const textarea = document.querySelector('textarea[name="body"]') as HTMLTextAreaElement;
		if (textarea) {
			editorContent.subscribe(content => {
				textarea.value = content;
			});
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
