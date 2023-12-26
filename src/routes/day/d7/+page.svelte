<script>
	import DayBaseLayout from '$lib/daybaselayout.svelte';
	import morse from './morse.json';
	import { onMount } from 'svelte';

	const title = 'Morse Mischief';

	// Morse Input
	function convertToMorse(string) {
		let result = '';

		[...string].forEach((character) => {
			character = character.toLowerCase();
			if (morse[character]) {
				result += morse[character] + ' ';
			}
		});
		return result;
	}
	let input = 'Hello World',
		encodedInput;
	$: encodedInput = convertToMorse(input);

	// Morse to audio
	let audioCtx = null;
	let oscillator = null;
	let playing = false;
	function playMorseAudio(audioCtx, string) {
		if (playing) {
			// guard against simulatenous playback
			oscillator.disconnect(0);
		}

		// Program the oscillator
		oscillator = audioCtx.createOscillator();
		oscillator.type = 'triangle';
		const freq = 500;
		const shortDuration = 0.06;
		let timeOffset = 0;
		[...string].forEach((code) => {
			const currentFreq = code == ' ' || code == '/' ? 0 : freq;
			oscillator.frequency.setValueAtTime(currentFreq, audioCtx.currentTime + timeOffset);
			timeOffset += code == '-' ? shortDuration * 2 : shortDuration;
			oscillator.frequency.setValueAtTime(0, audioCtx.currentTime + timeOffset);
			timeOffset += code == '/' ? shortDuration * 2 : shortDuration;
			// console.log(code, currentFreq, timeOffset);
		});

		// Start it
		oscillator.connect(audioCtx.destination);
		oscillator.start();
		playing = true;
	}
	function stopAudio(oscillator) {
		if (oscillator) {
			oscillator.disconnect(0);
		}
		playing = false;
	}

	onMount(() => {
		let AudioContext = window.AudioContext || window.webkitAudioContext;
		audioCtx = new AudioContext();
	});
</script>

<DayBaseLayout {title}>
	<div class="card w-[90%] bg-base-100 shadow-xl md:w-[70%] lg:w-[50%]">
		<div class="card-body">
			<h2 class="card-title">Morse Encoder</h2>
			<textarea class="textarea textarea-bordered font-mono" type="text" bind:value={input} />
			<div class="flex flex-row gap-2">
				<btn
					class="btn grow"
					on:click={playMorseAudio(audioCtx, encodedInput)}
					on:keypress={playMorseAudio(audioCtx, encodedInput)}
					role="button"
					tabindex="0">Play</btn
				>
				<btn
					class="btn w-[30%]"
					on:click={stopAudio(oscillator)}
					on:keypress={stopAudio(oscillator)}
					role="button"
					tabindex="0">Stop</btn
				>
			</div>
			<p class="font-mono">
				{encodedInput}&nbsp;
			</p>
		</div>
	</div>
</DayBaseLayout>
