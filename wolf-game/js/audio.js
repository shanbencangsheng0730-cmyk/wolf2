// audio.js
export function speakGuide(text) {
    if (!window.speechSynthesis) {
      console.warn("このブラウザは音声合成に非対応だ。");
      return;
    }
  
    // もし前の音声が鳴っていたらキャンセルする（声の重なりを防ぐ）
    window.speechSynthesis.cancel();
  
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP"; // 日本語
    utterance.rate = 0.8;     // 少し遅めの不気味なトーン
    utterance.pitch = 0.5;    // 声の低さ
  
    window.speechSynthesis.speak(utterance);
  }