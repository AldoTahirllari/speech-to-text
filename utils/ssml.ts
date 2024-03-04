export const SSML = `<speak>
<voice name="en-US-Wavenet-F">
  Good morning! <break time="500ms"/> Today is <say-as interpret-as="date" format="mdy">02/27/2024</say-as>.
  Here's your daily update.
</voice>
<break time="1s"/>
<voice name="en-US-Wavenet-A">
  The weather today will be mostly sunny with a high of <say-as interpret-as="cardinal">75</say-as> degrees and a low of <say-as interpret-as="cardinal">55</say-as> degrees.
</voice>
<break time="1s"/>
<voice name="en-GB-Wavenet-C">
  In today's news, the local community garden has announced an expansion. <emphasis level="moderate">Volunteers</emphasis> are needed this Saturday to help with the setup. <break time="300ms"/> It's a great opportunity to contribute to our community's green spaces.
</voice>
<break time="1s"/>
<voice name="en-US-Wavenet-D">
  <prosody pitch="+10%" rate="medium">
    Remember, staying hydrated is important. Make sure to drink plenty of water throughout the day.
  </prosody>
</voice>
<break time="1s"/>
<voice name="en-US-Wavenet-E">
  <audio src="https://example.com/morning_tune.mp3"/>
  <break time="500ms"/> That's all for now. Have a wonderful day!
</voice>
</speak>`;

// export const SSML = 'HELLO';
