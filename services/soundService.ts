
class SoundService {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private createOscillator(freq: number, type: OscillatorType, duration: number, volume: number = 0.1) {
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playStart() {
    // Un arpegio ascendente rápido y enérgico para marcar el inicio
    const volume = 0.12;
    this.createOscillator(440, 'sine', 0.1, volume); // A4
    setTimeout(() => this.createOscillator(554.37, 'sine', 0.1, volume), 40); // C#5
    setTimeout(() => this.createOscillator(659.25, 'sine', 0.1, volume), 80); // E5
    setTimeout(() => this.createOscillator(880, 'sine', 0.3, volume * 1.5), 120); // A5
  }

  playCorrect() {
    this.createOscillator(523.25, 'sine', 0.1, 0.1); // C5
    setTimeout(() => this.createOscillator(659.25, 'sine', 0.15, 0.08), 80); // E5
  }

  playIncorrect() {
    this.createOscillator(220, 'triangle', 0.1, 0.1); // A3
    setTimeout(() => this.createOscillator(180, 'triangle', 0.2, 0.1), 100);
  }

  playFanfare() {
    const tones = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    tones.forEach((freq, i) => {
      setTimeout(() => this.createOscillator(freq, 'sine', 0.4, 0.05), i * 150);
    });
  }

  playClick() {
    // Sonido de clic más corto, agudo y "metálico" usando onda triangular
    this.createOscillator(1800, 'triangle', 0.04, 0.08);
  }

  playProcess() {
    this.createOscillator(200, 'sine', 0.5, 0.05);
  }
}

export const soundService = new SoundService();
